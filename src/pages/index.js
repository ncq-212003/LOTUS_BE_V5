import React, { useState, useEffect, useContext } from "react";
import Head from "next/head";
import { subDays, subHours } from "date-fns";
import {
	Box,
	Container,
	Unstable_Grid2 as Grid,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OverviewTTS } from "src/sections/overview/overview-tts";
import { OverviewLatestTTS } from "src/sections/overview/overview-latest-tts";
import { OverviewLatestDHS } from "src/sections/overview/overview-latest-dhs";
import { OverviewOrder } from "src/sections/overview/overview-order";
import { OverviewDiemDanh } from "src/sections/overview/overview-doanhthu";
import { OverviewProfile } from "src/sections/overview/overview-profile";
import { OverviewDHS } from "src/sections/overview/overview-dhs";
import { OverviewFinance } from "src/sections/overview/overview-finance";
import { OverviewCongno } from "src/sections/overview/overview-congno";
import { OverviewLichChung } from "src/sections/overview/overview-lichchung";
import { OverviewNghiepDoan } from "src/sections/overview/overview-nghiepdoan";
import { OverviewKhoanChi } from "src/sections/overview/overview-khoanchi";
import { OverviewKhieuNai } from "src/sections/overview/overview-khieunai";
import { OverviewThongBao } from "src/sections/overview/overview-thongbao";
import { OverviewKhoanThu } from "src/sections/overview/overview-khoanthu";

const now = new Date();

