import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Euler, OrthographicCamera, Plane, Quaternion, Ray, Vector3 } from "three";
import type { ChibiSceneApi, Vec3 } from "@chibi3d/runtime";
import type { KeyboardScene } from "./scene";

export type KeyboardSection = "hero" | "skills" | "experience" | "certifications" | "projects" | "contact";
const SCROLL_SECTIONS = [
  { id: "skills", previous: "hero", threshold: 0.5 },
  { id: "experience", previous: "skills", threshold: 0.55 },
  { id: "certifications", previous: "experience", threshold: 0.55 },
  { id: "projects", previous: "certifications", threshold: 0.7 },
  { id: "contact", previous: "projects", threshold: 0.3 },
] as const;

type Vector = { x: number; y: number; z: number };
const vector = (v: Vec3): Vector => ({ x: v[0], y: v[1], z: v[2] });
const array = (v: Vector): Vec3 => [v.x, v.y, v.z];

// Animate the original Euler components before converting camera coordinates.
// Equivalent end rotations do not produce equivalent GSAP transition paths.
function sectionRotation(rotation: Vector, mobile: boolean): Vec3 {
  const skills = new Quaternion().setFromEuler(new Euler(0.119863065, 0.007200782, 0.119863065));
  const reference = new Quaternion().setFromEuler(new Euler(0, mobile ? -Math.PI / 6 : -Math.PI / 12, 0));
  const legacy = new Quaternion().setFromEuler(new Euler(rotation.x, rotation.y, rotation.z));
  const euler = new Euler().setFromQuaternion(skills.multiply(reference).multiply(legacy));
  return [euler.x, euler.y, euler.z];
}

