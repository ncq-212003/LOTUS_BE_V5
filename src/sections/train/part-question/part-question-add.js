import React, { useState, useEffect, useRef } from "react";
import {
  Stack,
  TextField,
  Button,
  Autocomplete,
  Grid,
  Box,
  Typography,
  FormGroup,
  Radio,
  RadioGroup,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { Checkbox, FormControlLabel } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Add } from "@mui/icons-material";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { DataGrid } from "@mui/x-data-grid";
import { PlusIcon } from "@heroicons/react/24/solid";
import { SvgIcon } from "@mui/material";

export default function QuestionSinglePart() {
  const [lines, setLines] = useState([1]);
  const [selectedAnswer, setSelectedAnswer] = useState();
  const [editorValue, setEditorValue] = useState("");
  const [rows, setRows] = useState([]); // Thêm state để lưu dữ liệu cho DataGrid
  const [editorAnswerValue, setEditorAnswerValue] = useState("");

  const columns = [
    { field: "id", headerName: "STT", width: 50 },
    { field: "answer", headerName: "Câu hỏi", width: 220 },
    { field: "typeAnswer", headerName: "Loại câu hỏi", width: 200 },
    {
      field: "Action",
      headerName: "Action",
      width: 90,
      renderCell: (params) => (
        <Button onClick={() => deleteRow(params.row.id)}>
          <DeleteIcon sx={{ color: "black" }} />
        </Button>
      ),
    },
  ];

  const typeAnswer = [
    { value: 1, label: "Trắc nghiệm một lựa chọn" },
    { value: 2, label: "Trắc nghiệm nhiều lựa chọn" },
    { value: 3, label: "Tự luận" },
  ];

  const addTextField = () => {
    setLines((prevLines) => [...prevLines, prevLines.length + 1]);
  };

  return (
    <>
      <Box
        sx={{
          bgcolor: "#fff",
          padding: "16px",
          border: "1px solid #ccc",
          borderRadius: "6px",
          marginTop: "15px",
          marginBottom: "15px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <TextField
          fullWidth
          label="Tên bài thi"
          variant="filled"
          size="small"
          sx={{ marginRight: "4px" }}
          value={tenbaithi || ""}
        />
        <TextField
          fullWidth
          label="Số phần"
          variant="filled"
          size="small"
          sx={{ marginRight: "4px" }}
          value={tenbaithi || ""}
        />
        <TextField
          fullWidth
          label="Số phần"
          variant="filled"
          size="small"
          sx={{ marginRight: "4px" }}
          value={tenbaithi || ""}
        />
      </Box>
      <Box
        sx={{
          bgcolor: "#fff",
          padding: "16px",
          border: "1px solid #ccc",
          borderRadius: "6px",
        }}
      >
        <Stack spacing={3}>
          <Grid container spacing={2}>
            <Grid item sm={12} md={12} xs={12} sx={{ marginBottom: "12px" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h5" component="h2" sx={{ margin: "20px 5px 12px" }}>
                  Câu hỏi:
                </Typography>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  sx={{
                    height: "40px",
                    width: "90px",
                    backgroundColor: "#1C2536",
                    margin: "6px 5px ",
                  }}
                >
                  Lưu
                </Button>
              </Box>
              <ReactQuill
                style={{ height: "200px" }}
                value={editorValue}
                onChange={(value) => setEditorValue(value)}
                modules={{
                  toolbar: [
                    [{ header: [1, 2, false] }],
                    ["bold", "italic", "underline"],
                    ["image", "code-block"],
                  ],
                }}
                theme="snow"
              />
            </Grid>
            <Grid
              item
              sm={12}
              md={12}
              xs={12}
              sx={{ marginLeft: "15px", borderTop: "1px solid #ccc" }}
            >
              {selectedAnswer ? (
                // One select
                selectedAnswer.value === 1 ? (
                  <Box>
                    <Typography variant="h5" component="h2" sx={{ margin: "60px 5px 0px" }}>
                      Câu trả lời:
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item sm={12} md={10} xs={12}>
                        <TableContainer>
                          <Table>
                            <TableBody>
                              <RadioGroup>
                                {lines.map((line, index) => (
                                  <TableRow key={line}>
                                    <TableCell>{index + 1}.</TableCell>
                                    <TableCell align="left" sx={{ width: "800px" }}>
                                      <ReactQuill
                                        value={editorAnswerValue[index]}
                                        onChange={(value) => handleEditorChange(value, index)}
                                        modules={{
                                          toolbar: [
                                            [{ header: [1, 2, false] }],
                                            ["bold", "italic", "underline"],
                                            ["image", "code-block"],
                                          ],
                                        }}
                                        theme="snow"
                                      />
                                    </TableCell>
                                    <TableCell align="left">
                                      <Radio size="small" value={index + 1} control={<Radio />} />
                                    </TableCell>
                                    <TableCell align="right">
                                      <Button variant="text" onClick={() => deleteRow(index)}>
                                        <DeleteIcon sx={{ color: "black" }} />
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </RadioGroup>

                              <Button
                                variant="contained"
                                sx={{
                                  width: "180px",
                                  backgroundColor: "#1C2536",
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                                onClick={addRows}
                              >
                                <Add />
                                Thêm phương án
                              </Button>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Grid>
                    </Grid>
                  </Box>
                ) : selectedAnswer.value === 2 ? (
                  // Mutiple select
                  <Box>
                    <Typography variant="h5" component="h2" sx={{ margin: "60px 5px 0px" }}>
                      Câu trả lời:
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item sm={12} md={10} xs={12}>
                        <TableContainer>
                          <Table>
                            <TableBody>
                              {lines.map((line, index) => (
                                <TableRow key={line}>
                                  <TableCell>{index + 1}.</TableCell>
                                  <TableCell align="left" sx={{ width: "800px" }}>
                                    <ReactQuill
                                      value={editorAnswerValue[index]}
                                      onChange={(value) => handleEditorChange(value, index)}
                                      modules={{
                                        toolbar: [
                                          [{ header: [1, 2, false] }],
                                          ["bold", "italic", "underline"],
                                          ["image", "code-block"],
                                        ],
                                      }}
                                      theme="snow"
                                    />
                                  </TableCell>
                                  <TableCell align="left">
                                    <FormGroup>
                                      <FormControlLabel
                                        control={
                                          <Checkbox
                                            sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                                          />
                                        }
                                      />
                                    </FormGroup>
                                  </TableCell>
                                  <TableCell align="right">
                                    <Button variant="text" onClick={() => deleteRow(index)}>
                                      <DeleteIcon sx={{ color: "black" }} />
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}

                              <Button variant="text" onClick={addRows}>
                                <Add />
                              </Button>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Grid>
                    </Grid>
                  </Box>
                ) : null
              ) : (
                ""
              )}
            </Grid>
          </Grid>
          <Stack justifyContent={"center"}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                sx={{
                  width: "10%",
                  backgroundColor: "#1C2536",
                }}
              >
                Lưu
              </Button>
            </Box>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}
