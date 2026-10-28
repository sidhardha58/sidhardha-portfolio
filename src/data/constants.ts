// Keycap order is the SKILLS object order, six keys per row.
// The last row is short and the scene centers it.
export enum SkillNames {
  REACT = "react",
  NEXTJS = "nextjs",
  TS = "ts",
  JS = "js",
  TAILWIND = "tailwind",
  THREEJS = "threejs",
  HTML = "html",
  CSS = "css",
  FIGMA = "figma",
  CHARTJS = "chartjs",
  GIT = "git",
  VERCEL = "vercel",
  NODEJS = "nodejs",
  EXPRESS = "express",
  NESTJS = "nestjs",
  MONGODB = "mongodb",
  FIREBASE = "firebase",
  OPENAI = "openai",
  CPP = "cpp",
  ARDUINO = "arduino",
  RASPBERRYPI = "raspberrypi",
}

export type Skill = {
  id: number;
  name: string;
  label: string;
  shortDescription: string;
  color: string;
  icon: string;
  keyboardIcon?: string;
  keyboardColor?: string;
  shortcut?: string;
};

const key = (
  id: number,
  name: string,
  label: string,
  shortDescription: string,
  color: string,
  file: string,
  keyboardColor: string,
): Skill => ({
  id,
  name,
  label,
  shortDescription,
  color,
  icon: `/assets/keyboard/logos/${file}?v=6`,
  keyboardIcon: `/assets/keyboard/logos/${file}?v=6`,
  keyboardColor,
});

export const SKILLS: Record<SkillNames, Skill> = {
  [SkillNames.REACT]: key(1, "react", "React", "UI I ship from Figma into production components.", "#61dafb", "react.svg", "#00cce8"),
  [SkillNames.NEXTJS]: key(2, "nextjs", "Next.js", "App-router sites, including Yumegaku.", "#ffffff", "nextjs.svg", "#333537"),
  [SkillNames.TS]: key(3, "ts", "TypeScript", "Typed React frontends and NestJS APIs.", "#007acc", "ts.svg", "#008fd5"),
  [SkillNames.JS]: key(4, "js", "JavaScript", "The language I write every day.", "#f0db4f", "js.svg", "#ff9408"),
  [SkillNames.TAILWIND]: key(5, "tailwind", "Tailwind", "Responsive styling on the interfaces I build.", "#38bdf8", "tailwind.svg", "#00bfd8"),
  [SkillNames.THREEJS]: key(6, "threejs", "Three.js", "The 3D floor visualiser at NestUp.", "#ffffff", "threejs.svg", "#2b2d30"),
  [SkillNames.HTML]: key(7, "html", "HTML", "Semantic pages under every interface.", "#e34f26", "html5.svg", "#e34f26"),
  [SkillNames.CSS]: key(8, "css", "CSS", "Layout when Tailwind is not the right tool.", "#1572b6", "css3.svg", "#1572b6"),
  [SkillNames.FIGMA]: key(9, "figma", "Figma", "Designs I turn into React at myMooment.", "#f24e1e", "figma.svg", "#f24e1e"),
  [SkillNames.CHARTJS]: key(10, "chartjs", "Chart.js", "Live sensor charts on BluePulse.", "#ff6384", "chartjs.svg", "#ff6384"),
  [SkillNames.GIT]: key(11, "git", "Git", "Branches, pull requests, and code review.", "#f05032", "git.svg", "#f05032"),
  [SkillNames.VERCEL]: key(12, "vercel", "Vercel", "Where the frontends get deployed.", "#ffffff", "vercel.svg", "#111111"),
  [SkillNames.NODEJS]: key(13, "nodejs", "Node.js", "APIs behind the dashboards.", "#6cc24a", "nodejs.svg", "#3c873a"),
  [SkillNames.EXPRESS]: key(14, "express", "Express", "REST services for the MERN apps.", "#ffffff", "express.svg", "#333537"),
  [SkillNames.NESTJS]: key(15, "nestjs", "NestJS", "Govigi auth, products, cart, orders, and wallet.", "#e0234e", "nestjs.svg", "#e0234e"),
  [SkillNames.MONGODB]: key(17, "mongodb", "MongoDB", "Data store for Govigi and BluePulse.", "#47a248", "mongodb.svg", "#116149"),
  [SkillNames.FIREBASE]: key(18, "firebase", "Firebase", "Sign-in and data for ZALA.", "#ffca28", "firebase.svg", "#b45309"),
  [SkillNames.OPENAI]: key(19, "openai", "OpenAI", "Translation and summaries on Yumegaku.", "#10a37f", "openai.svg", "#10a37f"),
  [SkillNames.CPP]: key(20, "cpp", "C++", "C++ solutions in my LeetCode repo, and the Codio certificate.", "#00599c", "cplusplus.svg", "#00599c"),
  [SkillNames.ARDUINO]: key(21, "arduino", "Arduino", "Sensor boards behind BluePulse.", "#00979d", "arduino.svg", "#00878f"),
  [SkillNames.RASPBERRYPI]: key(22, "raspberrypi", "Raspberry Pi", "Edge compute for the kiosk and spy cam.", "#c51a4a", "raspberrypi.svg", "#a22846"),
};

