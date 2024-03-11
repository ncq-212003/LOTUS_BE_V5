import {
  ChartBarIcon,
  UserIcon,
  CalendarDaysIcon,
  DocumentCheckIcon,
  CpuChipIcon,
} from "@heroicons/react/24/solid";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DescriptionIcon from "@mui/icons-material/Description";
import CreateIcon from "@mui/icons-material/Create";
import CalculateIcon from "@mui/icons-material/Calculate";
import {
  Warehouse,
  AutoStories,
  Group,
  Add,
  Settings,
  AirlineStopsOutlined,
  FlightTakeoff,
  BakeryDining,
  AccountBalanceWallet,
  Language,
  Draw,
} from "@mui/icons-material";
import { SvgIcon } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";

export const items = [
  {
    title: "Tổng quan",
    path: "/",
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Lịch công tác",
    icon: (
      <SvgIcon fontSize="small">
        <CalendarTodayIcon />
      </SvgIcon>
    ),
    submenu: [
      {
        title: "Lịch của tôi",
        path: "/schedule/work",
        icon: (
          <SvgIcon fontSize="small">
            <Add />
          </SvgIcon>
        ),
      },
      {
        title: "Lịch chung",
        path: "/schedule/everyone",
        icon: (
          <SvgIcon fontSize="small">
            <Add />
          </SvgIcon>
        ),
      },
      {
        title: "Địa điểm",
        path: "/schedule/address",
        icon: (
          <SvgIcon fontSize="small">
            <Add />
          </SvgIcon>
        ),
      },
      {
        title: "Xe",
        path: "/schedule/car",
        icon: (
          <SvgIcon fontSize="small">
            <Add />
          </SvgIcon>
        ),
      },
      {
        title: "Quà tặng",
        path: "/schedule/present",
        icon: (
          <SvgIcon fontSize="small">
            <Add />
          </SvgIcon>
        ),
      },
      {
        title: "Tiến Trình",
        path: "/schedule/process",
        icon: (
          <SvgIcon fontSize="small">
            <Add />
          </SvgIcon>
        ),
      },
    ],
  },
  {
    title: "Thực tập sinh",
    icon: (
      <SvgIcon fontSize="small">
        <PersonIcon />
      </SvgIcon>
    ),
    submenu: [
      {
        title: "Trước xuất cảnh",
        path: "/intern-before",
        icon: (
          <SvgIcon fontSize="small">
            <Add />
          </SvgIcon>
        ),
      },
      {
        title: "Sau xuất cảnh",
        path: "/intern-after",
        icon: (
          <SvgIcon fontSize="small">
            <Add />
          </SvgIcon>
        ),
      },
      {
        title: "Lịch bay",
        path: "/intern/flight-schedules",
        icon: (
          <SvgIcon fontSize="small">
            <Add />
          </SvgIcon>
        ),
      },
      {
        title: "Cảnh báo",
        path: "/intern/warning",
        icon: (
          <SvgIcon fontSize="small">
            <Add />
          </SvgIcon>
        ),
      },
      // {
      //   title: "Tài chính",
      //   path: "/intern/finance",
      //   icon: (
      //     <SvgIcon fontSize="small">
      //       <Add />
      //     </SvgIcon>
      //   ),
      // },
      {
        title: "Đơn hàng",
        path: "/intern/order",
        icon: (
          <SvgIcon fontSize="small">
            <Add />
          </SvgIcon>
        ),
      },
      // {
      //   title: "Tự đăng kí",
      //   path: "/intern/enrollment",
      //   icon: (
      //     <SvgIcon fontSize="small">
      //       <Add />
      //     </SvgIcon>
      //   ),
      // },
      // {
      //   title: "Thu tiền",
      //   path: "/intern/collect-money",
      //   icon: (
      //     <SvgIcon fontSize="small">
      //       <Add />
      //     </SvgIcon>
      //   ),
      // },
      // {
      //   title: "Chi tiền",
      //   path: "/intern/payment-money",
      //   icon: (
      //     <SvgIcon fontSize="small">
      //       <Add />
      //     </SvgIcon>
      //   ),
      // },
      // {
      //   title: "Nợ phải trả",
      //   path: "/intern/debt-pay-money",
      //   icon: (
      //     <SvgIcon fontSize="small">
      //       <Add />
      //     </SvgIcon>
      //   ),
      // },
      // {
      //   title: "Nợ phải thu",
      //   path: "/intern/debt-collect-money",
      //   icon: (
      //     <SvgIcon fontSize="small">
      //       <Add />
      //     </SvgIcon>
      //   ),
      // },
    ]
  },
  {
    title: "Du học sinh",
    icon: (
      <SvgIcon fontSize="small">
        <PersonIcon />
      </SvgIcon>
    ),
    submenu: [
      {
        title: "Trước xuất cảnh",
        path: "/overseas-student-before",
        icon: (
          <SvgIcon fontSize="small">
            <Add />
          </SvgIcon>
        ),
      },
      {
        title: "Sau xuất cảnh",
        path: "/overseas-student-after",
        icon: (
          <SvgIcon fontSize="small">
            <Add />
          </SvgIcon>
        ),
      },
      {
        title: "Lịch bay",
        path: "/overseas-student/flight-schedules",
        icon: (
          <SvgIcon fontSize="small">
            <Add />
          </SvgIcon>
        ),
      },
      {
        title: "Cảnh báo",
        path: "/overseas-student/warning",
        icon: (
          <SvgIcon fontSize="small">
            <Add />
          </SvgIcon>
        ),
      },
      // {
      //   title: "Tài chính",
      //   path: "/overseas-student/finance",
      //   icon: (
      //     <SvgIcon fontSize="small">
      //       <Add />
      //     </SvgIcon>
      //   ),
      // },
      // {
      //   title: "Tự đăng kí",
      //   path: "/overseas-student/enrollment",
      //   icon: (
      //     <SvgIcon fontSize="small">
      //       <Add />
      //     </SvgIcon>
      //   ),
      // },
      // {
      //   title: "Thu tiền",
      //   path: "/overseas-student/collect-money",
      //   icon: (
      //     <SvgIcon fontSize="small">
      //       <Add />
      //     </SvgIcon>
      //   ),
      // },
      // {
      //   title: "Chi tiền",
      //   path: "/overseas-student/payment-money",
      //   icon: (
      //     <SvgIcon fontSize="small">
      //       <Add />
      //     </SvgIcon>
      //   ),
      // },
      // {
      //   title: "Nợ phải trả",
      //   path: "/overseas-student/debt-pay-money",
      //   icon: (
      //     <SvgIcon fontSize="small">
      //       <Add />
      //     </SvgIcon>
      //   ),
      // },
      // {
      //   title: "Nợ phải thu",
      //   path: "/overseas-student/debt-collect-money",
      //   icon: (
      //     <SvgIcon fontSize="small">
      //       <Add />
      //     </SvgIcon>
      //   ),
      // },
    ],
  },
  // {
  //   title: "Đơn hàng",
  //   path: "/order",
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <DocumentCheckIcon />
  //     </SvgIcon>
  //   ),
  //   submenu: [
  //     {
  //       title: "Đang tiến cử",
  //       path: "/order/progress",
  //       icon: (
  //         <SvgIcon fontSize="small">
  //           <Add />
  //         </SvgIcon>
  //       ),
  //     },
  //     {
  //       title: "Hoàn thành hồ sơ",
  //       path: "/order/success",
  //       icon: (
  //         <SvgIcon fontSize="small">
  //           <Add />
  //         </SvgIcon>
  //       ),
  //     },
  //     {
  //       title: "Đã hoàn thành",
  //       path: "/order/done",
  //       icon: (
  //         <SvgIcon fontSize="small">
  //           <Add />
  //         </SvgIcon>
  //       ),
  //     },
  //     {
  //       title: "Hủy",
  //       path: "/order/cancel",
  //       icon: (
  //         <SvgIcon fontSize="small">
  //           <Add />
  //         </SvgIcon>
  //       ),
  //     },
  //   ]
  // },
  {
    title: "Hồ sơ",
    path: "/document",
    icon: (
      <SvgIcon fontSize="small">
        <DescriptionIcon />
      </SvgIcon>
    ),
    submenu: [
      // {
      //   title: "Cá nhân",
      //   path: "/document/profile",
      //   icon: (
      //     <SvgIcon fontSize="small">
      //       <Add />
      //     </SvgIcon>
      //   ),
      // },
      {
        title: "Dịch thuật",
        path: "/document/translation",
        icon: (
          <SvgIcon fontSize="small">
            <Add />
          </SvgIcon>
        ),
      },
      // {
      //   title: "Bằng cấp , chứng chỉ",
      //   path: "/document/qualifications",
      //   icon: (
      //     <SvgIcon fontSize="small">
      //       <Add />
      //     </SvgIcon>
      //   ),
      // },
      // {
      //   title: "Báo cáo",
      //   path: "/document/report",
      //   icon: (
      //     <SvgIcon fontSize="small">
      //       <Add />
      //     </SvgIcon>
      //   ),
      // },
    ]
  },
  // {
  //   title: "Điểm danh",
  //   path: "/attendance",
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <CreateIcon />
  //     </SvgIcon>
  //   ),
  // },
  {
    title: "Tài chính",
    icon: (
      <SvgIcon fontSize="small">
        <CalculateIcon />
      </SvgIcon>
    ),
    submenu: [
      {
        title: "Chương trình",
        path: "/finance/program",
        icon: (
          <SvgIcon fontSize="small">
            <Add />
          </SvgIcon>
        ),
      },
      // {
      //   title: "Thu tiền",
      //   path: "/finance/collect-money",
      //   icon: (
      //     <SvgIcon fontSize="small">
      //       <Add />
      //     </SvgIcon>
      //   ),
      // },
      // {
      //   title: "Chi tiền",
      //   path: "/finance/payment-money",
      //   icon: (
      //     <SvgIcon fontSize="small">
      //       <Add />
      //     </SvgIcon>
      //   ),
      // },
      // {
      //   title: "Nợ phải thu",
      //   path: "/finance/debt-collect-money",
      //   icon: (
      //     <SvgIcon fontSize="small">
      //       <Add />
      //     </SvgIcon>
      //   ),
      // },
      // {
      //   title: "Nợ phải trả",
      //   path: "/finance/debt-pay-money",
      //   icon: (
      //     <SvgIcon fontSize="small">
      //       <Add />
      //     </SvgIcon>
      //   ),
      // },
      {
        title: "Hạng mục thu chi",
        path: "/finance/revenue-expenditure",
        icon: (
          <SvgIcon fontSize="small">
            <Add />
          </SvgIcon>
        ),
      },
      {
        title: "Tài khoản",
        path: "/finance/account",
        icon: (
          <SvgIcon fontSize="small">
            <Add />
          </SvgIcon>
        ),
      },
    ],
  },
  {
    title: "Đối tác",
    icon: (
      <SvgIcon fontSize="small">
        <Group />
      </SvgIcon>
    ),
    submenu: [
      {
        title: "Nghiệp đoàn",
        path: "/partner/union",
        icon: (
          <SvgIcon fontSize="small">
            <Add />
          </SvgIcon>
        ),
      },
      {
        title: "Công ty tiếp nhận",
        path: "/partner/company-receiving",
        icon: (
          <SvgIcon fontSize="small">
            <Add />
          </SvgIcon>
        ),
      },
      {
        title: "Nguồn cung ứng",
        path: "/partner/supplySource",
        icon: (
          <SvgIcon fontSize="small">
            <Add />
          </SvgIcon>
        ),
      },
      {
        title: "Khiếu nại",
        path: "/partner/complain",
        icon: (
          <SvgIcon fontSize="small">
            <Add />
          </SvgIcon>
        ),
      },
      // {
      //   title: "Tài chính",
      //   path: "/partner/finance",
      //   icon: (
      //     <SvgIcon fontSize="small">
      //       <Add />
      //     </SvgIcon>
      //   ),
      // },
      // {
      //   title: "Thu tiền",
      //   path: "/partner/collect-money",
      //   icon: (
      //     <SvgIcon fontSize="small">
      //       <Add />
      //     </SvgIcon>
      //   ),
      // },
      // {
      //   title: "Chi tiền",
      //   path: "/partner/payment-money",
      //   icon: (
      //     <SvgIcon fontSize="small">
      //       <Add />
      //     </SvgIcon>
      //   ),
      // },
      // {
      //   title: "Nợ phải trả",
      //   path: "/partner/debt-pay-money",
      //   icon: (
      //     <SvgIcon fontSize="small">
      //       <Add />
      //     </SvgIcon>
      //   ),
      // },
      // {
      //   title: "Nợ phải thu",
      //   path: "/partner/debt-collect-money",
      //   icon: (
      //     <SvgIcon fontSize="small">
      //       <Add />
      //     </SvgIcon>
      //   ),
      // },
    ],
  },
  {
    title: "Đào tạo",
    icon: (
      <SvgIcon fontSize="small">
        <SchoolIcon />
      </SvgIcon>
    ),
    submenu: [
      // {
      //   title: "Bài thi",
      //   path: "/train/exam",
      //   icon: (
      //     <SvgIcon fontSize="small">
      //       <Add />
      //     </SvgIcon>
      //   ),
      // },
      // {
      //   title: "Câu hỏi",
      //   path: "/train/question",
      //   icon: (
      //     <SvgIcon fontSize="small">
      //       <Add />
      //     </SvgIcon>
      //   ),
      // },
      // {
      //   title: "Danh sách học viên",
      //   path: "/train/list-student",
      //   icon: (
      //     <SvgIcon fontSize="small">
      //       <Add />
      //     </SvgIcon>
      //   ),
      // },
      {
        title: "Danh sách lớp",
        path: "/train/list-class",
        icon: (
          <SvgIcon fontSize="small">
            <Add />
          </SvgIcon>
        ),
      },
      {
        title: "Danh sách giáo viên",
        path: "/train/list-teacher",
        icon: (
          <SvgIcon fontSize="small">
            <Add />
          </SvgIcon>
        ),
      },
      // {
      //   title: "Danh sách môn học",
      //   path: "/train/list-subjects",
      //   icon: (
      //     <SvgIcon fontSize="small">
      //       <Add />
      //     </SvgIcon>
      //   ),
      // },
      // {
      //   title: "Học viên đang thi tuyển",
      //   path: "/train/students-taking-exams",
      //   icon: (
      //     <SvgIcon fontSize="small">
      //       <Add />
      //     </SvgIcon>
      //   ),
      // },
      // {
      //   title: "Học viên chưa trúng tuyển",
      //   path: "/train/students-unsuccessful",
      //   icon: (
      //     <SvgIcon fontSize="small">
      //       <Add />
      //     </SvgIcon>
      //   ),
      // },
      // {
      //   title: "Học viên đã trúng tuyển",
      //   path: "/train/students-successful",
      //   icon: (
      //     <SvgIcon fontSize="small">
      //       <Add />
      //     </SvgIcon>
      //   ),
      // },
      // {
      //   title: "Báo cáo bảng điểm",
      //   path: "/train/score-report",
      //   icon: (
      //     <SvgIcon fontSize="small">
      //       <Add />
      //     </SvgIcon>
      //   ),
      // },
      {
        title: "Báo cáo chung",
        path: "/train/study-report",
        icon: (
          <SvgIcon fontSize="small">
            <Add />
          </SvgIcon>
        ),
      },
      // {
      //   title: "Báo cáo điểm danh",
      //   path: "/train/attendance-report",
      //   icon: (
      //     <SvgIcon fontSize="small">
      //       <Add />
      //     </SvgIcon>
      //   ),
      // },
      // {
      //   title: "Chứng chỉ",
      //   path: "/train/certificate",
      //   icon: (
      //     <SvgIcon fontSize="small">
      //       <Add />
      //     </SvgIcon>
      //   ),
      // },
      // {
      //   title: "Thi tuyển",
      //   path: "/train/examination",
      //   icon: (
      //     <SvgIcon fontSize="small">
      //       <Add />
      //     </SvgIcon>
      //   ),
      // },
    ],
  },
  {
    title: "Công ty",
    icon: (
      <SvgIcon fontSize="small">
        <Warehouse />
      </SvgIcon>
    ),
    submenu: [
      {
        title: "Công ty",
        path: "/companies/company",
        icon: (
          <SvgIcon fontSize="small">
            <Add />
          </SvgIcon>
        ),
      },
      {
        title: "Nhân viên",
        path: "/company/employee",
        icon: (
          <SvgIcon fontSize="small">
            <Add />
          </SvgIcon>
        ),
      },
      {
        title: "Phòng ban",
        path: "/company/departments",
        icon: (
          <SvgIcon fontSize="small">
            <Add />
          </SvgIcon>
        ),
      },
      // {
      //   title: 'Thông báo',
      //   path: '/company/notification',
      //   icon: (
      //     <SvgIcon fontSize="small">
      //       <Add />
      //     </SvgIcon>
      //   ),
      // },
      // {
      //   title: "Chi nhánh",
      //   path: "/company/branch",
      //   icon: (
      //     <SvgIcon fontSize="small">
      //       <Add />
      //     </SvgIcon>
      //   ),
      // },
    ],
  },
  {
    title: "Cấu hình",
    icon: (
      <SvgIcon fontSize="small">
        <Settings />
      </SvgIcon>
    ),
    submenu: [
      {
        title: "Cấu hình chung",
        path: "/setting",
        icon: (
          <SvgIcon fontSize="small">
            <Add />
          </SvgIcon>
        ),
      },
    ],
    // submenu: [
    //   {
    //     title: "Giáo viên",
    //     path: "/setting/teacher",
    //     icon: (
    //       <SvgIcon fontSize="small">
    //         <Add />
    //       </SvgIcon>
    //     ),
    //   },
    //   {
    //     title: "Lớp học",
    //     path: "/setting/classroom",
    //     icon: (
    //       <SvgIcon fontSize="small">
    //         <Add />
    //       </SvgIcon>
    //     ),
    //   },
    //   // {
    //   //   title: "Trường đại học",
    //   //   path: "/setting/university",
    //   //   icon: (
    //   //     <SvgIcon fontSize="small">
    //   //       <Add />
    //   //     </SvgIcon>
    //   //   ),
    //   // },
    //   {
    //     title: "KTX",
    //     path: "/setting/dormitory",
    //     icon: (
    //       <SvgIcon fontSize="small">
    //         <Add />
    //       </SvgIcon>
    //     ),
    //   },
    //   {
    //     title: "Phòng",
    //     path: "/setting/room",
    //     icon: (
    //       <SvgIcon fontSize="small">
    //         <Add />
    //       </SvgIcon>
    //     ),
    //   },
    //   {
    //     title: "Tài sản - Dụng cụ",
    //     path: "/setting/item",
    //     icon: (
    //       <SvgIcon fontSize="small">
    //         <Add />
    //       </SvgIcon>
    //     ),
    //   },
    //   {
    //     title: "Ngành nghề",
    //     path: "/setting/profession",
    //     icon: (
    //       <SvgIcon fontSize="small">
    //         <Add />
    //       </SvgIcon>
    //     ),
    //   },
    //   // {
    //   //   title: "Ngành nghề tiếp nhận",
    //   //   path: "/setting/receiving-profession",
    //   //   icon: (
    //   //     <SvgIcon fontSize="small">
    //   //       <Add />
    //   //     </SvgIcon>
    //   //   ),
    //   // },
    //   {
    //     title: "Thị trường",
    //     path: "/setting/market",
    //     icon: (
    //       <SvgIcon fontSize="small">
    //         <Add />
    //       </SvgIcon>
    //     ),
    //   },
    //   {
    //     title: "Trình độ văn hóa",
    //     path: "/setting/educationLevel",
    //     icon: (
    //       <SvgIcon fontSize="small">
    //         <Add />
    //       </SvgIcon>
    //     ),
    //   },
    //   {
    //     title: "Cấu hình hệ thống",
    //     path: "/setting/system",
    //     icon: (
    //       <SvgIcon fontSize="small">
    //         <Add />
    //       </SvgIcon>
    //     ),
    //   },
    //   {
    //     title: "Giấy tờ",
    //     path: "/setting/documents",
    //     icon: (
    //       <SvgIcon fontSize="small">
    //         <Add />
    //       </SvgIcon>
    //     ),
    //   },
    //   {
    //     title: "Công ty chứng nghề",
    //     path: "/setting/professionalCertification",

    //     icon: (
    //       <SvgIcon fontSize="small">
    //         <Add />
    //       </SvgIcon>
    //     ),
    //   },
    //   {
    //     title: "Trường học",
    //     path: "/setting/school",
    //     icon: (
    //       <SvgIcon fontSize="small">
    //         <Add />
    //       </SvgIcon>
    //     ),
    //   },
    //   {
    //     title: "Chuyên ngành",
    //     path: "/setting/major",
    //     icon: (
    //       <SvgIcon fontSize="small">
    //         <Add />
    //       </SvgIcon>
    //     ),
    //   },
    //   // {
    //   //   title: "Cấu hình ngôn ngữ",
    //   //   path: "/setting/language",
    //   //   icon: (
    //   //     <SvgIcon fontSize="small">
    //   //       <Add />
    //   //     </SvgIcon>
    //   //   ),
    //   // },
    //   {
    //     title: "Tỉnh thành ",
    //     path: "/setting/province",
    //     icon: (
    //       <SvgIcon fontSize="small">
    //         <Add />
    //       </SvgIcon>
    //     ),
    //   },
    //   {
    //     title: "Cơ quan cấp hộ chiếu",
    //     path: "/setting/passport-issuing-agency",
    //     icon: (
    //       <SvgIcon fontSize="small">
    //         <Add />
    //       </SvgIcon>
    //     ),
    //   },
    // ],
  },
  // {
  //   title: "Hệ thống",
  //   path: "/system",
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <CpuChipIcon />
  //     </SvgIcon>
  //   ),
  //   submenu: [
  //     {
  //       title: "Phân quyền hệ thống",
  //       path: "/system/role-system",
  //       icon: (
  //         <SvgIcon fontSize="small">
  //           <Add />
  //         </SvgIcon>
  //       ),
  //     },
  //     {
  //       title: "Module",
  //       path: "/system/module",
  //       icon: (
  //         <SvgIcon fontSize="small">
  //           <Add />
  //         </SvgIcon>
  //       ),
  //     },
  //     {
  //       title: "Chức năng",
  //       path: "/system/feature",
  //       icon: (
  //         <SvgIcon fontSize="small">
  //           <Add />
  //         </SvgIcon>
  //       ),
  //     },
  //   ]
  // },
  {
    title: "Tự đăng kí",
    path: "/enrollment",
    icon: (
      <SvgIcon fontSize="small">
        <Draw />
      </SvgIcon>
    ),
  },
];