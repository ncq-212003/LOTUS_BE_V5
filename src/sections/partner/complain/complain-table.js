import * as React from "react";
import { useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { Alert, Autocomplete, Avatar, Box, Button, Checkbox, Grid, IconButton, SvgIcon, TextField, Tooltip, Stack, styled } from '@mui/material';
import { CheckBox, CheckBoxOutlineBlank, Delete, Edit, Search, Visibility } from '@mui/icons-material';
import ModalDetail from "src/components/modal-detail";
import ActionColumn from "src/components/action-column ";
import EditComplainError from "./complain-edit-error";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const rows = [
  { id: 1, stt: "1", nghiepDoan: "Doanh nghiệp A", hoVaTen: "La thị Hòa", loiPhatSinh: "Trốn việc nhiều lần", congTy: "Công ty Kouyu kogyo", ngayTiepNhan: "01/05/2023", phuongAnXuLy: "Gọi điện và làm việc online", ketQua: "Đã gọi điện và bạn hứa sẽ thay đổi", nguoiXuLy: "Phạm Thái Thảo", ghiChu: "Mạnh tay", trangThai: "Đã xong" },
  { id: 2, stt: "2", nghiepDoan: "Doanh nghiệp B", hoVaTen: "Lê Thị Mai", loiPhatSinh: "Làm việc không đúng quy trình", congTy: "Cty ABC", ngayTiepNhan: "20/05/2023", phuongAnXuLy: "Hướng dẫn lại quy trình làm việc", ketQua: "....", nguoiXuLy: "Phạm Văn Đông", ghiChu: "Cần theo dõi và đánh giá hiệu quả", trangThai: "Đang xử lý" },
  { id: 3, stt: "3", nghiepDoan: "Doanh nghiệp D", hoVaTen: "Trần Văn Nam", loiPhatSinh: "Lạm dụng tài sản công ty", congTy: "Cty Alpha", ngayTiepNhan: "10/06/2023", phuongAnXuLy: "Kiểm tra và thu hồi tài sản", ketQua: "....", nguoiXuLy: "Nguyễn Thị Hương", ghiChu: "Cần báo cáo lãnh đạo và đề xuất biện pháp phòng ngừa", trangThai: "Đang xử lý" },
  { id: 4, stt: "4", nghiepDoan: "Doanh nghiệp A", hoVaTen: "Nguyễn Thị An", loiPhatSinh: "Vi phạm quy tắc an toàn lao động", congTy: "Cty XYZ", ngayTiepNhan: "15/05/2023", phuongAnXuLy: "Tổ chức đào tạo lại về an toàn lao động", ketQua: "....", nguoiXuLy: "Trần Văn Bình", ghiChu: "Cần theo dõi định kỳ", trangThai: "Đang xử lý" },
  { id: 5, stt: "5", nghiepDoan: "Doanh nghiệp E", hoVaTen: "Hoàng Văn Long", loiPhatSinh: "Lừa đảo đối tác kinh doanh", congTy: "Cty Delta", ngayTiepNhan: "18/06/2023", phuongAnXuLy: "Khởi kiện và yêu cầu bồi thường", ketQua: "Đối tác đã đồng ý bồi thường thiệt hại", nguoiXuLy: "Trần Thị Ngọc", ghiChu: "Theo dõi tình hình quan hệ đối tác", trangThai: "Đã xong" }
];

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
  'Nghiệp đoàn',
  'Công ty tiếp nhận',
  'Người xử lý',
  'Trạng thái'
];

