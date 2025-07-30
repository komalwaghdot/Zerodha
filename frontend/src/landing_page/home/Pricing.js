import React from 'react';

function Pricing() {
    return (
        <div className="container mb-5">
            <div className="row">
                <div className="col-4">
                    <h1 className="mb-3">Unbeatable pricing</h1>
                    <p>We pioneered the concept of discount broking and price transparency in India. Flat fees and no hidden charges.</p>
                    <a href="/">See Pricing <i className="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                </div>
                <div className="col-2">
                    {/* Empty column for spacing or future content */}
                </div>
                <div className="col-6">
                    <div className='row text-center'>
                        <div className='col-6  p-2 border'>
                            <h1>0</h1>
                            <p>Free equity delivery and<br/> direct mutual funds</p>
                        </div>
                        <div className='col-6 p-2 border'>
                            <h1>20</h1>
                            <p>Intrady F&O</p>
                        </div>
                        
                    </div>
                
                </div>
            </div>
        </div>
    );
}

export default Pricing;
