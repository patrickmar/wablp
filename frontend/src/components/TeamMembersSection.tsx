import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Linkedin, Twitter, Mail } from "lucide-react";

const teamMembers = [
  {
    name: "Dr. Amina Kone",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "Former World Bank economist with 15+ years of experience in West African business development and regional economic policy.",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "#"
    }
  },
  {
    name: "Kwame Asante",
    role: "Chief Technology Officer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "Tech entrepreneur and software architect with expertise in building scalable platforms for emerging markets.",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "#"
    }
  },
  {
    name: "Fatou Diallo",
    role: "Head of Business Development",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "Strategic partnerships expert with a track record of connecting businesses across francophone and anglophone West Africa.",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "#"
    }
  },
  {
    name: "Tunde Adebayo",
    role: "Director of Operations",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "Operations specialist with extensive experience in supply chain management and business process optimization.",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "#"
    }
  },
  {
    name: "Grace Mensah",
    role: "Community Manager",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "Community building expert focused on member engagement, success stories, and platform adoption across the region.",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "#"
    }
  },
  {
    name: "Omar Ba",
    role: "Head of Security",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "Cybersecurity specialist ensuring the highest standards of data protection and platform security for our members.",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "#"
    }
  }
];

export function TeamMembersSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-[#003366] mb-4">
            {/* Regional Sector Champions Spotlight */}
            Country Spotlight and Sector Champions Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Passionate professionals dedicated to connecting and empowering West African businesses
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="h-64 overflow-hidden">
                <ImageWithFallback
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl text-[#003366] mb-2">{member.name}</h3>
                <p className="text-[#FFD700] mb-4">{member.role}</p>
                <p className="text-gray-600 mb-6 leading-relaxed">{member.bio}</p>
                <div className="flex space-x-4">
                  <a 
                    href={member.social.linkedin}
                    className="text-gray-400 hover:text-[#003366] transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a 
                    href={member.social.twitter}
                    className="text-gray-400 hover:text-[#003366] transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a 
                    href={member.social.email}
                    className="text-gray-400 hover:text-[#003366] transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}