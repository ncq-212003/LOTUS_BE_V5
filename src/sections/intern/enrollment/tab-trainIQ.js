import {
  Box,
  Grid,
  Stack,
  Typography,
  TextField,
  Autocomplete,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { useApp } from "src/hooks/use-app";
import { setInputIntern } from "src/contexts/reducer/intern/reducer-intern";

export default function TabTrainIQ() {
  const tab = "trainIq";
  const [state, dispatch] = useApp();
  const { intern } = state;
  const { trainIq } = intern;
  const { classList, chairman, phoneChairman, openingDay, closingDay, description } = trainIq;

  const handleChange = (event, fieldName) => {
    dispatch(setInputIntern(tab, fieldName, event.target.value));
  };

  const handleChangeSelect = (event, fieldName, newValue) => {
    dispatch(setInputIntern(tab, fieldName, newValue));
  };

  const handleChangeDate = (value, fieldName) => {
    const formattedDate = dayjs(value).format("YYYY-MM-DD");
    dispatch(setInputIntern("yourTabName", fieldName, formattedDate));
  };
  return (
    <>
      <Stack spacing={3}>
        <Grid container spacing={2}>
          <Grid item sm={12} md={12} xs={12}>
            <Box
              sx={{
                padding: "16px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                marginBottom: "12px",
              }}
            >
              <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
                Thông tin đào tạo
              </Typography>
              <Autocomplete
                onChange={(event, newValue) => handleChangeSelect(event, "classList", newValue)}
                value={classList}
                name="classList"
                sx={{ margin: "4px", marginTop: "12px" }}
                fullWidth
                size="small"
                options={["Không lựa chọn", "A", "B"]}
                renderInput={(params) => (
                  <TextField variant="outlined" {...params} label="Danh sách lớp" />
                )}
              />
              <Autocomplete
                onChange={(event, newValue) => handleChangeSelect(event, "chairman", newValue)}
                value={chairman}
                name="chairman"
                sx={{ margin: "4px", marginTop: "12px" }}
                fullWidth
                size="small"
                options={["Không lựa chọn", "A", "B"]}
                renderInput={(params) => (
                  <TextField variant="outlined" {...params} label="Chủ nhiệm" />
                )}
              />
              <TextField
                onChange={(event) => handleChange(event, "phoneChairman")}
                value={phoneChairman}
                name="phoneChairman"
                variant="outlined"
                required
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="SĐT chủ nhiệm"
                fullWidth
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
                  <DatePicker
                    onChange={(value) => handleChangeDate(value, "openingDay")}
                    value={openingDay}
                    name="openingDay"
                    sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                    slotProps={{
                      textField: {
                        size: "small",
                        variant: "outlined",
                      },
                    }}
                    label="Ngày khai giảng"
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
                  <DatePicker
                    onChange={(value) => handleChangeDate(value, "closingDay")}
                    value={closingDay}
                    name="closingDay"
                    sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                    slotProps={{
                      textField: {
                        size: "small",
                        variant: "outlined",
                      },
                    }}
                    label="Ngày kết thúc"
                  />
                </LocalizationProvider>
              </Box>
              <TextField
                onChange={(event) => handleChange(event, "description")}
                value={description}
                name="description"
                variant="outlined"
                multiline
                rows={2}
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Ghi chú"
                fullWidth
              />
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}
