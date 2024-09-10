import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Layout from "../components/Layout/Layout";

const vehicleSchema = Yup.object().shape({
  vehicleNumber: Yup.string()
    .required("Vehicle number is required")
    .matches(
      /^[A-Z]{2,3}\d{2,4}(-\d{4})?$/,
      "Vehicle number must be in the format: XX12-1234 or XX1234"
    ),
  vehicleName: Yup.string()
    .required("Vehicle name is required")
    .min(2, "Vehicle name must be at least 2 characters long")
    .max(50, "Vehicle name cannot exceed 50 characters"),
  vehicleModelNumber: Yup.string()
    .required("Vehicle model number is required")
    .min(2, "Vehicle model number must be at least 2 characters long")
    .max(50, "Vehicle model number cannot exceed 50 characters"),
  puc: Yup.string()
    .required("PUC is required")
    .oneOf(["Valid", "Expired"], 'PUC must be either "Valid" or "Expired"'),
  accidentHistory: Yup.string()
    .required("Accident history is required")
    .oneOf(["No Accidents", "Minor Accidents", "Major Accidents"], 'Accident history must be one of the specified options'),
  carryingCapacity: Yup.string()
    .required("Carrying capacity is required")
    .oneOf(["500kg", "1000kg", "2000kg", "5000kg"], 'Select a valid carrying capacity'),
});

