"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, MapPin, Mic, Check, Loader2 } from "lucide-react"
import Link from "next/link"
import { getMoodEmoji, getMoodScore } from "@/lib/utils"

const moods = [
  { value: "amazing", label: "Amazing", emoji: "🤩" },
  { value: "great", label: "Great", emoji: "😊" },
  { value: "good", label: "Good", emoji: "🙂" },
  { value: "okay", label: "Okay", emoji: "😐" },
  { value: "struggling", label: "Struggling", emoji: "😔" },
  { value: "difficult", label: "Difficult", emoji: "😢" },
]

export default function CheckInPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  
  // Form state
  const [mood, setMood] = useState("")
  const [location, setLocation] = useState<GeolocationPosition | null>(null)
  const [locationError, setLocationError] = useState("")
  const [reflection, setReflection] = useState("")
  const [gratitudes, setGratitudes] = useState(["", "", ""])
  const [isRecording, setIsRecording] = useState(false)

  // Get location on mount
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(position)
        },
        (error) => {
          setLocationError("Unable to get location. Please enable location services.")
          console.error("Location error:", error)
        }
      )
    } else {
      setLocationError("Geolocation is not supported by your browser.")
    }
  }, [])

  const handleGratitudeChange = (index: number, value: string) => {
    const newGratitudes = [...gratitudes]
    newGratitudes[index] = value
    setGratitudes(newGratitudes)
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return mood !== ""
      case 2:
        return location !== null || locationError !== ""
      case 3:
        return reflection.trim() !== ""
      case 4:
        return gratitudes.every(g => g.trim() !== "")
      default:
        return false
    }
  }

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // In production, this would send data to the API
    const checkInData = {
      mood,
      moodScore: getMoodScore(mood),
      location: location ? {
        lat: location.coords.latitude,
        lng: location.coords.longitude
      } : null,
      reflection,
      gratitudes,
      timestamp: new Date().toISOString()
    }
    
    console.log("Check-in data:", checkInData)
    
    setIsSubmitting(false)
    setIsComplete(true)
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Check-In Complete!</CardTitle>
            <CardDescription>
              Great job staying accountable today. Your streak continues!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-gradient">45</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </div>
            <div className="pt-4">
              <Button className="w-full" variant="bridge" asChild>
                <Link href="/">Return Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto max-w-2xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
          <div className="text-sm text-muted-foreground">
            Step {currentStep} of 4
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 h-2 w-full rounded-full bg-muted">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-royal-purple to-sacred-midnight transition-all duration-300"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>

        {/* Step 1: Mood */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>How are you feeling today?</CardTitle>
              <CardDescription>
                Be honest about your emotional state. There's no wrong answer.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {moods.map((moodOption) => (
                  <button
                    key={moodOption.value}
                    onClick={() => setMood(moodOption.value)}
                    className={`rounded-lg border-2 p-4 text-center transition-all hover:border-primary ${
                      mood === moodOption.value 
                        ? "border-primary bg-primary/5" 
                        : "border-muted"
                    }`}
                  >
                    <div className="text-3xl mb-2">{moodOption.emoji}</div>
                    <div className="font-medium">{moodOption.label}</div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Location */}
        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Location Check-In</CardTitle>
              <CardDescription>
                This helps verify your daily check-in for accountability.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                {location ? (
                  <div className="space-y-4">
                    <div className="mx-auto h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                      <MapPin className="h-8 w-8 text-green-600" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Location verified successfully
                    </p>
                  </div>
                ) : locationError ? (
                  <div className="space-y-4">
                    <div className="mx-auto h-16 w-16 rounded-full bg-yellow-100 flex items-center justify-center">
                      <MapPin className="h-8 w-8 text-yellow-600" />
                    </div>
                    <p className="text-sm text-destructive">{locationError}</p>
                    <p className="text-xs text-muted-foreground">
                      You can still continue with your check-in
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Getting your location...
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Reflection */}
        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Daily Reflection</CardTitle>
              <CardDescription>
                Share what's on your mind. This can be a challenge, a victory, or just your thoughts.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="Today I..."
                className="min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <button
                  className="flex items-center gap-2 rounded-md px-3 py-1 hover:bg-muted"
                  onClick={() => setIsRecording(!isRecording)}
                >
                  <Mic className={`h-4 w-4 ${isRecording ? "text-destructive" : ""}`} />
                  {isRecording ? "Recording..." : "Voice Note"}
                </button>
                <span>{reflection.length} characters</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Gratitude */}
        {currentStep === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Three Things You're Grateful For</CardTitle>
              <CardDescription>
                Practicing gratitude helps shift our perspective and find hope even in difficult times.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {gratitudes.map((gratitude, index) => (
                <div key={index} className="space-y-2">
                  <label className="text-sm font-medium">
                    Gratitude #{index + 1}
                  </label>
                  <input
                    type="text"
                    value={gratitude}
                    onChange={(e) => handleGratitudeChange(index, e.target.value)}
                    placeholder={`I'm grateful for...`}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          <Button
            variant="bridge"
            onClick={handleNext}
            disabled={!canProceed() || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : currentStep === 4 ? (
              "Complete Check-In"
            ) : (
              "Next"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
} 