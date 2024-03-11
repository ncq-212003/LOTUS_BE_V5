import dayjs from "dayjs";

const initialStateEmployee = {
  employees: [],

  basicInfo: {
    employeeId: 1,
    selectedFile: "",
    avatar: "",
    employeeCode: "",
    department: [],
    role: [],
    lastName: "",
    middleName: "",
    firstName: "",
    birthday: dayjs(),
    contractDate: dayjs(),
    sex: "Nam",
    nationality: "Việt Nam",
    mobilePhone: "",
    educationLevelId: 1,
    marriedStatus: "Chưa kết hôn",
    ethnicity: { label: "Kinh", value: 1 },
    religion: "",
    employeeType: {label: 'Toàn thời gian', value: 31},
    email: "",
    identification: "",
    identificationDate: dayjs(),
    identificationLocation: "",
    domicileCityId: "",
    domicileDistrictId: "",
    domicileWardId: "",
    normallyAddress: "",
    temporaryAddress: "",
    domicileAddress: "",
    passportNumber: "",
    passportProvideLocation: "",
    passportProvideDate: dayjs(),
    passwordExpiredDate: dayjs().add(10, "year"),
    visaNumber: "",
    visaProvideDate: dayjs(),
    visaExpiredDate: dayjs().add(2, "year"),
    visaTclt: dayjs().add(3, "month"),
    touched: {},
    errors: {},
  },

  healthCondition: {
    groupBlood: "",
    weight: "",
    height: "",
    isDrinkWine: "Không",
    isSmoke: "Không",
    eyeSightRight: "",
    eyeSightLeft: "",
    strongHand: "Không lựa chọn",
    colorBlindness: "Không lựa chọn",
    sweatyHands: "Không lựa chọn",
    afraidHeight: "Không lựa chọn",
    haveTatoo: "Không lựa chọn",
    detailTatoo: "",
    touched: {},
    errors: {},
  },

  accessSystem: {
    userName: "",
    password: "",
    confirmPassword: "",
    status:  29,
    touched: {},
    errors: {},
  },

  generalNotes: {
    description: "",
  },
};

const HANDLERS_EMPLOYEE = {
  SET_TOUCHED_EMPLOYEE: "SET_TOUCHED_EMPLOYEE",
  SET_ERRORS_EMPLOYEE: "SET_ERRORS_EMPLOYEE",
  SET_INPUT_EMPLOYEES: "SET_INPUT_EMPLOYEES",
  SET_VALUES_FOR_EDIT_EMPLOYEES: "SET_VALUES_FOR_EDIT_EMPLOYEES",
  RESET_EMPLOYEE: "RESET_EMPLOYEE",
  LIST_EMPLOYEES: "LIST_EMPLOYEES",
  // ADD_EMPLOYEE: "ADD_EMPLOYEE",
  UPDATE_EMPLOYEE: "UPDATE_EMPLOYEE",
  DELETE_EMPLOYEE: "DELETE_EMPLOYEE",
  FIND_EMPLOYEE_BYID: "FIND_EMPLOYEE_BYID",
};

