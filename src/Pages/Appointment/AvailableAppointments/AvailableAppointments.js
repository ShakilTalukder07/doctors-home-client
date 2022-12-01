import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useState } from 'react';
import Loading from '../../Shared/Loading/Loading';
import BookingModal from '../BookingModal/BookingModal';
import AppointmentOption from './AppointmentOption';

const AvailableAppointments = ({ selectDate }) => {

    // const [appointmentOptions, setAppointmentOptions] = useState([]);

    const [treatment, setTreatment] = useState(null);  // declare state for modal 
    const date = format(selectDate, 'PP')

    // fetching data using tanstack query 
    const { data: appointmentOptions = [], refetch, isLoading } = useQuery({   // empty array or useLoading use korbo
        queryKey: ['appointmentOption', date],
        queryFn: () => fetch(`https://doctors-home-server.vercel.app/v2/appointmentOption?date=${date}`)
            .then(res => res.json())
    })

    if (isLoading) {
        <Loading></Loading>
    }


    return (
        <section className='my-16'>
            <p className='text-center text-accent font-bold'>Available Appointments on {format(selectDate, 'PP')}</p>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-6'>
                {
                    appointmentOptions.map(option => <AppointmentOption
                        key={option._id}
                        option={option}
                        setTreatment={setTreatment}
                    ></AppointmentOption>)
                }
            </div>
            {
                treatment &&
                <BookingModal
                    selectDate={selectDate}
                    treatment={treatment}
                    setTreatment={setTreatment}
                    refetch={refetch}
                ></BookingModal>
            }
        </section>
    );
};

export default AvailableAppointments;