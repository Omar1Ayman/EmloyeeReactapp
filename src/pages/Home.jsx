import { useEffect, useState } from "react";
import "./home.css";
import { getEmployees } from "../services/apiEmployee";
const Home = () => {
  const [countEmps, setCountEmps] = useState(0);
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const emps = await getEmployees();
        setCountEmps(emps.length);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);
  return (
    <div className="home">
      <div className="container">
        <h1 className="title">Home</h1>
        <div className="wrapper">
          {[1].map((item) => {
            return (
              <div key={item} className="card">
                <i class="icon fa-solid fa-users"></i>
                <h3>{countEmps}</h3>
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
