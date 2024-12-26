import React, { useState, useEffect } from "react";
import { Paper, Box, Typography, Skeleton, Divider } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import AirIcon from "@mui/icons-material/Air";
import OpacityIcon from "@mui/icons-material/Opacity";

const WeatherCard = ({ weatherData }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: 3,
        textAlign: "center",
        borderRadius: 2,
        margin: "0 auto",
      }}
    >
      {weatherData ? (
        <>
          <Box mb={2}>
            <TimeInfo />
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Location */}
          <Typography variant="h5" fontWeight="bold">
            {weatherData.name || "Unknown Location"}
          </Typography>

          {/* Weather Icon */}
          {weatherData.condition === "Clear" ? (
            <WbSunnyIcon fontSize="large" color="warning" />
          ) : weatherData.condition === "Clouds" ? (
            <CloudIcon fontSize="large" color="action" />
          ) : (
            <AcUnitIcon fontSize="large" color="primary" />
          )}

          {/* Temperature and Condition */}
          <Typography variant="h6" mt={1}>
            {weatherData.temp}°C
          </Typography>
          <Typography variant="body1">{weatherData.condition}</Typography>

          <Divider sx={{ my: 2 }} />

          {/* Feels Like */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={1}
          >
            <Typography variant="body2">Feels like:</Typography>
            <Typography variant="body2" fontWeight="bold">
              {weatherData.feels_like}°C
            </Typography>
          </Box>

          {/* Humidity */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={1}
          >
            <Typography variant="body2">
              <OpacityIcon fontSize="small" sx={{ verticalAlign: "middle" }} />{" "}
              Humidity:
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {weatherData.humidity}%
            </Typography>
          </Box>

          {/* Wind Speed */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={1}
          >
            <Typography variant="body2">
              <AirIcon fontSize="small" sx={{ verticalAlign: "middle" }} /> Wind
              Speed:
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {weatherData.wind_speed} m/s
            </Typography>
          </Box>
        </>
      ) : (
        <>
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton width="80%" />
          <Skeleton width="60%" />
        </>
      )}
    </Paper>
  );
};

const TimeInfo = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // Function to update time and date
    const updateTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const formattedDate = now.toLocaleDateString("en-US", {
        weekday: "long",
        day: "2-digit",
        month: "long",
      });
      setCurrentTime(formattedTime);
      setCurrentDate(formattedDate);
    };

    // Call the function immediately when the component renders
    updateTime();

    // Set up interval to update every minute
    const interval = setInterval(updateTime, 60000);

    // Clean up interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <Box textAlign="center">
      <Typography variant="h5" fontWeight="bold">
        {currentTime || <Skeleton width="40%" />}
      </Typography>
      <Typography variant="body1">
        {currentDate || <Skeleton width="60%" />}
      </Typography>
    </Box>
  );
};

export default WeatherCard;
