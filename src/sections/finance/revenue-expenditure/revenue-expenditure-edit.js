import { XCircleIcon } from "@heroicons/react/24/solid";
import { Autocomplete, Button, Dialog, DialogContent, DialogTitle, Grid, IconButton, SvgIcon, TextField, styled } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import * as Yup from "yup";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function RevenueExpenditureEdit(props) {
    const { open, onClose, titleEdit, options } = props;


    // const optionRevenue = [
    //     { id: 1, title: "Học phí" },
    //     { id: 1, title: "Phí sinh hoạt" },
    //     { id: 1, title: "Bảo hiểm" },
    // ];

    const validationSchema = Yup.object({
        category: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
        tenXe: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
    });


    const formik = useFormik({
        initialValues: {
            category: '',
            note: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            formik.resetForm();
            try {
                // const formData = {
                //     ReturnValue: 0,
                //     PaymentGroupId: 1,
                //     PaymentGroupName: values,
                //     ParentId: 2,
                //     PaymentGroupType: "Thu",
                //     Description: 1,
                //     Field1: "1",
                //     Field2: "1",
                //     Field3: "1",
                //     Field4: "1",
                //     Field5: "1",
                //     TimeStamp: Math.floor(new Date().getTime() / 1000),
                //     CreatedAt: new Date().toISOString(),
                //     CreatedBy: 1,
                //     LastModifiedAt: new Date().toISOString(),
                //     LastModifiedBy: 1,
                //     Flag: 1
                // }

            } catch (error) {

            }

        },
    });
    return (
        <>
            <BootstrapDialog
                onClose={onClose}
                open={open}
                fullWidth
                maxWidth="xs"
            >
                <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>
                    Chỉnh sửa nhóm {titleEdit}
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <SvgIcon fontSize="inherit">
                        <XCircleIcon />
                    </SvgIcon>
                </IconButton>
                <DialogContent dividers>
                    <Grid container>
                        {/* <Autocomplete
                            sx={{ margin: "4px", marginTop: "12px" }}
                            fullWidth
                            size="small"
                            options={options}
                            renderInput={(params) => <TextField variant="outlined" {...params} label={`Nhóm ${titleEdit}`} />}


                        /> */}

                        <Autocomplete
                            sx={{ margin: "4px", marginTop: "12px" }}
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
                                    label={`Nhóm ${titleEdit}`}
                                    error={formik.touched.category && Boolean(formik.errors.category)}
                                    helperText={formik.touched.category && formik.errors.category}
                                />}
                        />
                        <TextField
                            sx={{ margin: "4px", marginTop: "12px" }}
                            fullWidth
                            size="small"
                            label="Tên mới"
                            variant="outlined"
                        />
                        <Grid item sm={12} md={12} lg={12}
                            sx={{ display: 'flex', justifyContent: 'end', margin: "4px", marginTop: "12px" }}
                        >
                            <Button
                                onClick={onClose}
                                variant="contained"
                                sx={{
                                    backgroundColor: "#1C2536",
                                    display: "flex",
                                    justifyContent: "end",
                                }}
                            >
                                Lưu
                            </Button>
                        </Grid>
                    </Grid>

                    <Box style={{ marginTop: "20px" }}>

                    </Box>
                </DialogContent>
            </BootstrapDialog>
        </>
    )
}