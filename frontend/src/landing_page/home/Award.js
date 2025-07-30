import React from 'react';
function Award() {
    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-6 p-5'>
                    <img src='/media/images/largestBroker.svg'/>
                </div>
                <div className='col-6 p-5 mt-5'>
                    <h1>Largest stock broker in india</h1>
                    <p className='mb-5'>million zerodha clients contribute to volumes in india daily by trading and investing in;</p>
                    <div className='row'>
                        <div className='col-6'>
                            <ul>
                                <li>Future and Options</li>
                                <li>Commodity derivatives</li>

                                <li>Currency derivatives</li>
                            </ul>
                        </div>
                        <div className='col-6'>
                            <ul>
                                <li>Stocks & IPOS</li>
                                <li>Direct mutual funds</li>

                                <li>Bonds and Govt.Securities</li>
                            </ul>
                        </div>

                    </div>
                    <img src='media/images/pressLogos.png' style={{width:"90%"}} />

                </div>

            </div>

        </div> 
        
     );
}

export default Award;