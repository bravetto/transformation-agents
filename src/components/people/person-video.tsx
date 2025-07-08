"use client";
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { withErrorBoundary } from "@/components/with-error-boundary";

export interface PersonVideoProps {
  title: string;
  description?: string;
  videoUrl: string;
  thumbnailUrl?: string;
  className?: string;
}

function PersonVideo({
  title,
  description,
  videoUrl,
  thumbnailUrl,
  className = "",
}: PersonVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section
      className={`py-16 md:py-24 bg-gentle-charcoal text-white w-full ${className}`}
    >
      <div className="container-wide">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="max-w-2xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>

            {description && (
              <p className="text-lg text-white/80">{description}</p>
            )}
          </div>

          {/* Video player */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative aspect-video rounded-xl overflow-hidden shadow-2xl"
          >
            {!isPlaying && thumbnailUrl ? (
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${thumbnailUrl})` }}
              >
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center w-full h-full bg-black/30 hover:bg-black/40 transition-colors"
                >
                  <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-hope-gold flex items-center justify-center">
                    <Play
                      className="h-8 w-8 md:h-10 md:w-10 text-white"
                      fill="white"
                    />
                  </div>
                </button>
              </div>
            ) : (
              <iframe
                src={`${videoUrl}${!isPlaying ? "?autoplay=0" : "?autoplay=1"}`}
                title={title}
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default withErrorBoundary(PersonVideo, {
  componentName: "PersonVideo",
  id: "person-video",
});
