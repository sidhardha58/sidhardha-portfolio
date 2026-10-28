"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { ChibiScene, type ChibiSceneApi, type ScenePointerEvent, type RuntimeEvent } from "@chibi3d/runtime";
import { MousePointerClick, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EXPERIENCE, SKILLS, type SkillNames } from "@/data/constants";
import projects from "@/data/projects";
import { setSceneStatus } from "@/lib/scene-health";
import { usePreloader } from "../preloader";
import { createKeyboardScene, resolveKeyboardAsset, type KeyboardKey, type KeyboardSkill } from "./scene";
import { createKeyInput, isTypingTarget } from "./input";
import { createKeyboardMotion, type KeyboardSection } from "./motion";
import { useKeyboardSounds } from "./use-keyboard-sounds";
import { useAdaptiveGraphics } from "./use-adaptive-graphics";
import { useKeyboardCounts } from "./use-keyboard-counts";
import { keyWear } from "./wear";
import { createCounterMotion } from "./counter-motion";

// Where that skill was used, and what came out of using it. One line per place.
// A job and a project with the same name (ZALA, Govigi) stay as one row.
const USED: Record<string, string> = {
  "react|NestUp Modular Space": "Used on the sales desk and the room viewer. Learned to give each team its own screen.",
  "react|myMooment Technologies": "Used for the partner dashboard, built from the Figma file. Learned to turn a design into a signed-in app.",
  "react|ZALA": "Used for the library, events, and pricing pages. Learned to ship a demo someone can click through.",
  "react|Yumegaku": "Used for the reader screens. Learned to keep upload, translation, and playback in one flow.",
  "react|BluePulse": "Used for the live sensor view. Learned to show a reading as soon as it arrives.",
  "react|Book Store": "Used for the catalog. Learned card and table views over the same books.",
  "nextjs|NestUp Modular Space": "Used for the factory app. Learned how the desk and the floor share one set of routes.",
  "nextjs|Yumegaku": "Used for the reader app. Learned app routes for upload and playback.",
  "nextjs|Smart Inventory": "Used for stock, low-stock flags, and daily sales. Learned a signed-in inventory screen end to end.",
  "nodejs|NestUp Modular Space": "Used for the APIs between the desk and the floor. Learned one job status can follow an order through cutting and delivery.",
  "nodejs|Govigi": "Used on the commerce API. Learned to keep the catalog, cart, and orders on one backend.",
  "nodejs|Yumegaku": "Used for translation and PDF export. Learned to hand a finished page back to the reader.",
  "nodejs|BluePulse": "Used for the API that stores each sensor post. Learned a small route can feed a live dashboard.",
  "nodejs|Book Store": "Used for the catalog API. Learned create, read, update, and delete against MongoDB.",
  "nodejs|Smart Inventory": "Used for stock and sales routes. Learned to flag a product before it runs out.",
  "express|NestUp Modular Space": "Used for the routes the desk calls. Learned to keep each team on its own endpoint.",
  "express|BluePulse": "Used for the route the Arduino posts to. Learned to accept a reading and store it.",
  "express|Book Store": "Used for the catalog routes. Learned a thin API in front of MongoDB.",
  "mongodb|NestUp Modular Space": "Used to store an order as it moves through the factory. Learned one document can follow cutting, packing, and delivery.",
  "mongodb|Govigi": "Used for products, carts, orders, and the wallet. Learned to keep those collections separate.",
  "mongodb|Yumegaku": "Used for chat history and translated pages. Learned to store a document the reader can export.",
  "mongodb|BluePulse": "Used for the sensor history. Learned a reading is only useful if you can look it up later.",
  "mongodb|Book Store": "Used for the book records. Learned a catalog is just documents with a clean API.",
  "mongodb|Smart Inventory": "Used for products, stock, and daily sales. Learned to query what is running low.",
  "threejs|NestUp Modular Space": "Used for the room viewer. Learned to show a measured room before it is cut.",
  "ts|myMooment Technologies": "Used across the partner dashboard. Learned to catch a wrong API shape before it reached the screen.",
  "ts|ZALA": "Used on the product site. Learned to type the library, events, and pricing before wiring Firebase.",
  "ts|Govigi": "Used on the Nest routes. Learned to type a payload before it hits the database.",
  "ts|Smart Inventory": "Used on the inventory screens and routes. Learned to share one product type from the form to the database.",
  "tailwind|myMooment Technologies": "Used to match the dashboard to the design. Learned to stay with the spacing in the file.",
  "tailwind|ZALA": "Used on the marketing and pricing pages. Learned a small set of styles carries a whole site.",
  "tailwind|Yumegaku": "Used on the reader layout. Learned to keep a long page comfortable.",
  "tailwind|BluePulse": "Used on the dashboard layout. Learned to make a live chart the first thing on the screen.",
  "tailwind|Book Store": "Used for the card and table layouts. Learned two views can share one style.",
  "tailwind|Smart Inventory": "Used on the stock screens. Learned a dense table still needs room to read.",
  "figma|myMooment Technologies": "Used the product file as the source for the dashboard. Learned to build the screen that was drawn, not a new one.",
  "nestjs|Govigi": "Used for registration, the catalog, cart, orders, and the wallet. Learned to guard each route and keep checkout separate from the wallet.",
  "firebase|ZALA": "Used for sign-in on the product site. Learned to put the library and pricing behind one account.",
  "vercel|ZALA": "Used to publish the site. Learned a demo only counts once someone else can open it.",
  "openai|Yumegaku": "Used to translate and summarize an uploaded PDF. Learned to pass that result straight to text-to-speech.",
  "chartjs|BluePulse": "Used for the live sensor charts. Learned to keep a chart readable while new readings arrive.",
  "arduino|ASTEC": "Used on club prototypes. Learned to get a board and its sensors working in time for a demo.",
  "arduino|BluePulse": "Used to read pH, temperature, and the other water sensors. Learned to post each reading instead of leaving it on the board.",
  "raspberrypi|ASTEC": "Used on club builds. Learned to take a wiring idea through to something that runs at an event.",
  "raspberrypi|Autonomous Billing System": "Used to price the basket from the camera and the scale. Learned to join vision with a local database.",
  "raspberrypi|Spy Cam Security": "Used with the camera and a motion sensor. Learned to capture a frame only when the sensor trips.",
};

