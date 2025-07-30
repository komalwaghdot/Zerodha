import React from 'react';


function LeftSection({imageURL, productName, productDescription, tryDemo, learnMore, googlePlay, appStore
}) {
    return ( 
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-5 p-5'>
                   <img src={imageURL} />
                </div>
                <div className="col-1"></div>
                <div className='col-6 p-5 mt-5'>
                    <h1>{productName}</h1>
                    <p>{productDescription}</p>
                    <div>
                        <a href={tryDemo}>Try Demo</a>
                        <a href={learnMore} style={{marginLeft:"50%"}}>learn More</a>

                    </div>
                    <div className="mt-3">
                        <a href={googlePlay}><img src="media/images/googlePlayBadge.svg" /></a>
                        <a href={appStore} style={{marginLeft:"50%"}}><img src="media/images/appStoreBadge.svg" /></a>


                    </div>
                    
                </div>

            </div>
        </div>
        
     );
}

export default LeftSection;