import { Button } from "./ui/button";
import { Input } from "./ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { UserPlus, Shield, CheckCircle, Users } from "lucide-react";

const benefits = [
    "14-day free trial",
    "No setup fees",
    "Cancel anytime",
    "Dedicated support"
];

export function SigninFormSection() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Form */}
                    <div>
                        <div className="mb-8">
                            <h2 className="text-3xl md:text-4xl text-[#005A8C] mb-4">
                                Login to WABLP
                            </h2>
                            <p className="text-xl text-gray-600">
                                Login with your data you entered during your registration.
                            </p>
                        </div>

                        <Card className="shadow-xl">
                            <CardHeader className="bg-gradient-to-r from-[#005A8C] to-[#0066a3] text-white rounded-t-lg">
                                <CardTitle className="flex items-center">
                                    <UserPlus className="w-6 h-6 mr-2" />
                                    Input your login details.
                                </CardTitle>
                                {/* <p className="text-gray-200 text-sm">Join 560+ verified businesses across West Africa</p> */}
                            </CardHeader>
                            <CardContent className="p-8">
                                <form className="space-y-6">
                                    {/* Personal Information */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-[#005A8C] mb-4">Personal Information</h3>
                                        <div className="mt-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email Address *
                                            </label>
                                            <Input
                                                type="email"
                                                placeholder="Enter your email"
                                                className="focus:ring-[#C9A74B] focus:border-[#C9A74B]"
                                            />
                                        </div>
                                        <div className="mt-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Password *
                                            </label>
                                            <Input
                                                type="password"
                                                placeholder="Enter your password"
                                                className="focus:ring-[#C9A74B] focus:border-[#C9A74B]"
                                            />
                                            <div className="flex justify-end">
                                                <a
                                                    href="/forgot-password" // <-- replace with your route
                                                    className="mt-1 text-xs text-[#005A8C] hover:underline"
                                                >
                                                    Forgot password?
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Terms and Conditions */}
                                    <Button
                                        type="submit"
                                        className="w-full bg-[#C9A74B] text-white hover:bg-[#b8964a] py-4 text-lg"
                                    >
                                        Login
                                        <CheckCircle className="w-5 h-5 ml-2" />
                                    </Button>

                                    <p className="text-center text-sm text-gray-600">
                                        Don't have an account?
                                        <a href="#" className="text-[#005A8C] hover:underline ml-1">Sign Up here</a>
                                    </p>
                                </form>
                            </CardContent>
                        </Card>
                    </div>












                    {/* Benefits Sidebar */}
                    {/* <div>
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
                    </div> */}
                </div>
            </div>
        </section>
    );
}