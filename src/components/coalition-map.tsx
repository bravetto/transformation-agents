"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Users, Heart, MapPin, Plus, Filter } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";
import { cn } from "@/lib/utils";

// Types for organizations
interface Organization {
  id: string;
  name: string;
  type: "nonprofit" | "business" | "faith" | "education" | "community";
  location: string;
  supportLevel: "gold" | "silver" | "bronze";
  memberCount?: number;
  description: string;
  logo?: string;
}

// Sample organizations data
const organizations: Organization[] = [
  {
    id: "1",
    name: "Fellowship of Christian Athletes",
    type: "faith",
    location: "Tampa, FL",
    supportLevel: "gold",
    memberCount: 1200,
    description: "National sports ministry supporting JAHmere's rehabilitation",
  },
  {
    id: "2",
    name: "Tampa Bay Business Council",
    type: "business",
    location: "Tampa, FL",
    supportLevel: "silver",
    memberCount: 450,
    description: "Local business leaders providing job opportunities",
  },
  {
    id: "3",
    name: "Second Chance Foundation",
    type: "nonprofit",
    location: "Miami, FL",
    supportLevel: "gold",
    memberCount: 800,
    description: "Criminal justice reform organization",
  },
  {
    id: "4",
    name: "University of South Florida",
    type: "education",
    location: "Tampa, FL",
    supportLevel: "silver",
    memberCount: 50000,
    description: "Educational support and mentorship programs",
  },
  {
    id: "5",
    name: "Community Hope Center",
    type: "community",
    location: "St. Petersburg, FL",
    supportLevel: "bronze",
    memberCount: 300,
    description: "Local community support services",
  },
  {
    id: "6",
    name: "Florida Faith Coalition",
    type: "faith",
    location: "Orlando, FL",
    supportLevel: "gold",
    memberCount: 2500,
    description: "Statewide faith-based support network",
  },
];

const typeColors = {
  nonprofit: "bg-blue-500",
  business: "bg-green-500",
  faith: "bg-purple-500",
  education: "bg-orange-500",
  community: "bg-pink-500",
};

const typeIcons = {
  nonprofit: <Heart className="w-5 h-5" />,
  business: <Building2 className="w-5 h-5" />,
  faith: <Heart className="w-5 h-5" />,
  education: <Building2 className="w-5 h-5" />,
  community: <Users className="w-5 h-5" />,
};

interface CoalitionMapProps {
  showJoinButton?: boolean;
  className?: string;
}

function CoalitionMap({ showJoinButton = true, className }: CoalitionMapProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [totalSupport, setTotalSupport] = useState(0);
  const [showJoinModal, setShowJoinModal] = useState(false);

  // Calculate total support
  useEffect(() => {
    const total = organizations.reduce(
      (sum, org) => sum + (org.memberCount || 0),
      0,
    );
    setTotalSupport(total);
  }, []);

  // Filter organizations by type
  const filteredOrgs = selectedType
    ? organizations.filter((org) => org.type === selectedType)
    : organizations;

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Organizations
              </p>
              <p className="text-3xl font-bold">{organizations.length}</p>
            </div>
            <Building2 className="w-8 h-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Members
              </p>
              <p className="text-3xl font-bold">
                {totalSupport.toLocaleString()}
              </p>
            </div>
            <Users className="w-8 h-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Cities Reached
              </p>
              <p className="text-3xl font-bold">5</p>
            </div>
            <MapPin className="w-8 h-8 text-purple-600" />
          </div>
        </Card>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm font-medium mr-2">Filter by type:</span>
        <Button
          size="sm"
          variant={selectedType === null ? "primary" : "outline"}
          onClick={() => setSelectedType(null)}
        >
          All
        </Button>
        {Object.keys(typeColors).map((type) => (
          <Button
            key={type}
            size="sm"
            variant={selectedType === type ? "primary" : "outline"}
            onClick={() => setSelectedType(type)}
            className="capitalize"
          >
            {type}
          </Button>
        ))}
      </div>

      {/* Organizations Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filteredOrgs.map((org, index) => (
            <motion.div
              key={org.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`p-2 rounded-full ${typeColors[org.type]} text-white`}
                  >
                    {typeIcons[org.type]}
                  </div>
                  <Badge
                    variant={
                      org.supportLevel === "gold" ? "default" : "secondary"
                    }
                    className={cn(
                      org.supportLevel === "gold" && "bg-yellow-500",
                      org.supportLevel === "silver" && "bg-gray-400",
                      org.supportLevel === "bronze" && "bg-orange-600",
                    )}
                  >
                    {org.supportLevel}
                  </Badge>
                </div>

                <h3 className="font-bold text-lg mb-1">{org.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{org.location}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {org.description}
                </p>

                {org.memberCount && (
                  <div className="text-sm font-medium text-blue-600">
                    {org.memberCount.toLocaleString()} members
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Join CTA */}
      {showJoinButton && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Card className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
            <h3 className="text-2xl font-bold mb-4">
              Is Your Organization Ready to Support?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              Join a growing coalition of organizations committed to
              rehabilitation over incarceration. Your support can make the
              difference in JAHmere's case and set a precedent for smart
              justice.
            </p>
            <Button
              size="lg"
              className="bg-hope-gold hover:bg-hope-gold/90"
              onClick={() => setShowJoinModal(true)}
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Your Organization
            </Button>
          </Card>
        </motion.div>
      )}

      {/* Join Modal (placeholder) */}
      <AnimatePresence>
        {showJoinModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowJoinModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold mb-4">Join the Coalition</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                To add your organization to the coalition, please contact us at:
              </p>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-6">
                <p className="font-mono text-sm">coalition@bridgeproject.org</p>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowJoinModal(false)}
              >
                Close
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default withDivineErrorBoundary(CoalitionMap, {
  componentName: "CoalitionMap",
  fallback: <div>Unable to load coalition map</div>,
});
