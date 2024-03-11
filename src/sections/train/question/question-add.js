import React, { useState, useEffect } from "react";
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
import { Add } from "@mui/icons-material";
import { PlusIcon } from "@heroicons/react/24/solid";
import DeleteIcon from "@mui/icons-material/Delete";
import { SvgIcon } from "@mui/material";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/router";

export const AddQuestion = () => {
  const [selectedAnswer, setSelectedAnswer] = useState();
  const [editorValue, setEditorValue] = useState("");
  const [editorAnswerValue, setEditorAnswerValue] = useState([]);
  const [lines, setLines] = useState([1]);
  const router = useRouter();
  const { tenbaithi } = router.query;

  const addRows = () => {
    setLines((prevLines) => [...prevLines, prevLines.length + 1]);
    setEditorAnswerValue((prevValues) => [...prevValues, ""]);
  };

  const deleteRow = (rowIndex) => {
    setLines((prevLines) => prevLines.filter((line, index) => index !== rowIndex));
    setEditorAnswerValue((prevValues) => prevValues.filter((value, index) => index !== rowIndex));
  };

  const handleEditorChange = (value, index) => {
    const updatedEditorAnswerValue = [...editorAnswerValue];
    updatedEditorAnswerValue[index] = value;
    setEditorAnswerValue(updatedEditorAnswerValue);
  };
  const handleAnswerChange = (event, newValue) => {
    setSelectedAnswer(newValue);
  };

  const typeAnswer = [
    { value: 1, label: "Trắc nghiệm một lựa chọn" },
    { value: 2, label: "Trắc nghiệm nhiều lựa chọn" },
    { value: 3, label: "Tự luận" },
  ];

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
        <Autocomplete
          fullWidth
          size="small"
          value={selectedAnswer}
          onChange={handleAnswerChange}
          options={typeAnswer}
          renderInput={(params) => <TextField {...params} label="Loại câu hỏi" />}
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
};
