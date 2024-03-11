import {
    Grid,
    Stack,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Autocomplete,
    TextField,
    Button
  } from "@mui/material";
  
  const companies = [
    { value: 1, label: "Công ty Apple" },
    { value: 2, label: "Công ty Apple" },
    { value: 3, label: "Công ty Apple " },
    { value: 4, label: "Công ty Samsung" },
    { value: 5, label: "Công ty Samsung " },
    { value: 6, label: "Công ty Game" },
  ];
  const location = [
      { value: 1, label: "Trong nước" },
      { value: 2, label: "Nhật Bản" },
      { value: 3, label: "Hàn Quốc" }
    ];
  export default function LanguageSettingAdd() {
    return (
      <>
        <Stack spacing={3} >
          <Grid container justifyContent={'center'}>
            <Grid item xs={8}>
               <TextField
                fullWidth
                label="KeyItem "
                variant="filled"
                sx={{ margin: "4px", marginTop: "12px" }}
              />
               <TextField
                fullWidth
                label="Value Vi"
                variant="filled"
                sx={{ margin: "4px", marginTop: "12px" }}
              />
               <TextField
                fullWidth
                label="Value En "
                variant="filled"
                sx={{ margin: "4px", marginTop: "12px" }}
              />
              <TextField
                fullWidth
                label="Value Jp "
                variant="filled"
                sx={{ margin: "4px", marginTop: "12px" }}
              />
            <Button variant="contained" fullWidth  sx={{ margin: "4px", marginTop: "64px" }}>Thêm ngôn ngữ</Button>
            </Grid>
          </Grid>
        </Stack>
      </>
    );
  }
  