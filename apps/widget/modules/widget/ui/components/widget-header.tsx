import { cn } from "@workspace/ui/lib/utils"
import React from "react"

interface Props {
  children: React.ReactNode
  className?: string
}
export const WidgetHeader = ({
  children,
  className
}: Props) => {

  return (
    <header className={cn(
      "bg-linear-to-b from-sidebar-primary to-[#0b63f3]! text-sidebar-primary-foreground",
      className
    )}>
      {children}
    </header>
  )

}