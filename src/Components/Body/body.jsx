import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import Vehiculo from "../Vehiculos/vehiculos";
import Reportes from "../Reportes/reportes";
import PlaylistAddCircleIcon from "@mui/icons-material/PlaylistAddCircle";
import AssessmentIcon from "@mui/icons-material/Assessment";
const DashboardContent = () => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h4">Dashboard</Typography>
    <Typography>
      Aqui podria poner un dashboard con graficos usando chars js, pero el
      requerimiento no lo necesita
    </Typography>
  </Box>
);

const NAVIGATION = [
  {
    kind: "header",
    title: "Herramientas",
  },
  {
    segment: "vehiculos",
    title: "Vehículos",
    icon: <PlaylistAddCircleIcon />, // Necesitarías importar este ícono
  },
  {
    segment: "reportes",
    title: "Reportes",
    icon: <AssessmentIcon />, // Necesitarías importar este ícono
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ pathname }) {
  const renderContent = () => {
    switch (pathname) {
      case "/vehiculos":
        return <Vehiculo />;
      case "/reportes":
        return <Reportes />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <Box
      sx={{
        py: 4,
        width: "100%",
      }}
    >
      {renderContent()}
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function Search() {
  return (
    <React.Fragment>
      <Tooltip title="Search" enterDelay={1000}>
        <div>
          <IconButton
            type="button"
            aria-label="search"
            sx={{
              display: { xs: "inline", md: "none" },
            }}
          >
            <SearchIcon />
          </IconButton>
        </div>
      </Tooltip>
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        slotProps={{
          input: {
            endAdornment: (
              <IconButton type="button" aria-label="search" size="small">
                <SearchIcon />
              </IconButton>
            ),
            sx: { pr: 0.5 },
          },
        }}
        sx={{ display: { xs: "none", md: "inline-block" }, mr: 1 }}
      />
    </React.Fragment>
  );
}

function SidebarFooter({ mini }) {
  return (
    <Typography
      variant="caption"
      sx={{ m: 1, whiteSpace: "nowrap", overflow: "hidden" }}
    >
      {mini
        ? "© Smart"
        : `© ${new Date().getFullYear()} Hecho con amor por MUI y Smart`}
    </Typography>
  );
}

SidebarFooter.propTypes = {
  mini: PropTypes.bool.isRequired,
};

function Body(props) {
  const { window } = props;
  const router = useDemoRouter("/dashboard");
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout
        slots={{ toolbarActions: Search, sidebarFooter: SidebarFooter }}
      >
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

Body.propTypes = {
  window: PropTypes.func,
};

export default Body;
