import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getMoodScore(mood: string): number {
  const scores: Record<string, number> = {
    amazing: 10,
    great: 8,
    good: 6,
    okay: 4,
    struggling: 2,
    difficult: 1
  }
  return scores[mood] || 5
}

export function getMoodEmoji(mood: string): string {
  const emojis: Record<string, string> = {
    amazing: "🤩",
    great: "😊",
    good: "🙂",
    okay: "😐",
    struggling: "😔",
    difficult: "😢"
  }
  return emojis[mood] || "😐"
} 