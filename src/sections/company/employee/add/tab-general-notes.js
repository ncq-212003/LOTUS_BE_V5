import { Grid, Stack, TextField } from "@mui/material";
import { useApp } from "src/hooks/use-app";
import { HANDLERS_EMPLOYEE } from "src/contexts/reducer/company/reducer-employee";

export default function TabGeneralNotes() {
  const tab = "generalNotes";
  const [state, dispatch] = useApp();
  const { employee } = state;
  const { generalNotes } = employee;
  const { description } = generalNotes;

  const handleChange = (event, fieldName) => {
    const newValue = event.target.value;
    dispatch({
      type: HANDLERS_EMPLOYEE.SET_INPUT_EMPLOYEES,
      payload: { tab, fieldName, newValue },
    });
  };

  return (
    <>
      <Stack spacing={3}>
        <Grid container spacing={2}>
          <Grid item sm={12} md={12} xs={12}>
            <TextField
              onChange={(event) => handleChange(event, "description")}
              value={description}
              name="description"
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
