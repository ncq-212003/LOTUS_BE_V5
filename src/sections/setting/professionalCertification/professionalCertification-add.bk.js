import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import Slide from "@mui/material/Slide";
import { SvgIcon, Stack, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
} from "@mui/material";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

export default function ProfessionalCertificationAdd() {
  return (
    <Stack spacing={3} sx={{ marginTop: "80px" }}>
      <Grid container spacing={2}>
        <Grid item sm={12} md={6} xs={12}>
          <Box
            sx={{
              bgcolor: "#fff",
              padding: "16px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              marginBottom: "12px",
            }}
          >
            <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
              Thông tin cơ bản
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <TextField
                required
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Tên công ty "
                fullWidth
              />
            </Box>
            <TextField
              required
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Tên giao dịch "
              fullWidth
            />
            <FormControl size="small" fullWidth sx={{ margin: "4px", marginTop: "12px" }}>
              <InputLabel>Loại hình DN</InputLabel>
              <Select>
                <MenuItem value={1}>Tổng Công ty</MenuItem>
                <MenuItem value={2}>Công ty</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" fullWidth sx={{ margin: "4px", marginTop: "12px" }}>
              <InputLabel>Tỉnh đặt trụ sở</InputLabel>
              <Select>
                <MenuItem value={1}>Hà Nội</MenuItem>
                <MenuItem value={2}>Hồ Chí Minh</MenuItem>
                <MenuItem value={3}>Đồng Tháp</MenuItem>
                <MenuItem value={4}>Bắc Ninh</MenuItem>
              </Select>
            </FormControl>
            <TextField
              required
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Địa chỉ công ty "
              fullWidth
            />
            <TextField
              required
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Điện thoại"
              fullWidth
            />
            <TextField
              required
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Số fax"
              fullWidth
            />
            <TextField
              required
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Địa chỉ email"
              fullWidth
            />
          </Box>
        </Grid>

        <Grid item sm={12} md={6} xs={12}>
          <Box
            sx={{
              bgcolor: "#fff",
              padding: "16px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              marginBottom: "12px",
            }}
          >
            <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
              Địa chỉ
            </Typography>
            <FormControl size="small" fullWidth>
              <InputLabel>Ngày đăng ký</InputLabel>
              <TextField
                type="date"
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                fullWidth
              />
            </FormControl>
            <FormControl size="small" fullWidth>
              <InputLabel>Ngày cấp giấy phép</InputLabel>
              <TextField
                type="date"
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                fullWidth
              />
            </FormControl>
            <TextField
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Số giấy phép"
              fullWidth
            />
            <TextField
              multiline
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Thông tin khác"
              fullWidth
            />
          </Box>
          <Box
            sx={{
              bgcolor: "#fff",
              padding: "16px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              marginBottom: "12px",
            }}
          >
            <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
              Người đại diện
            </Typography>
            <TextField
              required
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Người đại diện"
              fullWidth
            />
            <TextField
              required
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Chức vụ người đại diện"
              fullWidth
            />
            <TextField
              required
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Điện thoại đại diện"
              fullWidth
            />
            <TextField
              required
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Người ký CV"
              fullWidth
            />
            <TextField
              required
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Chức danh người ký CV"
              fullWidth
            />
          </Box>
        </Grid>
        <Grid item sm={12} md={12} xs={12} sx={{display:"flex", justifyContent:"flex-end"}}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1C2536",
            }}
          >
            Thêm
          </Button>
        </Grid>
      </Grid>
    </Stack>
  );
}
