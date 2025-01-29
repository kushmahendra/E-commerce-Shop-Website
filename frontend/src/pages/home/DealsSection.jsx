import React, { useEffect, useState } from 'react'

// import dealsImg from '../../assets/deals.png'

const DealsSection = () => {
  const [time, setTime] = useState({
    days: 14,
    hours: 20,
    minutes:15,
    seconds:5,
  })

  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        const newSeconds = prevTime.seconds - 1
        if (newSeconds >= 0) return { ...prevTime, seconds: newSeconds }

        const newMinutes = prevTime.minutes - 1
        if (newMinutes >= 0) return { ...prevTime, minutes: newMinutes, seconds: 59 }

        const newHours = prevTime.hours - 1
        if (newHours >= 0) return { ...prevTime, hours: newHours, minutes: 59, seconds: 59 }

        const newDays = prevTime.days - 1
        if (newDays >= 0) return { days: newDays, hours: 23, minutes: 59, seconds: 59 }

        clearInterval(timer)
        return prevTime
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])


  return (
<section className='section__container deals__container'>
    <div className='deals__image'>
        {/* <img src={dealsImg} alt="" /> */}
        <img src="img388.png" alt="" />
    </div>
    <div className='deals__content'>
        <h5>Get Up To 20% Discount</h5>
        <h4>Deals Of This Month</h4>
        <p>This month, redefine your wardrobe with the latest trends in women’s fashion! Whether you're looking for chic casual wear,
             elegant evening dresses, or trendy accessories, our curated collection has something for every occasion.</p>
             <div className='deals__countdown flex-wrap'>
                <div className='deals__countdown__card'>
                 <h4>{time.days}</h4>
                 <p>Days</p>
                </div>
                <div className='deals__countdown__card'>
                 <h4>{time.hours}</h4>
                 <p>Hours</p>
                </div>
                <div className='deals__countdown__card'>
                 <h4>{time.minutes}</h4>
                 <p>Minutes</p>
                </div>
                <div className='deals__countdown__card'>
                 <h4>{time.seconds}</h4>
                 <p>Seconds</p>
                </div>

             </div>
    </div>
</section>
  )
}

export default DealsSection