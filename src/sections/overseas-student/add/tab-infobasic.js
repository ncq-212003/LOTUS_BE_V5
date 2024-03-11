/* eslint-disable react-hooks/exhaustive-deps */
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import {
    Box,
    Grid,
    Stack,
    Typography,
    TextField,
    Autocomplete,
    Button,
    Avatar,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Checkbox,
    FormHelperText,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { useEffect, useState } from "react";
import SnackbarAlert from "src/components/action-notification";
import { getPathFromUrl } from "src/components/functions";
import { listEmployeeApi } from "src/contexts/api/company/api-employee";
import useFetchLocation, { fetchCities } from "src/contexts/api/location-api";
import { listSupplySourceApi } from "src/contexts/api/partner/api-supplySource";
import { GenerateApi } from "src/contexts/api/random-api";
import { listEducationLevelApi } from "src/contexts/api/setting/api-educationlevel";
import { listEthnicApi } from "src/contexts/api/setting/api-ethnicity";
import { listMarketApi } from "src/contexts/api/setting/api-market";
import { listOrganApi } from "src/contexts/api/setting/api-organ";
import { listProfessionApi } from "src/contexts/api/setting/api-profession";
import { listStatusByAliasApi } from "src/contexts/api/setting/api-status";
import { listSupplyTypeApi } from "src/contexts/api/setting/api-supply-type";
import { uploadSingleFile } from "src/contexts/api/upload-api";
import { HANDLERS_OVERSEAS_STUDENT } from "src/contexts/reducer/overseas-student/reducer-overseas-student";
import { useApp } from "src/hooks/use-app";
import * as Yup from "yup";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const useSupplySourceOption = () => {
    const [supplySourceTypeOption, setSupplySourceTypeOption] = useState([]);
    const [supplySourceOption, setSupplySourceOption] = useState([]);

    //listSupplySourceType
    useEffect(() => {
        const listSupplySourceType = async () => {
            const res = await listSupplyTypeApi();
            if (Array.isArray(res.data) && res.data.length > 0) {
                const supplySouceTypes = res.data.map((sst) => ({
                    supplySourceTypeName: sst.supplySourceTypeName,
                    supplySourceTypeId: sst.supplySourceTypeId,
                }));
                setSupplySourceTypeOption(supplySouceTypes);
            }
        };
        listSupplySourceType();
    }, []);

    //listSupplySource
    useEffect(() => {
        const listSupplySource = async () => {
            const res = await listSupplySourceApi();
            const cityOptions = await fetchCities();
            if (Array.isArray(res.data) && res.data.length > 0) {
                const supplySources = res.data.map((ss) => ({
                    value: ss.supplySourceId,
                    label:
                        ss.supplySourceTypeId === 2
                            ? cityOptions.find((city) => city.value === ss.locationId)?.label
                            : ss.supplySourceTypeId === 1
                                ? ss.fullName
                                : supplySourceTypeOption.find(
                                    (sst) => sst.supplySourceTypeId === ss.supplySourceTypeId
                                )?.supplySourceTypeName,
                    typeSupply:
                        ss.supplySourceTypeId === 1 || ss.supplySourceTypeId === 2
                            ? supplySourceTypeOption.find(
                                (sst) => sst.supplySourceTypeId === ss.supplySourceTypeId
                            )?.supplySourceTypeName
                            : "Khác",
                }));
                setSupplySourceOption(supplySources);
            }
        };
        listSupplySource();
    }, [supplySourceTypeOption]);

    const optionsForSupplySource = supplySourceOption.map((option) => ({
        typeSupply: option.typeSupply,
        ...option,
    }));

    return optionsForSupplySource
        .filter((option) => option.value !== 6)
        .sort((a, b) => (a.typeSupply > b.typeSupply ? 1 : -1));
};

export function actionSetTouched(dispatch, tab, fieldName) {
    const value = true;
    dispatch({
        type: HANDLERS_OVERSEAS_STUDENT.SET_TOUCHED_OVERSEAS_STUDENT,
        payload: { tab, fieldName, value },
    });
}

export function validateField(dispatch, tab, fieldName, fieldValue) {
    const validationSchema = Yup.object().shape({
        selectedPortraitPhoto: Yup.string(),
        selectedFullBodyPhoto: Yup.string(),
        overseasStId: Yup.number(),
        maHoSo: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        maHocSinh: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        ngayNhapHoc: Yup.date(),
        ho: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        tenDem: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        ten: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        ngaySinh: Yup.date().typeError("Vui lòng nhập thông tin vào trường này"),
        gioiTinh: Yup.string().max(4000),
        tinhTrangHonNhan: Yup.string().max(4000),
        trinhDoVanHoa: Yup.string().max(4000),
        maDanToc: Yup.object()
            .shape({
                value: Yup.string(),
                label: Yup.string(),
            }),
        tonGiao: Yup.string().max(4000),
        tienTrinhHoSo: Yup.string().max(4000),
        maChuongTrinhThamGia: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        ngayDangKy: Yup.date(),
        soCCCD: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        noiCapCCCD: Yup.object()
            .shape({
                value: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
                label: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
            })
            .typeError("Vui lòng nhập thông tin vào trường này"),
        // noiCapCCCD: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        ngayCapCCCD: Yup.date().typeError("Vui lòng nhập đúng định dạng"),
        soHoChieu: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        noiCapHoChieu: Yup.object()
            .shape({
                value: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
                label: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
            })
            .typeError("Vui lòng nhập thông tin vào trường này"),
        // noiCapHoChieu: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        ngayCapHoChieu: Yup.date().typeError("Vui lòng nhập đúng định dạng"),
        ngayHetHanHoChieu: Yup.date().typeError("Vui lòng nhập đúng định dạng")
            .test("is-greater", "Ngày hết hạn phải lớn hơn ngày cấp", function (value) {
                const ngayCapHoChieu = this.resolve(Yup.ref("ngayCapHoChieu"));
                return dayjs(value).isAfter(ngayCapHoChieu);
            }),
        soHoSoVisa: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        ngayCapVisa: Yup.date().typeError("Vui lòng nhập đúng định dạng"),
        ngayHetHanVisa: Yup.date().typeError("Vui lòng nhập đúng định dạng")
            .test("is-greater", "Ngày hết hạn visa phải lớn hơn ngày cấp", function (value) {
                const ngayCapVisa = this.resolve(Yup.ref("ngayCapVisa"));
                return dayjs(value).isAfter(ngayCapVisa);
            }),
        ngayNhanTCLT: Yup.date().typeError("Vui lòng nhập đúng định dạng")
            .test("is-greater", "Ngày nhận tư cách lưu trú phải lớn hơn ngày cấp", function (value) {
                const soHoSoVisa = this.resolve(Yup.ref("soHoSoVisa"));
                return dayjs(value).isAfter(soHoSoVisa);
            }),
        maThanhPho: Yup.object()
            .shape({
                value: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
                label: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
            })
            .typeError("Vui lòng nhập thông tin vào trường này"),
        maQuan: Yup.object()
            .shape({
                value: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
                label: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
            })
            .typeError("Vui lòng nhập thông tin vào trường này"),
        maPhuong: Yup.object()
            .shape({
                value: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
                label: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
            })
            .typeError("Vui lòng nhập thông tin vào trường này"),
        diaChi: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        dienThoai: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này").matches(/^[0-9]+$/, "Vui lòng nhập số điện thoại").max(15, "Số điện thoại tối đa là 15 số"),
        anhChanDung: Yup.string().max(4000)
            .required("Vui lòng nhập thông tin vào trường này"),
        anhToanThan: Yup.string().max(4000)
            .required("Vui lòng nhập thông tin vào trường này"),
        muonDi: Yup.array().min(1, "Bạn phải chọn ít nhất một lựa chọn cho Muốn đi"),
        canBoTuyenDung: Yup.object()
            .shape({
                value: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
                label: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
            })
            .typeError("Vui lòng nhập thông tin vào trường này"),
        // canBoTuyenDung: Yup.string().max(4000),
        kinhNghiem: Yup.array(),
        nhomNguon: Yup.mixed().test("isValid", "Nhóm nguồn cung ứng là trường bắt buộc", (value) => {
            // Kiểm tra nếu giá trị là null, undefined, hoặc ""
            return value && value.value !== "" && value.typeSupply !== "" && value.label !== "";
        }),
        quocTich: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        email: Yup.string().max(4000).email("Vui lòng nhập email đúng định dạng"),
        diaChiThuongTru: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        diaChiTamTru: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        diaChiNguyenQuan: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),

        // Ví dụ cho validation number
        // ageInput: Yup.number()
        //   .typeError("Age must be a number") // Thông báo lỗi nếu không phải là số
        //   .integer("Age must be an integer") // Thông báo lỗi nếu không phải số nguyên
        //   .positive("Age must be a positive number") // Thông báo lỗi nếu không phải số dương
        //   .required("Age is required"),
    });

    let newValue;
    validationSchema
        .validateAt(fieldName, { [fieldName]: fieldValue })
        .then(() => {
            newValue = null;
            dispatch({
                type: HANDLERS_OVERSEAS_STUDENT.SET_ERRORS_OVERSEAS_STUDENT,
                payload: { tab, fieldName, newValue },
            });
        })
        .catch((error) => {
            newValue = error.message;
            dispatch({
                type: HANDLERS_OVERSEAS_STUDENT.SET_ERRORS_OVERSEAS_STUDENT,
                payload: { tab, fieldName, newValue },
            });
        });
}

