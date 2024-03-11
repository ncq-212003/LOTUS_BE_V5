import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, IconButton, TextField, Tooltip } from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import ModalDetail from 'src/components/modal-detail';
import ClassroomEdit from './classroom-edit';
import ActionColumn from 'src/components/action-column ';
import { listClassroomApi } from 'src/contexts/api/train/api-classroom';
import { HANDLERS_CLASSROOM } from 'src/contexts/reducer/train/reducer-classroom';
import { useApp } from 'src/hooks/use-app';
import { useEffect } from 'react';
import { useState } from 'react';
import { listCompanyApi } from 'src/contexts/api/company/api-company';
import BootstrapButton from 'src/components/button-custom-filter';



export default function ClassroomTable() {
    const [isModalDetailOpen, setIsModalDetailOpen] = React.useState(false);
    const [selectedRow, setSelectedRow] = React.useState(null);
    const [isDialogEditOpen, setisDialogEditOpen] = React.useState(false);
    const [state, dispatch] = useApp();
    const { classroom } = state;
    const { classrooms } = classroom;
    const [companyOption, setCompanyOption] = useState([]);
    const [activeFilter, setActiveFilter] = useState('Tất cả');
    const [filteredRows, setFilteredRows] = useState([]);
    const [dataWithSTT, setDataWithSTT] = useState([]);
    const [statusOption, setStatusOption] = useState([{ value: '1', label: 'Sắp khai giảng' }, { value: '2', label: 'Đang hoạt động' }, { value: '3', label: 'Đã kết thúc' }]);
    const [classTypeOption, setClassTypeOption] = useState([{ value: '1', label: 'Offline' }, { value: '2', label: 'Online' }])

    //List company
    useEffect(() => {
        const listCompanyName = async () => {
            const res = await listCompanyApi();
            if (Array.isArray(res.data) && res.data.length > 0) {
                const companies = res.data.map((c) => ({
                    label: c.companyName,
                    value: c.companyId,
                }));
                setCompanyOption(companies);
            }
        };
        listCompanyName();
    }, []);

    useEffect(() => {
        const listData = async () => {
            const res = await listClassroomApi();
            console.log(res.data);
            dispatch({
                type: HANDLERS_CLASSROOM.LIST_CLASSROOM,
                payload: res.data,
            });
        };
        listData();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log(classrooms);

    useEffect(() => {
        const updatedDataWithSTT = Array.isArray(classrooms) ? classrooms.map((classroom, index) => ({
            ...classroom,
            stt: index + 1,
            id: classroom.eClassId || index + 1,
            companyName: companyOption.find((c) => c.value === classroom.companyId)?.label,
            statusName: statusOption.find((s) => s.value == classroom.status)?.label,
        })) : [];

        setDataWithSTT(updatedDataWithSTT); // Cập nhật dataWithSTT vào state
        setFilteredRows(updatedDataWithSTT); // Cập nhật filteredRows khi statuss thay đổi

    }, [classrooms]);

    //Filter
    const handleFilter = (filterType) => {
        let filteredData = dataWithSTT;

        // Cập nhật trạng thái activeFilter khi người dùng chọn nút
        setActiveFilter(filterType);

        if (filterType === 'Tất cả') {
            // Nếu là tất cả, hiển thị toàn bộ dữ liệu
            setFilteredRows(dataWithSTT);
        } else {
            // Ngược lại, lọc dữ liệu theo language
            filteredData = dataWithSTT.filter(row => row.status === filterType);
            setFilteredRows(filteredData);
        }
    }

    const openDialogEdit = (params) => {
        setSelectedRow(params.row);
        setisDialogEditOpen(true);
    };

    const closeDialogEdit = () => {
        setisDialogEditOpen(false);
    };

    const handleViewDetail = (params) => {
        setSelectedRow(params.row);
        setIsModalDetailOpen(true);
    };

    const closeModalDetail = () => {
        setIsModalDetailOpen(false);
    };

    const columns = [
        { field: 'stt', headerName: 'STT', width: 50 },
        { field: 'code', headerName: 'Mã lớp học', width: 160 },
        { field: 'companyName', headerName: 'Thuộc công ty', width: 250 },
        { field: 'className', headerName: 'Tên lớp', width: 120 },
        { field: 'employeeFullName', headerName: 'Giáo viên chủ nhiệm', width: 150 },
        { field: 'openDate', headerName: 'Ngày khai giảng', width: 150 },
        { field: 'closeDate', headerName: 'Ngày bế giảng', width: 150 },
        { field: 'timeLearning', headerName: 'Giờ học', width: 120 },
        { field: 'process', headerName: 'Tiến độ', width: 100 },
        { field: 'loaiPhongHoc', headerName: 'Loại phòng học', width: 120 },
        { field: 'statusName', headerName: 'Trạng thái', width: 120 },
        // { field: 'memberIdMain', headerName: 'Lớp trưởng', width: 150 },
        // { field: 'memberIdPhone', headerName: 'Điện thoại lớp trưởng', width: 150 },
        {
            field: 'action',
            headerName: 'Thao tác',
            width: 150,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <>
                    <ActionColumn
                        handleViewDetail={handleViewDetail}
                        openDialogEdit={openDialogEdit}
                        params={params}
                    />
                </>
            ),
        }
    ];

    const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
        dienThoaiLopTruong: false,
        tienDo: false,
        gioHoc: false,
        loaiPhongHoc: false,
        phongHoc: false,
    });

    return (
        <Box style={{ width: '100%' }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'start',
                    alignItems: 'center'
                }}
            >
                <TextField
                    sx={{ margin: "12px 0px", width: '50%' }}
                    size="small"
                    label="Nhập nội dung tìm kiếm"
                    variant="outlined"
                />
                <Button
                    sx={{
                        margin: '8px',
                        backgroundColor: '#1C2536',
                        color: 'white'
                    }}
                    size='small'
                    variant="contained"
                >Tìm kiếm</Button>
            </Box>
            <Box>
                <BootstrapButton
                    size='small'
                    onClick={() => handleFilter('Tất cả')}
                    variant="contained"
                    sx={{
                        backgroundColor: activeFilter === 'Tất cả' ? '#1C2536' : '#4b9949',
                    }}
                >Tất cả</BootstrapButton>
                <BootstrapButton
                    size='small'
                    onClick={() => handleFilter('Sắp khai giảng')}
                    variant="contained"
                    sx={{
                        backgroundColor: activeFilter === 'Sắp khai giảng' ? '#1C2536' : '#4b9949',
                    }}
                >Sắp khai giảng</BootstrapButton>
                <BootstrapButton
                    size='small'
                    onClick={() => handleFilter('Đang hoạt động')}
                    variant="contained"
                    sx={{
                        backgroundColor: activeFilter === 'Đang hoạt động' ? '#1C2536' : '#4b9949',
                    }}
                >Đang hoạt động</BootstrapButton>
                <BootstrapButton
                    size='small'
                    variant="contained"
                    onClick={() => handleFilter('Đã kết thúc')}
                    sx={{
                        backgroundColor: activeFilter === 'Đã kết thúc' ? '#1C2536' : '#4b9949',
                    }}
                >Đã kết thúc</BootstrapButton>
            </Box>
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
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 20 },
                    },
                }}
                columnVisibilityModel={columnVisibilityModel}
                onColumnVisibilityModelChange={(newModel) =>
                    setColumnVisibilityModel(newModel)
                }
                pageSizeOptions={[20, 50]}
                checkboxSelection
            />
            <ModalDetail
                open={isModalDetailOpen}
                onClose={closeModalDetail}
                rowData={selectedRow}
                columns={columns}
            />
            <ClassroomEdit
                open={isDialogEditOpen}
                onClose={closeDialogEdit}
                id={selectedRow ? selectedRow.id : ""}
            />
        </Box>
    );
}
