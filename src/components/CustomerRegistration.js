import React from 'react';
import { TextField, Button, Container, Typography, Card, CardContent } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { registerCustomer } from '../services/user-services';
import Layout from './Layout/Layout';

const validationSchema = Yup.object({
  companyName:   Yup.string()
  .matches(/^[A-Za-z\s]+$/, 'Company Name can only contain letters and spaces')
  .required('Company Name is required'),
  companyAddress: Yup.string().required('Company Address is required'),
  gstNumber: Yup.string()
    .matches(/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/, 'Invalid GST Number')
    .required('GST Number is required'),
  phoneNumber: Yup.string()
    .matches(/^[6-9]\d{9}$/, 'Invalid phone number')
    .required('Phone Number is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  establishedDate: Yup.date().required('Established Date is required'),
  createdBy: Yup.string().required('Created By is required'),
  createdAt: Yup.date().required('Created At is required'),
});

const CustomerRegistration = () => {
  const initialValues = {
    companyName: '',
    companyAddress: '',
    gstNumber: '',
    phoneNumber: '',
    email: '',
    establishedDate: '',
    createdBy: '',
    createdAt: '',
  };

  const handleSubmit = async (values, { setSubmitting, resetForm, setErrors }) => {
    try {
      const response = await registerCustomer(values);

      if (response) {
        console.log('Registration successful');
        resetForm();
      }
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout> 
      <Container maxWidth="sm" className="registration-container" data-aos="zoom-in-down">
    <Card sx={{ padding: 2 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Customer Registration
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              {errors.submit && <Typography color="error">{errors.submit}</Typography>}
              
              <Field
                as={TextField}
                label="Company Name"
                name="companyName"
                fullWidth
                margin="normal"
                required
                helperText={<ErrorMessage name="companyName" component="div" style={{ color: 'red' }} />}
              />
              
              <Field
                as={TextField}
                label="Company Address"
                name="companyAddress"
                fullWidth
                margin="normal"
                required
                helperText={<ErrorMessage name="companyAddress" component="div" style={{ color: 'red' }} />}
              />
              
              <Field
                as={TextField}
                label="GST Number"
                name="gstNumber"
                fullWidth
                margin="normal"
                required
                helperText={<ErrorMessage name="gstNumber" component="div" style={{ color: 'red' }} />}
              />
              
              <Field
                as={TextField}
                label="Phone Number"
                name="phoneNumber"
                fullWidth
                margin="normal"
                required
                helperText={<ErrorMessage name="phoneNumber" component="div" style={{ color: 'red' }} />}
              />
              
              <Field
                as={TextField}
                label="Email"
                name="email"
                type="email"
                fullWidth
                margin="normal"
                required
                helperText={<ErrorMessage name="email" component="div" style={{ color: 'red' }} />}
              />
              
              <Field
                as={TextField}
                label="Established Date"
                name="establishedDate"
                type="date"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                required
                helperText={<ErrorMessage name="establishedDate" component="div" style={{ color: 'red' }} />}
              />
              
              <Field
                as={TextField}
                label="Created By"
                name="createdBy"
                fullWidth
                margin="normal"
                required
                helperText={<ErrorMessage name="createdBy" component="div" style={{ color: 'red' }} />}
              />
              
              <Field
                as={TextField}
                label="Created At"
                name="createdAt"
                type="datetime-local"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                required
                helperText={<ErrorMessage name="createdAt" component="div" style={{ color: 'red' }} />}
              />
<div className='d-flex justify-content-center'>


              <Button
                type="submit"
                variant="contained"
                color="primary"
               className='w-25'
                disabled={isSubmitting}
                sx={{ marginTop: 2 }}
              >
                {isSubmitting ? 'Registering...' : 'Register'}
              </Button>
              </div>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  </Container>
  </Layout>
   
  );
};

export default CustomerRegistration;
