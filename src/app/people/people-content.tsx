"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAllPeople } from "@/data/people";
import InteractivePersonGrid from "@/components/people/interactive-person-grid";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";
import {
  GridLoadingSkeleton,
  LoadingMessages,
  ErrorWithRetry,
} from "@/components/people/LoadingStates";
import { PersonData, PersonRole } from "@/types/person";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Search,
  Filter,
  Users,
  Heart,
  Star,
  ArrowRight,
  Sparkles,
  Shield,
  Crown,
  Zap,
} from "lucide-react";
import Link from "next/link";

// Enhanced hero background with floating elements
const EnhancedHeroBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800" />

      {/* Animated Geometric Shapes */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              scale: 0,
              rotate: 0,
            }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: "easeInOut",
            }}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Overlay Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.1),transparent_50%)]" />
    </div>
  );
};

// Role filter component
const RoleFilter = ({
  selectedRole,
  onRoleChange,
  roleCounts,
}: {
  selectedRole: PersonRole | "all";
  onRoleChange: (role: PersonRole | "all") => void;
  roleCounts: Record<PersonRole | "all", number>;
}) => {
  const roleConfig = {
    all: { label: "All People", icon: Users, color: "bg-gray-500" },
    lightworker: {
      label: "Lightworkers",
      icon: Sparkles,
      color: "bg-yellow-500",
    },
    messenger: { label: "Messengers", icon: Zap, color: "bg-blue-500" },
    witness: { label: "Witnesses", icon: Heart, color: "bg-red-500" },
    guardian: { label: "Guardians", icon: Shield, color: "bg-green-500" },
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {Object.entries(roleConfig).map(([role, config]) => {
        const Icon = config.icon;
        const isSelected = selectedRole === role;
        const count = roleCounts[role as PersonRole | "all"] || 0;

        return (
          <motion.button
            key={role}
            onClick={() => onRoleChange(role as PersonRole | "all")}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all duration-300
              ${
                isSelected
                  ? "bg-white text-gray-900 border-white shadow-lg"
                  : "bg-white/10 text-white border-white/30 hover:bg-white/20"
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon className="w-4 h-4" />
            <span className="font-medium">{config.label}</span>
            <Badge
              variant="secondary"
              className={`
                ml-1 text-xs
                ${isSelected ? "bg-gray-100 text-gray-800" : "bg-white/20 text-white"}
              `}
            >
              {count}
            </Badge>
          </motion.button>
        );
      })}
    </div>
  );
};

// Search component
const SearchBar = ({
  searchTerm,
  onSearchChange,
}: {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}) => {
  return (
    <div className="relative max-w-md mx-auto">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder="Search transformation agents..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/30 rounded-full text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 backdrop-blur-sm"
      />
    </div>
  );
};

// Stats component
const PeopleStats = ({ people }: { people: PersonData[] }) => {
  const stats = [
    {
      label: "Total Agents",
      value: people.length,
      icon: Users,
      color: "text-blue-400",
    },
    {
      label: "Active Stories",
      value: people.filter((p) => p.testimony).length,
      icon: Heart,
      color: "text-red-400",
    },
    {
      label: "Featured",
      value: people.filter((p) => p.id === "jahmere-webb").length,
      icon: Star,
      color: "text-yellow-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm p-6 text-center">
              <Icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
              <div className="text-3xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-white/70 text-sm">{stat.label}</div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

interface PeopleContentProps {
  simulationConfig?: {
    loadingDelay?: number;
    simulateError?: boolean;
  };
}

function PeopleContent({ simulationConfig }: PeopleContentProps) {
  const [people, setPeople] = useState<PersonData[] | null>(null);
  const [filteredPeople, setFilteredPeople] = useState<PersonData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<PersonRole | "all">("all");

  // For testing - use the passed configuration or defaults
  const SIMULATE_LOADING_DELAY = simulationConfig?.loadingDelay || 0;
  const SIMULATE_ERROR = simulationConfig?.simulateError || false;

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    // Calculate exponential backoff delay (min 1s, max 10s) for retries
    const backoffDelay = Math.min(1000 * Math.pow(2, retryCount), 10000);
    const delay = retryCount === 0 ? SIMULATE_LOADING_DELAY : backoffDelay;

    const timer = setTimeout(() => {
      try {
        // Simulate error for testing if enabled
        if (SIMULATE_ERROR && retryCount === 0) {
          throw new Error("Simulated error for testing");
        }

        const loadedPeople = getAllPeople();
        setPeople(loadedPeople);
        setIsLoading(false);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Error loading transformation agents";
        setError(errorMessage);
        setIsLoading(false);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [retryCount, SIMULATE_LOADING_DELAY, SIMULATE_ERROR, simulationConfig]);

  // Filter and search logic
  useEffect(() => {
    if (!people) return;

    let filtered = people;

    // Filter by role
    if (selectedRole !== "all") {
      filtered = filtered.filter((person) => person.role === selectedRole);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (person) =>
          person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          person.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          person.testimony?.quote
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()),
      );
    }

    setFilteredPeople(filtered);
  }, [people, selectedRole, searchTerm]);

  // Calculate role counts
  const roleCounts = people
    ? {
        all: people.length,
        lightworker: people.filter((p) => p.role === "lightworker").length,
        messenger: people.filter((p) => p.role === "messenger").length,
        witness: people.filter((p) => p.role === "witness").length,
        guardian: people.filter((p) => p.role === "guardian").length,
      }
    : {
        all: 0,
        lightworker: 0,
        messenger: 0,
        witness: 0,
        guardian: 0,
      };

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50">
      {/* Enhanced Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <EnhancedHeroBackground />

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6"
              data-testid="heading"
            >
              <span className="bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
                Transformation
              </span>
              <br />
              <span className="text-yellow-300">Agents</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed"
              data-testid="text"
            >
              Meet the extraordinary individuals whose faith journeys are
              transforming lives and communities through authentic connection
              and divine purpose.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold px-8 py-3"
                asChild
              >
                <Link href="/people/jahmere-webb">
                  <Star className="w-5 h-5 mr-2" />
                  Meet JAHmere Webb
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3"
                asChild
              >
                <Link href="/letter-portal">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Write a Letter
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      {people && (
        <section className="py-16 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <PeopleStats people={people} />
          </div>
        </section>
      )}

      {/* Search and Filter Section */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Search Bar */}
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

            {/* Role Filters */}
            {people && (
              <RoleFilter
                selectedRole={selectedRole}
                onRoleChange={setSelectedRole}
                roleCounts={roleCounts}
              />
            )}

            {/* Results Count */}
            <motion.div
              className="text-center text-white/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {people && (
                <p>
                  Showing {filteredPeople.length} of {people.length}{" "}
                  transformation agents
                  {searchTerm && ` matching "${searchTerm}"`}
                  {selectedRole !== "all" && ` in ${selectedRole}s`}
                </p>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16" data-testid="section">
        <div className="container mx-auto px-4">
          {/* Loading, Error or Content */}
          {isLoading ? (
            <div className="space-y-8">
              <LoadingMessages />
              <GridLoadingSkeleton count={8} showFeatured={true} />
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-16">
              <ErrorWithRetry message={error} onRetry={handleRetry} />
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedRole}-${searchTerm}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {filteredPeople.length > 0 ? (
                  <Suspense
                    fallback={
                      <GridLoadingSkeleton count={8} showFeatured={true} />
                    }
                  >
                    <InteractivePersonGrid
                      people={filteredPeople}
                      simulateLoadingDelay={0}
                      data-testid="person-grid"
                    />
                  </Suspense>
                ) : (
                  <div className="text-center py-16">
                    <div className="max-w-md mx-auto">
                      <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        No agents found
                      </h3>
                      <p className="text-gray-500 mb-6">
                        Try adjusting your search terms or filters to find
                        transformation agents.
                      </p>
                      <Button
                        onClick={() => {
                          setSearchTerm("");
                          setSelectedRole("all");
                        }}
                        variant="outline"
                      >
                        Clear Filters
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>
    </main>
  );
}

export default withDivineErrorBoundary(PeopleContent, {
  componentName: "PeopleContent",
  role: "guardian",
});
