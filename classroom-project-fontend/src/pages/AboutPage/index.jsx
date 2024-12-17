import React from "react";
import {
  Box,
  Button,
  Typography,
  Container,
  Grid,
  Paper,
  SvgIcon,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoIcon from "~/assets/images/logo.svg?react";

const AboutPage = () => {
  const navigate = useNavigate();

  const handleJoinNow = () => {
    navigate("/login");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #B8C5E6, #C4D0EC)",
        paddingY: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          {/* Phần Trái */}
          <Grid item xs={12} md={6}>
            {/* Logo và tên */}
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              mb={2}
            >
              <SvgIcon
                component={LogoIcon}
                inheritViewBox
                sx={{ height: "40px", width: "auto" }}
              />
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "700",
                  color: "#2D58FF",
                  fontSize: "1.5rem",
                }}
              >
                Sagiri
              </Typography>
            </Box>

            {/* Tiêu đề chính */}
            <Typography
              variant="h3"
              sx={{
                fontWeight: "800 !important",
                mb: 2,
                color: "#333333",
                fontSize: "42px !important",
                lineHeight: "60px !important",
                letterSpacing: ".1px !important",
                textAlign: "left", // Căn lề trái
              }}
            >
              Một cách hiệu quả để quản lý lớp học
            </Typography>

            {/* Nút CTA */}
            <Button
              variant="contained"
              size="large"
              onClick={handleJoinNow}
              sx={{
                borderRadius: "24px",
                backgroundColor: "#2D58FF",
                paddingX: 4,
                textTransform: "none",
                fontWeight: "bold",
                fontSize: "22px",
                mb: 4,
                height: "72px",
                minWidth: "200px",
                padding: "24px 52px",
                "&:hover": { backgroundColor: "#1E40AF" },
              }}
            >
              Tham gia ngay
            </Button>

            {/* Tính năng */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                justifyContent: "flex-start",
              }}
            >
              {[
                { title: "Cung cấp tài nguyên cho học sinh", icon: "📥" },
                { title: "Khai thác học liệu", icon: "🖥️" },
                { title: "Giao bài tập", icon: "✏️" },
                { title: "Thi trực tuyến", icon: "🗂️" },
                { title: "Tổ chức lớp học trực tuyến", icon: "💻" },
                { title: "Tạo nhiệm vụ học tập", icon: "🔮" },
              ].map((feature, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: "12px 16px",
                    borderRadius: "100px",
                    backgroundColor: "#E8EAF6", // Màu nền cho tính năng
                    width: "fit-content",
                    margin: "8px 8px 0px 0px",
                  }}
                >
                  <Typography fontSize="20px" sx={{ marginRight: "8px" }}>
                    {feature.icon}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, color: "#333", fontSize: "1rem" }}
                  >
                    {feature.title}
                  </Typography>
                </Box>
              ))}
            </Box>
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
                height: "100%",
                boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
              }}
            >
              <img
                src="https://res.cloudinary.com/dkidy104q/image/upload/v1734462915/xdnfp3igxqg7xvtwvaxr.jpg"
                alt="Elaina"
                style={{ width: "100%", maxWidth: "600px", height: "auto" }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutPage;
