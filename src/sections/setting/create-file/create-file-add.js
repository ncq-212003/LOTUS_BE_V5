import * as React from "react";
import { useEffect, useState } from "react";
import { TextField, Grid, Stack, Box, Autocomplete, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import SnackbarAlert from "src/components/action-notification";

export default function CreateFileAdd() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [position, setPosision] = useState("");
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Stack spacing={3} sx={{ p: 2, marginTop: "64px" }}>
      <Grid container spacing={2}>
        <Grid item sm={12} md={12} xs={12}>
          <Box
            sx={{
              padding: "16px",
              border: "1px solid #ccc",
              borderRadius: "6px",
            }}
          >
            <Autocomplete
              sx={{ marginTop: "12px" }}
              fullWidth
              size="small"
              options={["Thực tập sinh", "Du học sinh"]}
              onChange={(_, newValue) => {
                setPosision(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  label="Vị trí"
                />
              )}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                width: "100%",
                marginTop: "20px",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#1C2536",
                  // width: "100px",
                }}
                // onClick={formik.handleSubmit}
              >
                Tạo
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <SnackbarAlert
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleCloseSnackbar}
      />
    </Stack>
  );
}
