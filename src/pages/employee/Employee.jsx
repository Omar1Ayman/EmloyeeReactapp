import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useForm } from "react-hook-form";
import Modal from "../../components/modal/Modal";
import {
  createEmployee,
  deleteEmployee,
  getEmployees,
  updateEmployee,
} from "../../services/apiEmployee";
import "./employee.css";
import { Button, CircularProgress, Stack, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Employee = () => {
  const [showModal, setShowModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [updateEmp, setUpdateEmp] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({});

  const openModal = () => {
    setShowModal(true);
    reset({
      name: "",
      salaryStatus: "0",
      dateHiring: new Date(),
      job: "frontend",
    });
  };
  const closeModal = () => setShowModal(false);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      setLoading(true);
      if (updateEmp) {
        console.log("update");
        // If data contains an id, it means we are updating an existing employee
        await updateEmployee(data, data.id);
        handleSnackbar("Employee updated successfully", "success");
      } else {
        console.log("create");
        // If data does not contain an id, it means we are adding a new employee
        await createEmployee(data);
        handleSnackbar("Employee created successfully", "success");
      }

      closeModal();
      fetchEmployees();
      setUpdateEmp(false);
    } catch (error) {
      console.error("Error submitting employee:", error);
      handleSnackbar("Error submitting employee", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const fetchedEmployees = await getEmployees();
      const updatedEmps = fetchedEmployees.map((em) =>
        em.salaryStatus === 1
          ? { ...em, salaryStatus: "valid" }
          : { ...em, salaryStatus: "invalid" }
      );
      setEmployees(updatedEmps);
    } catch (error) {
      console.error("Error fetching employees:", error);
      handleSnackbar("Error fetching employees", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (employeeId) => {
    try {
      setLoading(true);
      await deleteEmployee(employeeId);
      fetchEmployees();
      handleSnackbar("Employee deleted successfully", "success");
    } catch (error) {
      console.error("Error deleting employee:", error);
      handleSnackbar("Error deleting employee", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (employee) => {
    setShowModal(true);
    setUpdateEmp(true);
    reset({
      id: employee.id,
      name: employee.name,
      salaryStatus: employee.salaryStatus === "valid" ? 1 : 0,
      dateHiring: employee.dateHiring,
      job: employee.job,
    });
  };

  const handleSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const cols = ["id", "name", "salaryStatus", "dateHiring", "job", "access"];

  const columns = cols.map((item) => {
    let col = {};
    if (item === "access") {
      col = {
        field: `${item}`,
        headerName: `${item.toUpperCase()}`,
        align: "center",
        headerAlign: "center",
        renderCell: ({ row }) => (
          <Stack gap={2} direction={"row"}>
            <Button
              onClick={() => handleUpdate(row)}
              size="small"
              variant="contained"
              sx={{ textTransform: "capitalize" }}
            >
              Update
            </Button>
            <Button
              onClick={() => handleDelete(row.id)}
              size="small"
              color="error"
              variant="contained"
              sx={{ textTransform: "capitalize" }}
            >
              Delete
            </Button>
          </Stack>
        ),
      };
    } else {
      col = {
        field: `${item}`,
        headerName: `${item.toUpperCase()}`,
        align: "center",
        headerAlign: "center",
        width: item === "id" ? 33 : undefined,
        flex: item === "id" ? undefined : 1,
      };
    }
    item === "id" ? (col["width"] = 33) : (col["flex"] = 1);
    return col;
  });

  return (
    <div className="employee">
      <div className="container">
        <div className="header">
          <h1 className="title">Employees</h1>
          <Button
            onClick={openModal}
            variant="contained"
            sx={{ textTransform: "capitalize" }}
          >
            Add Employee
          </Button>
        </div>

        <div className="wrapper">
          {loading ? (
            <CircularProgress />
          ) : (
            <DataGrid
              slots={{
                toolbar: GridToolbar,
              }}
              rows={employees}
              columns={columns}
            />
          )}
        </div>
      </div>

      {showModal && (
        <Modal setShowModal={setShowModal} title={"Employee Details"}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group">
              <label htmlFor="name">Name:</label>
              <input
                {...register("name", { required: true })}
                className="input-control"
                type="text"
                name="name"
                id="name"
                placeholder="Employee name"
              />
              {errors?.name && <p className="error">username is required</p>}
            </div>
            <div className="input-group">
              <label htmlFor="salaryStatus">Salary Status:</label>
              <select
                {...register("salaryStatus", { required: true })}
                className="input-control"
                name="salaryStatus"
                id="salaryStatus"
              >
                <option value="1">Valid</option>
                <option value="0">Invalid</option>
              </select>
              {errors?.salaryStatus && (
                <p className="error">salaryStatus is required</p>
              )}
            </div>
            <div className="input-group">
              <label htmlFor="dateHiring">Date Hiring:</label>
              <input
                {...register("dateHiring", { required: true })}
                className="input-control"
                type="date"
                name="dateHiring"
                id="dateHiring"
              />
              {errors?.dateHiring && (
                <p className="error">dateHiring is required</p>
              )}
            </div>
            <div className="input-group">
              <label htmlFor="job">Job:</label>
              <select
                {...register("job", { required: true })}
                className="input-control"
                name="job"
                id="job"
              >
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="testing">Testing</option>
              </select>
              {errors?.job && <p className="error">job is required</p>}
            </div>
            <div className="controls">
              <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={isSubmitting}
              >
                {updateEmp ? "Update" : "Create"}
              </Button>
              <Button
                onClick={() => setShowModal(false)}
                color="warning"
                variant="contained"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Modal>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default Employee;
