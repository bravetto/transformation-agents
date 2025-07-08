"use client";

import { Inter as FontSans } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { DivineParticles } from "@/components/divine-particles";
import { cn } from "@/lib/utils";
import "@/styles/sacred.css";
import "@/app/globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-sacred font-sans antialiased",
          fontSans.variable,
        )}
      >
        {/* Divine background particles */}
        <div className="fixed inset-0 pointer-events-none">
          <DivineParticles
            variant="divine"
            className="h-full w-full opacity-20"
          />
        </div>

        {/* Sacred light rays */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-radial from-white/5 to-transparent opacity-20" />
          <div className="absolute inset-0 bg-gradient-conic from-hope-gold/10 via-transparent to-hope-gold/10 animate-spin-slow" />
        </div>

        {/* Main content with page transitions */}
        <AnimatePresence mode="wait">
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            {children}
          </motion.main>
        </AnimatePresence>

        {/* Divine footer */}
        <footer className="relative z-10 py-8 mt-auto">
          <div className="container mx-auto px-4 text-center">
            <p className="text-white/60 text-sm">
              Powered by Divine Love | Guided by Sacred Truth | Built with Holy
              Purpose
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;
