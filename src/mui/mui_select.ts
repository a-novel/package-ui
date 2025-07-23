import type { Components, Theme } from "@mui/material";

export const MuiSelect: Components<Theme>["MuiSelect"] = {
  styleOverrides: {
    root: {
      fontWeight: 600,
      padding: "0.6em 1.2em",
    },
  },
};
