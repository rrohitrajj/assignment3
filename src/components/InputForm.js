import React, { useState } from 'react';
import { Slider, Button, Typography, Box } from '@mui/material';

function InputForm({ onSubmit }) {
  const [pm25, setPm25] = useState(0);
  const [pm10, setPm10] = useState(0);
  const [co, setCo] = useState(0);
  const [so2, setSo2] = useState(0);
  const [no2, setNo2] = useState(0);
  const [o3, setO3] = useState(0);

  // Color ranges for each AQI classification level
  const getColor = (value) => {
    if (value <= 50) return "#4caf50";        // Good
    if (value <= 100) return "#ffeb3b";       // Moderate
    if (value <= 200) return "#ffa726";       // Satisfactory
    if (value <= 300) return "#ff5722";       // Poor
    if (value <= 400) return "#d32f2f";       // Very Poor
    return "#b71c1c";                         // Severe
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      "PM2.5": pm25,
      "PM10": pm10,
      "CO": co,
      "SO2": so2,
      "NO2": no2,
      "O3": o3
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ mb: 2 }}>
        <Typography gutterBottom>PM2.5 (µg/m³)</Typography>
        <Slider
          value={pm25}
          onChange={(e, val) => setPm25(val)}
          min={0}
          max={500}
          sx={{
            color: getColor(pm25),  // Dynamic color based on value
          }}
        />
        <Typography>Current Value: {pm25} µg/m³</Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography gutterBottom>PM10 (µg/m³)</Typography>
        <Slider
          value={pm10}
          onChange={(e, val) => setPm10(val)}
          min={0}
          max={600}
          sx={{
            color: getColor(pm10),
          }}
        />
        <Typography>Current Value: {pm10} µg/m³</Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography gutterBottom>CO (mg/m³)</Typography>
        <Slider
          value={co}
          onChange={(e, val) => setCo(val)}
          min={0}
          max={50}
          step={0.1}
          sx={{
            color: getColor(co * 10),  // Scale CO to match AQI range
          }}
        />
        <Typography>Current Value: {co} mg/m³</Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography gutterBottom>SO2 (µg/m³)</Typography>
        <Slider
          value={so2}
          onChange={(e, val) => setSo2(val)}
          min={0}
          max={300}
          sx={{
            color: getColor(so2),
          }}
        />
        <Typography>Current Value: {so2} µg/m³</Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography gutterBottom>NO2 (µg/m³)</Typography>
        <Slider
          value={no2}
          onChange={(e, val) => setNo2(val)}
          min={0}
          max={200}
          sx={{
            color: getColor(no2),
          }}
        />
        <Typography>Current Value: {no2} µg/m³</Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography gutterBottom>O3 (µg/m³)</Typography>
        <Slider
          value={o3}
          onChange={(e, val) => setO3(val)}
          min={0}
          max={200}
          sx={{
            color: getColor(o3),
          }}
        />
        <Typography>Current Value: {o3} µg/m³</Typography>
      </Box>

      <Button variant="contained" color="primary" fullWidth type="submit" sx={{ mt: 2 }}>
        Predict AQI
      </Button>
    </form>
  );
}

export default InputForm;
