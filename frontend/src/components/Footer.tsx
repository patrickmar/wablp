import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "#" },
    // { label: "Careers", href: "#" },
    // { label: "Press", href: "#" },
    { label: "Contact", href: "/contact" }
  ],
  services: [
    { label: "Join as Business", href: "/join" },
    { label: "Opportunities ", href: "/opportunity" },
    // { label: "Directory", href: "#" },
    // { label: "Resources", href: "#" },
    // { label: "Pricing", href: "#" }
  ],
  // resources: [
  //   { label: "Help Center", href: "#" },
  //   { label: "API Documentation", href: "#" },
  //   { label: "Success Stories", href: "#" },
  //   { label: "White Papers", href: "#" },
  //   { label: "Webinars", href: "#" }
  // ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    // { label: "Cookie Policy", href: "#" },
    // { label: "GDPR Compliance", href: "#" },
    { label: "Security", href: "#" }
  ]
};

export function Footer() {
  return (
    <footer className="bg-[#005A8C] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex items-center space-x-3">

                    <div className="w-40 h-12 rounded-lg flex items-center justify-center overflow-hidden">
                      <img
                        src="/logo.png"   // <- replace with your logo path
                        alt="WABLP Logo"
                        className="w-60 h-10 object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Connecting West African businesses to opportunities, fostering growth through strategic partnerships and supplier diversity.
              </p>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-10 h-7 text-[#C9A74B]" />
                  <span className="text-gray-300">
                    <p>United Nations Economic Commission for Africa</p>
                    <p>Maison des Nations Unies, 428 Avenue du Fleuve Niger, Niamey, Niger</p>
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-[#C9A74B]" />
                  <span className="text-gray-300">+227 20 72 73 00</span>
                </div>
                {/* <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-[#C9A74B]" />
                  <span className="text-gray-300">info@wablp.com</span>
                </div> */}
              </div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-lg font-semibold mb-4">Company</h4>
                  <ul className="space-y-3">
                    {footerLinks.company.map((link, index) => (
                      <li key={index}>
                        <a href={link.href} className="text-gray-300 hover:text-[#C9A74B] transition-colors">
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4">Services</h4>
                  <ul className="space-y-3">
                    {footerLinks.services.map((link, index) => (
                      <li key={index}>
                        <a href={link.href} className="text-gray-300 hover:text-[#C9A74B] transition-colors">
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* <div>
                  <h4 className="text-lg font-semibold mb-4">Resources</h4>
                  <ul className="space-y-3">
                    {footerLinks.resources.map((link, index) => (
                      <li key={index}>
                        <a href={link.href} className="text-gray-300 hover:text-[#C9A74B] transition-colors">
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div> */}

                <div>
                  <h4 className="text-lg font-semibold mb-4">Legal</h4>
                  <ul className="space-y-3">
                    {footerLinks.legal.map((link, index) => (
                      <li key={index}>
                        <a href={link.href} className="text-gray-300 hover:text-[#C9A74B] transition-colors">
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="lg:col-span-1">
              <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
              <p className="text-gray-300 mb-6">
                Get the latest opportunities and business insights delivered to your inbox.
              </p>

              <div className="space-y-4">
                <Input
                  placeholder="Enter your email"
                  className="bg-white bg-opacity-10 border-gray-400 text-white placeholder-gray-400 focus:border-[#C9A74B]"
                />
                <Button
                  className="w-full bg-[#C9A74B] text-white hover:bg-[#b8964a] transition-colors"
                >
                  Subscribe
                </Button>
              </div>

              <div className="flex space-x-4 mt-8">
                <a href="#" className="text-gray-300 hover:text-[#C9A74B] transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="https://x.com/home
" className="text-gray-300 hover:text-[#C9A74B] transition-colors">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-300 hover:text-[#C9A74B] transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="https://www.instagram.com/wablp_uneca/
" className="text-gray-300 hover:text-[#C9A74B] transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-600 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © 2024 West Africa Business Linkages Platform. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span className="text-gray-300 text-sm">🌍 Serving 15+ Countries</span>
              <span className="text-gray-300 text-sm">🔒 Enterprise Security</span>
              <span className="text-gray-300 text-sm">⚡ 99.9% Uptime</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}