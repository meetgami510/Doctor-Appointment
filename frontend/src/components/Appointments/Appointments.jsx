import React, { useContext } from 'react'
import Layout from '../Layout/Layout'
import Appointment from './Appointment'
import { CookiesContext } from '../../context/CookiesProvider';

function Appointments({ appointments, isDoctor }) {
    const { removeCookies, cookies } = useContext(CookiesContext);
    console.log(appointments)
    return (
        <Layout removeCookies={removeCookies}>
            <h1>Appointment Lists</h1>
            <table className="table table-hover table-bordered table-striped">
                <thead>
                    <tr className="font-size-14">
                        <th scope="col" >Name</th>
                        <th scope="col">Date</th>
                        <th scope="col">Time</th>
                        <th schope="col">Meeting Mode</th>
                        <th scope="col">Actions</th>
                        <th scope="col" >show Details</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        appointments.map((appointment) => (
                            <Appointment appointment={appointment} isDoctor={isDoctor} />
                        ))
                    }
                </tbody>
            </table>
        </Layout>
    )
}

export default Appointments