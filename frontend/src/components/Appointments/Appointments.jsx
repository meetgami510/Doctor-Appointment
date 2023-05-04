import React, { useContext } from 'react'
import Layout from '../Layout/Layout'
import Appointment from './Appointment'
import { CookiesContext } from '../../context/CookiesProvider';

function Appointments({ axiosInstance, appointments, isDoctor }) {
    const { removeCookies, cookies } = useContext(CookiesContext);
    return (
        <Layout removeCookies={removeCookies}>
            <h1>Appointment Lists</h1>
            <table class="table table-hover table-bordered table-striped">
                <thead>
                    <tr className="font-size-14">
                        <th scope="col" >Name</th>
                        <th scope="col">Date</th>
                        <th scope="col">Time</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {

                        appointments.map((appointment) => (
                            <Appointment appointment={appointment} axiosInstance={axiosInstance} isDoctor={true} />
                        ))
                    }
                </tbody>
            </table>
        </Layout>
    )
}

export default Appointments