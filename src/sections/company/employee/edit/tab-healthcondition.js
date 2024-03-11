import {
  Box,
  Grid,
  Typography,
  TextField,
  Autocomplete, // Import Autocomplete
  Paper,
} from "@mui/material";
import { HANDLERS_EMPLOYEE } from "src/contexts/reducer/company/reducer-employee";
import { useApp } from "src/hooks/use-app";
import * as Yup from "yup";

export function validateFieldHealthCondition(dispatch, tab, fieldName, fieldValue) {
  const validationSchema = Yup.object().shape({
    groupBlood: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
    weight: Yup.string()
      .max(4000)
      .required("Vui lòng nhập thông tin vào trường này")
      .matches(/^[0-9]+$/, "Vui lòng nhập số vào trường này"),
    height: Yup.string()
      .max(4000)
      .required("Vui lòng nhập thông tin vào trường này")
      .matches(/^[0-9]+$/, "Vui lòng nhập số vào trường này"),
    isDrinkWine: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
    isSmoke: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
    eyeSightLeft: Yup.string()
      .max(4000)
      .required("Vui lòng nhập thông tin vào trường này")
      .matches(/^[1-9]$|^10$/, "Vui lòng nhập một số trong khoảng 1 đến 10"),
    eyeSightRight: Yup.string()
      .max(4000)
      .required("Vui lòng nhập thông tin vào trường này")
      .matches(/^[1-9]$|^10$/, "Vui lòng nhập một số trong khoảng 1 đến 10"),
    strongHand: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
    colorBlindness: Yup.string(),
    sweatyHands: Yup.string(),
    afraidHeight: Yup.string(),
    haveTatoo: Yup.string(),
    detailTatoo: Yup.string(),
  });

  let newValue;
  validationSchema
    .validateAt(fieldName, { [fieldName]: fieldValue })
    .then(() => {
      newValue = null;
      dispatch({
        type: HANDLERS_EMPLOYEE.SET_ERRORS_EMPLOYEE,
        payload: { tab, fieldName, newValue },
      });
    })
    .catch((error) => {
      newValue = error.message;
      dispatch({
        type: HANDLERS_EMPLOYEE.SET_ERRORS_EMPLOYEE,
        payload: { tab, fieldName, newValue },
      });
    });
}

export default function HealthConditionEmployee() {
  const [state, dispatch] = useApp();
  const tab = "healthCondition";
  const { employee } = state;
  const { healthCondition } = employee;
  const {
    groupBlood,
    weight,
    height,
    isDrinkWine,
    isSmoke,
    eyeSightLeft,
    eyeSightRight,
    strongHand,
  } = healthCondition;

  const handleChange = (event, fieldName) => {
    const newValue = event.target.value;
    dispatch({
      type: HANDLERS_EMPLOYEE.SET_INPUT_EMPLOYEES,
      payload: { tab, fieldName, newValue },
    });
  };

  const handleChangeSelect = (event, fieldName, newValue) => {
    dispatch({
      type: HANDLERS_EMPLOYEE.SET_INPUT_EMPLOYEES,
      payload: { tab, fieldName, newValue },
    });
  };

  return (
    <Box
      sx={{
        bgcolor: "#fff",
        padding: "16px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        marginBottom: "12px",
      }}
    >
      <Grid container spacing={2}>
        <Grid item sm={12} md={12} xs={12}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
              Tình trạng sức khỏe
            </Typography>
            <Autocomplete
              onChange={(event, newValue) => handleChangeSelect(event, "groupBlood", newValue)}
              value={groupBlood}
              name="groupBlood"
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
                onChange={(event, newValue) => handleChangeSelect(event, "isDrinkWine", newValue)}
                value={isDrinkWine}
                name="isDrinkWine"
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
                onChange={(event) => handleChange(event, "eyeSightLeft")}
                value={eyeSightLeft}
                name="eyeSightLeft"
                variant="outlined"
                required
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Thị lực (trái)"
                fullWidth
              />
              <TextField
                onChange={(event) => handleChange(event, "eyeSightRight")}
                value={eyeSightRight}
                name="eyeSightRight"
                variant="outlined"
                required
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Thị lực (phải)"
                fullWidth
              />
            </Box>
            <Autocomplete
              onChange={(event, newValue) => handleChangeSelect(event, "strongHand", newValue)}
              value={strongHand}
              name="strongHand"
              sx={{ margin: "4px", marginTop: "12px" }}
              fullWidth
              size="small"
              options={["Không lựa chọn", "Trái", "Phải", "Hai tay"]}
              renderInput={(params) => (
                <TextField variant="outlined" {...params} label="Tay thuận" />
              )}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
