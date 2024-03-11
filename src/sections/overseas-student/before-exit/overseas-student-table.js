/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-max-props-per-line */
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Alert, Autocomplete, Avatar, Box, Button, Checkbox, Grid, IconButton, SvgIcon, TextField, Tooltip, Typography, styled } from '@mui/material';
import { CheckBox, CheckBoxOutlineBlank, Delete, Edit, Search, UnfoldMore, Visibility } from '@mui/icons-material';
import ModalDetail from 'src/components/modal-detail';
import OverseasStudentEdit from '../edit/overseas-student-edit';
import ActionColumn from 'src/components/action-column ';
import OverseasStudentDetail from '../detail/overseas-student-detail';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { useState } from 'react';
import { useApp } from 'src/hooks/use-app';
import { countStudentApi, listStudentApi, listStudentPaginationApi } from 'src/contexts/api/overseas-student/api-student';
import { HANDLERS_OVERSEAS_STUDENT } from 'src/contexts/reducer/overseas-student/reducer-overseas-student';
import { useEffect } from 'react';
import { fetchCities, fetchDistricts, fetchWards } from 'src/contexts/api/location-api';

const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    padding: '6px 12px',
    border: '1px solid',
    backgroundColor: '#4b9949',
    borderRadius: '1px',
    '&:hover': {
        backgroundColor: '#4b9949',
        borderColor: '#4b9949',
        boxShadow: 'none',
    },
    '&:focus': {
        boxShadow: 'none',
        backgroundColor: '#1C2536',
    },
});

const filterOptions = [
    'Chương trình tham gia',
    'Nguồn cung ứng (tỉnh thành)',
    'Thị trường',
    'Trình độ văn hóa',
    'Độ tuổi',
    'Kết quả sơ tuyển',
];

const filterNames = [
    'Tất cả',
    'Tham gia phỏng vấn',
    'Đỗ đơn hàng',
    'Hủy đơn hàng',
    'Đang học tiếng',
    'Bảo lưu',
    'Xuất cảnh',
    'Hoàn thành hợp đồng về nước',
    'Hoàn thành hợp đồng trước hạn',
    'Vi phạm',
    'Rút / hủy hồ sơ',
    // 'Đang tư vấn',
    // 'Chưa trúng tuyển',
    // 'Chờ nhập học',
    // 'Đã nhập học',
    // 'Đã về nước'
];

