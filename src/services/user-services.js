// import { myaxios } from "./helper";

// // Define the service function for driver registration
// export const registerDriver = (driverData) => {
//     return myaxios.post("/registerDrivers/register", driverData) // Corrected the path
//         .then(response => response.data)
//         .catch(error => {
//             console.error('Error registering driver:', error);
//             throw error;
//         });
// };

// // Define the service function for customer registration
// export const registerCustomer = (customerData) => {
//     return myaxios.post('/registerCustomers/register', customerData) // Corrected the path
//         .then(response => response.data)
//         .catch(error => {
//             console.error('Error registering customer:', error);
//             throw error;
//         });
// };

// // Define the service function for adding a driver
// export const addDriver = (driverData) => {
//     return myaxios.post('/drivers/register', driverData) // Corrected the path
//         .then(response => response.data)
//         .catch(error => {
//             console.error('Error adding driver:', error);
//             throw error;
//         });
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
// export const addCustomers = (addCustomers) => {
//       return myaxios.post('/customers/addCustomer',addCustomers )
//       .then(response => response.data)
//       .catch (error => {
//       console.error('Error fetching customer data:', error);
//       throw error;
//     });
//   };

//   export const getAllCustomers = () => {
//     return myaxios.get('/customers/getCustomer')
//       .then(response => response.data)
//       .catch(error => {
//         console.error('Error fetching customers:', error);
//         throw error;
//       });
//   };
  

//   // export const getAllCustomers = async () => {
//   //   try {
//   //     const response = await myaxios.get('/customers/getCustomer');
//   //     return response.data;
//   //   } catch (error) {
//   //     console.error('Error fetching customers:', error);
//   //     throw error; // Re-throw the error so it can be handled in the component
//   //   }
//   // };

//   export const getAllDrivers = () => {
//     return myaxios.get('/drivers/getDrivers')
//       .then(response => response.data)
//       .catch(error => {
//         console.error('Error fetching drivers:', error);
//         throw error;
//       });
//   };
  

//   // export const getAllDrivers = async () => {
//   //   try {
//   //     const response = await myaxios.get('/drivers/getDrivers');
//   //     return response.data;
//   //   } catch (error) {
//   //     console.error('Error fetching drivers:', error);
//   //     throw error;
//   //   }
//   // };

//   export const addTrip = (trip) => {
//     return  myaxios.post('/trips', trip)
//       .then(response => response.data)
//       .catch(error => {
//         console.error('Error creating trip:', error);
//         throw error;
//       });
//   };

//   export const getAllTrips = () => {
//     return  myaxios.get('/trips')
//       .then(response => response.data)
//       .catch(error => {
//         console.error('Error fetching trips:', error);
//         throw error;
//       });
//   };

//   export const deleteTrip = (tripId) => {
//     return myaxios.delete(`/trips/${tripId}`)
//       .then(response => response.data)
//       .catch(error => {
//         console.error('Error deleting trip:', error);
//         throw error;
//       });
//   };

//   export const updateTrip = (tripId, tripData) => {
//     return myaxios.put(`/trips/${tripId}`, tripData)
//       .then(response => response.data)
//       .catch(error => {
//         console.error('Error updating trip:', error);
//         throw error;
//       });
//   };
  
  
//   export const getAllVehicles = () => {
//     return  myaxios.get('/api/vehicles')
//       .then(response => response.data)
//       .catch(error => {
//         console.error('Error fetching vehicles:', error);
//         throw error;
//       });
//   };
  

// // export const registerAdmin = (adminData) => {
// //     return myaxios.post('/admins/register', adminData);
// // };

// export const registerAdmin = (adminData) => {
//   return myaxios.post('/admins/register', adminData) // Adjust the path as needed
//       .then(response => response.data)
//       .catch(error => {
//           console.error('Error registering admin:', error);
//           throw error;
//       });
// };
