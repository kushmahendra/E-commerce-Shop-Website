import React from 'react'
import { Link } from 'react-router-dom'

const AboutUs = () => {

  const teamMembers = [
    {
      name: "Kate",
      role: "CEO & Founder",
      image:
        "img77.jpeg",
      bio: "Sed ut perspiciatis unde omnis iste natuser rorsit accusantium doloremque laudan.",
    },
    {
      name: "James",
      role: "CEO & Founder",
      image:
        "img78.jpeg",
      bio: "Sed ut perspiciatis unde omnis iste natuser rorsit accusantium doloremque laudan.",
    },
    {
      name: "lovee",
      role: "CEO & Founder",
      image:
        "img79.webp",
      bio: "Sed ut perspiciatis unde omnis iste natuser rorsit accusantium doloremque laudan.",
    },
  ]
        return (
            <>
       <section className='section__container bg-primary-light'>
        <h2 className='section__header capitalize' >About Us</h2>
        <div className='section__subheader space-x-2'>
          <span className='hover:text-primary'><Link to='/'>--- Back to home ---</Link></span>
        </div>
        </section>
          <main className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
            {/* History Section */}
            <section className="py-16  ">
              <div className="space-y-8  flex  flex-col items-center">
                <h3 className="text-lg font-medium text-gray-600 uppercase tracking-wider">----------- OUR HISTORY -----------</h3>
                <div className="space-y-4">
                  <h1 className="text-5xl font-bold">Hello, We are Outstock.</h1>
                  <h2 className="text-5xl font-bold">With 25+ Years of Experience</h2>
                </div>
                <p className="text-gray-600 text-center max-w-3xl">
                  It is accompanied by a case that can contain up to three different diffusers and can be used for dry storage
                  of loose tea. The perfect way to enjoy brewing tea on low hanging fruit to identify. Lighting is a minimal
                  residence located in Tokyo, Japan, designed by Outstock. Large tiles were arranged on the counter top plate
                  near the window.
                </p>
                <p className="text-gray-600 text-center max-w-3xl">
                  The perfect way to enjoy brewing tea on low hanging fruit to identify. Duis autem vel eum iriure dolor in
                  hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis. For me,
                  the most important part of improving at photography has been sharing it. Sign up for an Exposure account, or
                  post regularly to Tumblr, or both. Tell people you're trying to get better at photography. Talk about it.
                  When you talk about it, other people get excited about it. There are few plugins and apps available for this
                  purpose, many of them required a monthlysubscription or needed to expose the full store data to a third
                  party.
                </p>
              </div>
            </section>
      
            {/* Different by Design Section */}
            <section className="py-16">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <img
                  src="https://media.istockphoto.com/id/1282113401/photo/young-stylish-woman-with-shopping-bag-walking-city-streets-on-a-warm-autumn-day-visiting.jpg?s=612x612&w=0&k=20&c=-6U95iGmz-q0Q_0OmxJOW7xkhKh1WMfGWA0xoO9NPDk="
                  alt="People walking on beach"
                  className="w-full h-[500px] object-cover rounded-lg"
                />
                <div className="space-y-6">
                  <h2 className="text-4xl font-bold">We're different by design</h2>
                  <p className="text-gray-600">
                    Our story started with a problem (the best ideas usually do). Some ten years ago, our founder was
                    furnishing his flat. Frustrated at the lack of well-designed, good quality and affordable sofas, he set
                    about redefining the process. The concept was clear: collaborate with independent designers and makers to
                    create pieces you'll love, minus the mark-up. And so MADE.COM was born. The destination for creating your
                    dream home.
                  </p>
                  <button className="border-2 border-black px-8 py-3 hover:bg-black hover:text-white transition-colors">
                    View More
                  </button>
                </div>
              </div>
            </section>
      
            {/* Support Independent Designers Section */}
            <section className="py-16">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h2 className="text-4xl font-bold">
                    We support
                    <br />
                    independent designers
                  </h2>
                  <p className="text-gray-600">
                    Nothing excites us more than great design. That's why we champion emerging and established creative talent
                    from all over the world. The result? Innovative products and exclusive ranges. Pieces that consider every
                    space and individual. And for our designers, it means being part of a true partnership that has their
                    interests at heart.
                  </p>
                  <button className="border-2 border-black px-8 py-3 hover:bg-black hover:text-white transition-colors">
                    View More
                  </button>
                </div>
                <img
                  src="https://media.istockphoto.com/id/1143873596/photo/blonde-young-woman-in-coral-spring-summer-dress.jpg?s=612x612&w=0&k=20&c=t1Uip5XCron2s5UFQ4oyIXbh2Nfp1pEW2mQD0De6j34="
                  alt="Sunglasses on display"
               
                />
              </div>
            </section>
          </main>
          {/* <div className="my-8 rounded-lg ">
          <img src="img508.jpg" 
            alt="brides"
            className="mb-12 h-1/2" />
          </div> */}
          <section className="py-16 px-4 border-2 rounded-lg mx-4 border-gray-200">
      <div className="max-w-full mx-auto text-center">
        <h2 className="text-5xl font-bold mb-6">Our Teams</h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-16">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-48 h-48 rounded-full overflow-hidden mb-6">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-xl font-bold mb-1">{member.name}</h3>
              <p className="text-gray-600 mb-4">{member.role}</p>

              <div className="flex gap-4 mb-6">
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <span className="sr-only">Facebook</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <span className="sr-only">YouTube</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                  </svg>
                </a>
              </div>

              <p className="text-gray-600 text-center">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
          </>
        )
      
      
      
}

export default AboutUs