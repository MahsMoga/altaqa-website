export default function About() {
  return (
    <section
      id="about"
      className="py-24 bg-gray-50"
    >
      <div className="container mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div>
            <span className="text-sm uppercase tracking-widest text-blue-600 font-semibold">
              About Us
            </span>

            <h2 className="text-4xl font-bold mt-4 mb-6">
              Intelligent Engineering Solutions
            </h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              Al Taqa Technical General Contracting LLC provides
              smart building automation, BMS integration,
              HVAC controls, energy monitoring, and industrial
              automation solutions across the UAE.
            </p>

            <p className="text-gray-600 leading-relaxed">
              We focus on innovation, efficiency, and reliability
              to deliver modern intelligent infrastructure systems.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-10">
            <div className="grid grid-cols-2 gap-8">

              <div>
                <div className="text-4xl font-bold text-black mb-2">
                  20+
                </div>

                <div className="text-gray-600">
                  Years Experience
                </div>
              </div>

              <div>
                <div className="text-4xl font-bold text-black mb-2">
                  100+
                </div>

                <div className="text-gray-600">
                  Projects Delivered
                </div>
              </div>

              <div>
                <div className="text-4xl font-bold text-black mb-2">
                  24/7
                </div>

                <div className="text-gray-600">
                  Technical Support
                </div>
              </div>

              <div>
                <div className="text-4xl font-bold text-black mb-2">
                  UAE
                </div>

                <div className="text-gray-600">
                  Based Operations
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}