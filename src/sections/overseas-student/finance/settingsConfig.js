import { ArrowLeftOnRectangleIcon, ArrowRightOnRectangleIcon, BanknotesIcon, CircleStackIcon, UserIcon } from "@heroicons/react/24/solid";
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
} from "@mui/icons-material";
import { SvgIcon } from "@mui/material";

const settingsConfig = [
    {
        title: "Thu tiền",
        path: "/overseas-student/finance/collect-money",
        icon: <SvgIcon fontSize="medium" style={{ color: '#4caf50' }}><ArrowLeftOnRectangleIcon /></SvgIcon>,
        group: ""
    },
    {
        title: "Chi tiền",
        path: "/overseas-student/finance/payment-money",
        icon: <SvgIcon fontSize="medium" style={{ color: '#e91e63' }}><ArrowRightOnRectangleIcon /></SvgIcon>,
        group: ""
    },
    {
        title: "Nợ phải trả",
        path: "/overseas-student/finance/debt-pay-money",
        icon: <SvgIcon fontSize="medium" style={{ color: '#673ab7' }}><BanknotesIcon /></SvgIcon>,
        group: ""
    },
    {
        title: "Nợ phải thu",
        path: "/overseas-student/finance/debt-collect-money",
        icon: <SvgIcon fontSize="medium" style={{ color: '#ff5722' }}><CircleStackIcon  /></SvgIcon>,
        group: ""
    },
];


export default settingsConfig;
