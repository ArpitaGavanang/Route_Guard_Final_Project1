import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./DriverDetails.css";
import Layout from "../components/Layout/Layout";

const driverSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
  adharNumber: Yup.string()
    .matches(
      /^\d{4}-\d{4}-\d{4}$/,
      "Adhar number must be in the format XXXX-XXXX-XXXX"
    )
    .required("Adhar number is required"),
  panNumber: Yup.string()
    .matches(
      /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
      "Pan number must be in the format XXXXX0000X"
    )
    .required("Pan number is required"),
  driverName: Yup.string()
    .matches(
      /^[A-Za-z\s]+$/,
      "Driver name must contain only letters and spaces"
    )
    .required("Driver name is required"),
  dob: Yup.date()
    .max(new Date(), "Date of Birth cannot be in the future")
    .required("Date of Birth is required"),
  address: Yup.string()
    .min(5, "Address must be at least 5 characters")
    .required("Address is required"),
  nationality: Yup.string().required("Nationality is required"),
});

const nationalities = [
  { label: "Select Nationality", value: "" },
  { label: "Indian", value: "Indian" },
  { label: "American", value: "American" },
  { label: "British", value: "British" },
  { label: "Canadian", value: "Canadian" },
  // Add more options as needed...
];

const DriverDetails = () => {
  const [rowData, setRowData] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);

  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    getDriverList();
  }, []);

  const getDriverList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/drivers/getDrivers"
      );
      const jsonData = await response.data;
      setRowData(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      headerName: "Phone Number",
      field: "phoneNumber",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Adhar Number",
      field: "adharNumber",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Pan Number",
      field: "panNumber",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Driver Name",
      field: "driverName",
      sortable: true,
      filter: true,
    },
    { headerName: "DOB", field: "dob", sortable: true, filter: true },
    { headerName: "Address", field: "address", sortable: true, filter: true },
    {
      headerName: "Nationality",
      field: "nationality",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Actions",
      width: 200,
      cellRenderer: (params) => {
        return (
          <div className="actions d-flex justify-content-start gap-3">
            <i
              className="bi bi-pencil-fill"
              onClick={() => handleEdit(params.data)}
            ></i>
            <i
              className="bi bi-trash3-fill"
              onClick={() => handleDelete(params)}
            ></i>
          </div>
        );
      },
    },
  ];

  const handleSubmit = (values, { resetForm }) => {
    if (selectedDriver) {
      // Update driver using Axios with JWT token
      axios.put(`/api/drivers/${selectedDriver.id}`, values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setRowData((prevData) =>
            prevData.map((driver) =>
              driver.id === response.data.id ? response.data : driver
            )
          );
          setSelectedDriver(null);
        })
        .catch((error) => console.error("Error updating driver:", error));
    } else {
      // Add new driver using Axios with JWT token
      axios
        .post("http://localhost:8080/api/drivers/register", values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) =>
          setRowData((prevData) => [...prevData, response.data])
        )
        .catch((error) => console.error("Error adding driver:", error));
    }
    resetForm();
  };

  const handleEdit = (driver) => {
    setSelectedDriver(driver);
  };

  const handleDelete = async (driver) => {
    const url = `/api/drivers/${driver.data.id}`; // Relative URL
    console.log("Request URL:", url);
    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setRowData((prevData) => prevData.filter((d) => d.id !== driver.data.id));
      }
    } catch (error) {
      console.error("Error deleting driver:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <Layout>
      <div className="driver-details">
        <h2>Driver Details</h2>

        <div className="form-card">
          <h3>{selectedDriver ? "Edit Driver" : "Add Driver"}</h3>
          <Formik
            initialValues={{
              phoneNumber: selectedDriver?.phoneNumber || "",
              adharNumber: selectedDriver?.adharNumber || "",
              panNumber: selectedDriver?.panNumber || "",
              driverName: selectedDriver?.driverName || "",
              dob: selectedDriver?.dob || "",
              address: selectedDriver?.address || "",
              nationality: selectedDriver?.nationality || "",
            }}
            validationSchema={driverSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {() => (
              <Form>
                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <Field
                    name="phoneNumber"
                    id="phoneNumber"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="adharNumber">Adhar Number</label>
                  <Field
                    name="adharNumber"
                    id="adharNumber"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="adharNumber"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="panNumber">Pan Number</label>
                  <Field
                    name="panNumber"
                    id="panNumber"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="panNumber"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="driverName">Driver Name</label>
                  <Field
                    name="driverName"
                    id="driverName"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="driverName"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="dob">DOB</label>
                  <Field
                    name="dob"
                    id="dob"
                    type="date"
                    className="form-control"
                  />
                  <ErrorMessage name="dob" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <Field name="address" id="address" className="form-control" />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="nationality">Nationality</label>
                  <Field
                    as="select"
                    name="nationality"
                    id="nationality"
                    className="form-control"
                  >
                    {nationalities.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="nationality"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="form-group d-flex justify-content-center">
                  <button type="submit" className="submit-button">
                    {selectedDriver ? "Update Driver" : "Add Driver"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        {/* AG Grid Table */}
        <div className="table-card">
          <div
            className="ag-theme-alpine"
            style={{ height: 400, width: "100%" }}
          >
            <AgGridReact
              columnDefs={columns}
              rowData={rowData}
              domLayout="autoHeight"
              suppressRowClickSelection={true}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DriverDetails;











//========================================================================
// import React, { useState, useEffect } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import { AgGridReact } from "ag-grid-react";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";
// import "./DriverDetails.css";
// import Layout from "../components/Layout/Layout";
// //axios.defaults.withCredentials = true;


// const driverSchema = Yup.object().shape({
//   phoneNumber: Yup.string()
//     .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
//     .required("Phone number is required"),
//   adharNumber: Yup.string()
//     .matches(
//       /^\d{4}-\d{4}-\d{4}$/,
//       "Adhar number must be in the format XXXX-XXXX-XXXX"
//     )
//     .required("Adhar number is required"),
//   panNumber: Yup.string()
//     .matches(
//       /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
//       "Pan number must be in the format XXXXX0000X"
//     )
//     .required("Pan number is required"),
//   driverName: Yup.string()
//     .matches(
//       /^[A-Za-z\s]+$/,
//       "Driver name must contain only letters and spaces"
//     )
//     .required("Driver name is required"),
//   dob: Yup.date()
//     .max(new Date(), "Date of Birth cannot be in the future")
//     .required("Date of Birth is required"),
//   address: Yup.string()
//     .min(5, "Address must be at least 5 characters")
//     .required("Address is required"),
//   nationality: Yup.string()
//     .matches(
//       /^[A-Za-z\s]+$/,
//       "Nationality must contain only letters and spaces"
//     )
//     .required("Nationality is required"),
// });

// const DriverDetails = () => {
//   const [rowData, setRowData] = useState([]);
//   const [selectedDriver, setSelectedDriver] = useState(null);

 
//   const token = localStorage.getItem("jwtToken");

//   useEffect(() => {
//     getDriverList();
//   }, []);

//   const getDriverList = async () => {
//     try {
//       const resposne = await axios.get(
//         "http://localhost:8080/api/drivers/getDrivers"
//       );
//       console.log(resposne);
//       const jsonData = await resposne.data;
//       setRowData(jsonData);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const columns = [
//     {
//       headerName: "Phone Number",
//       field: "phoneNumber",
//       sortable: true,
//       filter: true,
//     },
//     {
//       headerName: "Adhar Number",
//       field: "adharNumber",
//       sortable: true,
//       filter: true,
//     },
//     {
//       headerName: "Pan Number",
//       field: "panNumber",
//       sortable: true,
//       filter: true,
//     },
//     {
//       headerName: "Driver Name",
//       field: "driverName",
//       sortable: true,
//       filter: true,
//     },
//     { headerName: "DOB", field: "dob", sortable: true, filter: true },
//     { headerName: "Address", field: "address", sortable: true, filter: true },
//     {
//       headerName: "Nationality",
//       field: "nationality",
//       sortable: true,
//       filter: true,
//     },
//     {
//       headerName: "Actions",
//       width: 200,
//       cellRenderer: (params) => {
//         return (
//           <div className="actions d-flex justify-content-start gap-3">
//             <i
//               className="bi bi-pencil-fill"
//               onClick={() => handleEdit(params.data)}
//             ></i>
//             <i
//               className="bi bi-trash3-fill"
//               onClick={() => handleDelete(params)}
//             ></i>
//           </div>
//         );
//       },
//     },
//   ];

//   const handleSubmit = (values, { resetForm }) => {
//     if (selectedDriver) {
//       // Update driver using Axios with JWT token
//       axios.put(`/api/drivers/${selectedDriver.id}`, values, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         })
//         .then((response) => {
//           setRowData((prevData) =>
//             prevData.map((driver) =>
//               driver.id === response.data.id ? response.data : driver
//             )
//           );
//           setSelectedDriver(null);
//         })
//         .catch((error) => console.error("Error updating driver:", error));
//     } else {
//       // Add new driver using Axios with JWT token
//       axios
//         .post("http://localhost:8080/api/drivers/register", values, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         })
//         .then((response) =>
//           setRowData((prevData) => [...prevData, response.data])
//         )
//         .catch((error) => console.error("Error adding driver:", error));
//     }
//     resetForm();
//   };

//   const handleEdit = (driver) => {
//     setSelectedDriver(driver);
//   };

//   const handleDelete = async (driver) => {
//     const url = `/api/drivers/${driver.data.id}`; // Relative URL
//     console.log("Request URL:", url);
//     try {
//       const response = await axios.delete(url, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log(response);
//       if (response.status === 200) {
//         setRowData((prevData) => prevData.filter((d) => d.id !== driver.data.id));
//       }
//     } catch (error) {
//       console.error("Error deleting driver:", error.response ? error.response.data : error.message);
//     }
//   };
  

//   return (
//     <Layout>
//       <div className="driver-details">
//         <h2>Driver Details</h2>

//         {/* Form Card */}
//         <div className="form-card">
//           <h3>{selectedDriver ? "Edit Driver" : "Add Driver"}</h3>
//           <Formik
//             initialValues={{
//               phoneNumber: selectedDriver?.phoneNumber || "",
//               adharNumber: selectedDriver?.adharNumber || "",
//               panNumber: selectedDriver?.panNumber || "",
//               driverName: selectedDriver?.driverName || "",
//               dob: selectedDriver?.dob || "",
//               address: selectedDriver?.address || "",
//               nationality: selectedDriver?.nationality || "",
//             }}
//             validationSchema={driverSchema}
//             onSubmit={handleSubmit}
//             enableReinitialize
//           >
//             {() => (
//               <Form>
//                 <div className="form-group">
//                   <label htmlFor="phoneNumber">Phone Number</label>
//                   <Field
//                     name="phoneNumber"
//                     id="phoneNumber"
//                     className="form-control"
//                   />
//                   <ErrorMessage
//                     name="phoneNumber"
//                     component="div"
//                     className="error"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="adharNumber">Adhar Number</label>
//                   <Field
//                     name="adharNumber"
//                     id="adharNumber"
//                     className="form-control"
//                   />
//                   <ErrorMessage
//                     name="adharNumber"
//                     component="div"
//                     className="error"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="panNumber">Pan Number</label>
//                   <Field
//                     name="panNumber"
//                     id="panNumber"
//                     className="form-control"
//                   />
//                   <ErrorMessage
//                     name="panNumber"
//                     component="div"
//                     className="error"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="driverName">Driver Name</label>
//                   <Field
//                     name="driverName"
//                     id="driverName"
//                     className="form-control"
//                   />
//                   <ErrorMessage
//                     name="driverName"
//                     component="div"
//                     className="error"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="dob">DOB</label>
//                   <Field
//                     name="dob"
//                     id="dob"
//                     type="date"
//                     className="form-control"
//                   />
//                   <ErrorMessage name="dob" component="div" className="error" />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="address">Address</label>
//                   <Field name="address" id="address" className="form-control" />
//                   <ErrorMessage
//                     name="address"
//                     component="div"
//                     className="error"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="nationality">Nationality</label>
//                   <Field
//                     name="nationality"
//                     id="nationality"
//                     className="form-control"
//                   />
//                   <ErrorMessage
//                     name="nationality"
//                     component="div"
//                     className="error"
//                   />
//                 </div>
//                 <div className="form-group d-flex justify-content-center">
//                   <button type="submit" className="submit-button">
//                     {selectedDriver ? "Update Driver" : "Add Driver"}
//                   </button>
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         </div>

//         {/* Table Card */}
//         <div className="table-card">
//           <div
//             className="ag-theme-alpine"
//             style={{ height: 400, width: "100%" }}
//           >
//             <AgGridReact
//               columnDefs={columns}
//               rowData={rowData}
//               domLayout="autoHeight"
//               suppressRowClickSelection={true}
//             />
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default DriverDetails;
