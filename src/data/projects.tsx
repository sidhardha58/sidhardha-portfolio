import { TypographyH3, TypographyP } from "@/components/ui/typography";
import type { ReactNode } from "react";
import { SkillNames } from "@/data/constants";

const brand = (title: string, file: string, color: string) => ({ title, file, color });

const PROJECT_SKILLS = {
  next: brand("Next.js", "nextdotjs-mono.svg", "#333537"),
  node: brand("Node.js", "nodedotjs-mono.svg", "#3c873a"),
  python: brand("Python", "python-mono.svg", "#3776ab"),
  mongo: brand("MongoDB", "mongodb-mono.svg", "#116149"),
  express: brand("Express", "express-mono.svg", "#333537"),
  tailwind: brand("Tailwind", "tailwind-css-mono.svg", "#00bfd8"),
  firebase: brand("Firebase", "firebase-mono.svg", "#b45309"),
  js: brand("JavaScript", "javascript-mono.svg", "#ff9408"),
  ts: brand("TypeScript", "typescript-mono.svg", "#008fd5"),
  react: brand("React.js", "react-mono.svg", "#00cce8"),
  vercel: brand("Vercel", "vercel-mono.svg", "#111111"),
};

export type Skill = {
  title: string;
  file: string;
  color: string;
};

export type Project = {
  id: string;
  category: string;
  title: string;
  summary: string;
  src: string;
  screenshots: string[];
  skills: { frontend: Skill[]; backend: Skill[] };
  content: ReactNode;
  github?: string;
  live: string;
  uses: SkillNames[];
};

