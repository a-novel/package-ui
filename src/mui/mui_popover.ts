import { ZIndexes, SPACINGS, withTransparency } from "~/mui/utils";

import { buttonListItemVariant } from "./mui_button";
import { palette as basePalette } from "./palette";

import type { Components, Theme } from "@mui/material";

export const MuiPopover: Components<Theme>["MuiPopover"] = {
  styleOverrides: {
    root: {
      ".MuiPopover-paper": {
        backgroundColor: withTransparency(basePalette.grey![50]!, 66),
        backdropFilter: "saturate(75%) blur(0.33rem)",
        zIndex: ZIndexes.POPOVER,
        padding: SPACINGS.SMALL,
        borderRadius: SPACINGS.SMALL,
        "& > .MuiList-root": {
          display: "flex",
          flexDirection: "column",
          gap: SPACINGS.SMALL,
          padding: 0,
          "& > .MuiButtonBase-root": buttonListItemVariant(basePalette, "info").style,
        },
      },
    },
  },
};
