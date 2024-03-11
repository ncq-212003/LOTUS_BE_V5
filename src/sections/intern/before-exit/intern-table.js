import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  TextField,
  styled,
  Tooltip,
  IconButton,
  Avatar,
  Grid,
  Autocomplete,
  SvgIcon,
  Alert,
  Typography,
  Checkbox,
} from "@mui/material";
import {
  CheckBox,
  CheckBoxOutlineBlank,
  Delete,
  Edit,
  Search,
  Visibility,
} from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import ModalDetail from "src/components/modal-detail";
import ActionColumn from "src/components/action-column ";
import InternDetail from "../detail/intern-detail";
import InternEdit from "../edit/intern-edit";
import { useState } from "react";
import { useApp } from "src/hooks/use-app";
import { HANDLERS_INTERN } from "src/contexts/reducer/intern/reducer-intern";
import {
  countInternApi,
  listInternApi,
  listInternPaginationApi,
} from "src/contexts/api/intern/api-intern";
import { useEffect } from "react";
import { fetchCities, fetchDistricts, fetchWards } from "src/contexts/api/location-api";
import { listStatusByAliasApi } from "src/contexts/api/setting/api-status";
import { listEmployeeApi } from "src/contexts/api/company/api-employee";
import { listSupplyTypeApi } from "src/contexts/api/setting/api-supply-type";
import { listSupplySourceApi } from "src/contexts/api/partner/api-supplySource";
import { useMemo } from "react";
import { listMarketApi } from "src/contexts/api/setting/api-market";
import { listProfessionApi } from "src/contexts/api/setting/api-profession";

const BootstrapButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  padding: "6px 12px",
  border: "1px solid",
  backgroundColor: "#4b9949",
  borderRadius: "1px",
  "&:hover": {
    backgroundColor: "#4b9949",
    borderColor: "#4b9949",
    boxShadow: "none",
  },
  "&:focus": {
    boxShadow: "none",
    backgroundColor: "#1C2536",
  },
});

const filterOptions = [
  "Chương trình tham gia",
  "Nguồn cung ứng (tỉnh thành)",
  "Thị trường",
  "Trình độ văn hóa",
  "Độ tuổi",
  "Kết quả sơ tuyển",
];

const filterNames = [
  "Tất cả",
  "Tham gia phỏng vấn",
  "Đỗ đơn hàng",
  "Hủy đơn hàng",
  "Đang học tiếng",
  "Bảo lưu",
  "Xuất cảnh",
  "Hoàn thành hợp đồng về nước",
  "Hoàn thành hợp đồng trước hạn",
  "Vi phạm",
  "Rút / hủy hồ sơ",
  // 'Đang tư vấn',
  // 'Chưa trúng tuyển',
  // 'Chờ nhập học',
  // 'Đã nhập học',
  // 'Đã về nước'
];

