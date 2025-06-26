import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "bridge"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-purple disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-royal-purple text-white hover:bg-sacred-midnight": variant === "default",
            "bg-red-600 text-white hover:bg-red-700": variant === "destructive",
            "border border-royal-purple bg-transparent hover:bg-royal-purple hover:text-white": variant === "outline",
            "bg-holy-gold text-sacred-midnight hover:bg-holy-gold/90": variant === "secondary",
            "hover:bg-gray-100 hover:text-royal-purple": variant === "ghost",
            "text-royal-purple underline-offset-4 hover:underline": variant === "link",
            "bg-gradient-to-r from-royal-purple to-sacred-midnight text-white hover:shadow-lg": variant === "bridge",
          },
          {
            "h-10 px-4 py-2": size === "default",
            "h-9 rounded-md px-3": size === "sm",
            "h-11 rounded-md px-8": size === "lg",
            "h-10 w-10": size === "icon",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button } 