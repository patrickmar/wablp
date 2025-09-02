"use client";

import { ArrowLeft, ArrowRight, Badge, Globe, Quote, Star, TrendingUp, Users } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { useState, useRef } from "react";


const testimonials = [
    { name: "Kwame Asante", company: "GreenHarvest Ltd", location: "Accra, Ghana", quote: "WABLP helped us find reliable suppliers across West Africa. Our supply chain is now 40% more efficient.", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80", rating: 5, growth: "+40% efficiency" },
    { name: "Fatou Diallo", company: "AfricaBuild Corp", location: "Abidjan, Côte d'Ivoire", quote: "The platform's security features gave us confidence to expand into new markets. We've completed over $2M in deals.", avatar: "https://images.unsplash.com/photo-1494790108755-2616b012d7c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80", rating: 5, growth: "$2M+ deals" },
    { name: "Ibrahim Sall", company: "WestPay Financial", location: "Dakar, Senegal", quote: "WABLP's networking events connected us with key partners. Our customer base has tripled in 8 months.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80", rating: 5, growth: "3x customer growth" }
];

export function Testimonial() {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const nextTestimonial = () => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    const prevTestimonial = () => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    return (
        <div className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="bg-gradient-to-r from-[#005A8C] to-[#0066a3] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full">
                <ImageWithFallback
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                    alt="Business networking"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>

        <div className="relative z-10">
            <div className="text-center mb-12">
                <Badge className="bg-[#C9A74B] text-white mb-4 px-4 py-2">
                    <Users className="w-4 h-4 mr-2" />
                    Success Stories
                </Badge>
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                    Hear from Our Community
                </h3>
                <p className="text-xl text-gray-200">
                    Real businesses sharing their growth stories on WABLP
                </p>
            </div>

            {/* Testimonial Card */}
            <div className="max-w-4xl mx-auto">
                <Card className="bg-white bg-opacity-10 backdrop-blur-sm border-0 text-white">
                    <CardContent className="p-8 md:p-12">
                        <div className="flex items-center justify-between mb-8">
                            <Quote className="w-12 h-12 text-[#C9A74B] opacity-50" />
                            <div className="flex items-center space-x-1">
                                {Array.from({ length: testimonials[currentTestimonial].rating }).map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-[#C9A74B] fill-current" />
                                ))}
                            </div>
                        </div>

                        <blockquote className="text-xl md:text-2xl leading-relaxed mb-8 text-center">
                            "{testimonials[currentTestimonial].quote}"
                        </blockquote>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <ImageWithFallback
                                    src={testimonials[currentTestimonial].avatar}
                                    alt={testimonials[currentTestimonial].name}
                                    className="w-16 h-16 rounded-full object-cover border-4 border-[#C9A74B]"
                                />
                                <div>
                                    <div className="font-semibold text-lg">{testimonials[currentTestimonial].name}</div>
                                    <div className="text-[#C9A74B] font-medium">{testimonials[currentTestimonial].company}</div>
                                    <div className="text-gray-300 text-sm flex items-center">
                                        <Globe className="w-3 h-3 mr-1" />
                                        {testimonials[currentTestimonial].location}
                                    </div>
                                </div>
                            </div>

                            <div className="text-right">
                                <Badge className="bg-[#C9A74B] text-white px-3 py-2 mb-2">
                                    <TrendingUp className="w-4 h-4 mr-1" />
                                    {testimonials[currentTestimonial].growth}
                                </Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center space-x-4 mt-8">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={prevTestimonial}
                    className="border-white text-white hover:bg-white hover:text-[#005A8C]"
                >
                    <ArrowLeft className="w-4 h-4" />
                </Button>

                <div className="flex space-x-2">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentTestimonial(index)}
                            className={`w-3 h-3 rounded-full transition-all ${currentTestimonial === index ? 'bg-[#C9A74B]' : 'bg-white bg-opacity-50'
                                }`}
                        />
                    ))}
                </div>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={nextTestimonial}
                    className="border-white text-white hover:bg-white hover:text-[#005A8C]"
                >
                    <ArrowRight className="w-4 h-4" />
                </Button>
            </div>
        </div>
    </div>
    </div>
    </div>
    )
}