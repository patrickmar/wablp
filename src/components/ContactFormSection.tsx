import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { MapPin, Users, Mail, MessageSquare, Calendar } from "lucide-react";

export function ContactFormSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl text-[#005A8C] mb-4">
                Send Us a Message
              </h2>
              <p className="text-xl text-gray-600">
                Fill out the form below and we&apos;ll get back to you within 24 hours.
              </p>
            </div>
            
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#005A8C]">Contact Form</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <Input 
                        placeholder="Enter your first name"
                        className="focus:ring-[#C9A74B] focus:border-[#C9A74B]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <Input 
                        placeholder="Enter your last name"
                        className="focus:ring-[#C9A74B] focus:border-[#C9A74B]"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <Input 
                      type="email"
                      placeholder="Enter your email address"
                      className="focus:ring-[#C9A74B] focus:border-[#C9A74B]"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name
                      </label>
                      <Input 
                        placeholder="Enter your company name"
                        className="focus:ring-[#C9A74B] focus:border-[#C9A74B]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Industry
                      </label>
                      <Select>
                        <SelectTrigger className="focus:ring-[#C9A74B] focus:border-[#C9A74B]">
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="agriculture">Agriculture</SelectItem>
                          <SelectItem value="construction">Construction</SelectItem>
                          <SelectItem value="fintech">Fintech</SelectItem>
                          <SelectItem value="energy">Energy</SelectItem>
                          <SelectItem value="logistics">Logistics</SelectItem>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <Select>
                      <SelectTrigger className="focus:ring-[#C9A74B] focus:border-[#C9A74B]">
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="membership">Membership Information</SelectItem>
                        <SelectItem value="partnership">Partnership Opportunities</SelectItem>
                        <SelectItem value="technical">Technical Support</SelectItem>
                        <SelectItem value="billing">Billing & Payments</SelectItem>
                        <SelectItem value="demo">Request a Demo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <Textarea 
                      placeholder="Tell us more about your inquiry..."
                      rows={5}
                      className="focus:ring-[#C9A74B] focus:border-[#C9A74B]"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox"
                      id="newsletter"
                      className="text-[#C9A74B] focus:ring-[#C9A74B]"
                    />
                    <label htmlFor="newsletter" className="text-sm text-gray-600">
                      I&apos;d like to receive updates about WABLP news and opportunities
                    </label>
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full bg-[#005A8C] text-white hover:bg-[#004a73] py-3"
                  >
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          {/* Map and Additional Info */}
          <div>
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl text-[#005A8C] mb-4">
                Our Location
              </h2>
              <p className="text-xl text-gray-600">
                Visit us at our headquarters in Lagos, Nigeria.
              </p>
            </div>
            
            {/* Map Placeholder */}
            <Card className="shadow-lg mb-8">
              <CardContent className="p-0">
                <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#005A8C] to-[#0066a3] opacity-80"></div>
                  <div className="relative text-center text-white z-10">
                    <MapPin className="w-12 h-12 mx-auto mb-4" />
                    <p className="text-lg font-medium">Interactive Map</p>
                    <p className="text-sm opacity-90">Victoria Island, Lagos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Quick Contact Options */}
            <div className="space-y-4">
              <Card className="shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#005A8C] text-white rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#005A8C]">Schedule a Demo</h3>
                      <p className="text-gray-600 text-sm">Book a personalized demo with our team</p>
                    </div>
                    <Button size="sm" variant="outline" className="ml-auto border-[#005A8C] text-[#005A8C] hover:bg-[#005A8C] hover:text-white">
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#C9A74B] text-white rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#005A8C]">Join Our Community</h3>
                      <p className="text-gray-600 text-sm">Connect with 560+ verified businesses</p>
                    </div>
                    <Button size="sm" className="ml-auto bg-[#C9A74B] text-white hover:bg-[#b8964a]">
                      Join Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#005A8C] text-white rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#005A8C]">Email Support</h3>
                      <p className="text-gray-600 text-sm">Get help from our support team</p>
                    </div>
                    <Button size="sm" variant="outline" className="ml-auto border-[#005A8C] text-[#005A8C] hover:bg-[#005A8C] hover:text-white">
                      Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Response Time Info */}
            <div className="mt-8 bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-[#005A8C] mb-4">Response Times</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Badge className="bg-[#C9A74B] text-white">Email</Badge>
                  <span className="text-sm text-gray-600">Within 24 hours</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className="bg-[#005A8C] text-white">Phone</Badge>
                  <span className="text-sm text-gray-600">Immediate</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="outline">Demo Request</Badge>
                  <span className="text-sm text-gray-600">Same day</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="outline">Partnership</Badge>
                  <span className="text-sm text-gray-600">Within 3 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}