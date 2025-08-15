import { Eye, Heart, Lightbulb } from "lucide-react";

const values = [
  {
    icon: Eye,
    title: "Our Vision",
    description: "To be the leading platform connecting West African businesses globally, creating sustainable economic opportunities and fostering regional prosperity through innovation and collaboration."
  },
  {
    icon: Heart,
    title: "Integrity",
    description: "We operate with transparency, honesty, and ethical practices in all our interactions, building trust within our community of business partners."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We continuously evolve our platform and services to meet the changing needs of West African businesses in an increasingly connected world."
  }
];

export function VisionValuesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-[#003366] mb-4">
            Vision & Values
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The principles that guide our mission and drive our commitment to excellence
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#003366] text-white rounded-full mb-6">
                <value.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl text-[#003366] mb-4">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}