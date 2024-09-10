// // import axios from "axios";

// // export const BASE_URL = 'http://localhost:8080/api';

// // export const myaxios = axios.create({
// //     baseURL: BASE_URL
// // });

// import axios from "axios";

// export const BASE_URL = 'http://localhost:8080/api';

// export const myaxios = axios.create({
//     baseURL: BASE_URL,
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Basic ' + btoa('admin:password'), // Use the 'admin' username and 'password' here
//     },
// });

// export const registerDriver = (driverData) => {
//     return myaxios.post("/drivers/register", driverData)
//         .then(response => response.data)
//         .catch(error => {
//             console.error('Error registering driver:', error);
//             throw error;
//         });
// };

// // Function to register a customer
// export const registerCustomer = async (customerDetails) => {
//     try {
//       const response = await myaxios.post('/customers/customerRegister', customerDetails);
//       return response.data; // Return response data if needed
//     } catch (error) {
//       throw new Error('Registration failed. Please try again.');
//     }
//   };

//   export const addDriver = async (driverData) => {
//     try {
//         const response = await myaxios.post('/drivers/register', driverData);
//         return response.data; // Return response data if needed
//     } catch (error) {
//         throw new Error('Error adding driver. Please try again.');
//     }
// };


// // Add a new vehicle
// export const addVehicle = (vehicleData) => {
//     return myaxios.post('/vehicles/addvehicle', vehicleData)
//         .then(response => response.data)
//         .catch(error => {
//             console.error('Error adding vehicle:', error);
//             throw error;
//         });
// };



// // Function to get all customers
// export const addCustomers = async () => {
//     try {
//       const response = await myaxios.post('/customers/customerRegister');
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching customer data:', error);
//       throw error;
//     }
//   };

//   export const getAllCustomers = async () => {
//     try {
//       const response = await myaxios.get('/customers');
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching customers:', error);
//       throw error; // Re-throw the error so it can be handled in the component
//     }
//   };

//   export const addTrip = async (tripData) => {
//     try {
//       const response = await myaxios.post('/trips', tripData);
//       return response.data;
//     } catch (error) {
//       console.error('Error adding trip:', error);
//       throw error;
//     }
//   };


// // Update an existing trip
// export const updateTrip = async (tripId, tripData) => {
//   try {
//     const response = await myaxios.put(`/trips/${tripId}`, tripId);
//     return response.data;
//   } catch (error) {
//     console.error('Error updating trip:', error);
//     throw error;
//   }
// };

// // Delete a trip
// export const deleteTrip = async (tripId) => {
//   try {
//     await myaxios.delete(`/trips/${tripId}`);
//   } catch (error) {
//     console.error('Error deleting trip:', error);
//     throw error;
//   }
// };

//   export const getAllTrips = async () => {
//     try {
//       const response = await myaxios.get('/trips');
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching trips:', error);
//       throw error;
//     }
//   };
  
//   export const formatDateTime = (dateTime) => {
//     // Implementation to format date and time
//     return new Date(dateTime).toLocaleString();
//   };
  
//   export const mapTripDataForGrid = (trips) => {
//     // Implementation to map trip data for AG Grid
//     return trips.map(trip => ({
//       ...trip,
//       driverName: trip.driver ? trip.driver.name : '',
//       vehicleModel: trip.vehicle ? trip.vehicle.model : '',
//     }));
//   };
  

//   export const validateAdminRegistration = ({ username, role, dob, address, password, confirmPassword }) => {
//     if (!username) {
//         return 'Username is required';
//     }
//     if (!role) {
//         return 'Role is required';
//     }
//     if (!dob) {
//         return 'Date of Birth is required';
//     }
//     if (!address) {
//         return 'Address is required';
//     }
//     if (!password) {
//         return 'Password is required';
//     }
//     if (password.length < 8) {
//         return 'Password must be at least 8 characters';
//     }
//     if (password !== confirmPassword) {
//         return 'Passwords do not match';
//     }
//     return null;
// };

// export const registerAdmin = async (adminDetails) => {
//   try {
//       const response = await myaxios.post('http://localhost:8080/api/admins/register', adminDetails);
//       return response.data; // Return response data if needed
//   } catch (error) {
//       throw new Error('Admin registration failed. Please try again.');
//   }
// };