const VehiclesDashBoard = () => {
  const [rowData, setRowData] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/vehicles/GetVehicles", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRowData(response.data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchVehicles();
  }, [token]);

  const handleSubmit = (values, { resetForm }) => {
    if (selectedVehicle) {
      axios.put(`/api/vehicles/${selectedVehicle.id}`, values, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setRowData((prevData) =>
          prevData.map((vehicle) =>
            vehicle.id === selectedVehicle.id ? response.data : vehicle
          )
        );
        setSelectedVehicle(null);
      })
      .catch((error) => console.error("Error updating vehicle:", error));
    } else {
      axios.post("http://localhost:8080/api/vehicles/addvehicle", values, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setRowData([...rowData, response.data]);
      })
      .catch((error) => console.error("Error adding vehicle:", error));
    }
    resetForm();
  };

  const handleEdit = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleDelete = async (vehicle) => {
    try {
      const response = await axios.delete(`/api/vehicles/${vehicle.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        setRowData((prevData) => prevData.filter((v) => v.id !== vehicle.id));
      }
    } catch (error) {
      console.error("Error deleting vehicle:", error.response ? error.response.data : error.message);
    }
  };

  const columns = [
    { headerName: "Vehicle Number", field: "vehicleNumber", sortable: true, filter: true },
    { headerName: "Vehicle Name", field: "vehicleName", sortable: true, filter: true },
    { headerName: "Vehicle Model Number", field: "vehicleModelNumber", sortable: true, filter: true },
    { headerName: "PUC", field: "puc", sortable: true, filter: true },
    { headerName: "Accident History", field: "accidentHistory", sortable: true, filter: true },
    { headerName: "Carrying Capacity", field: "carryingCapacity", sortable: true, filter: true },
    {
      headerName: "Actions",
      width: 200,
      cellRenderer: (params) => (
        <div className="actions d-flex justify-content-start gap-3">
          <i className="bi bi-pencil-fill" onClick={() => handleEdit(params.data)}></i>
          <i className="bi bi-trash3-fill" onClick={() => handleDelete(params.data)}></i>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className="vehicle-details container">
        <h3>Vehicle Details</h3>
        {/* Form Card */}
        <div className="form-card">
          <h3>{selectedVehicle ? "Edit Vehicle" : "Add Vehicle"}</h3>
          <Formik
            initialValues={{
              vehicleNumber: selectedVehicle?.vehicleNumber || "",
              vehicleName: selectedVehicle?.vehicleName || "",
              vehicleModelNumber: selectedVehicle?.vehicleModelNumber || "",
              puc: selectedVehicle?.puc || "",
              accidentHistory: selectedVehicle?.accidentHistory || "",
              carryingCapacity: selectedVehicle?.carryingCapacity || "",
            }}
            validationSchema={vehicleSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {() => (
              <Form>
                <div className="form-group">
                  <label htmlFor="vehicleNumber">Vehicle Number</label>
                  <Field name="vehicleNumber" id="vehicleNumber" className="form-control" />
                  <ErrorMessage name="vehicleNumber" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label htmlFor="vehicleName">Vehicle Name</label>
                  <Field name="vehicleName" id="vehicleName" className="form-control" />
                  <ErrorMessage name="vehicleName" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label htmlFor="vehicleModelNumber">Vehicle Model Number</label>
                  <Field name="vehicleModelNumber" id="vehicleModelNumber" className="form-control" />
                  <ErrorMessage name="vehicleModelNumber" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label htmlFor="puc">PUC</label>
                  <Field as="select" name="puc" id="puc" className="form-control">
                    <option value="">Select PUC Status</option>
                    <option value="Valid">Valid</option>
                    <option value="Expired">Expired</option>
                  </Field>
                  <ErrorMessage name="puc" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label htmlFor="accidentHistory">Accident History</label>
                  <Field as="select" name="accidentHistory" id="accidentHistory" className="form-control">
                    <option value="">Select Accident History</option>
                    <option value="No Accidents">No Accidents</option>
                    <option value="Minor Accidents">Minor Accidents</option>
                    <option value="Major Accidents">Major Accidents</option>
                  </Field>
                  <ErrorMessage name="accidentHistory" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label htmlFor="carryingCapacity">Carrying Capacity</label>
                  <Field as="select" name="carryingCapacity" id="carryingCapacity" className="form-control">
                    <option value="">Select Carrying Capacity</option>
                    <option value="500kg">500kg</option>
                    <option value="1000kg">1000kg</option>
                    <option value="2000kg">2000kg</option>
                    <option value="5000kg">5000kg</option>
                  </Field>
                  <ErrorMessage name="carryingCapacity" component="div" className="error" />
                </div>
                <div className="form-group d-flex justify-content-center">
                  <button type="submit" className="submit-button">
                    {selectedVehicle ? "Update Vehicle" : "Add Vehicle"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        {/* Table Card */}
        <div className="table-card">
          <div
            className="ag-theme-alpine"
            style={{ height: 400, width: "100%" }}
          >
            <AgGridReact
              columnDefs={columns}
              rowData={rowData}
              domLayout="autoHeight" /> 
            </div> 
            </div> 
            </div> 
            </Layout> 
            ); 
          };
          export default VehiclesDashBoard;




//===============================================
// import React, { useState, useEffect } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import { AgGridReact } from "ag-grid-react";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";
// //import "./VehicleDetails.css";
// import Layout from "../components/Layout/Layout";


// const vehicleSchema = Yup.object().shape({
//   vehicleNumber: Yup.string()
//     .required("Vehicle number is required")
//     .matches(
//       /^[A-Z]{2,3}\d{2,4}(-\d{4})?$/,
//       "Vehicle number must be in the format: XX12-1234 or XX1234"
//     ),
//   vehicleName: Yup.string()
//     .required("Vehicle name is required")
//     .min(2, "Vehicle name must be at least 2 characters long")
//     .max(50, "Vehicle name cannot exceed 50 characters"),
//   vehicleModelNumber: Yup.string()
//     .required("Vehicle model number is required")
//     .min(2, "Vehicle model number must be at least 2 characters long")
//     .max(50, "Vehicle model number cannot exceed 50 characters"),
//   puc: Yup.string()
//     .required("PUC is required")
//     .oneOf(["Valid", "Expired"], 'PUC must be either "Valid" or "Expired"'),
//   accidentHistory: Yup.string().required("Accident history is required"),
//   carryingCapacity: Yup.string()
//     .required("Carrying capacity is required")
//     .matches(/^[0-9]+kg$/, 'Carrying capacity must be a number followed by "kg"'),
// });

// const VehiclesDashBoard = () => {
//   const [rowData, setRowData] = useState([]);
//   const [selectedVehicle, setSelectedVehicle] = useState(null);

//   const token = localStorage.getItem("jwtToken");

//   useEffect(() => {
//     const fetchVehicles = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/api/vehicles/GetVehicles", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setRowData(response.data);
//       } catch (error) {
//         console.error("Error fetching vehicles:", error);
//       }
//     };
    
//     fetchVehicles();
//   }, [token]);

//   const handleSubmit = (values, { resetForm }) => {
//     if (selectedVehicle) {
//       axios.put(`/api/vehicles/${selectedVehicle.id}`, values, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((response) => {
//         setRowData((prevData) =>
//           prevData.map((vehicle) =>
//             vehicle.id === selectedVehicle.id ? response.data : vehicle
//           )
//         );
//         setSelectedVehicle(null);
//       })
//       .catch((error) => console.error("Error updating vehicle:", error));
//     } else {
//       axios.post("http://localhost:8080/api/vehicles/addvehicle", values, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((response) => {
//         setRowData([...rowData, response.data]);
//       })
//       .catch((error) => console.error("Error adding vehicle:", error));
//     }
//     resetForm();
//   };

//   const handleEdit = (vehicle) => {
//     setSelectedVehicle(vehicle);
//   };

//   const handleDelete = async (vehicle) => {
//     try {
//       const response = await axios.delete(`/api/vehicles/${vehicle.id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (response.status === 200) {
//         setRowData((prevData) => prevData.filter((v) => v.id !== vehicle.id));
//       }
//     } catch (error) {
//       console.error("Error deleting vehicle:", error.response ? error.response.data : error.message);
//     }
//   };

//   const columns = [
//     { headerName: "Vehicle Number", field: "vehicleNumber", sortable: true, filter: true },
//     { headerName: "Vehicle Name", field: "vehicleName", sortable: true, filter: true },
//     { headerName: "Vehicle Model Number", field: "vehicleModelNumber", sortable: true, filter: true },
//     { headerName: "PUC", field: "puc", sortable: true, filter: true },
//     { headerName: "Accident History", field: "accidentHistory", sortable: true, filter: true },
//     { headerName: "Carrying Capacity", field: "carryingCapacity", sortable: true, filter: true },
//     {
//       headerName: "Actions",
//       width: 200,
//       cellRenderer: (params) => (
//         <div className="actions d-flex justify-content-start gap-3">
//           <i className="bi bi-pencil-fill" onClick={() => handleEdit(params.data)}></i>
//           <i className="bi bi-trash3-fill" onClick={() => handleDelete(params.data)}></i>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <Layout>
//       <div className="vehicle-details container">
//         <h3>Vehicle Details</h3>
//         {/* Form Card */}
//         <div className="form-card">
//           <h3>{selectedVehicle ? "Edit Vehicle" : "Add Vehicle"}</h3>
//           <Formik
//             initialValues={{
//               vehicleNumber: selectedVehicle?.vehicleNumber || "",
//               vehicleName: selectedVehicle?.vehicleName || "",
//               vehicleModelNumber: selectedVehicle?.vehicleModelNumber || "",
//               puc: selectedVehicle?.puc || "",
//               accidentHistory: selectedVehicle?.accidentHistory || "",
//               carryingCapacity: selectedVehicle?.carryingCapacity || "",
//             }}
//             validationSchema={vehicleSchema}
//             onSubmit={handleSubmit}
//             enableReinitialize
//           >
//             {() => (
//               <Form>
//                 <div className="form-group">
//                   <label htmlFor="vehicleNumber">Vehicle Number</label>
//                   <Field name="vehicleNumber" id="vehicleNumber" className="form-control" />
//                   <ErrorMessage name="vehicleNumber" component="div" className="error" />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="vehicleName">Vehicle Name</label>
//                   <Field name="vehicleName" id="vehicleName" className="form-control" />
//                   <ErrorMessage name="vehicleName" component="div" className="error" />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="vehicleModelNumber">Vehicle Model Number</label>
//                   <Field name="vehicleModelNumber" id="vehicleModelNumber" className="form-control" />
//                   <ErrorMessage name="vehicleModelNumber" component="div" className="error" />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="puc">PUC</label>
//                   <Field name="puc" id="puc" className="form-control" />
//                   <ErrorMessage name="puc" component="div" className="error" />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="accidentHistory">Accident History</label>
//                   <Field name="accidentHistory" id="accidentHistory" className="form-control" />
//                   <ErrorMessage name="accidentHistory" component="div" className="error" />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="carryingCapacity">Carrying Capacity</label>
//                   <Field name="carryingCapacity" id="carryingCapacity" className="form-control" />
//                   <ErrorMessage name="carryingCapacity" component="div" className="error" />
//                 </div>
//                 <div className="form-group d-flex justify-content-center">
//                   <button type="submit" className="submit-button">
//                     {selectedVehicle ? "Update Vehicle" : "Add Vehicle"}
//                   </button>
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         </div>
//         {/* Table Card */}
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

// export default VehiclesDashBoard;





