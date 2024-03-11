/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Autocomplete, Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField, Tooltip } from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import ModalDetail from '../../../components/modal-detail';
import CompanyReceivingEdit from './company-receiving-edit';
import ActionColumn from 'src/components/action-column ';
import { format } from 'date-fns';
import { useApp } from 'src/hooks/use-app';
import { HANDLERS_COMPANY_RECEIVING } from 'src/contexts/reducer/partner/reducer-company-receiving';
import { findCompanyReceivingByIdApi, listCompanyReceivingApi, updateCompanyReceivingApi } from 'src/contexts/api/partner/api-company-receiving';
import { useEffect } from 'react';
import { useState } from 'react';
import SnackbarAlert from 'src/components/action-notification';
import { listUnionApi } from 'src/contexts/api/partner/api-union';

// Dữ liệu mẫu
// const rows = [
//     { id: 1, stt: 1, tenCongty: 'KTX A', maCty: 'P001', diaChi: 'Phòng 101', email: 'trong@example.com', sdt: '123456789', website: 'https://example.com', masothue: 'ABC123', loaiCty: 'Loại A', giakinhdoanh: 'GP001', logo_img: 'https://maludesign.vn/wp-content/uploads/2021/11/logo-cong-ty-xay-dung-6_1586786415-800x800.png', nguoidaidien: 'Người 1', chinhanh: 'Chi nhánh A', ngaythanhlap: '01/01/2022', fanpageCty: 'https://facebook.com/company1', ghiChu: 'Ghi chú 1', tinhTrang: 'Hoạt động', nghiepDoan: 'Nghiệp đoàn 1', quocGia: 'Quốc gia 1' },
//     { id: 2, stt: 2, tenCongty: 'Công ty ABC', maCty: 'P002', diaChi: 'Phòng 102', email: 'contact@abc.com', sdt: '987654321', website: 'https://abc-corp.com', masothue: 'XYZ789', loaiCty: 'Loại B', giakinhdoanh: 'GP002', logo_img: 'https://maludesign.vn/wp-content/uploads/2021/11/logo-cong-ty-xay-dung-3_1586785660.png', nguoidaidien: 'Người 2', chinhanh: 'Chi nhánh B', ngaythanhlap: '02/02/2022', fanpageCty: 'https://facebook.com/abc-company', ghiChu: 'Ghi chú 2', tinhTrang: 'Ngừng hoạt động', nghiepDoan: 'Nghiệp đoàn 2', quocGia: 'Quốc gia 2' },
//     { id: 3, stt: 3, tenCongty: 'Công ty XYZ', maCty: 'P003', diaChi: 'Phòng 103', email: 'info@xyzco.com', sdt: '555555555', website: 'https://xyzcompany.com', masothue: 'DEF456', loaiCty: 'Loại C', giakinhdoanh: 'GP003', logo_img: 'https://maludesign.vn/wp-content/uploads/2021/11/logo-cong-ty-xay-dung-7_1586451588-800x795.jpeg', nguoidaidien: 'Người 3', chinhanh: 'Chi nhánh C', ngaythanhlap: '03/03/2022', fanpageCty: 'https://facebook.com/xyz-corp', ghiChu: 'Ghi chú 3', tinhTrang: 'Hoạt động', nghiepDoan: 'Nghiệp đoàn 3', quocGia: 'Quốc gia 3' },
//     { id: 4, stt: 4, tenCongty: 'Tổ chức ABCDE', maCty: 'P004', diaChi: 'Phòng 104', email: 'abcde@org.com', sdt: '1111222333', website: 'https://abcde.org', masothue: 'MNO789', loaiCty: 'Loại D', giakinhdoanh: 'GP004', logo_img: 'https://maludesign.vn/wp-content/uploads/2021/11/logo-cong-ty-xay-dung-6_1586786415-800x800.png', nguoidaidien: 'Người 4', chinhanh: 'Chi nhánh D', ngaythanhlap: '04/04/2022', fanpageCty: 'https://facebook.com/abcde-org', ghiChu: 'Ghi chú 4', tinhTrang: 'Ngừng hoạt động', nghiepDoan: 'Nghiệp đoàn 4', quocGia: 'Quốc gia 4' },
//     { id: 5, stt: 5, tenCongty: 'Công ty ABX', maCty: 'P005', diaChi: 'Phòng 105', email: 'contact@abxco.com', sdt: '7777888899', website: 'https://abxcompany.com', masothue: 'GHI101', loaiCty: 'Loại E', giakinhdoanh: 'GP005', logo_img: 'https://maludesign.vn/wp-content/uploads/2021/11/logo-cong-ty-xay-dung-6_1586786415-800x800.png', nguoidaidien: 'Người 5', chinhanh: 'Chi nhánh E', ngaythanhlap: '05/05/2022', fanpageCty: 'https://facebook.com/abx-company', ghiChu: 'Ghi chú 5', tinhTrang: 'Hoạt động', nghiepDoan: 'Nghiệp đoàn 5', quocGia: 'Quốc gia 5' },
//     { id: 6, stt: 6, tenCongty: 'Công ty WXYZ', maCty: 'P006', diaChi: 'Phòng 106', email: 'info@wxyzco.com', sdt: '3333222111', website: 'https://wxyzcompany.com', masothue: 'JKL303', loaiCty: 'Loại F', giakinhdoanh: 'GP006', logo_img: 'https://maludesign.vn/wp-content/uploads/2021/11/logo-cong-ty-xay-dung-6_1586786415-800x800.png', nguoidaidien: 'Người 6', chinhanh: 'Chi nhánh F', ngaythanhlap: '06/06/2022', fanpageCty: 'https://facebook.com/wxyz-corp', ghiChu: 'Ghi chú 6', tinhTrang: 'Ngừng hoạt động', nghiepDoan: 'Nghiệp đoàn 6', quocGia: 'Quốc gia 6' },
//     { id: 7, stt: 7, tenCongty: 'Công ty QRS', maCty: 'P007', diaChi: 'Phòng 107', email: 'contact@qrsco.com', sdt: '8888666555', website: 'https://qrscompany.com', masothue: 'PQR123', loaiCty: 'Loại G', giakinhdoanh: 'GP007', logo_img: 'https://maludesign.vn/wp-content/uploads/2021/11/logo-cong-ty-xay-dung-6_1586786415-800x800.png', nguoidaidien: 'Người 7', chinhanh: 'Chi nhánh G', ngaythanhlap: '07/07/2022', fanpageCty: 'https://facebook.com/qrs-company', ghiChu: 'Ghi chú 7', tinhTrang: 'Hoạt động', nghiepDoan: 'Nghiệp đoàn 7', quocGia: 'Quốc gia 7' },
//     { id: 8, stt: 8, tenCongty: 'Công ty MNOP', maCty: 'P008', diaChi: 'Phòng 108', email: 'info@mnopco.com', sdt: '4444333222', website: 'https://mnopcompany.com', masothue: 'ABCDEF', loaiCty: 'Loại H', giakinhdoanh: 'GP008', logo_img: 'https://maludesign.vn/wp-content/uploads/2021/11/logo-cong-ty-xay-dung-6_1586786415-800x800.png', nguoidaidien: 'Người 8', chinhanh: 'Chi nhánh H', ngaythanhlap: '08/08/2022', fanpageCty: 'https://facebook.com/mnop-corp', ghiChu: 'Ghi chú 8', tinhTrang: 'Ngừng hoạt động', nghiepDoan: 'Nghiệp đoàn 8', quocGia: 'Quốc gia 8' },
//     { id: 9, stt: 9, tenCongty: 'Công ty EFG', maCty: 'P009', diaChi: 'Phòng 109', email: 'contact@efgco.com', sdt: '9999888777', website: 'https://efgcompany.com', masothue: 'LMN456', loaiCty: 'Loại I', giakinhdoanh: 'GP009', logo_img: 'https://maludesign.vn/wp-content/uploads/2021/11/logo-cong-ty-xay-dung-6_1586786415-800x800.png', nguoidaidien: 'Người 9', chinhanh: 'Chi nhánh I', ngaythanhlap: '09/09/2022', fanpageCty: 'https://facebook.com/efg-company', ghiChu: 'Ghi chú 9', tinhTrang: 'Hoạt động', nghiepDoan: 'Nghiệp đoàn 9', quocGia: 'Quốc gia 9' },
//     { id: 10, stt: 10, tenCongty: 'Công ty HIJK', maCty: 'P010', diaChi: 'Phòng 110', email: 'info@hijkco.com', sdt: '2222111333', website: 'https://hijkcompany.com', masothue: 'QRS789', loaiCty: 'Loại J', giakinhdoanh: 'GP010', logo_img: 'https://maludesign.vn/wp-content/uploads/2021/11/logo-cong-ty-xay-dung-6_1586786415-800x800.png', nguoidaidien: 'Người 10', chinhanh: 'Chi nhánh J', ngaythanhlap: '10/10/2022', fanpageCty: 'https://facebook.com/hijk-corp', ghiChu: 'Ghi chú 10', tinhTrang: 'Ngừng hoạt động', nghiepDoan: 'Nghiệp đoàn 10', quocGia: 'Quốc gia 10' },
// ];

