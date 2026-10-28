import { useState } from "react";
import { X } from "lucide-react";
import { CERTIFICATIONS, EXPERIENCE, SkillNames, SKILLS } from "@/data/constants";
import { SectionHeader } from "./section-header";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import SectionWrapper from "../ui/section-wrapper";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const ExperienceSection = () => {
  return (
    <>
      <SectionWrapper
        id="experience"
        className="flex flex-col items-center justify-center min-h-[120vh] py-20"
      >
        <div className="w-full max-w-4xl px-4 md:px-8 mx-auto">
          <SectionHeader
            id="experience"
            title="Experience"
            desc="My professional journey."
            className="mb-12 md:mb-20 mt-0"
          />

          <div className="flex flex-col gap-8 md:gap-12 relative">
            <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-px bg-border hidden md:block -translate-x-1/2" />

            {EXPERIENCE.map((exp, index) => (
              <div key={exp.id} className="relative">
                <ExperienceCard experience={exp} index={index} />
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="certifications" className="flex flex-col items-center py-20">
        <div className="w-full max-w-4xl px-4 md:px-8 mx-auto">
          <SectionHeader
            id="certifications"
            title="Certifications"
            desc="Courses and internships."
            className="mb-12 md:mb-16 mt-0"
          />
          <ul className="grid gap-3 sm:grid-cols-2">
            {CERTIFICATIONS.map((item, index) => (
              <li key={`cert-${index}`} className="flex gap-3 rounded-lg border border-border bg-card px-4 py-4">
                <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-md border border-border bg-secondary">
                  {item.mark ? (
                    <img src={item.mark} alt="" className="size-5 object-contain invert dark:invert-0" />
                  ) : (
                    <span className="font-mono text-[11px] font-medium text-foreground">
                      {item.issuer.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </span>
                <div className="min-w-0">
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="min-w-0 break-words font-medium text-foreground">{item.name}</div>
                    <div className="shrink-0 font-mono text-xs text-muted-foreground">{item.issued}</div>
                  </div>
                  <div className="mt-1 text-sm text-foreground/80">{item.issuer}</div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.about}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </SectionWrapper>
    </>
  );
};

const ExperienceCard = ({
  experience,
  index,
}: {
  experience: (typeof EXPERIENCE)[0];
  index: number;
}) => {
  const [photo, setPhoto] = useState<{ src: string; alt: string } | null>(null);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <Card
        className={cn(
          "group bg-card text-card-foreground border-border",
          "hover:border-primary/20 transition-colors duration-300",
          "shadow-sm hover:shadow-md",
          "flex flex-col md:flex-row"
        )}
      >
        <div className="flex shrink-0 flex-col gap-2 px-6 pt-6 md:w-72 md:pb-6 md:pr-0">
          {experience.media.map((m, i) => (
            <button
              key={m.src}
              type="button"
              onClick={() => setPhoto(m)}
              className={cn("block overflow-hidden rounded-md border border-border text-left", i > 0 && "hidden md:block")}
            >
              <img
                src={m.src}
                alt={m.alt}
                loading="lazy"
                className={cn(
                  "w-full object-cover transition duration-300 hover:scale-[1.03]",
                  i === 0 ? "aspect-[16/10] md:aspect-[4/3]" : "aspect-[16/9]"
                )}
              />
            </button>
          ))}
        </div>
        <div className="min-w-0 flex-1">
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <img
                  src={experience.logo}
                  alt={`${experience.company.split(" · ")[0]} logo`}
                  loading="lazy"
                  className="size-11 shrink-0 rounded-full border border-border object-cover"
                />
                <div className="min-w-0 space-y-0.5">
                  <CardTitle className="text-xl font-bold tracking-tight">
                    {experience.title}
                  </CardTitle>
                  <div className="text-base font-medium text-muted-foreground">
                    {experience.company}
                  </div>
                </div>
              </div>
              <ol className="relative flex flex-col gap-2.5 md:items-end">
                {experience.periods.length > 1 && (
                  <span className="absolute left-[3.5px] md:left-auto md:right-[3.5px] top-2 bottom-2 w-px bg-border" />
                )}
                {experience.periods.map((p, i) => {
                  const active = p.end === "Present";
                  return (
                    <li
                      key={i}
                      className={cn(
                        "relative flex items-center gap-2.5 md:flex-row-reverse font-mono text-xs",
                        active ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      <span className="relative flex size-2 shrink-0">
                        <span
                          className={cn(
                            "relative size-2 rounded-full",
                            active
                              ? "bg-emerald-500"
                              : "border border-muted-foreground/50 bg-card"
                          )}
                        />
                      </span>
                      {p.start} - {p.end}
                    </li>
                  );
                })}
              </ol>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <ul className="list-disc list-outside ml-4 space-y-2 text-base text-muted-foreground leading-relaxed">
              {experience.description.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>

            {experience.link && (
              <Link
                href={experience.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
              >
                {experience.link.label}
              </Link>
            )}

            <div className="flex flex-wrap gap-2">
              {experience.skills.map((skillName) => {
                const skill = SKILLS[skillName as SkillNames];
                return (
                  <Badge
                    key={skillName}
                    variant="outline"
                    className="gap-1.5 text-xs font-normal text-muted-foreground bg-secondary/30 border-transparent"
                  >
                    {/* mono until card hover -> less noise across 10+ logos */}
                    <img
                      src={skill.icon}
                      alt=""
                      className="w-3.5 h-3.5 object-contain invert dark:invert-0 opacity-70 transition duration-300 group-hover:opacity-100"
                    />
                    {skill.label}
                  </Badge>
                );
              })}
            </div>
          </CardContent>
        </div>
      </Card>
      {photo && (
        <div
          className="pointer-events-auto fixed inset-0 z-[1100] flex items-center justify-center bg-black/80 p-6"
          data-lenis-prevent
          onClick={() => setPhoto(null)}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setPhoto(null)}
            className="absolute right-5 top-5 grid size-10 place-items-center rounded-full bg-white text-black"
          >
            <X className="size-5" />
          </button>
          <img
            src={photo.src}
            alt={photo.alt}
            className="max-h-[85dvh] max-w-[92vw] object-contain"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </motion.div>
  );
};

export default ExperienceSection;