function skillPlaces(name: string) {
  const skill = name as SkillNames;
  const seen = new Set<string>();
  const rows: { place: string; note: string }[] = [];
  const add = (place: string) => {
    const key = place.toLowerCase();
    if (seen.has(key)) return;
    const note = USED[`${skill}|${place}`];
    if (!note) return;
    seen.add(key);
    rows.push({ place, note });
  };
  for (const item of EXPERIENCE) {
    if (item.skills.includes(skill)) add(item.company.split(" · ")[0]);
  }
  for (const item of projects) {
    if (item.uses.includes(skill)) add(item.title);
  }
  return rows;
}

const SceneCanvas = memo(ChibiScene);
const SCENE_STYLE: CSSProperties = {
  position: "fixed",
  inset: 0,
  width: "125vw",
  height: "125dvh",
};

export default function KeyboardScene({ maxDpr }: { maxDpr: number }) {
  const { isLoading, bypassLoading } = usePreloader();
  const api = useRef<ChibiSceneApi>(null);
  const failed = useRef(false);
  const motion = useRef<ReturnType<typeof createKeyboardMotion> | null>(null);
  const counterMotion = useRef<ReturnType<typeof createCounterMotion> | null>(null);
  const [loadVersion, setLoadVersion] = useState(0);
  const ready = loadVersion > 0;
  const [section, setSection] = useState<KeyboardSection>("hero");
  const [selected, setSelected] = useState<KeyboardSkill | null>(null);
  const playSound = useKeyboardSounds();
  const scene = useMemo(() => createKeyboardScene(Object.values(SKILLS).map((skill) => ({
    ...skill, icon: skill.keyboardIcon ?? skill.icon,
  }))), []);
  const { settings: graphics, markActive } = useAdaptiveGraphics(ready && !isLoading);
  const { shadows, softShadows, ao, bloom, lighting } = graphics;
  const environment = useMemo(() => ({
    ...scene.document.environment,
    shadows, softShadows, ao, bloom,
    contactShadows: false,
    vignette: false,
    preset: lighting ? scene.document.environment.preset : null,
  }), [scene, shadows, softShadows, ao, bloom, lighting]);
  const dpr = useMemo<[number, number]>(() =>
    [0.5, Math.min(graphics.dpr, maxDpr)], [maxDpr, graphics.dpr]);
  const visibleLabel = useRef<string | null>(null);
  const input = useMemo(() => createKeyInput(scene.keys), [scene]);
  const { counts, total, available, recordPress } = useKeyboardCounts();
  useEffect(() => {
    if (!ready || !api.current) return;
    const controller = createCounterMotion(api.current, scene.counter, markActive);
    counterMotion.current = controller;
    return () => { controller.dispose(); counterMotion.current = null; };
  }, [ready, loadVersion, scene, markActive]);
  useEffect(() => {
    counterMotion.current?.update(total, available);
  }, [total, available, ready, loadVersion, scene]);
  useEffect(() => {
    if (!ready) return;
    for (const key of scene.keys) {
      api.current?.setMaterial(key.materialId, keyWear(counts[key.skill.name] ?? 0));
    }
    markActive();
  }, [counts, ready, loadVersion, scene, markActive]);
  const paintKey = useCallback((key: KeyboardKey, pressed: boolean) => {
    markActive();
    api.current?.transitionNodeTo(key.nodeId, pressed ? key.pressedStateId : "base", { duration: pressed ? 0.08 : 0.18, ease: "easeInOut" });
    api.current?.setMaterial(key.materialId, {
      emissive: scene.document.materials[key.materialId].color,
      emissiveIntensity: pressed ? 0.7 : 0,
    });
  }, [scene, markActive]);
  const showLabel = useCallback((key: KeyboardKey | null) => {
    const id = key?.labelId ?? scene.defaultLabelId;
    if (visibleLabel.current !== id) {
      api.current?.setNodeVisible(visibleLabel.current ?? scene.defaultLabelId, false);
      api.current?.setNodeVisible(id, true);
      visibleLabel.current = id;
    }
    setSelected(key?.skill ?? null);
  }, [scene]);
  const hovering = useRef<KeyboardKey | null>(null);
  const pinned = useRef<KeyboardKey | null>(null);
  const [panel, setPanel] = useState<KeyboardSkill | null>(null);
  const [shown, setShown] = useState<KeyboardSkill | null>(null);
  const [panelPhase, setPanelPhase] = useState<"in" | "out">("in");
  const [heroHint, setHeroHint] = useState(false);
  const sectionRef = useRef(section);
  sectionRef.current = section;
  // In Skills, one key stays down and its panel stays open until another key is clicked.
  const demoKey = useRef<KeyboardKey | null>(null);
  const latched = useRef<KeyboardKey | null>(null);
  const [explored, setExplored] = useState(false);
  // Experience parks the board, so the hint only shows while the skills section is on screen.
  const [inSkills, setInSkills] = useState(false);
  useEffect(() => {
    if (!ready || !document.getElementById("skills")) return;
    gsap.registerPlugin(ScrollTrigger);
    const trigger = ScrollTrigger.create({
      trigger: "#skills", start: "top 50%", end: "bottom 20%",
      onToggle: ({ isActive }) => setInSkills(isActive),
      onRefresh: ({ isActive }) => setInSkills(isActive),
    });
    return () => trigger.kill();
  }, [ready]);
  useEffect(() => {
    if (ready && section === "skills") api.current?.setNodeVisible(scene.labelsId, inSkills);
    markActive();
  }, [ready, section, inSkills, scene, markActive]);
  const releaseDemo = useCallback((except?: KeyboardKey) => {
    const key = demoKey.current;
    demoKey.current = null;
    if (key && key !== except) paintKey(key, false);
  }, [paintKey]);
  useEffect(() => {
    if (!ready || isLoading || section !== "skills") {
      if (latched.current) paintKey(latched.current, false);
      return;
    }
    const key = latched.current ?? scene.keys[0];
    latched.current = key;
    pinned.current = key;
    demoKey.current = key;
    const timer = window.setTimeout(() => {
      if (latched.current !== key) return;
      paintKey(key, true);
      setPanel(key.skill);
      setExplored(true);
      if (!hovering.current) showLabel(key);
    }, 1100);
    return () => {
      window.clearTimeout(timer);
      if (sectionRef.current !== "skills" && latched.current) paintKey(latched.current, false);
    };
  }, [ready, isLoading, section, scene, paintKey, showLabel]);
  useEffect(() => input.subscribe((key, pressed) => {
    if (pressed) {
      releaseDemo(key);
      setExplored(true);
      pinned.current = key;
      if (sectionRef.current === "skills") {
        if (latched.current && latched.current !== key) paintKey(latched.current, false);
        latched.current = key;
        demoKey.current = key;
        setPanel(key.skill);
      }
      if (ready && !isLoading && !document.hidden) recordPress(key.skill.name);
      showLabel(hovering.current ?? key);
      paintKey(key, true);
      playSound(true);
      return;
    }
    if (sectionRef.current === "skills" && latched.current === key) return;
    paintKey(key, false);
    playSound(false);
  }), [input, paintKey, releaseDemo, showLabel, playSound, ready, isLoading, recordPress]);

  const onPointerEvent = useCallback((event: ScenePointerEvent) => {
    const pointer = `pointer:${event.pointerId}`;
    switch (event.type) {
      case "hoverEnter": {
        document.documentElement.style.cursor = "pointer";
        const key = scene.keys.find((item) => item.nodeId === event.nodeId);
        if (!key) break;
        hovering.current = key;
        showLabel(key);
        break;
      }
      case "hoverExit":
        document.documentElement.style.cursor = "";
        hovering.current = null;
        showLabel(pinned.current ?? demoKey.current);
        break;
      case "pointerDown": input.press(pointer, event.nodeId); break;
      case "pointerUp":
      case "pointerCancel": input.release(pointer); break;
    }
  }, [input, scene, showLabel]);
  const shownRef = useRef<KeyboardSkill | null>(null);
  useEffect(() => {
    const current = shownRef.current;
    if (!panel) {
      if (!current) return;
      setPanelPhase("out");
      const timer = window.setTimeout(() => { shownRef.current = null; setShown(null); }, 160);
      return () => window.clearTimeout(timer);
    }
    if (!current || current.name === panel.name) {
      shownRef.current = panel;
      setShown(panel);
      setPanelPhase(current ? "in" : "out");
      if (!current) {
        const frame = requestAnimationFrame(() => {
          requestAnimationFrame(() => setPanelPhase("in"));
        });
        return () => cancelAnimationFrame(frame);
      }
      return;
    }
    setPanelPhase("out");
    const timer = window.setTimeout(() => {
      shownRef.current = panel;
      setShown(panel);
      setPanelPhase("out");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setPanelPhase("in"));
      });
    }, 140);
    return () => window.clearTimeout(timer);
  }, [panel]);
  useEffect(() => {
    if (section !== "hero") {
      setHeroHint(false);
      motion.current?.setRipple(null);
      return;
    }
    const move = (event: PointerEvent) => {
      const near = motion.current?.setRipple({ x: event.clientX, y: event.clientY }) ?? false;
      setHeroHint((current) => current === near ? current : near);
    };
    const leave = () => {
      motion.current?.setRipple(null);
      setHeroHint(false);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerleave", leave);
    };
  }, [section]);
  const onLoad = useCallback(() => {
    if (failed.current) return;
    setLoadVersion((version) => version + 1);
    setSceneStatus("ready");
    bypassLoading();
  }, [bypassLoading]);
  const onError = useCallback((error: Error) => {
    failed.current = true;
    console.warn("Keyboard scene unavailable", error);
    setSceneStatus("failed");
    bypassLoading();
  }, [bypassLoading]);
  const onEvent = useCallback((event: RuntimeEvent) => {
    if (event.type === "contextLost") onError(new Error("WebGL context lost"));
  }, [onError]);

  useEffect(() => {
    if (!ready || !api.current) return;
    const controller = createKeyboardMotion(api.current, scene, (next) => {
      setSection(next);
      input.releaseAll();
      document.documentElement.style.cursor = "";
      const hash = next === "hero" ? "" : `#${next}`;
      window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search + hash);
    }, markActive);
    motion.current = controller;
    return () => { controller.dispose(); motion.current = null; };
  }, [ready, loadVersion, scene, input, markActive]);
  useEffect(() => {
    motion.current?.setCounterEnabled(available);
  }, [available, ready, loadVersion, scene, input, markActive]);
  // Rebind after each runtime load, once the replacement scene's nodes are mounted.
  useEffect(() => {
    if (ready && !isLoading) motion.current?.reveal();
  }, [ready, loadVersion, isLoading, scene, input]);

  useEffect(() => {
    if (!ready) return;
    // Restore the selected label if the runtime remounts.
    const active = visibleLabel.current ?? scene.defaultLabelId;
    for (const id of [scene.defaultLabelId, ...scene.keys.map((key) => key.labelId)]) {
      api.current?.setNodeVisible(id, id === active);
    }
  }, [ready, loadVersion, scene]);

  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.repeat || event.ctrlKey || event.metaKey || event.altKey || isTypingTarget(event.target)) return;
      const key = input.shortcuts.get(event.code);
      if (key) input.press(`key:${event.code}`, key.nodeId);
    };
    const up = (event: KeyboardEvent) => input.release(`key:${event.code}`);
    const release = () => input.releaseAll();
    const visibility = () => { if (document.hidden) release(); };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", release);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", release);
      document.removeEventListener("visibilitychange", visibility);
      release();
    };
  }, [input]);

  const places = shown ? skillPlaces(shown.name) : [];
  return (
    <>
      <SceneCanvas
        document={scene.document}
        environment={environment}
        resolveAsset={resolveKeyboardAsset}
        api={api}
        style={SCENE_STYLE}
        dpr={dpr}
        transparent
        orbit={false}
        orthographic
        pointerTargets={scene.pointerTargets}
        onPointerEvent={onPointerEvent}
        onLoad={onLoad}
        onError={onError}
        onEvent={onEvent}
      />
      {section === "skills" && inSkills && ready && (
        <div className="pointer-events-none fixed inset-x-4 bottom-8 z-20 text-center text-foreground">
          <p className="sr-only">{available ? `${total.toLocaleString("en-US")} keyboard presses by all visitors` : "Shared keyboard count unavailable"}</p>
          <div aria-live="polite" className="sr-only">
            <p className="text-xl font-semibold">{selected?.label ?? "Explore my skills"}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {selected?.shortDescription ?? "Click, tap, or press a letter key"}
            </p>
          </div>
          {!explored && (
            <p className="mx-auto flex w-fit items-center gap-2 rounded-full border border-border bg-background/90 px-4 py-2 text-sm text-foreground shadow-sm motion-safe:animate-pulse">
              <MousePointerClick aria-hidden className="size-4" />
              Click or tap any key to see how I use it
            </p>
          )}
        </div>
      )}
      {section === "hero" && heroHint && (
        <a
          href="#skills"
          className="fixed bottom-24 left-1/2 z-30 -translate-x-1/2 rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md dark:border-transparent dark:bg-white dark:text-black"
        >
          Go to Skills to explore
        </a>
      )}
      {section === "skills" && inSkills && shown && (
        <aside
          className="pointer-events-auto fixed right-4 top-24 z-30 flex max-h-[min(32rem,calc(100dvh-7.5rem))] flex-col overflow-hidden rounded-lg border border-border border-l-[3px] bg-card/95 p-4 text-foreground backdrop-blur-sm max-md:inset-x-4 max-md:bottom-4 max-md:top-auto max-md:max-h-[50dvh] w-80 max-md:w-auto"
          style={{ borderLeftColor: shown.keyboardColor ?? shown.color }}
        >
          <div className={`min-h-0 flex flex-1 flex-col transition duration-150 ${panelPhase === "out" ? "translate-x-3 opacity-0" : "translate-x-0 opacity-100"}`}>
            <div className="flex shrink-0 items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Used in</p>
                <h2 className="truncate text-lg font-semibold">{shown.label}</h2>
              </div>
              <button type="button" aria-label="Close" onClick={() => setPanel(null)} className="cursor-can-hover rounded-md p-1 text-muted-foreground hover:text-foreground">
                <X className="size-4" />
              </button>
            </div>
            <p className="mt-1 shrink-0 text-sm leading-snug text-muted-foreground">{shown.shortDescription}</p>
            {places.length === 0 ? (
              <p className="mt-3 text-sm">Not tied to a public project yet.</p>
            ) : (
              <ul
                data-lenis-prevent
                className="mt-3 min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain pr-3 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.35)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/35"
              >
                {places.map((place) => (
                  <li key={place.place} className="border-t border-border pt-3">
                    <div className="text-sm font-medium">{place.place}</div>
                    <p className="mt-0.5 text-sm leading-snug text-muted-foreground">{place.note}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      )}
    </>
  );
}
