// import Head from 'next/head';
// import {
//     Box,
//     Container,
//     Stack,
//     Typography,
//     Button,
//     SvgIcon,
//     TextField,
//     Grid
// } from '@mui/material';
// import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
// import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
// import { useState } from 'react';
// import OverseasStudentTable from 'src/sections/overseas-student/before-exit/overseas-student-table';
// import Link from 'next/link';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';

// const Page = () => {
//     const [isDialogOpen, setIsDialogOpen] = useState(false);
//     // Define validation schema using yup
//     const validationSchema = Yup.object({
//         oldpassword: Yup.string().required('Vui lòng nhập mật khẩu cũ'),
//         newpasswordconfirm: Yup.string().required('Vui lòng nhập mật khẩu mới'),
//         newpasswordconfirm: Yup.string()
//             .oneOf([Yup.ref('newpassword'), null], 'Mật khẩu không khớp')
//             .required('Vui lòng xác nhận mật khẩu mới'),
//     });
//     // Use useFormik hook to manage form state and validation
//     const formik = useFormik({
//         initialValues: {
//             oldpassword: '',
//             newpassword: '',
//             newpasswordconfirm: '',
//         },

//         validationSchema: validationSchema,
//         onSubmit: (values) => {
//             // Handle form submission here
//             console.log(values);
//             onClose();
//         },
//     });
//     return (
//         <>
//             <Head>
//                 <title>
//                     Thông tin tài khoản | Lotus
//                 </title>
//             </Head>
//             <Box
//                 component="main"
//                 sx={{
//                     flexGrow: 1,
//                     py: 8
//                 }}
//             >
//                 <Container maxWidth="xl">
//                     <Stack spacing={3}>
//                         <Stack
//                             direction="row"
//                             justifyContent="space-between"
//                             spacing={4}
//                         >
//                             <Stack spacing={1}>
//                                 <Typography variant="h4">
//                                     Thay đổi mật khẩu
//                                 </Typography>
//                             </Stack>
//                         </Stack>
//                         <Stack spacing={3} sx={{ p: 2, marginTop: '64px' }}>
//                             <Grid container spacing={2}>
//                                 <Grid item sm={12} md={12} xs={12}>
//                                     <Box
//                                         sx={{
//                                             padding: '16px',
//                                             border: '1px solid #ccc',
//                                             borderRadius: '6px',
//                                         }}
//                                     >
//                                         <TextField
//                                             required
//                                             sx={{ margin: '4px', marginTop: '12px' }}
//                                             size="small"
//                                             label="Mật khẩu cũ"
//                                             name="oldpassword"
//                                             value={formik.values.oldpassword}
//                                             onChange={formik.handleChange}
//                                             error={formik.touched.oldpassword && Boolean(formik.errors.oldpassword)}
//                                             helperText={formik.touched.oldpassword && formik.errors.oldpassword}
//                                             variant='outlined'
//                                             fullWidth
//                                             type='password'
//                                         />
//                                         <TextField
//                                             required
//                                             sx={{ margin: '4px', marginTop: '12px' }}
//                                             size="small"
//                                             label="Mật khẩu mới"
//                                             name="newpassword"
//                                             value={formik.values.newpassword}
//                                             onChange={formik.handleChange}
//                                             error={formik.touched.newpassword && Boolean(formik.errors.newpassword)}
//                                             helperText={formik.touched.newpassword && formik.errors.newpassword}
//                                             variant='outlined'
//                                             fullWidth
//                                             type='password'
//                                         />
//                                         <TextField
//                                             required
//                                             sx={{ margin: '4px', marginTop: '12px' }}
//                                             size="small"
//                                             label="Xác nhận mật khẩu mới "
//                                             name="newpasswordconfirm"
//                                             value={formik.values.newpasswordconfirm}
//                                             onChange={formik.handleChange}
//                                             error={formik.touched.newpasswordconfirm && Boolean(formik.errors.newpasswordconfirm)}
//                                             helperText={formik.touched.newpasswordconfirm && formik.errors.newpasswordconfirm}
//                                             variant='outlined'
//                                             fullWidth
//                                             type='password'
//                                         />

//                                         <Box
//                                             sx={{
//                                                 display: 'flex',
//                                                 justifyContent: 'end',
//                                                 width: '100%',
//                                                 marginTop: '20px',
//                                             }}
//                                         >
//                                             <Button
//                                                 variant="contained"
//                                                 onClick={formik.handleSubmit}
//                                                 sx={{
//                                                     backgroundColor: '#1C2536',
//                                                 }}
//                                             >
//                                                 Lưu
//                                             </Button>
//                                         </Box>
//                                     </Box>
//                                 </Grid>
//                             </Grid>
//                         </Stack>
//                     </Stack>
//                 </Container>
//             </Box>
//         </>
//     );
// };

