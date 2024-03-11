import { Box, Grid, Stack, Typography, TextField, Autocomplete } from "@mui/material";
import "dayjs/locale/en-gb";
import { useApp } from "src/hooks/use-app";
import { HANDLERS_OVERSEAS_STUDENT } from "src/contexts/reducer/overseas-student/reducer-overseas-student";

export default function TabGeneralNotes() {
	const tab = "ghiChuChung";
	const [state, dispatch] = useApp();
	const { overseasStudent } = state;
	const { ghiChuChung } = overseasStudent;
	const { ghiChu } = ghiChuChung;

	return (
		<>
			<Stack spacing={3}>
				<Grid container
					spacing={2}>
					<Grid item
						sm={12}
						md={12}
						xs={12}>
						<Typography
							variant="body1"
							sx={{
								marginBottom: "16px"
							}}
						>
							Ghi chú 
						</Typography>
					</Grid>
				</Grid>
			</Stack>
		</>
	);
}
