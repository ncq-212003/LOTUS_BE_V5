import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Autocomplete, Checkbox, FormControlLabel } from "@mui/material";
import { Box } from "@mui/system";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useState } from "react";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const permissionsByGroup = {
    "Lịch công tác": [
        { id: '1', label: 'Lịch', checked: false },
        { id: '2', label: 'Địa điểm', checked: false },
        { id: '3', label: 'Xe', checked: false },
        { id: '4', label: 'Quà tặng', checked: false },
        { id: '5', label: 'Tiến trình', checked: false },
    ],
    "TTS/DHS": [
        { id: '6', label: 'Thực tập sinh', checked: false },
        { id: '7', label: 'Du học sinh', checked: false },
        { id: '8', label: 'Lịch bay', checked: false },

    ],
    "Đơn hàng": [

    ],
    "Hồ sơ": [

    ],
    "Điểm danh": [

    ],
    "Tài chính": [
        { id: '9', label: 'Báo cáo thu', checked: false },
        { id: '10', label: 'Báo cáo chi', checked: false },
        { id: '11', label: 'Chương trình', checked: false },
    ],
    "Khách hàng": [
        { id: '12', label: 'Nghiệp đoàn', checked: false },
        { id: '13', label: 'Công ty tiếp nhận', checked: false },
        { id: '14', label: 'Khiếu nại', checked: false },
    ],
    "Đào tạo": [
        { id: '15', label: 'Bài thi', checked: false },
        { id: '16', label: 'Câu hỏi', checked: false },
        { id: '17', label: 'Danh sách học viên', checked: false },
        { id: '18', label: 'Danh sách lớp', checked: false },
        { id: '19', label: 'Danh sách giáo viên', checked: false },
        { id: '20', label: 'Học viên đang thi tuyển', checked: false },
        { id: '21', label: 'Học viên chưa trúng tuyển', checked: false },
        { id: '22', label: 'Học viên đã trúng tuyển', checked: false },
        { id: '23', label: 'Báo cáo bảng điểm', checked: false },
        { id: '24', label: 'Báo cáo học tập', checked: false },
        { id: '25', label: 'Báo cáo điểm danh', checked: false },
        { id: '26', label: 'Chứng chỉ', checked: false },
    ],
    "Công ty": [
        { id: '27', label: 'Công ty', checked: false },
        { id: '28', label: 'Nhân viên', checked: false },
        { id: '29', label: 'Phòng ban', checked: false },
        { id: '30', label: 'Chi nhánh', checked: false },
        { id: '31', label: 'Nguồn cung ứng', checked: false },
    ],
    "Cài đặt": [
        { id: '32', label: 'Giáo viên', checked: false },
        { id: '33', label: 'Lớp học', checked: false },
        { id: '34', label: 'Trường đại học ', checked: false },
        { id: '35', label: 'KTX', checked: false },
        { id: '36', label: 'Phòng', checked: false },
        { id: '37', label: 'Tài sản - Dụng cụ', checked: false },
        { id: '38', label: 'Ngành nghề', checked: false },
        { id: '39', label: 'Thị trường', checked: false },
        { id: '40', label: 'Trình độ văn hóa', checked: false },
        { id: '41', label: 'Cấu hình hệ thống', checked: false },
        { id: '42', label: 'Giấy tờ', checked: false },
        { id: '43', label: 'Cong ty chứng nghề', checked: false },
        { id: '44', label: 'Trường học', checked: false },
        { id: '45', label: 'Chuyên ngành', checked: false },
        { id: '46', label: 'Nguồn cung ứng', checked: false },
        { id: '47', label: 'Cấu hình ngôn ngữ', checked: false },
        { id: '48', label: 'Tỉnh thành', checked: false },
        { id: '49', label: 'Cơ quan cấp hộ chiếu', checked: false },
    ],
};
const IndeterminateCheckbox = () => {
    const [permissions, setPermissions] = useState(() => {
        const initialPermissions = {};
        Object.keys(permissionsByGroup).forEach(group => {
            permissionsByGroup[group].forEach(permission => {
                initialPermissions[permission.id] = permission.checked;
            });
        });
        return initialPermissions;
    });

    const handleParentChange = (group) => (event) => {
        const updatedPermissions = { ...permissions };
        permissionsByGroup[group].forEach(permission => {
            updatedPermissions[permission.id] = event.target.checked;
        });
        setPermissions(updatedPermissions);
    };

    const handleChildChange = (event) => {
        setPermissions({ ...permissions, [event.target.name]: event.target.checked });
    };

    return (
        <Box>

            {Object.keys(permissionsByGroup).map(group => (
                <Box key={group}
                    sx={{ marginBottom: "16px", bgcolor: "#fff", padding: "16px", border: "1px solid #ccc", borderRadius: "6px" }}
                >
                    <FormControlLabel
                        label={group}
                        control={
                            <Checkbox
                                checked={permissionsByGroup[group].every(permission => permissions[permission.id])}
                                indeterminate={
                                    permissionsByGroup[group].some(permission => permissions[permission.id]) &&
                                    !permissionsByGroup[group].every(permission => permissions[permission.id])
                                }
                                onChange={handleParentChange(group)}
                            />
                        }
                    />
                    <Box sx={{
                        display: 'flex', flexDirection: 'column', ml: 3,
                    }}>
                        {permissionsByGroup[group].map(permission => (
                            <FormControlLabel
                                key={permission.id}
                                label={permission.label}
                                control={
                                    <Checkbox
                                        name={permission.id}
                                        checked={permissions[permission.id]}
                                        onChange={handleChildChange}
                                    />
                                }
                            />
                        ))}
                    </Box>
                </Box>
            ))}
        </Box>
    );
};


