import {
  Box,
  Grid,
  Typography,
  TextField,
  Autocomplete, // Import Autocomplete
  Paper,
} from "@mui/material";
import { Stack } from "@mui/system";
import { HANDLERS_EMPLOYEE } from "src/contexts/reducer/company/reducer-employee";
import { useApp } from "src/hooks/use-app";

export default function HealthConditionEmployee({ rowData }) {
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
  } = rowData;
  console.log(rowData);
  const valueIsdrinkWine = isDrinkWine === true ? "Có" : "Không";
  const valueIsSmoke = isSmoke === true ? "Có" : "Không";

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
                InputProps={{
                  readOnly: true,
                }}
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
                InputProps={{
                  readOnly: true,
                }}
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
                InputProps={{
                  readOnly: true,
                }}
                value={valueIsdrinkWine}
                name="isDrinkWine"
                fullWidth
                sx={{ margin: "4px", marginTop: "12px" }}
                label="Uống rượu"
                variant="outlined"
              />
              <TextField
                InputProps={{
                  readOnly: true,
                }}
                value={valueIsSmoke}
                name="isSmoke"
                fullWidth
                sx={{ margin: "4px", marginTop: "12px" }}
                label="Hút thuốc"
                variant="outlined"
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <TextField
                InputProps={{
                  readOnly: true,
                }}
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
                InputProps={{
                  readOnly: true,
                }}
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
              readOnly
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
              InputProps={{
                readOnly: true,
              }}
              value={colorBlindness}
              name="colorBlindness"
              fullWidth
              sx={{ margin: "4px", marginTop: "12px" }}
              label="Mù màu"
              variant="outlined"
            />
            <TextField
              InputProps={{
                readOnly: true,
              }}
              value={sweatyHands}
              name="sweatyHands"
              fullWidth
              sx={{ margin: "4px", marginTop: "12px" }}
              label="Mồ hôi tay"
              variant="outlined"
            />
            <TextField
              InputProps={{
                readOnly: true,
              }}
              value={afraidHeight}
              name="afraidHeight"
              fullWidth
              sx={{ margin: "4px", marginTop: "12px" }}
              label="Sợ độ cao"
              variant="outlined"
            />
            <TextField
              InputProps={{
                readOnly: true,
              }}
              value={haveTatoo}
              name="haveTatoo"
              fullWidth
              sx={{ margin: "4px", marginTop: "12px" }}
              label="Hình xăm"
              variant="outlined"
            />
            <TextField
              InputProps={{
                readOnly: true,
              }}
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
