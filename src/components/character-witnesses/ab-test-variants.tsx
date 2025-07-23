"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  Share2,
  Heart,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CharacterWitnessLetter } from "@/types/character-witness";

interface ABTestVariantProps {
  letters: CharacterWitnessLetter[];
  onEngagement: (action: string, letterId?: string) => void;
  className?: string;
}

// Variant 1: Hero Banner Format
export const HeroBannerVariant: React.FC<ABTestVariantProps> = ({
  letters,
  onEngagement,
  className,
}) => {
  const featuredLetter = letters[0]; // Use first letter as featured
  const [isEngaged, setIsEngaged] = useState(false);

  const handleEngagement = () => {
    if (!isEngaged) {
      setIsEngaged(true);
      onEngagement("hero_expansion", featuredLetter?.id);
    }
  };

  if (!featuredLetter) {
    return (
      <div className={cn("text-center py-8", className)}>
        <p className="text-gray-600">No character letters available</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative bg-gradient-divine p-8 rounded-2xl text-white mb-8",
        className,
      )}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            "JAHmere's character speaks louder than any charge"
          </h2>
          <p className="text-xl opacity-90">
            {letters.length} character witnesses stand with JAHmere Webb
          </p>
        </motion.div>

        {/* Featured Letter */}
        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6"
          whileHover={{ scale: 1.02 }}
          onClick={handleEngagement}
        >
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Quote className="w-8 h-8" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">
                {featuredLetter.author.name}
              </h3>
              <p className="text-lg opacity-90 mb-4 line-clamp-3">
                {featuredLetter.content.fullText}
              </p>
              <button
                className="bg-white text-blue-900 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  onEngagement("read_full_letter", featuredLetter.id);
                }}
              >
                Read Full Letter
              </button>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold">{letters.length}</div>
            <div className="text-sm opacity-80">Letters</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold">100%</div>
            <div className="text-sm opacity-80">Support</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold">💯</div>
            <div className="text-sm opacity-80">Character</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Variant 2: Sidebar Cards Format
export const SidebarCardsVariant: React.FC<ABTestVariantProps> = ({
  letters,
  onEngagement,
  className,
}) => {
  const [selectedLetter, setSelectedLetter] =
    useState<CharacterWitnessLetter | null>(null);

  const handleLetterSelect = (letter: CharacterWitnessLetter) => {
    setSelectedLetter(letter);
    onEngagement("letter_select", letter.id);
  };

  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-3 gap-6", className)}>
      {/* Sidebar with letter cards */}
      <div className="lg:col-span-1">
        <h3 className="text-xl font-bold mb-4">Character Witnesses</h3>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {letters.map((letter, index) => (
            <motion.div
              key={letter.id}
              className={cn(
                "p-4 rounded-lg cursor-pointer transition-colors",
                selectedLetter?.id === letter.id
                  ? "bg-blue-100 border-2 border-blue-500"
                  : "bg-gray-50 hover:bg-gray-100",
              )}
              onClick={() => handleLetterSelect(letter)}
              whileHover={{ x: 4 }}
            >
              <div className="font-semibold text-sm">{letter.author.name}</div>
              <div className="text-xs text-gray-600 mb-2">
                {letter.author.title || letter.author.relationship}
              </div>
              <div className="text-sm text-gray-700 line-clamp-2">
                {letter.content.fullText}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main content area */}
      <div className="lg:col-span-2">
        <AnimatePresence mode="wait">
          {selectedLetter ? (
            <motion.div
              key={selectedLetter.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold">
                    {selectedLetter.author.name}
                  </h2>
                  <p className="text-gray-600">
                    {selectedLetter.author.title ||
                      selectedLetter.author.relationship}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() =>
                      onEngagement("share_letter", selectedLetter.id)
                    }
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() =>
                      onEngagement("favorite_letter", selectedLetter.id)
                    }
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {selectedLetter.content.fullText}
                </p>
              </div>

              <div className="mt-6 pt-6 border-t">
                <button
                  onClick={() =>
                    onEngagement("contact_witness", selectedLetter.id)
                  }
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Contact Witness
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gray-50 rounded-xl p-8 text-center"
            >
              <Quote className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-600 mb-2">
                Select a Character Letter
              </h2>
              <p className="text-gray-500">
                Choose a letter from the sidebar to read the full testimony
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Variant 3: Carousel Format
export const CarouselFormatVariant: React.FC<ABTestVariantProps> = ({
  letters,
  onEngagement,
  className,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % letters.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay, letters.length]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % letters.length);
    onEngagement("carousel_next");
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + letters.length) % letters.length);
    onEngagement("carousel_prev");
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    onEngagement("carousel_dot_click", letters[index]?.id);
  };

  if (letters.length === 0) {
    return (
      <div className={cn("text-center py-8", className)}>
        <p className="text-gray-600">No character letters available</p>
      </div>
    );
  }

  const currentLetter = letters[currentIndex];

  return (
    <div className={cn("relative", className)}>
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold mb-2">
          Character Witness Testimonials
        </h2>
        <p className="text-gray-600">
          {letters.length} community leaders support JAHmere's character
        </p>
      </div>

      <div
        className="relative bg-white rounded-xl shadow-lg overflow-hidden"
        onMouseEnter={() => setIsAutoPlay(false)}
        onMouseLeave={() => setIsAutoPlay(true)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="p-8"
          >
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                  <Quote className="w-10 h-10 text-blue-600" />
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">
                  {currentLetter.author.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {currentLetter.author.title ||
                    currentLetter.author.relationship}
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {currentLetter.content.fullText}
                </p>

                <div className="flex space-x-4">
                  <button
                    onClick={() =>
                      onEngagement("read_full_carousel", currentLetter.id)
                    }
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Read Full Letter
                  </button>
                  <button
                    onClick={() =>
                      onEngagement("share_carousel", currentLetter.id)
                    }
                    className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Share
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-50 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center space-x-2 mt-6">
        {letters.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-colors",
              currentIndex === index ? "bg-blue-600" : "bg-gray-300",
            )}
          />
        ))}
      </div>

      {/* Progress indicator */}
      <div className="mt-4 bg-gray-200 rounded-full h-1">
        <div
          className="bg-blue-600 h-1 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / letters.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

