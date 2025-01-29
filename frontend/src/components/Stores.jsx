import React from 'react'
import { Link } from 'react-router-dom';

const Stores = () => {

    const stores = [
        {
          name: "Coconut Grove",
          image: "https://plus.unsplash.com/premium_photo-1661319067088-61e0b9e079b0?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2xvdGhpbmclMjBzdG9yZXxlbnwwfHwwfHx8MA%3D%3D",
          address: {
            street: "2999 SW 32nd Avenue",
            city: "Miami",
            state: "Florida",
            zip: "33133",
            country: "United States"
          },
          hours: {
            "Mon.": "09:00AM - 07:00PM",
            "Tue.": "09:00AM - 07:00PM",
            "Wed.": "09:00AM - 07:00PM",
            "Thu.": "09:00AM - 07:00PM",
            "Fri.": "09:00AM - 07:00PM",
            "Sat.": "10:00AM - 04:00PM",
            "Sun.": "10:00AM - 04:00PM"
          }
        },
        {
          name: "Dade County",
          image: "https://images.unsplash.com/photo-1521335629791-ce4aec67dd15?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNsb3RoaW5nJTIwc3RvcmV8ZW58MHx8MHx8fDA%3D",
          address: {
            street: "3030 SW 8th St Miami",
            city: "Miami",
            state: "Florida",
            zip: "33135",
            country: "United States"
          },
          hours: {
            "Mon.": "09:00AM - 07:00PM",
            "Tue.": "09:00AM - 07:00PM",
            "Wed.": "09:00AM - 07:00PM",
            "Thu.": "09:00AM - 07:00PM",
            "Fri.": "09:00AM - 07:00PM",
            "Sat.": "10:00AM - 04:00PM",
            "Sun.": "10:00AM - 04:00PM"
          }
        }
      ];

  return (
<>
<section className='section__container bg-primary-light'>
        <h2 className='section__header capitalize' >Our Stores</h2>
        <div className='section__subheader space-x-2'>
          <span className='hover:text-primary'><Link to='/'>Home</Link></span> /stores
        </div>
        </section>
<div className="max-w-full  mx-8 px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">OUR STORES</h1>
      <div className="space-y-8">
        {stores.map((store, index) => (
          <div key={index} className="border rounded-lg p-6 bg-white">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Store Image */}
              <div className="w-full md:w-1/3">
                <img
                  src={store.image || "/placeholder.svg"}
                  alt={`${store.name} store`}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>

              {/* Store Details */}
              <div className="flex-1 flex flex-col md:flex-row justify-between">
                {/* Address Section */}
                <div className="mb-4 md:mb-0">
                  <h2 className="text-2xl font-semibold mb-2">{store.name}</h2>
                  <address className="not-italic text-gray-600">
                    <p>{store.address.street}</p>
                    <p>{store.address.city}, {store.address.state} {store.address.zip}</p>
                    <p>{store.address.country}</p>
                  </address>
                </div>

                {/* Hours Section */}
                <div className="text-right space-y-1">
                  {Object.entries(store.hours).map(([day, hours]) => (
                    <div key={day} className="flex justify-end gap-4">
                      <span className="font-medium">{day}</span>
                      <span className="text-gray-600">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
</>
  )
}

export default Stores