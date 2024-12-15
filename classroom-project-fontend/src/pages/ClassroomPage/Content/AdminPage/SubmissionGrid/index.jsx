import React from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { Avatar, Chip } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";

const SubmissionGrid = ({
  userSubmission,
  assignment,
  loading,
  handleUserClick,
}) => {
  const dueDate = new Date(assignment.dueDate);

  const rows = userSubmission.map((submission) => {
    const submissionDate = new Date(submission.createdAt);
    const isLate = submissionDate > dueDate;

    return {
      id: submission.User.id,
      name: submission.User.name,
      avatar: submission.User.avatar,
      content: submission.content,
      createdAt: submissionDate,
      isLate,
    };
  });

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
    { field: "name", headerName: "Name", width: 150 },
    {
      field: "createdAt",
      headerName: "Submitted At",
      width: 400,
    },
    {
      field: "isLate",
      headerName: "Status",
      width: 150,
      renderCell: (params) =>
        params.value ? (
          <Chip label="Late" color="error" />
        ) : (
          <Chip label="On Time" color="success" />
        ),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 150,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<ImageIcon />}
          label="View"
          onClick={() => handleUserClick(params.row.id)}
          color="primary"
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
      rows={rows}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      getRowId={(row) => row.id}
      disableSelectionOnClick
      loading={loading}
      slots={{
        toolbar: CustomToolbar,
      }}
      sx={{ height: 400 }}
    />
  );
};

export default SubmissionGrid;
