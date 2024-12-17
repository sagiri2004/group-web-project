import React from "react";
import {
  Box,
  Button,
  Typography,
  Container,
  Grid,
  Paper,
  Avatar,
} from "@mui/material";

const AboutPage = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Header */}
      <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
        <Grid container spacing={4} alignItems="center">
          {/* Left Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold" }}>
              Một cách hiệu quả để quản lý lớp học
            </Typography>
            <Typography variant="body1" paragraph>
              Cung cấp công cụ giảng dạy hiện đại với các tính năng như giao bài
              tập, thi trực tuyến, tổ chức lớp học, và khai thác học liệu.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ borderRadius: "30px", textTransform: "none" }}
            >
              Tham gia ngay
            </Button>
          </Grid>

          {/* Right Section */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: "relative",
                backgroundColor: "#673AB7",
                borderRadius: "20px",
                overflow: "hidden",
              }}
            >
              <img
                src="https://via.placeholder.com/400x500" // Thay ảnh phù hợp
                alt="Teacher"
                style={{ width: "100%", display: "block" }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Features Section */}
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Tính năng nổi bật
        </Typography>
        <Grid container spacing={3}>
          {[
            { title: "Cung cấp tài nguyên cho học sinh", icon: "📚" },
            { title: "Khai thác học liệu", icon: "🔍" },
            { title: "Giao bài tập", icon: "📝" },
            { title: "Tổ chức lớp học trực tuyến", icon: "🎥" },
            { title: "Tạo nhiệm vụ học tập", icon: "✅" },
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  borderRadius: "15px",
                }}
              >
                <Avatar sx={{ bgcolor: "#2196F3", color: "white" }}>
                  {feature.icon}
                </Avatar>
                <Typography variant="subtitle1">{feature.title}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutPage;