export type Experience = {
  id: number;
  periods: { start: string; end: string }[];
  title: string;
  company: string;
  description: string[];
  skills: SkillNames[];
  logo: string;
  media: { src: string; alt: string }[];
  link?: { href: string; label: string };
};

export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    periods: [{ start: "May 2026", end: "Present" }],
    title: "AI Automation Engineer",
    company: "NestUp Modular Space · Hyderabad",
    description: [
      "Rebuilding NestUp's modular furniture operations platform in the MERN stack, from the sales desk through to the factory floor.",
      "Separate portals for sales, site measurement, QA, cutting, and pressing, plus a homeowner view, so each team sees only its own stage.",
      "One job status follows an order through cutting, packing, and delivery, and a 3D floor visualiser lets a measured room be reviewed before it is cut.",
    ],
    logo: "/assets/experience/nestup-avatar.svg",
    media: [
      { src: "/assets/experience/nestup-team.jpg", alt: "The NestUp team at the factory" },
      { src: "/assets/experience/nestup-3d.jpg", alt: "A room reviewed in the NestUp 3D visualiser" },
    ],
    skills: [SkillNames.REACT, SkillNames.NEXTJS, SkillNames.NODEJS, SkillNames.EXPRESS, SkillNames.MONGODB, SkillNames.THREEJS],
  },
  {
    id: 2,
    periods: [{ start: "Feb 2026", end: "May 2026" }],
    title: "MERN Stack Developer",
    company: "myMooment Technologies · Remote",
    description: [
      "Built the partner dashboard in React, TypeScript, and Vite from the product designs: phone login, a protected app shell, and onboarding.",
      "The dashboard covers menus, working hours, coupons, documents, bookings, revenue, subscriptions, and support tickets, each on its own API.",
      "Agreed those API shapes with the backend team up front, which cut UI-to-API integration bugs by about 30%.",
    ],
    logo: "/assets/experience/mymooment-avatar.jpg",
    media: [
      { src: "/assets/experience/mymooment.jpg", alt: "Menu sections and items from the myMooment partner app" },
      { src: "/assets/experience/mymooment-plans.jpg", alt: "Subscription plans on the myMooment partner dashboard" },
    ],
    link: { href: "https://github.com/sidhardha58/Internship-Experince", label: "Internship repository" },
    skills: [SkillNames.REACT, SkillNames.TS, SkillNames.TAILWIND, SkillNames.FIGMA],
  },
  {
    id: 3,
    periods: [{ start: "Nov 2025", end: "Feb 2026" }],
    title: "Backend Developer Intern",
    company: "Govigi · Remote",
    description: [
      "Backend intern on Govigi's B2B grocery commerce API, built in NestJS, TypeScript, and MongoDB.",
      "Shipped registration, the product catalog, cart, orders, and a digital wallet: a little over 20 routes, each guarded with JWT.",
      "Role checks decide who can administer, sell, or buy, and checkout and wallet are separate services, so either can change on its own.",
    ],
    logo: "/assets/experience/govigi-avatar.jpg",
    media: [
      { src: "/assets/experience/govigi-site.jpg", alt: "The Govigi storefront" },
      { src: "/assets/experience/govigi-app.jpg", alt: "The Govigi product catalogue" },
    ],
    skills: [SkillNames.NESTJS, SkillNames.MONGODB, SkillNames.NODEJS, SkillNames.TS],
  },
  {
    id: 4,
    periods: [{ start: "2024", end: "2025" }],
    title: "Co-Founder",
    company: "ZALA · Startup idea",
    description: [
      "Co-founded ZALA, a startup idea for reading books in VR, where each story becomes a 3D scene with audiobook narration.",
      "Built the product site in React, TypeScript, and Vite with Firebase sign-in: library, events, pricing, franchise enquiries, and a demo.",
      "Shaped the first demo, \"Whispers Between Pages\", a five-minute walk through the ZALA café, with a Greek mythology title planned next.",
    ],
    logo: "/assets/experience/zala-avatar.jpg",
    media: [
      { src: "/assets/experience/zala-team.jpg", alt: "Illustrated ZALA team" },
      { src: "/assets/experience/zala-site.jpg", alt: "ZALA Plus, Premium, and Creator plans" },
    ],
    skills: [SkillNames.REACT, SkillNames.TS, SkillNames.TAILWIND, SkillNames.FIREBASE],
  },
  {
    id: 5,
    periods: [{ start: "2023", end: "2025" }],
    title: "Tech Lead",
    company: "ASTEC · Aditya College IoT and space club",
    description: [
      "Tech lead of ASTEC (Aditya Space Technology Enthusiasts & Collaborators), the IoT and space technology club at Aditya College.",
      "Led the technical side of club projects, from picking boards and sensors to getting member prototypes working for club events.",
      "Helped launch the club and its inauguration, and brought new members onto Arduino and Raspberry Pi builds.",
    ],
    logo: "/assets/experience/astec-avatar.jpg",
    media: [
      { src: "/assets/experience/astec-team.jpg", alt: "ASTEC members at the club inauguration" },
      { src: "/assets/experience/astec-rover.jpg", alt: "A rover model from the club" },
    ],
    skills: [SkillNames.ARDUINO, SkillNames.RASPBERRYPI],
  },
  {
    id: 6,
    periods: [{ start: "Oct 2023", end: "Present" }],
    title: "University Innovation Fellow",
    company: "Stanford d.school",
    description: [
      "University Innovation Fellow for Aditya College of Engineering, Fall 2023 cohort of the Stanford d.school programme.",
      "Trained in design thinking, user research, and venture creation, and use that on the products I ship.",
      "Attended the fellows summit at the University of Twente in Enschede alongside fellows from other campuses.",
      "Prototyped sustainability ideas there with design-thinking methods from the d.school programme.",
    ],
    logo: "/assets/experience/uif-avatar.jpg",
    media: [
      { src: "/assets/experience/uif-twente.jpg", alt: "University of Twente sign in Enschede" },
      { src: "/assets/experience/uif-summit.jpg", alt: "Sidhardha at the fellows summit in Twente" },
    ],
    skills: [],
  },
];

