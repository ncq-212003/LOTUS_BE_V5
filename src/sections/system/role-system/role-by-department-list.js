import { DataGrid } from '@mui/x-data-grid';
import { Dialog, DialogTitle, DialogContent, DialogActions, Tab, Tabs, Typography, Box, Button, FormControlLabel, Checkbox, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AutoHeightOverlayNoSnap from './loading';
import RoleAdd from './role-add';
import RoleList from './role-list';
import { findByDepartmentIdApi } from 'src/contexts/api/system/api-department-role';
import { HANDLERS_DEPARTMENT_ROLE } from 'src/contexts/reducer/system/reducer-department-role';
import { useApp } from 'src/hooks/use-app';

const RoleByDepartmentList = ({ selectedDepartment }) => {
    const [roleSystem, setRoleSystem] = useState([]);
    const [state, dispatch] = useApp();
    const { departmentRole } = state;
    const { findDepartmentRoles } = departmentRole;;

    const departmentID = selectedDepartment ? selectedDepartment.value : null;
    useEffect(() => {
        const listData = async () => {
            if (departmentID) {
                const res = await findByDepartmentIdApi(departmentID);
                dispatch({
                    type: HANDLERS_DEPARTMENT_ROLE.FIND_DEPARTMENT_ROLE_DEPARTMENTID,
                    payload: res.data,
                });

            }
        };
        listData();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [departmentID]);

    useEffect(() => {
        const dataWithSTT = Array.isArray(findDepartmentRoles) ? findDepartmentRoles.map((role, index) => ({
            ...role,
            stt: index + 1,
            id: role.id || index + 1,
        })) : [];
        setRoleSystem(dataWithSTT);
    }, [findDepartmentRoles])

    const columns = [
        { field: 'id', headerName: 'ID', width: 60 },
        { field: 'roleName', headerName: 'Vai trò', width: 250 },
        { field: 'description', headerName: 'Mô tả', width: 200 },
        { field: 'status', headerName: 'Trạng thái', width: 100 },
    ];

    const handleRowClick = (params) => {
        setSelectedRow(params.row);
        setIsDialogOpen(true);
    };

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const [valueTabOne, setValueTabOne] = useState("1");

    const handleChangeOne = (event, newValue) => {
        setValueTabOne(newValue);
    };

    // Dialog Role List
    const [selectedRow, setSelectedRow] = React.useState({ id: '', roleName: '', status: '' });
    const [selectedTab, setSelectedTab] = React.useState(0);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const openDialog = () => {
        setIsDialogOpen(true);
    };
    const closeDialog = () => {
        setIsDialogOpen(false);
    };
    // Dialog Role Add
    const [isDialogRoleOpen, setIsDialogRoleOpen] = useState(false);
    const openDialogRole = () => {
        setIsDialogRoleOpen(true);
    };
    const closeDialogRole = () => {
        setIsDialogRoleOpen(false);
    };


    const customFooter = () => {
        return (
            <Grid container
                justifyContent="end"
                alignItems="center"
                sx={{ padding: '8px 16px' }}>
                <Button
                    sx={{ backgroundColor: "#1C2536" }}
                    variant="contained"
                    onClick={openDialogRole}>
                    Thêm vai trò
                </Button>
            </Grid>
        );
    };

    return (
        <div>
            {Array.isArray(roleSystem) && roleSystem.length > 0 ? (
                <div style={{ width: '100%' }}>
                    <DataGrid
                        rows={roleSystem}
                        columns={columns}
                        pageSize={5}
                        onRowClick={handleRowClick}
                        sx={{
                            borderColor: 'rgb(224, 224, 224)',
                            '& .MuiDataGrid-row': {
                                border: '0.1px solid rgb(224, 224, 224) !important',
                                '&:hover': {
                                    cursor: 'pointer',
                                },
                            },
                            '& .MuiDataGrid-columnHeader': {
                                '&:hover': {
                                    cursor: 'pointer',
                                },
                            },
                            '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus': {
                                outline: 'none !important',
                            },
                        }}
                        components={{
                            Footer: customFooter,
                        }}
                    />
                    {/* <Grid container justifyContent="flex-end" style={{ marginTop: '16px' }}>
                        <Button variant="contained" color="primary" onClick={handleAddRole}>
                            Thêm vai trò
                        </Button>
                    </Grid> */}
                </div>

            ) : (
                <AutoHeightOverlayNoSnap />
            )}

            <RoleList
                open={isDialogOpen}
                onClose={closeDialog}
                selectedRow={selectedRow}
                selectedTab={selectedTab}
                handleTabChange={handleTabChange}

            />
            <RoleAdd
                selectedDepartment={selectedDepartment}
                open={isDialogRoleOpen}
                onClose={closeDialogRole}
            />
        </div>
    );
};
export default RoleByDepartmentList;
