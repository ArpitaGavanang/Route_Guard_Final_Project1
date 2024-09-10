import React, { useState, useEffect } from 'react';
import { getAllCustomers } from '../services/user-services';
import { formatCustomerData } from '../helpers/customer-helpers'; // Import the helper function
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const CustomersTable = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      let data = await getAllCustomers();
      data = formatCustomerData(data); // Use the helper function to format data
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  return (
    <Container maxWidth="lg" className="customers-table-container" data-aos="zoom-in-down">
      <Typography variant="h4" gutterBottom>
        Registered Customers
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Company Address</TableCell>
              <TableCell>GST Number</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Established Date</TableCell>
              <TableCell>Created By</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.id}</TableCell>
                <TableCell>{customer.companyName}</TableCell>
                <TableCell>{customer.companyAddress}</TableCell>
                <TableCell>{customer.gstNumber}</TableCell>
                <TableCell>{customer.phoneNumber}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.establishedDate}</TableCell>
                <TableCell>{customer.createdBy}</TableCell>
                <TableCell>{customer.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default CustomersTable;