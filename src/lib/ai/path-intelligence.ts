"use client";

import { logger } from "@/lib/logger";

/**
 * 🧠 DIVINE PATH INTELLIGENCE SYSTEM
 * AI-powered user path prediction and optimization
 */

export interface UserBehaviorSnapshot {
  sessionId: string;
  userId?: string;
  timeOnPage: number;
  scrollDepth: number;
  clickPatterns: ClickPattern[];
  deviceType: "mobile" | "tablet" | "desktop";
  referralSource: string;
  timeOfDay: number;
  dayOfWeek: number;
  previousVisits: number;
  engagementScore: number;
}

export interface ClickPattern {
  element: string;
  timestamp: number;
  position: { x: number; y: number };
  dwellTime: number;
}

export interface PathPrediction {
  recommendedPath: "coach" | "judge" | "activist";
  confidence: number;
  reasoning: string;
  alternatives: PathOption[];
  spiritualAlignment: number;
  expectedConversion: number;
  predictionId: string;
}

export interface PathOption {
  path: "coach" | "judge" | "activist";
  probability: number;
  reasoning: string;
}

export interface SpiritualAlignment {
  score: number;
  factors: string[];
  divineResonance: number;
}

/**
 * 🌟 DIVINE PATH INTELLIGENCE ENGINE
 * Machine learning-powered path recommendation system
 */
export class DivinePathIntelligence {
  private modelVersion = "v1.2.0";
  private trainingDataSize = 0;
  private predictionHistory: Map<string, PathPrediction> = new Map();

  /**
   * Predict optimal user path based on behavior analysis
   */
  async predictOptimalPath(
    userBehavior: UserBehaviorSnapshot,
  ): Promise<PathPrediction> {
    try {
      const features = this.extractFeatures(userBehavior);
      const spiritualAlignment =
        await this.calculateSpiritualAlignment(features);

      // Multi-factor prediction algorithm
      const prediction = await this.runInference({
        behavioralFeatures: features,
        spiritualMetrics: spiritualAlignment,
        contextualFactors: this.getContextualFactors(userBehavior),
        historicalPatterns: await this.getHistoricalPatterns(
          userBehavior.sessionId,
        ),
      });

      const predictionId = this.generatePredictionId();
      const pathPrediction: PathPrediction = {
        recommendedPath: prediction.optimalPath,
        confidence: prediction.confidence,
        reasoning: this.generateExplanation(prediction),
        alternatives: prediction.alternativePaths,
        spiritualAlignment: spiritualAlignment.score,
        expectedConversion: prediction.conversionProbability,
        predictionId,
      };

      // Store prediction for feedback learning
      this.predictionHistory.set(predictionId, pathPrediction);

      // Track prediction for analytics
      await this.trackPrediction(pathPrediction, userBehavior.sessionId);

      logger.divine("🧠 Path Prediction Generated", {
        sessionId: userBehavior.sessionId,
        recommendedPath: pathPrediction.recommendedPath,
        confidence: pathPrediction.confidence,
        spiritualAlignment: pathPrediction.spiritualAlignment,
      });

      return pathPrediction;
    } catch (error) {
      logger.error("Path prediction failed", { error });
      return this.getFallbackPrediction(userBehavior);
    }
  }

  /**
   * Extract behavioral features for ML prediction
   */
  private extractFeatures(userBehavior: UserBehaviorSnapshot) {
    return {
      engagement: {
        timeOnPage: Math.min(userBehavior.timeOnPage / 60, 10), // Normalize to 0-10 minutes
        scrollDepth: userBehavior.scrollDepth / 100, // 0-1
        clickFrequency:
          userBehavior.clickPatterns.length /
          Math.max(userBehavior.timeOnPage / 1000, 1),
        dwellTime: this.calculateAverageDwellTime(userBehavior.clickPatterns),
      },
      context: {
        deviceType: this.encodeDeviceType(userBehavior.deviceType),
        timeOfDay: this.normalizeTimeOfDay(userBehavior.timeOfDay),
        dayOfWeek: userBehavior.dayOfWeek / 7,
        isReturning: userBehavior.previousVisits > 0 ? 1 : 0,
      },
      referral: {
        isDirect: userBehavior.referralSource === "direct" ? 1 : 0,
        isSocial: this.isSocialReferral(userBehavior.referralSource) ? 1 : 0,
        isSearch: this.isSearchReferral(userBehavior.referralSource) ? 1 : 0,
      },
    };
  }

