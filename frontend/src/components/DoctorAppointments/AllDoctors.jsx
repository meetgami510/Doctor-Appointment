import React, { useContext } from "react";
import Layout from "../Layout/Layout";
import { CookiesContext } from "../../context/CookiesProvider";
import DoctorAppointment from "./DoctorAppointment";

const AllDoctors = ({ doctorList }) => {
  const { removeCookies, cookies } = useContext(CookiesContext);
  return (
    <Layout removeCookies={removeCookies}>
      <h1>Doctor List</h1>
      <table class="table table-hover table-bordered table-striped">
        <thead>
          <tr className="font-size-14">
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Date</th>
            <th scope="col">Actions</th>
            <th scope="col">show Details</th>
          </tr>
        </thead>
        <tbody>
          {
            doctorList.map((doctor) => (
              <DoctorAppointment doctor={doctor} />
            ))
          }
        </tbody>
      </table>
    </Layout>
  );
};

export default AllDoctors;
