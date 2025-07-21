import { SPACINGS } from "~/mui/utils";

import type { Components, Theme } from "@mui/material";

export const MuiInputLabel: Components<Theme>["MuiInputLabel"] = {
  defaultProps: {
    variant: "outlined",
  },
  styleOverrides: {
    root: {
      position: "relative",
      transform: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      flexDirection: "row",
      gap: SPACINGS.SMALL,
      lineHeight: "1.3em",
      verticalAlign: "middle",
    },
  },
};
