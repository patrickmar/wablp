import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Globe, 
  Eye, 
  Lock, 
  Mail,
  Smartphone,
  Save,
  Upload,
  Trash2,
  AlertTriangle
} from "lucide-react";

export function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    marketing: true,
    security: true
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#333333] mb-2">Account Settings</h1>
          <p className="text-[#6B7280]">Manage your account preferences and security settings</p>
        </div>
        <Badge className="bg-green-100 text-green-700 self-start md:self-center">
          <Shield className="w-3 h-3 mr-1" />
          Verified Account
        </Badge>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile" className="data-[state=active]:bg-[#004C97] data-[state=active]:text-white">
            <User className="w-4 h-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-[#004C97] data-[state=active]:text-white">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-[#004C97] data-[state=active]:text-white">
            <Shield className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="billing" className="data-[state=active]:bg-[#004C97] data-[state=active]:text-white">
            <CreditCard className="w-4 h-4 mr-2" />
            Billing
          </TabsTrigger>
          <TabsTrigger value="privacy" className="data-[state=active]:bg-[#004C97] data-[state=active]:text-white">
            <Eye className="w-4 h-4 mr-2" />
            Privacy
          </TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" />
                  <AvatarFallback className="bg-[#004C97] text-white text-2xl">TN</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Change Photo
                  </Button>
                  <Button variant="outline" className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">Company Name</label>
                  <Input defaultValue="TechNova Solutions" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">Industry</label>
                  <Select defaultValue="technology">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="agriculture">Agriculture</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="construction">Construction</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">Email</label>
                  <Input defaultValue="info@technova.ng" type="email" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">Phone</label>
                  <Input defaultValue="+234 123 456 7890" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">Website</label>
                  <Input defaultValue="https://technova.ng" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">Country</label>
                  <Select defaultValue="nigeria">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nigeria">Nigeria</SelectItem>
                      <SelectItem value="ghana">Ghana</SelectItem>
                      <SelectItem value="senegal">Senegal</SelectItem>
                      <SelectItem value="ivory_coast">Côte d'Ivoire</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#333333] mb-2">Company Description</label>
                <Textarea 
                  defaultValue="Leading IT solutions provider specializing in enterprise software development and digital transformation."
                  rows={4}
                />
              </div>

              <Button className="bg-[#004C97] text-white hover:bg-[#003a75]">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-[#6B7280]" />
                      <span className="font-medium">Email Notifications</span>
                    </div>
                    <p className="text-sm text-[#6B7280] mt-1">Receive notifications via email</p>
                  </div>
                  <Switch 
                    checked={notifications.email} 
                    onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <Smartphone className="w-4 h-4 text-[#6B7280]" />
                      <span className="font-medium">Push Notifications</span>
                    </div>
                    <p className="text-sm text-[#6B7280] mt-1">Receive push notifications on your device</p>
                  </div>
                  <Switch 
                    checked={notifications.push} 
                    onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <Bell className="w-4 h-4 text-[#6B7280]" />
                      <span className="font-medium">Marketing Communications</span>
                    </div>
                    <p className="text-sm text-[#6B7280] mt-1">Receive updates about new features and opportunities</p>
                  </div>
                  <Switch 
                    checked={notifications.marketing} 
                    onCheckedChange={(checked) => setNotifications({...notifications, marketing: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-[#6B7280]" />
                      <span className="font-medium">Security Alerts</span>
                    </div>
                    <p className="text-sm text-[#6B7280] mt-1">Receive alerts about account security</p>
                  </div>
                  <Switch 
                    checked={notifications.security} 
                    onCheckedChange={(checked) => setNotifications({...notifications, security: checked})}
                  />
                </div>
              </div>

              <Button className="bg-[#004C97] text-white hover:bg-[#003a75]">
                <Save className="w-4 h-4 mr-2" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">Current Password</label>
                  <Input type="password" placeholder="Enter current password" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">New Password</label>
                  <Input type="password" placeholder="Enter new password" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">Confirm New Password</label>
                  <Input type="password" placeholder="Confirm new password" />
                </div>
              </div>

              <Button className="bg-[#004C97] text-white hover:bg-[#003a75]">
                <Lock className="w-4 h-4 mr-2" />
                Update Password
              </Button>

              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-[#333333] mb-4">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">SMS Authentication</p>
                    <p className="text-sm text-[#6B7280]">Add an extra layer of security to your account</p>
                  </div>
                  <Button variant="outline">Enable 2FA</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing */}
        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Billing & Subscription</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-[#004C97] bg-opacity-5 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-[#333333]">Premium Plan</h3>
                    <p className="text-[#6B7280]">Full access to all WABLP features</p>
                  </div>
                  <Badge className="bg-[#D4AF37] text-[#333333]">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#004C97]">$99/month</span>
                  <Button variant="outline">Manage Subscription</Button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-[#333333] mb-4">Payment Method</h3>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-8 h-8 text-[#6B7280]" />
                      <div>
                        <p className="font-medium">•••• •••• •••• 4242</p>
                        <p className="text-sm text-[#6B7280]">Expires 12/2025</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Update</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy */}
        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium">Profile Visibility</span>
                    <p className="text-sm text-[#6B7280] mt-1">Control who can see your business profile</p>
                  </div>
                  <Select defaultValue="members">
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="members">WABLP Members</SelectItem>
                      <SelectItem value="connections">Connections Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium">Contact Information</span>
                    <p className="text-sm text-[#6B7280] mt-1">Allow other members to see your contact details</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium">Activity Status</span>
                    <p className="text-sm text-[#6B7280] mt-1">Show when you're active on the platform</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-red-800">Delete Account</h4>
                      <p className="text-sm text-red-600 mt-1">
                        Permanently delete your account and all associated data. This action cannot be undone.
                      </p>
                      <Button variant="outline" className="mt-3 text-red-600 border-red-600 hover:bg-red-50">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}