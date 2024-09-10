// CustomerTable.js
import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const CustomerTable = ({ customers }) => {
  // Define column definitions for AG Grid
  const columns = [
    { headerName: 'ID', field: 'id' },
    { headerName: 'Company Name', field: 'companyName' },
    { headerName: 'Address', field: 'companyAddress' },
    { headerName: 'GST Number', field: 'gstNumber' },
    { headerName: 'Phone Number', field: 'phoneNumber' },
    { headerName: 'Email', field: 'email' },
    { headerName: 'Established Date', field: 'establishedDate', valueFormatter: params => new Date(params.value).toLocaleDateString() },
    { headerName: 'Created At', field: 'createdAt', valueFormatter: params => new Date(params.value).toLocaleDateString() },
    { headerName: 'Modified At', field: 'modifiedAt', valueFormatter: params => params.value ? new Date(params.value).toLocaleDateString() : '-' },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: '600px', width: '100%' }}>
      <AgGridReact
        columnDefs={columns}
        rowData={customers}
        pagination
        paginationPageSize={10}
      />
    </div>
  );
};

export default CustomerTable;
