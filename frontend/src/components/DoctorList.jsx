import React from "react";
import { useNavigate } from "react-router-dom";

import '../styles/DoctorList.css'

const DoctorList = ({ doctor }) => {
    const navigate = useNavigate();
    return (
        <>
            <div
                className="card m-2"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/user/book-appointment/${doctor._id}`)}
            >
                <div className="card-header">
                    Dr. {doctor.user.firstName} {doctor.user.lastName}
                </div>
                <div className="card-body">
                    <p>
                        <b>Specialization</b> {doctor.specialization}
                    </p>
                    <p>
                        <b>Experience</b> {doctor.experience}
                    </p>
                    <p>
                        <b>Fees Per Cunsaltation</b> {doctor.feesPerCunsaltation}
                    </p>
                    <p>
                        slots :-
                        {
                            <>
                                <span> {doctor.timeSlot.morningStart + " to " + doctor.timeSlot.morningEnd}</span> |
                                <span> {doctor.timeSlot.eveningStart + " to " + doctor.timeSlot.eveningEnd}</span>
                            </>
                        }
                    </p>
                </div>
            </div>
        </>
    );
};

export default DoctorList;