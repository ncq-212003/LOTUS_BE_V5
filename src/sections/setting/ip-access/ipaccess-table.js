/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField, Tooltip } from "@mui/material";
import ModalDetail from "../../../components/modal-detail";
import { useApp } from "src/hooks/use-app";
import { useEffect } from "react";
import { useState } from "react";
import { listEthnicApi, updateEthnicApi } from "src/contexts/api/setting/api-ethnicity";
import { HANDLERS_ETHNIC } from "src/contexts/reducer/setting/reducer-ethnic";
import ActionColumn from "src/components/action-column ";
import SnackbarAlert from "src/components/action-notification";
import axios from 'axios';
import { listEmployeeApi } from "src/contexts/api/company/api-employee";
import { format } from "date-fns";
import { Block } from "@mui/icons-material";

const rows = [
	{ id: 1, a: '192.168.1.1', b: '2022-01-13 10:30:00', description: 'Sample description 1' },
	{ id: 2, a: '192.168.1.2', b: '2022-01-13 11:45:00', description: 'Sample description 2' },
	{ id: 3, a: '192.168.1.3', b: '2022-01-13 12:15:00', description: 'Sample description 3' },
	{ id: 4, a: '192.168.1.4', b: '2022-01-13 13:20:00', description: 'Sample description 4' },
	{ id: 5, a: '192.168.1.5', b: '2022-01-13 14:00:00', description: 'Sample description 5' },
	{ id: 6, a: '192.168.1.6', b: '2022-01-13 15:10:00', description: 'Sample description 6' },
	{ id: 7, a: '192.168.1.7', b: '2022-01-13 16:45:00', description: 'Sample description 7' },
	{ id: 8, a: '192.168.1.8', b: '2022-01-13 17:30:00', description: 'Sample description 8' },
	{ id: 9, a: '192.168.1.9', b: '2022-01-13 18:20:00', description: 'Sample description 9' },
	{ id: 10, a: '192.168.1.10', b: '2022-01-13 19:00:00', description: 'Sample description 10' },
];

const formatDate = (date) => {
	return format(new Date(date), 'dd-MM-yyyy hh:mm:ss');
};

export default function IPAccessTable() {
	// sate
	const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
	const [selectedRow, setSelectedRow] = useState(null);
	const [isDialogEditOpen, setisDialogEditOpen] = useState(false);
	const [searchValue, setSearchValue] = useState("");
	const [employeeValue, setEmployeeValue] = useState("");
	const [isAlertDialogSearchOpen, setIsAlertDialogSearchOpen] = useState(false);
	const [isAlertDialogBanOpen, setIsAlertDialogBanOpen] = useState(false);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarSeverity, setSnackbarSeverity] = useState("success");
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [currentIP, setCurrentIP] = useState("");
	const [employee, setEmployee] = useState([]);
	// context
	const [state, dispatch] = useApp();
	// const { ethnic } = state;
	// const { ethnics } = ethnic;

	// const dataWithSTT = Array.isArray(ethnics) ? ethnics.map((x, index) => ({
	// 	...x,
	// 	stt: index + 1,
	// 	id: x.id || index + 1,
	// })) : [];

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		try {
	// 			const response = await listEthnicApi();
	// 			if (response.status == 200) {
	// 				dispatch({
	// 					type: HANDLERS_ETHNIC.LIST_ETHNIC,
	// 					payload: response.data,
	// 				});
	// 			}
	// 		} catch (error) {
	// 			console.error("Error in component:", error);
	// 		}
	// 	};

	// 	fetchData();
	// }, []);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get('https://api.ipify.org?format=json');
				if (response.status == 200) {
					setCurrentIP(response.data.ip);
				}
			} catch (error) {
				console.error("Error in component:", error);
			}
		};

		fetchData();
	}, []);

	//listEmployeeOption
	useEffect(() => {
		const listData = async () => {
			const res = await listEmployeeApi();
			if (Array.isArray(res.data) && res.data.length > 0) {
				const data = res.data.map((x) => ({
					label: x.lastName + ' ' + x.middleName + ' ' + x.firstName,
					value: x.employeeId,
				}));
				setEmployee(data);
			}
		};
		listData();
	}, []);

	const handleViewDetail = (params) => {
		setSelectedRow(params.row);
		setIsModalDetailOpen(true);
	};

	const openDialogEdit = (params) => {
		setSelectedRow(params.row);
		setisDialogEditOpen(true);
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
			field: "a",
			headerName: "IP",
			width: 200,
		},
		{
			field: "b",
			headerName: "Thời gian truy cập",
			width: 200,
			renderCell: (params) => (
				<span>{formatDate(params.value)}</span>
			),
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
						buttonType="view"
					/>
					<Tooltip title="Chặn truy cập">
						<IconButton
							sx={{ color: "black" }}
							onClick={handleBan}
						>
							<Block />
						</IconButton>
					</Tooltip>
					<ActionColumn
						openDialogEdit={openDialogEdit}
						params={params}
						buttonType="delete"
					/>
				</>
			),
		},
	];

	const [columnVisibilityModel, setColumnVisibilityModel] = useState({

	});

	const handleSearch = () => {
		if (searchValue.length == 0) {
			setIsAlertDialogOpen(true);
		} else {
			console.log("Giá trị tìm kiếm: ", searchValue);
			console.log("Giá trị employee: ", employeeValue);
		}
	};

	const handleEmployeeChange = (event, newValue) => {
		setEmployeeValue(newValue);
	};

	const handleCloseAlert = async () => {
		setIsAlertDialogSearchOpen(false);
		setIsAlertDialogBanOpen(false);
	};

	const handleBan = () => {
		setIsAlertDialogBanOpen(true);
	};

	return (
		<div style={{ width: "100%" }}>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center'
				}}
			>
				<Box
					sx={{
						display: "flex",
						justifyContent: "start",
						alignItems: "center",
						width: '90%',
					}}
				>
					<TextField
						sx={{ margin: "12px 10px 12px 0px", width: "100%" }}
						size="small"
						label={`Nhập IP tìm kiếm (${currentIP})`}
						variant="outlined"
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
					/>
					<Autocomplete
						value={employeeValue}
						sx={{ margin: "12px 0px", width: "100%" }}
						fullWidth
						onChange={handleEmployeeChange}
						size="small"
						options={employee}
						renderInput={(params) => <TextField {...params}
							label="Nhân viên"
							variant="outlined"
						/>}
					/>
				</Box>
				<Button
					sx={{
						margin: "8px",
						backgroundColor: "#1C2536",
						color: "white",
						width: '10%',
					}}
					size="small"
					variant="contained"
					onClick={handleSearch}
				>
					Tìm kiếm
				</Button>
			</Box>
			<DataGrid
				rows={rows}
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
			<SnackbarAlert
				open={snackbarOpen}
				message={snackbarMessage}
				severity={snackbarSeverity}
				onClose={handleCloseSnackbar}
			/>
			{/*  alert when value search null */}
			<Dialog
				open={isAlertDialogSearchOpen}
				onClose={handleCloseAlert}
			>
				<DialogTitle>Thông báo</DialogTitle>
				<DialogContent>
					<DialogContentText>
						{`Bạn phải nhập giá trị để tìm kiếm`}
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
			<Dialog
				open={isAlertDialogBanOpen}
				onClose={handleCloseAlert}
			>
				<DialogTitle>Thông báo</DialogTitle>
				<DialogContent>
					<DialogContentText>
						{`Bạn có chắc chắn muốn chặn địa chỉ IP này ko`}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
					>
						Đồng ý
					</Button>
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