  /**
   * Calculate spiritual alignment score
   */
  private async calculateSpiritualAlignment(
    features: any,
  ): Promise<SpiritualAlignment> {
    // Spiritual resonance calculation based on engagement patterns
    const baseAlignment =
      features.engagement.timeOnPage * 0.3 +
      features.engagement.scrollDepth * 0.4 +
      features.engagement.dwellTime * 0.3;

    // Divine timing factors (sacred hours, days)
    const timingBonus = this.calculateDivineTimingBonus(
      features.context.timeOfDay,
    );

    // Sacred numerology influence
    const numerologyBonus = await this.calculateSacredNumerologyInfluence();

    const score = Math.min(
      100,
      baseAlignment * 50 + timingBonus + numerologyBonus,
    );

    return {
      score,
      factors: this.identifyAlignmentFactors(
        features,
        timingBonus,
        numerologyBonus,
      ),
      divineResonance: score * 0.01,
    };
  }

  /**
   * Run ML inference for path prediction
   */
  private async runInference(input: any) {
    // Simplified ML model simulation (would be replaced with actual ML model)
    const { behavioralFeatures, spiritualMetrics, contextualFactors } = input;

    // Path scoring based on behavioral patterns
    const coachScore = this.calculateCoachPathScore(
      behavioralFeatures,
      spiritualMetrics,
    );
    const judgeScore = this.calculateJudgePathScore(
      behavioralFeatures,
      spiritualMetrics,
    );
    const activistScore = this.calculateActivistPathScore(
      behavioralFeatures,
      spiritualMetrics,
    );

    // Normalize scores
    const totalScore = coachScore + judgeScore + activistScore;
    const normalizedScores = {
      coach: coachScore / totalScore,
      judge: judgeScore / totalScore,
      activist: activistScore / totalScore,
    };

    // Determine optimal path
    const optimalPath = Object.entries(normalizedScores).reduce((a, b) =>
      normalizedScores[a[0] as keyof typeof normalizedScores] >
      normalizedScores[b[0] as keyof typeof normalizedScores]
        ? a
        : b,
    )[0] as "coach" | "judge" | "activist";

    const confidence = normalizedScores[optimalPath] * 100;

    // Generate alternative paths
    const alternativePaths: PathOption[] = Object.entries(normalizedScores)
      .filter(([path]) => path !== optimalPath)
      .map(([path, probability]) => ({
        path: path as "coach" | "judge" | "activist",
        probability: probability * 100,
        reasoning: this.generatePathReasoning(path, probability),
      }))
      .sort((a, b) => b.probability - a.probability);

    return {
      optimalPath,
      confidence,
      alternativePaths,
      conversionProbability: this.calculateConversionProbability(
        confidence,
        spiritualMetrics.score,
      ),
    };
  }

  /**
   * Calculate Coach path affinity score
   */
  private calculateCoachPathScore(behavioral: any, spiritual: any): number {
    let score = 0;

    // High engagement suggests leadership interest
    if (behavioral.engagement.timeOnPage > 0.5) score += 30;
    if (behavioral.engagement.scrollDepth > 0.7) score += 25;

    // Desktop usage suggests professional context
    if (behavioral.context.deviceType === 1) score += 20;

    // Returning visitors show commitment
    if (behavioral.context.isReturning) score += 15;

    // Spiritual alignment bonus
    score += spiritual.score * 0.1;

    return Math.max(0, score);
  }

  /**
   * Calculate Judge path affinity score
   */
  private calculateJudgePathScore(behavioral: any, spiritual: any): number {
    let score = 0;

    // Detailed exploration suggests analytical nature
    if (behavioral.engagement.dwellTime > 0.6) score += 35;
    if (behavioral.engagement.scrollDepth > 0.8) score += 30;

    // Professional timing (business hours)
    if (
      behavioral.context.timeOfDay > 0.3 &&
      behavioral.context.timeOfDay < 0.7
    )
      score += 20;

    // Search referrals suggest research behavior
    if (behavioral.referral.isSearch) score += 15;

    return Math.max(0, score);
  }