export default function InternTable() {
  const [listDataTable, setListDataTable] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [filteredRows, setFilteredRows] = useState([]);
  const [isDialogEditOpen, setisDialogEditOpen] = useState(false);
  const [isDialogDetailOpen, setisDialogDetailOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Tất cả");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [status, setStatus] = useState([]);
  const [employeeOption, setEmployeeOption] = useState([]);
  const [supplySourceOption, setSupplySourceOption] = useState([]);
  const [marketOption, setMarketOption] = useState([]);
  const [professionOption, setProfessionOption] = useState([]);

  //Count quantity Intern
  const [countIntern, setCountIntern] = useState(0);

  //context
  const [state, dispatch] = useApp();
  const { intern } = state;
  const { thucTapSinh } = intern;

  //Pagination
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });

  //List intern use pagination
  useEffect(() => {
    const listData = async () => {
      const res = await listInternPaginationApi(paginationModel.page + 1, paginationModel.pageSize);
      dispatch({
        type: HANDLERS_INTERN.LIST_INTERN,
        payload: res.data,
      });
    };
    listData();
  }, [paginationModel]);

  //Count intern
  useEffect(() => {
    const countData = async () => {
      const res = await countInternApi();
      setCountIntern(res.data);
    };
    countData();
  }, []);

  //listStatusIntern
  useEffect(() => {
    const listData = async () => {
      const res = await listStatusByAliasApi("thuc-tap-sinh");
      if (Array.isArray(res.data) && res.data.length > 0) {
        const data = res.data.map((com) => ({
          label: com.statusName,
          value: com.commonStatusId,
        }));
        setStatus(data);
      }
    };
    listData();
  }, []);

  //listEmployeeOption
  useEffect(() => {
    const listData = async () => {
      const res = await listEmployeeApi();
      if (Array.isArray(res.data) && res.data.length > 0) {
        const data = res.data.map((x) => ({
          label: x.lastName + " " + x.middleName + " " + x.firstName,
          value: x.employeeId,
          employeeCode: x.employeeCode,
        }));
        setEmployeeOption(data);
      }
    };
    listData();
  }, []);

  //listEmployeeOption
  useEffect(() => {
    const listData = async () => {
      const res = await listEmployeeApi();
      if (Array.isArray(res.data) && res.data.length > 0) {
        const data = res.data.map((x) => ({
          label: x.lastName + " " + x.middleName + " " + x.firstName,
          value: x.employeeId,
          employeeCode: x.employeeCode,
        }));
        setEmployeeOption(data);
      }
    };
    listData();
  }, []);

  //list supply source
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Sử dụng Promise.all để gọi các hàm API đồng thời
        const [supplyTypeRes, cityOptions, supplySourceRes] = await Promise.all([
          listSupplyTypeApi(),
          fetchCities(),
          listSupplySourceApi(),
        ]);

        if (Array.isArray(supplyTypeRes.data) && supplyTypeRes.data.length > 0) {
          const supplySourceTypes = supplyTypeRes.data.map((sst) => ({
            supplySourceTypeName: sst.supplySourceTypeName,
            supplySourceTypeId: sst.supplySourceTypeId,
          }));

          if (Array.isArray(supplySourceRes.data) && supplySourceRes.data.length > 0) {
            const supplySources = supplySourceRes.data.map((ss) => ({
              value: ss.supplySourceId,
              label:
                ss.supplySourceTypeId === 2
                  ? cityOptions.find((city) => city.value === ss.locationId)?.label
                  : ss.supplySourceTypeId === 1
                  ? ss.fullName
                  : supplySourceTypes.find(
                      (sst) => sst.supplySourceTypeId === ss.supplySourceTypeId
                    )?.supplySourceTypeName,
              typeSupply:
                ss.supplySourceTypeId === 1 || ss.supplySourceTypeId === 2
                  ? supplySourceTypes.find(
                      (sst) => sst.supplySourceTypeId === ss.supplySourceTypeId
                    )?.supplySourceTypeName
                  : "Khác",
            }));

            setSupplySourceOption(supplySources);
          }
        }
      } catch (error) {
        // Xử lý lỗi nếu có
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  //listMarketOption
  useEffect(() => {
    const listData = async () => {
      const res = await listMarketApi();
      if (Array.isArray(res.data) && res.data.length > 0) {
        const data = res.data.map((x) => ({
          label: x.marketName,
          value: x.marketId,
        }));
        setMarketOption(data);
      }
    };
    listData();
  }, []);

  //listProfessionOption
  useEffect(() => {
    const listData = async () => {
      const res = await listProfessionApi();
      if (Array.isArray(res.data) && res.data.length > 0) {
        const data = res.data.map((x) => ({
          label: x.jobName,
          value: x.jobId,
          code: x.code,
          marketId: x.marketId,
        }));
        setProfessionOption(data);
      }
    };
    listData();
  }, []);

  //list datatable
  useEffect(() => {
    const updateListDataTable = async () => {
      if (thucTapSinh?.length) {
        const updatedList = await Promise.all(
          thucTapSinh.map(async (labor, index) => {
            const { domicileCityId, domicileDistrictId, domicileWardId } = labor;
            const [cities, districts, wards] = await Promise.all([
              fetchCities(),
              fetchDistricts(domicileCityId),
              fetchWards(domicileDistrictId),
            ]);
            const listWishMarket = Array.isArray(JSON.parse(labor.listWishMarketId))
              ? JSON.parse(labor.listWishMarketId)
              : [];

            const experience = Array.isArray(JSON.parse(labor.listPassExperience))
              ? JSON.parse(labor.listPassExperience)
              : [];

            return {
              ...labor,
              stt: index + 1,
              id: labor.iLaborId || index + 1,
              hoTen: labor.lastName + " " + labor.middleName + " " + labor.firstName,
              commonStatusId: status.find((stt) => stt.value === labor.commonStatusId)?.label,
              nameCity: cities.find((city) => city.value === domicileCityId),
              nameDistrict: districts.find((district) => district.value === domicileDistrictId),
              nameWard: wards.find((ward) => ward.value === domicileWardId),
              employeeName: employeeOption.find((emp) => emp.value === labor.employeeRecruitmentId),
              supplySourceName: supplySourceOption.find(
                (ssp) => ssp.value === labor.supplySourceId
              ),
              wantToGoes: marketOption.filter((mar) =>
                listWishMarket.map((w) => w.id).includes(mar.value)
              ),
              listExperiences: professionOption.filter((exp) =>
              experience.map((e) => e.id).includes(exp.value)
              ),
            };
          })
        );
        setListDataTable(updatedList);
        setFilteredRows(updatedList);
      }
    };
    updateListDataTable();
  }, [thucTapSinh]);

  const openDialogEdit = (params) => {
    setSelectedRow(params.row);
    setisDialogEditOpen(true);
    dispatch({
      type: HANDLERS_INTERN.RESET_INTERN,
    });
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

    setActiveFilter(filterType);

    switch (filterType) {
      case "Tất cả":
        filteredData = listDataTable;
        break;
      case "Lưu tạm":
        filteredData = listDataTable.filter((row) => row.gioiTinh === "Nam");
        break;
      case "Chưa sơ tuyển":
        filteredData = listDataTable.filter((row) => row.gioiTinh === "Nữ");
        break;
      // Thêm các trường hợp lọc khác tại đây
      default:
        filteredData = listDataTable;
        break;
    }
    setFilteredRows(filteredData);
  };

  const columns = [
    {
      field: "stt",
      headerName: "STT",
      width: 10,
    },
    {
      field: "avatar",
      headerName: "Ảnh",
      width: 50,
      renderCell: (params) => (
        <Avatar
          src={"https://lotus.i.tisbase.online" + params.row.avatar}
          alt="Avatar"
          sx={{ width: 40, height: 40 }}
        >
          Avatar
        </Avatar>
      ),
    },
    {
      field: "profileCode",
      headerName: "Mã hồ sơ",
      width: 180,
    },
    {
      field: "iLaborCode",
      headerName: "Mã thực tập sinh",
      width: 180,
    },
    {
      field: "hoTen",
      headerName: "Họ và tên",
      width: 160,
    },
    {
      field: "mobilePhone",
      headerName: "Số điện thoại",
      width: 130,
    },
    {
      field: "email",
      headerName: "Email",
      width: 130,
    },
    { field: "commonStatusId", headerName: "Trạng thái", width: 100 },

    {
      field: "action",
      headerName: "Thao tác",
      width: 150,
      headerAlign: "center",
      align: "center",
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
    },
  ];

  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
    profileCode: true,
    tienDo: true,
    gioHoc: false,
    loaiPhongHoc: false,
    phongHoc: false,
  });

  const handleChangeSelectFilter = (event, newValue) => {
    setSelectedFilters(newValue);
  };

  const renderFilterComponent = () => {
    return selectedFilters.map((filter) => {
      switch (filter) {
        case "Chương trình tham gia":
          return (
            <Grid item xs={12} sm={6}>
              <Autocomplete
                fullWidth
                size="small"
                options={[]}
                renderInput={(params) => (
                  <TextField {...params} label="Chương trình tham gia" variant="outlined" />
                )}
              />
            </Grid>
          );
        case "Nguồn cung ứng (tỉnh thành)":
          return (
            <Grid item xs={12} sm={6}>
              <Autocomplete
                fullWidth
                size="small"
                options={[]}
                renderInput={(params) => (
                  <TextField {...params} label="Nguồn cung ứng (tỉnh thành)" variant="outlined" />
                )}
              />
            </Grid>
          );
        case "Thị trường":
          return (
            <Grid item xs={12} sm={6}>
              <Autocomplete
                fullWidth
                size="small"
                options={[]}
                renderInput={(params) => (
                  <TextField {...params} label="Thị trường" variant="outlined" />
                )}
              />
            </Grid>
          );
        case "Trình độ văn hóa":
          return (
            <Grid item xs={12} sm={6}>
              <Autocomplete
                fullWidth
                size="small"
                options={[]}
                renderInput={(params) => (
                  <TextField {...params} label="Trình độ văn hóa" variant="outlined" />
                )}
              />
            </Grid>
          );
        case "Kết quả sơ tuyển":
          return (
            <Grid item xs={12} sm={6}>
              <Autocomplete
                fullWidth
                size="small"
                options={[]}
                renderInput={(params) => (
                  <TextField {...params} label="Kết quả sơ tuyển" variant="outlined" />
                )}
              />
            </Grid>
          );
        case "Độ tuổi":
          return (
            <>
              <Grid item xs={12} sm={3}>
                <TextField
                  sx={{ width: "100%" }}
                  size="small"
                  label="Từ độ tuổi"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  sx={{ width: "100%" }}
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
  };

  return (
    <div style={{ width: "100%" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            sx={{ width: "100%" }}
            size="small"
            label="Nhập kinh nghiệm / Tên TTS / Mã TTS tìm kiếm"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            multiple
            disableCloseOnSelect
            sx={{ width: "100%" }}
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
            renderInput={(params) => (
              <TextField
                {...params}
                label="Thêm lọc"
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  style: { color: "#ccc" },
                }}
              />
            )}
          />
        </Grid>
        <Grid container item spacing={2}>
          {renderFilterComponent()}
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
            <DatePicker
              sx={{ width: "100%" }}
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
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
            <DatePicker
              sx={{ width: "100%" }}
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
            startIcon={
              <SvgIcon fontSize="small">
                <Search />
              </SvgIcon>
            }
            variant="contained"
            sx={{
              backgroundColor: "#1C2536",
              color: "white",
              float: "right",
              marginBottom: "10px",
            }}
          >
            Tìm kiếm
          </Button>
        </Grid>
      </Grid>
      <Box>
        <BootstrapButton
          size="small"
          onClick={() => handleFilter("Tất cả")}
          variant="contained"
          sx={{
            backgroundColor: activeFilter === "Tất cả" ? "#1C2536" : "#4b9949",
          }}
        >
          Tất cả
        </BootstrapButton>
        {/* <BootstrapButton
          size="small"
          variant="contained"
          sx={{
            backgroundColor: activeFilter === "Lưu tạm" ? "#1C2536" : "#4b9949",
          }}
          onClick={() => handleFilter("Lưu tạm")}
        >
          Lưu tạm
        </BootstrapButton> */}
        <BootstrapButton
          size="small"
          onClick={() => handleFilter("Tham gia phỏng vấn")}
          variant="contained"
          sx={{
            backgroundColor: activeFilter === "Tham gia phỏng vấn" ? "#1C2536" : "#4b9949",
          }}
        >
          Tham gia phỏng vấn
        </BootstrapButton>
        <BootstrapButton
          size="small"
          variant="contained"
          sx={{
            backgroundColor: activeFilter === "Đỗ đơn hàng" ? "#1C2536" : "#4b9949",
          }}
          onClick={() => handleFilter("Đỗ đơn hàng")}
        >
          Đỗ đơn hàng
        </BootstrapButton>
        <BootstrapButton
          size="small"
          variant="contained"
          sx={{
            backgroundColor: activeFilter === "Hủy đơn hàng" ? "#1C2536" : "#4b9949",
          }}
          onClick={() => handleFilter("Hủy đơn hàng")}
        >
          Hủy đơn hàng
        </BootstrapButton>
        <BootstrapButton
          size="small"
          variant="contained"
          sx={{
            backgroundColor: activeFilter === "Đang học tiếng" ? "#1C2536" : "#4b9949",
          }}
          onClick={() => handleFilter("Đang học tiếng")}
        >
          Đang học tiếng
        </BootstrapButton>
        <BootstrapButton
          size="small"
          variant="contained"
          sx={{
            backgroundColor: activeFilter === "Bảo lưu" ? "#1C2536" : "#4b9949",
          }}
          onClick={() => handleFilter("Bảo lưu")}
        >
          Bảo lưu
        </BootstrapButton>
        <BootstrapButton
          size="small"
          variant="contained"
          sx={{
            backgroundColor: activeFilter === "Xuất cảnh" ? "#1C2536" : "#4b9949",
          }}
          onClick={() => handleFilter("Xuất cảnh")}
        >
          Xuất cảnh
        </BootstrapButton>
        <BootstrapButton
          size="small"
          variant="contained"
          sx={{
            backgroundColor: activeFilter === "Hoàn thành hợp đồng về nước" ? "#1C2536" : "#4b9949",
          }}
          onClick={() => handleFilter("Hoàn thành hợp đồng về nước")}
        >
          Hoàn thành hợp đồng về nước
        </BootstrapButton>
        <BootstrapButton
          size="small"
          variant="contained"
          sx={{
            backgroundColor:
              activeFilter === "Hoàn thành hợp đồng trước hạn" ? "#1C2536" : "#4b9949",
          }}
          onClick={() => handleFilter("Hoàn thành hợp đồng trước hạn")}
        >
          Hoàn thành hợp đồng trước hạn
        </BootstrapButton>
        <BootstrapButton
          size="small"
          variant="contained"
          sx={{
            backgroundColor: activeFilter === "Vi phạm" ? "#1C2536" : "#4b9949",
          }}
          onClick={() => handleFilter("Vi phạm")}
        >
          Vi phạm
        </BootstrapButton>
        <BootstrapButton
          size="small"
          variant="contained"
          sx={{
            backgroundColor: activeFilter === "Rút / hủy hồ sơ" ? "#1C2536" : "#6366f1",
          }}
          onClick={() => handleFilter("Rút / hủy hồ sơ")}
        >
          Rút / hủy hồ sơ
        </BootstrapButton>
      </Box>
      <Alert
        icon={false}
        severity="info"
        sx={{ backgroundColor: "rgb(229, 246, 253)", margin: "12px 0" }}
      >
        <Typography variant="subtitle2">Số lượng TTS: 10</Typography>
      </Alert>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        sx={{
          borderColor: "rgb(224, 224, 224)",
          "& .MuiDataGrid-row": {
            border: "0.1px solid rgb(224, 224, 224) !important",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f0f0f0",
            borderBottom: "1px solid #ccc ",
          },
        }}
        // initialState={{
        //   pagination: {
        //     paginationModel: { page: 0, pageSize: 20 },
        //   },
        // }}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
        checkboxSelection
        rowCount={countIntern ? countIntern : 0}
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
      <InternDetail
        open={isDialogDetailOpen}
        onClose={closeDialogDetail}
        rowData={selectedRow ? selectedRow : ""}
      />
      <InternEdit
        open={isDialogEditOpen}
        onClose={closeDialogEdit}
        rowData={selectedRow ? selectedRow : ""}
      />
    </div>
  );
}