const handlersEmployee = {
  // set touched
  [HANDLERS_EMPLOYEE.SET_TOUCHED_EMPLOYEE]: (state, action) => {
    const { tab, fieldName, newValue } = action.payload;
    return {
      ...state,
      [tab]: {
        ...state[tab],
        touched: { ...state[tab].touched, [fieldName]: newValue },
      },
    };
  },

  // set error
  [HANDLERS_EMPLOYEE.SET_ERRORS_EMPLOYEE]: (state, action) => {
    const { tab, fieldName, newValue } = action.payload;

    return {
      ...state,
      [tab]: {
        ...state[tab],
        errors: {
          ...state[tab].errors,
          [fieldName]: newValue,
        },
      },
    };
  },

  //set input
  [HANDLERS_EMPLOYEE.SET_INPUT_EMPLOYEES]: (state, action) => {
    const { tab, fieldName, newValue } = action.payload;

    if (fieldName === "passportProvideDate") {
      const passwordExpiredDate = dayjs(newValue).add(10, "year");

      return {
        ...state,
        [tab]: {
          ...state[tab],
          passportProvideDate: newValue,
          passwordExpiredDate: passwordExpiredDate,
        },
      };
    }

    if (fieldName === "domicileCityId") {
      if (newValue.length === 0) {
        return {
          ...state,
          [tab]: {
            ...state[tab],
            domicileCityId: "",
            domicileDistrictId: "",
            domicileWardId: "",
          },
        };
      } else {
        return {
          ...state,
          [tab]: {
            ...state[tab],
            domicileCityId: newValue,
            domicileDistrictId: "",
            domicileWardId: "",
          },
        };
      }
    }

    if (fieldName === "domicileDistrictId") {
      console.log(newValue.length === 0);
      if (newValue.length === 0) {
        return {
          ...state,
          [tab]: {
            ...state[tab],
            domicileDistrictId: "",
            domicileWardId: "",
          },
        };
      } else {
        return {
          ...state,
          [tab]: {
            ...state[tab],
            domicileDistrictId: newValue,
            domicileWardId: "",
          },
        };
      }
    }

    return {
      ...state,
      [tab]: {
        ...state[tab],
        [fieldName]: newValue,
      },
    };
  },

  //set value for edit
  [HANDLERS_EMPLOYEE.SET_VALUES_FOR_EDIT_EMPLOYEES]: (state, action) => {
    const { rowData } = action.payload;
    
    return {
      ...state,
      basicInfo: {
        employeeId: rowData.employeeId,
        selectedFile: "",
        avatar: rowData.avatar || "",
        employeeCode: rowData.employeeCode || "",
        department: rowData.departmentValues || [],
        role: [],
        lastName: rowData.lastName || "",
        middleName: rowData.middleName || "",
        firstName: rowData.firstName || "",
        birthday: dayjs(rowData.birthday) || dayjs(),
        contractDate: dayjs(rowData.contractDate) || dayjs(),
        sex: rowData.sex || "Nam",
        nationality: rowData.nationality || "Việt Nam",
        mobilePhone: rowData.mobilePhone || "",
        educationLevelId: rowData.educationLevelId || 1,
        marriedStatus: rowData.marriedStatus || "Chưa kết hôn",
        ethnicity: rowData.ethnicity || { label: "Kinh", value: 1 },
        religion: rowData.religion || "",
        employeeType: rowData.employeeType || {label: 'Toàn thời gian', value: 31},
        email: rowData.email || "",
        identification: rowData.identification || "",
        identificationDate: dayjs(rowData.identificationDate) || dayjs(),
        identificationLocation: rowData.identificationLocation || "",
        domicileCityId: rowData.nameCity || "",
        domicileDistrictId: rowData.nameDistrict || "",
        domicileWardId: rowData.nameWard || "",
        normallyAddress: rowData.normallyAddress || "",
        temporaryAddress: rowData.temporaryAddress || "",
        domicileAddress: rowData.domicileAddress || "",
        passportNumber: rowData.passportNumber || "",
        passportProvideLocation: rowData.passportProvideLocation || "",
        passportProvideDate: dayjs(rowData.passportProvideDate) || dayjs(),
        passwordExpiredDate: dayjs(rowData.passwordExpiredDate) || dayjs().add(10, "year"),
        visaNumber: rowData.visaNumber || "",
        visaProvideDate: dayjs(rowData.visaProvideDate) || dayjs(),
        visaExpiredDate: dayjs(rowData.visaExpiredDate) || dayjs().add(2, "year"),
        visaTclt: dayjs(rowData.visaTclt) || dayjs().add(3, "month"),
        touched: {},
        errors: {},
      },

      healthCondition: {
        groupBlood: rowData.groupBlood || "",
        weight: rowData.weight || "",
        height: rowData.height || "",
        isDrinkWine: (rowData.isDrinkWine === true ? "Có" : "Không") || "Không",
        isSmoke: (rowData.isSmoke === true ? "Có" : "Không") || "Không",
        eyeSightRight: rowData.eyeSightRight || "",
        eyeSightLeft: rowData.eyeSightLeft || "",
        strongHand: rowData.strongHand || "Không lựa chọn",
        colorBlindness: rowData.colorBlindness || "Không lựa chọn",
        sweatyHands: rowData.sweatyHands || "Không lựa chọn",
        afraidHeight: rowData.afraidHeight || "Không lựa chọn",
        haveTatoo: rowData.haveTatoo || "Không lựa chọn",
        detailTatoo: rowData.detailTatoo || "",
        touched: {},
        errors: {},
      },

      accessSystem: {
        userName: rowData.userName || "",
        password: rowData.password || "",
        confirmPassword: rowData.password || "",
        status: rowData.status || 29,
        touched: {},
        errors: {},
      },

      generalNotes: {
        description: rowData.description || "",
      },
    };
  },

  // list
  [HANDLERS_EMPLOYEE.LIST_EMPLOYEES]: (state, action) => {
    const employees = action.payload;

    return {
      ...state,
      employees: employees,
    };
  },

  // reset form
  [HANDLERS_EMPLOYEE.RESET_EMPLOYEE]: (state, action) => {
    return {
      ...state,
      basicInfo: {
        employeeId: 1,
        selectedFile: "",
        avatar: "",
        employeeCode: "",
        department: [],
        role: [],
        lastName: "",
        middleName: "",
        firstName: "",
        birthday: dayjs(),
        contractDate: dayjs(),
        sex: "Nam",
        nationality: "Việt Nam",
        mobilePhone: "",
        educationLevelId: 1,
        marriedStatus: "Chưa kết hôn",
        ethnicity: { label: "Kinh", value: 1 },
        religion: "",
        employeeType: {label: 'Toàn thời gian', value: 31},
        email: "",
        identification: "",
        identificationDate: dayjs(),
        identificationLocation: "",
        domicileCityId: "",
        domicileDistrictId: "",
        domicileWardId: "",
        normallyAddress: "",
        temporaryAddress: "",
        domicileAddress: "",
        passportNumber: "",
        passportProvideLocation: "",
        passportProvideDate: dayjs(),
        passwordExpiredDate: dayjs().add(10, "year"),
        visaNumber: "",
        visaProvideDate: dayjs(),
        visaExpiredDate: dayjs().add(2, "year"),
        visaTclt: dayjs().add(3, "month"),
        touched: {},
        errors: {},
      },
    
      healthCondition: {
        groupBlood: "",
        weight: "",
        height: "",
        isDrinkWine: "Không",
        isSmoke: "Không",
        eyeSightRight: "",
        eyeSightLeft: "",
        strongHand: "Không lựa chọn",
        colorBlindness: "Không lựa chọn",
        sweatyHands: "Không lựa chọn",
        afraidHeight: "Không lựa chọn",
        haveTatoo: "Không lựa chọn",
        detailTatoo: "",
        touched: {},
        errors: {},
      },
    
      accessSystem: {
        userName: "",
        password: "",
        confirmPassword: "",
        status:  29,
        touched: {},
        errors: {},
      },
    
      generalNotes: {
        description: "",
      },
    };
  },

  // add
  // [HANDLERS_EMPLOYEE.ADD_EMPLOYEE]: (state, action) => {
  //   const { basicInfo, healthCondition, accessSystem, generalNotes } = action.payload;

  //   const newEmployee = {
  //     basicInfo: basicInfo,
  //     healthCondition: healthCondition,
  //     accessSystem: accessSystem,
  //     generalNotes: generalNotes,
  //   };

  //   return {
  //     ...state,
  //     employees: [newEmployee],
  //   };
  // },

  // update
  [HANDLERS_EMPLOYEE.UPDATE_EMPLOYEE]: (state, action) => {
    return state;
  },

  // delete
  [HANDLERS_EMPLOYEE.DELETE_EMPLOYEE]: (state, action) => {
    return {
      branchs: [],
    };
  },

  // find byid
  [HANDLERS_EMPLOYEE.FIND_EMPLOYEE_BYID]: (state, action) => {
    const employee = action.payload;

    return employee;
  },
};

