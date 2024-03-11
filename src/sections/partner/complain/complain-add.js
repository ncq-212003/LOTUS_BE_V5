import {
  Card,
  Stack,
  Grid,
  Paper,
  Box,
  Button,
  TextField,
  TableCell,
  TableBody,
  TableHead,
  TableContainer,
  TableRow,
  Typography,
  Table,
} from "@mui/material";
import { useState } from "react";
import * as React from "react";
import InputBase from "@mui/material/InputBase";
import Tooltip from '@mui/material/Tooltip';
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { HandleComplain } from "./complain-handle";

export const AddComplain = (props) => {
  const [openComplain, setOpenComplain] = useState(false);

  const handleClickOpen = () => {
    setOpenComplain(true);
  };

  const handleClose = () => {
    setOpenComplain(false);
  };
  const [searchUserComplain, setSearchUserComplain] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [waitingList, setWaitingList] = useState([]);
  const [listSuccessComplain, setListSuccessComplain] = useState([]);

  // Tìm kiếm người mà công ty cần khiếu nại 
  const handleSearchUser = () => {
    if (!searchUserComplain) {
      setSearchResults([]);
      return;
    }
    const listUser = [
      { id: 1, stt: 1, name: 'Phạm Tiến Bình', dateofbirth: '29-11-2023', gender: 'Nam', phone: '0837444553', company: 'Cong ty A', union: 'Nghiệp đoàn 1' },
      { id: 2, stt: 2, name: 'Nguyễn Thị Hương', dateofbirth: '30-02-2023', gender: 'Nữ', phone: '0912345678', company: 'Công ty B', union: 'Nghiệp đoàn 2' },
      { id: 3, stt: 3, name: 'Trần Văn Nam', dateofbirth: '10-02-2102', gender: 'Nam', phone: '0978654321', company: 'Công ty C', union: 'Nghiệp đoàn 3' },
      { id: 4, stt: 4, name: 'Nguyễn Thị An', dateofbirth: '09-09-2034', gender: 'Nữ', phone: '0898765432', company: 'Công ty D', union: 'Nghiệp đoàn 4' },
      { id: 5, stt: 5, name: 'Lê Văn Long', dateofbirth: '13-03-1990', gender: 'Nam', phone: '0923456789', company: 'Công ty E', union: 'Nghiệp đoàn 5' }
    ]
    const filterUserComplain = listUser.filter(user => user.name.toLowerCase().includes(searchUserComplain.toLowerCase()));
    setSearchResults(filterUserComplain);
  }

  // Thêm danh sách người cần xử lý ở bảng chờ xử lý 
  const listUserWaiting = (row) => {
    // xóa nguoi dung trong danh sách tìm kiếm
    setSearchResults(searchResults.filter((user) => user.id !== row.id));
    //them nguoi dùng vào danh sách xử lý
    setWaitingList([...waitingList, row])
  }
  // xóa người dùng ở danh sách chở và đưa vào mục xử lý
  const deleteUserComplain = (row) => {
    setWaitingList(waitingList.filter(user => user.id !== row.id))
  }

  // Thêm khiếu nại 
  const handleUserComplain = (newRow) => {
    const updatedList = [...waitingList];
    const rowIndex = updatedList.findIndex(items => items.id === newRow.id); //có sẽ trả về vị trí của mảng đấy và ngược lại -1 
    if (rowIndex !== -1) {
      updatedList[rowIndex] = { ...newRow };
    }
    setListSuccessComplain(updatedList);
    alert("Thanh cong")
  }

  return (
    <>
      <Stack spacing={3}>
        <Paper
          component="form"
          sx={{
            p: "0px 4px",
            display: "flex",
            alignItems: "center",
            width: "50%",
            margin: "30px 15px 0px 15px ",
            border: "1px solid",
            borderColor: "black",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Tên thực tập sinh/ du học sinh"
            inputProps={{ "aria-label": "search google maps" }}
            onChange={(event) => {
              setSearchUserComplain(event.target.value)
              handleSearchUser()
            }
            }
            autoFocus
          />
          <Tooltip title="Tìm kiếm">
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon
                onClick={handleSearchUser}
              />
            </IconButton>
          </Tooltip>
        </Paper>
        <TableContainer component={Paper}>
          <Typography sx={{ fontWeight: "700", margin: "20px 0px 20px 15px", fontSize: "17px" }}>
            Danh sách kết quả tìm kiếm
          </Typography>
          <Table>
            <TableHead sx={{ backgroundColor: "	#A52A2A" }}>
              <TableRow>
                <TableCell>Stt</TableCell>
                <TableCell align="center">Tên</TableCell>
                <TableCell align="center">Ngày sinh</TableCell>
                <TableCell align="center">Giới tính</TableCell>
                <TableCell align="center">Số điện thoại</TableCell>
                <TableCell align="center">Công ty tiếp nhận </TableCell>
                <TableCell align="center">Nghiệp đoàn</TableCell>
                <TableCell align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchResults.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell align="center">
                    <Typography>{row.name}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{row.dateofbirth}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{row.gender}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{row.phone}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{row.company}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{row.union}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Button variant="text"
                      onClick={() => listUserWaiting(row)}
                    >
                      Thêm
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Danh sách chở xử lý */}

        <TableContainer component={Paper}>
          <Typography sx={{ fontWeight: "700", margin: "20px 0px 20px 15px", fontSize: "17px" }}>
            Danh sách chờ xử lý
          </Typography>
          <Table>
            <TableHead sx={{ backgroundColor: "	#A52A2A" }}>
              <TableRow>
                <TableCell>Stt</TableCell>
                <TableCell align="center">Tên</TableCell>
                <TableCell align="center">Ngày sinh</TableCell>
                <TableCell align="center">Giới tính</TableCell>
                <TableCell align="center">Số điện thoại</TableCell>
                <TableCell align="center">Công ty tiếp nhận </TableCell>
                <TableCell align="center">Nghiệp đoàn</TableCell>
                <TableCell align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {waitingList.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell align="center">
                    <Typography>{row.name}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{row.dateofbirth}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{row.gender}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{row.phone}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{row.company}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{row.union}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Button variant="text"
                      onClick={() => deleteUserComplain(row)}
                    >
                      Xóa
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "30px",
          }}
        >
          <Button
            variant="contained"
            sx={{ backgroundColor: "#1C2536" }}
            onClick={handleClickOpen}
          >
            Xử lý chung
          </Button>
        </Box>
      </Stack>
      <HandleComplain
        openComplain={openComplain}
        closeComplain={handleClose}
        waitingListUser={waitingList}
        handleDeleteUser={deleteUserComplain}
        handleComplainUser={handleUserComplain}
      />
    </>
  );
};
