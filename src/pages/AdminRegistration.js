
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Card, CardContent, Typography, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import NavLinks from '../components/Navbar/NavBar';
import Footer from '../components/Footer';
import Layout from '../components/Layout/Layout';



const AdminRegistration = () => {
    const [username, setName] = useState('');
    const[email,setEmail]=useState('');
    const [role, setRole] = useState('');
    const [dob, setDob] = useState(dayjs());
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  
    const roles = ['SuperAdmin', 'Admin']; 
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError('');
  
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }
  
      try {
        const response = await axios.post('http://localhost:8080/api/admins/register', {
          username,
          email,
          role,
          dob: dob.format('YYYY-MM-DDTHH:mm:ss'), 
          address,
          password,
        });
        const emailData= await axios.post(`http://localhost:8080/api/email/send?toEmail=${email}&username=${username}&password=${password}`)
        console.log(emailData,"email data")

        if (response.status === 201) {
                  setLoading(false);
                navigate('/admin-dashBoard');
        }
      } catch (error) {
        setError('Registration failed. Please try again.');
        setLoading(false);
      }
    };
  
    return (
       <Layout> <div className="registration-container">
       <Card sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}>
         <CardContent>
           <Typography variant="h5" component="div" gutterBottom>
             Admin Registration
           </Typography>
           {error && <Typography color="error" variant="body2">{error}</Typography>}
           <form onSubmit={handleSubmit}>
             <TextField
               fullWidth
               margin="normal"
               label="UserName"
               variant="outlined"
               value={username}
               onChange={(e) => setName(e.target.value)}
               required
             />
              <TextField
               fullWidth
               margin="normal"
               label="Email"
               variant="outlined"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               required
             />
             <TextField
               select
               fullWidth
               margin="normal"
               label="Role"
               variant="outlined"
               value={role}
               onChange={(e) => setRole(e.target.value)}
               required
             >
               {roles.map((role) => (
                 <MenuItem key={role} value={role}>
                   {role}
                 </MenuItem>
               ))}
             </TextField>
             <LocalizationProvider dateAdapter={AdapterDayjs}>
               <DatePicker
                 label="Date of Birth"
                 value={dob}
                 onChange={(newValue) => setDob(newValue)}
                 //renderInput={(params) => <TextField fullWidth margin="normal" {...params} />}
                 required
               />
             </LocalizationProvider>
             <TextField
               fullWidth
               margin="normal"
               label="Address"
               variant="outlined"
               value={address}
               onChange={(e) => setAddress(e.target.value)}
               required
             />
             <TextField
               fullWidth
               margin="normal"
               label="Password"
               type="password"
               variant="outlined"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               required
             />
             <TextField
               fullWidth
               margin="normal"
               label="Confirm Password"
               type="password"
               variant="outlined"
               value={confirmPassword}
               onChange={(e) => setConfirmPassword(e.target.value)}
               required
             />
             <Button
               type="submit"
               variant="contained"
               color="primary"
               fullWidth
               disabled={loading}
               sx={{ marginTop: 2 }}
             >
               {loading ? 'Registering...' : 'Register'}
             </Button>
           </form>
         </CardContent>
       </Card>
     </div>
     </Layout>
       
       
      
    );
  };
  
  export default AdminRegistration;
  










// import React, { useState } from 'react';
// import axios from 'axios';
// import { TextField, Button, Card, CardContent, Typography, MenuItem } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import dayjs from 'dayjs';
// import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers/AdapterDayjs';
// //import './AdminRegistration.css';

// const AdminRegistration = () => {
//   const [name, setName] = useState('');
//   const [role, setRole] = useState('');
//   const [dob, setDob] = useState(dayjs());
//   const [address, setAddress] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const roles = ['SuperAdmin', 'Admin']; // Example roles, adjust as needed

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.post('/api/admin/register', {
//         name,
//         role,
//         dob: dob.format('YYYY-MM-DDTHH:mm:ss'), // Formatting date for LocalDateTime
//         address,
//         password,
//       });

//       if (response.status === 201) {
//         // Redirect to admin dashboard or login
//         navigate('/admin/dashboard');
//       }
//     } catch (error) {
//       setError('Registration failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="registration-container">
//       <Card sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}>
//         <CardContent>
//           <Typography variant="h5" component="div" gutterBottom>
//             Admin Registration
//           </Typography>
//           {error && <Typography color="error" variant="body2">{error}</Typography>}
//           <form onSubmit={handleSubmit}>
//             <TextField
//               fullWidth
//               margin="normal"
//               label="Name"
//               variant="outlined"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//             <TextField
//               select
//               fullWidth
//               margin="normal"
//               label="Role"
//               variant="outlined"
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               required
//             >
//               {roles.map((role) => (
//                 <MenuItem key={role} value={role}>
//                   {role}
//                 </MenuItem>
//               ))}
//             </TextField>
//             <LocalizationProvider dateAdapter={dayjs}>
//               <DatePicker
//                 label="Date of Birth"
//                 value={dob}
//                 onChange={(newValue) => setDob(newValue)}
//                 renderInput={(params) => <TextField fullWidth margin="normal" {...params} />}
//                 required
//               />
//             </LocalizationProvider>
//             <TextField
//               fullWidth
//               margin="normal"
//               label="Address"
//               variant="outlined"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               required
//             />
//             <TextField
//               fullWidth
//               margin="normal"
//               label="Password"
//               type="password"
//               variant="outlined"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <TextField
//               fullWidth
//               margin="normal"
//               label="Confirm Password"
//               type="password"
//               variant="outlined"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//             />
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               fullWidth
//               disabled={loading}
//               sx={{ marginTop: 2 }}
//             >
//               {loading ? 'Registering...' : 'Register'}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default AdminRegistration;
