import {
    Box,
    Grid,
    Stack,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    TextField,
    Dialog,
    DialogActions,
    Tooltip,
    IconButton,
    DialogContent,
    DialogTitle,
    SvgIcon,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { XCircleIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { useApp } from "src/hooks/use-app";
import { HANDLERS_UNION } from "src/contexts/reducer/partner/reducer-union";
import * as Yup from "yup";
import ActionColumn from "src/components/action-column ";
import ModalDetail from "src/components/modal-detail";
import ContactEdit from "../contact/contact-edit";
import { DataGrid } from "@mui/x-data-grid";

export function actionSetTouchedRow(dispatch, tab, index, fieldName) {
    const value = true;
    dispatch({
        type: HANDLERS_UNION.SET_TOUCHED_ROW_UNION,
        payload: { tab, index, fieldName, value },
    });
}

export function validateFieldRowContact(dispatch, tab, index, fieldName, fieldValue) {
    const validationSchema = Yup.object().shape({
        FirstName: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
        MiddleName: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
        LastName: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
        Position: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
        Address: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
        Email: Yup.string()
            .required("Vui lòng nhập thông tin vào trường này")
            .email("Vui lòng nhập địa chỉ email hợp lệ"),
        Telephone: Yup.string()
            .required("Vui lòng nhập thông tin vào trường này")
            .matches(/^[0-9]+$/, "Vui lòng nhập số điện thoại")
            .max(15, "Số điện thoại tối đa là 15 số"),
        IsHeadPerson: Yup.boolean(),
    });

    let newValue;
    validationSchema
        .validateAt(fieldName, { [fieldName]: fieldValue })
        .then(() => {
            newValue = null;
            dispatch({
                type: HANDLERS_UNION.SET_ERRORS_ROW_UNION,
                payload: { tab, index, fieldName, newValue },
            });
        })
        .catch((error) => {
            newValue = error.message;
            dispatch({
                type: HANDLERS_UNION.SET_ERRORS_ROW_UNION,
                payload: { tab, index, fieldName, newValue },
            });
        });
}

// export default function TabContactDetail() {
//     const tab = "contact";
//     const [state, dispatch] = useApp();
//     const { union } = state;
//     const { contact } = union;
//     const [isDialogOpen, setIsDialogOpen] = useState(false);
//     const [editingIndex, setEditingIndex] = useState(null);
//     const [selectedField, setSelectedField] = useState("");
//     const [detailDialogOpen, setDetailDialogOpen] = useState(false);

//     const openDetailDialog = (index) => {
//         setEditingIndex(index);
//         setDetailDialogOpen(true);
//     };

//     const openDialog = (fieldName, index) => {
//         setSelectedField(fieldName);
//         setEditingIndex(index);
//         setIsDialogOpen(true);
//     };

//     const closeDialog = () => {
//         setEditingIndex(null);
//         setIsDialogOpen(false);
//         setDetailDialogOpen(false);
//     };

//     const handleCancel = () => {
//         setEditingIndex(null);
//         setIsDialogOpen(false);
//         // Khôi phục giá trị trước khi chỉnh sửa
//         if (editingIndex !== null && selectedField) {
//             dispatch({
//                 type: HANDLERS_UNION.SET_FIELD_ROW_UNION,
//                 payload: { tab, index: editingIndex, fieldName: selectedField, newValue: '' },
//             });
//         }
//     };

//     const [newRow, setNewRow] = useState({
//         FirstName: "",
//         MiddleName: "",
//         LastName: "",
//         Position: "",
//         Address: "",
//         Email: "",
//         Telephone: "",
//         IsHeadPerson: "",
//         touched: {},
//         errors: {},
//     });

//     const addRow = () => {
//         dispatch({
//             type: HANDLERS_UNION.ADD_ROW_TABLE_UNION,
//             payload: { tab, newRow },
//         });
//         setNewRow({
//             FirstName: "",
//             MiddleName: "",
//             LastName: "",
//             Position: "",
//             Address: "",
//             Email: "",
//             Telephone: "",
//             IsHeadPerson: "",
//             touched: {},
//             errors: {},
//         });


//     };

//     const deleteRow = (index) => {
//         dispatch({
//             type: HANDLERS_UNION.DELETE_ROW_TABLE_UNION,
//             payload: { tab, index },
//         });
//     };

//     const handleFieldChange = (index, e, fieldName) => {
//         actionSetTouchedRow(dispatch, tab, index, fieldName);

//         const fieldValue = e.target.value;
//         console.log(fieldValue);
//         let newValue;

//         if (fieldValue.length >= 0) {
//             newValue = fieldValue;
//             dispatch({
//                 type: HANDLERS_UNION.SET_FIELD_ROW_UNION,
//                 payload: { tab, index, fieldName, newValue },
//             });
//         } else {
//             newValue = "";
//             dispatch({
//                 type: HANDLERS_UNION.SET_FIELD_ROW_UNION,
//                 payload: { tab, index, fieldName, newValue },
//             });
//         }
//         validateFieldRowContact(dispatch, tab, index, fieldName, newValue);
//     };

//     const handleBlur = (index, fieldName) => {
//         const value = true;
//         dispatch({
//             type: HANDLERS_UNION.SET_TOUCHED_ROW_UNION,
//             payload: { tab, index, fieldName, value },
//         });
//     };
//     return (
//         <>
//             <Stack spacing={3}>
//                 <Grid container spacing={1}>
//                     <Grid item sm={12} md={12} xs={12}>
//                         <TableContainer component={Paper}>
//                             <Table>
//                                 <TableHead
//                                     sx={{
//                                         cursor: "pointer",
//                                     }}
//                                 >
//                                     <TableRow>
//                                         <TableCell>Stt</TableCell>
//                                         <TableCell align="center">Họ</TableCell>
//                                         <TableCell align="center">Tên đệm</TableCell>
//                                         <TableCell align="center">Tên</TableCell>
//                                         <TableCell align="center">Chức vụ</TableCell>
//                                         <TableCell align="center">Địa chỉ</TableCell>
//                                         <TableCell align="center">Email</TableCell>
//                                         <TableCell align="center">Di động</TableCell>
//                                         <TableCell align="center">Người đứng đầu</TableCell>
//                                         <TableCell align="center">Thao tác</TableCell>
//                                     </TableRow>
//                                 </TableHead>
//                                 <TableBody>
//                                     {contact.map((row, index) => (
//                                         <TableRow key={index}>
//                                             <TableCell>{index + 1}</TableCell>
//                                             {Object.keys(fieldDefinitions).map((fieldName) => (
//                                                 <TableCell
//                                                     align="left"
//                                                     key={fieldName}
//                                                     sx={{
//                                                         padding: "0 4px",
//                                                     }}
//                                                 >
//                                                     {fieldName === "IsHeadPerson" ? (
//                                                         <TextField
//                                                             select
//                                                             variant="outlined"
//                                                             size="small"
//                                                             SelectProps={{ native: true }}
//                                                             value={row[fieldName]}
//                                                             sx={{ width: "80px" }}
//                                                             onChange={(e) => handleFieldChange(index, e, fieldName)}
//                                                         >
//                                                             <>
//                                                                 <option value={true}>Có</option>
//                                                                 <option value={false}>Không</option>
//                                                             </>
//                                                         </TextField>
//                                                     ) : (
//                                                         < TextField
//                                                             error={!!(row.touched[fieldName] && row.errors[fieldName])}
//                                                             helperText={row.touched[fieldName] && row.errors[fieldName]}
//                                                             onBlur={() => handleBlur(index, fieldName)}
//                                                             variant="outlined"
//                                                             size="small"
//                                                             value={row[fieldName]}
//                                                             onClick={() => openDialog(fieldName, index)}
//                                                         />
//                                                     )}

//                                                 </TableCell>

//                                             ))}
//                                             <TableCell
//                                                 align="right"
//                                                 sx={{
//                                                     display: "flex",
//                                                 }}
//                                             >
//                                                 <Button variant="text" onClick={() => deleteRow(index)}>
//                                                     Xóa
//                                                 </Button>
//                                                 <Button variant="text" onClick={() => openDetailDialog(index)}>
//                                                     Nhập
//                                                 </Button>
//                                             </TableCell>
//                                         </TableRow>
//                                     ))}
//                                 </TableBody>
//                             </Table>
//                         </TableContainer>
//                         <Tooltip title="Thêm">
//                             <IconButton onClick={addRow}>
//                                 <Add />
//                             </IconButton>
//                         </Tooltip>
//                         {/* Nhập theo field */}
//                         <Dialog open={isDialogOpen} onClose={closeDialog}>
//                             <DialogContent
//                                 sx={{
//                                     minWidth: "300px",
//                                 }}
//                             >
//                                 {selectedField && editingIndex !== null && (
//                                     <TextField
//                                         label={fieldDefinitions[selectedField]}
//                                         size="small"
//                                         variant="outlined"
//                                         value={contact[editingIndex][selectedField]}
//                                         onChange={(e) => handleFieldChange(editingIndex, e, selectedField)}
//                                         fullWidth
//                                     />
//                                 )}
//                             </DialogContent>
//                             <DialogActions>
//                                 <Button
//                                     autoFocus
//                                     onClick={handleCancel}
//                                     variant="contained"
//                                     sx={{ background: "#1C2536" }}
//                                 >
//                                     Hủy bỏ
//                                 </Button>
//                                 <Button
//                                     autoFocus
//                                     onClick={closeDialog}
//                                     variant="contained"
//                                     sx={{ background: "#1C2536" }}
//                                 >
//                                     Lưu
//                                 </Button>
//                             </DialogActions>
//                         </Dialog>
//                         {/* Nhập full */}
//                         <Dialog open={detailDialogOpen} onClose={closeDialog}>
//                             <DialogTitle sx={{ m: 0, p: 2, backgroundColor: "#1C2536", color: "white" }}>
//                                 Nhập chi tiết
//                             </DialogTitle>
//                             <IconButton
//                                 aria-label="close"
//                                 onClick={closeDialog}
//                                 sx={{
//                                     position: "absolute",
//                                     right: 8,
//                                     top: 8,
//                                     color: (theme) => theme.palette.grey[500],
//                                 }}
//                             >
//                                 <SvgIcon fontSize="inherit">
//                                     <XCircleIcon />
//                                 </SvgIcon>
//                             </IconButton>
//                             {/* <DialogContent>
//                                 {editingIndex !== null && (
//                                     <>
//                                         {Object.keys(fieldDefinitions).map((fieldName) => (
//                                             <>
//                                                 <TextField
//                                                     error={
//                                                         !!(
//                                                             contact[editingIndex].touched[fieldName] &&
//                                                             contact[editingIndex].errors[fieldName]
//                                                         )
//                                                     }
//                                                     helperText={
//                                                         contact[editingIndex].touched[fieldName] &&
//                                                         contact[editingIndex].errors[fieldName]
//                                                     }
//                                                     onBlur={() => handleBlur(editingIndex, fieldName)}
//                                                     key={fieldName}
//                                                     label={fieldDefinitions[fieldName]}
//                                                     variant="outlined"
//                                                     value={contact[editingIndex][fieldName]}
//                                                     onChange={(e) => handleFieldChange(editingIndex, e, fieldName)}
//                                                     fullWidth
//                                                     margin="normal"
//                                                     size="small"
//                                                 />
//                                             </>
//                                         ))}
//                                     </>
//                                 )}
//                             </DialogContent> */}

//                             <DialogContent>
//                                 {editingIndex !== null && (
//                                     <>
//                                         {Object.keys(fieldDefinitions).map((fieldName) => (
//                                             <>
//                                                 {fieldName === "IsHeadPerson" ? (
//                                                     <TextField
//                                                         select
//                                                         fullWidth
//                                                         label={fieldDefinitions[fieldName]}
//                                                         variant="outlined"
//                                                         size="small"
//                                                         margin="normal"
//                                                         SelectProps={{ native: true }}
//                                                         value={contact[fieldName]}
//                                                         onChange={(e) => handleFieldChange(editingIndex, e, fieldName)}
//                                                     >
//                                                         <>
//                                                             <option value={true}>Có</option>
//                                                             <option value={false}>Không</option>
//                                                         </>
//                                                     </TextField>
//                                                 ) : (
//                                                     <TextField
//                                                         error={
//                                                             !!(
//                                                                 contact[editingIndex].touched[fieldName] &&
//                                                                 contact[editingIndex].errors[fieldName]
//                                                             )
//                                                         }
//                                                         helperText={
//                                                             contact[editingIndex].touched[fieldName] &&
//                                                             contact[editingIndex].errors[fieldName]
//                                                         }
//                                                         onBlur={() => handleBlur(editingIndex, fieldName)}
//                                                         key={fieldName}
//                                                         label={fieldDefinitions[fieldName]}
//                                                         variant="outlined"
//                                                         value={contact[editingIndex][fieldName]}
//                                                         onChange={(e) => handleFieldChange(editingIndex, e, fieldName)}
//                                                         fullWidth
//                                                         margin="normal"
//                                                         size="small"
//                                                     />
//                                                 )}
//                                             </>
//                                         ))}
//                                     </>
//                                 )}
//                             </DialogContent>
//                             <DialogActions
//                                 sx={{
//                                     backgroundColor: "#e3e6e6",
//                                 }}
//                             >
//                                 <Button
//                                     autoFocus
//                                     onClick={closeDialog}
//                                     variant="contained"
//                                     sx={{ background: "#1C2536" }}
//                                 >
//                                     Lưu
//                                 </Button>
//                             </DialogActions>
//                         </Dialog>
//                     </Grid>
//                 </Grid>
//             </Stack>
//         </>
//     );
// }

export default function TabContactDetail({ id }) {
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [isDialogEditOpen, setisDialogEditOpen] = useState(false);
    const [state, dispatch] = useApp();
    const { person } = state;
    const { persons } = person;

    //Find Contact By SyndicatedId 
    useEffect(() => {
        const findPersonContact = async (id) => {
            if (id) {
                const res = await findPersonBySyndicateIdApi(id);
                console.log(res.data);
                if (res.status === 200) {
                    dispatch({
                        type: HANDLERS_PERSON.FIND_PERSON_BY_SYNDICATEDID,
                        payload: res.data,
                    });
                }
            }
        };
        findPersonContact(id);
    }, [id]);

    console.log(persons);

    const dataWithSTT = Array.isArray(persons) ? persons.map((person, index) => ({
        ...person,
        stt: index + 1,
        id: person.id || index + 1,
        fullName: person.firstName + " " + person.middleName + " " + person.lastName,
    })) : [];

    console.log(dataWithSTT);

    //Edit
    const openDialogEdit = (params) => {
        setSelectedRow(params.row);
        console.log(params.row);
        setisDialogEditOpen(true);
    };

    const closeDialogEdit = () => {
        setisDialogEditOpen(false);
    };

    //Detail
    const handleViewDetail = (params) => {
        setSelectedRow(params.row);
        setIsModalDetailOpen(true);
    };

    const closeModalDetail = () => {
        setIsModalDetailOpen(false);
    };

    //Delete
    const handleDelete = (index) => {
        const updateUnions = [...rows];

        const deletedUnion = updateUnions.splice(index, 1);

        if (window.confirm(`Bạn có chắc chắn muốn xóa ${deletedUnion[0].name} không?`)) {
            console.log("Xóa thông tin của:", deletedUnion[0]);
        }
    };

    const columns = [
        { field: "fullName", headerName: "Họ và tên", width: 200 },
        { field: "position", headerName: "Chức vụ", width: 200 },
        { field: "address", headerName: "Địa chỉ", width: 200 },
        { field: "email", headerName: "Email", width: 200 },
        { field: "telephone", headerName: "Số điện thoại", width: 150 },
    ];
    return (
        <>
            <Stack spacing={3} sx={{ p: 2 }}>
                <DataGrid
                    rows={dataWithSTT}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[10, 20]}
                    onSelectionModelChange={(newSelection) => {
                        setSelectedContact(rows[newSelection.selectionModel[0]]);
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
                />
            </Stack>
            <Stack sx={{ p: 2, pt: 0, justifyContent: "flex-end", alignItems: "end" }}>
                <Button
                    // onClick={onClose}
                    variant="contained"
                    sx={{ background: '#1C2536' }}
                >
                    Lưu
                </Button>
            </Stack>
            <ModalDetail
                open={isModalDetailOpen}
                onClose={closeModalDetail}
                rowData={selectedRow}
                columns={columns}
            />

            <ContactEdit
                open={isDialogEditOpen}
                onClose={closeDialogEdit}
                id={selectedRow ? selectedRow.id : ""}
                syndicateId={id}
                rowData={selectedRow}
            />
        </>
    );
}