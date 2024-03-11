import { Box, TextField, Autocomplete, Typography, Grid } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/en-gb";
import React from "react";
import { useApp } from "src/hooks/use-app";
import { HANDLERS_INTERN } from "src/contexts/reducer/intern/reducer-intern";
import * as Yup from "yup";
import dayjs from "dayjs";
import { useEffect } from "react";

export function actionSetTouchedProfile(dispatch, questionId, fieldName) {
  const newValue = true;
  dispatch({
    type: HANDLERS_INTERN.SET_TOUCHED_PROFILE,
    payload: { questionId, fieldName, newValue },
  });
}

export function validateFieldProfile(dispatch, hoSo, questionId, fieldName, value) {
  const schemaObject = {};

  hoSo.forEach((question) => {
    const { required } = question;
    const fieldQuestionName = question.questionName;

    if (required === "Yes") {
      if (question.type === "1" || question.type === "2") {
        schemaObject[fieldQuestionName] = Yup.string().required(
          "Vui lòng nhập thông tin vào trường này"
        );
      } else if (question.type === "3") {
        schemaObject[fieldQuestionName] = Yup.date().typeError("Vui lòng nhập đúng định dạng");
      }
    }
  });

  let newValue;
  try {
    const fieldSchema = Yup.object().shape(schemaObject).fields[fieldName];
    if (fieldSchema) {
      fieldSchema.validateSync(value);
      newValue = null;
      dispatch({
        type: HANDLERS_INTERN.SET_ERRORS_PROFILE,
        payload: { questionId, fieldName, newValue },
      });
    }
  } catch (error) {
    newValue = error.message;
    dispatch({
      type: HANDLERS_INTERN.SET_ERRORS_PROFILE,
      payload: { questionId, fieldName, newValue },
    });
  }
}

export default function TabProfile() {
  const [state, dispatch] = useApp();
  const { intern } = state;
  const { hoSo } = intern;

  const handleBlur = (questionId, fieldName) => {
    actionSetTouchedProfile(dispatch, questionId, fieldName);
  };

  const handleFieldChange = (questionId, fieldName, newValue) => {
    actionSetTouchedProfile(dispatch, questionId, fieldName);

    dispatch({
      type: HANDLERS_INTERN.SET_PROFILE_FIELD,
      payload: { questionId, newValue },
    });

    validateFieldProfile(dispatch, hoSo, questionId, fieldName, newValue);
  };

  const handleBlurFieldChange = (questionId, fieldName, newValue) => {
    actionSetTouchedProfile(dispatch, questionId, fieldName);

    dispatch({
      type: HANDLERS_INTERN.SET_PROFILE_FIELD,
      payload: { questionId, newValue },
    });

    validateFieldProfile(dispatch, hoSo, questionId, fieldName, newValue);
  };

  const renderFormField = (question) => {
    const { questionId, questionName, type, options, answer } = question;
    const fieldName = questionName;

    const fieldError = question.errors?.[fieldName];
    const fieldTouched = question.touched?.[fieldName];

    if (type === "3" && questionName.toLowerCase().includes("ngày")) {
      return (
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale={"en-gb"}
          key={question.order}
        >
          <DatePicker
            onBlur={() => handleBlur(questionId, fieldName)}
            sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
            slotProps={{
              textField: {
                size: "small",
                variant: "outlined",
                error: fieldTouched && !!fieldError,
                helperText: fieldTouched && fieldError,
              },
            }}
            label={questionName}
            value={dayjs(answer)}
            onChange={(date) => handleFieldChange(questionId, fieldName, date)}
          />
        </LocalizationProvider>
      );
    } else if (type === "2") {
      return (
        <Autocomplete
          variant="outlined"
          required
          size="small"
          fullWidth
          sx={{ margin: "4px", marginTop: "12px" }}
          onBlur={() => handleBlur(questionId, fieldName)}
          options={options}
          renderInput={(params) => (
            <TextField
              {...params}
              label={questionName}
              variant="outlined"
              error={fieldTouched && !!fieldError}
              helperText={fieldTouched && fieldError}
            />
          )}
          value={answer || ""}
          onChange={(e, newValue) => handleFieldChange(questionId, fieldName, newValue)}
        />
      );
    } else if (type === "1") {
      //Bắt được value tương ứng của từng field
      useEffect(() => {
        document.querySelector(`[name='${questionName}']`).value = answer;
      }, []);

      return (
        <TextField
          error={fieldTouched && !!fieldError}
          helperText={fieldTouched && fieldError}
          onBlur={(e) => handleBlurFieldChange(questionId, fieldName, e.target.value)}
          label={questionName}
          variant="outlined"
          sx={{ margin: "4px", marginTop: "12px" }}
          required
          size="small"
          fullWidth
          name={questionName}
        />
      );
    }
  };

  const groupFieldsByCategory = (data) => {
    const groupedFields = {};
    data.forEach((question) => {
      const { category } = question;
      if (!groupedFields[category]) {
        groupedFields[category] = [];
      }
      groupedFields[category].push(renderFormField(question));
    });
    return groupedFields;
  };

  const groupedFields = groupFieldsByCategory(hoSo);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        {Object.entries(groupedFields)
          .slice(0, 3)
          .map(([category, fields], index) => (
            <Box
              sx={{
                padding: "16px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                marginBottom: "12px",
              }}
            >
              <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
                {category}
              </Typography>
              {fields}
            </Box>
          ))}
      </Grid>
      <Grid item xs={12} sm={6}>
        {Object.entries(groupedFields)
          .slice(3)
          .map(([category, fields], index) => (
            <Box
              sx={{
                padding: "16px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                marginBottom: "12px",
              }}
            >
              <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
                {category}
              </Typography>
              {fields}
            </Box>
          ))}
      </Grid>
    </Grid>
  );
}
