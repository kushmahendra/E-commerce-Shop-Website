import React from 'react'
import { Link } from 'react-router-dom'

const TermsAndConditions = () => {
  return (<>
     <section className='section__container bg-primary-light'>
        <h2 className='section__header capitalize' >Terms-And-Conditions</h2>
        <div className='section__subheader space-x-2'>
          <span className='hover:text-primary'><Link to='/'>Home</Link></span>
          /Terms and conditions of use
        </div>
        </section>
    <div className="max-w-full mx-4 py-12 px-4 sm:px-6 lg:px-8">
    <h1 className="text-3xl font-bold text-black mb-12">TERMS AND CONDITIONS OF USE</h1>

    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-semibold text-black mb-4">Rule 1</h2>
        <p className="text-gray-600 leading-relaxed">
          Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
          ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
          anim id est laborum.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-black mb-4">Rule 2</h2>
        <p className="text-gray-600 leading-relaxed">
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
          in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet conse
          ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniamio
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-black mb-4">Rule 3</h2>
        <p className="text-gray-600 leading-relaxed">
          Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet conse ctetur adipisicing
          elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniamio
        </p>
      </section>
    </div>
  </div>
  </>
  )
}

export default TermsAndConditions