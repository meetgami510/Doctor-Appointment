import React, { useContext, useEffect, useRef, useState } from "react";
import Layout from "../components/Layout/Layout";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { Row, message } from "antd";
import { useDispatch } from "react-redux";
import DoctorList from "../components/DoctorList";
import { CookiesContext } from "../context/CookiesProvider";
import { getAlldoctor } from "../Action/users/getGuestUsers";
import Fuse from "fuse.js";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { cookies } = useContext(CookiesContext);
  const [doctors, setDoctors] = useState(null);
  const dispatch = useDispatch();
  const fuse = useRef(null);
  const navigate = useNavigate();

  // get user data
  useEffect(() => {
    const { token } = cookies;
    const getDoctorData = async () => {
      try {
        dispatch(showLoading());

        const response = await getAlldoctor(token);
        
        dispatch(hideLoading());
        if (response.type === "data") {

          message.success(response.message);
          setDoctors(response.doctorList);
          
          fuse.current = new Fuse(response.doctorList, {
            keys: ["specialization"],
          });
        } else {
          if (response.message.includes("authenitication is failed")) {
            navigate('/')
          }
          message.error(response.message);
        }
      } catch (error) {
        
        dispatch(hideLoading());
        message.error("some thing went wrong");
      }
    };
    getDoctorData();
    //eslint-disable-next-line
  }, [cookies]);
  const [searchedDoctors, setSearchedDoctors] = useState([]);
  const [query, setQuery] = useState("");
  useEffect(() => {
    if (fuse.current) {
      if ("" !== query) {
        const result = fuse.current.search(query);
        const doctorList = [];
        
        result.forEach((result) => {
          doctorList.push(result.item);
        });
        setSearchedDoctors(doctorList);
      } else setSearchedDoctors(doctors);
    }
  }, [doctors, query]);

  return (
    <Layout>
      <div className="form-control-container">
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fa fa-search" aria-hidden="true"></i>
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Search Companies Here"
            aria-describedby="button-addon2"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
        </div>
      </div>

      <Row>
        <div className="doctor-list-container">
          {searchedDoctors &&
            searchedDoctors.map((doctor) => (
              <DoctorList doctor={doctor} key={doctor._id} />
            ))}
        </div>
      </Row>
    </Layout>
  );
};

export default Home;
