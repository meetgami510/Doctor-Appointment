import React, { useContext } from "react";
import Layout from "../Layout/Layout";
import { CookiesContext } from "../../context/CookiesProvider";
import DoctorDetails from "./DoctorDetails";

const DoctorList = ({ doctorList }) => {
  const { removeCookies } = useContext(CookiesContext);
  return (
    <Layout removeCookies={removeCookies}>
      <h1>Doctor List</h1>
      <table className="table table-hover table-bordered table-striped">
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
              <DoctorDetails key={doctor._id} doctor={doctor} />
            ))
          }
        </tbody>
      </table>
    </Layout>
  );
};

export default DoctorList;
