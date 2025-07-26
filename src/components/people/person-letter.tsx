"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { withErrorBoundary } from "@/components/ui/error-boundary";

export interface PersonLetterProps {
  title: string;
  body: string;
  date?: string;
  signature?: string;
  className?: string;
}

function PersonLetter({
  title,
  body,
  date,
  signature,
  className = "",
}: PersonLetterProps) {
  return (
    <section className={`py-16 md:py-24 bg-comfort-cream w-full ${className}`}>
      <div className="container-wide">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 md:p-12 rounded-xl shadow-xl"
          >
            <div className="mb-6 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gentle-charcoal">
                {title}
              </h2>

              {date && <p className="text-soft-shadow">{date}</p>}
            </div>

            <div className="prose prose-lg max-w-none mb-8 text-gentle-charcoal whitespace-pre-line">
              {body}
            </div>

            {signature && (
              <div className="mt-10 flex justify-end">
                <div className="w-48 h-16 relative">
                  <Image
                    src={signature}
                    alt="Signature"
                    fill
                    style={{ objectFit: "contain", objectPosition: "right" }}
                  />
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default withErrorBoundary(PersonLetter, "PersonLetter");