const rows = [
    { id: 1, stt: 1, maHoSo: 'PR-DHS-20230115-25842', ngayDangKy: '27/10/2023', hoTen: 'Nguyễn Văn A', ngaySinh: '1990-05-15', gioiTinh: 'Nam', honNhan: 'Đã kết hôn', trangThai: 'Lưu tạm', anh: 'https://faceinch.vn/upload/news/chup-anh-the-tha-toc-3007.jpg' },
    { id: 2, stt: 2, maHoSo: 'PR-DHS-20230115-39760', ngayDangKy: '28/10/2023', hoTen: 'Trần Thị B', ngaySinh: '1995-02-20', gioiTinh: 'Nữ', honNhan: 'Độc thân', trangThai: 'Lưu tạm', anh: 'https://tiemanhsky.com/wp-content/uploads/2020/03/61103071_2361422507447925_6222318223514140672_n_1.jpg' },
    { id: 3, stt: 3, maHoSo: 'PR-DHS-20230115-83848', ngayDangKy: '29/10/2023', hoTen: 'Lê Văn C', ngaySinh: '1987-11-10', gioiTinh: 'Nam', honNhan: 'Đã kết hôn', trangThai: 'Hoàn thành', anh: 'https://chupanhthe.vn/img/Tiem-chup-anh-the-lam-ho-chieu-lay-ngay-tphcm-1.jpg' },
    { id: 4, stt: 4, maHoSo: 'PR-DHS-20230115-32448', ngayDangKy: '30/10/2023', hoTen: 'Phạm Thị D', ngaySinh: '1998-09-05', gioiTinh: 'Nữ', honNhan: 'Độc thân', trangThai: 'Lưu tạm', anh: 'https://bizweb.dktcdn.net/100/409/603/files/bao-gia-in-anh-the-lay-ngay-3.jpg?v=1631007122865' },
    { id: 5, stt: 5, maHoSo: 'PR-DHS-20230115-46353', ngayDangKy: '31/10/2023', hoTen: 'Vũ Văn E', ngaySinh: '2001-03-25', gioiTinh: 'Nam', honNhan: 'Đã kết hôn', trangThai: 'Hoàn thành', anh: 'https://mayanhhoangto.com/wp-content/uploads/2022/08/giu-lung-va-dau-thang.jpg' },
    { id: 6, stt: 6, maHoSo: 'PR-DHS-20230115-57180', ngayDangKy: '01/11/2023', hoTen: 'Nguyễn Thị F', ngaySinh: '1996-07-14', gioiTinh: 'Nữ', honNhan: 'Độc thân', trangThai: 'Hoàn thành', anh: 'https://khoinguonsangtao.vn/wp-content/uploads/2022/11/mau-anh-the.jpg' },
    { id: 7, stt: 7, maHoSo: 'PR-DHS-20230115-94934', ngayDangKy: '02/11/2023', hoTen: 'Trần Văn G', ngaySinh: '2000-01-30', gioiTinh: 'Nam', honNhan: 'Đã kết hôn', trangThai: 'Lưu tạm', anh: 'https://phunugioi.com/wp-content/uploads/2021/10/Nhung-mau-anh-the-dep-tip-chup-anh-the-dep-1.jpg' },
    { id: 8, stt: 8, maHoSo: 'PR-DHS-20230115-68469', ngayDangKy: '03/11/2023', hoTen: 'Lê Thị H', ngaySinh: '1993-04-19', gioiTinh: 'Nữ', honNhan: 'Độc thân', trangThai: 'Lưu tạm', anh: 'https://toigingiuvedep.vn/wp-content/uploads/2021/07/mau-anh-the-dep-chat-luong.jpg' },
    { id: 9, stt: 9, maHoSo: 'PR-DHS-20230115-40092', ngayDangKy: '04/11/2023', hoTen: 'Phạm Văn I', ngaySinh: '1991-08-09', gioiTinh: 'Nam', honNhan: 'Đã kết hôn', trangThai: 'Hoàn thành', anh: 'https://toigingiuvedep.vn/wp-content/uploads/2021/07/mau-anh-the-dep-sat-net.jpeg' },
    { id: 10, stt: 10, maHoSo: 'PR-DHS-20230115-43256', ngayDangKy: '05/11/2023', hoTen: 'Vũ Thị K', ngaySinh: '1997-12-28', gioiTinh: 'Nữ', honNhan: 'Độc thân', trangThai: 'Lưu tạm', anh: 'https://alltop.vn/backend/media/images/posts/1012/Sang_Studio-108906.jpg' },
];

