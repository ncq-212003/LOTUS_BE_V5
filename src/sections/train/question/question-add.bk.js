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
} from "@mui/material";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Add } from "@mui/icons-material";
import QuestionSinglePart from "./question-single-part";
import QuestionMutiplePart from "../part-question/part-question-add";

export const AddQuestion = () => {
  const [selectedExam, setSelectedExam] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState();
  const [selectedtypePartAnswer, setSelectedtypePartAnswer] = useState();

  const handletypePartAnswerChange = (event, newValue) => {
    setSelectedtypePartAnswer(newValue);
  };

  const handleExamChange = (event, newValue) => {
    setSelectedExam(newValue);
  };

  const handleAnswerChange = (event, newValue) => {
    setSelectedAnswer(newValue);
  };

  const exam = [
    { value: 1, label: "Bài 1" },
    { value: 2, label: "Bài 2" },
    { value: 3, label: "Bài 3" },
  ];

  const typeAnswer = [
    { value: 1, label: "Trắc nghiệm một lựa chọn" },
    { value: 2, label: "Trắc nghiệm nhiều lựa chọn" },
    { value: 3, label: "Tự luận" },
  ];

  // const typePartAnswer = [
  //   { value: 1, label: "Câu hỏi chia nhiều phần" },
  //   { value: 2, label: "Câu hỏi trong một phần" },
  // ];

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
        }}
      >
        <Autocomplete
          fullWidth
          size="small"
          value={selectedAnswer}
          onChange={handleAnswerChange}
          options={typeAnswer}
          renderInput={(params) => <TextField {...params} label="Loại câu hỏi" />}
        />
        <Grid container spacing={2}>
          <Grid item sm={12} md={4} xs={12}>
            <Autocomplete
              fullWidth
              size="small"
              options={typePartAnswer}
              value={selectedtypePartAnswer}
              onChange={handletypePartAnswerChange}
              renderInput={(params) => <TextField {...params} label="Lựa chọn dạng câu hỏi" />}
            />
          </Grid>
          {selectedtypePartAnswer ? (
            selectedtypePartAnswer.value === 1 ? (
              <>
                <Grid item sm={12} md={8} xs={12}>
                  <Autocomplete
                    fullWidth
                    size="small"
                    options={exam}
                    value={selectedExam}
                    onChange={handleExamChange}
                    renderInput={(params) => <TextField {...params} label="Bài thi" />}
                  />
                </Grid>
              </>
            ) : (
              <>
                <Grid item sm={12} md={4} xs={12}>
                  <Autocomplete
                    fullWidth
                    size="small"
                    value={selectedAnswer}
                    onChange={handleAnswerChange}
                    options={typeAnswer}
                    renderInput={(params) => <TextField {...params} label="Loại câu hỏi" />}
                  />
                </Grid>
                <Grid item sm={12} md={4} xs={12}>
                  <Autocomplete
                    fullWidth
                    size="small"
                    options={exam}
                    value={selectedExam}
                    onChange={handleExamChange}
                    renderInput={(params) => <TextField {...params} label="Bài thi" />}
                  />
                </Grid>
              </>
            )
          ) : null}
        </Grid>
      </Box>
      <QuestionSinglePart selectedAnswer={selectedAnswer} />

      {selectedtypePartAnswer ? (
        selectedtypePartAnswer.value === 1 ? (
          <QuestionMutiplePart />
        ) : (
          <QuestionSinglePart selectedAnswer={selectedAnswer} />
        )
      ) : null}
    </>
  );
};
