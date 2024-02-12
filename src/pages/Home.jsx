import { useEffect, useState } from "react";
import "./home.css";
import { getEmployees } from "../services/apiEmployee";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, getUsers } from "../fetaures/UserSlice";

const Home = () => {
  const users = useSelector((state) => state.users.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  console.log(users?.length);
  return (
    <div className="home">
      <div className="container">
        <h1 className="title">Home</h1>
        <div className="wrapper">
          {[1].map((item) => {
            return (
              <div key={item} className="card">
                <i class="icon fa-solid fa-users"></i>
                <h3>{users?.length}</h3>
                <h3>Employess</h3>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
