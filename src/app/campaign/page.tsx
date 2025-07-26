"use client";

import { motion } from "framer-motion";
import {
  Heart,
  Twitter,
  Mail,
  Share2,
  Download,
  Users,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { withErrorBoundary } from "@/components/ui/error-boundary";

export default withErrorBoundary(
  function CampaignPage() {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white">
          <div className="container mx-auto py-16 px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-4xl mx-auto space-y-6"
            >
              <Badge
                variant="secondary"
                className="text-lg px-6 py-2 bg-white text-blue-600"
              >
                Campaign Resources
              </Badge>

              <h1 className="text-4xl md:text-6xl font-bold">
                Join The Movement
              </h1>

              <p className="text-xl opacity-90 max-w-3xl mx-auto">
                Access all the resources you need to support JAHmere Webb and
                the Bridge Project
              </p>
            </motion.div>
          </div>
        </section>

        {/* Campaign Resources Grid */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Campaign Resources
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Twitter Campaign Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="p-6 h-full flex flex-col">
                  <div className="mb-6 flex justify-center">
                    <div className="p-4 bg-blue-100 rounded-full">
                      <Twitter className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-center">
                    Twitter Campaign
                  </h3>
                  <p className="text-gray-600 mb-6 flex-grow">
                    Ready-to-use tweets, hashtags, and images to amplify our
                    message across Twitter.
                  </p>
                  <Link href="/twitter-campaign">
                    <Button className="w-full" variant="outline">
                      Access Twitter Kit
                    </Button>
                  </Link>
                </Card>
              </motion.div>

              {/* Write to Judge Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="p-6 h-full flex flex-col">
                  <div className="mb-6 flex justify-center">
                    <div className="p-4 bg-amber-100 rounded-full">
                      <Mail className="w-8 h-8 text-amber-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-center">
                    Write to Judge
                  </h3>
                  <p className="text-gray-600 mb-6 flex-grow">
                    Submit a letter of support for JAHmere directly to Judge
                    Ferrero.
                  </p>
                  <Link href="/contact">
                    <Button className="w-full bg-amber-600 text-white hover:bg-amber-700">
                      Write Your Letter
                    </Button>
                  </Link>
                </Card>
              </motion.div>

              {/* Attend Court Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="p-6 h-full flex flex-col">
                  <div className="mb-6 flex justify-center">
                    <div className="p-4 bg-purple-100 rounded-full">
                      <Users className="w-8 h-8 text-purple-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-center">
                    Attend Court
                  </h3>
                  <p className="text-gray-600 mb-6 flex-grow">
                    Information about attending the July 9th arraignment in
                    person to show support.
                  </p>
                  <Link href="/july-9-strategy">
                    <Button className="w-full" variant="outline">
                      Court Details
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Campaign Materials */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Downloadable Materials
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Social Media Graphics */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-blue-600" />
                  Social Media Graphics
                </h3>
                <div className="aspect-video bg-gray-200 rounded-lg mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-gray-500">Preview image</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  High-quality images optimized for Twitter, Facebook, and
                  Instagram.
                </p>
                <Button className="w-full" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download Graphics Pack
                </Button>
              </Card>

              {/* Fact Sheet */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <ExternalLink className="w-5 h-5 text-green-600" />
                  Campaign Fact Sheet
                </h3>
                <div className="aspect-video bg-gray-200 rounded-lg mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-gray-500">Preview document</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Key facts and talking points about JAHmere's case and the
                  Bridge Project.
                </p>
                <Button className="w-full" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-4">
          <div className="container mx-auto text-center max-w-3xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-10"
            >
              <Heart className="w-12 h-12 mx-auto mb-6 text-white" />
              <h2 className="text-3xl font-bold mb-4">Every Action Matters</h2>
              <p className="text-xl mb-8">
                Your support today could be the difference in JAHmere's future.
                Join thousands of others in this movement for transformation
                justice.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100"
                  >
                    Write Your Letter
                  </Button>
                </Link>
                <Link href="/twitter-campaign">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10"
                  >
                    Share on Twitter
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    );
  },
  "CampaignPage",
  <div className="p-8 text-center">
    Sorry, the campaign page could not be loaded.
  </div>
);
