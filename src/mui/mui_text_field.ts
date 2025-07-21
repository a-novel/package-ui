import { SPACINGS } from "~/mui/utils";

import type { Components, Theme } from "@mui/material";

export const MuiTextField: Components<Theme>["MuiTextField"] = {
  defaultProps: {
    variant: "outlined",
  },
  styleOverrides: {
    root: {
      border: "none",
      borderColor: "transparent",
      gap: SPACINGS.SMALL,
    },
  },
};
