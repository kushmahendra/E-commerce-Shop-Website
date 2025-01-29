import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Faqs = () => {
    const [openIndex, setOpenIndex] = useState(0)

    const faqs = [
      {
        question: "I have just placed an order. Can I cancel or change it?",
        answer:
          "Lorem ipsum dolor sit amet consectetur adipiscing diam tortor sit feugiat dictum eu diam euismod ultrices convallis eget vel velit posuere mi consequat leo egestas sed odio molestie non imperdiet malesuada.",
      },
      {
        question: "Is the colour I see on the website the actual colour of the item?",
        answer:
          "Lorem ipsum dolor sit amet consectetur adipiscing diam tortor sit feugiat dictum eu diam euismod ultrices convallis eget vel velit posuere mi consequat leo egestas sed odio molestie non imperdiet malesuada.",
      },
      {
        question: "What if I think I have a defective product?",
        answer:
          "Lorem ipsum dolor sit amet consectetur adipiscing diam tortor sit feugiat dictum eu diam euismod ultrices convallis eget vel velit posuere mi consequat leo egestas sed odio molestie non imperdiet malesuada.",
      },
      {
        question: "Can I return my purchase in a retail store?",
        answer:
          "Lorem ipsum dolor sit amet consectetur adipiscing diam tortor sit feugiat dictum eu diam euismod ultrices convallis eget vel velit posuere mi consequat leo egestas sed odio molestie non imperdiet malesuada.",
      },
      {
        question: "How can I return faulty products?",
        answer:
          "Lorem ipsum dolor sit amet consectetur adipiscing diam tortor sit feugiat dictum eu diam euismod ultrices convallis eget vel velit posuere mi consequat leo egestas sed odio molestie non imperdiet malesuada.",
      },
      {
        question: "What will happen if I return an item purchased with my gift card?",
        answer:
          "Lorem ipsum dolor sit amet consectetur adipiscing diam tortor sit feugiat dictum eu diam euismod ultrices convallis eget vel velit posuere mi consequat leo egestas sed odio molestie non imperdiet malesuada.",
      },
    ]
  return (
<>
<div className='mt-20'>
<section className='section__container bg-primary-light'>
        <h2 className='section__header capitalize' >FAQs</h2>
        <div className='section__subheader space-x-2'>
          <span className='hover:text-primary'><Link to='/'>Home</Link></span> /FAQs
        </div>
        </section>
<div className="max-w-full  mx-8 px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">Do you have some questions?</h1>
      <p className="text-gray-600 mb-8">
        Lorem ipsum dolor sit amet consectetur adipiscing diam tortor sit feugiat dictum eu diam euismod ultrices
        convallis eget vel velit posuere mi consequat leo egestas sed odio molestie non imperdiet malesuada.
      </p>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200">
            <button
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              className="w-full text-left py-4 px-6 focus:outline-none bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-lg">{faq.question}</span>
                <span className="ml-6 flex-shrink-0">
                  {openIndex === index ? <span className="text-2xl">−</span> : <span className="text-2xl">+</span>}
                </span>
              </div>
            </button>
            {openIndex === index && (
              <div className="p-6 bg-gray-50">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    </div>
</>
  )
}

export default Faqs