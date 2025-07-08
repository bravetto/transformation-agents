"use client";

import { withErrorBoundary } from "@/components/with-error-boundary";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  UserPlus,
  RefreshCw,
  CheckCircle,
  Database,
} from "lucide-react";
import { useState } from "react";

function ClickUpCRMDemoPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    relationship: "Supporter",
    connectionStrength: "Medium",
    engagementLevel: "medium",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const response = await fetch("/api/crm/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      setSubmitResult(result);

      if (result.success) {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          relationship: "Supporter",
          connectionStrength: "Medium",
          engagementLevel: "medium",
        });
      }
    } catch (error) {
      setSubmitResult({
        success: false,
        error: "Failed to create contact",
        details: error,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const testContacts = [
    {
      name: "Jahmere Webb",
      email: "jahmere@bridge.com",
      role: "Founder",
      status: "Active",
    },
    {
      name: "Divine TestUser",
      email: "divine@bridge.com",
      role: "Champion",
      status: "Active",
    },
    {
      name: "Coach Dungy",
      email: "coach@bridge.com",
      role: "Advisor",
      status: "Active",
    },
  ];

  return (
    <div className="min-h-screen p-8 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Database className="w-8 h-8 text-purple-400" />
          <h1 className="text-3xl font-bold text-white">ClickUp CRM Demo</h1>
          <Badge
            variant="outline"
            className="text-purple-400 border-purple-400"
          >
            Integrated
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Create Contact Form */}
          <Card className="p-6 bg-gray-800 border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <UserPlus className="w-5 h-5" />
              Create New Contact
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    required
                    className="bg-gray-700 border-gray-600"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    required
                    className="bg-gray-700 border-gray-600"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="bg-gray-700 border-gray-600"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="bg-gray-700 border-gray-600"
                />
              </div>

              <div>
                <Label htmlFor="relationship">Relationship Type</Label>
                <select
                  id="relationship"
                  value={formData.relationship}
                  onChange={(e) =>
                    setFormData({ ...formData, relationship: e.target.value })
                  }
                  className="w-full bg-gray-700 border-gray-600 rounded px-3 py-2 text-white"
                >
                  <option value="Founder">Founder</option>
                  <option value="Core Team">Core Team</option>
                  <option value="Supporter">Supporter</option>
                  <option value="Community Leader">Community Leader</option>
                  <option value="Technology Partner">Technology Partner</option>
                  <option value="Volunteer">Volunteer</option>
                  <option value="Donor">Donor</option>
                </select>
              </div>

              <div>
                <Label htmlFor="engagement">Engagement Level</Label>
                <select
                  id="engagement"
                  value={formData.engagementLevel}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      engagementLevel: e.target.value,
                    })
                  }
                  className="w-full bg-gray-700 border-gray-600 rounded px-3 py-2 text-white"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Contact in ClickUp"
                )}
              </Button>
            </form>

            {submitResult && (
              <div
                className={`mt-4 p-4 rounded-lg ${submitResult.success ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}
              >
                {submitResult.success ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <div>
                      <p>Contact created successfully!</p>
                      {submitResult.data?.url && (
                        <a
                          href={submitResult.data.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm underline"
                        >
                          View in ClickUp
                        </a>
                      )}
                    </div>
                  </div>
                ) : (
                  <p>{submitResult.error}</p>
                )}
              </div>
            )}
          </Card>

          {/* CRM Stats & Test Data */}
          <div className="space-y-6">
            <Card className="p-6 bg-gray-800 border-gray-700">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                CRM Statistics
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700/50 p-4 rounded">
                  <p className="text-2xl font-bold text-white">24</p>
                  <p className="text-sm text-gray-400">Total Contacts</p>
                </div>
                <div className="bg-gray-700/50 p-4 rounded">
                  <p className="text-2xl font-bold text-white">10</p>
                  <p className="text-sm text-gray-400">New This Week</p>
                </div>
                <div className="bg-gray-700/50 p-4 rounded">
                  <p className="text-2xl font-bold text-white">8</p>
                  <p className="text-sm text-gray-400">High Engagement</p>
                </div>
                <div className="bg-gray-700/50 p-4 rounded">
                  <p className="text-2xl font-bold text-white">15</p>
                  <p className="text-sm text-gray-400">Volunteers</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gray-800 border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">
                Recent Contacts
              </h3>
              <div className="space-y-3">
                {testContacts.map((contact) => (
                  <div
                    key={contact.email}
                    className="flex items-center justify-between p-3 bg-gray-700/50 rounded"
                  >
                    <div>
                      <p className="text-white font-medium">{contact.name}</p>
                      <p className="text-sm text-gray-400">{contact.email}</p>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant="outline"
                        className="text-green-400 border-green-400"
                      >
                        {contact.status}
                      </Badge>
                      <p className="text-xs text-gray-400 mt-1">
                        {contact.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(ClickUpCRMDemoPage, {
  componentName: "ClickUpCRMDemoPage",
  fallback: (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      Error loading ClickUp CRM demo
    </div>
  ),
});
