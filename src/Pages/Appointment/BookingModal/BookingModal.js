import { format } from 'date-fns';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../context/AuthProvider';

const BookingModal = ({ treatment, setTreatment, selectDate }) => {

    const { name, slots } = treatment  // treatment is appointment option just different name
    const date = format(selectDate, 'PP')
    const { user } = useContext(AuthContext);
    console.log(user);

    const handleBooking = event => {
        event.preventDefault();
        const form = event.target;
        const slot = form.slot.value;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;

        const booking = {
            appointmentDate: date,
            treatment: name,
            slot,  // if name and value are same we can only write the value
            patient: name,
            email,
            phone
        }

        // TODO : send data to the server 
        // and once data is saved then closed the modal 
        // add display a success toast 
        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.acknowledged){
                    setTreatment(null)
                toast.success('Booking Confirmed')
                }
            })
    }

    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{name}</h3>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-10'>
                        <input type="text" disabled value={date} placeholder="Type here" className="input w-full input-bordered" />
                        <select name='slot' className="select select-bordered w-full ">
                            {
                                slots.map((slot, index) => <option
                                    value={slot}
                                    key={index}
                                > {slot} </option>)
                            }
                        </select>
                        <input name='name' type="text" defaultValue={user?.displayName} disabled placeholder="Your Name" className="input w-full input-bordered" />
                        <input name='email' type="email" defaultValue={user?.email} disabled placeholder="Your Email" className="input w-full input-bordered" />
                        <input name='phone' type="number" placeholder="Phone Number" className="input w-full input-bordered" />
                        <br />
                        <input className=' btn btn-accent w-full' type="submit" value="submit" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;