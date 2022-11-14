import React from 'react';

const AppointmentOption = ({ option, setTreatment }) => {

    const { name, slots } = option

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body text-center">
                <h2 className=" text-2xl text-accent font-bold text-center">{name}</h2>
                <p>{slots.length > 0 ? slots[0] : 'Try another day'}</p>
                <p>{slots.length} {slots.length > 1 ? 'spaces' : 'space'} Available</p>
                <div className="card-actions justify-center">
                    {/* modal label to open the modal */}
                    <label
                        disabled = { slots.length === 0 }
                        htmlFor="booking-modal"
                        className="btn btn-accent text-white"
                        onClick={() => setTreatment(option)}
                    >Book Appointment</label>
                </div>
            </div>
        </div>
    );
};

export default AppointmentOption;