  /**
   * Calculate Activist path affinity score
   */
  private calculateActivistPathScore(behavioral: any, spiritual: any): number {
    let score = 0;

    // Mobile usage suggests grassroots engagement
    if (behavioral.context.deviceType === 0) score += 25;

    // Social referrals suggest community involvement
    if (behavioral.referral.isSocial) score += 30;

    // High click frequency suggests action orientation
    if (behavioral.engagement.clickFrequency > 0.5) score += 25;

    // Evening/weekend timing suggests personal passion
    if (
      behavioral.context.timeOfDay > 0.7 ||
      behavioral.context.timeOfDay < 0.2
    )
      score += 15;

    // High spiritual alignment
    if (spiritual.score > 70) score += 20;

    return Math.max(0, score);
  }

  /**
   * Update model from user feedback
   */
  async updateModelFromFeedback(
    actualSelection: "coach" | "judge" | "activist",
    predictionId: string,
  ) {
    try {
      const prediction = this.predictionHistory.get(predictionId);
      if (!prediction) return;

      const accuracy = actualSelection === prediction.recommendedPath;

      // Log feedback for model improvement
      logger.analytics("🎯 Path Prediction Feedback", {
        predictionId,
        predicted: prediction.recommendedPath,
        actual: actualSelection,
        accuracy,
        confidence: prediction.confidence,
      });

      // Update model performance metrics
      this.updatePerformanceMetrics(accuracy);

      // In a real implementation, this would retrain the model
      // For now, we log the feedback for future model updates
      await this.logFeedbackForTraining({
        predictionId,
        predicted: prediction.recommendedPath,
        actual: actualSelection,
        accuracy,
        confidence: prediction.confidence,
        timestamp: new Date(),
      });
    } catch (error) {
      logger.error("Failed to update model from feedback", {
        error,
        predictionId,
      });
    }
  }

  /**
   * Generate fallback prediction when ML fails
   */
  private getFallbackPrediction(
    userBehavior: UserBehaviorSnapshot,
  ): PathPrediction {
    // Simple heuristic-based fallback
    let recommendedPath: "coach" | "judge" | "activist" = "activist"; // Default to most inclusive

    if (
      userBehavior.deviceType === "desktop" &&
      userBehavior.timeOfDay > 8 &&
      userBehavior.timeOfDay < 17
    ) {
      recommendedPath = "judge"; // Professional context
    } else if (userBehavior.previousVisits > 2) {
      recommendedPath = "coach"; // Returning visitor suggests leadership interest
    }

    return {
      recommendedPath,
      confidence: 60, // Lower confidence for fallback
      reasoning: "Fallback prediction based on basic heuristics",
      alternatives: [],
      spiritualAlignment: 50,
      expectedConversion: 35,
      predictionId: this.generatePredictionId(),
    };
  }

  // Helper methods
  private calculateAverageDwellTime(clickPatterns: ClickPattern[]): number {
    if (clickPatterns.length === 0) return 0;
    const totalDwellTime = clickPatterns.reduce(
      (sum, pattern) => sum + pattern.dwellTime,
      0,
    );
    return totalDwellTime / clickPatterns.length / 1000; // Convert to seconds
  }

  private encodeDeviceType(deviceType: string): number {
    return deviceType === "mobile" ? 0 : deviceType === "tablet" ? 0.5 : 1;
  }

  private normalizeTimeOfDay(hour: number): number {
    return hour / 24;
  }

  private isSocialReferral(referral: string): boolean {
    const socialDomains = [
      "facebook",
      "twitter",
      "instagram",
      "linkedin",
      "youtube",
    ];
    return socialDomains.some((domain) => referral.includes(domain));
  }

  private isSearchReferral(referral: string): boolean {
    const searchDomains = ["google", "bing", "yahoo", "duckduckgo"];
    return searchDomains.some((domain) => referral.includes(domain));
  }

  private calculateDivineTimingBonus(timeOfDay: number): number {
    // Sacred hours bonus (7 AM, 3 PM, 7 PM - representing divine completeness)
    const sacredHours = [7 / 24, 15 / 24, 19 / 24];
    const closestSacredHour = sacredHours.reduce((prev, curr) =>
      Math.abs(curr - timeOfDay) < Math.abs(prev - timeOfDay) ? curr : prev,
    );

    const distance = Math.abs(closestSacredHour - timeOfDay);
    return Math.max(0, 10 - distance * 240); // Up to 10 point bonus
  }

