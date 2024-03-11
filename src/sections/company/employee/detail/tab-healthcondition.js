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
      <Box
        sx={{
          bgcolor: "#fff",
          padding: "16px",
          border: "1px solid #ccc",
          borderRadius: "6px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item sm={12} md={6} xs={6}>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Nhóm máu:</span> {groupBlood}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Cân nặng:</span> {weight}kg
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Chiều cao:</span> {height}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Uống rượu:</span> {valueIsdrinkWine}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Hút thuốc:</span> {valueIsSmoke}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Thị lực (Trái):</span> {eyeSightLeft}/10
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Thị lực (Phải):</span> {eyeSightRight}/10
            </Typography>
            <Typography variant="body1">
              <span style={{ fontWeight: "bold" }}>Tay thuận:</span> {strongHand}
            </Typography>
          </Grid>
          <Grid item sm={12} md={6} xs={6} sx={{ borderLeft: "1px solid black" }}>
            {/* <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
              Hồ sơ sức khỏe bổ sung
            </Typography> */}
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Mù màu:</span> {colorBlindness}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Mồ hôi tay:</span> {sweatyHands}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Sợ độ cao:</span> {afraidHeight}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Hình xăm:</span> {haveTatoo}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Chi tiết hình xăm:</span> {detailTatoo}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
}