const reducerEmployee = (state, action) =>
  handlersEmployee[action.type] ? handlersEmployee[action.type](state, action) : state;

export { initialStateEmployee, reducerEmployee, HANDLERS_EMPLOYEE };

const DepartmentOption = () => {
  const [companyNameOption, setCompanyNameOption] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  //listCompanyName
  useEffect(() => {
    const listCompanyName = async () => {
      const res = await listCompanyApi();
      if (Array.isArray(res.data) && res.data.length > 0) {
        const companies = res.data.map((com) => ({
          companyName: com.companyName,
          companyId: com.companyId,
        }));
        setCompanyNameOption(companies);
      }
    };
    listCompanyName();
  }, []);

  // list department
  useEffect(() => {
    const listDepartment = async () => {
      const res = await listDepartmentApi();
      if (Array.isArray(res.data) && res.data.length > 0) {
        const departments = res.data.map((dep) => ({
          value: dep.departmentId,
          company: companyNameOption.find((com) => com.companyId === dep.companyId)?.companyName,
          label: dep.deparmentName,
        }));
        setDepartmentOptions(departments);
      }
    };
    listDepartment();
  }, [companyNameOption]);

  const optionsForDepartment = departmentOptions.map((option) => ({
    companies: option.company,
    ...option,
  }));

  return optionsForDepartment.sort((a, b) => (a.companies > b.companies ? 1 : -1));
};