export default function RoleSystemAdd() {

    const optionCompanyDepartment = [
        { value: 1, company: "Công ty Apple", label: "Phòng nhân sự" },
        { value: 2, company: "Công ty Apple", label: "Phòng kế toán" },
        { value: 3, company: "Công ty Apple", label: "Phòng công nghệ & truyền thông" },
        { value: 4, company: "Công ty Samsung", label: "Phòng tài chính" },
        { value: 5, company: "Công ty Samsung", label: "Phòng chăm sóc khách hàng" },
        { value: 6, company: "Công ty Samsung", label: "Phòng hành chính" },
    ];

    const optionCompanyDepartmentRole = [
        { value: 1, company: "Công ty Apple", department: "Phòng nhân sự", label: "Quản trị" },
        { value: 2, company: "Công ty Apple", department: "Phòng nhân sự", label: "Giáo viên" },
        { value: 3, company: "Công ty Apple", department: "Phòng nhân sự", label: "Cán bộ tuyển dụng" },
        { value: 4, company: "Công ty Apple", department: "Phòng nhân sự", label: "Nhân viên" },
        { value: 5, company: "Công ty Apple", department: "Phòng kế toán", label: "Quản trị" },
        { value: 6, company: "Công ty Apple", department: "Phòng kế toán", label: "Giáo viên" },
        { value: 7, company: "Công ty Apple", department: "Phòng kế toán", label: "Cán bộ tuyển dụng" },
        { value: 8, company: "Công ty Apple", department: "Phòng kế toán", label: "Nhân viên" },
        { value: 9, company: "Công ty Samsung", department: "Phòng tài chính", label: "Quản trị" },
        { value: 10, company: "Công ty Samsung", department: "Phòng tài chính", label: "Giáo viên" },
        {
            value: 11,
            company: "Công ty Samsung",
            department: "Phòng tài chính",
            label: "Cán bộ tuyển dụng",
        },
        { value: 12, company: "Công ty Samsung", department: "Phòng tài chính", label: "Nhân viên" },
    ];
    return (
        <>
            <Stack
                spacing={3}
                sx={{
                    margin: '38px 0'
                }}
            >
                <Grid
                    container
                    spacing={2}
                    marginBottom={4}
                >
                    <Grid
                        item
                        sm={12}
                        xs={12}
                        md={6}
                    >
                        <Autocomplete
                            // multiple
                            // disableCloseOnSelect
                            sx={{ margin: "4px", width: "100%", marginBottom: "9px" }}
                            options={optionCompanyDepartment}
                            // value={selectedOptions}
                            // onChange={handleChangeDepartment}
                            groupBy={(option) => option.company}
                            getOptionLabel={(option) => option.label}
                            renderOption={(props, option, { selected }) => (
                                <li {...props}>
                                    {/* <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{ marginRight: 8 }}
                                        checked={selected}
                                    /> */}
                                    {option.label}
                                </li>
                            )}
                            renderInput={(params) => <TextField {...params} label="Công ty - Phòng ban" />}
                        />
                        {/* <Autocomplete
                            multiple
                            options={optionCompanyDepartmentRole}
                            disableCloseOnSelect
                            sx={{ margin: "4px", width: "100%" }}
                            groupBy={(option) => option.company + " - " + option.department}
                            getOptionLabel={(option) => option.label}
                            renderOption={(props, optionRole, { selected }) => (
                                <li {...props}>
                                    <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{ marginRight: 8 }}
                                        checked={selected}
                                    />
                                    {optionRole.label}
                                </li>
                            )}
                            renderInput={(params) => <TextField {...params} label="Vai trò" />}
                        /> */}

                    </Grid>
                    <Grid
                        item
                        sm={12}
                        xs={12}
                        md={12}
                    >

                        <Grid sm={6}>
                            <IndeterminateCheckbox />
                        </Grid>

                    </Grid>
                </Grid>
                <Button
                    variant="contained"
                >Lưu</Button>
            </Stack>
        </>
    )
}
