import { Box, TextField, Autocomplete, Typography, Grid } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/en-gb";
import React from "react";
import { useApp } from "src/hooks/use-app";
import { HANDLERS_INTERN } from "src/contexts/reducer/intern/reducer-intern";
import dayjs from "dayjs";

export default function TabProfile() {
  const [state, dispatch] = useApp();
  const { intern } = state;
  const { hoSo } = intern;

  const renderFormField = (question) => {
    const { questionId, questionName, type, options, answer } = question;
    const fieldName = questionName;

    return (
      <Typography
        variant="body1"
        sx={{
          marginBottom: "16px",
        }}
      >
        <span style={{ fontWeight: "bold" }}>{questionName}:</span> {answer}
      </Typography>
    );
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
              <Typography
                variant="h6"
                component="h2"
                sx={{ marginBottom: "16px" }}
                textAlign="center"
              >
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
              <Typography
                variant="h6"
                component="h2"
                sx={{ marginBottom: "16px" }}
                textAlign="center"
              >
                <br/>
                {category}
              </Typography>
              {fields}
            </Box>
          ))}
      </Grid>
    </Grid>
  );
}
