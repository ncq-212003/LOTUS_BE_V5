import { Box, Grid, Stack, Typography, TextField, Autocomplete } from "@mui/material";
import "dayjs/locale/en-gb";
import { useApp } from "src/hooks/use-app";
import { HANDLERS_INTERN } from "src/contexts/reducer/intern/reducer-intern";

export default function TabGeneralNotes() {
  const tab = "ghiChuChung";
  const [state, dispatch] = useApp();
  const { intern } = state;
  const { ghiChuChung } = intern;
  const { ghiChu } = ghiChuChung;

  const handleChange = (event, fieldName) => {
    const newValue = event.target.value;
    dispatch({
      type: HANDLERS_INTERN.SET_INPUT_INTERN,
      payload: { tab, fieldName, newValue },
    });
  };

  return (
    <>
      <Stack spacing={3}>
        <Grid container spacing={2}>
          <Grid item sm={12} md={12} xs={12}>
            <TextField
              onChange={(event) => handleChange(event, "ghiChu")}
              value={ghiChu}
              name="ghiChu"
              multiline
              rows={4.7}
              variant="outlined"
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Ghi chú"
              fullWidth
            />
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}
