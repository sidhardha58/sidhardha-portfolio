"use client";
import React, { useState } from "react";
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from "../ui/responsive-dialog";
import type { Skill } from "@/data/projects";
import { ScrollArea } from "../ui/scroll-area";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { motion } from "motion/react";
import { Button } from "../ui/button";

import projects, { type Project } from "@/data/projects";

const TechKey = ({ title, file, color }: Skill) => (
  <div className="flex w-16 flex-col items-center gap-1.5">
    <div
      className="grid size-12 place-items-center rounded-md shadow-[inset_0_-4px_0_rgba(0,0,0,0.28)]"
      style={{ backgroundColor: color }}
      title={title}
    >
      <span
        aria-hidden
        className="block size-6 bg-white"
        style={{
          WebkitMaskImage: `url(/assets/logos/${file})`,
          maskImage: `url(/assets/logos/${file})`,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskSize: "contain",
          maskSize: "contain",
        }}
      />
    </div>
    <span className="text-center text-[10px] leading-tight text-muted-foreground">{title}</span>
  </div>
);
import { SectionHeader } from "./section-header";

import SectionWrapper from "../ui/section-wrapper";
import ScrollingPreview from "../scrolling-preview";

const ProjectsSection = () => {
  return (
    <SectionWrapper id="projects" className="px-4 pt-16 pb-[50vh]">
      <SectionHeader id="projects" title="Projects" />
      <div className="section-fit">
      <div className="mx-auto w-full max-w-7xl">
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      </div>
      </div>
    </SectionWrapper>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex items-center justify-center">
      <ResponsiveDialog>
        <ResponsiveDialogTrigger className="bg-transparent flex justify-center w-full">
          <div
            className="group relative w-full max-w-[400px] h-auto rounded-lg overflow-hidden ring-1 ring-white/5"
            style={{ aspectRatio: "3/2" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
          >
            {/* `src` can be any aspect ratio (tall pages pan, normal ones fit);
                the wallpaper is an optional /assets/backgrounds/<id>.jpg. */}
            <ScrollingPreview
              src={project.src}
              alt={project.title}
              bg={undefined}
              isHovered={isHovered}
            />
            <div className={`absolute w-full bottom-0 left-0 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none z-10 ${project.hardware ? "h-28" : "h-24"}`}>
              <div className="flex flex-col h-full items-start justify-end p-4">
                <div className="text-lg text-left [text-shadow:0_1px_4px_rgba(0,0,0,0.6)]">
                  {project.title}
                </div>
                {project.hardware && (
                  <div className="text-xs text-foreground/90 [text-shadow:0_1px_4px_rgba(0,0,0,0.6)]">
                    {project.hardware}
                  </div>
                )}
                <div className="text-xs bg-primary text-primary-foreground rounded-lg w-fit px-2">
                  {project.category}
                </div>
              </div>
            </div>
          </div>
        </ResponsiveDialogTrigger>

        <ResponsiveDialogContent
          aria-describedby={undefined}
          className="md:max-w-4xl md:h-[85vh] md:!flex md:flex-col md:overflow-hidden md:p-0 md:gap-0"
        >
          {/* Sticky header */}
          <div className="shrink-0 border-b border-border bg-background px-4 py-4 sm:px-8 sm:py-5 md:pr-14">
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <ResponsiveDialogTitle className="font-display text-xl md:text-2xl font-bold text-foreground tracking-tight truncate">
                  {project.title}
                </ResponsiveDialogTitle>
                <span className="shrink-0 text-[11px] uppercase tracking-widest text-muted-foreground border border-border rounded-full px-3 py-0.5">
                  {project.category}
                </span>
              </div>
              <div className="shrink-0 flex items-center gap-2">
                {project.github && project.github !== "#" && (
                  <Link href={project.github} target="_blank" rel="noopener">
                    <Button variant="outline" size="sm" className="gap-2">
                      <SiGithub className="size-4" />
                      Source
                    </Button>
                  </Link>
                )}
                {project.live && project.live !== "#" && (
                  <Link href={project.live} target="_blank" rel="noopener">
                    <Button size="sm" className="gap-2">
                      <ArrowUpRight className="size-4" />
                      Visit
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Scrollable content */}
          <ScrollArea className="flex-1" type="always" data-lenis-prevent>
            <div className="px-4 py-6 sm:px-8 sm:py-8">
              {project.hardware && (
                <div className="mb-8">
                  <h3 className="mb-2 text-xl font-semibold tracking-tight">Hardware</h3>
                  <p className="font-mono text-sm text-foreground">{project.hardware}</p>
                </div>
              )}
              {/* Tech stack */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="flex flex-col md:flex-row gap-6 md:gap-10 mb-10"
              >
                {project.skills.frontend?.length > 0 && (
                  <div className="flex flex-col items-center md:items-start gap-2">
                    <span className="text-xs text-muted-foreground">Frontend</span>
                    <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                      {project.skills.frontend.map((skill) => <TechKey key={skill.title} {...skill} />)}
                    </div>
                  </div>
                )}
                {project.skills.backend?.length > 0 && (
                  <div className="flex flex-col items-center md:items-start gap-2">
                    <span className="text-xs text-muted-foreground">Backend</span>
                    <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                      {project.skills.backend.map((skill) => <TechKey key={skill.title} {...skill} />)}
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-10" />

              {/* Project content */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {project.content}
              </motion.div>

              <div className="mt-10 grid gap-3">
                {[project.src, ...project.screenshots].map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt={`${project.title} preview`}
                    loading="lazy"
                    className="max-h-[480px] w-full rounded-lg border border-border object-cover object-top"
                  />
                ))}
              </div>
            </div>
          </ScrollArea>

        </ResponsiveDialogContent>
      </ResponsiveDialog>
    </div>
  );
};

export default ProjectsSection;
