import { withTransparency } from "./transparency";

import type { SxProps, Theme } from "@mui/material";

export const ContainerSX: SxProps<Theme> = (theme) => ({
  backgroundColor: withTransparency(theme.palette.background.paper, 66),
  backdropFilter: "saturate(75%) blur(0.33rem)",
});
