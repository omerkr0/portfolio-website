import { useState } from 'react'
import axios from 'axios'

function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sumbitMessage, setSumbitMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const serviceId = 'service_e3blt8j'
    const templateId = 'template_km29r6d'
    const publicKey = 'Cg0QZUas9NenW0HJ-'

    const data = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        from_name: name,
        from_email: email,
        to_name: 'Ömer Karaman',
        message: message,
      },
    }

    try {
      const res = await axios.post(
        'https://api.emailjs.com/api/v1.0/email/send',
        data,
      )
      console.log(res.data)
      setName('')
      setEmail('')
      setMessage('')
      setSumbitMessage('Mesajınız gönderildi 🚀')
      setTimeout(() => setSumbitMessage(''), 2000)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <section id="contact" className="bg-white">
      <div className="py-8 lg:py-8 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">
          Contact Us
        </h2>
        <p className="mb-8 lg:mb-8 font-normal text-center text-gray-500 sm:text-xl">
          Contact me for cooperation and communication
        </p>
        {setSumbitMessage && (
          <p
            className="mb-2 font-semibold text-center text-green-500"
            onSubmit={handleSubmit}
          >
            {sumbitMessage}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Full name
            </label>
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg shadow-sm shadow-gray-400"
            />
          </div>
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow-sm shadow-gray-400 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 "
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Message
            </label>
            <textarea
              rows="6"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg shadow-sm shadow-gray-400"
              placeholder="Leave a comment..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="flex justify-center items-center">
            <button
              type="sumbit"
              className="py-3 px-5 text-sm font-medium bg-white hover:bg-gray-300 border-2 border-gray-900 hover:border-gray-600 border-solid rounded-md shadow-gray-700 shadow-sm hover:shadow-lg hover:shadow-gray-700 text-center"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Contact
