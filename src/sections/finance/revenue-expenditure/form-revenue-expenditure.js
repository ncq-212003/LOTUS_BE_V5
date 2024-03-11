import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { Autocomplete, Button, Grid, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { Save } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import RevenueExpenditureEdit from './revenue-expenditure-edit';
import { addPaymentGroupApi, listPaymentGroupApi } from 'src/contexts/api/finance/api-payment-group';

const validationSchema = Yup.object().shape({
    category: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
    categoryName: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
    order: Yup
        .number()
        .positive(' Vui lòng nhập một số lớn hơn 0')
        .typeError('Vui lòng nhập số vào trường này')
        .required('Vui lòng nhập thông tin vào trường này'),
    note: Yup.string(),
});

export const FormRevenueExpenditure = (props) => {
    const {options, titleEdit } = props;
    const [isOpenEditDiaolog, setIsOpenEditDiaolog] = useState(false);
    const handleOpenEditDiaolog = () => {
        setIsOpenEditDiaolog(true);
    };
    const handleCloseEditDiaolog = () => {
        setIsOpenEditDiaolog(false);
    };

    const formik = useFormik({
        initialValues: {
            category: '',
            categoryName: '',
            order: '',
            note: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            formik.resetForm();
            try {
                const formData = {
                    ReturnValue: 0,
                    PaymentGroupId: 1,
                    PaymentGroupName: values,
                    ParentId: 2,
                    PaymentGroupType: "Thu",
                    Description: 1,
                    Field1: "1",
                    Field2: "1",
                    Field3: "1",
                    Field4: "1",
                    Field5: "1",
                    TimeStamp: Math.floor(new Date().getTime() / 1000),
                    CreatedAt: new Date().toISOString(),
                    CreatedBy: 1,
                    LastModifiedAt: new Date().toISOString(),
                    LastModifiedBy: 1,
                    Flag: 1
                }

            } catch (error) {

            }

        },
    });

    return (
        <>
            <Grid container spacing={0.4}>
                <Grid item xs={10} md={11} lg={11} xl={11}>
                    <Autocomplete
                        sx={{ margin: "4px" }}
                        fullWidth
                        size="small"
                        options={options}
                        value={options.find((opt) => opt.id === formik.values.category) || null}
                        onChange={(e, value) => formik.setFieldValue("category", value?.id || "")}
                        onBlur={formik.handleBlur('category')}
                        getOptionLabel={(option) => option.title}
                        renderInput={(params) =>
                            <TextField
                                variant="outlined"
                                {...params}
                                label="Hạng mục gốc"
                                error={formik.touched.category && Boolean(formik.errors.category)}
                                helperText={formik.touched.category && formik.errors.category}
                            />}
                    />
                </Grid>
                <Grid item xs={2} md={1} lg={1} xl={1} >
                    <Box style={{ display: "flex", justifyContent: "center" }}>
                        <Tooltip title="Sửa nhóm hạng mục">
                            <IconButton aria-label="edit" style={{ color: "#000000" }} onClick={handleOpenEditDiaolog}>
                                <BorderColorOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Grid>
                <Grid item xs={12} md={12} lg={12} xl={12}>
                    <TextField
                        required
                        sx={{ margin: "4px", marginTop: "12px" }}
                        size="small"
                        label="Tên hạng mục"
                        variant="outlined"
                        fullWidth
                        value={formik.values.categoryName}
                        onChange={(e) => formik.setFieldValue("categoryName", e.target.value)}
                        error={formik.touched.categoryName && Boolean(formik.errors.categoryName)}
                        helperText={formik.touched.categoryName && formik.errors.categoryName}
                    />
                </Grid>
                <Grid item xs={12} md={12} lg={12} xl={12}>
                    <TextField
                        required
                        sx={{ margin: "4px", marginTop: "12px" }}
                        size="small"
                        label="Thứ tự hạng mục"
                        variant="outlined"
                        fullWidth
                        value={formik.values.order}
                        onChange={(e) => formik.setFieldValue("order", e.target.value)}
                        error={formik.touched.order && Boolean(formik.errors.order)}
                        helperText={formik.touched.order && formik.errors.order}
                    />
                </Grid>
                <Grid item xs={12} md={12} lg={12} xl={12}>
                    <TextField
                        sx={{ margin: "4px", marginTop: "12px" }}
                        size="small"
                        label="Ghi chú"
                        fullWidth
                        multiline
                        rows={2}
                        variant="outlined"
                        value={formik.values.note}
                        onChange={(e) => formik.setFieldValue("note", e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={12} lg={12} xl={12} sx={{ display: 'flex', justifyContent: 'end' }}>
                    <Button
                        type="button"
                        variant="contained"
                        startIcon={<Save />}
                        onClick={formik.handleSubmit}
                        sx={{ marginTop: '16px', backgroundColor: "#1C2536" }}
                    >
                        Lưu
                    </Button>
                </Grid>
            </Grid>
            <RevenueExpenditureEdit
                open={isOpenEditDiaolog}
                onClose={handleCloseEditDiaolog}
                titleEdit={titleEdit}
                options={options}
            />
        </>
    );
};
