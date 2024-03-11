import * as React from "react";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Stack, Dialog, DialogTitle, Box, TextField, Button, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import ModalDetail from "../../../components/modal-detail";
import ActionColumn from "src/components/action-column ";
import CertificationEdit from "./professionalCertification-edit";
import { listCertificationCompanyApi, updateCertificationCompanyApi, findCertificationCompanyApi } from "src/contexts/api/setting/api-certification-company";
import { HANDLERS_CERTIFICATION_COMPANY } from "src/contexts/reducer/setting/reducer-certification-company";
import { useApp } from "src/hooks/use-app";
import dayjs from 'dayjs';
import useFetchLocation from "src/contexts/api/location-api";
import SnackbarAlert from "src/components/action-notification";

export default function ProfessionalCertificationTable() {
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDialogEditOpen, setisDialogEditOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  // Tìm kiếm
  const [dataWithSTT, setDataWithSTT] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isAlertDialogOpen, setIsAlertDialogOpen] = React.useState(false);
  const [filteredRows, setFilteredRows] = useState([]);
  const [textAlertForNotify, setTextAlertForNotify] = useState('');
  const [cityId, setCityId] = useState(null);
  const [districtId, setDistrictId] = useState(null);
  const { cities, districts, wards } = useFetchLocation(cityId, districtId);
  const [state, dispatch] = useApp();
  const { certificationCompany } = state;
  const { certificationCompanys } = certificationCompany;

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

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  // delete row
  const handleDelete = async (row) => {
    try {
      const dataRowDelete = {
        ...row,
        flag: "D",
        LastModifiedByHidden: "1",
        CreatedByHidden: "1",
        LocationIdHidden: "1"
      };

      dispatch({
        type: HANDLERS_CERTIFICATION_COMPANY.UPDATE_CERTIFICATION_COMPANY,
        payload: dataRowDelete,
      });

      const response = await updateCertificationCompanyApi(dataRowDelete);

      if (response.status !== 200) {
        setSnackbarSeverity("error");
        setSnackbarMessage("Đã có lỗi xảy ra!");
        setSnackbarOpen(true);
        console.error("Error deleting CertificationCompany:", response);
      } else {
        setSnackbarSeverity("success");
        setSnackbarMessage("Đã xóa thành công!");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error deleting CertificationCompany:", error);
    }
  };

  const handleViewDetail = (params) => {
    setSelectedRow(params.row);
    setIsModalDetailOpen(true);
  };

  const closeModalDetail = () => {
    setIsModalDetailOpen(false);
  };

  const columns = [
    { field: "stt", headerName: "STT", width: 50 },
    { field: "certificationCompanyName", headerName: "Công ty", width: 200 },
    { field: "transactionName", headerName: "Tên giao dịch", width: 180 },
    { field: "type", headerName: "Loại hình doanh nghiệp", width: 400 },
    { field: "nameCity", headerName: "Địa điểm đặt trụ sở", width: 150 },
    { field: "address", headerName: "Địa chỉ công ty", width: 220 },
    { field: "phone", headerName: "Số điện thoại", width: 120 },
    { field: "fax", headerName: "Số fax", width: 130 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "registerDate", headerName: "Ngày đăng ký", width: 150 },
    { field: "licenseDate", headerName: "Ngày cấp giấy phép", width: 180 },
    { field: "numberLicense", headerName: "Số giấy phép", width: 180 },
    { field: "description", headerName: "Thông tin khác", width: 200 },
    { field: "representative", headerName: "Người đại diện", width: 200 },
    { field: "jobRepresentative", headerName: "Chức vụ đại diện", width: 200 },
    { field: "reprentivePhone", headerName: "Điện thoại người đại diện", width: 200 },
    { field: "signaturePersonName", headerName: "Người ký CV", width: 200 },
    { field: "jobSignaturePersonName", headerName: "Chức danh người ký CV", width: 180 },
    {
      field: "action",
      headerName: "Thao tác",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <ActionColumn
          handleViewDetail={handleViewDetail}
          openDialogEdit={openDialogEdit}
          params={params}
          handleDelete={() => handleDelete(params.row)}
        />
      ),
    },
  ];

  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
    phone: false,
    fax: false,
    email: false,
    registerDate: false,
    licenseDate: false,
    numberLicense: false,
    description: false,
    representative: false,
    jobRepresentative: false,
    reprentivePhone: false,
    signaturePersonName: false,
    jobSignaturePersonName: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listCertificationCompanyApi();
        if (response.status === 200) {
          dispatch({
            type: HANDLERS_CERTIFICATION_COMPANY.LIST_CERTIFICATION_COMPANY,
            payload: response.data
          })
        }
      } catch (error) {
        console.error("Đã xảy ra lỗi .Vui lòng kiểm tra lại ")
      }
    }
    fetchData();
  }, [])

  const rowData = Array.isArray(certificationCompanys) ? certificationCompanys.map((cer, index) => ({
    ...cer,
    stt: index + 1,
    id: cer.certificationCompanyId || index + 1,
    nameCity: cities.find((item) => item.value === cer.locationId)?.label,
    registerDate: cer.registerDate ? dayjs(cer.registerDate).format('DD/MM/YYYY') : '',
    licenseDate: cer.licenseDate ? dayjs(cer.licenseDate).format('DD/MM/YYYY') : '',
  })) : []

  // tim kiem
  useEffect(() => {
    // Tính toán dataWithSTT trong useEffect để đảm bảo sử dụng dữ liệu mới nhất từ statuss
    const updatedDataWithSTT = Array.isArray(certificationCompanys) ? certificationCompanys.map((cer, index) => ({
      ...cer,
      stt: index + 1,
      id: cer.id || index + 1,
      nameCity: cities.find((item) => item.value === cer.locationId)?.label,
      registerDate: cer.registerDate ? dayjs(cer.registerDate).format('DD/MM/YYYY') : '',
      licenseDate: cer.licenseDate ? dayjs(cer.licenseDate).format('DD/MM/YYYY') : '',
    })) : []

    setDataWithSTT(updatedDataWithSTT); // Cập nhật dataWithSTT vào state
    setFilteredRows(updatedDataWithSTT); // Cập nhật filteredRows khi statuss thay đổi
  }, [certificationCompanys]);

  // phuc vu tim kiem
  useEffect(() => {
    if (searchValue.length == 0) {
      // gia tri ban dau
      setFilteredRows(dataWithSTT);
    }
  }, [searchValue]);

  const handleCloseAlert = async () => {
    setIsAlertDialogOpen(false);
  };

  // phuc vu tim kiem
  const handleSearch = async () => {
    if (searchValue.length == 0) {
      setIsAlertDialogOpen(true);
      setTextAlertForNotify("Bạn phải nhập giá trị để tìm kiếm");
    } else {
      const result = await findCertificationCompanyApi(searchValue);

      if (result.data != '' && !/^[a-zA-Z]+$/.test(searchValue)) {
        const data = [result.data];

        const rowsWithId = data.map((cer, index) => ({
          ...cer,
          stt: index + 1,
          id: new Date().valueOf(),
          nameCity: cities.find((item) => item.value === cer.locationId)?.label,
          registerDate: cer.registerDate ? dayjs(cer.registerDate).format('DD/MM/YYYY') : '',
          licenseDate: cer.licenseDate ? dayjs(cer.licenseDate).format('DD/MM/YYYY') : '',
        }));
        setFilteredRows(rowsWithId);
      } else {
        setIsAlertDialogOpen(true);
        setTextAlertForNotify("Không tìm thấy kết quả");
      }
    }
  };
  // end

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <TextField
          sx={{ margin: "12px 0px", width: "50%" }}
          size="small"
          label="Nhập nội dung tìm kiếm"
          variant="outlined"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
        <Button
          sx={{
            margin: "8px",
            backgroundColor: "#1C2536",
            color: "white",
          }}
          size="small"
          variant="contained"
          onClick={handleSearch}
        >
          Tìm kiếm
        </Button>
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

      <CertificationEdit
        open={isDialogEditOpen}
        onClose={closeDialogEdit}
        id={selectedRow ? selectedRow.certificationCompanyId : ""}
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
