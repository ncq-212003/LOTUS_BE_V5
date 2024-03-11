import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    
  } from "@mui/material";
  import { Box } from "@mui/system";
  
  export default function PassportIssuingAgency() {
    return (
      <>
        <Stack
          spacing={3}
          sx={{
            margin: "0 auto",
          }}
        >
          <TextField
            label="Tên cơ quan "
            variant="filled"
            sx={{ margin: "4px", marginTop: "12px",minWidth:"700px"}}
          />
            <TextField
            label="Địa chỉ "
            variant="filled"
            sx={{ margin: "4px", marginTop: "12px"}}
          />
            <TextField
            label= "email"
            variant="filled"
            sx={{ margin: "4px", marginTop: "12px"}}
          />
           <TextField
          id="filled-multiline-static"
          label="Mô tả"
          multiline
          rows={4}
          defaultValue=""
          variant="filled"
        />
          <Button variant="contained" sx={{ margin: "4px", marginTop: "12px"}}>
            Thêm
          </Button>
        </Stack>
      </>
    );
  }
  