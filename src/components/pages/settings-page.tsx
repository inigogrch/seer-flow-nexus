'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { AppLayout } from "@/components/layout/app-layout";
import { Bell, Moon, Sun, User, Database, Zap } from "lucide-react";

export function SettingsPage() {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Customize your intelligence feed and preferences
        </p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile & Interests
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Role</label>
            {/* 🔄 MIGRATION TODO: Replace with real user data from API/database */}
            <p className="text-sm text-muted-foreground">Data Scientist</p>
            <Button variant="outline" size="sm" className="mt-2">
              {/* 🔄 MIGRATION TODO: Wire this to actual profile update functionality */}
              Update Role
            </Button>
          </div>
          
          <div>
            <label className="text-sm font-medium">Tech Interests</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {/* 🔄 MIGRATION TODO: Replace with real user interests from API */}
              {["Computer Vision", "LLMs", "MLOps", "Cloud AI"].map((interest) => (
                <Badge key={interest} variant="secondary">
                  {interest}
                </Badge>
              ))}
            </div>
            <Button variant="outline" size="sm" className="mt-2">
              {/* 🔄 MIGRATION TODO: Wire this to actual interests management */}
              Manage Interests
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 🔄 MIGRATION TODO: Wire these switches to real user preferences API */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">High Impact Stories</p>
              <p className="text-sm text-muted-foreground">Get notified about breakthrough developments</p>
            </div>
            <Switch 
              defaultChecked 
              // 🔄 TODO: onCheckedChange={(checked) => updateNotificationSetting('highImpact', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Daily Digest</p>
              <p className="text-sm text-muted-foreground">Receive a summary of top stories each morning</p>
            </div>
            <Switch 
              defaultChecked 
              // 🔄 TODO: onCheckedChange={(checked) => updateNotificationSetting('dailyDigest', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Weekly Trends</p>
              <p className="text-sm text-muted-foreground">Weekly analysis of emerging trends</p>
            </div>
            <Switch 
              // 🔄 TODO: onCheckedChange={(checked) => updateNotificationSetting('weeklyTrends', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sun className="h-5 w-5" />
            Appearance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Theme</p>
              <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Sun className="h-4 w-4 mr-2" />
                Light
              </Button>
              <Button variant="ghost" size="sm">
                <Moon className="h-4 w-4 mr-2" />
                Dark
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data & Privacy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Data & Privacy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Personalization</p>
              <p className="text-sm text-muted-foreground">Use reading history to improve recommendations</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div>
            <Button 
              variant="outline" 
              className="mr-3"
              // 🔄 MIGRATION TODO: Wire to real data export functionality
              // onClick={() => exportUserData()}
            >
              Export Data
            </Button>
            <Button 
              variant="outline"
              // 🔄 MIGRATION TODO: Wire to real data clearing functionality  
              // onClick={() => clearUserHistory()}
            >
              Clear History
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Advanced */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Advanced
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="font-medium">API Access</p>
            <p className="text-sm text-muted-foreground mb-2">
              Integrate seer.ai intelligence into your own applications
            </p>
            <Button 
              variant="outline"
              // 🔄 MIGRATION TODO: Wire to real API key generation
              // onClick={() => generateApiKey()}
            >
              Get API Key
            </Button>
          </div>
        </CardContent>
      </Card>
      </div>
    </AppLayout>
  );
}