export default function TabInfoBasic({ isSuccess, setIsSuccess }) {
    // state
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [marketOption, setMarketOption] = useState([]);
    const [employeeOption, setEmployeeOption] = useState([]);
    const [professionOption, setProfessionOption] = useState([]);
    const [organ, setOrganOption] = useState([]);
    const [educationLevel, setEducationLevel] = useState([]);
    const [ethnic, setEthnic] = useState([]);
    const [marital, setMarital] = useState([]);
    const [religion, setReligion] = useState([]);
    const [profileProgress, setProfileProgress] = useState([]);
    const [preliminaryResults, setPreliminaryResults] = useState([]);
    // custom hook
    const supplySourceOption = useSupplySourceOption();
    // context
    const tab = "thongTinCoBan";
    const [state, dispatch] = useApp();
    const { overseasStudent } = state;
    const { thongTinCoBan } = overseasStudent;
    const {
        selectedPortraitPhoto,
        selectedFullBodyPhoto,
        maHoSo,
        maHocSinh,
        ngayNhapHoc,
        ho,
        tenDem,
        ten,
        ngaySinh,
        gioiTinh,
        quocTich,
        email,
        tinhTrangHonNhan,
        trinhDoVanHoa,
        maDanToc,
        tonGiao,
        tienTrinhHoSo,
        maChuongTrinhThamGia,
        ngayDangKy,
        soCCCD,
        ngayCapCCCD,
        noiCapCCCD,
        noiCapHoChieu,
        soHoChieu,
        ngayCapHoChieu,
        ngayHetHanHoChieu,
        soHoSoVisa,
        ngayCapVisa,
        ngayHetHanVisa,
        ngayNhanTCLT,
        maThanhPho,
        maQuan,
        maPhuong,
        diaChiThuongTru,
        diaChiTamTru,
        diaChiNguyenQuan,
        dienThoai,
        anhChanDung,
        anhToanThan,
        muonDi,
        canBoTuyenDung,
        kinhNghiem,
        nhomNguon,
        touched,
        errors,
    } = thongTinCoBan;

    //Options location
    const { cities, districts, wards } = useFetchLocation(
        maThanhPho?.value,
        maQuan?.value
    );

    useEffect(() => {
        const getRandom = async () => {
            const res = await GenerateApi("PR-DHS", "Number");
            const fieldName = "maHoSo";
            const newValue = res.data;
            dispatch({
                type: HANDLERS_OVERSEAS_STUDENT.SET_INPUT_OVERSEAS_STUDENT,
                payload: { tab, fieldName, newValue },
            });
            setIsSuccess(false);
        };
        if (isSuccess) {
            getRandom();
        }
    }, [isSuccess, setIsSuccess]);

    useEffect(() => {
        const getRandom = async () => {
            const res = await GenerateApi("DHS", "Number");
            const fieldName = "maHocSinh";
            const newValue = res.data;
            dispatch({
                type: HANDLERS_OVERSEAS_STUDENT.SET_INPUT_OVERSEAS_STUDENT,
                payload: { tab, fieldName, newValue },
            });
            setIsSuccess(false);
        };
        if (isSuccess) {
            getRandom();
        }
    }, [isSuccess, setIsSuccess]);

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleFileAvtChange = async (event) => {
        const file = event.target.files[0];
        if (file != null) {
            let newValue = file.name;
            let fieldName = "anhChanDung";

            actionSetTouched(dispatch, tab, fieldName);

            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();

                const response = await uploadSingleFile("Overseas-student", file);
                if (response.status === 200) {
                    newValue = getPathFromUrl(response.data);

                    reader.onload = (e) => {
                        dispatch({
                            type: HANDLERS_OVERSEAS_STUDENT.SET_INPUT_OVERSEAS_STUDENT,
                            payload: { tab, fieldName, newValue },
                        });
                        newValue = e.target.result;
                        fieldName = "selectedPortraitPhoto";

                        dispatch({
                            type: HANDLERS_OVERSEAS_STUDENT.SET_INPUT_OVERSEAS_STUDENT,
                            payload: { tab, fieldName, newValue },
                        });
                    };
                    reader.readAsDataURL(file);
                } else {
                    setSnackbarSeverity("error");
                    setSnackbarMessage("Thêm ảnh thất bại.");
                    setSnackbarOpen(true);
                    newValue = null;
                }
            } else {
                setSnackbarSeverity("warning");
                setSnackbarMessage("File không hợp lệ. Vui lòng chọn hình ảnh.");
                setSnackbarOpen(true);
                newValue = null;
            }

            validateField(dispatch, tab, fieldName, newValue);
        }
    };

    const handleFileBodyChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            let newValue = file.name;
            let fieldName = "anhToanThan";

            actionSetTouched(dispatch, tab, fieldName);

            if (file) {
                const reader = new FileReader();

                const response = await uploadSingleFile("Overseas-student", file);

                if (response.status === 200) {
                    newValue = getPathFromUrl(response.data);

                    reader.onload = (e) => {
                        dispatch({
                            type: HANDLERS_OVERSEAS_STUDENT.SET_INPUT_OVERSEAS_STUDENT,
                            payload: { tab, fieldName, newValue },
                        });
                        newValue = e.target.result;
                        fieldName = "selectedFullBodyPhoto";

                        dispatch({
                            type: HANDLERS_OVERSEAS_STUDENT.SET_INPUT_OVERSEAS_STUDENT,
                            payload: { tab, fieldName, newValue },
                        });
                    };
                    reader.readAsDataURL(file);
                } else {
                    setSnackbarSeverity("error");
                    setSnackbarMessage("Thêm ảnh thất bại.");
                    setSnackbarOpen(true);
                    newValue = null;
                }
            } else {
                setSnackbarSeverity("warning");
                setSnackbarMessage("File không hợp lệ. Vui lòng chọn hình ảnh.");
                setSnackbarOpen(true);
                newValue = null;
            }

            validateField(dispatch, tab, fieldName, newValue);
        }
    };

    const handleChange = (event, fieldName) => {
        actionSetTouched(dispatch, tab, fieldName);

        const fieldValue = event.target.value;
        let newValue;

        if (fieldValue.length >= 0) {
            newValue = fieldValue;
        } else {
            newValue = "";
        }

        dispatch({
            type: HANDLERS_OVERSEAS_STUDENT.SET_INPUT_OVERSEAS_STUDENT,
            payload: { tab, fieldName, newValue },
        });

        validateField(dispatch, tab, fieldName, fieldValue);
    };

    const handleBlurChange = (event, fieldName) => {
        actionSetTouched(dispatch, tab, fieldName);

        const fieldValue = event.target.value;
        let newValue;

        if (fieldValue.length >= 0) {
            newValue = fieldValue;
        } else {
            newValue = "";
        }

        dispatch({
            type: HANDLERS_OVERSEAS_STUDENT.SET_INPUT_OVERSEAS_STUDENT,
            payload: { tab, fieldName, newValue },
        });

        validateField(dispatch, tab, fieldName, fieldValue);
    };

    const handleChangeSelect = (event, fieldName, newValueSelect) => {
        actionSetTouched(dispatch, tab, fieldName);

        let newValue;

        if (newValueSelect !== null) {
            newValue = newValueSelect;
            dispatch({
                type: HANDLERS_OVERSEAS_STUDENT.SET_INPUT_OVERSEAS_STUDENT,
                payload: { tab, fieldName, newValue },
            });
        } else {
            newValue = "";
            dispatch({
                type: HANDLERS_OVERSEAS_STUDENT.SET_INPUT_OVERSEAS_STUDENT,
                payload: { tab, fieldName, newValue },
            });
        }

        validateField(dispatch, tab, fieldName, newValue);
    };

    const handleChangeDate = (value, fieldName) => {
        actionSetTouched(dispatch, tab, fieldName);
        const newValue = value;
        const format = dayjs(value).format("DD/MM/YYYY");

        dispatch({
            type: HANDLERS_OVERSEAS_STUDENT.SET_INPUT_OVERSEAS_STUDENT,
            payload: { tab, fieldName, newValue },
        });

        validateField(dispatch, tab, fieldName, newValue);
    };

    const handleBlur = (fieldName) => {
        actionSetTouched(dispatch, tab, fieldName);
    };

    //listMarketOption
    useEffect(() => {
        const listData = async () => {
            const res = await listMarketApi();
            if (Array.isArray(res.data) && res.data.length > 0) {
                const data = res.data.map((x) => ({
                    label: x.marketName,
                    value: x.marketId,
                }));
                setMarketOption(data);
            }
        };
        listData();
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
                setEmployeeOption(data);
            }
        };
        listData();
    }, []);

    //listProfessionOption
    useEffect(() => {
        const listData = async () => {
            const res = await listProfessionApi();
            if (Array.isArray(res.data) && res.data.length > 0) {
                const data = res.data.map((x) => ({
                    label: x.jobName,
                    value: x.jobId,
                    code: x.code,
                    marketId: x.marketId
                }));
                setProfessionOption(data);
            }
        };
        listData();
    }, []);

    //listOrganOption
    useEffect(() => {
        const listData = async () => {
            const res = await listOrganApi();
            if (Array.isArray(res.data) && res.data.length > 0) {
                const data = res.data.map((x) => ({
                    label: x.officeName,
                    value: x.officeId,
                }));
                setOrganOption(data);
            }
        };
        listData();
    }, []);

    // list ethnic
    useEffect(() => {
        const listEthnicOption = async () => {
            const res = await listEthnicApi();
            if (Array.isArray(res.data) && res.data.length > 0) {
                const ethnic = res.data.map((com) => ({
                    label: com.ethnicName,
                    value: com.ethnicId,
                }));
                setEthnic(ethnic);
            }
        };
        listEthnicOption();
    }, []);

    //listEducationLevel
    useEffect(() => {
        const listEducationLevelOption = async () => {
            const res = await listEducationLevelApi();
            if (Array.isArray(res.data) && res.data.length > 0) {
                const edutcationLevels = res.data.map((com) => ({
                    label: com.name,
                    value: com.educationLevelId,
                }));
                setEducationLevel(edutcationLevels);
            }
        };
        listEducationLevelOption();
    }, []);

    //listMarital
    useEffect(() => {
        const listData = async () => {
            const res = await listStatusByAliasApi("tinh-trang-hon-nhan");
            if (Array.isArray(res.data) && res.data.length > 0) {
                const data = res.data.map((com) => ({
                    label: com.statusName,
                    value: com.commonStatusId,
                }));
                setMarital(data);
            }
        };
        listData();
    }, []);

    //listReligion
    useEffect(() => {
        const listData = async () => {
            const res = await listStatusByAliasApi("ton-giao");
            if (Array.isArray(res.data) && res.data.length > 0) {
                const data = res.data.map((com) => ({
                    label: com.statusName,
                    value: com.commonStatusId,
                }));
                setReligion(data);
            }
        };
        listData();
    }, []);

    //listProfileProgress
    useEffect(() => {
        const listData = async () => {
            const res = await listStatusByAliasApi("tien-do-ho-so");
            if (Array.isArray(res.data) && res.data.length > 0) {
                const data = res.data.map((com) => ({
                    label: com.statusName,
                    value: com.commonStatusId,
                }));
                setProfileProgress(data);
            }
        };
        listData();
    }, []);

    //listPreliminaryResults
    useEffect(() => {
        const listData = async () => {
            const res = await listStatusByAliasApi("ket-qua-so-tuyen");
            if (Array.isArray(res.data) && res.data.length > 0) {
                const data = res.data.map((com) => ({
                    label: com.statusName,
                    value: com.commonStatusId,
                }));
                setPreliminaryResults(data);
            }
        };
        listData();
    }, []);

    //Lấy value trong context rồi fill tương ứng field
    useEffect(() => {
        document.querySelector("[name='ho']").value = ho;
        document.querySelector("[name='tenDem']").value = tenDem;
        document.querySelector("[name='ten']").value = ten;
        document.querySelector("[name='dienThoai']").value = dienThoai;
        document.querySelector("[name='email']").value = email;
        document.querySelector("[name='soHoChieu']").value = soHoChieu;
        document.querySelector("[name='soHoSoVisa']").value = soHoSoVisa;
        document.querySelector("[name='soCCCD']").value = soCCCD;
        document.querySelector("[name='diaChiThuongTru']").value = diaChiThuongTru;
        document.querySelector("[name='diaChiTamTru']").value = diaChiTamTru;
        document.querySelector("[name='diaChiNguyenQuan']").value = diaChiNguyenQuan;
    }, []);

    return (
        <>
            <Stack spacing={3}>
                <Grid
                    container
                    spacing={2}

                >
                    <Grid
                        item
                        sm={12}
                        md={6}
                        xs={12}
                    >
                        <Box
                            sx={{
                                padding: "16px",
                                border: "1px solid #ccc",
                                borderRadius: "6px",
                                marginBottom: '12px'
                            }}
                        >
                            <Typography
                                variant="h6"
                                component="h2"
                                sx={{ marginBottom: "16px" }}
                            >
                                Thông tin cơ bản
                            </Typography>
                            <TextField
                                error={!!(touched.maHoSo && errors.maHoSo)}
                                helperText={touched.maHoSo && errors.maHoSo}
                                onBlur={() => handleBlur("maHoSo")}
                                //a
                                onChange={(event) => handleChange(event, "maHoSo")}
                                value={maHoSo}
                                name="maHoSo"
                                //b
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Mã hồ sơ"
                                fullWidth
                                variant="outlined"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                error={!!(touched.maHocSinh && errors.maHocSinh)}
                                helperText={touched.maHocSinh && errors.maHocSinh}
                                onBlur={() => handleBlur("maHocSinh")}
                                onChange={(event) => handleChange(event, "maHocSinh")}
                                value={maHocSinh}
                                name="maHocSinh"
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Mã du học sinh"
                                fullWidth
                                variant="outlined"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <LocalizationProvider
                                dateAdapter={AdapterDayjs}
                                adapterLocale={"en-gb"}>
                                <DatePicker
                                    onBlur={() => handleBlur("ngayNhapHoc")}
                                    onChange={(value) => handleChangeDate(value, "ngayNhapHoc")}
                                    value={ngayNhapHoc}
                                    name="ngayNhapHoc"
                                    sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            variant: 'outlined',
                                            error: !!(touched.ngayNhapHoc && errors.ngayNhapHoc),
                                            helperText: touched.ngayNhapHoc && errors.ngayNhapHoc,
                                        }
                                    }}
                                    label="Ngày nhập học"
                                />
                            </LocalizationProvider>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <TextField
                                    autoComplete="off"
                                    error={!!(touched.ho && errors.ho)}
                                    helperText={touched.ho && errors.ho}
                                    onBlur={(event) => handleBlurChange(event, "ho")}
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    name="ho"
                                    label="Họ"
                                    fullWidth
                                    required
                                    variant="outlined"
                                />
                                <TextField
                                    autoComplete="off"
                                    error={!!(touched.tenDem && errors.tenDem)}
                                    helperText={touched.tenDem && errors.tenDem}
                                    onBlur={(event) => handleBlurChange(event, "tenDem")}
                                    name="tenDem"
                                    variant="outlined"
                                    required
                                    sx={{ margin: "2px", marginTop: "12px" }}
                                    size="small"
                                    label="Tên đệm"
                                    fullWidth
                                />
                                <TextField
                                    autoComplete="off"
                                    error={!!(touched.ten && errors.ten)}
                                    helperText={touched.ten && errors.ten}
                                    onBlur={(event) => handleBlurChange(event, "ten")}
                                    name="ten"
                                    variant="outlined"
                                    required
                                    sx={{ margin: "2px", marginTop: "12px" }}
                                    size="small"
                                    label="Tên"
                                    fullWidth
                                />
                            </Box>
                            <LocalizationProvider
                                dateAdapter={AdapterDayjs}
                                adapterLocale={"en-gb"}>
                                <DatePicker
                                    onBlur={() => handleBlur("ngaySinh")}
                                    onChange={(value) => handleChangeDate(value, "ngaySinh")}
                                    value={ngaySinh}
                                    name="ngaySinh"
                                    sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            variant: 'outlined',
                                            error: !!(touched.ngaySinh && errors.ngaySinh),
                                            helperText: touched.ngaySinh && errors.ngaySinh,
                                        }
                                    }}
                                    label="Ngày sinh"
                                />
                            </LocalizationProvider>
                            <Box
                                sx={{ margin: "4px", marginTop: "12px", display: "flex", flexDirection: "row" }}
                            >
                                <FormLabel sx={{ margin: "10px 10px 0 8px" }}>Giới tính</FormLabel>
                                <RadioGroup
                                    row
                                    name="gioiTinh"
                                    value={gioiTinh}
                                    onChange={(event) => handleChange(event, "gioiTinh")}
                                >
                                    <FormControlLabel value="Nam"
                                        control={<Radio size="small" />}
                                        label="Nam" />
                                    <FormControlLabel value="Nữ"
                                        control={<Radio size="small" />}
                                        label="Nữ" />
                                </RadioGroup>
                            </Box>
                            <Autocomplete
                                onBlur={() => handleBlur("quocTich")}
                                onChange={(event, newValue) => handleChangeSelect(event, "quocTich", newValue)}
                                value={quocTich}
                                name="quocTich"
                                fullWidth
                                size="small"
                                sx={{ margin: "4px" }}
                                options={["Việt Nam", "Nhật Bản", "Hàn Quốc", "Úc", "Mỹ"]}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Quốc tịch"
                                        variant="outlined"
                                        error={!!(touched.quocTich && errors.quocTich)}
                                        helperText={touched.quocTich && errors.quocTich}
                                    />
                                )}
                            />
                            <TextField
                                autoComplete="off"
                                error={!!(touched.dienThoai && errors.dienThoai)}
                                helperText={touched.dienThoai && errors.dienThoai}
                                onBlur={(event) => handleBlurChange(event, "dienThoai")}
                                name="dienThoai"
                                variant="outlined"
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Điện thoại di động"
                                fullWidth
                            />
                            <TextField
                                autoComplete="off"
                                error={!!(touched.email && errors.email)}
                                helperText={touched.email && errors.email}
                                onBlur={(event) => handleBlurChange(event, "email")}
                                name="email"
                                variant="outlined"
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Email"
                                fullWidth
                            />
                            <TextField
                                onChange={(event) => handleChange(event, "tinhTrangHonNhan")}
                                value={tinhTrangHonNhan}
                                name="tinhTrangHonNhan"
                                fullWidth
                                sx={{ margin: "4px", marginTop: "12px" }}
                                label="Tình trạng hôn nhân"
                                select
                                SelectProps={{ native: true }}
                                variant="outlined"
                            >
                                {marital.map((level) => (
                                    <option key={level}
                                        value={level.label}
                                    >
                                        {level.label}
                                    </option>
                                ))}
                            </TextField>
                            <TextField
                                onChange={(event) => handleChange(event, "trinhDoVanHoa")}
                                value={trinhDoVanHoa}
                                name="trinhDoVanHoa"
                                fullWidth
                                sx={{ margin: "4px", marginTop: "12px" }}
                                label="Trình độ văn hóa"
                                select
                                SelectProps={{ native: true }}
                                variant="outlined"
                            >
                                {educationLevel.map((level) => (
                                    <option key={level}
                                        value={level.value}
                                    >
                                        {level.label}
                                    </option>
                                ))}
                            </TextField>
                            <Autocomplete
                                onChange={(event, newValue) => handleChangeSelect(event, "maDanToc", newValue)}
                                value={maDanToc}
                                name="maDanToc"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={ethnic}
                                renderInput={(params) => <TextField {...params}
                                    label="Dân tộc"
                                    variant="outlined" />}
                            />
                            <TextField
                                onChange={(event) => handleChange(event, "tonGiao")}
                                value={tonGiao}
                                name="tonGiao"
                                fullWidth
                                sx={{ margin: "4px", marginTop: "12px" }}
                                label="Tôn giáo"
                                select
                                SelectProps={{ native: true }}
                                variant="outlined"
                            >
                                {religion.map((level) => (
                                    <option key={level}
                                        value={level.label}
                                    >
                                        {level.label}
                                    </option>
                                ))}
                            </TextField>
                            <TextField
                                onChange={(event) => handleChange(event, "tienTrinhHoSo")}
                                value={tienTrinhHoSo}
                                name="tienTrinhHoSo"
                                fullWidth
                                sx={{ margin: "4px", marginTop: "12px" }}
                                label="Tiến độ hồ sơ"
                                select
                                SelectProps={{ native: true }}
                                variant="outlined"
                            >
                                {profileProgress.map((level) => (
                                    <option key={level}
                                        value={level.value}
                                    >
                                        {level.label}
                                    </option>
                                ))}
                            </TextField>
                            <Autocomplete
                                onBlur={() => handleBlur("maChuongTrinhThamGia")}
                                onChange={(event, newValue) => handleChangeSelect(event, "maChuongTrinhThamGia", newValue)}
                                value={maChuongTrinhThamGia}
                                name="maChuongTrinhThamGia"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={['Không lựa chọn', 'TTS', 'CT khác']}
                                renderInput={(params) => <TextField {...params}
                                    label="Chương trình tham gia"
                                    variant="outlined"
                                    error={!!(touched.maChuongTrinhThamGia && errors.maChuongTrinhThamGia)}
                                    helperText={touched.maChuongTrinhThamGia && errors.maChuongTrinhThamGia}
                                />}
                            />
                            <LocalizationProvider
                                dateAdapter={AdapterDayjs}
                                adapterLocale={"en-gb"}>
                                <DatePicker
                                    onBlur={() => handleBlur("ngayDangKy")}
                                    onChange={(value) => handleChangeDate(value, "ngayDangKy")}
                                    value={ngayDangKy}
                                    name="ngayDangKy"
                                    sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            variant: 'outlined',
                                            error: !!(touched.ngayDangKy && errors.ngayDangKy),
                                            helperText: touched.ngayDangKy && errors.ngayDangKy,
                                        }
                                    }}
                                    label="Ngày đăng ký"
                                />
                            </LocalizationProvider>
                        </Box>
                        <Box
                            sx={{
                                padding: "16px",
                                border: "1px solid #ccc",
                                borderRadius: "6px",
                                marginBottom: '12px'
                            }}
                        >
                            <Typography
                                variant="h6"
                                component="h2"
                                sx={{ marginBottom: "16px" }}
                            >
                                Hộ chiếu
                            </Typography>
                            <TextField
                                autoComplete="off"
                                error={!!(touched.soHoChieu && errors.soHoChieu)}
                                helperText={touched.soHoChieu && errors.soHoChieu}
                                onBlur={(event) => handleBlurChange(event, "soHoChieu")}
                                name="soHoChieu"
                                variant="outlined"
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Số hộ chiếu"
                                fullWidth
                            />
                            <Autocomplete
                                onChange={(event, newValue) => handleChangeSelect(event, "noiCapHoChieu", newValue)}
                                value={noiCapHoChieu}
                                name="noiCapHoChieu"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={organ}
                                renderInput={(params) => <TextField {...params}
                                    label="Nơi cấp hộ chiếu"
                                    variant="outlined" />}
                            />
                            <LocalizationProvider
                                dateAdapter={AdapterDayjs}
                                adapterLocale={"en-gb"}>
                                <DatePicker
                                    onBlur={() => handleBlur("ngayCapHoChieu")}
                                    onChange={(value) => handleChangeDate(value, "ngayCapHoChieu")}
                                    value={ngayCapHoChieu}
                                    name="ngayCapHoChieu"
                                    sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            variant: 'outlined',
                                            error: !!(touched.ngayCapHoChieu && errors.ngayCapHoChieu),
                                            helperText: touched.ngayCapHoChieu && errors.ngayCapHoChieu,
                                        }
                                    }}
                                    label="Ngày cấp"
                                />
                            </LocalizationProvider>
                            <LocalizationProvider
                                dateAdapter={AdapterDayjs}
                                adapterLocale={"en-gb"}>
                                <DatePicker
                                    onBlur={() => handleBlur("ngayHetHanHoChieu")}
                                    onChange={(value) => handleChangeDate(value, "ngayHetHanHoChieu")}
                                    value={dayjs(ngayCapHoChieu).add(10, "year")}
                                    name="ngayHetHanHoChieu"
                                    sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            variant: 'outlined',
                                            error: !!(touched.ngayHetHanHoChieu && errors.ngayHetHanHoChieu),
                                            helperText: touched.ngayHetHanHoChieu && errors.ngayHetHanHoChieu,
                                        }
                                    }}
                                    label="Ngày hết hạn"
                                />
                            </LocalizationProvider>
                        </Box>
                        <Box
                            sx={{
                                padding: "16px",
                                border: "1px solid #ccc",
                                borderRadius: "6px",
                                marginBottom: '12px'
                            }}
                        >
                            <Typography
                                variant="h6"
                                component="h2"
                                sx={{ marginBottom: "16px", marginTop: "16px" }}
                            >
                                Thông tin visa
                            </Typography>
                            <TextField
                                autoComplete="off"
                                error={!!(touched.soHoSoVisa && errors.soHoSoVisa)}
                                helperText={touched.soHoSoVisa && errors.soHoSoVisa}
                                onBlur={(event) => handleBlurChange(event, "soHoSoVisa")}
                                name="soHoSoVisa"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Số hồ sơ"
                                fullWidth
                                variant="outlined"
                            />
                            <LocalizationProvider
                                dateAdapter={AdapterDayjs}
                                adapterLocale={"en-gb"}>
                                <DatePicker
                                    onBlur={() => handleBlur("ngayCapVisa")}
                                    onChange={(value) => handleChangeDate(value, "ngayCapVisa")}
                                    value={ngayCapVisa}
                                    name="ngayCapVisa"
                                    sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            variant: 'outlined',
                                            error: !!(touched.ngayCapVisa && errors.ngayCapVisa),
                                            helperText: touched.ngayCapVisa && errors.ngayCapVisa,
                                        }
                                    }}
                                    label="Ngày cấp"
                                />
                            </LocalizationProvider>
                            <LocalizationProvider
                                dateAdapter={AdapterDayjs}
                                adapterLocale={"en-gb"}>
                                <DatePicker
                                    onBlur={() => handleBlur("ngayHetHanVisa")}
                                    onChange={(value) => handleChangeDate(value, "ngayHetHanVisa")}
                                    value={ngayHetHanVisa}
                                    name="ngayHetHanVisa"
                                    sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            variant: 'outlined',
                                            error: !!(touched.ngayHetHanVisa && errors.ngayHetHanVisa),
                                            helperText: touched.ngayHetHanVisa && errors.ngayHetHanVisa,
                                        }
                                    }}
                                    label="Ngày hết hạn"
                                />
                            </LocalizationProvider>
                            <LocalizationProvider
                                dateAdapter={AdapterDayjs}
                                adapterLocale={"en-gb"}>
                                <DatePicker
                                    onBlur={() => handleBlur("ngayNhanTCLT")}
                                    onChange={(value) => handleChangeDate(value, "ngayNhanTCLT")}
                                    value={ngayNhanTCLT}
                                    name="ngayNhanTCLT"
                                    sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            variant: 'outlined',
                                            error: !!(touched.ngayNhanTCLT && errors.ngayNhanTCLT),
                                            helperText: touched.ngayNhanTCLT && errors.ngayNhanTCLT,
                                        }
                                    }}
                                    label="Ngày nhận tư cách lưu trú"
                                />
                            </LocalizationProvider>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        sm={12}
                        md={6}
                        xs={12}
                    >
                        <Box
                            sx={{
                                padding: "16px",
                                border: "1px solid #ccc",
                                borderRadius: "6px",
                                marginBottom: '12px'
                            }}
                        >
                            <Typography
                                variant="h6"
                                component="h2"
                                sx={{ marginBottom: "16px" }}
                            >
                                Căn cước công dân
                            </Typography>
                            <TextField
                                autoComplete="off"
                                error={!!(touched.soCCCD && errors.soCCCD)}
                                helperText={touched.soCCCD && errors.soCCCD}
                                onBlur={(event) => handleBlurChange(event, "soCCCD")}
                                name="soCCCD"
                                variant="outlined"
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Số CCCD"
                                fullWidth
                            />
                            <Autocomplete
                                onChange={(event, newValue) => handleChangeSelect(event, "noiCapCCCD", newValue)}
                                value={noiCapCCCD}
                                name="noiCapCCCD"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={organ}
                                renderInput={(params) => (
                                    <TextField
                                        error={!!(touched.noiCapCCCD && errors.noiCapCCCD)}
                                        helperText={touched.noiCapCCCD && errors.noiCapCCCD}
                                        variant="outlined"
                                        {...params}
                                        label="Nơi cấp CCCD"
                                    />
                                )}
                            />
                            <LocalizationProvider
                                dateAdapter={AdapterDayjs}
                                adapterLocale={"en-gb"}>
                                <DatePicker
                                    onBlur={() => handleBlur("ngayCapCCCD")}
                                    onChange={(value) => handleChangeDate(value, "ngayCapCCCD")}
                                    value={ngayCapCCCD}
                                    name="ngayCapCCCD"
                                    sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            variant: 'outlined',
                                            error: !!(touched.ngayCapCCCD && errors.ngayCapCCCD),
                                            helperText: touched.ngayCapCCCD && errors.ngayCapCCCD,
                                        }
                                    }}
                                    label="Ngày cấp"
                                />
                            </LocalizationProvider>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Autocomplete
                                    onBlur={() => handleBlur("maThanhPho")}
                                    onChange={(event, newValue) => handleChangeSelect(event, "maThanhPho", newValue)}
                                    value={maThanhPho}
                                    name="maThanhPho"
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    fullWidth
                                    size="small"
                                    options={cities}
                                    renderInput={(params) => <TextField {...params}
                                        label="Tỉnh, thành phố"
                                        variant="outlined"
                                        error={!!(touched.maThanhPho && errors.maThanhPho)}
                                        helperText={touched.maThanhPho && errors.maThanhPho}
                                    />}
                                />
                                <Autocomplete
                                    onBlur={() => handleBlur("maQuan")}
                                    onChange={(event, newValue) => handleChangeSelect(event, "maQuan", newValue)}
                                    value={maQuan}
                                    name="maQuan"
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    fullWidth
                                    size="small"
                                    options={districts}
                                    renderInput={(params) => <TextField {...params}
                                        label="Quận / huyện"
                                        variant="outlined"
                                        error={!!(touched.maQuan && errors.maQuan)}
                                        helperText={touched.maQuan && errors.maQuan}
                                    />}
                                />
                                <Autocomplete
                                    onBlur={() => handleBlur("maPhuong")}
                                    onChange={(event, newValue) => handleChangeSelect(event, "maPhuong", newValue)}
                                    value={maPhuong}
                                    name="maPhuong"
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    fullWidth
                                    size="small"
                                    options={wards}
                                    renderInput={(params) => <TextField {...params}
                                        label="Xã phường"
                                        variant="outlined"
                                        error={!!(touched.maPhuong && errors.maPhuong)}
                                        helperText={touched.maPhuong && errors.maPhuong}
                                    />}
                                />
                            </Box>
                            <TextField
                                autoComplete="off"
                                error={!!(touched.diaChiThuongTru && errors.diaChiThuongTru)}
                                helperText={touched.diaChiThuongTru && errors.diaChiThuongTru}
                                onBlur={(event) => handleBlurChange(event, "diaChiThuongTru")}
                                name="diaChiThuongTru"
                                required
                                variant="outlined"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Địa chỉ thường trú"
                                fullWidth
                            />
                        </Box>
                        <Box
                            sx={{
                                padding: "16px",
                                border: "1px solid #ccc",
                                borderRadius: "6px",
                                marginBottom: '12px'
                            }}
                        >
                            <Typography
                                variant="h6"
                                component="h2"
                                sx={{ marginBottom: "16px" }}
                            >
                                Địa chỉ
                            </Typography>
                            <TextField
                                autoComplete="off"
                                error={!!(touched.diaChiTamTru && errors.diaChiTamTru)}
                                helperText={touched.diaChiTamTru && errors.diaChiTamTru}
                                onBlur={(event) => handleBlurChange(event, "diaChiTamTru")}
                                name="diaChiTamTru"
                                required
                                variant="outlined"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Địa chỉ tạm trú"
                                fullWidth
                            />
                            <TextField
                                autoComplete="off"
                                error={!!(touched.diaChiNguyenQuan && errors.diaChiNguyenQuan)}
                                helperText={touched.diaChiNguyenQuan && errors.diaChiNguyenQuan}
                                onBlur={(event) => handleBlurChange(event, "diaChiNguyenQuan")}
                                name="diaChiNguyenQuan"
                                variant="outlined"
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Địa chỉ nguyên quán"
                                fullWidth
                            />
                            <Box
                                sx={{
                                    margin: '20px 0px',
                                    display: 'flex',
                                    justifyContent: 'space-evenly'
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Typography
                                        variant="b"
                                        component="b"
                                        sx={{ margin: "16px" }}
                                    >
                                        Ảnh chân dung
                                    </Typography>
                                    <Stack direction="row"
                                        spacing={2}>
                                        <Avatar
                                            sx={{
                                                width: "120px",
                                                height: "160px",
                                            }}
                                            variant="rounded"
                                            src={selectedPortraitPhoto}
                                        ></Avatar>
                                    </Stack>
                                    <Button size="small"
                                        component="label">
                                        Tải ảnh lên
                                        <VisuallyHiddenInput type="file"
                                            accept="image/*"
                                            onChange={handleFileAvtChange}
                                            onBlur={() => handleBlur("anhChanDung")}
                                        />
                                    </Button>
                                    {touched.anhChanDung && errors.anhChanDung && (
                                        <FormHelperText sx={{ color: "red" }}>{errors.anhChanDung}</FormHelperText>
                                    )}
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Typography
                                        variant="b"
                                        component="b"
                                        sx={{ margin: "16px" }}
                                    >
                                        Ảnh toàn thân
                                    </Typography>
                                    <Stack direction="row"
                                        spacing={2}>
                                        <Avatar
                                            sx={{
                                                width: "120px",
                                                height: "160px",
                                            }}
                                            variant="rounded"
                                            src={selectedFullBodyPhoto}
                                        ></Avatar>
                                    </Stack>
                                    <Button size="small"
                                        component="label">
                                        Tải ảnh lên
                                        <VisuallyHiddenInput type="file"
                                            accept="image/*"
                                            onChange={handleFileBodyChange}
                                            onBlur={() => handleBlur("anhToanThan")}
                                        />
                                    </Button>
                                    {touched.anhToanThan && errors.anhToanThan && (
                                        <FormHelperText sx={{ color: "red" }}>{errors.anhToanThan}</FormHelperText>
                                    )}
                                </Box>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                padding: "16px",
                                border: "1px solid #ccc",
                                borderRadius: "6px",
                                marginBottom: '12px'
                            }}
                        >
                            <Typography
                                variant="h6"
                                component="h2"
                                sx={{ marginBottom: "16px" }}
                            >
                                Thông tin nộp hồ sơ
                            </Typography>
                            <Autocomplete
                                onBlur={() => handleBlur("muonDi")}
                                onChange={(event, newValue) => handleChangeSelect(event, "muonDi", newValue)}
                                value={muonDi}
                                name="muonDi"
                                multiple
                                disableCloseOnSelect
                                getOptionLabel={(option) => option.label}
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={marketOption}
                                renderInput={(params) => <TextField {...params}
                                    label="Muốn đi"
                                    variant="outlined"
                                    error={!!(touched.muonDi && errors.muonDi)}
                                    helperText={touched.muonDi && errors.muonDi}
                                    placeholder="Có thể chọn nhiều"
                                    InputProps={{
                                        ...params.InputProps,
                                        style: { color: '#ccc' }
                                    }}
                                />}
                            />
                            <Autocomplete
                                onBlur={() => handleBlur("canBoTuyenDung")}
                                onChange={(event, newValue) => handleChangeSelect(event, "canBoTuyenDung", newValue)}
                                value={canBoTuyenDung}
                                name="canBoTuyenDung"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={employeeOption}
                                renderInput={(params) => <TextField {...params}
                                    label="Cán bộ tuyển dụng"
                                    variant="outlined"
                                    error={!!(touched.canBoTuyenDung && errors.canBoTuyenDung)}
                                    helperText={touched.canBoTuyenDung && errors.canBoTuyenDung}
                                />}
                            />
                            <Autocomplete
                                onChange={(event, newValue) => handleChangeSelect(event, "kinhNghiem", newValue)}
                                value={kinhNghiem}
                                name="kinhNghiem"
                                multiple
                                disableCloseOnSelect
                                getOptionLabel={(option) => option.label}
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={professionOption}
                                renderInput={(params) => <TextField {...params}
                                    label="Kinh nghiệm"
                                    variant="outlined"
                                    placeholder="Có thể chọn nhiều"
                                    InputProps={{
                                        ...params.InputProps,
                                        style: { color: '#ccc' }
                                    }}
                                />}
                            />
                            <Autocomplete
                                onBlur={() => handleBlur("nhomNguon")}
                                onChange={(event, newValue) => handleChangeSelect(event, "nhomNguon", newValue)}
                                value={nhomNguon}
                                name="nhomNguon"
                                fullWidth
                                size="small"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                options={supplySourceOption}
                                groupBy={(option) => option.typeSupply}
                                renderInput={(params) => (
                                    <TextField variant="outlined"
                                        {...params}
                                        label="Nhóm nguồn cung ứng"
                                        error={!!(touched.nhomNguon && errors.nhomNguon)}
                                        helperText={touched.nhomNguon && errors.nhomNguon}
                                    />
                                )}
                            />
                        </Box>
                    </Grid>
                </Grid>
                <SnackbarAlert
                    open={snackbarOpen}
                    message={snackbarMessage}
                    severity={snackbarSeverity}
                    onClose={handleCloseSnackbar}
                />
            </Stack>
        </>
    )
};