// Page.getLayout = (page) => (
//     <DashboardLayout>
//         {page}
//     </DashboardLayout>
// );

// export default Page;


import Head from 'next/head';
import {
    Box,
    Container,
    Stack,
    Typography,
    Button,
    FormControl,
    OutlinedInput,
    InputLabel,
    InputAdornment,
    IconButton,
    Grid
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { useState } from 'react';
import OverseasStudentTable from 'src/sections/overseas-student/before-exit/overseas-student-table';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Page = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // Define validation schema using yup
    const validationSchema = Yup.object({
        oldpassword: Yup.string().required('Vui lòng nhập mật khẩu cũ'),
        newpassword: Yup.string().required('Vui lòng nhập mật khẩu mới'),
        newpasswordconfirm: Yup.string()
            .oneOf([Yup.ref('newpassword'), null], 'Mật khẩu không khớp')
            .required('Vui lòng xác nhận mật khẩu mới'),
    });

    // Use useFormik hook to manage form state and validation
    const formik = useFormik({
        initialValues: {
            oldpassword: '',
            newpassword: '',
            newpasswordconfirm: '',
        },

        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Handle form submission here
            console.log(values);
            onClose();
        },
    });

    return (
        <>
            <Head>
                <title>
                    Thông tin tài khoản | Lotus
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="xl">
                    <Stack spacing={3}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            spacing={4}
                        >
                            <Stack spacing={1}>
                                <Typography variant="h4">
                                    Thay đổi mật khẩu
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack spacing={3} sx={{ p: 2, marginTop: '64px' }}>
                            <Grid container spacing={2}>
                                <Grid item sm={12} md={12} xs={12}>
                                    <Box
                                        sx={{
                                            padding: '16px',
                                            border: '1px solid #ccc',
                                            borderRadius: '6px',
                                        }}
                                    >
                                        <FormControl
                                            required
                                            fullWidth
                                            sx={{ margin: '4px', marginTop: '12px' }}
                                            variant="outlined"
                                        >
                                            <InputLabel htmlFor="outlined-adornment-password">Mật khẩu cũ</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-password"
                                                type={showPassword ? 'text' : 'password'}
                                                name="oldpassword"
                                                value={formik.values.oldpassword}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.oldpassword && Boolean(formik.errors.oldpassword)}
                                                helperText={formik.touched.oldpassword && formik.errors.oldpassword}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                label="Mật khẩu cũ"
                                            />
                                        </FormControl>

                                        <FormControl
                                            required
                                            fullWidth
                                            sx={{ margin: '4px', marginTop: '12px' }}
                                            variant="outlined"
                                        >
                                            <InputLabel htmlFor="outlined-adornment-password">Mật khẩu mới</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-newpassword"
                                                type={showPassword ? 'text' : 'password'}
                                                name="newpassword"
                                                value={formik.values.newpassword}
                                                onChange={formik.handleChange}
                                                error={formik.touched.newpassword && Boolean(formik.errors.newpassword)}
                                                helperText={formik.touched.newpassword && formik.errors.newpassword}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                label="Mật khẩu mới"
                                            />
                                        </FormControl>
                                        <FormControl
                                            required
                                            fullWidth
                                            sx={{ margin: '4px', marginTop: '12px' }}
                                            variant="outlined"
                                        >
                                            <InputLabel htmlFor="outlined-adornment-password">Xác nhận mật khẩu mới</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-newpasswordconfirm"
                                                type={showPassword ? 'text' : 'password'}
                                                name="newpasswordconfirm"
                                                value={formik.values.newpasswordconfirm}
                                                onChange={formik.handleChange}
                                                error={formik.touched.newpasswordconfirm && Boolean(formik.errors.newpasswordconfirm)}
                                                helperText={formik.touched.newpasswordconfirm && formik.errors.newpasswordconfirm}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                label="Xác nhận mật khẩu mới"
                                            />
                                        </FormControl>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'end',
                                                width: '100%',
                                                marginTop: '20px',
                                            }}
                                        >
                                            <Button
                                                variant="contained"
                                                onClick={formik.handleSubmit}
                                                sx={{
                                                    backgroundColor: '#1C2536',
                                                }}
                                            >
                                                Lưu
                                            </Button>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Stack>
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;
