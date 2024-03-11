import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import ModalDetail from "src/components/modal-detail";
import ActionColumn from "src/components/action-column ";
import BranchEdit from "./branch-edit";
import { listBranchApi, updateBranchApi } from "src/contexts/api/company/api-branch";
import { HANDLERS_BRANCH } from "src/contexts/reducer/company/reducer-branch";
import { useApp } from "src/hooks/use-app";
import { listCompanyApi } from "src/contexts/api/company/api-company";
import { useEffect, useState } from "react";
import { listEmployeeApi } from "src/contexts/api/company/api-employee";
import { listMarketApi } from "src/contexts/api/setting/api-market";
import SnackbarAlert from "src/components/action-notification";

export default function BranchTable() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDialogEditOpen, setisDialogEditOpen] = useState(false);
  const [companyNameOption, setCompanyNameOption] = useState([]);
  const [employeeNameMain, setEmployeeNameMain] = useState([]);
  const [countryOption, setCountryOption] = useState([]);
  const [state, dispatch] = useApp();
  const { branch, menu } = state;
  const { branchs } = branch;

  useEffect(() => {
    const listData = async () => {
      const res = await listBranchApi();
      dispatch({
        type: HANDLERS_BRANCH.LIST_BRANCH,
        payload: res.data,
      });
    };
    listData();
  }, []);

  //listCompanyName
  useEffect(() => {
    const listCompanyName = async () => {
      const res = await listCompanyApi();
      if (Array.isArray(res.data) && res.data.length > 0) {
        const companies = res.data.map((com) => ({
          companyName: com.companyName,
          companyId: com.companyId,
        }));
        setCompanyNameOption(companies);
      }
    };
    listCompanyName();
  }, []);

  //listEmployeeName
  useEffect(() => {
    const listEmployeeName = async () => {
      const res = await listEmployeeApi();
      if (Array.isArray(res.data) && res.data.length > 0) {
        const employees = res.data.map((employee) => ({
          employeeName: employee.lastName + " " + employee.middleName + " " + employee.firstName,
          employeeId: employee.employeeId,
        }));
        setEmployeeNameMain(employees);
      }
    };
    listEmployeeName();
  }, []);

  //list country
  useEffect(() => {
    const listCountry = async () => {
      const res = await listMarketApi();
      if (Array.isArray(res.data) && res.data.length > 0) {
        const country = res.data.map((market) => ({
          label: market.marketName,
          value: market.marketId,
        }));
        setCountryOption(country);
      }
    };
    listCountry();
  }, []);

  const branchWithSTT = Array.isArray(branchs)
    ? branchs.map((branch, index) => ({
        ...branch,
        stt: index + 1,
        id: branch.branchId || index + 1,
        companyName: companyNameOption.find((com) => com.companyId === branch.companyId)
          ?.companyName,
        employeeNameMain: employeeNameMain.find((em) => em.employeeId === branch.employeeIdMain)
          ?.employeeName,
        country: countryOption.find((c) => c.value === branch.marketId)?.label,
      }))
    : [];

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
      console.log(row);
      const dataRowDelete = {
        ...row,
        flag: "D",
        CreatedByHidden: "1",
        LastModifedByHidden: "1",
        companyIdHidden: "1",
        employeeIdMainHidden: "1",
        marketIdHidden: "1",
        locationIdHidden : "1"
      };
      dispatch({
        type: HANDLERS_BRANCH.UPDATE_BRANCH,
        payload: dataRowDelete,
      });

      // Gọi hàm update
      const response = await updateBranchApi(dataRowDelete);
      console.log(response);
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
    { field: "stt", headerName: "STT", width: 70 },
    {
      field: "companyName",
      headerName: "Tên công ty",
      width: 250,
    },
    {
      field: "branchName",
      headerName: "Tên Chi Nhánh",
      width: 130,
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      width: 130,
    },
    {
      field: "telephone",
      headerName: "Số điện thoại",
      width: 150,
    },
    {
      field: "website",
      headerName: "Website",
      width: 150,
    },
    {
      field: "employeeNameMain",
      headerName: "Người phụ trách chính",
      width: 180,
    },
    {
      field: "country",
      headerName: "Quốc gia",
      width: 130,
    },
    {
      field: "description",
      headerName: "Ghi chú",
      width: 150,
    },
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
    description: false,
  });

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={branchWithSTT}
        columns={columns}
        sx={{
          borderColor: "rgb(224, 224, 224)",
          "& .MuiDataGrid-row": {
            border: "0.1px solid rgb(224, 224, 224) !important",
          },
        }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
      <ModalDetail
        open={isModalDetailOpen}
        onClose={closeModalDetail}
        rowData={selectedRow}
        columns={columns}
      />
      <BranchEdit
        open={isDialogEditOpen}
        onClose={closeDialogEdit}
        id={selectedRow ? selectedRow.id : ""}
      />
      <SnackbarAlert
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleCloseSnackbar}
      />
    </div>
  );
}
