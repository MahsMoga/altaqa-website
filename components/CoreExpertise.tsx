const expertise = [
  {
    title: 'Building Management Systems',
    description:
      'Advanced BMS integration and centralized monitoring solutions.',
  },
  {
    title: 'HVAC Controls',
    description:
      'Efficient HVAC automation and optimization systems.',
  },
  {
    title: 'Energy Analytics',
    description:
      'Smart monitoring and energy usage analytics.',
  },
  {
    title: 'Industrial Automation',
    description:
      'Automation systems for industrial applications.',
  },
]

export default function CoreExpertise() {
  return (
    <section
      id="expertise"
      className="py-24 bg-white"
    >
      <div className="container mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Core Expertise
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Specialized engineering and automation expertise
            tailored for intelligent infrastructure projects.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-8">

          {expertise.map((item) => (
            <div
              key={item.title}
              className="border rounded-2xl p-8 shadow-sm hover:shadow-lg transition"
            >
              <h3 className="text-2xl font-semibold mb-4">
                {item.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  )
}