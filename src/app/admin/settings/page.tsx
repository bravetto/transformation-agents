"use client";

import { withErrorBoundary } from "@/components/with-error-boundary";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Shield, Bell, Database, Globe, Mail } from "lucide-react";

function SystemSettingsPage() {
  return (
    <div className="min-h-screen p-8 bg-gray-900">
      <h1 className="text-3xl font-bold mb-8 text-white">System Settings</h1>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-gray-800">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card className="p-6 bg-gray-800 border-gray-700">
            <div className="flex items-center gap-2 mb-6">
              <Globe className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">
                Site Configuration
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="site-name">Site Name</Label>
                <Input
                  id="site-name"
                  defaultValue="The Bridge Project"
                  className="bg-gray-700 border-gray-600"
                />
              </div>
              <div>
                <Label htmlFor="site-url">Site URL</Label>
                <Input
                  id="site-url"
                  defaultValue="https://bridgeproject.org"
                  className="bg-gray-700 border-gray-600"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="maintenance">Maintenance Mode</Label>
                  <p className="text-sm text-gray-400">
                    Temporarily disable site access
                  </p>
                </div>
                <Switch id="maintenance" />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="p-6 bg-gray-800 border-gray-700">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-semibold text-white">
                Security Settings
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="2fa">Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-400">
                    Require 2FA for admin access
                  </p>
                </div>
                <Switch id="2fa" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="ssl">Force SSL</Label>
                  <p className="text-sm text-gray-400">
                    Redirect all traffic to HTTPS
                  </p>
                </div>
                <Switch id="ssl" defaultChecked />
              </div>
              <div>
                <Label htmlFor="session-timeout">
                  Session Timeout (minutes)
                </Label>
                <Input
                  id="session-timeout"
                  type="number"
                  defaultValue="30"
                  className="bg-gray-700 border-gray-600"
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="p-6 bg-gray-800 border-gray-700">
            <div className="flex items-center gap-2 mb-6">
              <Bell className="w-5 h-5 text-green-400" />
              <h2 className="text-xl font-semibold text-white">
                Notification Preferences
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications">
                    Email Notifications
                  </Label>
                  <p className="text-sm text-gray-400">
                    Receive system alerts via email
                  </p>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="error-alerts">Error Alerts</Label>
                  <p className="text-sm text-gray-400">
                    Get notified of critical errors
                  </p>
                </div>
                <Switch id="error-alerts" defaultChecked />
              </div>
              <div>
                <Label htmlFor="alert-email">Alert Email</Label>
                <Input
                  id="alert-email"
                  type="email"
                  defaultValue="admin@bridgeproject.org"
                  className="bg-gray-700 border-gray-600"
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card className="p-6 bg-gray-800 border-gray-700">
            <div className="flex items-center gap-2 mb-6">
              <Database className="w-5 h-5 text-orange-400" />
              <h2 className="text-xl font-semibold text-white">
                External Integrations
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="clickup-api">ClickUp API Key</Label>
                <Input
                  id="clickup-api"
                  type="password"
                  defaultValue="pk_********"
                  className="bg-gray-700 border-gray-600"
                />
              </div>
              <div>
                <Label htmlFor="analytics-id">Google Analytics ID</Label>
                <Input
                  id="analytics-id"
                  defaultValue="G-XXXXXXXXXX"
                  className="bg-gray-700 border-gray-600"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="crm-sync">CRM Auto-Sync</Label>
                  <p className="text-sm text-gray-400">
                    Automatically sync contacts
                  </p>
                </div>
                <Switch id="crm-sync" />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 flex justify-end">
        <Button className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}

export default withErrorBoundary(SystemSettingsPage, {
  componentName: "SystemSettingsPage",
  fallback: (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      Error loading system settings
    </div>
  ),
});
