import { CreditCardIcon, PencilSquareIcon, Squares2X2Icon, UserIcon } from "@heroicons/react/24/solid";
import {
    School,
    Apartment,
    Business,
    Assignment,
    AccessibilityNew,
    SettingsApplications,
    Description,
    BusinessCenter,
    Work,
    People,
    LocalLibrary,
    LocationCity,
    LocalHospital,
    Home,
    FlightTakeoff,
    PeopleAlt,
    Group,
    Movie,
    Groups,
    Groups2,
    Diversity1,
    AddLocationAlt,
    HelpCenter,
    Adjust,
    Translate,
    Scale,
    NoteAdd,
    Sensors,
} from "@mui/icons-material";
import { SvgIcon } from "@mui/material";
import PublicIcon from '@mui/icons-material/Public';

const settingsConfig = [
    {
        title: "KTX",
        path: "/setting/dormitory",
        icon: <SvgIcon fontSize="medium" style={{ color: '#2196f3' }}><Apartment /></SvgIcon>,
        group: "TTS / DHS"
    },
    {
        title: "Phòng",
        path: "/setting/room",
        icon: <SvgIcon fontSize="medium" style={{ color: '#4caf50' }}><Home /></SvgIcon>,
        group: "TTS / DHS"
    },
    {
        title: "Nhóm câu hỏi",
        path: "/setting/question-group",
        icon: <SvgIcon fontSize="medium" style={{ color: '#2196f3' }}><HelpCenter /></SvgIcon>,
        group: "TTS / DHS"
    },
    {
        title: "Tạo câu hỏi",
        path: "/setting/create-question",
        icon: <SvgIcon fontSize="medium" style={{ color: '#673ab7' }}><PencilSquareIcon /></SvgIcon>,
        group: "TTS / DHS"
    },
    {
        title: "Tài sản - Dụng cụ",
        path: "/setting/item",
        icon: <SvgIcon fontSize="medium" style={{ color: '#ff9800' }}><Assignment /></SvgIcon>,
        group: "Tài Sản"
    },
    {
        title: "Ngành nghề",
        path: "/setting/profession",
        icon: <SvgIcon fontSize="medium" style={{ color: '#9c27b0' }}><Business /></SvgIcon>,
        group: "Nhân sự"
    },
    {
        title: "Thị trường",
        path: "/setting/market",
        icon: <SvgIcon fontSize="medium" style={{ color: '#ff5722' }}><BusinessCenter /></SvgIcon>,
        group: "Địa điểm"
    },
    {
        title: "Trình độ văn hóa",
        path: "/setting/educationLevel",
        icon: <SvgIcon fontSize="medium" style={{ color: '#3f51b5' }}><AccessibilityNew /></SvgIcon>,
        group: "Nhân sự"
    },
    {
        title: "Cấu hình hệ thống",
        path: "/setting/config-system",
        icon: <SvgIcon fontSize="medium" style={{ color: '#2196f3' }}><SettingsApplications /></SvgIcon>,
        group: "Hệ Thống và Cấu Hình"
    },
    {
        title: "Giấy tờ",
        path: "/setting/documents",
        icon: <SvgIcon fontSize="medium" style={{ color: '#ff5722' }}><Description /></SvgIcon>,
        group: "Văn Thư"
    },
    {
        title: "Công ty chứng nghề",
        path: "/setting/professionalCertification",
        icon: <SvgIcon fontSize="medium" style={{ color: '#e91e63' }}><BusinessCenter /></SvgIcon>,
        group: "Cơ quan"
    },
    {
        title: "Trường học",
        path: "/setting/school",
        icon: <SvgIcon fontSize="medium" style={{ color: '#4caf50' }}><LocalLibrary /></SvgIcon>,
        group: "TTS / DHS"
    },
    {
        title: "Chuyên ngành",
        path: "/setting/major",
        icon: <SvgIcon fontSize="medium" style={{ color: '#9c27b0' }}><Work /></SvgIcon>,
        group: "Nhân sự"
    },
    {
        title: "Vùng",
        path: "/setting/region",
        icon: <SvgIcon fontSize="medium" style={{ color: '#673ab7' }}><LocationCity /></SvgIcon>,
        group: "Địa điểm"
    },
    {
        title: "Cơ quan công vụ",
        path: "/setting/organ",
        icon: <SvgIcon fontSize="medium" style={{ color: '#3f51b5' }}><LocalHospital /></SvgIcon>,
        group: "Cơ quan"
    },
    // {
    //     title: "Chương trình tham gia",
    //     path: "/setting/participation-program",
    //     icon: <SvgIcon fontSize="medium" style={{ color: '#ff5722' }}><Movie /></SvgIcon>,
    //     group: "Hệ Thống và Cấu Hình"
    // },
    {
        title: "Dân tộc",
        path: "/setting/ethnicity",
        icon: <SvgIcon fontSize="medium" style={{ color: '#e91e63' }}><Diversity1 /></SvgIcon>,
        group: "Khác"
    },
    {
        title: "Nhóm xuất cảnh",
        path: "/setting/emigration-group",
        icon: <SvgIcon fontSize="medium" style={{ color: '#2196f3' }}><Groups /></SvgIcon>,
        group: "TTS / DHS"
    },
    {
        title: "Sân bay",
        path: "/setting/airport",
        icon: <SvgIcon fontSize="medium" style={{ color: '#673ab7' }}><AddLocationAlt /></SvgIcon>,
        group: "Địa điểm"
    },
    // {
    //     title: "Menu",
    //     path: "/setting/menu",
    //     icon: <SvgIcon fontSize="medium" style={{ color: '#4caf50' }}><Squares2X2Icon /></SvgIcon>,
    //     group: "Hệ Thống và Cấu Hình"
    // },
    {
        title: "Trạng thái",
        path: "/setting/status",
        icon: <SvgIcon fontSize="medium" style={{ color: '#ff9800' }}><Adjust /></SvgIcon>,
        group: "Hệ Thống và Cấu Hình"
    },
    {
        title: "Từ vựng",
        path: "/setting/vocabulary",
        icon: <SvgIcon fontSize="medium" style={{ color: '#e91e63' }}><Translate /></SvgIcon>,
        group: "Hệ Thống và Cấu Hình"
    },
    {
        title: "Loại cung ứng",
        path: "/setting/supply-type",
        icon: <SvgIcon fontSize="medium" style={{ color: '#2196f3' }}><Scale /></SvgIcon>,
        group: "Cơ quan"
    },
    {
        title: "Hình thức thanh toán",
        path: "/setting/payment-type",
        icon: <SvgIcon fontSize="medium" style={{ color: '#3f51b5' }}><CreditCardIcon /></SvgIcon>,
        group: "Khác"
    },
    // {
    //     title: "Tạo file",
    //     path: "/setting/create-file",
    //     icon: <SvgIcon fontSize="medium" style={{ color: '#4caf50' }}><NoteAdd /></SvgIcon>,
    //     group: "Hệ Thống và Cấu Hình"
    // },
    // {
    //     title: "Ip truy cập",
    //     path: "/setting/ip-access",
    //     icon: <SvgIcon fontSize="medium" style={{ color: '#2196f3' }}><Sensors /></SvgIcon>,
    //     group: "Hệ Thống và Cấu Hình"
    // },
    {
        title: "Quốc gia",
        path: "/setting/country",
        icon: <SvgIcon fontSize="medium" style={{ color: '#3f51b5' }}><PublicIcon /></SvgIcon>,
        group: "Khác"
    },
];


export default settingsConfig;