/** GSAP animates host values; Chibi applies them through its public API. */
export function createKeyboardMotion(
  api: ChibiSceneApi,
  scene: KeyboardScene,
  onSection: (section: KeyboardSection) => void,
  onActivity?: () => void,
) {
  gsap.registerPlugin(ScrollTrigger);
  const setTransform: ChibiSceneApi["setNodeTransform"] = (id, patch) => {
    onActivity?.();
    return api.setNodeTransform(id, patch);
  };
  let section: KeyboardSection = "hero";
  let disposed = false;
  let revealed = false;
  const position = vector([0, 0, 0]);
  const scale = vector([0.001, 0.001, 0.001]);
  const rotation = vector([0, 0, 0]);
  const revealScale = { value: 0.001 };
  const keyOffsets = scene.keys.map(() => ({ y: 0 }));
  const ripple = scene.keys.map(() => ({ x: 0, z: 0, tx: 0, tz: 0 }));
  const keyRevealOffsets = scene.keys.map(() => ({ x: 0, y: 0, z: 0, spin: 0, scale: 1 }));
  const applyKey = (index: number) => {
    const reveal = keyRevealOffsets[index];
    const shove = ripple[index];
    setTransform(scene.keys[index].motionId, {
      position: [reveal.x + shove.x, keyOffsets[index].y + reveal.y, reveal.z + shove.z],
      rotation: [reveal.spin * 0.6, reveal.spin, reveal.spin * 0.3],
      scale: [reveal.scale, reveal.scale, reveal.scale],
    });
  };
  const cam = new OrthographicCamera(-1, 1, 1, -1, 0.1, 500);
  const ndc = new Vector3();
  const hitPoint = new Vector3();
  const planePoint = new Vector3();
  const normal = new Vector3();
  const localHit = new Vector3();
  const ray = new Ray();
  const aim = new Quaternion();
  const aimEuler = new Euler();
  const keyPlane = new Plane();
  const keyPlaneY = scene.keys[0]?.rest[1] ?? 0;
  const cursor = { x: 0, z: 0, ready: false };
  // Cursor in the keyboard's own plane. Keys inside the reach slide away so the pointer never sits on a cap.
  const setRipple = (point: { x: number; y: number } | null) => {
    const reach = 2.15;
    let near = false;
    if (!point || section !== "hero" || revealScale.value < 0.2) {
      cursor.ready = false;
      ripple.forEach((item) => { item.tx = 0; item.tz = 0; });
      return false;
    }
    const width = window.innerWidth;
    const height = window.innerHeight;
    const camDef = scene.document.camera;
    const distance = Math.hypot(
      camDef.position[0] - camDef.target[0],
      camDef.position[1] - camDef.target[1],
      camDef.position[2] - camDef.target[2],
    );
    cam.left = width / -2; cam.right = width / 2; cam.top = height / 2; cam.bottom = height / -2;
    cam.zoom = height / Math.max(1e-3, 2 * distance * Math.tan(camDef.fov * Math.PI / 360));
    cam.position.set(camDef.position[0], camDef.position[1], camDef.position[2]);
    cam.lookAt(camDef.target[0], camDef.target[1], camDef.target[2]);
    cam.updateProjectionMatrix();
    cam.updateMatrixWorld();
    ndc.set((point.x / width) * 2 - 1, -((point.y / height) * 2 - 1), -1).unproject(cam);
    cam.getWorldDirection(ray.direction);
    ray.origin.copy(ndc);
    const rendered = sectionRotation(rotation, width < 768);
    aimEuler.set(rendered[0], rendered[1], rendered[2]);
    aim.setFromEuler(aimEuler);
    normal.set(0, 1, 0).applyQuaternion(aim);
    planePoint.set(0, keyPlaneY * revealScale.value * scale.y, 0).applyQuaternion(aim);
    planePoint.x += position.x; planePoint.y += position.y; planePoint.z += position.z;
    keyPlane.setFromNormalAndCoplanarPoint(normal, planePoint);
    if (!ray.intersectPlane(keyPlane, hitPoint)) {
      cursor.ready = false;
      ripple.forEach((item) => { item.tx = 0; item.tz = 0; });
      return false;
    }
    localHit.copy(hitPoint);
    localHit.x -= position.x; localHit.y -= position.y; localHit.z -= position.z;
    localHit.applyQuaternion(aim.invert());
    const reveal = Math.max(revealScale.value, 1e-3);
    localHit.x /= scale.x * reveal; localHit.y /= scale.y * reveal; localHit.z /= scale.z * reveal;
    if (!cursor.ready) {
      cursor.x = localHit.x; cursor.z = localHit.z; cursor.ready = true;
    } else {
      cursor.x += (localHit.x - cursor.x) * 0.28;
      cursor.z += (localHit.z - cursor.z) * 0.28;
    }
    scene.keys.forEach((key, index) => {
      const item = ripple[index];
      const dx = key.rest[0] - cursor.x;
      const dz = key.rest[2] - cursor.z;
      let dist = Math.hypot(dx, dz);
      let ux = dist > 0 ? dx / dist : 0;
      let uz = dist > 0 ? dz / dist : 1;
      if (dist < 0.12) {
        const prev = Math.hypot(item.tx, item.tz);
        if (prev > 0.04) { ux = item.tx / prev; uz = item.tz / prev; }
        else if (Math.hypot(key.rest[0], key.rest[2]) > 0.01) {
          const span = Math.hypot(key.rest[0], key.rest[2]);
          ux = key.rest[0] / span; uz = key.rest[2] / span;
        }
        dist = 0.12;
      }
      const t = 1 - Math.min(dist / reach, 1);
      const falloff = t * t * (3 - 2 * t);
      if (falloff < 0.02) { item.tx = 0; item.tz = 0; return; }
      near = true;
      const push = falloff * 1.15;
      item.tx = ux * push;
      item.tz = uz * push;
    });
    return near;
  };
  let rippleStamp = 0;
  const stepRipple = () => {
    if (disposed) return;
    const now = performance.now();
    const dt = rippleStamp ? Math.min(0.05, (now - rippleStamp) / 1000) : 0.016;
    rippleStamp = now;
    const blend = 1 - Math.exp(-dt * 6);
    ripple.forEach((item, index) => {
      if (Math.abs(item.tx - item.x) < 0.0008 && Math.abs(item.tz - item.z) < 0.0008) {
        if (item.x !== item.tx || item.z !== item.tz) { item.x = item.tx; item.z = item.tz; applyKey(index); }
        return;
      }
      item.x += (item.tx - item.x) * blend;
      item.z += (item.tz - item.z) * blend;
      applyKey(index);
    });
  };
  gsap.ticker.add(stepRipple);
  const catFrame = { value: 0 };
  const sectionTweens: gsap.core.Tween[] = [];
  const loops: gsap.core.Tween[] = [];
  const revealTweens: gsap.core.Tween[] = [];
  const pending: gsap.core.Tween[] = [];
  const keyTweens: gsap.core.Tween[] = [];
  let counterWanted = false;
  let counterEnabled = false;
  const showCounter = (visible: boolean) => {
    counterWanted = visible;
    api.setNodeVisible(scene.counterId, visible && counterEnabled);
    onActivity?.();
  };
  const inSkills = () => {
    const bounds = document.getElementById("skills")?.getBoundingClientRect();
    return Boolean(bounds && bounds.top <= window.innerHeight * 0.5 && bounds.bottom > window.innerHeight * 0.2);
  };
  const applyPose = () => {
    setTransform(scene.boardId, {
      position: array(position),
      scale: array(scale),
      rotation: sectionRotation(rotation, window.innerWidth < 768),
    });
  };
  const pose = () => {
    const mobile = window.innerWidth < 768;
    // 14–16" laptops are wide but short, so a full-size board clips the front rows.
    const short = !mobile && window.innerHeight < 1100;
    const fit = Math.min(1, window.innerWidth / window.innerHeight * 1.05);
    const [centerX, centerY, centerZ] = scene.document.camera.target;
    const skillsScale = mobile ? 0.82 : short ? 0.9 : 1.02;
    const size = fit * (section === "hero" ? (mobile ? 0.72 : 0.6)
      : section === "contact" ? 0.75
      : section === "skills" ? skillsScale
      : section === "experience" ? (mobile ? 0.28 : 0.3)
      : section === "certifications" ? (mobile ? 0.26 : 0.3)
      : 0.95);
    // Push the hero board clear of the name, keeping its right edge on screen (≈0.105h px per unit).
    const heroRight = Math.min(4.4, Math.max(2.5, (window.innerWidth * 0.46 - 0.273 * window.innerHeight) / (0.105 * window.innerHeight)));
    const right = !mobile && section === "hero" ? heroRight
      : !mobile && section === "contact" ? 3.8
      : section === "experience" ? (mobile ? 0.1 : 3.05)
      : section === "certifications" ? 0
      : 0;
    const up = mobile && section === "hero" ? -1.8
      : section === "contact" ? -0.8
      : section === "skills" ? (short ? -0.15 : -0.35)
      : section === "experience" ? (mobile ? 2.1 : 2.35)
      : section === "certifications" ? (mobile ? -1.5 : -1.15)
      : 0;
    return {
      // The placement origin is the keyboard's geometry center, independent of its labels.
      position: {
        x: centerX + right / Math.sqrt(2) + up / Math.sqrt(6),
        y: centerY + up * Math.sqrt(2 / 3),
        z: centerZ + right / Math.sqrt(2) - up / Math.sqrt(6),
      },
      rotation: section === "projects" || (!mobile && section === "experience") || (mobile && section === "contact")
        ? { x: Math.PI, y: Math.PI / 3, z: Math.PI }
        : section === "experience"
        ? { x: 0.5, y: 0.65, z: 0 }
        : section === "certifications"
        ? { x: 0.5, y: 0.65, z: 0 }
        : { x: 0, y: section === "skills" ? (mobile ? Math.PI / 6 : Math.PI / 12) : 0, z: 0 },
      scale: { x: size, y: size, z: size },
    };
  };
  const kill = (tweens: gsap.core.Tween[]) => {
    tweens.splice(0).forEach((tween) => tween.kill());
  };
  const applySection = (next: KeyboardSection, immediate = false) => {
    if (disposed) return;
    section = next;
    onSection(next);
    kill(sectionTweens);
    kill(loops);
    kill(pending);
    const target = pose();
    for (const [value, destination] of [[position, target.position], [rotation, target.rotation], [scale, target.scale]] as const) {
      sectionTweens.push(gsap.to(value, { ...destination, duration: immediate ? 0 : 1, ease: "power1.out", overwrite: true, onUpdate: applyPose }));
    }
    api.setNodeVisible(scene.labelsId, next === "skills");
    showCounter(next === "skills" && inSkills());
    // Legacy manageAnimations waits for the cat, then another 600ms for keys.
    const catDelay = next === "projects" ? 0.3 : 0.2;
    pending.push(gsap.delayedCall(catDelay, () => {
      if (disposed || section !== next) return;
      api.setNodeVisible(scene.catId, next === "projects");
      catFrame.value = 0;
      let displayedFrame = -1;
      const showFrame = () => {
        const frame = Math.floor(catFrame.value) % 2;
        if (frame === displayedFrame) return;
        displayedFrame = frame;
        scene.frameIds.forEach((id, index) => api.setNodeVisible(id, next === "projects" && index === frame));
      };
      showFrame();
      if (next === "projects") loops.push(gsap.to(catFrame, {
        value: 2, duration: 0.2, repeat: -1, ease: "none", onUpdate: showFrame,
      }));
    }));
    pending.push(gsap.delayedCall(catDelay + 0.6, () => {
      if (disposed || section !== next) return;
      kill(keyTweens);
      if (next === "contact") {
        // The normalized mesh is already upright; retain only the teardown yaw.
        sectionTweens[1]?.kill();
        loops.push(gsap.fromTo(rotation, { x: 0, y: 0, z: 0 }, {
          y: -Math.PI / 2, duration: 5, repeat: -1, yoyo: true,
          yoyoEase: true, ease: "power1.out", onUpdate: applyPose,
        }));
      }
      const keys = scene.keys.map((key, index) => ({ key, index, offset: keyOffsets[index] }));
      if (next === "contact") keys.sort(() => Math.random() - 0.5);
      keys.forEach(({ index: keyIndex, offset }, index) => {
        // Spline animates the skill group by 200–400 units; one cap is 296.7413.
        keyTweens.push(gsap.to(offset, next === "contact" ? {
          y: (200 + Math.random() * 200) / 296.741333,
          duration: 2 + Math.random() * 2, delay: index * 0.6,
          repeat: -1, yoyo: true, yoyoEase: "none", ease: "elastic.out(1,0.3)",
          onUpdate: () => { applyKey(keyIndex); },
        } : next === "hero" ? {
          // A diagonal wave across the six-key rows.
          y: 0.16, duration: 1.4, delay: 1.2 + ((keyIndex % 6) + Math.floor(keyIndex / 6)) * 0.14,
          repeat: -1, yoyo: true, ease: "sine.inOut",
          onUpdate: () => { applyKey(keyIndex); },
        } : {
          y: 0, duration: 4, ease: "elastic.out(1,0.7)",
          onUpdate: () => { applyKey(keyIndex); },
        }));
      });
      onVisibility();
    }));
    onVisibility();
  };
  const onVisibility = () => {
    const hidden = document.hidden;
    api.setPaused(hidden);
    [...loops, ...sectionTweens, ...revealTweens, ...pending, ...keyTweens].forEach((t) => t.paused(hidden));
  };
  const syncSection = () => {
    let next: KeyboardSection = "hero";
    for (const { id, threshold } of SCROLL_SECTIONS) {
      if ((document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= window.innerHeight * threshold) next = id;
    }
    return next;
  };
  const triggers = SCROLL_SECTIONS
    .filter(({ id }) => document.getElementById(id))
    .map(({ id, previous, threshold }) => ScrollTrigger.create({
      trigger: `#${id}`,
      start: `top ${threshold * 100}%`,
      onEnter: () => { if (revealed) applySection(id); },
      onLeaveBack: () => { if (revealed) applySection(previous); },
    }));
  if (document.getElementById("skills")) triggers.push(ScrollTrigger.create({
    trigger: "#skills", start: "top 50%", end: "bottom 20%",
    onToggle: ({ isActive }) => { if (revealed) showCounter(isActive && section === "skills"); },
  }));
  const resize = () => { if (revealed) applySection(syncSection(), true); };
  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", onVisibility);
  api.setNodeVisible(scene.boardId, false);
  return {
    // hide until socket connected + counts received
    setRipple,
    setCounterEnabled(enabled: boolean) {
      if (disposed || enabled === counterEnabled) return;
      counterEnabled = enabled;
      showCounter(counterWanted);
    },
    reveal() {
      if (revealed || disposed) return;
      revealed = true;
      api.setNodeVisible(scene.boardId, true);
      applySection(syncSection(), true);
      revealScale.value = 0.001;
      setTransform(scene.revealId, { scale: [0.001, 0.001, 0.001] });
      revealTweens.push(gsap.to(revealScale, { value: 1, duration: 1.5, ease: "elastic.out(1,0.6)",
        onUpdate: () => { setTransform(scene.revealId, { scale: [revealScale.value, revealScale.value, revealScale.value] }); },
      }));
      // Keys fly in from random directions, tumbling, and settle into their slots.
      const order = scene.keys.map((_, index) => index).sort(() => Math.random() - 0.5);
      if (section !== "contact") order.forEach((index, n) => {
        const key = scene.keys[index];
        const offset = keyRevealOffsets[index];
        const angle = Math.random() * Math.PI * 2;
        const distance = 7 + Math.random() * 5;
        Object.assign(offset, {
          x: Math.cos(angle) * distance, y: 3 + Math.random() * 4,
          z: Math.sin(angle) * distance, spin: (Math.random() - 0.5) * Math.PI * 3,
          scale: 0.02,
        });
        api.setNodeVisible(key.motionId, false);
        applyKey(index);
        const delay = 0.7 + n * 0.05;
        revealTweens.push(gsap.delayedCall(delay, () => {
          api.setNodeVisible(key.motionId, true);
        }));
        revealTweens.push(gsap.to(offset, { x: 0, y: 0, z: 0, spin: 0, scale: 1, delay,
          duration: 1.2, ease: "back.out(1.7)", onUpdate: () => { applyKey(index); } }));
      });
      onVisibility();
    },
    dispose() {
      disposed = true;
      gsap.ticker.remove(stepRipple);
      kill(loops); kill(sectionTweens); kill(revealTweens); kill(pending); kill(keyTweens);
      triggers.forEach((t) => t.kill());
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      [scene.boardId, scene.spinId, scene.revealId, ...scene.keys.map((key) => key.motionId), ...scene.frameIds, scene.labelsId].forEach((id) => api.clearNodeOverrides(id));
      api.clearNodeOverrides(scene.counterId);
      api.setNodeVisible(scene.catId, false);
    },
  };
}
