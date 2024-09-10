// import React, { useState, useEffect } from 'react';
// import { Formik, Form, Field } from 'formik';
// import * as Yup from 'yup';
// import { addCustomers } from '../services/user-services';
// import axios from 'axios';
// import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';

// const customerSchema = Yup.object().shape({
//     companyName: Yup.string()
//         .required('Company name is required')
//         .min(2, 'Company name must be at least 2 characters long')
//         .max(100, 'Company name cannot exceed 100 characters'),

//     companyAddress: Yup.string()
//         .required('Company address is required')
//         .min(5, 'Company address must be at least 5 characters long')
//         .max(200, 'Company address cannot exceed 200 characters'),

//     gstNumber: Yup.string()
//         .required('GST number is required')
//         .matches(/^[0-9A-Z]{15}$/, 'GST number must be exactly 15 alphanumeric characters'),

//     phoneNumber: Yup.string()
//         .required('Phone number is required')
//         .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),

//     email: Yup.string()
//         .email('Invalid email address')
//         .required('Email is required'),

//     establishedDate: Yup.date()
//         .required('Established date is required')
//         .max(new Date(), 'Established date cannot be in the future'),

//     createdBy: Yup.string()
//         .required('Created by is required')
//         .min(2, 'Created by must be at least 2 characters long')
//         .max(50, 'Created by cannot exceed 50 characters'),
// });

// const CustomerDetails = () => {
//     const [customers, setCustomers] = useState([]);
//     const [selectedCustomer, setSelectedCustomer] = useState(null);

//     useEffect(() => {
//         // Fetch customer data from API
//         axios.get('/api/customers/getCustomer')
//             .then(response => setCustomers(response.data))
//             .catch(error => console.error('Error fetching customer data:', error));
//     }, []);

//     const handleSubmit = (values, { resetForm }) => {
//         if (selectedCustomer) {
//             // Edit existing customer logic (PUT request)
//             axios.put(`/api/customers/${selectedCustomer.id}`, values)
//                 .then(response => {
//                     setCustomers((prevData) =>
//                         prevData.map((customer) =>
//                             customer.id === selectedCustomer.id ? response.data : customer
//                         )
//                     );
//                     setSelectedCustomer(null);
//                 })
//                 .catch(error => {
//                     console.error('Error updating customer:', error);
//                     alert('Failed to update customer. Please try again.');
//                 });
//         } else {
//             // Add new customer logic (POST request)
//             //addCustomers(values)
//             axios.post(`/api/customers/getCustomer`, values)
//                 .then(response => setCustomers(response.data))
//                 .catch((error) => {
//                     console.error('Error adding customer:', error);
//                     alert('Failed to add customer. Please try again.');
//                 });
//         }
//         resetForm();
//     };

//     const handleEdit = (customer) => {
//         setSelectedCustomer(customer);
//     };

//     const handleDelete = (customer) => {
//         if (window.confirm('Are you sure you want to delete this customer?')) {
//             // Delete customer logic (DELETE request)
//             axios.delete(`/api/customers/${customer.id}`)
//                 .then(() => {
//                     setCustomers((prevData) =>
//                         prevData.filter((c) => c.id !== customer.id)
//                     );
//                 })
//                 .catch(error => {
//                     console.error('Error deleting customer:', error);
//                     alert('Failed to delete customer. Please try again.');
//                 });
//         }
//     };

//     return (
//         <div className="customer-details">
//             <h2>Customer Details</h2>