export default function OverseasStudentTable() {
    // state
    const [listDataTable, setListDataTable] = useState([]);
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [filteredRows, setFilteredRows] = useState([]);
    const [isDialogEditOpen, setisDialogEditOpen] = useState(false);
    const [isDialogDetailOpen, setisDialogDetailOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState('Tất cả');
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [showAll, setShowAll] = useState(false);
    //context
    const [state, dispatch] = useApp();
    const { overseasStudent } = state;
    const { duHocSinh } = overseasStudent;
    //Pagination 
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 20,
    });
    const [countStudent, setCountStudent] = useState(0);
    // toggle button filter on table
    const [visibleGroups, setVisibleGroups] = useState(filterNames);

    const handleToggleShowAll = () => {
        setShowAll(!showAll);
        // Khi nhấn nút hiển thị tất cả, hãy hiển thị toàn bộ danh sách
        if (!showAll) {
            // Khi nhấn nút ẩn đi, chỉ hiển thị 8 nhóm đầu tiên
            setVisibleGroups(filterNames.slice(0, 8));
            
        } else {
            setVisibleGroups(filterNames);
        }
    };

    //List student use pagination
    useEffect(() => {
        const listData = async () => {
            const res = await listStudentPaginationApi(paginationModel.page + 1, paginationModel.pageSize);
            dispatch({
                type: HANDLERS_OVERSEAS_STUDENT.LIST_OVERSEAS_STUDENT,
                payload: res.data,
            });
        };
        listData();
    }, [paginationModel]);

    //Count student
    useEffect(() => {
        const countData = async () => {
            const res = await countStudentApi();
            setCountStudent(res.data);
        };
        countData();
    }, []);

    useEffect(() => {
        const updateListDataTable = async () => {
            if (duHocSinh) {
                const updatedList = await Promise.all(
                    duHocSinh.map(async (labor, index) => {
                        const { maThanhPho, maQuan, maPhuong } = labor;

                        const [cities, districts, wards] = await Promise.all([
                            fetchCities(),
                            fetchDistricts(maThanhPho),
                            fetchWards(maQuan),
                        ]);

                        return {
                            ...labor,
                            stt: index + 1,
                            id: labor.iLaborId || index + 1,
                            hoTen: labor.lastName + " " + labor.middleName + " " + labor.firstName,
                            // commonStatusId: status.find((stt) => stt.value === labor.commonStatusId)?.label,
                            nameCity: cities.find((city) => city.value === maThanhPho),
                            nameDistrict: districts.find((district) => district.value === maQuan),
                            nameWard: wards.find((ward) => ward.value === maPhuong),
                        };
                    })
                );
                setListDataTable(updatedList);
                setFilteredRows(updatedList);
            }
        };
        updateListDataTable();
    }, [duHocSinh]);

    const openDialogEdit = (params) => {
        setSelectedRow(params.row);
        setisDialogEditOpen(true);
    };

    const closeDialogEdit = () => {
        setisDialogEditOpen(false);
    };

    const openDialogDetail = (params) => {
        setSelectedRow(params.row);
        setisDialogDetailOpen(true);
    };

    const closeDialogDetail = () => {
        setisDialogDetailOpen(false);
    };

    const handleViewDetail = (params) => {
        setSelectedRow(params.row);
        setIsModalDetailOpen(true);
    };

    const closeModalDetail = () => {
        setIsModalDetailOpen(false);
    };

    const handleFilter = (filterType) => {
        let filteredData = listDataTable;

        // Cập nhật trạng thái activeFilter khi người dùng chọn nút
        setActiveFilter(filterType);

        switch (filterType) {
            case 'Tất cả':
                filteredData = listDataTable;
                break;
            case 'Đang tư vấn':
                filteredData = listDataTable.filter(row => row.gioiTinh === 'Nam');
                break;
            case 'Chưa trúng tuyển':
                filteredData = listDataTable.filter(row => row.gioiTinh === 'Nữ');
                break;
            // Thêm các trường hợp lọc khác tại đây
            default:
                filteredData = listDataTable;
                break;
        }
        setFilteredRows(filteredData);
    }

    const columns = [
        { field: 'stt', headerName: 'STT', width: 70 },
        {
            field: "avatar",
            headerName: "Ảnh",
            width: 50,
            renderCell: (params) => (
                <Avatar src={"https://lotus.i.tisbase.online" + params.row.avatar} alt="Avatar" sx={{ width: 40, height: 40 }}>
                    Avatar
                </Avatar>
            ),
        },
        { field: 'profileCode', headerName: 'Mã hồ sơ', width: 200, },
        { field: 'iStudentCode', headerName: 'Mã học sinh', width: 200 },
        { field: 'hoTen', headerName: 'Họ và tên', width: 180 },
        { field: 'mobilePhone', headerName: 'Số điện thoại', width: 120 },
        { field: 'email', headerName: 'Email', width: 150 },
        { field: "commonStatusId", headerName: "Trạng thái", width: 100 },
        {
            field: 'action',
            headerName: 'Thao tác',
            width: 150,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <>
                    <Tooltip title="Chi tiết">
                        <IconButton
                            sx={{ color: "black" }}
                            onClick={(event) => {
                                event.stopPropagation();
                                openDialogDetail(params);
                            }}
                        >
                            <Visibility />
                        </IconButton>
                    </Tooltip>
                    <ActionColumn
                        openDialogEdit={openDialogEdit}
                        params={params}
                        buttonType="edit" // chỉ hiển thị nút "Chỉnh sửa"
                    />
                    <ActionColumn
                        openDialogEdit={openDialogEdit}
                        params={params}
                        buttonType="delete" // chỉ hiển thị nút "Xóa"
                    />
                </>

            ),
            sortable: false,
            filterable: false,
            resizable: false,
            disableColumnMenu: true,
        }
    ];

    const [columnVisibilityModel, setColumnVisibilityModel] = useState({
        dienThoaiLopTruong: false,
        tienDo: false,
        gioHoc: false,
        loaiPhongHoc: false,
        phongHoc: false,
    });

    const handleChangeSelectFilter = (event, newValues) => {
        setSelectedFilters(newValues);
    };

    const renderFilterComponent = () => {
        return selectedFilters.map((filter) => {
            switch (filter) {
                case 'Chương trình tham gia':
                    return (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                        >
                            <Autocomplete
                                fullWidth
                                size="small"
                                options={[]}
                                renderInput={(params) => <TextField {...params}
                                    label="Chương trình tham gia"
                                    variant="outlined"
                                />}
                            />
                        </Grid>
                    );
                case 'Nguồn cung ứng (tỉnh thành)':
                    return (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                        >
                            <Autocomplete
                                fullWidth
                                size="small"
                                options={[]}
                                renderInput={(params) => <TextField {...params}
                                    label="Nguồn cung ứng (tỉnh thành)"
                                    variant="outlined"
                                />}
                            />
                        </Grid>
                    );
                case 'Thị trường':
                    return (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                        >
                            <Autocomplete
                                fullWidth
                                size="small"
                                options={[]}
                                renderInput={(params) => <TextField {...params}
                                    label="Thị trường"
                                    variant="outlined"
                                />}
                            />
                        </Grid>
                    );
                case 'Trình độ văn hóa':
                    return (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                        >
                            <Autocomplete
                                fullWidth
                                size="small"
                                options={[]}
                                renderInput={(params) => <TextField {...params}
                                    label="Trình độ văn hóa"
                                    variant="outlined"
                                />}
                            />
                        </Grid>
                    );
                case 'Kết quả sơ tuyển':
                    return (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                        >
                            <Autocomplete
                                fullWidth
                                size="small"
                                options={[]}
                                renderInput={(params) => <TextField {...params}
                                    label="Kết quả sơ tuyển"
                                    variant="outlined"
                                />}
                            />
                        </Grid>
                    );
                case 'Độ tuổi':
                    return (
                        <>
                            <Grid
                                item
                                xs={12}
                                sm={3}
                            >
                                <TextField
                                    sx={{ width: '100%' }}
                                    size="small"
                                    label="Từ độ tuổi"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={3}
                            >
                                <TextField
                                    sx={{ width: '100%' }}
                                    size="small"
                                    label="Đến độ tuổi"
                                    variant="outlined"
                                />
                            </Grid>
                        </>
                    );
                default:
                    return null;
            }
        });
    }

    return (
        <div style={{ width: '100%' }}>
            <Grid
                container
                spacing={2}
            >
                <Grid
                    item
                    xs={12}
                    sm={6}>
                    <TextField
                        sx={{ width: '100%' }}
                        size="small"
                        label="Nhập kinh nghiệm / Tên DHS / Mã DHS tìm kiếm"
                        variant="outlined"
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={6}
                >
                    <Autocomplete
                        multiple
                        disableCloseOnSelect
                        sx={{ width: '100%' }}
                        fullWidth
                        size="small"
                        limitTags={0}
                        options={filterOptions}
                        onChange={(event, newValue) => handleChangeSelectFilter(event, newValue)}
                        renderOption={(props, option, { selected }) => (
                            <li {...props}>
                                <Checkbox
                                    icon={<CheckBoxOutlineBlank fontSize="small" />}
                                    checkedIcon={<CheckBox fontSize="small" />}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                />
                                {option}
                            </li>
                        )}
                        renderInput={(params) => <TextField {...params}
                            label="Thêm lọc"
                            variant="outlined"
                            InputProps={{
                                ...params.InputProps,
                                style: { color: '#ccc' }
                            }}
                        />}
                    />
                </Grid>
                <Grid
                    container
                    item
                    spacing={2}
                >
                    {renderFilterComponent()}
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={6}>
                    <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        adapterLocale={"en-gb"}
                    >
                        <DatePicker
                            sx={{ width: '100%' }}
                            name="fromDate"
                            slotProps={{
                                textField: {
                                    size: "small",
                                    variant: "outlined",
                                },
                            }}
                            label="Từ ngày"
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        adapterLocale={"en-gb"}
                    >
                        <DatePicker
                            sx={{ width: '100%' }}
                            name="toDate"
                            slotProps={{
                                textField: {
                                    size: "small",
                                    variant: "outlined",
                                },
                            }}
                            label="Đến ngày"
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Button
                        startIcon={(
                            <SvgIcon fontSize="small">
                                <Search />
                            </SvgIcon>
                        )}
                        variant="contained"
                        sx={{
                            backgroundColor: "#1C2536",
                            color: "white",
                            float: 'right'
                        }}
                    >
                        Tìm kiếm
                    </Button>
                </Grid>
            </Grid>
            <Box>
                {visibleGroups.map(filterName => (
                    <BootstrapButton
                        key={filterName}
                        size='small'
                        onClick={() => handleFilter(filterName)}
                        variant="contained"
                        sx={{
                            backgroundColor: activeFilter === filterName ? '#1C2536' : '#4b9949',
                        }}
                    >
                        {filterName}
                    </BootstrapButton>
                ))}
                <Tooltip title={showAll ? 'Hiển thị thêm' : 'Ẩn bớt'}
                    placement="top-start">
                    <BootstrapButton
                        size='small'
                        variant="contained"
                        onClick={handleToggleShowAll}
                        sx={{
                            backgroundColor: '#fff',
                            '&:hover': {
                                backgroundColor: '#f1f5f9',
                                borderColor: '#f1f5f9',
                                boxShadow: 'none',
                            },
                            '&:focus': {
                                boxShadow: 'none',
                                backgroundColor: '#f1f5f9',
                            },
                        }}
                    >
                        {showAll ? (<UnfoldMore sx={{ color: 'black' }} />) : (<UnfoldMore sx={{ color: 'black' }} />)}
                    </BootstrapButton>
                </Tooltip>
            </Box>
            <Alert
                icon={false}
                severity="info"
                sx={{
                    backgroundColor: 'rgb(229, 246, 253)',
                    margin: '6px 0',
                    borderRadius: '0px'
                }}
            >
                <Typography variant="subtitle2" >
                    Số lượng DHS: 10
                </Typography>
            </Alert>
            <DataGrid
                rows={filteredRows}
                columns={columns}
                sx={{
                    borderColor: 'rgb(224, 224, 224)',
                    '& .MuiDataGrid-row': {
                        border: '0.1px solid rgb(224, 224, 224) !important',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#f0f0f0',
                        borderBottom: '1px solid #ccc '
                    },
                }}
                // initialState={{
                //     pagination: {
                //         paginationModel: { page: 0, pageSize: 20 },
                //     },
                // }}
                columnVisibilityModel={columnVisibilityModel}
                onColumnVisibilityModelChange={(newModel) =>
                    setColumnVisibilityModel(newModel)
                }
                checkboxSelection
                rowCount={countStudent ? countStudent : 0}
                pageSizeOptions={[20, 50]}
                paginationModel={paginationModel}
                paginationMode="server"
                onPaginationModelChange={setPaginationModel}
            />
            <ModalDetail
                open={isModalDetailOpen}
                onClose={closeModalDetail}
                rowData={selectedRow}
                columns={columns}
            />
            <OverseasStudentEdit
                open={isDialogEditOpen}
                onClose={closeDialogEdit}
                rowData={selectedRow ? selectedRow : ""}
            />
            <OverseasStudentDetail
                open={isDialogDetailOpen}
                onClose={closeDialogDetail}
                rowData={selectedRow ? selectedRow : ""}
            />
        </div>
    );
}
