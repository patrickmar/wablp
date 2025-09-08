import { Eye, Heart, Lightbulb } from "lucide-react";

const values = [
  {
    icon: Eye,
    title: "Our Vision",
    description: "Our vision is rooted in the audacious ambition of West Africa's tech ecosystem. We aim to serve as a key component of the region's digital public infrastructure , leveraging the high mobile adoption rate and fintech innovation to empower a new generation of entrepreneurs. Our goal is to not only facilitate commerce but also to enable a collaborative community where businesses can thrive and export their innovation to the rest of the continent and beyond."
  },
  {
    icon: Heart,
    title: "Integrity",
    description: "In a region where a significant portion of the population is unbanked, trust is the foundation of every transaction. Our platform is built on secure, encrypted data transmission to ensure the confidentiality of all information. We also aim to foster a transparent environment by providing verifiable business profiles and a clear digital trail for every transaction, building confidence among both local and international partners."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Innovation for us means directly addressing the unique needs of the West African market. Our platform will be designed to support the informal economy, providing digital tools that are essential for businesses to formalize and participate in the broader digital marketplace. "
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