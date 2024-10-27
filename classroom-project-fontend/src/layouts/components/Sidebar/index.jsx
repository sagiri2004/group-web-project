import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  Collapse,
} from "@mui/material";
import { useState } from "react";

const NAVIGATION = [
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "orders",
    title: "Orders",
    icon: <ShoppingCartIcon />,
  },
  {
    segment: "reports",
    title: "Reports",
    icon: <BarChartIcon />,
    children: [
      {
        segment: "sales",
        title: "Sales",
        icon: <DescriptionIcon />,
      },
      {
        segment: "traffic",
        title: "Traffic",
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: "integrations",
    title: "Integrations",
    icon: <LayersIcon />,
  },
];

function Sidebar() {
  const [openSegments, setOpenSegments] = useState({});
  const [isSelected, setIsSelected] = useState("");

  const handleOpen = (nav) => {
    if (nav?.children && nav.children.length > 0) {
      setOpenSegments((prevOpenSegments) => ({
        ...prevOpenSegments,
        [nav.segment]: !prevOpenSegments[nav.segment],
      }));

      if (isSelected === nav.segment) {
        setIsSelected("");
      } else {
        setIsSelected(nav.segment);
      }
    } else {
      console.log(nav.segment);
    }
  };

  return (
    <List
      sx={{
        borderRight: "1px solid",
        borderColor: "primary.dark",
        width: "64px",
      }}
    >
      {NAVIGATION.map((nav) => (
        <Box key={nav.segment}>
          <ListItemButton
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              height: "64px",
            }}
            selected={isSelected === nav.segment}
            onClick={() => handleOpen(nav)}
          >
            <ListItemIcon
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {nav.icon}
            </ListItemIcon>
          </ListItemButton>
          {nav.children && (
            <Collapse
              in={openSegments[nav.segment]}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {nav.children.map((child) => (
                  <ListItemButton
                    key={child.segment}
                    sx={{
                      borderLeft: "1px solid",
                      borderColor: "primary.dark",
                    }}
                  >
                    <ListItemIcon>{child.icon}</ListItemIcon>
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          )}
        </Box>
      ))}
    </List>
  );
}

export default Sidebar;
