import React from "react";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
function Footer() {
  return (
    <>
      <footer>
        <Paper
          sx={{ marginTop: "auto", bgcolor: "#efeff0" }}
          component="footer"
          square
          variant="outlined"
        >
          <Container maxWidth="lg">
            <Box
              sx={{
                flexGrow: 1,
                justifyContent: "center",
                display: "flex",
                my: 1,
              }}
            >
              <Typography variant="caption" color="initial">
                © 2023 Smart. Todos los derechos reservados.
              </Typography>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                justifyContent: "center",
                display: "flex",
                mb: 2,
              }}
            >
              <IconButton aria-label="Facebook" sx={{ color: "primary.main" }}>
                <FacebookIcon />
              </IconButton>
              <IconButton aria-label="Twitter" sx={{ color: "primary.main" }}>
                <XIcon />
              </IconButton>
              <IconButton aria-label="Instagram" sx={{ color: "primary.main" }}>
                <InstagramIcon />
              </IconButton>
            </Box>
          </Container>
        </Paper>
      </footer>
    </>
  );
}

export default Footer;
