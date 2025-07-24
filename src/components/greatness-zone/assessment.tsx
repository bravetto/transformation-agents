"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Heart,
  Target,
  Trophy,
  Star,
  CheckCircle,
  ArrowRight,
  Users,
  Lightbulb,
  Award,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";
import { useModalAnalytics } from "@/components/analytics-wrapper";

// Assessment data based on the actual Jay Forte methodology
const ASSESSMENT_DATA = {
  jayForte: {
    name: "Jay Forte",
    role: "The Mentor",
    quadrant: "Friend",
    score: 71,
    talents: [
      { name: "Peacemaker", score: 19, description: "Unity builders" },
      { name: "Caregiver", score: 18, description: "Love multipliers" },
      { name: "Relator", score: 18, description: "Bridge builders" },
    ],
  },
  jahmereWebb: {
    name: "JAHmere Webb",
    role: "The Bridge",
    quadrant: "Friend",
    score: 62,
    talents: [
      { name: "Peacemaker", score: 18, description: "Unity builders" },
      { name: "Caregiver", score: 16, description: "Love multipliers" },
      { name: "Relator", score: 16, description: "Bridge builders" },
    ],
  },
};

const ASSESSMENT_QUESTIONS = [
  {
    id: 1,
    question: "When building a championship team, what's your primary focus?",
    options: [
      {
        text: "Creating harmony and unity among players",
        quadrant: "Friend",
        points: 5,
      },
      {
        text: "Developing strategic game plans",
        quadrant: "Chairman",
        points: 5,
      },
      {
        text: "Inspiring and motivating the team",
        quadrant: "Emcee",
        points: 5,
      },
      { text: "Analyzing performance data", quadrant: "Professor", points: 5 },
    ],
  },
  {
    id: 2,
    question: "How do you approach mentoring young athletes?",
    options: [
      {
        text: "Focus on their emotional and personal development",
        quadrant: "Friend",
        points: 5,
      },
      {
        text: "Create structured development programs",
        quadrant: "Professor",
        points: 5,
      },
      {
        text: "Lead by example and inspire them",
        quadrant: "Emcee",
        points: 5,
      },
      {
        text: "Set clear goals and expectations",
        quadrant: "Chairman",
        points: 5,
      },
    ],
  },
  {
    id: 3,
    question: "What drives you most as a leader?",
    options: [
      {
        text: "Helping others reach their potential",
        quadrant: "Friend",
        points: 5,
      },
      { text: "Achieving measurable results", quadrant: "Chairman", points: 5 },
      { text: "Building lasting relationships", quadrant: "Friend", points: 3 },
      {
        text: "Creating innovative solutions",
        quadrant: "Professor",
        points: 5,
      },
    ],
  },
];

interface AssessmentProps {
  onComplete?: (results: any) => void;
  showComparison?: boolean;
}

