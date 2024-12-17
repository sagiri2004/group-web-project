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
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate();

  const handleJoinNow = () => {
    navigate("/login"); // Chuyển về trang login
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#F4F4F9", paddingY: 4 }}>
      {/* Header với Logo và Tên Dự Án */}
      <Container maxWidth="lg" sx={{ mb: 4 }}>
        <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
          <Avatar
            src="https://via.placeholder.com/100" // Thay logo phù hợp
            alt="Logo"
            sx={{ width: 60, height: 60 }}
          />
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333" }}>
            Dự án Quản Lý Lớp Học
          </Typography>
        </Box>
      </Container>

      {/* Nội dung Chính */}
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          {/* Phần Trái */}
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
              onClick={handleJoinNow}
              sx={{ borderRadius: "30px", textTransform: "none" }}
            >
              Tham gia ngay
            </Button>
          </Grid>

          {/* Phần Phải */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                backgroundColor: "#673AB7",
                borderRadius: "20px",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src="https://via.placeholder.com/400x400" // Thay ảnh phù hợp
                alt="Teacher"
                style={{ width: "100%", maxWidth: "400px" }}
              />
            </Box>
          </Grid>
        </Grid>

        {/* Tính Năng Nổi Bật */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Tính năng nổi bật
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {[
              { title: "Cung cấp tài nguyên cho học sinh", icon: "📚" },
              { title: "Khai thác học liệu", icon: "🔍" },
              { title: "Giao bài tập", icon: "📝" },
              { title: "Tổ chức lớp học trực tuyến", icon: "🎥" },
              { title: "Tạo nhiệm vụ học tập", icon: "✅" },
              { title: "Chat realtime với giáo viên", icon: "💬" },
              { title: "Flashcard", icon: "🃏" },
            ].map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    borderRadius: "15px",
                    backgroundColor: "#FFFFFF",
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
        </Box>
      </Container>
    </Box>
  );
};

export default AboutPage;