//             {/* Form Card */}
//             <div className="form-card">
//                 <h3>{selectedCustomer ? 'Edit Customer' : 'Add Customer'}</h3>
//                 <Formik
//                     initialValues={{
//                         companyName: selectedCustomer?.companyName || '',
//                         companyAddress: selectedCustomer?.companyAddress || '',
//                         gstNumber: selectedCustomer?.gstNumber || '',
//                         phoneNumber: selectedCustomer?.phoneNumber || '',
//                         email: selectedCustomer?.email || '',
//                         establishedDate: selectedCustomer?.establishedDate || '',
//                         createdBy: selectedCustomer?.createdBy || '',
//                     }}
//                     validationSchema={customerSchema}
//                     onSubmit={handleSubmit}
//                     enableReinitialize
//                 >
//                     {({ errors, touched }) => (
//                         <Form>
//                             <div className="form-group">
//                                 <label htmlFor="companyName">Company Name</label>
//                                 <Field name="companyName" className="form-control" />
//                                 {errors.companyName && touched.companyName ? (
//                                     <div className="error">{errors.companyName}</div>
//                                 ) : null}
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor="companyAddress">Company Address</label>
//                                 <Field name="companyAddress" className="form-control" />
//                                 {errors.companyAddress && touched.companyAddress ? (
//                                     <div className="error">{errors.companyAddress}</div>
//                                 ) : null}
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor="gstNumber">GST Number</label>
//                                 <Field name="gstNumber" className="form-control" />
//                                 {errors.gstNumber && touched.gstNumber ? (
//                                     <div className="error">{errors.gstNumber}</div>
//                                 ) : null}
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor="phoneNumber">Phone Number</label>
//                                 <Field name="phoneNumber" className="form-control" />
//                                 {errors.phoneNumber && touched.phoneNumber ? (
//                                     <div className="error">{errors.phoneNumber}</div>
//                                 ) : null}
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor="email">Email</label>
//                                 <Field name="email" type="email" className="form-control" />
//                                 {errors.email && touched.email ? (
//                                     <div className="error">{errors.email}</div>
//                                 ) : null}
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor="establishedDate">Established Date</label>
//                                 <Field name="establishedDate" type="date" className="form-control" />
//                                 {errors.establishedDate && touched.establishedDate ? (
//                                     <div className="error">{errors.establishedDate}</div>
//                                 ) : null}
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor="createdBy">Created By</label>
//                                 <Field name="createdBy" className="form-control" />
//                                 {errors.createdBy && touched.createdBy ? (
//                                     <div className="error">{errors.createdBy}</div>
//                                 ) : null}
//                             </div>
//                             <div className="form-group d-flex justify-content-center">
//                                 <button type="submit" className="submit-button">
//                                     {selectedCustomer ? 'Update Customer' : 'Add Customer'}
//                                 </button>
//                                 //form-group
//                             </div>
//                         </Form>
//                     )}
//                 </Formik>
//             </div>

//             {/* Table Card */}
//             <div className="table-card">
//                 <CustomerTable customers={customers} onEdit={handleEdit} onDelete={handleDelete} />
//             </div>
//         </div>
//     );
// };

// const CustomerTable = ({ customers, handleEdit, handleDelete }) => {
//     const columns = [
//         { headerName: 'Company Name', field: 'companyName', sortable: true, filter: true },
//         { headerName: 'Company Address', field: 'companyAddress', sortable: true, filter: true },
//         { headerName: 'GST Number', field: 'gstNumber', sortable: true, filter: true },
//         { headerName: 'Phone Number', field: 'phoneNumber', sortable: true, filter: true },
//         { headerName: 'Email', field: 'email', sortable: true, filter: true },
//         { headerName: 'Established Date', field: 'establishedDate', sortable: true, filter: true },
//         { headerName: 'Created By', field: 'createdBy', sortable: true, filter: true },
//         {
//             headerName: "Actions",
//             width: 200,
//             cellRenderer: (params) => {
//                 return (
//                 <div className="actions d-flex justify-content-start gap-3">
//                     <i
//                     className="bi bi-pencil-fill"
//                     onClick={() => handleEdit(params.data)}
//                     ></i>
//                     <i
//                     className="bi bi-trash3-fill"
//                     onClick={() => handleDelete(params.data)}
//                     ></i>
//                 </div>
//                 );
//             },
//             // headerName: 'Actions',
//             // field: 'actions',
//             // width: 200,
//             // cellRendererFramework: (params) => (
//             //     <span className="actions">
//             //         <button onClick={() => onEdit(params.data)}>Edit</button>
//             //         <button onClick={() => onDelete(params.data)}>Delete</button>
//             //     </span>
//             // ),
//         },
//     ];

