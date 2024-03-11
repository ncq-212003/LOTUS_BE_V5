import { Box, Grid, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useState } from "react";
import { findClassroomByIdApi, listClassroomApi } from "src/contexts/api/train/api-classroom";

const formatDate = (date) => {
  return dayjs(date).format("DD/MM/YYYY");
};

export default function TabTrainIQ({ rowData }) {
  const { eClassId } = rowData;
  const [classOption, setClassOption] = useState([]);
  const [teacherOption, setTeacherOption] = useState([]);
  const [phoneNumberOption, setPhoneNumberOption] = useState([]);
  const [dateStartOption, setDateStartOption] = useState([]);
  const [dateEndOption, setDateEndOption] = useState([]);

  // fill data to field
  useEffect(() => {
    const listData = async () => {
      if (eClassId) {
        const res = await findClassroomByIdApi(eClassId);
        const { employeeFullName,
                employeeCode,
                employeeMobilePhone,
                closeDate,
                openDate ,
              } = res.data;
        setTeacherOption(employeeFullName + " | " + employeeCode);
        setPhoneNumberOption(employeeMobilePhone);
        setDateStartOption(closeDate);
        setDateEndOption(openDate );
      }
    };
    listData();
  }, [eClassId]);

  //listClassOption
  useEffect(() => {
    const listData = async () => {
      const res = await listClassroomApi();
      if (Array.isArray(res.data) && res.data.length > 0) {
        const data = res.data.map(async (x) => {
          return {
            label: `${x.className} | ${x.code}`,
            value: x.eClassId,
          };
        });
        Promise.all(data).then((classOptions) => {
          setClassOption(classOptions.find(cls=>cls.value === eClassId)?.label);
        });
      }
    };
    listData();
  }, []);

  return (
    <>
      <Stack spacing={3}>
        <Grid container spacing={2}>
          <Grid item sm={12} md={12} xs={12}>
            <Box
              sx={{
                padding: "16px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                marginBottom: "12px",
              }}
            >
              <Typography
                variant="h6"
                component="h2"
                sx={{ marginBottom: "16px" }}
                textAlign="center"
              >
                Thông tin đào tạo
              </Typography>
              {/* Danh sách lớp */}
              <Typography variant="body1" sx={{ marginBottom: "16px" }}>
                <span style={{ fontWeight: "bold" }}>Danh sách lớp:</span> {classOption}
              </Typography>

              {/* Chủ nhiệm */}
              <Typography variant="body1" sx={{ marginBottom: "16px" }}>
                <span style={{ fontWeight: "bold" }}>Chủ nhiệm:</span> {teacherOption}
              </Typography>
              {/* Số điện thoại chủ nhiệm */}
              <Typography variant="body1" sx={{ marginBottom: "16px" }}>
                <span style={{ fontWeight: "bold" }}>SĐT chủ nhiệm:</span> {phoneNumberOption}
              </Typography>
              {/* Ngày khai giảng và Ngày kết thúc */}
              <Typography variant="body1" sx={{ marginBottom: "16px" }}>
                <span style={{ fontWeight: "bold" }}>Ngày khai giảng:</span> {formatDate(dateStartOption)}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "16px" }}>
                <span style={{ fontWeight: "bold" }}>Ngày kết thúc:</span> {formatDate(dateEndOption)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}
