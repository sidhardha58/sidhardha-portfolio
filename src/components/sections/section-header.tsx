import { cn } from "@/lib/utils"
import Link from "next/link"
import { BoxReveal } from "../reveal-animations"
import { ReactNode } from "react"

export const SectionHeader = ({ id, title, desc, className, compact }: { id: string, title: string | ReactNode, desc?: string, className?: string, compact?: boolean }) => {
  return (

    <div className={cn(compact ? "sticky top-28 z-20 mb-0" : "sticky top-[70px] mb-96", className)}>
      <Link href={`#${id}`}>
        {compact ? (
          <h2 className="text-center text-3xl font-bold text-foreground md:text-4xl">{title}</h2>
        ) : (
          <BoxReveal width="100%">
            <h2 className="text-center text-4xl font-bold text-foreground md:text-7xl">{title}</h2>
          </BoxReveal>
        )}
      </Link>
      <p className={cn(
        "mx-auto max-w-3xl text-center text-muted-foreground",
        compact ? "mt-1 text-sm font-medium text-foreground" : "line-clamp-4 text-base"
      )}>
        {desc}
      </p>
    </div>
  )
}
