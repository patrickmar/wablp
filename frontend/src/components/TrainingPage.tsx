export default function TrainingsPage() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-900">
          Our Training Programs
        </h1>

        <p className="mt-4 text-lg text-gray-600 max-w-3xl">
          Explore our professionally designed training programs tailored to
          equip you with practical skills for career growth, business success,
          and digital transformation.
        </p>

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
              <h3 className="text-xl font-semibold text-gray-800">
                {item}
              </h3>
              <p className="mt-3 text-gray-600">
                Hands-on, industry-relevant training designed for real-world
                application and measurable results.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
