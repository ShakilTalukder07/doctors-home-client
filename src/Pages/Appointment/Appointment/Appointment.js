import React, { useState } from 'react';
import AvailableAppointments from '../AvailableAppointments/AvailableAppointments';
import AppointmentBanner from './AppointmentBanner/AppointmentBanner';

const Appointment = () => {

    // use calender state 
    const [selectDate, setSelectDate] = useState(new Date())

    return (
        <div>
            <AppointmentBanner
                selectDate={selectDate}
                setSelectDate={setSelectDate}
            ></AppointmentBanner>
            <AvailableAppointments
                selectDate={selectDate}
            ></AvailableAppointments>
        </div>
    );
};

export default Appointment;