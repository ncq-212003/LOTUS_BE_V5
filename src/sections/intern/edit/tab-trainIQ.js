import { Box, Grid, Stack, Typography, TextField, Autocomplete } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { useApp } from "src/hooks/use-app";
import { HANDLERS_INTERN } from "src/contexts/reducer/intern/reducer-intern";

export default function TabTrainIQ() {
  const tab = "daoTao";
  const [state, dispatch] = useApp();
  const { intern } = state;
  const { daoTao } = intern;
  const { maLop, chuNhiemLop, soDienThoaiChuNhiemLop, ngayKhaiGiang, ngayKetThuc } = daoTao;

  const handleChange = (event, fieldName) => {
    const newValue = event.target.value;
    dispatch({
      type: HANDLERS_INTERN.SET_INPUT_INTERN,
      payload: { tab, fieldName, newValue },
    });
  };

  const handleChangeSelect = (event, fieldName, newValue) => {
    dispatch({
      type: HANDLERS_INTERN.SET_INPUT_INTERN,
      payload: { tab, fieldName, newValue },
    });
  };

  const handleChangeDate = (value, fieldName) => {
    const newValue = value;
    dispatch({
      type: HANDLERS_INTERN.SET_INPUT_INTERN,
      payload: { tab, fieldName, newValue },
    });
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
                onChange={(event, newValue) => handleChangeSelect(event, "maLop", newValue)}
                value={maLop}
                name="maLop"
                sx={{ margin: "4px", marginTop: "12px" }}
                fullWidth
                size="small"
                options={["Không lựa chọn", "A", "B"]}
                renderInput={(params) => (
                  <TextField variant="outlined" {...params} label="Danh sách lớp" />
                )}
              />
              <TextField
                disabled
                onChange={(event, newValue) => handleChangeSelect(event, "chuNhiemLop", newValue)}
                value={chuNhiemLop}
                name="chuNhiemLop"
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Chủ nhiệm"
                fullWidth
                variant="outlined"
              />
              <TextField
                disabled
                onChange={(event) => handleChange(event, "soDienThoaiChuNhiemLop")}
                value={soDienThoaiChuNhiemLop}
                name="soDienThoaiChuNhiemLop"
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
                    disabled
                    onChange={(value) => handleChangeDate(value, "ngayKhaiGiang")}
                    value={ngayKhaiGiang}
                    name="ngayKhaiGiang"
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
                    disabled
                    onChange={(value) => handleChangeDate(value, "ngayKetThuc")}
                    value={ngayKetThuc}
                    name="ngayKetThuc"
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
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}
