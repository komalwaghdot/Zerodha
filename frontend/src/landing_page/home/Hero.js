import React from 'react';


function Hero() {
    return (
        <div className="container p-5">
          <div className='row text-center ' >
            <img src='media/images/homeHero.png' alt='hero image' className='mb-5'/>
            <h1 className='mt-5'>Invest in everything</h1>
            <p>online platform to invest in stocks,derivatives,mutal funds</p>
            <button className='p-3 btn btn-primary fs-5' style={{width:"25%" , margin:"0 auto", }}>Signup Now</button>
          </div>

        </div>
      );
}

export default Hero;