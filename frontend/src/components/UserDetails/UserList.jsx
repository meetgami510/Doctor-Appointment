import React, { useContext } from "react";
import Layout from "../Layout/Layout";
import { CookiesContext } from "../../context/CookiesProvider";
import AllUserDetails from "./AllUserDetails";
// import AllUserDetails from "./AllUserDetails";

const UserList = ({ userList }) => {
  const { removeCookies } = useContext(CookiesContext);
  console.log(userList);
  return (
    <Layout removeCookies={removeCookies}>
      <h1 className="text-center m-2">Users List</h1>
      <table className="table table-hover table-bordered table-striped">
        <thead>
          <tr className="font-size-14">
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Actions</th>
            <th scope="col">show Details</th>
          </tr>
        </thead>
        <tbody>
          {
            userList.map((user) => (
              <AllUserDetails key={user._id} user={user} />
            ))
          }
        </tbody>
      </table>
    </Layout>
  );
};

export default UserList;
