import {
  Box,
  Grid,
  Stack,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { setInputIntern } from "src/contexts/reducer/intern/reducer-intern";
import { useApp } from "src/hooks/use-app";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function TabProfile() {
  const tab = "profile";
  const [state, dispatch] = useApp();
  const { intern } = state;
  const { profile } = intern;
  const { market, wantToGoToSchool, admissionSchool, major, semester, schoolLevel, exitGroup } =
    profile;

  const handleChange = (event, fieldName) => {
    dispatch(setInputIntern(tab, fieldName, event.target.value));
  };

  const handleChangeSelect = (event, fieldName, newValue) => {
    dispatch(setInputIntern(tab, fieldName, newValue));
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
                Thông tin trường học
              </Typography>
              <Autocomplete
                onChange={(event, newValue) => handleChangeSelect(event, "market", newValue)}
                value={market}
                name="market"
                sx={{ margin: "4px", marginTop: "12px" }}
                fullWidth
                size="small"
                options={["Không lựa chọn", "Nhật bản"]}
                renderInput={(params) => (
                  <TextField variant="outlined" {...params} label="Thị trường" />
                )}
              />
              <Autocomplete
                onChange={(event, newValue) =>
                  handleChangeSelect(event, "wantToGoToSchool", newValue)
                }
                value={wantToGoToSchool}
                name="wantToGoToSchool"
                sx={{ margin: "4px", marginTop: "12px" }}
                fullWidth
                size="small"
                options={["Không lựa chọn", "Aptech"]}
                renderInput={(params) => (
                  <TextField variant="outlined" {...params} label="Muốn vào trường" />
                )}
              />
              <Autocomplete
                onChange={(event, newValue) =>
                  handleChangeSelect(event, "admissionSchool", newValue)
                }
                value={admissionSchool}
                name="admissionSchool"
                sx={{ margin: "4px", marginTop: "12px" }}
                fullWidth
                size="small"
                options={["Không lựa chọn", "Aptech"]}
                renderInput={(params) => (
                  <TextField variant="outlined" {...params} label="Trường trúng tuyển" />
                )}
              />
              <Autocomplete
                onChange={(event, newValue) => handleChangeSelect(event, "major", newValue)}
                value={major}
                name="major"
                sx={{ margin: "4px", marginTop: "12px" }}
                fullWidth
                size="small"
                options={["Không lựa chọn", "IT", "Cơ khí"]}
                renderInput={(params) => (
                  <TextField variant="outlined" {...params} label="Chuyên ngành học" />
                )}
              />
              <TextField
                onChange={(event) => handleChange(event, "semester")}
                value={semester}
                name="semester"
                variant="outlined"
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Học kỳ"
                fullWidth
              />
              <Autocomplete
                onChange={(event, newValue) => handleChangeSelect(event, "schoolLevel", newValue)}
                value={schoolLevel}
                name="schoolLevel"
                sx={{ margin: "4px", marginTop: "12px" }}
                fullWidth
                size="small"
                options={["Không lựa chọn", "Du học nghề", "Đại học", "Thạc sĩ"]}
                renderInput={(params) => (
                  <TextField variant="outlined" {...params} label="Cấp học" />
                )}
              />
              <TextField
                onChange={(event) => handleChange(event, "exitGroup")}
                value={exitGroup}
                name="exitGroup"
                variant="outlined"
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Nhóm xuất cảnh"
                fullWidth
              />
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}
