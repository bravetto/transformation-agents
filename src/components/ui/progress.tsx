"use client"

import * as React from "react"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  className?: string
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className = "", value = 0, max = 100, ...props }, ref) => {
    const percentage = Math.min(Math.max(0, (value / max) * 100), 100)

    return (
      <div
        ref={ref}
        className={`relative h-4 w-full overflow-hidden rounded-full bg-gray-200 ${className}`}
        {...props}
      >
        <div
          className="h-full bg-gradient-to-r from-royal-purple to-holy-gold transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        >
          {/* Inner glow effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20" />
        </div>
        
        {/* Optional percentage text */}
        {percentage > 10 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-semibold text-white drop-shadow">
              {Math.round(percentage)}%
            </span>
          </div>
        )}
      </div>
    )
  }
)

Progress.displayName = "Progress"

export { Progress } 