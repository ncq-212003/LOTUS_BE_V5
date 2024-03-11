/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, } from "react";
import Slide from "@mui/material/Slide";
import {
    Stack,
    Box,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
    Paper,
    Card,
    CardHeader,
    Alert,
    Tooltip,
    IconButton,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { Add, Delete, Visibility } from "@mui/icons-material";
import InternDetail from "../detail/intern-detail";
import { useEffect } from "react";

export default function OrderSelect() {
    const [searchResults, setSearchResults] = useState([]);
    const [selectedTTS, setSelectedTTS] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedClass, setSelectedClass] = useState("");
    const [isDialogDetailOpen, setisDialogDetailOpen] = React.useState(false);
    const [selectedRow, setSelectedRow] = React.useState(null);
    const [daChonXong, setDaChonXong] = useState(() => {
        const storedSelected = JSON.parse(sessionStorage.getItem("daChonXong"));
        return storedSelected || [];
    });
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    // row order in storage
    const selectedOrder = JSON.parse(localStorage.getItem('selectedOrder')) ? JSON.parse(localStorage.getItem('selectedOrder')) : {};

    const openConfirmDialog = () => {
        setConfirmDialogOpen(true);
    };

    const closeConfirmDialog = () => {
        setConfirmDialogOpen(false);
    };

    // Hàm để lưu danh sách đã chọn vào sessionStorage
    const saveSelectedToSessionStorage = () => {
        sessionStorage.setItem("daChonXong", JSON.stringify(daChonXong));
    };

    // Sử dụng useEffect để theo dõi thay đổi trong danh sách đã chọn và lưu vào sessionStorage
    useEffect(() => {
        saveSelectedToSessionStorage();
    }, [daChonXong]);

    // Load danh sách đã chọn từ sessionStorage khi component được tạo
    useEffect(() => {
        const storedSelected = JSON.parse(sessionStorage.getItem("daChonXong"));
        if (storedSelected) {
            setDaChonXong(storedSelected);
        }
    }, []);

    const handleSave = () => {
        if (daChonXong.length >= selectedOrder.soLuongTuyen) {
            openConfirmDialog(); // Mở Dialog xác nhận nếu vượt quá giới hạn
            return;
        }

        // Cập nhật daChonXong trực tiếp với selectedTTS
        setDaChonXong((prevSelectedOrders) => [...prevSelectedOrders, ...selectedTTS]);

        // Lưu daChonXong vào sessionStorage
        saveSelectedToSessionStorage();

        // Xóa danh sách đã chọn
        setSelectedTTS([]);
    };

    // Dữ liệu demo
    const demoData = Array.from({ length: 10 }, (_, index) => ({
        id: index + 1,
        maHoSo: `HS${index + 1}`, // Thêm trường mã hồ sơ
        tenTTS: `Nguyen Van ${String.fromCharCode(65 + index)}`,
        ngaySinh: `01/01/199${index}`,
        gioiTinh: index % 2 === 0 ? "Nam" : "Nữ",
        honNhan: index % 3 === 0 ? "Đã kết hôn" : "Độc thân",
        lop: `C220${3 - (index % 3)}L`,
    }));

    const handleSearch = () => {
        let results = [];

        if (searchQuery && !selectedClass) {
            // Tìm kiếm dữ liệu theo tên
            results = demoData.filter(
                (item) =>
                    item.tenTTS.toLowerCase().includes(searchQuery.toLowerCase())
            );
        } else if (!searchQuery && selectedClass) {
            // Tìm kiếm dữ liệu theo lớp
            results = demoData.filter((item) => item.lop === selectedClass);
        }

        // Loại bỏ các phần tử đã được chọn vào đơn hàng khỏi kết quả tìm kiếm
        const selectedIds = selectedTTS.map((item) => item.id);
        results = results.filter((item) => !selectedIds.includes(item.id));

        setSearchResults(results);
    };


    const handleSelectTTS = (item) => {
        if (selectedTTS.length >= selectedOrder.soLuongTuyen) {
            openConfirmDialog(); // Mở Dialog xác nhận nếu vượt quá giới hạn
            return;
        }

        setSelectedTTS((prevSelectedTTS) => [...prevSelectedTTS, item]);
        setSearchResults((prevSearchResults) =>
            prevSearchResults.filter((result) => result.id !== item.id)
        );
    };

    const handleRemoveTTS = (id) => {
        setSelectedTTS((prevSelectedTTS) =>
            prevSelectedTTS.filter((item) => item.id !== id)
        );

        const removedTTS = selectedTTS.find((item) => item.id === id);

        // Tìm vị trí để chèn phần tử vào searchResults
        const insertIndex = searchResults.findIndex(
            (item) => item.id > removedTTS.id
        );

        setSearchResults((prevSearchResults) => {
            const newSearchResults = [...prevSearchResults];
            // Nếu không tìm thấy vị trí chèn, thêm vào cuối mảng
            if (insertIndex === -1) {
                return [...newSearchResults, removedTTS];
            }
            // Chèn vào vị trí đã tìm thấy
            newSearchResults.splice(insertIndex, 0, removedTTS);
            return newSearchResults;
        });
    };

    const handleRemoveSelectedOrder = (id) => {
        setDaChonXong((prevSelectedOrders) =>
            prevSelectedOrders.filter((item) => item.id !== id)
        );
    };

    const openDialogDetail = (item) => {
        setSelectedRow(item);
        setisDialogDetailOpen(true);
    };

    const closeDialogDetail = () => {
        setisDialogDetailOpen(false);
    };

    return (
        <Stack
            spacing={3}
            sx={{ p: '24px 0px' }}
        >
            <Alert icon={false}
                severity="info"
                sx={{
                    backgroundColor: 'rgb(229, 246, 253)',
                }}
            >
                <Typography variant="subtitle2" >
                    Thời gian đơn hàng {selectedOrder.ngayThiTuyen} - {selectedOrder.ngayChotHoSo}
                </Typography>
                <Typography variant="subtitle2" >
                    Nghiệp đoàn: {selectedOrder.nghiepDoan}
                </Typography>
                <Typography variant="subtitle2" >
                    Công ty tiếp nhận: {selectedOrder.ctyTiepNhan}
                </Typography>
            </Alert>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        width: '90%',
                    }}
                >
                    <TextField
                        sx={{ margin: "4px", marginTop: "12px", width: "100%" }}
                        size="small"
                        label="Nhập tên TTS"
                        variant="outlined"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <FormControl
                        size="small"
                        sx={{
                            margin: "4px", marginTop: "12px", width: "100%",
                            '& .MuiSelect-select': {
                                padding: '7px 14px'
                            }
                        }}
                    >
                        <InputLabel>Lớp</InputLabel>
                        <Select
                            label="Lớp"
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="C2203L">C2203L</MenuItem>
                            <MenuItem value="C2202L">C2202L</MenuItem>
                            <MenuItem value="C2201L">C2201L</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Button
                    sx={{
                        margin: "8px",
                        backgroundColor: "#1C2536",
                        color: "white",
                        width: '10%',
                    }}
                    size="small"
                    variant="contained"
                    onClick={handleSearch}
                >
                    Tìm kiếm
                </Button>
            </Box>

            {/* Bảng danh sách TTS tìm kiếm được */}
            <Card>
                <CardHeader title="Danh sách TTS" />
                <Scrollbar sx={{ flexGrow: 1 }}>
                    <Box sx={{ minWidth: 800 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        STT
                                    </TableCell>
                                    <TableCell>
                                        Mã hồ sơ
                                    </TableCell>
                                    <TableCell>
                                        Họ & Tên
                                    </TableCell>
                                    <TableCell sortDirection="desc">
                                        Ngày sinh
                                    </TableCell>
                                    <TableCell>
                                        Lớp
                                    </TableCell>
                                    <TableCell>
                                        Giới tính
                                    </TableCell>
                                    <TableCell>
                                        Hôn nhân
                                    </TableCell>
                                    <TableCell align="center">
                                        Thao tác
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {searchResults.map((item, index) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{item.maHoSo}</TableCell>
                                        <TableCell>{item.tenTTS}</TableCell>
                                        <TableCell>{item.ngaySinh}</TableCell>
                                        <TableCell>{item.lop}</TableCell>
                                        <TableCell>{item.gioiTinh}</TableCell>
                                        <TableCell>{item.honNhan}</TableCell>
                                        <TableCell align="center">
                                            <Tooltip title="Chi tiết">
                                                <IconButton
                                                    sx={{ color: "black" }}
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        openDialogDetail(item);
                                                    }}
                                                >
                                                    <Visibility />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Chọn vào đơn hàng">
                                                <IconButton
                                                    sx={{ color: "black" }}
                                                    onClick={() => handleSelectTTS(item)}
                                                >
                                                    <Add />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </Scrollbar>
            </Card>

            <Divider />

            {/* Bảng danh sách TTS được chọn */}
            <Card>
                <CardHeader title="Danh sách chọn vào đơn hàng" />
                <Scrollbar sx={{ flexGrow: 1 }}>
                    <Box sx={{ minWidth: 800 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        STT
                                    </TableCell>
                                    <TableCell>
                                        Mã hồ sơ
                                    </TableCell>
                                    <TableCell>
                                        Họ & Tên
                                    </TableCell>
                                    <TableCell sortDirection="desc">
                                        Ngày sinh
                                    </TableCell>
                                    <TableCell>
                                        Lớp
                                    </TableCell>
                                    <TableCell>
                                        Giới tính
                                    </TableCell>
                                    <TableCell>
                                        Hôn nhân
                                    </TableCell>
                                    <TableCell align="center">
                                        Thao tác
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {selectedTTS.map((item, index) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{item.maHoSo}</TableCell>
                                        <TableCell>{item.tenTTS}</TableCell>
                                        <TableCell>{item.ngaySinh}</TableCell>
                                        <TableCell>{item.lop}</TableCell>
                                        <TableCell>{item.gioiTinh}</TableCell>
                                        <TableCell>{item.honNhan}</TableCell>
                                        <TableCell align="center">
                                            <Tooltip title="Chi tiết">
                                                <IconButton
                                                    sx={{ color: "black" }}
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        openDialogDetail(item);
                                                    }}
                                                >
                                                    <Visibility />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Xóa khỏi đơn hàng">
                                                <IconButton
                                                    sx={{ color: "black" }}
                                                    onClick={() => handleRemoveTTS(item.id)}
                                                >
                                                    <Delete />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </Scrollbar>
            </Card>

            <Box
                display='flex'
                justifyContent='flex-end'
            >
                <Button
                    sx={{
                        margin: "8px",
                        backgroundColor: "#1C2536",
                        color: "white",
                        width: '10%',
                    }}
                    size="small"
                    variant="contained"
                    onClick={handleSave}
                >
                    Lưu
                </Button>
            </Box>

            <Divider />

            {/* Bảng danh sách đã chọn */}
            <Card>
                <CardHeader title="Danh sách đã chọn" />
                <Scrollbar sx={{ flexGrow: 1 }}>
                    <Box sx={{ minWidth: 800 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>STT</TableCell>
                                    <TableCell>Mã hồ sơ</TableCell>
                                    <TableCell>Họ & Tên</TableCell>
                                    <TableCell>Ngày sinh</TableCell>
                                    <TableCell>Lớp</TableCell>
                                    <TableCell>Giới tính</TableCell>
                                    <TableCell>Hôn nhân</TableCell>
                                    <TableCell align="center">Thao tác</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {daChonXong.map((item, index) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{item.maHoSo}</TableCell>
                                        <TableCell>{item.tenTTS}</TableCell>
                                        <TableCell>{item.ngaySinh}</TableCell>
                                        <TableCell>{item.lop}</TableCell>
                                        <TableCell>{item.gioiTinh}</TableCell>
                                        <TableCell>{item.honNhan}</TableCell>
                                        <TableCell align="center">
                                            <Tooltip title="Chi tiết">
                                                <IconButton
                                                    sx={{ color: "black" }}
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        openDialogDetail(item);
                                                    }}
                                                >
                                                    <Visibility />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Xóa khỏi danh sách đã chọn">
                                                <IconButton
                                                    sx={{ color: "black" }}
                                                    onClick={() => handleRemoveSelectedOrder(item.id)}
                                                >
                                                    <Delete />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </Scrollbar>
            </Card>

            <Dialog
                open={confirmDialogOpen}
                onClose={closeConfirmDialog}
                aria-labelledby="confirm-dialog-title"
                aria-describedby="confirm-dialog-description"
                sx={{
                    '& .MuiPaper-root': {
                        width: '100%',
                    }
                }}
            >
                <DialogTitle id="confirm-dialog-title">
                    {"Thông báo"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="confirm-dialog-description">
                        Bạn đã chọn đủ {selectedOrder.soLuongTuyen} người!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={closeConfirmDialog}
                        autoFocus
                        variant="contained"
                        sx={{
                            backgroundColor: "#1C2536",
                            color: "white",
                        }}
                    >
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Chi tiết TTS */}
            <InternDetail
                open={isDialogDetailOpen}
                onClose={closeDialogDetail}
                id={selectedRow ? selectedRow.id : ""}
            />
        </Stack>
    );
}