import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    if (
      !formData.name ||
      !formData.email ||
      !formData.message
    ) {
      alert('Please fill all fields')
      return
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(formData.email)) {
      alert('Please enter valid email')
      return
    }

    setLoading(true)

    setTimeout(() => {
      alert('Message submitted successfully')

      setFormData({
        name: '',
        email: '',
        message: '',
      })

      setLoading(false)
    }, 1000)
  }

  return (
    <section
      id="contact"
      className="py-24 bg-gray-50"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">

          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Contact Us
            </h2>

            <p className="text-gray-600">
              Reach out to discuss your project requirements.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-2xl p-8 space-y-6"
          >

            <div>
              <label className="block mb-2 font-medium">
                Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3"
                placeholder="Your email"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Message
              </label>

              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3"
                placeholder="Your message"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90 transition"
            >
              {loading
                ? 'Submitting...'
                : 'Send Message'}
            </button>

          </form>

          <div className="mt-10 text-center">
            <a
              href="mailto:info@altaqauae.com"
              className="text-blue-600 hover:underline"
            >
              info@altaqauae.com
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}