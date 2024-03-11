import {
  Box,
  Grid,
  Stack,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import React, { useState } from "react";

export default function TabFamilyRelationship() {
  const [rows, setRows] = useState([
    {
      HoTen: "Nguyễn Văn A",
      NamSinh: "1990",
      QuanHe: "1",
      NgheNghiep: "Kỹ sư",
      DiaChi: "Hà Nội",
      DiDong: "0123456789",
      SongChung: "1",
      ThuNhap: "5,000,000 VND",
    },
    {
      HoTen: "Nguyễn Thị B",
      NamSinh: "1985",
      QuanHe: "2",
      NgheNghiep: "Giáo viên",
      DiaChi: "Hồ Chí Minh",
      DiDong: "0987654321",
      SongChung: "2",
      ThuNhap: "7,000,000 VND",
    },
  ]);

  return (
    <>
      <Stack spacing={3}>
        <Grid container spacing={2}>
          <Grid item sm={12} md={12} xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  <TableRow>
                    <TableCell>Stt</TableCell>
                    <TableCell align="center">Họ & Tên</TableCell>
                    <TableCell align="center">Năm sinh</TableCell>
                    <TableCell align="center">Quan hệ</TableCell>
                    <TableCell align="center">Nghề nghiệp</TableCell>
                    <TableCell align="center">Địa chỉ</TableCell>
                    <TableCell align="center">Di động </TableCell>
                    <TableCell align="center">Sống chung</TableCell>
                    <TableCell align="center">Thu nhập</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell align="center">
                        <Typography>{row.HoTen}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography>{row.NamSinh}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography>
                          {row.QuanHe === "1" && "Bố"}
                          {row.QuanHe === "2" && "Mẹ"}
                          {row.QuanHe === "3" && "Anh"}
                          {row.QuanHe === "4" && "Em"}
                          {row.QuanHe === "5" && "Chị"}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography>{row.NgheNghiep}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography>{row.DiaChi}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography>{row.DiDong}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography>{row.SongChung === "1" ? "Có" : "Không"}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography>{row.ThuNhap}</Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}
