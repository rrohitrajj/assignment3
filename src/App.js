import React, { useState } from 'react';
import axios from 'axios';
import InputForm from './components/InputForm';
import DataVisualization from './components/DataVisualization';
import { AppContainer, StyledPaper } from './styles/AppStyles';
import Typography from '@mui/material/Typography';

function App() {
  const [aqiPrediction, setAqiPrediction] = useState(null);
  const [aqiCategory, setAqiCategory] = useState(null);
  const [inputData, setInputData] = useState({});
  const [error, setError] = useState(null);

  const handleFormSubmit = async (inputData) => {
    // Store input data immediately for visualization
    setInputData(inputData);
    setError(null);  // Reset error message

    try {
      // Send request to backend
      const response = await axios.post("http://127.0.0.1:8000/predict_aqi", inputData);
      setAqiPrediction(response.data.aqi_prediction);
      setAqiCategory(response.data.aqi_category);
    } catch (error) {
      console.error("Error fetching prediction or classification:", error);
      setError("Failed to fetch data from backend. Please try again.");
      setAqiPrediction(null);
      setAqiCategory(null);
    }
  };

  return (
    <AppContainer>
      <Typography variant="h4" gutterBottom>
        AQI Prediction and Classification
      </Typography>
      <StyledPaper>
        <InputForm onSubmit={handleFormSubmit} />
      </StyledPaper>
      
      {error && (
        <Typography variant="body1" color="error" gutterBottom>
          {error}
        </Typography>
      )}
      
      {Object.keys(inputData).length > 0 && (
        <>
          {aqiPrediction !== null && (
            <Typography variant="h6">Predicted AQI: {aqiPrediction.toFixed(2)}</Typography>
          )}
          {aqiCategory && (
            <Typography variant="h6">Air Quality Category: {aqiCategory}</Typography>
          )}
          <DataVisualization aqiCategory={aqiCategory} inputData={inputData} />
        </>
      )}
    </AppContainer>
  );
}

export default App;
