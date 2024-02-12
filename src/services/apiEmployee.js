const api = "http://localhost:5000/employees/";

const getEmployees = async () => {
  try {
    const res = await fetch(api);
    if (!res.ok) {
      throw new Error("Failed to fetch employees");
    }
    const data = await res.json();
    data.sort((a, b) => new Date(b.dateHiring) - new Date(a.dateHiring));

    return data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

const getEmployeesByName = async (query) => {
  try {
    const res = await fetch(`${api}?name=${query}`);
    if (!res.ok) {
      throw new Error("Failed to fetch employees");
    }
    const data = await res.json();
    return data; // Return only the employees array from the response
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

const searchEmp = async (query) => {
  const { name, id } = query;
  try {
    const res = await fetch(`${api}?name=${name}&id=${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch employees");
    }
    const data = await res.json();
    return data; // Return only the employees array from the response
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

const createEmployee = async (data) => {
  try {
    const res = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error("Failed to create employee");
    }
  } catch (error) {
    console.error("Error creating employee:", error);
    throw error;
  }
};

const updateEmployee = async (data, id) => {
  try {
    const res = await fetch(`${api}${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error("Failed to update employee");
    }
  } catch (error) {
    console.error("Error updating employee:", error);
    throw error;
  }
};

const deleteEmployee = async (id) => {
  try {
    const res = await fetch(`${api}${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to delete employee");
    }
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw error;
  }
};

export {
  getEmployeesByName,
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  searchEmp,
};
