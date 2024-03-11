import React, { useState } from 'react';
import {
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Grid,
    Typography,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    OutlinedInput,
    InputAdornment,
    SvgIcon,
    IconButton,
    Menu,
    InputBase,
    Divider,
} from '@mui/material';
import { Box, Stack } from '@mui/system';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Directions, Search } from '@mui/icons-material';

const TranslationAdd = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [translatedRecords, setTranslatedRecords] = useState([]);
    const [tableName, setTableName] = useState(''); // Tên của bảng
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    const handleSearch = () => {
        // Thực hiện tìm kiếm dựa trên searchTerm
        // Ở đây, ta sử dụng một mảng mẫu để minh họa
        const mockSearchResults = [
            { id: 1, stt: 1, maHoSo: 'HS001', ngayDangKy: '27/10/2023', hoTen: 'Nguyễn Văn A', ngaySinh: '1990-05-15', gioiTinh: 'Nam', honNhan: 'Đã kết hôn' },
            { id: 2, stt: 2, maHoSo: 'HS002', ngayDangKy: '28/10/2023', hoTen: 'Trần Thị B', ngaySinh: '1995-02-20', gioiTinh: 'Nữ', honNhan: 'Độc thân' },
            { id: 3, stt: 3, maHoSo: 'HS003', ngayDangKy: '29/10/2023', hoTen: 'Lê Văn C', ngaySinh: '1987-11-10', gioiTinh: 'Nam', honNhan: 'Đã kết hôn' },
            { id: 4, stt: 4, maHoSo: 'HS004', ngayDangKy: '30/10/2023', hoTen: 'Phạm Thị D', ngaySinh: '1998-09-05', gioiTinh: 'Nữ', honNhan: 'Độc thân' },
            { id: 5, stt: 5, maHoSo: 'HS005', ngayDangKy: '31/10/2023', hoTen: 'Vũ Văn E', ngaySinh: '2001-03-25', gioiTinh: 'Nam', honNhan: 'Đã kết hôn' },
            { id: 6, stt: 6, maHoSo: 'HS006', ngayDangKy: '01/11/2023', hoTen: 'Nguyễn Thị F', ngaySinh: '1996-07-14', gioiTinh: 'Nữ', honNhan: 'Độc thân' },
            { id: 7, stt: 7, maHoSo: 'HS007', ngayDangKy: '02/11/2023', hoTen: 'Trần Văn G', ngaySinh: '2000-01-30', gioiTinh: 'Nam', honNhan: 'Đã kết hôn' },
            { id: 8, stt: 8, maHoSo: 'HS008', ngayDangKy: '03/11/2023', hoTen: 'Lê Thị H', ngaySinh: '1993-04-19', gioiTinh: 'Nữ', honNhan: 'Độc thân' },
            { id: 9, stt: 9, maHoSo: 'HS009', ngayDangKy: '04/11/2023', hoTen: 'Phạm Văn I', ngaySinh: '1991-08-09', gioiTinh: 'Nam', honNhan: 'Đã kết hôn' },
            { id: 10, stt: 10, maHoSo: 'HS010', ngayDangKy: '05/11/2023', hoTen: 'Vũ Thị K', ngaySinh: '1997-12-28', gioiTinh: 'Nữ', honNhan: 'Độc thân' },
        ];


        // Lọc kết quả tìm kiếm
        const filteredResults = mockSearchResults.filter((record) =>
            record.hoTen.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setSearchResults(filteredResults);
    };

    const handleAddTranslation = (record) => {
        // Thêm bản ghi vào bảng dịch thuật
        setTranslatedRecords([...translatedRecords, record]);

        // Xóa bản ghi đã thêm khỏi danh sách tìm kiếm
        setSearchResults(searchResults.filter((r) => r.id !== record.id));
    };

    const handleDeleteTranslation = (record) => {
        // Xóa bản ghi khỏi bảng dịch thuật
        setTranslatedRecords(translatedRecords.filter((r) => r.id !== record.id));

        // Thêm bản ghi vào danh sách tìm kiếm
        setSearchResults([...searchResults, record]);
    };

    const handleSaveTranslations = () => {
        // Thực hiện lưu bản ghi đã dịch thuật
        // Ví dụ: gửi dữ liệu lên server hoặc thực hiện các thao tác lưu trữ khác
        console.log('Bản ghi đã dịch thuật:', translatedRecords);
    };

    const handleSelectTemplate = (template) => {
        setSelectedTemplate(template);
    };

    const templateData = [
        {
            id: 1,
            name: 'Mẫu 1',
            imageUrl: 'https://source.unsplash.com/random?wallpapers',
        },
        {
            id: 2,
            name: 'Mẫu 2',
            imageUrl: 'https://source.unsplash.com/random?wallpapers',
        },
        {
            id: 3,
            name: 'Mẫu 3',
            imageUrl: 'https://source.unsplash.com/random?wallpapers',
        },
        {
            id: 4,
            name: 'Mẫu 4',
            imageUrl: 'https://source.unsplash.com/random?wallpapers',
        },
        // Thêm các mẫu khác nếu cần
    ];



    return (
        <div>
            <Stack spacing={3} sx={{ margin: '38px 0' }}>
                <Box sx={{ padding: "16px" }}>
                    <Grid container spacing={2} alignItems="center">

                        {/* <Grid item sm={10}>
                            <TextField
                                fullWidth
                                size='small'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </Grid>
                        <Grid item sm={2}>
                            <Button
                                variant="contained"
                                onClick={handleSearch}
                                sx={{
                                    backgroundColor: '#1C2536',
                                }}
                            >
                                Tìm kiếm
                            </Button>
                        </Grid> */}

                        <Paper
                            component="form"
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'end', width: 400 }}
                        >
                            <IconButton sx={{ p: '10px' }} aria-label="menu">
                                <Menu />
                            </IconButton>
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Tìm kiếm thực tập sinh / du học sinh"
                                inputProps={{ 'aria-label': 'search google maps' }}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value)
                                    handleSearch()
                                }
                                }
                                autoFocus
                            />
                            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
                                <Search />
                            </IconButton>
                        </Paper>

                        {/* Bảng kết quả tìm kiếm */}
                        <TableContainer component={Paper} style={{ margin: '20px 0' }}>
                            <Typography sx={{ ml: 2 }}>
                                <h4>Danh sách kết quả tìm kiếm</h4>
                            </Typography>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>STT</TableCell>
                                        <TableCell>Mã hồ sơ</TableCell>
                                        <TableCell>Họ và tên</TableCell>
                                        <TableCell>Ngày sinh</TableCell>
                                        <TableCell>Giới tính</TableCell>
                                        <TableCell>Hôn nhân</TableCell>
                                        <TableCell>Ngày đăng ký</TableCell>
                                        <TableCell>Hành động</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {searchResults.map((record) => (
                                        <TableRow key={record.id}>
                                            <TableCell>{record.stt}</TableCell>
                                            <TableCell>{record.maHoSo}</TableCell>
                                            <TableCell>{record.hoTen}</TableCell>
                                            <TableCell>{record.ngaySinh}</TableCell>
                                            <TableCell>{record.gioiTinh}</TableCell>
                                            <TableCell>{record.honNhan}</TableCell>
                                            <TableCell>{record.ngayDangKy}</TableCell>

                                            <TableCell>
                                                <Button
                                                    // variant="contained"
                                                    onClick={() => handleAddTranslation(record)}
                                                >
                                                    Thêm
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {/* Bảng dịch thuật */}
                        <TableContainer component={Paper} style={{ margin: '20px 0' }}>

                            <Typography sx={{ ml: 2 }}>
                                <h4>{tableName || 'Danh sách dịch thuật'}</h4>
                            </Typography>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>STT</TableCell>
                                        <TableCell>Mã hồ sơ</TableCell>
                                        <TableCell>Họ và tên</TableCell>
                                        <TableCell>Ngày sinh</TableCell>
                                        <TableCell>Giới tính</TableCell>
                                        <TableCell>Hôn nhân</TableCell>
                                        <TableCell>Ngày đăng ký</TableCell>
                                        <TableCell>Hành động</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {translatedRecords.map((record) => (
                                        <TableRow key={record.id}>
                                            <TableCell>{record.stt}</TableCell>
                                            <TableCell>{record.maHoSo}</TableCell>
                                            <TableCell>{record.hoTen}</TableCell>
                                            <TableCell>{record.ngaySinh}</TableCell>
                                            <TableCell>{record.gioiTinh}</TableCell>
                                            <TableCell>{record.honNhan}</TableCell>
                                            <TableCell>{record.ngayDangKy}</TableCell>

                                            <TableCell>
                                                <Button
                                                    // variant="contained"
                                                    onClick={() => handleDeleteTranslation(record)}
                                                >
                                                    Xóa
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {/* Danh sách mẫu dịch */}
                        <Grid item sm={12} md={12} xs={12} >
                            <Typography >
                                <h4>Chọn mẫu dịch</h4>
                            </Typography>

                            <Grid container spacing={4}>
                                {templateData.map((template) => (
                                    <Grid item key={template.id} xs={12} sm={6} md={3}>
                                        <Card
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                maxWidth: '200px',
                                                margin: 'auto', // Căn giữa thẻ Card
                                            }}
                                            onClick={() => handleSelectTemplate(template)}
                                            style={{
                                                cursor: 'pointer',
                                                border: selectedTemplate?.id === template.id ? '2px solid #1C2536' : 'none',
                                            }}
                                        >
                                            <CardMedia
                                                component="div"
                                                sx={{
                                                    // 16:9
                                                    pt: '56.25%',
                                                }}
                                                image={template.imageUrl}
                                            />
                                            <CardContent sx={{ flexGrow: 1, p: '8px', textAlign: 'center' }}>
                                                <Typography variant="h6">
                                                    {template.name}
                                                </Typography>
                                            </CardContent>

                                            <CardActions>
                                                {/* Các nút hành động khác nếu cần */}
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>

                        </Grid>
                        <Stack
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="center"
                            m={1}
                            mt={6}
                            sx={{ width: '100%' }}
                        >
                            <Button
                                variant="contained"
                                onClick={handleSaveTranslations}
                                sx={{
                                    backgroundColor: '#1C2536',
                                    // width: 'fit-content', // Đặt chiều rộng của nút theo nội dung
                                }}
                            >
                                Dịch
                            </Button>
                        </Stack>

                    </Grid>
                </Box>
            </Stack>
        </div>
    );

};

export default TranslationAdd;
