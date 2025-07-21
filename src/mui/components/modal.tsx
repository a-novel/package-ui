import { withTransparency, SPACINGS, ZIndexes } from "~/mui/utils";

import type { ReactNode } from "react";

import {
  type ModalProps as MuiModalProps,
  Modal as MuiModal,
  Box,
  type Theme,
  type Color,
  Stack,
  Typography,
} from "@mui/material";

export type ModalTheme = "primary" | "secondary" | "success" | "error" | "warning" | "info";

export interface ModalProps extends Omit<MuiModalProps, "title" | "children"> {
  children: ReactNode;
  title: ReactNode;
  icon?: ReactNode;
  color?: ModalTheme;
}

export function Modal({ title, icon, color = "primary", children, ...props }: Readonly<ModalProps>) {
  return (
    <MuiModal {...props}>
      <Box
        sx={{
          position: "absolute",
          zIndex: ZIndexes.MODAL,
          top: "50%",
          left: "50%",
          transformOrigin: "center",
          transform: "translate(-50%, -50%)",
          width: "50rem",
          maxWidth: `calc(100vw - (2 * ${SPACINGS.LARGE}))`,
          maxHeight: `calc(100vh - (2 * ${SPACINGS.LARGE}))`,
          boxSizing: "border-box",
          borderRadius: SPACINGS.MEDIUM,
          overflow: "auto",
          borderColor: (theme) => getModalColor(color, theme)[200],
          borderWidth: "thin",
          borderStyle: "solid",
          boxShadow: (theme) => `0 calc(1/3 * 1em) 0 0 ${getModalColor(color, theme)[200]}`,
          outline: "none",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          padding={SPACINGS.MEDIUM}
          gap={SPACINGS.SMALL}
          sx={{
            backgroundColor: (theme) => withTransparency(getModalColor(color, theme)[300], 75),
          }}
        >
          <Typography variant="h6" padding={0} margin={0}>
            {icon}
          </Typography>
          <Typography variant="h6" padding={0} margin={0}>
            {title}
          </Typography>
        </Stack>
        <Box
          sx={{
            padding: SPACINGS.MEDIUM,
            backgroundColor: (theme) => withTransparency(theme.palette.background.default, 75),
          }}
        >
          {children}
        </Box>
      </Box>
    </MuiModal>
  );
}

function getModalColor(color: ModalTheme, theme: Theme): Color {
  switch (color) {
    case "primary":
      return theme.palette.primary as unknown as Color;
    case "secondary":
      return theme.palette.secondary as unknown as Color;
    case "success":
      return theme.palette.success as unknown as Color;
    case "error":
      return theme.palette.error as unknown as Color;
    case "warning":
      return theme.palette.warning as unknown as Color;
    case "info":
      return theme.palette.info as unknown as Color;
    default:
      return theme.palette.primary as unknown as Color;
  }
}
