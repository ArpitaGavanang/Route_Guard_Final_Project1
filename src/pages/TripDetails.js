
import React, { useState, useEffect, useCallback } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Layout from "../components/Layout/Layout";

// Define the validation schema based on the Trip fields
const tripSchema = Yup.object().shape({
  source: Yup.string().required("Source is required"),
  destination: Yup.string().required("Destination is required"),
  departureTime: Yup.date()
    .min(new Date(), "Departure time cannot be in the past")
    .required("Departure time is required"),
  arrivalTime: Yup.date()
    .min(Yup.ref("departureTime"), "Arrival time must be later than departure time")
    .required("Arrival time is required"),
  status: Yup.string().required("Status is required"),
  driver: Yup.number().required("Driver is required"),
  vehicle: Yup.number().required("Vehicle is required"),
});

const TripDetails = () => {
  const [rowData, setRowData] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  const token = localStorage.getItem("jwtToken");

  const fetchTrips = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/trips/getTrips", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRowData(response.data);
    } catch (error) {
      console.error("Error fetching trip data:", error);
    }
  }, [token]);

  const fetchDrivers = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/drivers/getDrivers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDrivers(response.data);
    } catch (error) {
      console.error("Error fetching drivers:", error);
    }
  }, [token]);

  const fetchVehicles = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/vehicles/GetVehicles", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVehicles(response.data);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  }, [token]);

  useEffect(() => {
    fetchTrips();
    fetchDrivers();
    fetchVehicles();
  }, [fetchTrips, fetchDrivers, fetchVehicles]);

  const columns = [
    { headerName: "Source", field: "source", sortable: true, filter: true },
    { headerName: "Destination", field: "destination", sortable: true, filter: true },
    { headerName: "Departure Time", field: "departureTime", sortable: true, filter: true },
    { headerName: "Arrival Time", field: "arrivalTime", sortable: true, filter: true },
    { headerName: "Status", field: "status", sortable: true, filter: true },
    { headerName: "Driver", field: "driverName", sortable: true, filter: true },
    { headerName: "Vehicle", field: "vehicleName", sortable: true, filter: true },
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

  const handleSubmit = (values, { resetForm }) => {
    if (selectedTrip) {
      axios.put(`/api/trips/${selectedTrip.id}`, {
        ...values,
        driver: {
          id: values.driver
        },
        vehicle: {
          id: values.vehicle
        }
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setRowData((prevData) =>
          prevData.map((trip) =>
            trip.id === response.data.id ? response.data : trip
          )
        );
        setSelectedTrip(null);
      })
      .catch((error) => console.error("Error updating trip:", error));
    } else {
      axios.post("http://localhost:8080/api/trips/postTrip", {
        ...values,
        driver: {
          id: values.driver
        },
        vehicle: {
          id: values.vehicle
        }
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) =>
        setRowData((prevData) => [...prevData, response.data])
      )
      .catch((error) => console.error("Error adding trip:", error));
    }
    resetForm();
  };

  const handleEdit = (trip) => {
    setSelectedTrip(trip);
  };

 
  const handleDelete = async (trip) => {
    try {
      const response = await axios.delete(`/api/trips/${trip.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (response.status === 200) {
        setRowData((prevData) => prevData.filter((t) => t.id !== trip.id));
      } 
    } catch (error) {
      console.error("Error deleting trip:", error.response ? error.response.data : error.message);
    }
  };
  

  return (
    <Layout>
      <div className="trip-details">
        <h2>Trip Details</h2>

        {/* Form Card */}
        <div className="form-card">
          <h3>{selectedTrip ? "Edit Trip" : "Add Trip"}</h3>
          <Formik
            initialValues={{
              source: selectedTrip?.source || "",
              destination: selectedTrip?.destination || "",
              departureTime: selectedTrip?.departureTime || "",
              arrivalTime: selectedTrip?.arrivalTime || "",
              status: selectedTrip?.status || "",
              driver: selectedTrip?.driver?.id || "",
              vehicle: selectedTrip?.vehicle?.id || "",
            }}
            validationSchema={tripSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {() => (
              <Form>
                <div className="form-group">
                  <label htmlFor="source">Source</label>
                  <Field name="source" id="source" className="form-control" />
                  <ErrorMessage name="source" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label htmlFor="destination">Destination</label>
                  <Field name="destination" id="destination" className="form-control" />
                  <ErrorMessage name="destination" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label htmlFor="departureTime">Departure Time</label>
                  <Field name="departureTime" id="departureTime" type="date" className="form-control" />
                  <ErrorMessage name="departureTime" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label htmlFor="arrivalTime">Arrival Time</label>
                  <Field name="arrivalTime" id="arrivalTime" type="date" className="form-control" />
                  <ErrorMessage name="arrivalTime" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <Field name="status" id="status" className="form-control" />
                  <ErrorMessage name="status" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label htmlFor="driver">Driver</label>
                  <Field as="select" name="driver" id="driver" className="form-control">
                    <option value="">Select Driver</option>
                    {drivers.map(driver => (
                      <option key={driver.id} value={driver.id}>{driver.driverName}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="driver" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label htmlFor="vehicle">Vehicle</label>
                  <Field as="select" name="vehicle" id="vehicle" className="form-control">
                    <option value="">Select Vehicle</option>
                    {vehicles.map(vehicle => (
                      <option key={vehicle.id} value={vehicle.id}>{vehicle.vehicleName}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="vehicle" component="div" className="error" />
                </div>
                <button type="submit" className="btn btn-primary">
                  {selectedTrip ? "Update Trip" : "Add Trip"}
                </button>
              </Form>
            )}
          </Formik>
        </div>

        {/* Data Table */}
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

export default TripDetails;