const projects: Project[] = [
  {
    id: "yumegaku",
    category: "Japanese learning",
    title: "Yumegaku",
    summary: "Readers upload a PDF. OpenAI translates it, and text-to-speech reads the result.",
    src: "/assets/projects-screenshots/yumegaku.jpg",
    screenshots: [],
    live: "https://yumegaku.vercel.app/",
    github: "https://github.com/sidhardha58/JuyoJisho",
    uses: [SkillNames.REACT, SkillNames.NEXTJS, SkillNames.TAILWIND, SkillNames.NODEJS, SkillNames.MONGODB, SkillNames.OPENAI],
    skills: {
      frontend: [PROJECT_SKILLS.react, PROJECT_SKILLS.next, PROJECT_SKILLS.tailwind],
      backend: [PROJECT_SKILLS.node, PROJECT_SKILLS.mongo],
    },
    content: (
      <div>
        <TypographyP className="font-mono">
          Japanese learning platform. Readers upload a PDF, OpenAI translates and summarizes it, and text-to-speech reads the result. Chat history and translated pages export as PDFs.
        </TypographyP>
        <TypographyH3 className="my-4 mt-8">What it does</TypographyH3>
        <p className="font-mono mb-2">
          Built with MERN and Next.js. The document tools cut manual processing for readers working across languages.
        </p>
      </div>
    ),
  },
  {
    id: "zala",
    category: "Startup idea",
    title: "ZALA",
    summary: "VR scenes with audiobook narration, and a site for the library, events, and pricing.",
    src: "/assets/projects-screenshots/zala.jpg?v=2",
    screenshots: [],
    live: "https://zala-cyan.vercel.app",
    github: "https://github.com/sidhardha58/Zala",
    uses: [SkillNames.REACT, SkillNames.TS, SkillNames.TAILWIND, SkillNames.FIREBASE, SkillNames.VERCEL],
    skills: {
      frontend: [PROJECT_SKILLS.react, PROJECT_SKILLS.ts, PROJECT_SKILLS.tailwind],
      backend: [PROJECT_SKILLS.firebase, PROJECT_SKILLS.vercel],
    },
    content: (
      <div>
        <TypographyP className="font-mono">
          Where books come alive. ZALA pairs VR scenes with audiobook narration, so a reader walks through the story while it is read aloud. The site covers the library, live author events, pricing, franchise enquiries, and the first demo, &quot;Whispers Between Pages&quot;. Built in React, TypeScript, and Vite with Firebase sign-in.
        </TypographyP>
      </div>
    ),
  },
  {
    id: "bluepulse",
    category: "IoT dashboard",
    title: "BluePulse",
    summary: "Arduino sensors post water readings to an Express and MongoDB dashboard.",
    src: "/assets/projects-screenshots/bluepulse.jpg",
    screenshots: [],
    live: "#",
    github: "https://github.com/sidhardha58/Blue_Pulse",
    uses: [SkillNames.REACT, SkillNames.TAILWIND, SkillNames.NODEJS, SkillNames.EXPRESS, SkillNames.MONGODB, SkillNames.CHARTJS, SkillNames.ARDUINO],
    skills: {
      frontend: [PROJECT_SKILLS.react, PROJECT_SKILLS.tailwind],
      backend: [PROJECT_SKILLS.node, PROJECT_SKILLS.express, PROJECT_SKILLS.mongo],
    },
    content: (
      <div>
        <TypographyP className="font-mono">
          Real-time water quality monitoring. An Arduino Uno with an ESP8266 reads pH, temperature, dissolved oxygen, conductivity, and NPK sensors, then posts each reading to an Express and MongoDB API. The React dashboard shows live values behind JWT sign-in and drives a smart irrigation view. The cover is the working bench: the sensors, and the live charts on the laptop.
        </TypographyP>
      </div>
    ),
  },
  {
    id: "billing",
    category: "IoT + computer vision",
    title: "Autonomous Billing System",
    summary: "A camera and a Raspberry Pi identify items and price the basket.",
    src: "/assets/projects-screenshots/billing-kiosk.jpg",
    screenshots: [],
    live: "#",
    uses: [SkillNames.RASPBERRYPI],
    skills: {
      frontend: [],
      backend: [PROJECT_SKILLS.python],
    },
    content: (
      <div>
        <TypographyP className="font-mono">
          Final-year team project at Aditya College (2024-25, in progress). A checkout kiosk where a camera identifies items with YOLO and OpenCV, a load cell under the tray confirms the weight, and a Raspberry Pi prices the basket from a local database. Shoppers confirm or remove items on a live bill before paying. The cover is our 3D model of the kiosk.
        </TypographyP>
      </div>
    ),
  },
  {
    id: "govigi",
    category: "B2B commerce API",
    title: "Govigi",
    summary: "NestJS routes for the catalog, cart, orders, and digital wallet.",
    src: "/assets/projects-screenshots/govigi.jpg",
    screenshots: [],
    live: "https://www.govigi.com/",
    github: "https://github.com/sidhardha58/Govigi",
    uses: [SkillNames.NESTJS, SkillNames.TS, SkillNames.NODEJS, SkillNames.MONGODB],
    skills: {
      frontend: [],
      backend: [PROJECT_SKILLS.ts, PROJECT_SKILLS.node, PROJECT_SKILLS.mongo],
    },
    content: (
      <div>
        <TypographyP className="font-mono">
          NestJS and MongoDB API from the Govigi internship. It exposes auth, products, cart, orders, and a digital wallet, with JWT and role checks on the routes. The cover is the live Govigi storefront.
        </TypographyP>
      </div>
    ),
  },
  {
    id: "bookstore",
    category: "MERN app",
    title: "Book Store",
    summary: "A React catalog with an Express and MongoDB API.",
    src: "/assets/projects-screenshots/bookstore.png",
    screenshots: [],
    live: "https://mern-book-store-client.vercel.app/",
    github: "https://github.com/sidhardha58/Book-Store",
    uses: [SkillNames.REACT, SkillNames.TAILWIND, SkillNames.NODEJS, SkillNames.EXPRESS, SkillNames.MONGODB],
    skills: {
      frontend: [PROJECT_SKILLS.react, PROJECT_SKILLS.tailwind],
      backend: [PROJECT_SKILLS.node, PROJECT_SKILLS.express, PROJECT_SKILLS.mongo],
    },
    content: (
      <div>
        <TypographyP className="font-mono">
          Book catalog with create, read, update, and delete, deployed on Vercel. The React and Tailwind client switches between card and table views. Express and MongoDB serve the API. The cover is the card view from the live app.
        </TypographyP>
      </div>
    ),
  },
  {
    id: "inventory",
    category: "Inventory app",
    title: "Smart Inventory",
    summary: "Next.js inventory with stock levels, low-stock flags, and daily sales.",
    src: "/assets/projects-screenshots/inventory.jpg",
    screenshots: [],
    live: "#",
    github: "https://github.com/sidhardha58/Smart-Inventory-Management-System",
    uses: [SkillNames.NEXTJS, SkillNames.TS, SkillNames.TAILWIND, SkillNames.NODEJS, SkillNames.MONGODB],
    skills: {
      frontend: [PROJECT_SKILLS.next, PROJECT_SKILLS.ts, PROJECT_SKILLS.tailwind],
      backend: [PROJECT_SKILLS.node, PROJECT_SKILLS.mongo],
    },
    content: (
      <div>
        <TypographyP className="font-mono">
          Smart Zaiko, an inventory app in Next.js, TypeScript, and MongoDB. It covers categories, products with attributes, sales, stock levels with low-stock flags, and daily sales reports, behind email sign-in. The cover is the inventory screen, run locally with sample products.
        </TypographyP>
      </div>
    ),
  },
  {
    id: "spycam",
    category: "Python",
    title: "Spy Cam Security",
    summary: "A Raspberry Pi camera that captures a frame when the motion sensor trips.",
    src: "/assets/projects-screenshots/spycam.webp",
    screenshots: [],
    live: "#",
    github: "https://github.com/sidhardha58/spy-cam-security-system",
    uses: [SkillNames.RASPBERRYPI],
    skills: {
      frontend: [],
      backend: [PROJECT_SKILLS.python],
    },
    content: (
      <div>
        <TypographyP className="font-mono">
          Raspberry Pi security camera with a motion sensor. When the sensor trips, the script captures a frame. The cover is the working-setup photo from the repo: the board, the camera module, and a sample frame.
        </TypographyP>
      </div>
    ),
  },
];

export default projects;
