const services = [
  {
    title: 'Building Management Systems',
    description:
      'Integrated BMS solutions for intelligent building control and monitoring.',
  },
  {
    title: 'HVAC Automation',
    description:
      'Efficient HVAC monitoring and automation systems.',
  },
  {
    title: 'Energy Monitoring',
    description:
      'Real-time utility and energy monitoring solutions.',
  },
  {
    title: 'IoT Integration',
    description:
      'Smart IoT integrations for modern infrastructure.',
  },
  {
    title: 'Industrial Automation',
    description:
      'Automation systems for industrial environments.',
  },
  {
    title: 'Technical Support',
    description:
      '24/7 support and maintenance services.',
  },
]

export default function Services() {
  return (
    <section
      id="services"
      className="py-24 bg-white"
    >
      <div className="container mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Our Services
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Delivering intelligent automation and engineering solutions
            across commercial and industrial sectors.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {services.map((service) => (
            <div
              key={service.title}
              className="border rounded-2xl p-8 shadow-sm hover:shadow-lg transition"
            >
              <h3 className="text-2xl font-semibold mb-4">
                {service.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  )
}