export default function TableCompalain() {
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isOpenEditComplainError, setIsOpenEditComplainError] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Tất cả');
  const [filteredRows, setFilteredRows] = useState(rows);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleViewDetail = (params) => {
    setSelectedRow(params.row); //lay gia tri cua dong do 
    setIsModalDetailOpen(true);
  }

  const handleCloseDetail = () => {
    setIsModalDetailOpen(false);
  }

  const handleOpenEditComplain = (params) => {
    setSelectedRow(params.row); //lay gia tri cua dong do 
    setIsOpenEditComplainError(true);
  }

  const handleCloseEditComplain = () => {
    setIsOpenEditComplainError(false);
  }

  const columns = [
    { field: "stt", headerName: "STT", width: 70 },
    { field: "nghiepDoan", headerName: "Nghiệp đoàn", width: 150 },
    { field: "hoVaTen", headerName: "Họ và tên", width: 160 },
    { field: "congTy", headerName: "Công ty tiếp nhận", width: 200 },
    { field: "loiPhatSinh", headerName: "Lỗi phát sinh", width: 300 },
    { field: "phuongAnXuLy", headerName: "Phương án xử lý", width: 300 },
    { field: "ketQua", headerName: "Kết quả", width: 350 },
    { field: "ngayTiepNhan", headerName: "Ngày tiếp nhận", width: 160 },
    { field: "nguoiXuLy", headerName: "Người xử lý", width: 160 },
    { field: "ghiChu", headerName: "Ghi chú", width: 300 },
    { field: "trangThai", headerName: "Trạng thái", width: 160 },
    {
      field: "action",
      headerName: "Thao tác",
      width: 150,
      renderCell: (params) => (
        <ActionColumn
          handleViewDetail={handleViewDetail}
          openDialogEdit={handleOpenEditComplain}
          params={params}
        />
      ),
    },
  ];

  const handleChangeSelectFilter = (event, newValues) => {
    setSelectedFilters(newValues);
  };

  const renderFilterComponent = () => {
    return selectedFilters.map((filter) => {
      switch (filter) {
        case 'Nghiệp đoàn':
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
                  label="Nghiệp đoàn"
                  variant="outlined"
                />}
              />
            </Grid>
          );
        case 'Công ty tiếp nhận':
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
                  label="Công ty tiếp nhận"
                  variant="outlined"
                />}
              />
            </Grid>
          );
        case 'Người xử lý':
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
                  label="Người xử lý"
                  variant="outlined"
                />}
              />
            </Grid>
          );
        case 'Trạng thái':
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
                  label="Trạng thái"
                  variant="outlined"
                />}
              />
            </Grid>
          );
        default:
          return null;
      }
    });
  }

  const handleFilter = (filterType) => {
    let filteredData = rows;

    // Cập nhật trạng thái activeFilter khi người dùng chọn nút
    setActiveFilter(filterType);

    switch (filterType) {
      case 'Tất cả':
        filteredData = rows;
        break;
      case 'Đang xử lý':
        filteredData = rows.filter(row => row.trangThai === 'Đang xử lý');
        break;
      case 'Đã xong':
        filteredData = rows.filter(row => row.trangThai === 'Đã xong');
        break;
      default:
        filteredData = rows;
        break;
    }
    setFilteredRows(filteredData);
  }

  return (
    <Stack
      spacing={1}
      sx={{
        margin: "30px 0px",
      }}
    >
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
            label="Nhập tên tìm kiếm"
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
          variant="contained"
          sx={{
            backgroundColor: activeFilter === 'Đang xử lý' ? '#1C2536' : '#4b9949',
          }}
          onClick={() => handleFilter('Đang xử lý')}
        >Đang xử lý</BootstrapButton>
        <BootstrapButton
          size='small'
          variant="contained"
          sx={{
            backgroundColor: activeFilter === 'Đã xong' ? '#1C2536' : '#4b9949',
          }}
          onClick={() => handleFilter('Đã xong')}
        >Đã xong</BootstrapButton>
      </Box>
      <Box sx={{ width: "100%", marginTop: "20px" }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          onRowClick={handleViewDetail}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
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
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>

      <ModalDetail
        open={isModalDetailOpen}
        onClose={handleCloseDetail}
        rowData={selectedRow}
        columns={columns}
      />

      < EditComplainError
        openEdit={isOpenEditComplainError}
        closeEdit={handleCloseEditComplain}
        rowData={selectedRow}
      />
    </Stack>
  );
}