//     return (
//         <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
//             <AgGridReact
//                 columnDefs={columns}
//                 rowData={customers}
//                 domLayout="autoHeight"
//                 suppressRowClickSelection={true}
//             />
//         </div>
//     );
// };

// export default CustomerDetails;
































import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { addCustomers } from '../services/user-services'; // Make sure this service is defined
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
//import './CustomerDetails.css'; // Add any custom styles here

const customerSchema = Yup.object().shape({
    companyName: Yup.string()
        .required('Company name is required')
        .min(2, 'Company name must be at least 2 characters long')
        .max(100, 'Company name cannot exceed 100 characters'),

    companyAddress: Yup.string()
        .required('Company address is required')
        .min(5, 'Company address must be at least 5 characters long')
        .max(200, 'Company address cannot exceed 200 characters'),

    gstNumber: Yup.string()
        .required('GST number is required')
        .matches(/^[0-9A-Z]{15}$/, 'GST number must be exactly 15 alphanumeric characters'),

    phoneNumber: Yup.string()
        .required('Phone number is required')
        .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),

    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),

    establishedDate: Yup.date()
        .required('Established date is required')
        .max(new Date(), 'Established date cannot be in the future'),

    createdBy: Yup.string()
        .required('Created by is required')
        .min(2, 'Created by must be at least 2 characters long')
        .max(50, 'Created by cannot exceed 50 characters'),
});

