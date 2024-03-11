import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import ModalDetail from "../../../components/modal-detail";
import ActionColumn from "src/components/action-column ";
import SchoolEdit from "./school-edit";
import { useApp } from "src/hooks/use-app";
import { HANDLERS_SCHOOL } from "src/contexts/reducer/setting/reducer-school";
import { listSchoolApi } from "src/contexts/api/setting/api-school";
import { Box } from "@mui/system";
import { Button, TextField } from "@mui/material";
import { useEffect } from "react";

import { useState } from "react";
import { listMarketApi } from "src/contexts/api/setting/api-market";


export default function SchoolTable() {
  const [isModalDetailOpen, setIsModalDetailOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [isDialogEditOpen, setisDialogEditOpen] = React.useState(false);
  const [state, dispatch] = useApp();
  const { school } = state;
  const { schools } = school;
  const [marketOption, setMarketOption] = useState([])


  //List market
  useEffect(() => {
    const listMarket = async () => {
      const res = await listMarketApi();
      const markets = res.data.map((m) => ({
        label: m.marketName,
        value: m.marketId,
      }));
      setMarketOption(markets);
    };
    listMarket();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //List school
  useEffect(() => {
    const listData = async () => {
      const res = await listSchoolApi();
      console.log(res.data);
      dispatch({
        type: HANDLERS_SCHOOL.LIST_SCHOOL,
        payload: res.data,
      });
    };
    listData();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(schools);
  console.log(marketOption);

  const dataWithSTT = Array.isArray(schools) ? schools.map((school, index) => ({
    ...school,
    stt: index + 1,
    id: school.schoolId || index + 1,
    marketName: marketOption.find((mk) => mk.value === school.marketId)?.label,
  })) : [];

  console.log(dataWithSTT);

  //Edit
  const openDialogEdit = (params) => {
    setSelectedRow(params.row);
    setisDialogEditOpen(true);
  };

  const closeDialogEdit = () => {
    setisDialogEditOpen(false);
  };

  //Details
  const handleViewDetail = (params) => {
    setSelectedRow(params.row);
    setIsModalDetailOpen(true);
  };

  const closeModalDetail = () => {
    setIsModalDetailOpen(false);
  };


  const columns = [
    {
      field: "stt",
      headerName: "STT",
      width: 50,
    },
    {
      field: "schoolName",
      headerName: "Tên trường",
      width: 200,
    },
    {
      field: "marketName",
      headerName: "Quốc gia",
      width: 80,
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      width: 220,
    },
    {
      field: "field1",
      headerName: "Website",
      width: 220,
    },
    {
      field: "email",
      headerName: "Email",
      width: 220,
    },
    {
      field: "phone",
      headerName: "Số điện thoại",
      width: 150,
    },
    {
      field: "action",
      headerName: "Thao tác",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <>
          <ActionColumn
            handleViewDetail={handleViewDetail}
            openDialogEdit={openDialogEdit}
            params={params}
          />
        </>
      ),
    },
  ];

  // const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
  //   stt: true,
  //   quocGia: true,

  //   tenTruong: true,
  //   diaChi: true,
  //   email: true,
  //   field1: false,
  //   soDienThoai: true,
  // });


  return (
    <div style={{ height: 400, width: "100%" }}>
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
      <DataGrid
        rows={dataWithSTT}
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
        // columnVisibilityModel={columnVisibilityModel}
        // onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 20 },
          },
        }}
        pageSizeOptions={[20, 50]}
        checkboxSelection
      />
      <ModalDetail
        open={isModalDetailOpen}
        onClose={closeModalDetail}
        rowData={selectedRow}
        columns={columns}
      />
      <SchoolEdit
        open={isDialogEditOpen}
        onClose={closeDialogEdit}
        id={selectedRow ? selectedRow.id : ""}
      />
    </div>
  );
}