export type Certification = {
  name: string;
  issuer: string;
  issued: string;
  about: string;
  mark?: string;
};

export const CERTIFICATIONS: Certification[] = [
  {
    name: "Full Stack Development (MERN)",
    issuer: "SmartBridge with APSCHE",
    issued: "Jul 2025",
    about: "React, Express, and MongoDB. EXT-APSCHE_FSD-50667.",
    mark: SKILLS[SkillNames.NODEJS].icon,
  },
  {
    name: "Industry 4.0 and Industrial IoT",
    issuer: "NPTEL",
    issued: "Jan–Apr 2025",
    about: "12-week course beside the IoT degree. Score 82.",
    mark: SKILLS[SkillNames.ARDUINO].icon,
  },
  {
    name: "Git and GitHub Basics",
    issuer: "IBM",
    issued: "Aug 2024",
    about: "Commits, branches, and pull requests. CD0131EN.",
    mark: SKILLS[SkillNames.GIT].icon,
  },
  {
    name: "ReactJS",
    issuer: "Infosys Springboard",
    issued: "Jul 2024",
    about: "Components, props, and how a React app is put together.",
    mark: SKILLS[SkillNames.REACT].icon,
  },
  {
    name: "Introduction to Web Development",
    issuer: "IBM",
    issued: "Jul 2024",
    about: "HTML, CSS, and JavaScript. CAD101EN.",
    mark: SKILLS[SkillNames.HTML].icon,
  },
  {
    name: "C++ Programming: Basic Skills",
    issuer: "Codio",
    issued: "Jul 2024",
    about: "Syntax, control flow, and functions. cpp1.1.",
    mark: SKILLS[SkillNames.CPP].icon,
  },
  {
    name: "Excel Using AI",
    issuer: "Office Master",
    issued: "Jul 2024",
    about: "One-day workshop on spreadsheets with AI.",
  },
  {
    name: "Introduction to Prompt Engineering",
    issuer: "IBM",
    issued: "Jul 2024",
    about: "Writing prompts and checking the reply. AI0131EN.",
  },
  {
    name: "Introduction to Generative AI",
    issuer: "Google",
    issued: "Jun 2024",
    about: "What generative models produce. Badge 9346314.",
  },
  {
    name: "AI and Machine Learning internship",
    issuer: "APSSDC, IBM SkillsBuild, and Edunet",
    issued: "May–Jun 2024",
    about: "Six weeks of applied machine learning.",
  },
  {
    name: "Elements of AI",
    issuer: "MinnaLearn and the University of Helsinki",
    issued: "Mar 2024",
    about: "What current AI systems can and cannot do.",
  },
  {
    name: "MongoDB",
    issuer: "GeeksforGeeks",
    issued: "Completed",
    about: "Collections, documents, and queries.",
    mark: SKILLS[SkillNames.MONGODB].icon,
  },
];

export const themeDisclaimers = {
  light: [
    "Warning: Light mode emits a gazillion lumens of pure radiance!",
    "Caution: Light mode ahead! Please don't try this at home.",
    "Only trained professionals can handle this much brightness. Proceed with sunglasses!",
    "Brace yourself! Light mode is about to make everything shine brighter than your future.",
    "Flipping the switch to light mode... Are you sure your eyes are ready for this?",
  ],
  dark: [
    "Light mode? I thought you went insane... but welcome back to the dark side!",
    "Switching to dark mode... How was life on the bright side?",
    "Dark mode activated! Thanks you from the bottom of my heart, and my eyes too.",
    "Welcome back to the shadows. How was life out there in the light?",
    "Dark mode on! Finally, someone who understands true sophistication.",
  ],
};
