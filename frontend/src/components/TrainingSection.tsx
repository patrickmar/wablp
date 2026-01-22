"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function TrainingSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl text-[#005A8C]"
        >
          Professional Training Programs
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-6 mb-16 text-lg text-gray-600"
        >
          At <span className="font-semibold">WABLP Business Center</span>, we
          provide practical, industry-focused training designed to build
          real-world skills for individuals, professionals, and organizations.
        </motion.p>

      <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl text-[#005A8C]"
        >
            Our Training Programs
        </motion.h2>

        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-4 text-lg text-gray-600 max-w-3xl"
        >
            Explore our professionally designed training programs tailored to
          equip you with practical skills for career growth, business success,
          and digital transformation.
        </motion.p>

        {/* Training Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {[
            "Business & Office Productivity",
            "ICT & Digital Skills",
            "Software & Web Development",
            "IT Support & Networking",
            "Entrepreneurship & Career Growth",
            "Corporate Staff Training",
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl border bg-white shadow-sm hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-[#005A8C]">
                {item}
              </h3>
              <p className="mt-3 text-gray-600">
                Hands-on, industry-relevant training designed for real-world
                application and measurable results.
              </p>
            </div>
          ))}
        </div>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-10"
        >
          <Link
            href="/sign-in"
            className="inline-block px-8 py-4 rounded-xl bg-[#C9A74B] text-white font-medium
            hover:bg-[#C9A74B] transition-all duration-300 shadow-lg"
          >
            View Training Programs
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

