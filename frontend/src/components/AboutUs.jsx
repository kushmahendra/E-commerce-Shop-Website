import React from 'react'
import { Link } from 'react-router-dom'

const AboutUs = () => {
        return (
            <>
              <section className='section__container bg-primary-light'>
        <h2 className='section__header capitalize' >About Us</h2>
        <div className='section__subheader space-x-2'>
          <span className='hover:text-primary'><Link to='/'>home</Link></span>
    
        </div>
      </section>
          <main className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
            {/* History Section */}
            <section className="py-16 items-center">
              <div className="space-y-8">
                <h3 className="text-lg font-medium text-gray-600 uppercase tracking-wider">OUR HISTORY</h3>
                <div className="space-y-4">
                  <h1 className="text-5xl font-bold">Hello, We are Outstock.</h1>
                  <h2 className="text-5xl font-bold">With 25+ Years of Experience</h2>
                </div>
                <p className="text-gray-600 max-w-3xl">
                  It is accompanied by a case that can contain up to three different diffusers and can be used for dry storage
                  of loose tea. The perfect way to enjoy brewing tea on low hanging fruit to identify. Lighting is a minimal
                  residence located in Tokyo, Japan, designed by Outstock. Large tiles were arranged on the counter top plate
                  near the window.
                </p>
                <p className="text-gray-600 max-w-3xl">
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
            <img src="https://media.istockphoto.com/id/1409960242/photo/billboard-mock-up-ready-for-your-design-advertisement-preview-vertical-sign.jpg?s=612x612&w=0&k=20&c=EbDSHpxNZMnoZUByfvM_c408TtKGuwQJKTHq6uGjQmM=" 
            alt="brides"
            className="mb-12 h-1/2" />
          </main>
          </>
        )
      
      
      
}

export default AboutUs