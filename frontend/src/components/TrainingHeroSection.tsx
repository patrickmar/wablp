import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowRight, Users, BookOpen, Award } from "lucide-react";
import Link from "next/link";

export function TrainingHeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-[#005A8C] via-[#0066a3] to-[#005A8C] text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2000&q=80"
          alt="Professional training session"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-opacity-70"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center bg-[#C9A74B] bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
              <span className="text-white font-medium">
                🎓 Professional Training Programs
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight">
              Build Real-World Skills with
              <span className="text-[#C9A74B]"> WABLP</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Practical, industry-focused training designed to equip individuals
              and organizations with skills that drive growth, productivity, and
              long-term success.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Button
                size="lg"
                className="bg-[#C9A74B] text-white hover:bg-[#b8964a] px-8 py-4 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
                asChild
              >
                <Link href="/sign-in">
                  View Training Programs
                  <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <Users className="w-8 h-8 text-[#C9A74B] mx-auto mb-2" />
                <div className="text-2xl font-bold">1,200+</div>
                <div className="text-gray-300 text-sm">Trainees</div>
              </div>

              <div className="text-center">
                <BookOpen className="w-8 h-8 text-[#C9A74B] mx-auto mb-2" />
                <div className="text-2xl font-bold">25+</div>
                <div className="text-gray-300 text-sm">Courses</div>
              </div>

              <div className="text-center">
                <Award className="w-8 h-8 text-[#C9A74B] mx-auto mb-2" />
                <div className="text-2xl font-bold">100%</div>
                <div className="text-gray-300 text-sm">Practical Focus</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          {/* <div className="relative">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
              <ImageWithFallback
                src="/training-hero.jpg"
                alt="Hands-on professional training"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
