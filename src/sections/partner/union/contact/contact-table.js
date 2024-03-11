import { XCircleIcon } from "@heroicons/react/24/solid";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import { AppBar, Button, Dialog, IconButton, Stack, SvgIcon, Toolbar, Tooltip, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import ModalDetail from "src/components/modal-detail";
import ContactEdit from "./contact-edit";
import ActionColumn from "src/components/action-column ";
import { useEffect } from "react";
import { findPersonBySyndicateIdApi } from "src/contexts/api/partner/api-person";
import { HANDLERS_PERSON } from "src/contexts/reducer/partner/reducer-person";
import { useApp } from "src/hooks/use-app";


export default function ContactTable({ open, onClose, id }) {
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

    const dataWithSTT = Array.isArray(persons) ? persons.map((person, index) => ({
        ...person,
        stt: index + 1,
        id: person.id || index + 1,
        fullName: person.firstName + " " + person.middleName + " " + person.lastName,
    })) : [];


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
        { field: "fullName", headerName: "Họ và tên", width: 150 },
        { field: "position", headerName: "Chức vụ", width: 150 },
        { field: "address", headerName: "Địa chỉ", width: 200 },
        { field: "email", headerName: "Email", width: 200 },
        { field: "telephone", headerName: "Số điện thoại", width: 150 },
        {
            field: "action",
            headerName: "Thao tác",
            headerAlign: 'center',
            align: 'center',
            width: 150,
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
    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="customized-dialog-title"
                maxWidth={"xl"}
            >
                <AppBar sx={{ position: "relative", backgroundColor: "#1C2536" }}>
                    <Toolbar>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Thông tin người liên hệ
                        </Typography>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={onClose}
                            aria-label="close"
                        >
                            <SvgIcon fontSize="small">
                                <XCircleIcon />
                            </SvgIcon>
                        </IconButton>
                    </Toolbar>
                </AppBar>
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
                    />
                </Stack>
                <Stack sx={{ p: 2, pt: 0, justifyContent: "flex-end", alignItems: "end" }}>
                    <Button
                        onClick={onClose}
                        variant="contained"
                        sx={{ background: '#1C2536' }}
                    >
                        Lưu
                    </Button>
                </Stack>
            </Dialog>
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
