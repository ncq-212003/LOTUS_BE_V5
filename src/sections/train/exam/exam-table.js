import * as React from "react";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { useRouter } from "next/router";
import { Stack, Grid, Typography, Box, TextField, Button, Tooltip, IconButton } from "@mui/material";
import ModalDetail from "src/components/modal-detail";
import ActionColumn from "src/components/action-column ";
import EditExam from "./exam-edit";

const rows = [
  {
    id: 1,
    stt: 1,
    documentNumber: "LotusBT01",
    union: "Nghiệp đoàn 1,nghiệp đoàn 2",
    examName: "Kiểm tra tiếng Nhật JLPT ",
    industry: "Y tế",
    note: "Ghi chú lại các luận điểm chính trong văn bản",
    examType: "Trắc nghiệm",
    examTime: "90 phút",
    examStatus: "Hoạt động",
  },
  {
    id: 2,
    stt: 2,
    documentNumber: "LotusBT02",
    union: "Nghiệp đoàn 2",
    examName: "Đánh giá năng lực học tập EJU ",
    industry: "Xáy dựng",
    note: "Tập trung vào phần đọc hiểu ",
    examType: "Trắc nghiệm",
    examTime: "45 phút",
    examStatus: "Hoạt động",
  },
  {
    id: 3,
    stt: 3,
    documentNumber: "LotusBT03",
    union: "Nghiệp đoàn 3",
    examName: "Đánh giá khả năng giao tiếp J.TEST ",
    industry: "Công nghệ chế biến",
    note: "Nghiên cứu kỹ về phần giao tiếp",
    examType: "Tự luận",
    examTime: "30 phút",
    examStatus: "Dừng",
  },
  {
    id: 4,
    stt: 4,
    documentNumber: "IELTS2023",
    union: "Nghiệp đoàn 4",
    examName: "Kiểm tra tiếng Anh IELTS",
    industry: "Du lịch",
    note: "Thực hành kỹ năng nghe và nói thường xuyên",
    examType: "Trắc nghiệm",
    examTime: "150 phút",
    examStatus: "Đang diễn ra",
  },
  {
    id: 5,
    stt: 5,
    documentNumber: "GRE2023",
    union: "Nghiệp đoàn 5",
    examName: "Kiểm tra GRE",
    industry: "Nghiên cứu",
    note: "Chuẩn bị tốt về các kiến thức chuyên ngành",
    examType: "Tự luận",
    examTime: "240 phút",
    examStatus: "Sắp tới",
  }
  // Thêm các hàng dữ liệu lớp học khác ở đây
];

export default function ExamTable() {
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isOpenEditFormPresent, setIsOpenEditPresent] = useState(false);
  const router = useRouter();
  const handleAddQuestion = (tenbaithi) => {
    const url = `/train/question?examName=${encodeURIComponent(tenbaithi)}`;
    router.push(url);
  };

  const handleAddPartQuestion = (tenbaithi) => {
    const url = `/train/part-question?tenbaithi=${encodeURIComponent(tenbaithi)}`;
    router.push(url);
  };

  const handleViewDetail = (params) => {
    setSelectedRow(params.row); //lay gia tri cua dong do 
    setIsModalDetailOpen(true);
  }

  const handleCloseDetail = () => {
    setIsModalDetailOpen(false);
  }

  const handleOpenEditExam = (params) => {
    setSelectedRow(params.row); //lay gia tri cua dong do 
    setIsOpenEditPresent(true);
  }

  const handleCloseEditExam = () => {
    setIsOpenEditPresent(false);
  }

  const columns = [
    { field: "stt", headerName: "STT", width: 70 },
    { field: "documentNumber", headerName: "Số tài liệu", width: 130 },
    { field: "union", headerName: "Nghiệp đoàn", width: 130 },
    { field: "examName", headerName: "Tên bài thi", width: 250 },
    { field: "industry", headerName: "Ngành nghề", width: 200 },
    { field: "examType", headerName: "Loại bài thi", width: 120 },
    { field: "examTime", headerName: "Thời gian thi", width: 120 },
    { field: "examStatus", headerName: "Trạng thái bài thi", width: 130 },
    { field: "note", headerName: "Ghi chú", width: 400 },
    {
      field: "taophan",
      headerName: "Tạo phần",
      width: 100,
      renderCell: (params) => (
        <div>
          <IconButton color="primary">
            <Button onClick={() => handleAddPartQuestion(params.row.examName)}>
              <AppRegistrationIcon />
            </Button>
          </IconButton>
        </div>
      ),
      align: "center",
      headerAlign: "center",
    },
    {
      field: "themcauhoi",
      headerName: "Thêm câu hỏi",
      width: 100,
      renderCell: (params) => (
        <div>
          <IconButton color="primary">
            <Button onClick={() => handleAddQuestion(params.row.examName)}>
              <AutoStoriesIcon />
            </Button>
          </IconButton>
        </div>
      ),
      align: "center",
      headerAlign: "center",
    },
    {
      field: "action",
      headerName: "Thao tác",
      width: 150,
      renderCell: (params) => (
        <ActionColumn
          handleViewDetail={handleViewDetail}
          openDialogEdit={handleOpenEditExam}
          params={params}
        />
      ),
    },
  ];

  return (
    <Stack
      spacing={1}
      sx={{
        margin: "30px 0px",
      }}
    >
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
      <Box style={{ width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          // onRowClick={handleViewDetail}
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
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </Box>

      <ModalDetail
        open={isModalDetailOpen}
        onClose={handleCloseDetail}
        rowData={selectedRow}
        columns={columns}
      />

      < EditExam
        openEditExam={isOpenEditFormPresent}
        closeEditExam={handleCloseEditExam}
        rowData={selectedRow}
      />
    </Stack>
  );
}
