import { ImageWithFallback } from "./figma/ImageWithFallback";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function ContactHeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-[#005A8C] via-[#0066a3] to-[#005A8C] text-white overflow-hidden">
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Lagos skyline"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-opacity-70"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl lg:text-7xl mb-6 text-white leading-tight">
            We&apos;d Love to 
            <span className="text-[#C9A74B]"> Hear From You</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto">
            Get in touch with our team to learn more about WABLP or discuss how we can help grow your business
          </p>
        </div>
        
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-opacity-20 transition-all">
            <MapPin className="w-12 h-12 text-[#C9A74B] mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Visit Our Office</h3>
            <p className="text-[#005A8C] text-md">
              United Nations Economic Commission for Africa<br />
              Maison des Nations Unies,<br />
              428 Avenue du Fleuve Niger, Niamey, Niger
            </p>
          </div>
          
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-opacity-20 transition-all">
            <Phone className="w-12 h-12 text-[#C9A74B] mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Call Us</h3>
            <p className="text-[#005A8C] text-md">
              +234 (0) 123 456 7890<br />
              +234 (0) 987 654 3210<br />
              Toll-free: 0800-WABLP-01
            </p>
          </div>
          
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-opacity-20 transition-all">
            <Mail className="w-12 h-12 text-[#C9A74B] mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Email Us</h3>
            <p className="text-[#005A8C] text-md">
              info@wablp.com<br />
              support@wablp.com<br />
              partnerships@wablp.com
            </p>
          </div>
          
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-opacity-20 transition-all">
            <Clock className="w-12 h-12 text-[#C9A74B] mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Office Hours</h3>
            <p className="text-[#005A8C] text-md">
              Monday - Friday<br />
              8:00 AM - 6:00 PM WAT<br />
              Saturday: 9:00 AM - 2:00 PM
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}