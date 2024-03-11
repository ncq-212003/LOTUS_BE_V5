import { Grid, TextField, Autocomplete, Button } from "@mui/material";
import { Stack } from "@mui/system";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useState } from "react";

const StationFrom = [
  { id: 1, label: "Sân bay Tân Sơn nhất" },
  { id: 2, label: "Sân bay Đà Nẵng" },
  { id: 3, label: "Sân bay Hn" },
];
const StationTo = [
  { id: 1, label: "Narita" },
  { id: 2, label: "Narita 1" },
  { id: 3, label: "Narita 2" },
];
export default function flightChedulesAdd() {
  const [selectedFightTime, setSelectedFightTime] = useState(null);
  const [selectedFlightTimeArrives, setselectedFlightTimeArrives] = useState(null);

  const handleFightTime = (date) => {
    setSelectedFightTime(date);
  };

  const handleFlightTimeArrives = (date) => {
    setselectedFlightTimeArrives(date);
  };

  return (
    <>
      <Stack spacing={3} sx={{ margin: "0 auto" }}>
        <DateTimePicker
          sx={{ width: "700px" }}
          label="Chọn ngày giờ bay dự kiến"
          value={selectedFightTime}
          onChange={handleFightTime}
          renderInput={(params) => (
            <TextField variant="outlined" {...params} sx={{ margin: "4px", marginTop: "12px" }} />
          )}
        />
        <DateTimePicker
          sx={{ width: "700px" }}
          label="Chọn ngày giờ đến dự kiến"
          value={selectedFlightTimeArrives}
          onChange={handleFlightTimeArrives}
          renderInput={(params) => (
            <TextField variant="outlined" {...params} sx={{ margin: "4px", marginTop: "12px" }} />
          )}
        />
        <TextField
          variant="outlined"
          fullWidth
          label="Người phụ trách chính "
          sx={{ margin: "4px", marginTop: "12px" }}
        />
        <Autocomplete
          sx={{ margin: "4px", marginTop: "12px" }}
          options={StationFrom}
          renderInput={(params) => <TextField variant="outlined" {...params} label="Sân bay đi" />}
        />
        <Autocomplete
          sx={{ margin: "4px", marginTop: "12px" }}
          options={StationTo}
          renderInput={(params) => <TextField variant="outlined" {...params} label="Sân bay đến" />}
        />
        <TextField
          variant="outlined"
          id="filled-multiline-static"
          label="Ghi chú"
          multiline
          rows={4}
          defaultValue=""
        />
        <Button variant="contained" fullWidth sx={{ margin: "4px", marginTop: "64px" }}>
          Tạo lịch bay
        </Button>
      </Stack>
    </>
  );
}
