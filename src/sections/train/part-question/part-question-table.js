import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Autocomplete, Box, TextField, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export const TableQuestion = () => {
  const initialRows = [
    {
      id: 1,
      question: "Câu hỏi số 1",
      answers: [
        { value: 1, label: "1.Câu trả lời A1" },
        { value: 2, label: "2.Câu trả lời B1" },
      ],
      correctAnswer: "1.Câu trả lời A1",
    },
    {
      id: 2,
      question: "Câu hỏi số 2",
      answers: [
        { value: 1, label: "1.Câu trả lời A2" },
        { value: 2, label: "2.Câu trả lời B2" },
        { value: 3, label: "3.Câu trả lời C2" },
        { value: 4, label: "4.Câu trả lời D2" },
      ],
      correctAnswer: "3.Câu trả lời C2",
    },
    {
      id: 3,
      question: "Câu hỏi số 3",
      answers: [
        { value: 1, label: "1.Câu trả lời A3" },
        { value: 2, label: "2.Câu trả lời B3" },
        { value: 3, label: "3.Câu trả lời C3" },
        { value: 4, label: "4.Câu trả lời D3" },
      ],
      correctAnswer: "3.Câu trả lời B3",
    },
    {
      id: 4,
      question: "Câu hỏi số 4",
      answers: [
        { value: 1, label: "1.Câu trả lời A4" },
        { value: 2, label: "2.Câu trả lời B4" },
        { value: 3, label: "3.Câu trả lời C4" },
        { value: 4, label: "4.Câu trả lời D4" },
      ],
      correctAnswer: "1.Câu trả lời A4",
    },
  ];
  const [rows, setRows] = useState(initialRows);
  const [selectionModel, setSelectionModel] = useState([]);
  const cellStyle = {
    border: "1px solid #ccc",
    padding: "8px", // Tuỳ chỉnh padding nếu cần
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "question", headerName: "Câu hỏi", width: 300 },
    {
      field: "answers",
      headerName: "Câu trả lời",
      width: 300,
      renderCell: (params) => (
        <TextField
          fullWidth
          multiline
          variant="standard"
          value={params.row.answers.map((answer) => answer.label).join("\n")}
          onChange={(e) => {
            const newAnswers = e.target.value.split("\n").map((label, index) => ({
              value: index + 1,
              label: label.trim(),
            }));
            params.api.updateRow(params.id, { ...params.row, answers: newAnswers });
          }}
        />
      ),
    },
    { field: "correctAnswer", headerName: "Đáp án đúng", width: 150 },
    {
      field: "Action",
      headerName: "",
      width: 90,
      renderCell: (params) => (
        <Button onClick={() => deleteRow(params.row.id)}>
          <DeleteIcon sx={{ color: "black" }} />
        </Button>
      ),
    },
  ];

  const handleSelectionModelChange = (newSelectionModel) => {
    setSelectionModel(newSelectionModel);
  };

  return (
    <Box
      sx={{
        bgcolor: "#fff",
        padding: "16px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        marginTop: "15px",
        marginBottom: "15px",
      }}
    >
      <DataGrid
        rows={rows}
        getRowHeight={() => 'auto'}
        columns={columns}
        selectionModel={selectionModel}
        onSelectionModelChange={handleSelectionModelChange}
      />
    </Box>
  );
};
