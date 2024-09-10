// import React from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import './SuperAdminLogin.css';

// const SuperAdminLogin = () => {
//   const navigate = useNavigate();

//   const initialValues = {
//     email: '',
//     password: '',
//   };

//   const validationSchema = Yup.object({
//     email: Yup.string().email('Invalid email format').required('Email is required'),
//     password: Yup.string()
//       .min(8, 'Password must be at least 8 characters long')
//       .required('Password is required'),
//   });

//   const handleLogin = async (values, { setSubmitting }) => {
//     try {
//       const response = await axios.post('http://localhost:8080/api/superadmin/login', values);
//       const { token } = response.data;
      
//       // Store the token in localStorage
//       localStorage.setItem('superAdminToken', token);
      
//       // Navigate to the dashboard
//       navigate('/dashboard');
//     } catch (error) {
//       console.error('Login failed:', error);
//       alert('Login failed! Please check your credentials.');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h2>Super Admin Login</h2>
//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={handleLogin}
//         >
//           {({ isSubmitting }) => (
//             <Form>
//               <div className="form-group">
//                 <label htmlFor="email">Email:</label>
//                 <Field
//                   type="email"
//                   id="email"
//                   name="email"
//                   className="form-control"
//                 />
//                 <ErrorMessage name="email" component="div" className="error" />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="password">Password:</label>
//                 <Field
//                   type="password"
//                   id="password"
//                   name="password"
//                   className="form-control"
//                 />
//                 <ErrorMessage name="password" component="div" className="error" />
//               </div>
//               <button type="submit" disabled={isSubmitting}>
//                 {isSubmitting ? 'Logging in...' : 'Login'}
//               </button>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default SuperAdminLogin;

//========================================================================

// import React from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import './SuperAdminLogin.css';

// const SuperAdminLogin = () => {
//   const navigate = useNavigate();

//   const initialValues = {
//     email: '',
//     password: '',
//   };

//   const validationSchema = Yup.object({
//     email: Yup.string().email('Invalid email format').required('Email is required'),
//     password: Yup.string()
//       .min(8, 'Password must be at least 8 characters long')
//       .required('Password is required'),
//   });

//   const handleLogin = async (values, { setSubmitting }) => {
//     try {
//       const response = await axios.post('http://localhost:8080/api/superadmin/login', values);
//       const { token } = response.data;
      
//       // Store the token in localStorage
//       localStorage.setItem('superAdminToken', token);
      
//       // Navigate to the dashboard
//       navigate('/dashboard');
//     } catch (error) {
//       console.error('Login failed:', error);
//       alert('Login failed! Please check your credentials.');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h2>Super Admin Login</h2>
//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={handleLogin}
//         >
//           {({ isSubmitting }) => (
//             <Form>
//               <div className="form-group">
//                 <label htmlFor="email">Email:</label>
//                 <Field
//                   type="email"
//                   id="email"
//                   name="email"
//                   className="form-control"
//                 />
//                 <ErrorMessage name="email" component="div" className="error" />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="password">Password:</label>
//                 <Field
//                   type="password"
//                   id="password"
//                   name="password"
//                   className="form-control"
//                 />
//                 <ErrorMessage name="password" component="div" className="error" />
//               </div>
//               <button type="submit" disabled={isSubmitting}>
//                 {isSubmitting ? 'Logging in...' : 'Login'}
//               </button>
//               <div className="link-container">
//                 <button
//                   type="button"
//                   onClick={() => navigate('/admin/registration')}
//                 >
//                   Register as Admin
//                 </button>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default SuperAdminLogin;

import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './SuperAdminLogin.css';
import { myaxios } from '../services/helper';

const SuperAdminLogin = () => {
  const navigate = useNavigate();

  const initialValues = {
    id: '',
    password: '',
  };

  const validationSchema = Yup.object({
    id: Yup.string().required('ID is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .required('Password is required'),
  });

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('http://localhost:8080/api/superadmins/SuperAdminlogin', values);
      const { token,role } = response.data;
      console.log(response,"response")
      // Store the token in localStorage
      if(token){
        localStorage.setItem('token', token);
        localStorage.setItem("role",role);
      }
    if(response.status===200){
      navigate('/admin/registration');
    }
     
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed! Please check your credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='bg-Img'>
<div className="login-container">
      <div className="login-box">
        <h2>Super Admin Login</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="id">ID:</label>
                <Field
                  type="text"
                  id="id"
                  name="id"
                  className="form-control"
                />
                <ErrorMessage name="id" component="div" className="error" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                />
                <ErrorMessage name="password" component="div" className="error" />
              </div>
              <button className="btn btn-dark mb-2" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
              {/* <div className="link-container">
                <button
                  type="button"
                  className="btn btn-primary mb-2"
                  onClick={() => navigate('/admin/registration')}
                >
                  Register as Admin
                </button>
              </div> */}
            </Form>
          )}
        </Formik>
      </div>
    </div>
    </div>
    
  );
};

export default SuperAdminLogin;
