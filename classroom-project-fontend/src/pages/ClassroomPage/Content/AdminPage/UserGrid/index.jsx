import React from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { Avatar, Chip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

const UserGrid = ({ usersData, loading, handleDeleteClick }) => {
  const columns = [
    {
      field: "avatar",
      headerName: "Avatar",
      width: 80,
      renderCell: (params) => <Avatar src={params.value} alt="Avatar" />,
      sortable: false,
      filterable: false,
    },
    { field: "id", headerName: "ID", width: 70 },
    { field: "username", headerName: "Username", width: 150 },
    { field: "name", headerName: "Name", width: 150 },
    {
      field: "assignmentCount",
      headerName: "Assignments",
      width: 150,
      renderCell: (params) => (
        <Chip
          label={`${params.value} Assignments`}
          color={params.value > 0 ? "primary" : "default"}
        />
      ),
    },
    {
      field: "isAdmin",
      headerName: "Admin",
      width: 100,
      renderCell: (params) =>
        params.value ? (
          <Chip label="Admin" color="success" />
        ) : (
          <Chip label="User" color="default" />
        ),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 150,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={handleDeleteClick(params.id)}
          color="error"
        />,
      ],
    },
  ];

  const CustomToolbar = () => (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );

  return (
    <DataGrid
      rows={usersData}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      getRowId={(row) => row.id}
      disableSelectionOnClick
      loading={loading}
      slots={{
        toolbar: CustomToolbar,
      }}
      sx={{ height: 600 }}
    />
  );
};

export default UserGrid;
