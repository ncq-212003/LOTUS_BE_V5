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

export default function TabHealthCondition() {
  const tab = "healthCondition";
  const [state, dispatch] = useApp();
  const { intern } = state;
  const { healthCondition } = intern;
  const {
    bloodGroup,
    weight,
    height,
    isAlcohol,
    isSmoke,
    eyesightLeft,
    eyesightRight,
    preferredHand,
  } = healthCondition;

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
                Tình trạng sức khỏe
              </Typography>
              <Autocomplete
                onChange={(event, newValue) => handleChangeSelect(event, "bloodGroup", newValue)}
                value={bloodGroup}
                name="bloodGroup"
                sx={{ margin: "4px", marginTop: "12px" }}
                fullWidth
                size="small"
                options={["Không lựa chọn", "A", "B", "O", "AB"]}
                renderInput={(params) => (
                  <TextField variant="outlined" {...params} label="Nhóm máu" />
                )}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  onChange={(event) => handleChange(event, "weight")}
                  value={weight}
                  name="weight"
                  variant="outlined"
                  required
                  sx={{ margin: "4px", marginTop: "12px" }}
                  size="small"
                  label="Cân nặng"
                  fullWidth
                />
                <TextField
                  onChange={(event) => handleChange(event, "height")}
                  value={height}
                  name="height"
                  variant="outlined"
                  required
                  sx={{ margin: "4px", marginTop: "12px" }}
                  size="small"
                  label="Chiều cao"
                  fullWidth
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Autocomplete
                  onChange={(event, newValue) => handleChangeSelect(event, "isAlcohol", newValue)}
                  value={isAlcohol}
                  name="isAlcohol"
                  sx={{ margin: "4px", marginTop: "12px" }}
                  fullWidth
                  size="small"
                  options={["Không lựa chọn", "Không", "Có"]}
                  renderInput={(params) => (
                    <TextField variant="outlined" {...params} label="Uống rượu" />
                  )}
                />

                <Autocomplete
                  onChange={(event, newValue) => handleChangeSelect(event, "isSmoke", newValue)}
                  value={isSmoke}
                  name="isSmoke"
                  sx={{ margin: "4px", marginTop: "12px" }}
                  fullWidth
                  size="small"
                  options={["Không lựa chọn", "Không", "Có"]}
                  renderInput={(params) => (
                    <TextField variant="outlined" {...params} label="Hút thuốc" />
                  )}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  onChange={(event) => handleChange(event, "eyesightLeft")}
                  value={eyesightLeft}
                  name="eyesightLeft"
                  variant="outlined"
                  required
                  sx={{ margin: "4px", marginTop: "12px" }}
                  size="small"
                  label="Thị lực (trái)"
                  fullWidth
                />
                <TextField
                  onChange={(event) => handleChange(event, "eyesightRight")}
                  value={eyesightRight}
                  name="eyesightRight"
                  variant="outlined"
                  required
                  sx={{ margin: "4px", marginTop: "12px" }}
                  size="small"
                  label="Thị lực (phải)"
                  fullWidth
                />
              </Box>
              <Autocomplete
                onChange={(event, newValue) => handleChangeSelect(event, "preferredHand", newValue)}
                value={preferredHand}
                name="preferredHand"
                sx={{ margin: "4px", marginTop: "12px" }}
                fullWidth
                size="small"
                options={["Không lựa chọn", "Trái", "Phải", "Hai tay"]}
                renderInput={(params) => (
                  <TextField variant="outlined" {...params} label="Tay thuận" />
                )}
              />
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}
