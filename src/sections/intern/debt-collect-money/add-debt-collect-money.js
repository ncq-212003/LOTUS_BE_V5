import {
  Autocomplete,
  Button,
  FormControl,
  Grid,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { DateTimePicker } from "@mui/x-date-pickers";

export const DebtCollectMoney = () => {
  return (
    <Stack spacing={2} sx={{ p: 2, marginTop: "64px" }}>
      <Grid container spacing={2}>
        <Box
          sx={{
            marginBottom: "16px",
            bgcolor: "#fff",
            padding: "16px",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
        >
          <Grid item xs={12} md={12}>
            <TextField
              required
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Tên đối tác "
              fullWidth
              variant="outlined"
            />

            <TextField
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Nợ đầu kì "
              fullWidth
              variant="outlined"
            />

            <TextField
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Số tiền tăng "
              fullWidth
              variant="outlined"
            />

            <TextField
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Số tiền giảm "
              fullWidth
              variant="outlined"
            />

            <TextField
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Nợ cuối kì"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Stack display="flex">
            <Box marginLeft="auto">
              <Button
                variant="contained"
                // onClick={closeAddCar}
                sx={{
                  marginTop: "30px",
                  backgroundColor: "#1C2536",
                  width: "150px",
                }}
              >
                Lưu
              </Button>
            </Box>
          </Stack>
        </Box>
      </Grid>
    </Stack >
  );
};
