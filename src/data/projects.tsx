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
  hardware?: string;
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
        <TypographyH3 className="mb-2">What it is</TypographyH3>
        <TypographyP className="font-mono">
          A Japanese learning app. A reader uploads a PDF, and the app turns that document into something they can read, hear, and practise.
        </TypographyP>
        <TypographyH3 className="my-4 mt-8">What I built</TypographyH3>
        <TypographyP className="font-mono">
          The app is React and Next.js with Tailwind. Node and MongoDB keep the account, the uploaded pages, the chat, and the study streak. OpenAI translates the page and writes a short summary. The same app also has reading practice, letter drills, mock tests, a study plan, a resume builder, and a progress tracker.
        </TypographyP>
        <TypographyH3 className="my-4 mt-8">How it works</TypographyH3>
        <TypographyP className="font-mono">
          You upload a PDF on the same screen where you listen. The translated text is read aloud. Finished pages and the chat can be saved as a PDF. Sign-in sits in front of the library, so each reader keeps their own history.
        </TypographyP>
      </div>
    ),
  },
  {
    id: "zala",
    category: "Startup idea",
    title: "ZALA",
    summary: "VR scenes with audiobook narration, and a site for the library, events, and pricing.",
    src: "/assets/projects-screenshots/zala.jpg?v=2",
    screenshots: ["/assets/experience/zala-team.jpg", "/assets/experience/zala-site.jpg", "/assets/projects-screenshots/zala-cafe.jpg", "/assets/projects-screenshots/zala-library.jpg"],
    live: "#",
    github: "https://github.com/sidhardha58/Zala",
    uses: [SkillNames.REACT, SkillNames.TS, SkillNames.TAILWIND, SkillNames.FIREBASE, SkillNames.VERCEL],
    skills: {
      frontend: [PROJECT_SKILLS.react, PROJECT_SKILLS.ts, PROJECT_SKILLS.tailwind],
      backend: [PROJECT_SKILLS.firebase, PROJECT_SKILLS.vercel],
    },
    content: (
      <div>
        <TypographyH3 className="mb-2">What it is</TypographyH3>
        <TypographyP className="font-mono">
          A startup idea for reading a book as a 3D scene. Each story is a place you walk through, with the audiobook playing as you move.
        </TypographyP>
        <TypographyH3 className="my-4 mt-8">What I built</TypographyH3>
        <TypographyP className="font-mono">
          The product site is React, TypeScript, and Vite, with Firebase sign-in. The home page has the library, live author events, pricing, franchise enquiries, the team, and a demo. A signed-in reader gets a profile.
        </TypographyP>
        <TypographyH3 className="my-4 mt-8">How it works</TypographyH3>
        <TypographyP className="font-mono">
          The first demo, &quot;Whispers Between Pages&quot;, is a five-minute walk through the ZALA café. A Greek mythology title was planned as the next scene. The pictures are the team, the live site, the café scene, and the library art the site uses. The public demo still waits on an auth service that does not answer, so the source is the way in.
        </TypographyP>
      </div>
    ),
  },
  {
    id: "bluepulse",
    category: "IoT dashboard",
    title: "BluePulse",
    hardware: "Arduino Uno",
    summary: "An Arduino posts water readings to an Express and MongoDB dashboard.",
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
        <TypographyH3 className="mb-2">What it is</TypographyH3>
        <TypographyP className="font-mono">
          A water-quality monitor. Sensors on a bench post readings, and a dashboard shows them as they arrive.
        </TypographyP>
        <TypographyH3 className="my-4 mt-8">What I built</TypographyH3>
        <TypographyP className="font-mono">
          Hardware: Arduino Uno. Each post stores temperature, pH, oxygen, conductivity, and nitrate, with the time it was taken. Express and MongoDB keep the history. The React and Tailwind app has sign-in, live charts, a past-readings view, a danger alert when a value is off, and a smart irrigation screen.
        </TypographyP>
        <TypographyH3 className="my-4 mt-8">How it works</TypographyH3>
        <TypographyP className="font-mono">
          The board sends a reading to the API instead of keeping it on the bench. JWT sign-in guards the dashboard. The photo is the working bench: the sensors, and the charts on the laptop. There is no public deploy, so the source is the way in.
        </TypographyP>
      </div>
    ),
  },
  {
    id: "billing",
    category: "IoT + computer vision",
    title: "Autonomous Billing System",
    hardware: "Raspberry Pi, camera, load cell",
    summary: "A camera and a Raspberry Pi identify items and price the basket.",
    src: "/assets/projects-screenshots/billing-kiosk.jpg",
    screenshots: [],
    live: "#",
    uses: [SkillNames.RASPBERRYPI, SkillNames.PYTHON],
    skills: {
      frontend: [],
      backend: [PROJECT_SKILLS.python],
    },
    content: (
      <div>
        <TypographyH3 className="mb-2">What it is</TypographyH3>
        <TypographyP className="font-mono">
          A checkout kiosk for a final-year team project at Aditya College, 2024–25, still in progress. The basket is identified and priced without a cashier scanning each item.
        </TypographyP>
        <TypographyH3 className="my-4 mt-8">What I built</TypographyH3>
        <TypographyP className="font-mono">
          Hardware: Raspberry Pi. A camera over the tray names each item with YOLO and OpenCV. A load cell under the tray weighs the basket. The Pi looks up the price in a local database and writes a live bill. There is no separate website for this one. The program runs on the Pi.
        </TypographyP>
        <TypographyH3 className="my-4 mt-8">How it works</TypographyH3>
        <TypographyP className="font-mono">
          The camera and the scale have to agree. If the picture says one thing and the weight says another, the bill waits. The shopper can confirm an item or take it off before paying. The picture is the 3D model of that kiosk.
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
    screenshots: ["/assets/experience/govigi-site.jpg", "/assets/experience/govigi-app.jpg"],
    live: "https://www.govigi.com/",
    github: "https://github.com/sidhardha58/Govigi",
    uses: [SkillNames.NESTJS, SkillNames.TS, SkillNames.NODEJS, SkillNames.MONGODB],
    skills: {
      frontend: [],
      backend: [PROJECT_SKILLS.ts, PROJECT_SKILLS.node, PROJECT_SKILLS.mongo],
    },
    content: (
      <div>
        <TypographyH3 className="mb-2">What it is</TypographyH3>
        <TypographyP className="font-mono">
          The commerce API behind Govigi, from the internship. The storefront is the public site. The work here is the backend that shop runs on.
        </TypographyP>
        <TypographyH3 className="my-4 mt-8">What I built</TypographyH3>
        <TypographyP className="font-mono">
          NestJS and MongoDB, split into separate pieces: customers and sign-in, the product catalog, the cart, orders, a digital wallet, saved addresses, drivers, and SMS. TypeScript types the payload before it hits the database. JWT and role checks guard each route.
        </TypographyP>
        <TypographyH3 className="my-4 mt-8">How it works</TypographyH3>
        <TypographyP className="font-mono">
          A shopper signs in, adds products to a cart, and checks out into an order. The wallet and the address book stay beside that flow, so one of them can change without rewriting the others. The pictures are the live storefront and the product catalogue.
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
    screenshots: ["/assets/projects-screenshots/bookstore-table.png", "/assets/projects-screenshots/bookstore-detail.png"],
    live: "https://mern-book-store-client.vercel.app/",
    github: "https://github.com/sidhardha58/Book-Store",
    uses: [SkillNames.REACT, SkillNames.TAILWIND, SkillNames.NODEJS, SkillNames.EXPRESS, SkillNames.MONGODB],
    skills: {
      frontend: [PROJECT_SKILLS.react, PROJECT_SKILLS.tailwind],
      backend: [PROJECT_SKILLS.node, PROJECT_SKILLS.express, PROJECT_SKILLS.mongo],
    },
    content: (
      <div>
        <TypographyH3 className="mb-2">What it is</TypographyH3>
        <TypographyP className="font-mono">
          A book catalog you can browse as cards or as a table. You can add a book, open it, edit it, or delete it.
        </TypographyP>
        <TypographyH3 className="my-4 mt-8">What I built</TypographyH3>
        <TypographyP className="font-mono">
          The client is React, Vite, and Tailwind, deployed on Vercel. Express and MongoDB serve the catalog. A book record holds the title, author, genre, publish year, page count, and publisher. The card view and the table view read the same list.
        </TypographyP>
        <TypographyH3 className="my-4 mt-8">How it works</TypographyH3>
        <TypographyP className="font-mono">
          The API is a thin layer in front of MongoDB: list, one book, create, update, and delete. The pictures are the card view, the table view, and the details page from the app.
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
        <TypographyH3 className="mb-2">What it is</TypographyH3>
        <TypographyP className="font-mono">
          Smart Zaiko, an inventory app. It tracks what is in stock, what is running low, and what sold today.
        </TypographyP>
        <TypographyH3 className="my-4 mt-8">What I built</TypographyH3>
        <TypographyP className="font-mono">
          Next.js, TypeScript, and MongoDB. Sign-in opens a dashboard. Behind it are categories, products, extra attributes on a product, and a sales record. The same product shape is used on the form and in the database.
        </TypographyP>
        <TypographyH3 className="my-4 mt-8">How it works</TypographyH3>
        <TypographyP className="font-mono">
          A sale reduces what is on the shelf. The stock view can flag a product before it runs out, and the day view shows what sold. The picture is that inventory screen, run locally with sample products. There is no public deploy.
        </TypographyP>
      </div>
    ),
  },
  {
    id: "spycam",
    category: "Python",
    title: "Spy Cam Security",
    hardware: "Raspberry Pi 4, motion sensor, Pi camera",
    summary: "A Raspberry Pi camera that emails a photo when the motion sensor trips.",
    src: "/assets/projects-screenshots/spycam.webp",
    screenshots: ["/assets/projects-screenshots/spycam-setup.png", "/assets/projects-screenshots/spycam-circuit.jpg"],
    live: "#",
    github: "https://github.com/sidhardha58/spy-cam-security-system",
    uses: [SkillNames.RASPBERRYPI, SkillNames.PYTHON],
    skills: {
      frontend: [],
      backend: [PROJECT_SKILLS.python],
    },
    content: (
      <div>
        <TypographyH3 className="mb-2">What it is</TypographyH3>
        <TypographyP className="font-mono">
          A small security camera. It stays quiet until something moves, then it emails a photo.
        </TypographyP>
        <TypographyH3 className="my-4 mt-8">What I built</TypographyH3>
        <TypographyP className="font-mono">
          Hardware: Raspberry Pi 4, a PIR motion sensor, and a Pi camera on the camera port. A Python script watches the sensor, takes one frame, and sends that frame by email. Nothing is stored while the room is still.
        </TypographyP>
        <TypographyH3 className="my-4 mt-8">How it works</TypographyH3>
        <TypographyP className="font-mono">
          The sensor trips, the camera takes a snapshot, and the email goes out with the photo attached. The pictures are a sample frame, the wired board on the desk, and the circuit diagram from the repo.
        </TypographyP>
      </div>
    ),
  },
];

export default projects;
