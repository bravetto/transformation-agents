"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  showValue?: boolean
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, max = 100, showValue = false, ...props }, ref) => {
    const percentage = Math.min(Math.max(value, 0), max) / max * 100

    return (
      <div
        ref={ref}
        className={cn(
          "relative h-2 w-full overflow-hidden rounded-full bg-soft-cloud",
          className
        )}
        {...props}
      >
        <div
          className="h-full bg-hope-gold transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
        {showValue && (
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-medium text-gentle-charcoal">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    )
  }
)

Progress.displayName = "Progress"

export { Progress } 