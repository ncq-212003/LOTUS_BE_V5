import {
  Box,
  Grid,
  Stack,
  Typography,
  TextField,
  Autocomplete,
  Avatar,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { useEffect } from "react";
import { useState } from "react";
import { listEmployeeApi } from "src/contexts/api/company/api-employee";
import { fetchCities, fetchDistricts, fetchWards } from "src/contexts/api/location-api";
import { listSupplySourceApi } from "src/contexts/api/partner/api-supplySource";
import { ListEducationLevel } from "src/contexts/api/setting/api-educationlevel";
import { listEthnicApi } from "src/contexts/api/setting/api-ethnicity";
import { ListMarket } from "src/contexts/api/setting/api-market";
import { listOrganApi } from "src/contexts/api/setting/api-organ";
import { ListProfession } from "src/contexts/api/setting/api-profession";
import { listStatusByAliasApi } from "src/contexts/api/setting/api-status";
import { listSupplyTypeApi } from "src/contexts/api/setting/api-supply-type";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const formatDate = (date) => {
  return dayjs(date);
};

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

export default function TabInfoBasic({ rowData }) {
  const {
    maHoSo,
    maThucTapSinh,
    ngayNhapHoc,
    ho,
    tenDem,
    ten,
    ngaySinh,
    gioiTinh,
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
    diaChi,
    dienThoai,
    anhChanDung,
    anhToanThan,
    muonDi,
    canBoTuyenDung,
    ketQuaSoTuyen,
    kinhNghiem,
    nhomNguon,
  } = rowData;

  const [nameCity, setNameCity] = useState("");
  const [nameDistrict, setNameDistrict] = useState("");
  const [nameWard, setNameWard] = useState("");
  const [educationLevel, setEducationLevel] = useState([]);
  const [ethnic, setEthnic] = useState([]);
  const [marketOption, setMarketOption] = useState([]);
  const [employeeOption, setEmployeeOption] = useState([]);
  const [professionOption, setProfessionOption] = useState([]);
  const [office, setOfficeOption] = useState([]);
  const supplySource = useSupplySourceOption();
  const [marital, setMarital] = useState([]);
  const [religion, setReligion] = useState([]);
  const [profileProgress, setProfileProgress] = useState([]);
  const [preliminaryResults, setPreliminaryResults] = useState([]);

  // list location
  useEffect(() => {
    const updateListLocation = async () => {
      const cities = await fetchCities();
      const districts = await fetchDistricts(maThanhPho);
      const wards = await fetchWards(maQuan);

      setNameCity(cities.find((city) => city.value === maThanhPho)?.label);
      setNameDistrict(districts.find((district) => district.value === maQuan)?.label);
      setNameWard(wards.find((ward) => ward.value === maPhuong)?.label);
    };
    updateListLocation();
  }, [rowData]);

  //listEducationLevel
  useEffect(() => {
    const listEducationLevelOption = async () => {
      const res = await ListEducationLevel();
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

  //listMarketOption
  useEffect(() => {
    const listData = async () => {
      const res = await ListMarket();
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
          label: x.lastName + " " + x.middleName + " " + x.firstName,
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
      const res = await ListProfession();
      if (Array.isArray(res.data) && res.data.length > 0) {
        const data = res.data.map((x) => ({
          label: x.jobName,
          value: x.jobId,
        }));
        setProfessionOption(data);
      }
    };
    listData();
  }, []);

  //listOfficeOption
  useEffect(() => {
    const listData = async () => {
      const res = await listOrganApi();
      if (Array.isArray(res.data) && res.data.length > 0) {
        const data = res.data.map((x) => ({
          label: x.officeName,
          value: x.officeId,
        }));
        setOfficeOption(data);
      }
    };
    listData();
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

  return (
    <Stack spacing={3}>
      <Grid container spacing={2}>
        <Grid item sm={12} md={6} xs={12}>
          {/* Thông tin cơ bản */}
          <Box
            sx={{
              padding: "16px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              marginBottom: "12px",
            }}
          >
            <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
              Thông tin cơ bản
            </Typography>
            <TextField
              InputProps={{
                readOnly: true,
              }}
              value={maHoSo}
              name="maHoSo"
              variant="outlined"
              required
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Mã hồ sơ"
              fullWidth
            />
            <TextField
              InputProps={{
                readOnly: true,
              }}
              value={maThucTapSinh}
              name="maThucTapSinh"
              required
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Mã thực tập sinh"
              fullWidth
              variant="outlined"
            />
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
              <DatePicker
                value={formatDate(ngayNhapHoc)}
                name="ngayNhapHoc"
                sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                slotProps={{
                  textField: {
                    size: "small",
                    variant: "outlined",
                  },
                }}
                label="Ngày nhập học"
              />
            </LocalizationProvider>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  value={ho}
                  name="ho"
                  variant="outlined"
                  required
                  sx={{ margin: "4px", marginTop: "12px" }}
                  size="small"
                  label="Họ"
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  value={tenDem}
                  name="tenDem"
                  variant="outlined"
                  required
                  sx={{ margin: "2px", marginTop: "12px" }}
                  size="small"
                  label="Tên đệm"
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  value={ten}
                  name="ten"
                  variant="outlined"
                  required
                  sx={{ margin: "2px", marginTop: "12px" }}
                  size="small"
                  label="Tên"
                  fullWidth
                />
              </Grid>
            </Grid>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
              <DatePicker
                name="ngaySinh"
                value={formatDate(ngaySinh)}
                sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                slotProps={{
                  textField: {
                    size: "small",
                    variant: "outlined",
                  },
                }}
                label="Ngày sinh"
              />
            </LocalizationProvider>
            <Box sx={{ margin: "4px", marginTop: "12px", display: "flex", flexDirection: "row" }}>
              <FormLabel sx={{ margin: "10px 10px 0 6px" }}>Giới tính</FormLabel>
              <RadioGroup
                row
                name="gioiTinh"
                value={gioiTinh}
                onChange={(event) => handleChange(event, "gioiTinh")}
                sx={{ margin: "2px 0 0 0" }}
              >
                <FormControlLabel value="1" control={<Radio size="small" />} label="Nam" />
                <FormControlLabel value="2" control={<Radio size="small" />} label="Nữ" />
              </RadioGroup>
            </Box>
            <TextField
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
                <option key={level} value={level.value}>
                  {level.label}
                </option>
              ))}
            </TextField>
            <TextField
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
                <option key={level} value={level.value}>
                  {level.label}
                </option>
              ))}
            </TextField>
            <Autocomplete
              value={maDanToc}
              name="maDanToc"
              sx={{ margin: "4px", marginTop: "12px" }}
              fullWidth
              size="small"
              options={ethnic}
              renderInput={(params) => <TextField variant="outlined" {...params} label="Dân tộc" />}
            />
            <Autocomplete
              value={tonGiao}
              name="tonGiao"
              sx={{ margin: "4px", marginTop: "12px" }}
              fullWidth
              size="small"
              options={religion}
              renderInput={(params) => (
                <TextField variant="outlined" {...params} label="Tôn giáo" />
              )}
            />
            <TextField
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
                <option key={level} value={level.value}>
                  {level.label}
                </option>
              ))}
            </TextField>
            <Autocomplete
              value={maChuongTrinhThamGia}
              name="maChuongTrinhThamGia"
              sx={{ margin: "4px", marginTop: "12px" }}
              fullWidth
              size="small"
              options={["Không lựa chọn", "TTS", "CT khác"]}
              renderInput={(params) => (
                <TextField variant="outlined" {...params} label="Chương trình tham gia" />
              )}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
              <DatePicker
                name="ngayDangKy"
                value={formatDate(ngayDangKy)}
                sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                slotProps={{
                  textField: {
                    size: "small",
                    variant: "outlined",
                  },
                }}
                label="Ngày đăng ký"
              />
            </LocalizationProvider>
          </Box>

          {/* Căn cước công dân */}
          <Box
            sx={{
              padding: "16px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              marginBottom: "12px",
            }}
          >
            <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
              Căn cước công dân
            </Typography>
            <TextField
              value={soCCCD}
              name="soCCCD"
              variant="outlined"
              required
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Số CCCD"
              fullWidth
            />
            <Autocomplete
              value={noiCapCCCD}
              name="noiCapCCCD"
              sx={{ margin: "4px", marginTop: "12px" }}
              fullWidth
              size="small"
              options={office}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" label="Nơi cấp CCCD" />
              )}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
              <DatePicker
                name="ngayCapCCCD"
                value={formatDate(ngayCapCCCD)}
                sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                slotProps={{
                  textField: {
                    size: "small",
                    variant: "outlined",
                  },
                }}
                label="Ngày cấp"
              />
            </LocalizationProvider>
          </Box>

          {/* Hộ chiếu */}
          <Box
            sx={{
              padding: "16px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              marginBottom: "12px",
            }}
          >
            <Typography variant="h6" component="h2">
              Hộ chiếu
            </Typography>
            <TextField
              value={soHoChieu}
              name="soHoChieu"
              variant="outlined"
              required
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Số hộ chiếu"
              fullWidth
            />
            <Autocomplete
              value={noiCapHoChieu}
              name="noiCapHoChieu"
              sx={{ margin: "4px", marginTop: "12px" }}
              fullWidth
              size="small"
              options={office}
              renderInput={(params) => (
                <TextField variant="outlined" {...params} label="Nơi cấp hộ chiếu" />
              )}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
              <DatePicker
                onChange={(value) => handleChangeDate(value, "ngayCapHoChieu")}
                name="ngayCapHoChieu"
                value={formatDate(ngayCapHoChieu)}
                sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                slotProps={{
                  textField: {
                    size: "small",
                    variant: "outlined",
                  },
                }}
                label="Ngày cấp"
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
              <DatePicker
                name="ngayHetHanHoChieu"
                value={dayjs(ngayHetHanHoChieu)}
                sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                slotProps={{
                  textField: {
                    size: "small",
                    variant: "outlined",
                  },
                }}
                label="Ngày hết hạn"
              />
            </LocalizationProvider>
          </Box>
        </Grid>
        <Grid item sm={12} md={6} xs={12}>
          <Box
            sx={{
              padding: "16px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              marginBottom: "12px",
            }}
          >
            <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
              Địa chỉ
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <TextField
                InputProps={{
                  readOnly: true,
                }}
                value={nameCity}
                name="maThanhPho"
                variant="outlined"
                required
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Tỉnh / thành phố"
                fullWidth
              />
              <TextField
                InputProps={{
                  readOnly: true,
                }}
                value={nameDistrict}
                name="maQuan"
                variant="outlined"
                required
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Quận / huyện"
                fullWidth
              />
              <TextField
                InputProps={{
                  readOnly: true,
                }}
                value={nameWard}
                name="maPhuong"
                variant="outlined"
                required
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Xã phường"
                fullWidth
              />
            </Box>
            <TextField
              value={diaChi}
              name="diaChi"
              required
              variant="outlined"
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Địa chỉ"
              fullWidth
            />
            <TextField
              value={dienThoai}
              name="dienThoai"
              variant="outlined"
              required
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Điện thoại di động"
              fullWidth
            />
            <Box
              sx={{
                margin: "20px 0px",
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="b" component="b" sx={{ margin: "16px" }}>
                  Ảnh chân dung
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Avatar
                    sx={{
                      width: "120px",
                      height: "160px",
                    }}
                    variant="rounded"
                    src={"https://lotus.i.tisbase.online" + anhChanDung}
                  ></Avatar>
                </Stack>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="b" component="b" sx={{ margin: "16px" }}>
                  Ảnh toàn thân
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Avatar
                    sx={{
                      width: "120px",
                      height: "160px",
                    }}
                    variant="rounded"
                    src={"https://lotus.i.tisbase.online" + anhToanThan}
                  ></Avatar>
                </Stack>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              padding: "16px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              marginBottom: "12px",
            }}
          >
            <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
              Thông tin nộp hồ sơ
            </Typography>
            <Autocomplete
              value={muonDi}
              name="muonDi"
              multiple
              disableCloseOnSelect
              getOptionLabel={(option) => option.label}
              sx={{ margin: "4px", marginTop: "12px" }}
              fullWidth
              size="small"
              options={marketOption}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Muốn đi"
                  variant="outlined"
                  placeholder="Có thể chọn nhiều"
                  InputProps={{
                    ...params.InputProps,
                    style: { color: "#ccc" },
                  }}
                />
              )}
            />
            <Autocomplete
              value={canBoTuyenDung}
              name="canBoTuyenDung"
              sx={{ margin: "4px", marginTop: "12px" }}
              fullWidth
              size="small"
              options={employeeOption}
              renderInput={(params) => (
                <TextField variant="outlined" {...params} label="Cán bộ tuyển dụng" />
              )}
            />
            <Autocomplete
              value={ketQuaSoTuyen}
              name="ketQuaSoTuyen"
              sx={{ margin: "4px", marginTop: "12px" }}
              fullWidth
              size="small"
              options={preliminaryResults}
              renderInput={(params) => (
                <TextField {...params} label="Kết quả sơ tuyển" variant="outlined" />
              )}
            />
            <Autocomplete
              value={kinhNghiem}
              name="kinhNghiem"
              multiple
              disableCloseOnSelect
              getOptionLabel={(option) => option.label}
              sx={{ margin: "4px", marginTop: "12px" }}
              fullWidth
              size="small"
              options={professionOption}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Kinh nghiệm"
                  variant="outlined"
                  placeholder="Có thể chọn nhiều"
                  InputProps={{
                    ...params.InputProps,
                    style: { color: "#ccc" },
                  }}
                />
              )}
            />
            <Autocomplete
              value={nhomNguon}
              name="nhomNguon"
              size="small"
              sx={{ margin: "4px", marginTop: "12px" }}
              options={supplySource}
              groupBy={(option) => option.typeSupply}
              renderInput={(params) => (
                <TextField variant="outlined" {...params} label="Nhóm nguồn cung ứng" />
              )}
            />
          </Box>

          {/* Visa */}
          <Box
            sx={{
              padding: "16px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              marginBottom: "12px",
            }}
          >
            <Typography variant="h6" component="h2">
              Thông tin visa
            </Typography>
            <TextField
              value={soHoSoVisa}
              name="soHoSoVisa"
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Số hồ sơ"
              fullWidth
              variant="outlined"
            />
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
              <DatePicker
                name="ngayCapVisa"
                value={formatDate(ngayCapVisa)}
                sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                slotProps={{
                  textField: {
                    size: "small",
                    variant: "outlined",
                  },
                }}
                label="Ngày cấp"
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
              <DatePicker
                name="ngayHetHanVisa"
                value={formatDate(ngayHetHanVisa)}
                sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                slotProps={{
                  textField: {
                    size: "small",
                    variant: "outlined",
                  },
                }}
                label="Ngày hết hạn"
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
              <DatePicker
                name="ngayNhanTCLT"
                value={formatDate(ngayNhanTCLT)}
                sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                slotProps={{
                  textField: {
                    size: "small",
                    variant: "outlined",
                  },
                }}
                label="Ngày nhận tư cách lưu trú"
              />
            </LocalizationProvider>
          </Box>
        </Grid>
      </Grid>
    </Stack>
  );
}
