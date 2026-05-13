const steps = [
  {
    title: 'Consultation',
    description:
      'Understanding project requirements and operational goals.',
  },
  {
    title: 'Design & Engineering',
    description:
      'Developing intelligent automation and control solutions.',
  },
  {
    title: 'Implementation',
    description:
      'Deployment, testing, and system integration.',
  },
  {
    title: 'Support & Optimization',
    description:
      'Continuous technical support and performance optimization.',
  },
]

export default function ProcessFlow() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Our Process
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto">
            A streamlined engineering approach from concept
            to successful project delivery.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative border rounded-2xl p-8 shadow-sm"
            >
              <div className="text-5xl font-bold text-gray-200 mb-4">
                {index + 1}
              </div>

              <h3 className="text-2xl font-semibold mb-4">
                {step.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  )
}