const reasons = [
  {
    title: 'Experienced Team',
    description:
      'Highly skilled engineers with extensive industry experience.',
  },
  {
    title: 'Smart Automation',
    description:
      'Advanced intelligent automation and control systems.',
  },
  {
    title: 'Reliable Support',
    description:
      'Dedicated technical support and maintenance services.',
  },
  {
    title: 'Energy Efficiency',
    description:
      'Solutions focused on sustainability and energy optimization.',
  },
]

export default function WhyChooseUs() {
  return (
    <section
      id="why-us"
      className="py-24 bg-black text-white"
    >
      <div className="container mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Why Choose Us
          </h2>

          <p className="text-white/70 max-w-2xl mx-auto">
            Delivering engineering excellence through innovation,
            reliability, and intelligent solutions.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="bg-white/5 border border-white/10 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-semibold mb-4">
                {reason.title}
              </h3>

              <p className="text-white/70 leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  )
}