const formatDate = (date) => {
    return format(new Date(date), 'dd-MM-yyyy');
};

export default function CompanyReceivingTable() {
    // state
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [isDialogEditOpen, setisDialogEditOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [nghiepDoanOption, setNghiepDoanOption] = useState([]);
    const [dataWithSTT, setDataWithSTT] = useState([]);
    const [filteredRows, setFilteredRows] = useState([]);
    const [textAlertForNotify, setTextAlertForNotify] = useState('');
    // context
    const [state, dispatch] = useApp();
    const { companyReceiving } = state;
    const { companies } = companyReceiving;

    useEffect(() => {
        const listData = async () => {
            const res = await listCompanyReceivingApi();
            dispatch({
                type: HANDLERS_COMPANY_RECEIVING.LIST_COMPANY_RECEIVING,
                payload: res.data,
            });
        };
        listData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //nghiepDoanOption
    useEffect(() => {
        const nghiepDoanOption = async () => {
            const res = await listUnionApi();
            if (Array.isArray(res.data) && res.data.length > 0) {
                const data = res.data.map((x) => ({
                    label: x.syndicateName,
                    value: x.syndicateId,
                }));
                setNghiepDoanOption(data);
            }
        };
        nghiepDoanOption();
    }, []);

    useEffect(() => {
        // Tính toán dataWithSTT trong useEffect để đảm bảo sử dụng dữ liệu mới nhất từ statuss
        const updatedDataWithSTT = Array.isArray(companies) ? companies.map((x, index) => ({
            ...x,
            stt: index + 1,
            id: x.id || index + 1,
            syndicate: nghiepDoanOption.find((com) => com.value === x.syndicateId)?.label,
        })) : [];

        setDataWithSTT(updatedDataWithSTT); // Cập nhật dataWithSTT vào state
        setFilteredRows(updatedDataWithSTT); // Cập nhật filteredRows khi statuss thay đổi
    }, [companies]);

    const openDialogEdit = (params) => {
        setSelectedRow(params.row);
        setisDialogEditOpen(true);
    };

    const closeDialogEdit = (isEvent) => {
        if (isEvent) {
            setisDialogEditOpen(false);
            setSnackbarSeverity("success");
            setSnackbarMessage("Sửa thành công !");
            setSnackbarOpen(true);
        } else {
            setisDialogEditOpen(false);
        }
    };

    const handleViewDetail = (params) => {
        setSelectedRow(params.row);
        setIsModalDetailOpen(true);
    };

    const closeModalDetail = () => {
        setIsModalDetailOpen(false);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleDelete = async (row) => {
        try {
            const dataRowDelete = {
                ...row,
                flag: "D",
                CreatedByHidden: "1",
                LastModifedByHidden: "1",
                SyndicateIdHidden: row.syndicateId,
            };

            dispatch({
                type: HANDLERS_COMPANY_RECEIVING.UPDATE_COMPANY_RECEIVING,
                payload: dataRowDelete,
            });

            // Gọi hàm update
            const response = await updateCompanyReceivingApi(dataRowDelete);

            if (response.status !== 200) {
                setSnackbarSeverity("error");
                setSnackbarMessage("Đã có lỗi xảy ra!");
                setSnackbarOpen(true);
                console.error("Error deleting market:", response);
            } else {
                setSnackbarSeverity("success");
                setSnackbarMessage("Đã xóa thành công!");
                setSnackbarOpen(true);
            }
        } catch (error) {
            console.error("Error deleting market:", error);
        }
    };

    const columns = [
        { field: 'stt', headerName: 'STT', width: 70 },
        {
            field: 'logo',
            headerName: 'Logo',
            width: 120,
            renderCell: (params) => (
                <Avatar
                    src={'https://lotus.i.tisbase.online' + params.row.logo}
                    alt="Logo"
                    sx={{ width: 40, height: 40 }}
                >Logo</Avatar>
            ),
        },
        { field: 'companyName', headerName: 'Tên công ty', width: 200 },
        { field: 'briefCode', headerName: 'Mã công ty', width: 130 },
        { field: 'address', headerName: 'Địa chỉ', width: 200 },
        { field: 'email', headerName: 'Email', width: 120 },
        { field: 'telephone', headerName: 'Số điện thoại', width: 120 },
        { field: 'website', headerName: 'Website', width: 120 },
        { field: 'taxCode', headerName: 'Mã số thuế', width: 120 },
        { field: 'typeCompany', headerName: 'Loại công ty', width: 120 },
        { field: 'licenseBusiness', headerName: 'File thông tin khác', width: 120 },
        {
            field: 'personResponsibilty',
            headerName: 'Người đại diện',
            width: 180,
            renderCell: (params) => (
                <span>{params.value}</span>
            ),
        },
        { field: 'personResponsibiltyRole', headerName: 'Chức vụ', width: 120 },
        {
            field: 'establishCompanyDate',
            headerName: 'Ngày thành lập',
            width: 120,
            renderCell: (params) => (
                <span>{formatDate(params.value)}</span>
            ),
        },
        { field: 'fanpage', headerName: 'Fanpage công ty', width: 120 },
        { field: 'description', headerName: 'Ghi chú', width: 120 },
        { field: 'status', headerName: 'Trạng thái', width: 120 },
        { field: 'syndicate', headerName: 'Nghiệp đoàn', width: 120 },
        {
            field: 'action',
            headerName: 'Thao tác',
            width: 150,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <ActionColumn
                    handleViewDetail={handleViewDetail}
                    openDialogEdit={openDialogEdit}
                    params={params}
                    handleDelete={() => handleDelete(params.row)}
                />
            ),
        }
    ];

    const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
        email: false,
        telephone: false,
        website: false,
        taxCode: false,
        licenseBusiness: false,
        personResponsibilty: false,
        establishCompanyDate: false,
        fanpage: false,
        description: false,
        typeCompany: false,
        personResponsibiltyRole: false,
    });

    const handleSearch = async () => {
        if (searchValue.length == 0) {
            setIsAlertDialogOpen(true);
            setTextAlertForNotify("Bạn phải nhập giá trị để tìm kiếm");
        } else {
            const result = await findCompanyReceivingByIdApi(searchValue);

            if (result.data != '') {
                const data = [result.data];

                const rowsWithId = data.map((item, index) => ({
                    ...item,
                    stt: index + 1,
                    id: new Date().valueOf(),
                }));

                setFilteredRows(rowsWithId);
            } else {
                setIsAlertDialogOpen(true);
                setTextAlertForNotify("Không tìm thấy kết quả");
            }
        }
    };

    // phuc vu tim kiem
    useEffect(() => {
        if (searchValue.length == 0) {
            setFilteredRows(dataWithSTT);
        }
    }, [searchValue]);

    const handleCloseAlert = async () => {
        setIsAlertDialogOpen(false);
    };

    return (
        <div style={{ width: '100%' }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'start',
                    alignItems: 'center'
                }}
            >
                <TextField
                    sx={{ margin: "12px 6px 12px 0px", width: '50%' }}
                    size="small"
                    label="Nhập tên công ty tìm kiếm"
                    variant="outlined"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <Autocomplete
                    sx={{ margin: "12px 0px 12px 6px", width: '50%' }}
                    fullWidth
                    size="small"
                    options={nghiepDoanOption}
                    renderInput={(params) => <TextField {...params}
                        label="Chọn nghiệp đoàn"
                        variant="outlined" />}
                />
                <Button
                    sx={{
                        margin: "8px",
                        backgroundColor: "#1C2536",
                        color: "white",
                        width: '10%',
                    }}
                    size='small'
                    variant="contained"
                    onClick={handleSearch}
                >Tìm kiếm</Button>
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
                typeDateTime={{ establishCompanyDate: 'dd-MM-yyyy' }}
                dateTimeFields={{ establishCompanyDate: true }}
            />
            <CompanyReceivingEdit
                open={isDialogEditOpen}
                onClose={closeDialogEdit}
                id={selectedRow ? selectedRow.companyId : ""}
            />
            <SnackbarAlert
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={handleCloseSnackbar}
            />
            {/*  alert when value search null */}
            <Dialog
                open={isAlertDialogOpen}
                onClose={handleCloseAlert}
            >
                <DialogTitle>Thông báo</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {textAlertForNotify}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCloseAlert}
                        autoFocus
                    >
                        Đóng
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
