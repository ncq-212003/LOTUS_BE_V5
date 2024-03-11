/* eslint-disable react/jsx-max-props-per-line */
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

export default function HealthConditionEmployee() {
    const [state, dispatch] = useApp();
    const tab = "healthCondition";
    const { employee } = state;
    const { healthCondition } = employee;
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
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
