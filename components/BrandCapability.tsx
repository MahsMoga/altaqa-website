const platforms = [
  'Honeywell',
  'Siemens',
  'Schneider Electric',
  'Johnson Controls',
  'Tridium Niagara',
  'LOYTEC',
]

export default function BrandCapability() {
  return (
    <section
      id="platforms"
      className="py-24 bg-gray-50"
    >
      <div className="container mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Platform & Brand Capability
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Expertise across leading BMS and automation platforms.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {platforms.map((platform) => (
            <div
              key={platform}
              className="bg-white rounded-2xl shadow-sm p-8 text-center border"
            >
              <h3 className="text-2xl font-semibold">
                {platform}
              </h3>
            </div>
          ))}

        </div>
      </div>
    </section>
  )
}