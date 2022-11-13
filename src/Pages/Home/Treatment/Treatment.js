import React from 'react';
import treatment from '../../../assets/images/treatment.png'

const Treatment = () => {
    return (
        <div className="hero min-h-screen my-20 mx-10 ">
            <div className="hero-content flex-col lg:flex-row">
                <img src={treatment} alt='/' className="w-[458px] h-[576px] rounded-lg shadow-2xl" />
                <div className='px-20'>
                    <h1 className="text-5xl font-bold">Exceptional Dental <br /> Care, on Your Terms</h1>
                    <p>It is a long established fact that a reader will be distracted by the <br /> readable content of a page when looking at its layout. The point <br /> of using Lorem Ipsumis that it has a more-or-less normal <br />
                        distribution of letters,as opposed to using 'Content here, content <br /> here', making it look like readable English. Many desktop <br /> publishing packages and web page</p>
                    <button className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white">Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default Treatment;