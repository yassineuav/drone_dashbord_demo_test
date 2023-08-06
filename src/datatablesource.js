export const transactions = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "from",
    headerName: "Transaction From",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {/* <img className="cellImg" src={params.row.img} alt="avatar" /> */}
          {params.row.from}
        </div>
      );
    },
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 110,
  },
  {
    field: "type",
    headerName: "Type",
    width: 120,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.type}`}>
          {params.row.type}
        </div>
      );
    },
  },
  {
    field: "timestamp",
    headerName: "Date",
    width: 160,
  },

];

//temporary data
export const userRows = [
  {
    id: 1,
    from: "full time job Tesla",
    type: "active",
    amount: 1000,
    timestamp: "12/12/2022 00:00",
  },

];


export const tableHeadDrone = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "status",
    headerName: "status",
    width: 80,
    // renderCell: (params) => {
    //   return (
    //     <div className={`cellWithStatus ${params.row.type}`}>
    //       {params.row.type}
    //     </div>
    //   );
    // },
  },
  {
    field: "battery",
    headerName: "battery",
    width: 80,
  },
  {
    field: "weight",
    headerName: "weight",
    width: 110,
  },
  {
    field: "distance",
    headerName: "distance",
    width: 110,
  },
  {
    field: "updated_at",
    headerName: "last update",
    width: 160,
  },

];
