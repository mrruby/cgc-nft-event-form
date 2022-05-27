import React, { useState, useEffect } from "react";
import {
  Button,
  Paper,
  TextField,
  Stack,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useLocation } from "react-router-dom";

function Form() {
  const [textValue, setTextValue] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [date, setDate] = useState(new Date());
  const [projects, setProjects] = useState([]);
  const {
    state: { projects: propsProsects },
  } = useLocation();

  useEffect(() => {
    setProjects(propsProsects);
  }, [propsProsects]);

  const onTextChange = (e) => setTextValue(e.target.value);
  const onProjectChange = (e) => setSelectedProject(e.target.value);
  const handleSubmit = () => console.log(textValue);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Box sx={{ width: 1 / 4 }}>
        <Paper>
          <Stack spacing={2}>
            <h2>Add event</h2>

            <FormControl>
              <InputLabel id="demo-simple-select-label">Project</InputLabel>
              <Select
                value={selectedProject}
                label="Select project"
                inputProps={{
                  id: "select-native",
                }}
                native
                onChange={onProjectChange}
              >
                {projects.map((el) => (
                  <option key={el.id} value={el.id}>
                    {el.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date"
                value={date}
                onChange={(newValue) => {
                  console.log(newValue);
                  setDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <TextField
              onChange={onTextChange}
              value={textValue}
              label={"Event description"} //optional
              id="outlined-multiline-static"
              multiline
              rows={4}
              defaultValue="Default Value"
            />
            <Button onClick={handleSubmit}>Submit</Button>
          </Stack>
        </Paper>
      </Box>
    </Grid>
  );
}

export default Form;
