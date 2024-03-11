import Grid from "@mui/material/Grid";
import "dayjs/locale/en-gb";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { Box } from "@mui/system";
import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import * as React from "react";
import TextField from "@mui/material/TextField";
import * as Yup from "yup";
import { HANDLERS_EMPLOYEE } from "src/contexts/reducer/company/reducer-employee";
import { useApp } from "src/hooks/use-app";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { listStatusByAliasApi } from "src/contexts/api/setting/api-status";
import { useEffect } from "react";

export function actionSetTouched(dispatch, tab, fieldName) {
  const newValue = true;
  dispatch({
    type: HANDLERS_EMPLOYEE.SET_TOUCHED_EMPLOYEE,
    payload: { tab, fieldName, newValue },
  });
}
let filedValuePassword;

export function validateFieldAccessSystem(dispatch, tab, fieldName, fieldValue) {
  if (fieldName === "password") {
    filedValuePassword = fieldValue;
  }
  const validationSchema = Yup.object().shape({
    userName: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
    password: Yup.string()
      .required("Vui lòng nhập thông tin vào trường này")
      .max(40, "Mật khẩu tối đa là 40 ký tự"),
    confirmPassword: Yup.string()
      .required("Xác nhận mật khẩu là trường bắt buộc")
      .max(40, "Mật khẩu tối đa là 40 ký tự")
      .test("is-greater", "Mật khẩu không trùng khớp", (value) => {
        return value === filedValuePassword;
      }),
    status: Yup.string(),
    touched: Yup.object(),
    errors: Yup.object(),
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

export default function AccessSystemEmployee() {
  //context API
  const [state, dispatch] = useApp();
  const tab = "accessSystem";
  const { employee } = state;
  const { accessSystem } = employee;
  const { userName, password, confirmPassword, status, touched, errors } = accessSystem;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [statusEmployee, setStatusEmployee] = useState([]);

  //listStatus
  useEffect(() => {
    const listData = async () => {
      const res = await listStatusByAliasApi("trang-thai-nhan-vien");
      if (Array.isArray(res.data) && res.data.length > 0) {
        const data = res.data.map((com) => ({
          label: com.statusName,
          value: com.commonStatusId,
        }));
        setStatusEmployee(data);
      }
    };
    listData();
  }, []);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

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

    validateFieldAccessSystem(dispatch, tab, fieldName, fieldValue);
  };

  const handleBlur = (fieldName) => {
    actionSetTouched(dispatch, tab, fieldName);
  };

  return (
    <Stack spacing={3}>
      <Grid container spacing={2}>
        <Grid item sm={12} md={12} xs={12}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              margin: "0 auto",
              borderRadius: "6px",
              border: "1px solid #ccc",
              padding: "10px",
            }}
          >
            <TextField
              error={!!(touched.userName && errors.userName)}
              helperText={touched.userName && errors.userName}
              onBlur={() => handleBlur("userName")}
              onChange={(event) => handleChange(event, "userName")}
              value={userName}
              variant="outlined"
              label="Tên người dùng"
              size="small"
              fullWidth
              name="userName"
              sx={{ flex: 1, mr: 1 }}
            />
            <Box
              sx={{
                bgcolor: "#fff",
                padding: "16px",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  fullWidth
                  sx={{ marginRight: "10px" }}
                  error={!!(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                  onBlur={() => handleBlur("password")}
                  onChange={(event) => handleChange(event, "password")}
                  value={password}
                  name="password"
                  variant="outlined"
                  size="small"
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  label="Mật khẩu"
                />

                <TextField
                  fullWidth
                  sx={{ marginLeft: "10px" }}
                  error={!!(touched.confirmPassword && errors.confirmPassword)}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  onBlur={() => handleBlur("confirmPassword")}
                  onChange={(event) => handleChange(event, "confirmPassword")}
                  value={confirmPassword}
                  name="confirmPassword"
                  size="small"
                  variant="outlined"
                  type={showConfirmPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownConfirmPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  label="Xác nhận mật khẩu"
                />
              </Box>
            </Box>
            <FormLabel>Trạng thái</FormLabel>
            <RadioGroup
              row
              name="status"
              value={status}
              onChange={(event) => handleChange(event, "status")}
            >
              {statusEmployee.map((item, index) => (
                <FormControlLabel
                  key={index}
                  value={item.value} // Chuyển giá trị sang chuỗi nếu cần thiết
                  control={<Radio size="small" />}
                  label={item.label}
                />
              ))}
            </RadioGroup>
          </Box>
        </Grid>
      </Grid>
    </Stack>
  );
}