const CustomerDetails = () => {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    useEffect(() => {
        // Fetch customer data from API
        axios.get('/api/customers')
            .then(response => setCustomers(response.data))
            .catch(error => console.error('Error fetching customer data:', error));
    }, []);

    const handleSubmit = (values, { resetForm }) => {
        if (selectedCustomer) {
            // Edit existing customer logic
            setCustomers((prevData) =>
                prevData.map((customer) =>
                    customer.email === selectedCustomer.email ? values : customer
                )
            );
            setSelectedCustomer(null);
        } else {
            // Add new customer logic
            addCustomers(values)
                .then((newCustomer) => {
                    setCustomers((prevData) => [...prevData, newCustomer]);
                })
                .catch((error) => {
                    console.error('Error adding customer:', error);
                    alert('Failed to add customer. Please try again.');
                });
        }
        resetForm();
    };

    const handleEdit = (customer) => {
        setSelectedCustomer(customer);
    };

    const handleDelete = (customer) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            setCustomers((prevData) =>
                prevData.filter((c) => c.email !== customer.email)
            );
        }
    };

    const columns = [
        { headerName: 'Company Name', field: 'companyName', sortable: true, filter: true },
        { headerName: 'Company Address', field: 'companyAddress', sortable: true, filter: true },
        { headerName: 'GST Number', field: 'gstNumber', sortable: true, filter: true },
        { headerName: 'Phone Number', field: 'phoneNumber', sortable: true, filter: true },
        { headerName: 'Email', field: 'email', sortable: true, filter: true },
        { headerName: 'Established Date', field: 'establishedDate', sortable: true, filter: true },
        { headerName: 'Created By', field: 'createdBy', sortable: true, filter: true },
        {
            headerName: 'Actions',
            field: 'actions',
            width: 200,
            cellRendererFramework: (params) => (
                <span className="actions">
                    <button onClick={() => handleEdit(params.data)}>Edit</button>
                    <button onClick={() => handleDelete(params.data)}>Delete</button>
                </span>
            ),
        },
    ];

    return (
        <div className="customer-details">
            <h2>Customer Details</h2>

            {/* Form Card */}
            <div className="form-card">
                <h3>{selectedCustomer ? 'Edit Customer' : 'Add Customer'}</h3>
                <Formik
                    initialValues={{
                        companyName: selectedCustomer?.companyName || '',
                        companyAddress: selectedCustomer?.companyAddress || '',
                        gstNumber: selectedCustomer?.gstNumber || '',
                        phoneNumber: selectedCustomer?.phoneNumber || '',
                        email: selectedCustomer?.email || '',
                        establishedDate: selectedCustomer?.establishedDate || '',
                        createdBy: selectedCustomer?.createdBy || '',
                    }}
                    validationSchema={customerSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({ errors, touched }) => (
                        <Form>
                            <div className="form-group">
                                <label htmlFor="companyName">Company Name</label>
                                <Field name="companyName" className="form-control" />
                                {errors.companyName && touched.companyName ? (
                                    <div className="error">{errors.companyName}</div>
                                ) : null}
                            </div>
                            <div className="form-group">
                                <label htmlFor="companyAddress">Company Address</label>
                                <Field name="companyAddress" className="form-control" />
                                {errors.companyAddress && touched.companyAddress ? (
                                    <div className="error">{errors.companyAddress}</div>
                                ) : null}
                            </div>
                            <div className="form-group">
                                <label htmlFor="gstNumber">GST Number</label>
                                <Field name="gstNumber" className="form-control" />
                                {errors.gstNumber && touched.gstNumber ? (
                                    <div className="error">{errors.gstNumber}</div>
                                ) : null}
                            </div>
                            <div className="form-group">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <Field name="phoneNumber" className="form-control" />
                                {errors.phoneNumber && touched.phoneNumber ? (
                                    <div className="error">{errors.phoneNumber}</div>
                                ) : null}
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Field name="email" type="email" className="form-control" />
                                {errors.email && touched.email ? (
                                    <div className="error">{errors.email}</div>
                                ) : null}
                            </div>
                            <div className="form-group">
                                <label htmlFor="establishedDate">Established Date</label>
                                <Field name="establishedDate" type="date" className="form-control" />
                                {errors.establishedDate && touched.establishedDate ? (
                                    <div className="error">{errors.establishedDate}</div>
                                ) : null}
                            </div>
                            <div className="form-group">
                                <label htmlFor="createdBy">Created By</label>
                                <Field name="createdBy" className="form-control" />
                                {errors.createdBy && touched.createdBy ? (
                                    <div className="error">{errors.createdBy}</div>
                                ) : null}
                            </div>
                            <div className="form-group">
                                <button type="submit" className="submit-button">
                                    {selectedCustomer ? 'Update Customer' : 'Add Customer'}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>

            {/* Table Card */}
            <div className="table-card">
                <CustomerTable customers={customers} onEdit={handleEdit} onDelete={handleDelete} />
            </div>
        </div>
    );
};

const CustomerTable = ({ customers, onEdit, onDelete }) => {
    const columns = [
        { headerName: 'Company Name', field: 'companyName', sortable: true, filter: true },
        { headerName: 'Company Address', field: 'companyAddress', sortable: true, filter: true },
        { headerName: 'GST Number', field: 'gstNumber', sortable: true, filter: true },
        { headerName: 'Phone Number', field: 'phoneNumber', sortable: true, filter: true },
        { headerName: 'Email', field: 'email', sortable: true, filter: true },
        { headerName: 'Established Date', field: 'establishedDate', sortable: true, filter: true },
        { headerName: 'Created By', field: 'createdBy', sortable: true, filter: true },
        {
            headerName: 'Actions',
            field: 'actions',
            width: 200,
            cellRendererFramework: (params) => (
                <span className="actions">
                    <button onClick={() => onEdit(params.data)}>Edit</button>
                    <button onClick={() => onDelete(params.data)}>Delete</button>
                </span>
            ),
        },
    ];

    return (
        <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
            <AgGridReact
                columnDefs={columns}
                rowData={customers}
                domLayout="autoHeight"
                suppressRowClickSelection={true}
            />
        </div>
    );
};

export default CustomerDetails;