  private async calculateSacredNumerologyInfluence(): Promise<number> {
    // Simple sacred number influence (7, 28, 77)
    const now = new Date();
    const dayOfMonth = now.getDate();
    const minute = now.getMinutes();

    if (dayOfMonth === 7 || dayOfMonth === 28) return 7;
    if (minute === 7 || minute === 28 || minute === 77) return 5;

    return 0;
  }

  private identifyAlignmentFactors(
    features: any,
    timingBonus: number,
    numerologyBonus: number,
  ): string[] {
    const factors: string[] = [];

    if (features.engagement.timeOnPage > 0.5) factors.push("Deep engagement");
    if (features.engagement.scrollDepth > 0.7)
      factors.push("Thorough content consumption");
    if (timingBonus > 5) factors.push("Divine timing alignment");
    if (numerologyBonus > 0) factors.push("Sacred numerology resonance");
    if (features.context.isReturning)
      factors.push("Returning visitor commitment");

    return factors;
  }

  private generateExplanation(prediction: any): string {
    const path = prediction.optimalPath;
    const confidence = Math.round(prediction.confidence);

    const explanations = {
      coach: `Based on your engagement patterns and professional context, you show strong leadership potential. ${confidence}% confidence in Coach path alignment.`,
      judge: `Your analytical browsing behavior and detailed content exploration suggest evidence-based decision making. ${confidence}% confidence in Judge path alignment.`,
      activist: `Your mobile engagement and social referral patterns indicate community-oriented activism. ${confidence}% confidence in Activist path alignment.`,
    };

    return explanations[path as keyof typeof explanations];
  }

  private generatePathReasoning(path: string, probability: number): string {
    const percentage = Math.round(probability * 100);

    const reasonings = {
      coach: `Leadership indicators suggest ${percentage}% alignment with coaching path`,
      judge: `Analytical patterns indicate ${percentage}% compatibility with evidence review`,
      activist: `Community engagement signals show ${percentage}% fit for grassroots activism`,
    };

    return (
      reasonings[path as keyof typeof reasonings] ||
      `${percentage}% alignment based on behavioral analysis`
    );
  }

  private calculateConversionProbability(
    confidence: number,
    spiritualAlignment: number,
  ): number {
    // Conversion probability based on prediction confidence and spiritual alignment
    const baseConversion = 47; // Current baseline
    const confidenceBonus = (confidence - 50) * 0.3; // Confidence above 50% increases conversion
    const spiritualBonus = (spiritualAlignment - 50) * 0.2; // Spiritual alignment bonus

    return Math.max(
      0,
      Math.min(100, baseConversion + confidenceBonus + spiritualBonus),
    );
  }

  private generatePredictionId(): string {
    return `path_pred_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getContextualFactors(userBehavior: UserBehaviorSnapshot) {
    return {
      isBusinessHours:
        userBehavior.timeOfDay >= 9 && userBehavior.timeOfDay <= 17,
      isWeekend: userBehavior.dayOfWeek === 0 || userBehavior.dayOfWeek === 6,
      isReturningUser: userBehavior.previousVisits > 0,
      engagementLevel:
        userBehavior.engagementScore > 70
          ? "high"
          : userBehavior.engagementScore > 40
            ? "medium"
            : "low",
    };
  }

  private async getHistoricalPatterns(sessionId: string) {
    // In a real implementation, this would fetch historical user patterns
    return {
      previousPaths: [],
      averageEngagement: 0,
      conversionHistory: [],
    };
  }

  private async trackPrediction(prediction: PathPrediction, sessionId: string) {
    // Track prediction for analytics and model improvement
    try {
      // This would send to analytics service in production
      logger.analytics("🔮 AI Path Prediction", {
        sessionId,
        predictionId: prediction.predictionId,
        recommendedPath: prediction.recommendedPath,
        confidence: prediction.confidence,
        spiritualAlignment: prediction.spiritualAlignment,
        expectedConversion: prediction.expectedConversion,
      });
    } catch (error) {
      logger.error("Failed to track prediction", { error });
    }
  }

  private updatePerformanceMetrics(accuracy: boolean) {
    // Update model performance metrics
    // In production, this would update model performance tracking
  }

  private async logFeedbackForTraining(feedback: any) {
    // Log feedback for model retraining
    // In production, this would be sent to ML training pipeline
  }
}