// Variant 4: Testimonial Grid Format
export const TestimonialGridVariant: React.FC<ABTestVariantProps> = ({
  letters,
  onEngagement,
  className,
}) => {
  const [selectedLetter, setSelectedLetter] =
    useState<CharacterWitnessLetter | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  const handleLetterClick = (letter: CharacterWitnessLetter) => {
    setSelectedLetter(letter);
    onEngagement("grid_letter_click", letter.id);
  };

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, letters.length));
    onEngagement("load_more_grid");
  };

  return (
    <div className={cn("", className)}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Community Testimonials</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          These character witness letters demonstrate the positive impact
          JAHmere has had on his community and the transformation in his life.
        </p>
      </div>

      {/* Grid of testimonial cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {letters.slice(0, visibleCount).map((letter, index) => (
          <motion.div
            key={letter.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleLetterClick(letter)}
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Quote className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{letter.author.name}</h3>
                  <p className="text-sm text-gray-600">
                    {letter.author.title || letter.author.relationship}
                  </p>
                </div>
              </div>

              <p className="text-gray-700 text-sm line-clamp-4 mb-4">
                {letter.content.fullText}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEngagement("share_grid", letter.id);
                  }}
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load more button */}
      {visibleCount < letters.length && (
        <div className="text-center">
          <button
            onClick={loadMore}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Load More Testimonials ({letters.length - visibleCount} remaining)
          </button>
        </div>
      )}

      {/* Modal for selected letter */}
      <AnimatePresence>
        {selectedLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedLetter(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-xl max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {selectedLetter.author.name}
                    </h2>
                    <p className="text-gray-600">
                      {selectedLetter.author.title ||
                        selectedLetter.author.relationship}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedLetter(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {selectedLetter.content.fullText}
                  </p>
                </div>

                <div className="mt-8 flex space-x-4">
                  <button
                    onClick={() =>
                      onEngagement("contact_from_modal", selectedLetter.id)
                    }
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Contact Witness
                  </button>
                  <button
                    onClick={() =>
                      onEngagement("share_from_modal", selectedLetter.id)
                    }
                    className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Share Letter
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
