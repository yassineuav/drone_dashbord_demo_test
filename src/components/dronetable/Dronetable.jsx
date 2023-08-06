import React from 'react'
import "./Dronetable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { tableHeadDrone } from "../../datatablesource";
import { Link } from 'react-router-dom';

const Dronetable = ({data}) => {
    const actionColumn = [
        {
          field: "action",
          headerName: "Action",
          width: 200,
          renderCell: (params) => {
            return (
              <div className="cellAction">
                <Link to="/transaction/edit/:id" style={{ textDecoration: "none" }}>
                  <div className="viewButton">Edit</div>
                </Link>
                <div
                  className="deleteButton"
                  onClick={() => {}}
                >
                  Delete
                </div>
              </div>
            );
          },
        },
      ];
  return (
    <div className="datatable">
    {/* <div className="datatableTitle">
      List of Transactions
      <Link to="/users/new" className="link">
        Add Transaction
      </Link>
    </div> */}
    <DataGrid
      className="datagrid"
      rows={data}
      columns={tableHeadDrone.concat(actionColumn)}
      pageSize={9}
      rowsPerPageOptions={[9]}
      
    />
  </div>
  )
}

export default Dronetable
