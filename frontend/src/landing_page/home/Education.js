import React from 'react';

function Education() {
    return (  
        <div  className='container mt-5'>
            <div className='row'>
                <div className="col-6">
                    <img src='media/images/education.svg' style={{width:"90%"}}/>
                </div>
                <div className='col-6 '>
                    <h2 className='fs-2'>Free and Open market education</h2>
                    <p className='mt-5'>varsity the largets online stock market education book in world covering everything from basic to advanced trading.</p>
                    <a href='/'>versity <i className="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                    <p className='mt-5'>Trading Q&A, The most active trading and investment community in india for all your market related queries.
                    </p>
                    <a href='/'>Trading Q&A <i className="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                </div>
            </div>
        </div>
    );
}

export default Education;