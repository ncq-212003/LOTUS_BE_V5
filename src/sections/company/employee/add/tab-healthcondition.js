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
import { actionSetTouched } from "./tab-infobasic";
import * as Yup from "yup";
import { Stack } from "@mui/system";

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
    eyeSightRight,
    eyeSightLeft,
    strongHand,
    colorBlindness,
    sweatyHands,
    afraidHeight,
    haveTatoo,
    detailTatoo,
    touched,
    errors,
  } = healthCondition;

  const handleChange = (event, fieldName) => {
    actionSetTouched(dispatch, tab, fieldName);

    const fieldValue = event.target.value;
    let newValue;

    if (fieldValue.length >= 0) {
      newValue = fieldValue;
      dispatch({
        type: HANDLERS_EMPLOYEE.SET_INPUT_EMPLOYEES,
        payload: { tab, fieldName, newValue },
      });
    } else {
      newValue = "";
      dispatch({
        type: HANDLERS_EMPLOYEE.SET_INPUT_EMPLOYEES,
        payload: { tab, fieldName, newValue },
      });
    }

    validateFieldHealthCondition(dispatch, tab, fieldName, fieldValue);
  };

  const handleChangeSelect = (event, fieldName, newValueSelect) => {
    actionSetTouched(dispatch, tab, fieldName);

    let newValue;

    if (newValueSelect !== null) {
      newValue = newValueSelect;
      dispatch({
        type: HANDLERS_EMPLOYEE.SET_INPUT_EMPLOYEES,
        payload: { tab, fieldName, newValue },
      });
    } else {
      newValue = "";
      dispatch({
        type: HANDLERS_EMPLOYEE.SET_INPUT_EMPLOYEES,
        payload: { tab, fieldName, newValue },
      });
    }

    validateFieldHealthCondition(dispatch, tab, fieldName, newValue);
  };

  const handleBlur = (fieldName) => {
    actionSetTouched(dispatch, tab, fieldName);
  };

  return (
    <Stack spacing={3}>
      <Grid container spacing={2}>
        <Grid item sm={12} md={6} xs={12}>
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
              onBlur={() => handleBlur("groupBlood")}
              onChange={(event, newValue) => handleChangeSelect(event, "groupBlood", newValue)}
              value={groupBlood}
              name="groupBlood"
              sx={{ margin: "4px", marginTop: "12px" }}
              fullWidth
              size="small"
              options={["Không lựa chọn", "A", "B", "O", "AB"]}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  label="Nhóm máu"
                  error={!!(touched.groupBlood && errors.groupBlood)}
                  helperText={touched.groupBlood && errors.groupBlood}
                />
              )}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <TextField
                error={!!(touched.weight && errors.weight)}
                helperText={touched.weight && errors.weight}
                onBlur={() => handleBlur("weight")}
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
                error={!!(touched.height && errors.height)}
                helperText={touched.height && errors.height}
                onBlur={() => handleBlur("height")}
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
              <TextField
                error={!!(touched.isDrinkWine && errors.isDrinkWine)}
                helperText={touched.isDrinkWine && errors.isDrinkWine}
                onBlur={() => handleBlur("isDrinkWine")}
                onChange={(event) => handleChange(event, "isDrinkWine")}
                value={isDrinkWine}
                name="isDrinkWine"
                fullWidth
                sx={{ margin: "4px", marginTop: "12px" }}
                label="Uống rượu"
                select
                SelectProps={{ native: true }}
                variant="outlined"
              >
                <option value="Không">Không</option>
                <option value="Có">Có</option>
              </TextField>
              <TextField
                error={!!(touched.isSmoke && errors.isSmoke)}
                helperText={touched.isSmoke && errors.isSmoke}
                onBlur={() => handleBlur("isSmoke")}
                onChange={(event) => handleChange(event, "isSmoke")}
                value={isSmoke}
                name="isSmoke"
                fullWidth
                sx={{ margin: "4px", marginTop: "12px" }}
                label="Hút thuốc"
                select
                SelectProps={{ native: true }}
                variant="outlined"
              >
                <option value="Không">Không</option>
                <option value="Có">Có</option>
              </TextField>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <TextField
                error={!!(touched.eyeSightLeft && errors.eyeSightLeft)}
                helperText={touched.eyeSightLeft && errors.eyeSightLeft}
                onBlur={() => handleBlur("eyeSightLeft")}
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
                error={!!(touched.eyeSightRight && errors.eyeSightRight)}
                helperText={touched.eyeSightRight && errors.eyeSightRight}
                onBlur={() => handleBlur("eyeSightRight")}
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
              onBlur={() => handleBlur("strongHand")}
              onChange={(event, newValue) => handleChangeSelect(event, "strongHand", newValue)}
              value={strongHand}
              name="strongHand"
              sx={{ margin: "4px", marginTop: "12px" }}
              fullWidth
              size="small"
              options={["Không lựa chọn", "Trái", "Phải", "Hai tay"]}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  label="Tay thuận"
                  error={!!(touched.strongHand && errors.strongHand)}
                  helperText={touched.strongHand && errors.strongHand}
                />
              )}
            />
          </Box>
        </Grid>
        <Grid item sm={12} md={6} xs={12}>
          <Box
            sx={{
              padding: "16px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              marginBottom: "12px",
            }}
          >
            <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
              Hồ sơ sức khỏe bổ sung
            </Typography>
            <TextField
              error={!!(touched.colorBlindness && errors.colorBlindness)}
              helperText={touched.colorBlindness && errors.colorBlindness}
              onBlur={() => handleBlur("colorBlindness")}
              onChange={(event) => handleChange(event, "colorBlindness")}
              value={colorBlindness}
              name="colorBlindness"
              fullWidth
              sx={{ margin: "4px", marginTop: "12px" }}
              label="Mù màu"
              select
              SelectProps={{ native: true }}
              variant="outlined"
            >
              <option value="Không lựa chọn">Không lựa chọn</option>
              <option value="Không">Không</option>
              <option value="Có">Có</option>
            </TextField>
            <TextField
              error={!!(touched.sweatyHands && errors.sweatyHands)}
              helperText={touched.sweatyHands && errors.sweatyHands}
              onBlur={() => handleBlur("sweatyHands")}
              onChange={(event) => handleChange(event, "sweatyHands")}
              value={sweatyHands}
              name="sweatyHands"
              fullWidth
              sx={{ margin: "4px", marginTop: "12px" }}
              label="Mồ hôi tay"
              select
              SelectProps={{ native: true }}
              variant="outlined"
            >
              <option value="Không lựa chọn">Không lựa chọn</option>
              <option value="Có ít">Có ít</option>
              <option value="Nhiều">Nhiều</option>
            </TextField>
            <TextField
              error={!!(touched.afraidHeight && errors.afraidHeight)}
              helperText={touched.afraidHeight && errors.afraidHeight}
              onBlur={() => handleBlur("afraidHeight")}
              onChange={(event) => handleChange(event, "afraidHeight")}
              value={afraidHeight}
              name="afraidHeight"
              fullWidth
              sx={{ margin: "4px", marginTop: "12px" }}
              label="Sợ độ cao"
              select
              SelectProps={{ native: true }}
              variant="outlined"
            >
              <option value="Không lựa chọn">Không lựa chọn</option>
              <option value="Có">Có</option>
              <option value="Không">Không</option>
            </TextField>
            <TextField
              error={!!(touched.haveTatoo && errors.haveTatoo)}
              helperText={touched.haveTatoo && errors.haveTatoo}
              onBlur={() => handleBlur("haveTatoo")}
              onChange={(event) => handleChange(event, "haveTatoo")}
              value={haveTatoo}
              name="haveTatoo"
              fullWidth
              sx={{ margin: "4px", marginTop: "12px" }}
              label="Hình xăm"
              select
              SelectProps={{ native: true }}
              variant="outlined"
            >
              <option value="Không lựa chọn">Không lựa chọn</option>
              <option value="Có">Có</option>
              <option value="Không">Không</option>
            </TextField>
            
            <TextField
              error={!!(touched.detailTatoo && errors.detailTatoo)}
              helperText={touched.detailTatoo && errors.detailTatoo}
              onBlur={() => handleBlur("detailTatoo")}
              onChange={(event) => handleChange(event, "detailTatoo")}
              value={detailTatoo}
              name="detailTatoo"
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Chi tiết hình xăm"
              fullWidth
              variant="outlined"
            />
          </Box>
        </Grid>
      </Grid>
    </Stack>
  );
}
