
import { cacheLife } from "next/cache";
import { config } from "@/data/config";

// unauthenticated github api = 60 req/hr per ip; 5min cache -> ~12 req/hr
// a 403 during the Vercel build must not fail the page; the button shows 0
export async function getGithubStars(): Promise<number> {
  "use cache";
  cacheLife({ stale: 300, revalidate: 300 });

  const res = await fetch(
    `https://api.github.com/repos/${config.githubUsername}/${config.githubRepo}`,
    { headers: { Accept: "application/vnd.github+json" } },
  );
  if (!res.ok) return 0;

  const data = await res.json();
  return typeof data.stargazers_count === "number" ? data.stargazers_count : 0;
}