const Page = () => {
	return (
		<>
			<Head>
				<title>Tổng quan | Lotus</title>
			</Head>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					py: 8,
					backgroundColor: '$primary-color'
				}}
			>
				<Container maxWidth="xl">
					<Grid container spacing={3}>
						<Grid xs={12} sm={6} lg={3}>
							<OverviewTTS difference={12} positive sx={{ height: "100%" }} value="5.000" />
						</Grid>
						<Grid xs={12} sm={6} lg={3}>
							<OverviewDHS difference={16} positive={false} sx={{ height: "100%" }} value="4.000" />
						</Grid>
						<Grid xs={12} sm={6} lg={3}>
							<OverviewProfile sx={{ height: "100%" }} value="1.200" />
						</Grid>
						<Grid xs={12} sm={6} lg={3}>
							<OverviewFinance sx={{ height: "100%" }} value="1.000.000.000" />
						</Grid>
						<Grid xs={12} lg={8}>
							<OverviewDiemDanh
								chartSeries={[
									{
										name: "This year",
										data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
									},
									{
										name: "Last year",
										data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13],
									},
								]}
								sx={{ height: "100%" }}
							/>
						</Grid>
						<Grid xs={12} md={6} lg={4}>
							<OverviewCongno
								chartSeries={[15, 22]}
								labels={["Thu", "Chi"]}
								sx={{ height: "100%" }}
							/>
						</Grid>
						<Grid xs={12} md={12} lg={12}>
							<OverviewLichChung
								orders={[
									{
										id: "f69f88012978187a6e12897f",
										loaiLich: "Lịch họp",
										customer: {
											name: "Trần Thị Mai",
										},
										diaDiem: "15 Nguyễn Chí Thanh, Ba Đình",
										timeStart: 1609459200000,
										timeEnd: 1609462800000,
										chiuTrachNhiem: "Nguyễn Văn An",
									},
									{
										id: "f69f88012978187a6f12897f",
										loaiLich: "Lịch tiệc",
										customer: {
											name: "Lê Văn Hùng",
										},
										diaDiem: "78 Lê Lai, Hai Bà Trưng",
										timeStart: 1622548800000,
										timeEnd: 1622552400000,
										chiuTrachNhiem: "Trần Thị Thu",
									},
									{
										id: "f69f88012978187a6012897f",
										loaiLich: "Lịch hẹn",
										customer: {
											name: "Phạm Thị Ngọc",
										},
										diaDiem: "50 Lê Thanh Nghị, Hai Bà Trưng",
										timeStart: 1635225600000,
										timeEnd: 1635229200000,
										chiuTrachNhiem: "Hoàng Văn Tuấn",
									},
									{
										id: "f69f88012978187a612897f",
										loaiLich: "Lịch công việc",
										customer: {
											name: "Nguyễn Văn Thanh",
										},
										diaDiem: "10 Huế, Hai Bà Trưng",
										timeStart: 1640995200000,
										timeEnd: 1640998800000,
										chiuTrachNhiem: "Trần Thị Lan",
									},
									{
										id: "f69f88012978187a623897f",
										loaiLich: "Lịch phỏng vấn",
										customer: {
											name: "Vũ Thị Hoa",
										},
										diaDiem: "20 Trần Phú, Ba Đình",
										timeStart: 1653672000000,
										timeEnd: 1653675600000,
										chiuTrachNhiem: "Lê Văn Dũng",
									}
								]}
								sx={{ height: "100%" }}
							/>
						</Grid>
						<Grid xs={12} md={12} lg={12}>
							<OverviewOrder
								orders={[
									{
										id: "5ece2c077e39da27658aa8a9",
										nghiepDoan: "Healthcare Erbology",
										image: "/assets/avatars/avatar-alcides-antonio.png",
										xiNghiepNhan: subHours(now, 6).getTime(),
										tenDonHang: "Healthcare Erbology",
										nganhTuyen: "Healthcare Erbology",
									},
									{
										id: "5ece2c0d16f70bff2cf86cd8",
										nghiepDoan: "Makeup Lancome Rouge",
										image: "/assets/avatars/avatar-anika-visser.png",
										xiNghiepNhan: subDays(subHours(now, 8), 2).getTime(),
										tenDonHang: "Makeup Lancome Rouge",
										nganhTuyen: "Makeup Lancome Rouge",
									},
									{
										id: "b393ce1b09c1254c3a92c827",
										nghiepDoan: "Skincare Soja CO",
										image: "/assets/avatars/avatar-cao-yu.png",
										xiNghiepNhan: subDays(subHours(now, 1), 1).getTime(),
										tenDonHang: "Skincare Soja CO",
										nganhTuyen: "Skincare Soja CO",
									},
									{
										id: "a6ede15670da63f49f752c89",
										nghiepDoan: "Makeup Lipstick",
										image: "/assets/avatars/avatar-carson-darrin.png",
										xiNghiepNhan: subDays(subHours(now, 3), 3).getTime(),
										tenDonHang: "Makeup Lipstick",
										nganhTuyen: "Makeup Lipstick",
									},
									{
										id: "bcad5524fe3a2f8f8620ceda",
										nghiepDoan: "Healthcare Ritual",
										image: "/assets/avatars/avatar-chinasa-neo.png",
										xiNghiepNhan: subDays(subHours(now, 5), 6).getTime(),
										tenDonHang: "Healthcare Ritual",
										nganhTuyen: "Healthcare Ritual",
									},
								]}
								sx={{ height: "100%" }}
							/>
						</Grid>
						<Grid xs={12} md={12} lg={12}>
							<OverviewLatestTTS
								orders={[
									{
										id: "f69f88012978187a6c12897f",
										ref: "DEV1049",
										amount: 30.5,
										customer: {
											name: "Ekaterina Tankova",
										},
										createdAt: 1555016400000,
										status: "pending",
										image: "/assets/avatars/avatar-cao-yu.png",
									},
									{
										id: "9eaa1c7dd4433f413c308ce2",
										ref: "DEV1048",
										amount: 25.1,
										customer: {
											name: "Cao Yu",
										},
										createdAt: 1555016400000,
										status: "delivered",
										image: "/assets/avatars/avatar-carson-darrin.png",
									},
									{
										id: "01a5230c811bd04996ce7c13",
										ref: "DEV1047",
										amount: 10.99,
										customer: {
											name: "Alexa Richardson",
										},
										createdAt: 1554930000000,
										status: "refunded",
										image: "/assets/avatars/avatar-alcides-antonio.png",
									},
									{
										id: "1f4e1bd0a87cea23cdb83d18",
										ref: "DEV1046",
										amount: 96.43,
										customer: {
											name: "Anje Keizer",
										},
										createdAt: 1554757200000,
										status: "pending",
										image: "/assets/avatars/avatar-anika-visser.png",
									},
									{
										id: "9f974f239d29ede969367103",
										ref: "DEV1045",
										amount: 32.54,
										customer: {
											name: "Clarke Gillebert",
										},
										createdAt: 1554670800000,
										status: "delivered",
										image: "/assets/avatars/avatar-chinasa-neo.png",
									},
									{
										id: "ffc83c1560ec2f66a1c05596",
										ref: "DEV1044",
										amount: 16.76,
										customer: {
											name: "Adam Denisov",
										},
										createdAt: 1554670800000,
										status: "delivered",
										image: "/assets/avatars/avatar-cao-yu.png",
									},
								]}
								sx={{ height: "100%" }}
							/>
						</Grid>
						<Grid xs={12} md={12} lg={12}>
							<OverviewLatestDHS
								orders={[
									{
										id: "f69f88012978187a6c12897f",
										ref: "DEV1049",
										amount: 30.5,
										customer: {
											name: "Ekaterina Tankova",
										},
										createdAt: 1555016400000,
										status: "pending",
										image: "/assets/avatars/avatar-cao-yu.png",
									},
									{
										id: "9eaa1c7dd4433f413c308ce2",
										ref: "DEV1048",
										amount: 25.1,
										customer: {
											name: "Cao Yu",
										},
										createdAt: 1555016400000,
										status: "delivered",
										image: "/assets/avatars/avatar-carson-darrin.png",
									},
									{
										id: "01a5230c811bd04996ce7c13",
										ref: "DEV1047",
										amount: 10.99,
										customer: {
											name: "Alexa Richardson",
										},
										createdAt: 1554930000000,
										status: "refunded",
										image: "/assets/avatars/avatar-alcides-antonio.png",
									},
									{
										id: "1f4e1bd0a87cea23cdb83d18",
										ref: "DEV1046",
										amount: 96.43,
										customer: {
											name: "Anje Keizer",
										},
										createdAt: 1554757200000,
										status: "pending",
										image: "/assets/avatars/avatar-anika-visser.png",
									},
									{
										id: "9f974f239d29ede969367103",
										ref: "DEV1045",
										amount: 32.54,
										customer: {
											name: "Clarke Gillebert",
										},
										createdAt: 1554670800000,
										status: "delivered",
										image: "/assets/avatars/avatar-chinasa-neo.png",
									},
									{
										id: "ffc83c1560ec2f66a1c05596",
										ref: "DEV1044",
										amount: 16.76,
										customer: {
											name: "Adam Denisov",
										},
										createdAt: 1554670800000,
										status: "delivered",
										image: "/assets/avatars/avatar-cao-yu.png",
									},
								]}
								sx={{ height: "100%" }}
							/>
						</Grid>
						<Grid xs={12} md={12} lg={12}>
							<OverviewNghiepDoan
								orders={[
									{
										id: "f69f88012978187a6c12897f",
										tenNghiepDoan: "Nghiệp đoàn UVW",
										tinhTrang: "Được cấp phép",
										diaChi: "Địa chỉ ABC",
										nguoiDaiDien: "Người đại diện ABC",
										createdAt: 1555016400000,
									},
									{
										id: "f69f880129781a7a6c12897f",
										tenNghiepDoan: "Nghiệp đoàn XYV",
										tinhTrang: "Được cấp phép",
										diaChi: "Địa chỉ ABC",
										nguoiDaiDien: "Người đại diện JNOL",
										createdAt: 1555016400000,
									},
								]}
								sx={{ height: "100%" }}
							/>
						</Grid>
						<Grid xs={12} md={6} lg={6}>
							<OverviewKhoanThu
								orders={[
									{
										id: "f69f88012978187a6c12897f",
										loai: "Thu",
										name: "Nguyen Anh Tu",
										dienthoai: "0983748923",
										tongTien: "1.000.000",
										Tkthanhtoan: "VCB",
										createdAt: 1555016400000,
									},
									{
										id: "f69f88012978187a6c128s7f",
										loai: "Chi",
										name: "Nguyen Chinh Nghia",
										dienthoai: "0983748923",
										tongTien: "1.000.000",
										Tkthanhtoan: "MB",
										createdAt: 1555016400000,
									},
								]}
								sx={{ height: "100%" }}
							/>
						</Grid>
						<Grid xs={12} md={6} lg={6}>
							<OverviewKhoanChi
								orders={[
									{
										id: "f69f88012978187a6c12897f",
										loai: "Thu",
										name: "Nguyen Anh Tu",
										dienthoai: "0983748923",
										tongTien: "1.000.000",
										Tkthanhtoan: "VCB",
										createdAt: 1555016400000,
									},
									{
										id: "f69f88012978187a6c128s7f",
										loai: "Chi",
										name: "Nguyen Chinh Nghia",
										dienthoai: "0983748923",
										tongTien: "1.000.000",
										Tkthanhtoan: "MB",
										createdAt: 1555016400000,
									},
								]}
								sx={{ height: "100%" }}
							/>
						</Grid>
						<Grid xs={12} md={12} lg={12}>
							<OverviewKhieuNai
								orders={[
									{
										id: "f69f88012978187a6c12897f",
										nghiepDoan: "Doanh nghiệp A",
										loiPhatSinh: "Trốn việc nhiều lần",
										congTy: "Công ty Kouyu kogyo",
										createdAt: 1555016400000,
									},
									{
										id: "f69f88012978187a6c128s7f",
										nghiepDoan: "Doanh nghiệp B",
										loiPhatSinh: "Đánh nhau",
										congTy: "Cty Makoto & Cty Bell Wood",
										createdAt: 1555016400000,
									},
								]}
								sx={{ height: "100%" }}
							/>
						</Grid>
						<Grid xs={12} md={12} lg={12}>
							<OverviewThongBao
								orders={[
									{
										id: "f69f88012978187a6c12897f",
										noiDung: "Thông báo ABC",
										createdAt: 1555016400000,
									},
									{
										id: "f69f88012978187a6c128s7f",
										noiDung: "Thông báo DLK",
										createdAt: 1555016400000,
									},
								]}
								sx={{ height: "100%" }}
							/>
						</Grid>
					</Grid>
				</Container>
			</Box>
		</>
	);
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;