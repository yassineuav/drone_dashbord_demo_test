import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { transactions } from "../../datatablesource";
import { Link } from "react-router-dom";

const Datatable = ({ transactionData , setModal}) => {

  // const handleDelete = (id) => {
  //    setData(data.filter((item) => item.id !== id));
  // };

  // console.log("data transactions : ", transactionData);

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
              onClick={() => setModal({isOpen:true, type:"delete", id:params.row.id})}
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
        rows={transactionData}
        columns={transactions.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
