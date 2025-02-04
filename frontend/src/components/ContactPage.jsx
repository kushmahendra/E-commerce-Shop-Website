import React, { useEffect } from "react";
import { useState } from "react";
import { sendContactData } from "../services/emailService";
import { Mail, Phone, MapPin } from "lucide-react"
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ContactPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  //slides images
  const [currentSlide, setCurrentSlide] = useState(0)


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Ensure formData is properly defined
      if (!formData.name || !formData.email || !formData.message) {
        // alert("All fields are required.");
        toast.error("All fields are required.", {
          position: "top-right",
          autoClose: 3000, // 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
        return;
      }
      console.log('fm', formData)
      const response = await sendContactData(formData)

      console.log('rs', response)
      console.log('rsdm', response.message)
      // alert(response.message);
      toast.success(`${response.message}`, {
        position: "top-right",
        autoClose: 3000, // 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      setFormData(
        {
          name: "",
          email: "",
          message: "",
        }
      )

    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send your message. Please try again later.");
    }
  };

  //app
  const socialMedia = [
    {
      name: "Instagram",
      url: "https://instagram.com/yourshop",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      color: "bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500",
    },
    {
      name: "Facebook",
      url: "https://facebook.com/yourshop",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      color: "bg-blue-600",
    },
    {
      name: "Twitter",
      url: "https://twitter.com",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
      color: "bg-blue-400",
    },
    // {
    //   name: "LinkedIn",
    //   url: "https://linkedin.com/yourshop",
    //   icon: (
    //     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    //       <path d="M20.447 20.452h-3.554v-5.569c0-1.327-.025-3.036-1.85-3.036-1.853 0-2.137 1.445-2.137 2.938v5.667H9.354V9.354h3.414v1.515h.047c.476-.9 1.637-1.847 3.37-1.847 3.6 0 4.266 2.369 4.266 5.454v6.976zM5.337 7.433c-1.144 0-2.069-.926-2.069-2.069S4.193 3.295 5.337 3.295s2.068.926 2.068 2.069-1.044 2.069-2.068 2.069zm1.777 13.019H3.56V9.354h3.555v11.098zM22.225 0H1.771C.793 0 0 .77 0 1.723v20.553C0 23.23.793 24 1.771 24h20.451c.979 0 1.778-.77 1.778-1.724V1.723C24 .77 23.203 0 22.225 0z" />
    //     </svg>
    //   ),
    //   color: "bg-blue-700",
    // },
    {
      name: "Telegram",
      url: "https://t.me/yourshop",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm.08 4.536a.667.667 0 00-.291.058L6.917 8.366c-.69.288-.732.353-.835.682-.092.288-.231 1.038-.329 1.567-.18.972-.04 1.053.654 1.36.206.09.646.28 1.02.42.374.14.78.277.898.31.194.054.414-.081.724-.425.454-.51.793-.921 1.117-1.362.258-.356.518-.711.819-1.053.159-.181.42-.389.724-.421.22-.024.498.14.77.308.424.264.854.528 1.299.763.337.178.528.272.759.296.306.031.558-.092.847-.322a.663.663 0 00.192-.384c.031-.26.028-.694.011-1.166-.017-.474.076-1.085-.028-1.542-.132-.559-.55-.66-.88-.751a18.432 18.432 0 00-1.209-.247l-.106-.014c-.158-.02-.287-.036-.451-.057z" />
        </svg>
      ),
      color: "bg-blue-500",
    },
    {
      name: "YouTube",
      url: "https://youtube.com/yourshop",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M19.615 3.184C20.983 3.594 22 5.07 22 7.113v9.775c0 2.042-1.017 3.518-2.385 3.929-1.267.376-7.964.483-9.615.483-1.651 0-8.348-.107-9.615-.483C1.017 20.406 0 18.93 0 16.888V7.113C0 5.071 1.017 3.594 2.385 3.184 3.651 2.807 10.348 2.7 12 2.7c1.651 0 8.348.107 9.615.484zm-7.987 5.385L7.287 12l4.341 3.43v-6.86z" />
        </svg>
      ),
      color: "bg-red-500",
    },
    {
      name: "WhatsApp",
      url: "https://wa.me/yourshop",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M12.07 0C5.405 0 0 5.413 0 12.09c0 2.178.561 4.301 1.626 6.166l-1.49 5.442 5.618-1.484c1.798.982 3.812 1.477 5.902 1.477 6.666 0 12.091-5.412 12.091-12.09C24 5.413 18.666 0 12.07 0zm6.799 16.874c-.604 1.615-3.123 3.075-5.515 3.088-.624.004-1.246-.045-1.852-.144-1.03-.171-2.073-.518-3.005-1.029-.314-.17-.62-.348-.92-.533-.308-.191-.527-.403-.841-.637-1.314-.983-2.152-2.367-2.625-3.873-.005-.017-.01-.035-.015-.052-.234-.734-.325-1.505-.274-2.28.051-.768.292-1.529.704-2.183.093-.152.175-.31.265-.462.12-.207.228-.417.334-.627.129-.255.183-.406.331-.66l.013-.02c.098-.159.217-.3.352-.42.16-.138.347-.25.547-.328.229-.09.464-.122.704-.098.053.005.108.017.16.034.239.07.457.215.619.419.105.137.183.295.232.466l.023.078c.116.356.268.703.451 1.038.295.563.605 1.09.929 1.583.482.732.994 1.413 1.562 2.036.551.608 1.15 1.18 1.79 1.706.555.452 1.118.863 1.694 1.241.27.175.55.34.843.478.25.114.498.184.751.209l.127.016c.367.038.729-.059 1.043-.273.2-.137.376-.31.518-.51.142-.2.246-.423.311-.658.077-.27.076-.555-.003-.826a3.166 3.166 0 00-.314-.697l-.02-.031a13.403 13.403 0 00-.403-.661l-.02-.034-.007-.01c-.267-.442-.557-.861-.863-1.247-.283-.352-.576-.695-.879-1.027-.018-.02-.038-.04-.058-.06-.228-.234-.471-.449-.727-.645-.225-.17-.456-.323-.69-.467-.221-.134-.444-.255-.669-.367a2.647 2.647 0 00-.898-.202z" />
        </svg>
      ),
      color: "bg-green-500",
    },
    // Repeat for other platforms (Facebook, Twitter, etc.)
  ];

  //slides images

  const slides = [
    {
      image: "img013.jpg",
      alt: "Vero Moda Advertisement",
    },
    {
      image: "img417.jpg",
      alt: "Sweatshirts and Jeans Advertisement",
    },
  
    {
      image: "img014.jpg",
      alt: "Fashion Sale Banner 3",
    },
    {
      image: "img516.png",
      alt: "Fashion Collection Banner 4",

    },
    {
      image: "img520.png",
      alt: "Fashion Deals Banner 5",
    },
  ]

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCurrentSlide((prev) => (prev + 1) % slides.length)
  //   }, 9000) // Change slide every 9 seconds

  //   return () => clearInterval(timer)
  // }, [])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  // const handleBack = () => {
  //   navigate('/')
  // }

  return (<>
 
    <div className='mt-20'>
    {/* <section className='section__container bg-primary-light'>
        <h2 className='section__header capitalize' >Contact Us</h2>
        </section> */}
    {/* <section className="bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200 py-8 px-8 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold capitalize tracking-wide mb-6">
          Contact Us
        </h2>
        <div className='section__subheader space-x-4'>
          <span className='text-green-700 hover:text-green-900'><Link to='/'>--- Back to home ---</Link></span>
        </div>
      </div>
    </section> */}
    
    <section className='section__container bg-primary-light'>
        <h2 className='section__header capitalize' >Contact</h2>
        <div className='section__subheader space-x-2'>
          <span className='hover:text-primary'><Link to='/'>Home</Link></span> 
          <i className="ri-arrow-right-s-line"></i> contact
        </div>
        </section>
    <section>
      <div className="relative  my-4  overflow-hidden rounded-2xl">
        {/* Carousel container */}
        <div
          className="relative h-[100px] ml-4  transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)`, width: `${slides.length * 118}%`, display: "flex" }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="relative w-full h-full rounded-2xl shrink-0">
              <img
                src={slide.image || "/placeholder.svg"}
                alt={slide.alt}
                fill
                className="object-cover w-1/6 h-full "
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Navigation dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? "bg-white scale-110" : "bg-white/50 hover:bg-white/75"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Previous/Next buttons */}
        <button
          onClick={() => goToSlide((currentSlide - 1 + slides.length) % slides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full 
  bg-white shadow-lg hover:bg-gray-200 text-black transition-all duration-300 hover:scale-110"
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"></path>
          </svg>
        </button>

        <button
          onClick={() => goToSlide((currentSlide + 1) % slides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full 
  bg-white shadow-lg hover:bg-gray-200 text-black transition-all duration-300 hover:scale-110"
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6"></path>
          </svg>
        </button>

      </div>
    </section>


    {/* <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-6 lg:px-8 py-12 text-white"> */}
    <div className="max-w-full mx-4">

      {/* Contact Info & Social Platforms */}
      <div className="bg- shadow-lg rounded-lg p-6 mb-8 flex flex-col md:flex-row justify-between gap-8">

        {/* Contact Info */}
        <div className="w-full md:w-1/2 space-y-8 pt-4">
          <h3 className="text-3xl  font-extrabold text-gray-800 text-center font-sans tracking-wide">
            Reach out to us anytime — we're here to help you!
          </h3>
          <div className="space-y-8 py-4 text-gray-600">

            <div className="flex items-center space-x-8">
              <Mail className="w-8 h-8 text-orange-500" />
              <div className="flex flex-col">
                <h1 className="text-black font-bold">Email Us</h1>
                <p> <span className="">contact@example.com</span></p>
              </div>
            </div>

            <div className="flex items-center space-x-8">
              <Phone className="w-8 h-8 text-blue-400" />
              <div className="flex flex-col">
              <h1 className="text-black font-bold">Call Us</h1>
              <span className="">+1 (123) 456-7890</span>
              </div>
            </div>

            <div className="flex items-center space-x-8">
              <MapPin className="w-8 h-8 text-green-400" />
              <div className="flex flex-col">
              <h1 className="text-black font-bold">Our Location</h1>
              <span className="">123 Main St, Anytown, USA</span>
            </div>
            </div>
          </div>

          {/* Social Media Platforms */}
          <div className="grid grid-cols-2 sm:grid-cols-3 pt-6 gap-6">
            {socialMedia.map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center px-4 py-3 rounded-lg text-white shadow-md transition-transform transform hover:scale-105 ${platform.color}`}
              >
                {platform.icon}
                <span className="ml-3 font-medium">{platform.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Send Us a Message Form */}
        <div className="w-full md:w-1/2 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-extrabold text-gray-800 mb-12">Send Us a Message</h3>
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Your message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 transition-all"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      {/* </div> */}
    </div>
</div>
  </>
  );
};

export default ContactPage;
