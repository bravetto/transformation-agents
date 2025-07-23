"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MapPin, Tag, Users, ExternalLink } from "lucide-react";
import { TimelineEvent } from "@/types/timeline";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TimelineEventModalProps {
  event: TimelineEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

/**
 * 🌟 TIMELINE EVENT MODAL
 * Detailed view of timeline events with rich media and context
 */
const TimelineEventModal: React.FC<TimelineEventModalProps> = ({
  event,
  isOpen,
  onClose,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
}) => {
  if (!event) return null;

  // Role-based theming
  const roleThemes = {
    lightworker: {
      gradient: "from-amber-50 to-orange-50",
      border: "border-amber-200",
      accent: "text-amber-600",
      badge: "bg-amber-100 text-amber-800",
    },
    messenger: {
      gradient: "from-blue-50 to-indigo-50",
      border: "border-blue-200",
      accent: "text-blue-600",
      badge: "bg-blue-100 text-blue-800",
    },
    witness: {
      gradient: "from-green-50 to-emerald-50",
      border: "border-green-200",
      accent: "text-green-600",
      badge: "bg-green-100 text-green-800",
    },
    guardian: {
      gradient: "from-purple-50 to-violet-50",
      border: "border-purple-200",
      accent: "text-purple-600",
      badge: "bg-purple-100 text-purple-800",
    },
  };

  const theme = roleThemes[event.role || "lightworker"];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal content */}
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            transition={{ type: "spring", damping: 20 }}
            className="relative max-w-2xl w-full max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Card
              className={cn(
                "bg-gradient-to-br border-2 shadow-2xl",
                theme.gradient,
                theme.border,
              )}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <Badge className={theme.badge}>{event.year}</Badge>

                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {event.title}
                    </h2>
                    <p className={cn("text-sm font-medium", theme.accent)}>
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}{" "}
                      Event
                    </p>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
                {/* Description */}
                {event.description && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Description
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                )}

                {/* Media */}
                {event.media && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Media</h3>
                    <div className="bg-gray-100 rounded-lg p-4">
                      {event.media.type === "image" ? (
                        <img
                          src={event.media.url}
                          alt={event.media.alt || event.title}
                          className="w-full h-48 object-cover rounded-md"
                        />
                      ) : (
                        <div className="flex items-center gap-3 text-gray-600">
                          <ExternalLink className="w-5 h-5" />
                          <div>
                            <p className="font-medium">
                              {event.media.type.toUpperCase()} Content
                            </p>
                            <p className="text-sm">
                              {event.media.caption || "View external content"}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Details grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Location */}
                  {event.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Location
                        </p>
                        <p className="text-sm text-gray-600">
                          {event.location}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Date */}
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Date</p>
                      <p className="text-sm text-gray-600">
                        {event.month ? `${event.month}/` : ""}
                        {event.year}
                      </p>
                    </div>
                  </div>

                  {/* Related people */}
                  {event.relatedPeople && event.relatedPeople.length > 0 && (
                    <div className="flex items-start gap-2 md:col-span-2">
                      <Users className="w-4 h-4 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 mb-1">
                          Related People
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {event.relatedPeople.map((personId) => (
                            <Badge key={personId} variant="secondary" size="sm">
                              {personId.replace("-", " ")}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Tags */}
                {event.tags && event.tags.length > 0 && (
                  <div className="flex items-start gap-2">
                    <Tag className="w-4 h-4 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 mb-2">
                        Tags
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {event.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" size="sm">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Importance indicator */}
                {event.importance === "divine" && (
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        ✨
                      </motion.div>
                      <p className="font-semibold text-amber-800">
                        Divine Moment
                      </p>
                    </div>
                    <p className="text-sm text-amber-700">
                      This event represents a significant spiritual milestone or
                      transformation.
                    </p>
                  </div>
                )}
              </div>

              {/* Footer navigation */}
              <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-white/50">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onPrevious}
                  disabled={!hasPrevious}
                  className="flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Previous
                </Button>

                <div className="text-sm text-gray-600">
                  Timeline Event Details
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={onNext}
                  disabled={!hasNext}
                  className="flex items-center gap-2"
                >
                  Next
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TimelineEventModal;
