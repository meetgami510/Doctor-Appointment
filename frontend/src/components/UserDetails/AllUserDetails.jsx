import React, { useContext, useState } from "react";
import { CookiesContext } from "../../context/CookiesProvider";
import { useDispatch } from "react-redux";
import { message } from "antd";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";
import ViewUsers from "./ViewUsers";
import { toast } from "react-toastify";
import '../../styles/AlertBox.css'
import axiosInstance from "../../utilities/axiosInstance";


const AllUserDetails = ({ user }) => {
    
    const { cookies } = useContext(CookiesContext);
    const dispatch = useDispatch();

    const [editModalShow, setViewModalShow] = React.useState(false);

    const handleAccountStats = async (user) => {
        console.log(user);
        const alertBox = document.createElement('div');
        alertBox.classList.add('alert-box');
        alertBox.innerHTML = `
          <span class="close-btn">&times;</span>
          <p>Are you sure you want to delete?</p>
          <p>Name : ${user.firstName + user.lastName}</p>
          <p>Email : ${user.email}</p>
          <button class="confirm-btn">Block User</button>
        `;
  
      // Append the alert box to the document body
      document.body.appendChild(alertBox);
        
      // Add event listener to the confirm button
      const confirmBtn = alertBox.querySelector('.confirm-btn');
      confirmBtn.addEventListener('click', async () => {
        console.log("delte Department")
        alertBox.remove();
        console.log(user);
        if (user) {
          const response = await axiosInstance.post('/admin/block-users',{userdeleteId : user._id});
          console.log(response);
        } else {
          toast.error('error occure in due to server', {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      });
    
      // Add event listener to the close button
      const closeBtn = alertBox.querySelector('.close-btn');
      closeBtn.addEventListener('click', () => {
        // Remove the alert box
        alertBox.remove();
      });
        
    }
    return (
        <>
            <tr key={user._id} className="font-size-14">
                <td >{user.firstName + " " + user.lastName}</td>
                <td >{user.email}</td>
                <td >{user.phone}</td>
                <td >{
                    <button
                                className="btn btn-danger ms-2"
                                onClick={() => handleAccountStats(user)}
                    >
                    Block
                    </button>
                }</td>
                <td style={{ cursor: "pointer", padding: "10px" }} onClick={() => { setViewModalShow(true); }} > <i style={{ fontSize: "13px", color: "#0077b6" }} className="fa fa-eye"></i> </td>

                <ViewUsers show={editModalShow} onHide={() => setViewModalShow(false)} user={user} />

            </tr>
        </>
    )
}

export default AllUserDetails