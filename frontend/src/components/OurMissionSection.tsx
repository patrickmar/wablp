import { Target } from "lucide-react";

export function OurMissionSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#FFD700] text-[#003366] rounded-full mb-8">
            <Target className="w-10 h-10" />
          </div>
          <h2 className="text-4xl md:text-5xl text-[#003366] mb-8">
            Our Mission
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            To create a comprehensive platform that connects West African businesses, fostering economic growth through
             strategic partnerships, supplier diversity, and market access opportunities. We believe in the power of connection
              to transform businesses and communities across the region.
          </p>
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            By providing a secure, reliable platform for business networking and collaboration, we're building bridges that
             enable West African enterprises to thrive in the global marketplace while strengthening regional economic ties.
          </p>
          <p className="text-xl text-gray-700 leading-relaxed">
            Our mission is to provide an integrated solution to these challenges, addressing the core needs of SMMEs, which
             form the backbone of the region's economy. 
          </p>
        </div>
      </div>
    </section>
  );
}