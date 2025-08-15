import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { UserPlus, Shield, CheckCircle, Users } from "lucide-react";

const benefits = [
  "14-day free trial",
  "No setup fees",
  "Cancel anytime",
  "Dedicated support"
];

export function SignupFormSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <div>
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl text-[#005A8C] mb-4">
                Join WABLP Today
              </h2>
              <p className="text-xl text-gray-600">
                Start your journey to business growth with our comprehensive platform.
              </p>
            </div>
            
            <Card className="shadow-xl">
              <CardHeader className="bg-gradient-to-r from-[#005A8C] to-[#0066a3] text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <UserPlus className="w-6 h-6 mr-2" />
                  Create Your Business Account
                </CardTitle>
                <p className="text-gray-200 text-sm">Join 560+ verified businesses across West Africa</p>
              </CardHeader>
              <CardContent className="p-8">
                <form className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-[#005A8C] mb-4">Personal Information</h3>
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
                    
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <Input 
                        type="email"
                        placeholder="Enter your business email"
                        className="focus:ring-[#C9A74B] focus:border-[#C9A74B]"
                      />
                    </div>
                    
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <Input 
                        type="tel"
                        placeholder="+234 (123) 456-7890"
                        className="focus:ring-[#C9A74B] focus:border-[#C9A74B]"
                      />
                    </div>
                  </div>
                  
                  {/* Company Information */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-[#005A8C] mb-4">Company Information</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name *
                      </label>
                      <Input 
                        placeholder="Enter your company name"
                        className="focus:ring-[#C9A74B] focus:border-[#C9A74B]"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Industry *
                        </label>
                        <Select>
                          <SelectTrigger className="focus:ring-[#C9A74B] focus:border-[#C9A74B]">
                            <SelectValue placeholder="Select your industry" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="technology">Technology</SelectItem>
                            <SelectItem value="agriculture">Agriculture</SelectItem>
                            <SelectItem value="construction">Construction</SelectItem>
                            <SelectItem value="fintech">Financial Technology</SelectItem>
                            <SelectItem value="energy">Energy & Utilities</SelectItem>
                            <SelectItem value="logistics">Logistics & Transportation</SelectItem>
                            <SelectItem value="manufacturing">Manufacturing</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="retail">Retail & E-commerce</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company Size *
                        </label>
                        <Select>
                          <SelectTrigger className="focus:ring-[#C9A74B] focus:border-[#C9A74B]">
                            <SelectValue placeholder="Select company size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="startup">1-10 employees</SelectItem>
                            <SelectItem value="small">11-50 employees</SelectItem>
                            <SelectItem value="medium">51-200 employees</SelectItem>
                            <SelectItem value="large">201-1000 employees</SelectItem>
                            <SelectItem value="enterprise">1000+ employees</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Country *
                        </label>
                        <Select>
                          <SelectTrigger className="focus:ring-[#C9A74B] focus:border-[#C9A74B]">
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="nigeria">Nigeria</SelectItem>
                            <SelectItem value="ghana">Ghana</SelectItem>
                            <SelectItem value="senegal">Senegal</SelectItem>
                            <SelectItem value="cote-divoire">Côte d&apos;Ivoire</SelectItem>
                            <SelectItem value="mali">Mali</SelectItem>
                            <SelectItem value="burkina-faso">Burkina Faso</SelectItem>
                            <SelectItem value="niger">Niger</SelectItem>
                            <SelectItem value="guinea">Guinea</SelectItem>
                            <SelectItem value="sierra-leone">Sierra Leone</SelectItem>
                            <SelectItem value="liberia">Liberia</SelectItem>
                            <SelectItem value="togo">Togo</SelectItem>
                            <SelectItem value="benin">Benin</SelectItem>
                            <SelectItem value="gambia">The Gambia</SelectItem>
                            <SelectItem value="guinea-bissau">Guinea-Bissau</SelectItem>
                            <SelectItem value="cape-verde">Cape Verde</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City *
                        </label>
                        <Input 
                          placeholder="Enter your city"
                          className="focus:ring-[#C9A74B] focus:border-[#C9A74B]"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Terms and Conditions */}
                  <div className="border-t pt-6">
                    <div className="flex items-start space-x-3">
                      <input 
                        type="checkbox"
                        id="terms"
                        className="mt-1 text-[#C9A74B] focus:ring-[#C9A74B]"
                      />
                      <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                        I agree to the <a href="#" className="text-[#005A8C] hover:underline">Terms of Service</a> and 
                        <a href="#" className="text-[#005A8C] hover:underline ml-1">Privacy Policy</a>. 
                        I also consent to receive marketing communications from WABLP.
                      </label>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full bg-[#C9A74B] text-white hover:bg-[#b8964a] py-4 text-lg"
                  >
                    Start Your Free Trial
                    <CheckCircle className="w-5 h-5 ml-2" />
                  </Button>
                  
                  <p className="text-center text-sm text-gray-600">
                    Already have an account? 
                    <a href="#" className="text-[#005A8C] hover:underline ml-1">Sign in here</a>
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
          
          {/* Benefits Sidebar */}
          <div>
            <Card className="shadow-xl sticky top-8">
              <CardHeader>
                <CardTitle className="text-[#005A8C] flex items-center">
                  <Shield className="w-6 h-6 mr-2" />
                  What You Get
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#C9A74B]" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-6">
                  <h4 className="font-semibold text-[#005A8C] mb-4">Instant Access To:</h4>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li>• Enhanced business profile creation</li>
                    <li>• Member directory with 560+ businesses</li>
                    <li>• Opportunity marketplace</li>
                    <li>• Secure messaging system</li>
                    <li>• Business networking events</li>
                    <li>• Industry reports and insights</li>
                    <li>• Supplier diversity programs</li>
                    <li>• 24/7 customer support</li>
                  </ul>
                </div>
                
                <div className="mt-6 p-4 bg-[#C9A74B] bg-opacity-10 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="w-5 h-5 text-[#C9A74B]" />
                    <span className="font-semibold text-[#005A8C]">Join 560+ Businesses</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Connect with verified companies across 15 West African countries and grow your network today.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}