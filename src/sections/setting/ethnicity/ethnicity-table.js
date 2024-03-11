/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField, Tooltip } from "@mui/material";
import ModalDetail from "../../../components/modal-detail";
import { useApp } from "src/hooks/use-app";
import { useEffect } from "react";
import { useState } from "react";
import { findEthnicByIdApi, listEthnicApi, updateEthnicApi } from "src/contexts/api/setting/api-ethnicity";
import { HANDLERS_ETHNIC } from "src/contexts/reducer/setting/reducer-ethnic";
import ActionColumn from "src/components/action-column ";
import EthnicEdit from "./ethnicity-edit";
import { listMarketApi } from "src/contexts/api/setting/api-market";
import SnackbarAlert from "src/components/action-notification";


export default function EthnicityTable() {
	// sate
	const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
	const [selectedRow, setSelectedRow] = useState(null);
	const [isDialogEditOpen, setisDialogEditOpen] = useState(false);
	const [searchValue, setSearchValue] = useState("");
	const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
	const [marketOption, setMarketOption] = useState([]);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarSeverity, setSnackbarSeverity] = useState("success");
	const [snackbarMessage, setSnackbarMessage] = useState("");
    const [dataWithSTT, setDataWithSTT] = useState([]);
	const [filteredRows, setFilteredRows] = useState([]);
    const [textAlertForNotify, setTextAlertForNotify] = useState('');
	// context
	const [state, dispatch] = useApp();
	const { ethnic } = state;
	const { ethnics } = ethnic;

	useEffect(() => {
		const listMartkets = async () => {
			const res = await listMarketApi();
			if (Array.isArray(res.data) && res.data.length > 0) {
				const data = res.data.map((com) => ({
					label: com.marketName,
					value: com.marketId,
				}));
				setMarketOption(data);
			}
		};
		listMartkets();
	}, []);

	useEffect(() => {
        // Tính toán dataWithSTT trong useEffect để đảm bảo sử dụng dữ liệu mới nhất từ statuss
        const updatedDataWithSTT = Array.isArray(ethnics) ? ethnics.map((x, index) => ({
			...x,
			stt: index + 1,
			id: x.id || index + 1,
			marketName: marketOption.find((s) => s.value === x.marketId)?.label,
		})) : [];

        setDataWithSTT(updatedDataWithSTT); // Cập nhật dataWithSTT vào state
        setFilteredRows(updatedDataWithSTT); // Cập nhật filteredRows khi statuss thay đổi
    }, [ethnics]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await listEthnicApi();
				if (response.status == 200) {
					dispatch({
						type: HANDLERS_ETHNIC.LIST_ETHNIC,
						payload: response.data,
					});
				}
			} catch (error) {
				console.error("Error in component:", error);
			}
		};

		fetchData();
	}, []);

	const handleViewDetail = (params) => {
		setSelectedRow(params.row);
		setIsModalDetailOpen(true);
	};

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
				LastModifiedByHidden: "1",
				marketIdHidden: row.marketId,
			};

			dispatch({
				type: HANDLERS_ETHNIC.UPDATE_ETHNIC,
				payload: dataRowDelete,
			});

			// Gọi hàm update
			const response = await updateEthnicApi(dataRowDelete);

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
		{
			field: "stt",
			headerName: "STT",
			width: 50,
		},
		{
			field: "ethnicName",
			headerName: "Dân tộc",
			width: 200,
		},
		{
			field: "code",
			headerName: "Mã ( phân biệt )",
			width: 200,
		},
		{
			field: "marketName",
			headerName: "Thị trường",
			width: 200,
		},
		{
			field: "description",
			headerName: "Ghi chú",
			width: 220,
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
						handleDelete={() => handleDelete(params.row)}
					/>
				</>
			),
		},
	];

	const [columnVisibilityModel, setColumnVisibilityModel] = useState({

	});

	const handleSearch = async () => {
        if (searchValue.length == 0) {
            setIsAlertDialogOpen(true);
            setTextAlertForNotify("Bạn phải nhập giá trị để tìm kiếm");
        } else {
            const result = await findEthnicByIdApi(searchValue);

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
        if(searchValue.length == 0) {
            setFilteredRows(dataWithSTT);
        }
    }, [searchValue]);

	const handleCloseAlert = async () => {
		setIsAlertDialogOpen(false);
	};

	return (
		<div style={{ width: "100%" }}>
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
					label="Nhập tên dân tộc tìm kiếm"
					variant="outlined"
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
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
					borderColor: "rgb(224, 224, 224)",
					"& .MuiDataGrid-row": {
						border: "0.1px solid rgb(224, 224, 224) !important",
					},
					"& .MuiDataGrid-columnHeaders": {
						backgroundColor: "#f0f0f0",
						borderBottom: "1px solid #ccc ",
					},
				}}
				initialState={{
					pagination: {
						paginationModel: { page: 0, pageSize: 20 },
					},
				}}
				columnVisibilityModel={columnVisibilityModel}
				onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
				pageSizeOptions={[20, 50]}
				checkboxSelection
			/>
			<ModalDetail
				open={isModalDetailOpen}
				onClose={closeModalDetail}
				rowData={selectedRow}
				columns={columns}
			/>
			<EthnicEdit
				open={isDialogEditOpen}
				onClose={closeDialogEdit}
				id={selectedRow ? selectedRow.ethnicId : ""}
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