function GreatnessZoneAssessment({
  onComplete,
  showComparison = true,
}: AssessmentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [showResults, setShowResults] = useState(false);
  const { trackModalView } = useModalAnalytics();

  useEffect(() => {
    trackModalView();
  }, [trackModalView]);

  const handleAnswer = (option: any) => {
    const newAnswers = {
      ...answers,
      [option.quadrant]: (answers[option.quadrant] || 0) + option.points,
    };
    setAnswers(newAnswers);

    trackModalView();

    if (currentQuestion < ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults(newAnswers);
    }
  };

  const calculateResults = (finalAnswers: Record<string, number>) => {
    const totalPoints = Object.values(finalAnswers).reduce(
      (sum, points) => sum + points,
      0,
    );
    const primaryQuadrant = Object.entries(finalAnswers).reduce((a, b) =>
      finalAnswers[a[0]] > finalAnswers[b[0]] ? a : b,
    )[0];

    const calculatedResults = {
      primaryQuadrant,
      score: Math.round((finalAnswers[primaryQuadrant] / totalPoints) * 200),
      breakdown: finalAnswers,
      alignment: calculateAlignment(primaryQuadrant),
    };

    setResults(calculatedResults);
    setIsComplete(true);

    setTimeout(() => {
      setShowResults(true);
      trackModalView();
      onComplete?.(calculatedResults);
    }, 1000);
  };

  const calculateAlignment = (userQuadrant: string) => {
    // Compare with Jay Forte and JAHmere's results
    const jayAlignment =
      userQuadrant === "Friend" ? 95 : userQuadrant === "Emcee" ? 75 : 60;
    const jahmereAlignment =
      userQuadrant === "Friend" ? 90 : userQuadrant === "Emcee" ? 70 : 55;

    return { jay: jayAlignment, jahmere: jahmereAlignment };
  };

  const getQuadrantDescription = (quadrant: string) => {
    const descriptions: Record<string, string> = {
      Friend:
        "Supporting/Feeling - You build relationships and create emotional connections",
      Emcee:
        "Directing/Feeling - You inspire and motivate others through leadership",
      Chairman:
        "Directing/Thinking - You drive results through strategic decision-making",
      Professor:
        "Thinking/Supporting - You analyze and systematize for optimal outcomes",
    };
    return descriptions[quadrant] || "";
  };

  const getQuadrantColor = (quadrant: string) => {
    const colors: Record<string, string> = {
      Friend: "from-green-500 to-emerald-600",
      Emcee: "from-purple-500 to-indigo-600",
      Chairman: "from-blue-500 to-cyan-600",
      Professor: "from-orange-500 to-red-600",
    };
    return colors[quadrant] || "from-gray-500 to-gray-600";
  };

  if (showResults && results) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2">
            Your Greatness Zone Results
          </h2>
          <p className="text-gray-600">
            Discover your championship leadership style
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card
            className={`bg-gradient-to-r ${getQuadrantColor(results.primaryQuadrant)} text-white`}
          >
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">
                Primary Quadrant: {results.primaryQuadrant}
              </CardTitle>
              <p className="text-lg opacity-90">
                {getQuadrantDescription(results.primaryQuadrant)}
              </p>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold mb-2">{results.score}/200</div>
              <p className="opacity-90">Your Greatness Zone Score</p>
            </CardContent>
          </Card>
        </motion.div>

        {showComparison && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-center">
              Divine Alignment Analysis
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-2 border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-green-500" />
                    Alignment with Jay Forte
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Progress value={results.alignment.jay} className="h-3" />
                    <p className="text-sm text-gray-600">
                      {results.alignment.jay}% compatibility for mentorship
                    </p>
                    <Badge
                      variant={
                        results.alignment.jay > 80 ? "default" : "secondary"
                      }
                    >
                      {results.alignment.jay > 80
                        ? "Excellent Match"
                        : "Good Potential"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-500" />
                    Alignment with JAHmere
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Progress
                      value={results.alignment.jahmere}
                      className="h-3"
                    />
                    <p className="text-sm text-gray-600">
                      {results.alignment.jahmere}% compatibility for advocacy
                    </p>
                    <Badge
                      variant={
                        results.alignment.jahmere > 80 ? "default" : "secondary"
                      }
                    >
                      {results.alignment.jahmere > 80
                        ? "Strong Advocate"
                        : "Supportive Voice"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Lightbulb className="w-8 h-8 text-yellow-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg mb-2">
                      Your Championship Opportunity
                    </h4>
                    <p className="text-gray-700 mb-4">
                      Based on your assessment, you have unique gifts that align
                      with this transformational justice initiative.
                      {results.alignment.jay > 80 &&
                        " Your strong alignment with Jay Forte suggests you could be an excellent mentor in this movement."}
                      {results.alignment.jahmere > 80 &&
                        " Your high compatibility with JAHmere indicates you understand his perspective and could be a powerful advocate."}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        className="bg-yellow-500 hover:bg-yellow-600"
                      >
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Join the Movement
                      </Button>
                      <Button size="sm" variant="outline">
                        Learn More About Jay's Methodology
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    );
  }

  if (isComplete && !showResults) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
        >
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Assessment Complete!</h2>
          <p className="text-gray-600">Calculating your Greatness Zone...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Greatness Zone Assessment</h2>
          <Badge variant="outline">
            {currentQuestion + 1} of {ASSESSMENT_QUESTIONS.length}
          </Badge>
        </div>
        <Progress
          value={((currentQuestion + 1) / ASSESSMENT_QUESTIONS.length) * 100}
          className="h-2"
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="text-xl">
                {ASSESSMENT_QUESTIONS[currentQuestion].question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {ASSESSMENT_QUESTIONS[currentQuestion].options.map(
                (option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className="w-full p-4 text-left rounded-lg border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{option.text}</span>
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </motion.button>
                ),
              )}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3 mb-3">
          <Brain className="w-5 h-5 text-blue-500" />
          <h4 className="font-semibold">About This Assessment</h4>
        </div>
        <p className="text-sm text-gray-600">
          This assessment is based on Jay Forte's revolutionary Greatness Zone
          methodology, used to identify JAHmere Webb's extraordinary potential.
          Your results will show how your natural talents align with this
          transformational justice initiative.
        </p>
      </div>
    </div>
  );
}

export default withDivineErrorBoundary(GreatnessZoneAssessment, {
  componentName: "GreatnessZoneAssessment",
  role: "lightworker",
});
