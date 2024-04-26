import {
  Autocomplete,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ErrorIcon from "@mui/icons-material/Error";
import DangerousIcon from "@mui/icons-material/Dangerous";
import HelpIcon from "@mui/icons-material/Help";
import Stack from "@mui/material/Stack";

interface Drug {
  label: string;
  availability: number;
}

const drugs: Drug[] = [
  { label: "Burana", availability: 0 },
  { label: "Histec", availability: 1 },
  { label: "Ozempic", availability: 2 },
  { label: "Panadol", availability: 0 },
  { label: "Sirdalud", availability: 2 },
];

const AvailabilityIcon = ({ availability }: { availability: number }) => {
  switch (availability) {
    case 0:
      return (
        <Stack
          marginBottom={"25px"}
          direction="row"
          alignItems="center"
          gap={1}
        >
          <ThumbUpAltIcon color="success" />
          <Typography variant="h5">Steady Demand</Typography>
        </Stack>
      );
    case 1:
      return (
        <Stack
          marginBottom={"25px"}
          direction="row"
          alignItems="center"
          gap={1}
        >
          <ErrorIcon color="warning" />
          <Typography variant="h5">Moderate Demand</Typography>
        </Stack>
      );
    case 2:
      return (
        <Stack
          marginBottom={"25px"}
          direction="row"
          alignItems="center"
          gap={1}
        >
          <DangerousIcon color="error" />
          <Typography variant="h5">High Demand</Typography>
        </Stack>
      );
    default:
      return (
        <Stack
          marginBottom={"25px"}
          direction="row"
          alignItems="center"
          gap={1}
        >
          <HelpIcon color="info" />
          <Typography variant="h5">Unknown Demand</Typography>
        </Stack>
      );
  }
};

const App = () => {
  const [selectedMed, setSelectedMed] = useState<Drug | null>();

  if (selectedMed) {
    return (
      <Grid className="container">
        <Grid item>
          <h2>Medicine name:</h2>
        </Grid>
        <Grid item>
          <Typography variant="h5">{selectedMed.label}</Typography>
        </Grid>
        <Grid item>
          <h2>Availability:</h2>
        </Grid>
        <Grid item>
          <AvailabilityIcon availability={selectedMed.availability} />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setSelectedMed(null)}
            startIcon={<ArrowBackIosNewIcon />}
          >
            Back to search
          </Button>
        </Grid>
      </Grid>
    );
  }
  return (
    <Grid className="container">
      <Grid item>
        <h1>Medicine search</h1>
      </Grid>
      <Grid item>
        <Autocomplete
          id="combo-box"
          sx={{
            backgroundColor: "#FFFFFF",
          }}
          onChange={(_, newValue) => {
            setSelectedMed(newValue);
          }}
          options={drugs}
          renderInput={(params) => (
            <TextField placeholder="Enter medicine name" {...params} />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default App;
