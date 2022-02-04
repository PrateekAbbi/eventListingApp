import React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ width: 500 }}>
      <AppBar
        position="fixed"
        color="primary"
        sx={{ top: "auto", bottom: 0, boxShadow: "none" }}
      >
        <Toolbar className="footer">
          <Typography className="cursive">
            Made with ❤️ by Event Listers.
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Footer;

/*<div className="footer">
  <div className="footer-padding"></div>
  <p>Made with ❤️ by Event Listers.</p>
</div>*/
