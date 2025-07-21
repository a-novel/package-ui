import "@fontsource/arimo/400-italic.css";
import "@fontsource/arimo/400.css";
import "@fontsource/arimo/500-italic.css";
import "@fontsource/arimo/500.css";
import "@fontsource/arimo/600-italic.css";
import "@fontsource/arimo/600.css";
import "@fontsource/arimo/700-italic.css";
import "@fontsource/arimo/700.css";

import { MuiAppBar } from "./mui_app_bar";
import { MuiButton } from "./mui_button";
import { MuiFormHelperText } from "./mui_form_helper_text";
import { MuiInputBase } from "./mui_input_base";
import { MuiInputLabel } from "./mui_input_label";
import { MuiModal } from "./mui_modal";
import { MuiPopover } from "./mui_popover";
import { MuiTextField } from "./mui_text_field";
import { palette } from "./palette";
import { typography } from "./typography";
import { SPACINGS } from "./utils";

import type { CSSProperties, FC, ReactNode } from "react";

import { createTheme, CssBaseline, responsiveFontSizes, ThemeProvider } from "@mui/material";

export type { NeonUIButtonVariants } from "./mui_button";

let theme = createTheme({
  palette,
  spacing: SPACINGS.BASE,
  typography,
  components: {
    MuiModal,
    MuiButton,
    MuiTextField,
    MuiInputLabel,
    MuiInputBase,
    MuiFormHelperText,
    MuiPopover,
    MuiAppBar,
  },
});

theme = responsiveFontSizes(theme);

export { theme };

export const BodyStyle: CSSProperties = {
  width: "100%",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  backgroundColor: theme.palette.background.default,
};

export interface AgoraThemeProviderProps {
  children: ReactNode;
}

export const AgoraThemeProvider: FC<AgoraThemeProviderProps> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);
