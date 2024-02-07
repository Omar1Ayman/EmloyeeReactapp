import { useEffect, useState } from "react";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  getEmployeesByName,
  deleteEmployee,
} from "../../services/apiEmployee";
import "./employee.css";
import Modal from "../../components/modal/Modal";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [employeeUpdate, setEmployeeUpdate] = useState(null);
  const [name, setName] = useState("");
  const [salaryStatus, setSalaryStatus] = useState("0");
  const [dateHiring, setDateHiring] = useState("");
  const [job, setJob] = useState("frontend");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        if (!search) {
          setLoading(true);
          const emps = await getEmployees();
          setEmployees(emps);
        } else {
          setLoading(true);
          // const emps = employees.filter((emp) => emp.name.includes(search));
          const emps = await getEmployeesByName(search);
          setEmployees(emps);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [search]);

  const handleAddUpdateEmployee = async (e) => {
    e.preventDefault();
    const newEmployee = {
      name,
      salaryStatus: parseInt(salaryStatus),
      dateHiring,
      job,
    };

    if (employeeUpdate) {
      // If employeeUpdate is set, it means we are updating an existing employee
      try {
        await updateEmployee(newEmployee, employeeUpdate.id);
        const updatedEmployees = await getEmployees();
        setEmployees(updatedEmployees);
        setEmployeeUpdate(null);
        clearForm();
      } catch (error) {
        console.error("Error updating employee:", error);
      }
    } else {
      // Otherwise, we are adding a new employee
      try {
        await createEmployee(newEmployee);
        const updatedEmployees = await getEmployees();
        setEmployees(updatedEmployees);
        clearForm();
      } catch (error) {
        console.error("Error creating employee:", error);
      }
    }

    setShowModal(false);
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await deleteEmployee(id);
      const updatedEmployees = await getEmployees();
      setEmployees(updatedEmployees);
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const clearForm = () => {
    setName("");
    setSalaryStatus("");
    setDateHiring("");
    setJob("");
  };

  return (
    <div className="employee">
      <div className="container">
        <div className="header">
          <h1 className="title">Employees</h1>
          <button
            onClick={() => {
              setShowModal(true);
              setEmployeeUpdate(null);
              clearForm();
            }}
            className="btn primary"
          >
            Add Emp
          </button>
        </div>
        <div className="search">
          <input
            className="search-input"
            placeholder="search for enployees"
            type="search"
            name="search"
            id=""
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
        <div className="wrapper">
          {loading ? (
            <h2 className="loading">Loading...</h2>
          ) : employees?.length === 0 ? (
            <h2 className="no-data">No data</h2>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>name</th>
                  <th>salary status</th>
                  <th>date hiring</th>
                  <th>job</th>
                  <th>controls</th>
                </tr>
              </thead>
              <tbody>
                {employees?.map((employee, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{employee.name}</td>
                    <td>{employee.salaryStatus === 0 ? "invalid" : "valid"}</td>
                    <td>{employee.dateHiring}</td>
                    <td>{employee.job}</td>
                    <td className="controls">
                      <button
                        onClick={() => handleDeleteEmployee(employee.id)}
                        className="btn danger"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => {
                          setShowModal(true);
                          setEmployeeUpdate(employee);
                          setName(employee.name);
                          setSalaryStatus(employee.salaryStatus);
                          setDateHiring(employee.dateHiring);
                          setJob(employee.job);
                        }}
                        className="btn primary"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showModal && (
        <Modal setShowModal={setShowModal} title={"Employee Details"}>
          <form onSubmit={handleAddUpdateEmployee}>
            <div className="input-group">
              <label htmlFor="name">Name:</label>
              <input
                required
                className="input-control"
                type="text"
                name="name"
                id="name"
                placeholder="Employee name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="salaryStatus">Salary Status:</label>
              <select
                required
                value={salaryStatus}
                onChange={(e) => setSalaryStatus(e.target.value)}
                className="input-control"
                name="salaryStatus"
                id="salaryStatus"
              >
                <option value="1">Valid</option>
                <option value="0">Invalid</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="dateHiring">Date Hiring:</label>
              <input
                required
                className="input-control"
                type="date"
                name="dateHiring"
                id="dateHiring"
                value={dateHiring}
                onChange={(e) => setDateHiring(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="job">Job:</label>
              <select
                required
                value={job}
                onChange={(e) => setJob(e.target.value)}
                className="input-control"
                name="job"
                id="job"
              >
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="testing">Testing</option>
              </select>
            </div>
            <div className="controls">
              <button type="submit" className="btn primary">
                {employeeUpdate ? "Update" : "Create"}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="btn success"
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Employee;
