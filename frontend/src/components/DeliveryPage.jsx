import React from 'react'
import { Link } from 'react-router-dom'

const DeliveryPage = () => {
  return (
    <>
    <section className='section__container bg-primary-light'>
        <h2 className='section__header capitalize' >Delivery</h2>
        <div className='section__subheader space-x-2'>
          <span className='hover:text-primary'><Link to='/'>Home</Link></span> /delivery
        </div>
        </section>
     <div className="max-w-full mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-12 mx-8">DELIVERY</h1>

      <div className="space-y-6 mx-8">
        <h2 className="text-xl font-semibold">Shipments and returns</h2>

        <h3 className="text-lg font-semibold">Your pack shipment</h3>

        <div className="space-y-6 text-gray-600">
          <p className="leading-relaxed">
            Packages are generally dispatched within 2 days after receipt of payment and are shipped via UPS with
            tracking and drop-off without signature. If you prefer delivery by UPS Extra with required signature, an
            additional cost will be applied, so please contact us before choosing this method. Whichever shipment choice
            you make, we will provide you with a link to track your package online.
          </p>

          <p className="leading-relaxed">
            Shipping fees include handling and packing fees as well as postage costs. Handling fees are fixed, whereas
            transport fees vary according to total weight of the shipment. We advise you to group your items in one
            order. We cannot group two distinct orders placed separately, and shipping fees will apply to each of them.
            Your package will be dispatched at your own risk, but special care is taken to protect fragile objects.
          </p>

          <p className="leading-relaxed">Boxes are amply sized and your items are well-protected.</p>
        </div>
      </div>
    </div>
    </>
  )
}

export default DeliveryPage