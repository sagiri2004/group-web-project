import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  CircularProgress,
  Stack,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Button,
} from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import apiClient from "~/api/apiClient";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [userData, setUserData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [flashcardsData, setFlashcardsData] = useState([]);
  const [classroomsData, setClassroomsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState("");
  const navigate = useNavigate();

  const handleNavigationFlashcard = (id) => {
    navigate(`/flashcards/${id}`);
  };

  const handleNavigationClassroom = (id) => {
    navigate(`/classroom/${id}`);
  };

  useEffect(() => {
    apiClient
      .get("/user/me")
      .then((response) => {
        const { data } = response.data;
        setUserData(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

    apiClient
      .get("/flashcard/my-flashcard-sets")
      .then((response) => {
        const { data } = response.data;
        setFlashcardsData(data);
      })
      .catch((error) => {
        console.error("Error fetching flashcards:", error);
      });

    apiClient
      .get("classroom")
      .then((response) => {
        const { data } = response.data;
        setClassroomsData(data);
      })
      .catch((error) => {
        console.error("Error fetching classrooms:", error);
      });

    const fetchWeather = async () => {
      try {
        const apiKey = "e57f3647de0e607af9e45a41f38d0a8b";
        const city = "Hanoi";
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        const data = await response.json();
        setWeatherData({
          temp: data.main.temp,
          condition: data.weather[0].main,
        });
      } catch (error) {
        console.error("Error fetching weather:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();

    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (loading || !userData) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Grid container spacing={2}>
        {/* Left Column - User Info and Weather */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              textAlign: "center",
              borderRadius: 2,
              marginBottom: 2,
            }}
          >
            <Avatar
              src={userData.avatar}
              alt={userData.name}
              sx={{ width: 60, height: 60, margin: "auto" }}
            />
            <Typography variant="h5" fontWeight="bold" mt={2}>
              Hello, {userData.name}!
            </Typography>
            <Typography variant="subtitle1">{userData.username}</Typography>
          </Paper>

          <Paper
            elevation={3}
            sx={{ padding: 3, textAlign: "center", borderRadius: 2 }}
          >
            {weatherData && (
              <>
                {weatherData.condition === "Clear" ? (
                  <WbSunnyIcon fontSize="large" color="warning" />
                ) : weatherData.condition === "Clouds" ? (
                  <CloudIcon fontSize="large" color="action" />
                ) : (
                  <AcUnitIcon fontSize="large" color="primary" />
                )}
                <Typography variant="h6" mt={1}>
                  {weatherData.temp}°C
                </Typography>
                <Typography variant="body1">{weatherData.condition}</Typography>
              </>
            )}
            <Box mt={2}>
              <Typography variant="h6">Current Time</Typography>
              <Typography variant="h5" fontWeight="bold">
                {currentTime}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Right Column - Classrooms and Flashcards */}
        <Grid item xs={12} md={8}>
          {/* Classrooms Section */}
          <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Classrooms
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />
            {classroomsData.length === 0 ? (
              <Box sx={{ textAlign: "center", padding: 2 }}>
                <Typography variant="body1" color="text.secondary">
                  You haven’t joined or created any classrooms yet.
                </Typography>
                <Button
                  variant="contained"
                  sx={{ marginTop: 2 }}
                  onClick={() =>
                    console.log("Redirect to create/join classroom")
                  }
                >
                  Create or Join a Class
                </Button>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  overflowX: "auto",
                  gap: 2,
                  "&::-webkit-scrollbar": {
                    width: "8px",
                    height: "8px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "#888",
                    borderRadius: "4px",
                  },
                  "&:hover::-webkit-scrollbar-thumb": {
                    background: "#555",
                  },
                }}
              >
                {classroomsData.map((classroom) => (
                  <Card
                    key={classroom.id}
                    sx={{
                      minWidth: "300px",
                      flex: "0 0 auto",
                    }}
                    onClick={() => handleNavigationClassroom(classroom.id)}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={classroom.imageUrl}
                      alt={classroom.name}
                    />
                    <CardContent>
                      <Typography variant="h6">{classroom.name}</Typography>
                      <Typography variant="body2">
                        {classroom.description}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}
          </Paper>

          {/* Flashcards Section */}
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Flashcards
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />
            {flashcardsData.length === 0 ? (
              <Box sx={{ textAlign: "center", padding: 2 }}>
                <Typography variant="body1" color="text.secondary">
                  You haven’t created any flashcards yet.
                </Typography>
                <Button
                  variant="contained"
                  sx={{ marginTop: 2 }}
                  onClick={() => console.log("Redirect to create flashcard")}
                >
                  Create Flashcard
                </Button>
              </Box>
            ) : (
              <Box>
                {flashcardsData.map((flashcard) => (
                  <Card
                    key={flashcard.id}
                    sx={{ marginBottom: 2 }}
                    onClick={() => handleNavigationFlashcard(flashcard.id)}
                  >
                    <CardContent>
                      <Typography variant="h6">{flashcard.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {flashcard.description}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default HomePage;
