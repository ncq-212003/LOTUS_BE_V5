import { Box, TextField, Autocomplete, Typography, Grid } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/en-gb";
import React from "react";
import { useApp } from "src/hooks/use-app";
import { HANDLERS_INTERN } from "src/contexts/reducer/intern/reducer-intern";

export default function TabProfile() {
  const [state, dispatch] = useApp();
  const { intern } = state;
  const { hoSo } = intern;

  const renderFormField = (question) => {
    const commonProps = {
      variant: "outlined",
      required: true,
      size: "small",
      fullWidth: true,
      sx: { margin: "4px", marginTop: "12px" },
    };

    const handleFieldChange = (value) => {
      const questionId = question.questionId;
      const newValue = value;

      dispatch({
        type: HANDLERS_INTERN.SET_PROFILE_FIELD,
        payload: { questionId, newValue },
      });
    };

    if (question.type === "3") {
      return (
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale={"en-gb"}
          key={question.order}
        >
          <DatePicker
            sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
            slotProps={{
              textField: {
                size: "small",
                variant: "outlined",
              },
            }}
            label={question.questionName}
            value={question.answer}
            onChange={(date) => handleFieldChange(date)}
          />
        </LocalizationProvider>
      );
    } else if (question.type === "2") {
      return (
        <Autocomplete
          {...commonProps}
          options={question.options}
          renderInput={(params) => (
            <TextField {...params} label={question.questionName} variant="outlined" />
          )}
          value={question.answer}
          onChange={(e, value) => handleFieldChange(value)}
        />
      );
    } else {
      return (
        <TextField
          label={question.questionName}
          {...commonProps}
          value={question.answer}
          onChange={(e) => handleFieldChange(e.target.value)}
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
      <Grid item xs={6}>
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
      <Grid item xs={6}>
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
