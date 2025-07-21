import { withTransparency, SPACINGS } from "~/mui/utils";

import type { ComponentProps, ReactNode } from "react";

import { Box, type Color, Stack, Typography } from "@mui/material";

export interface InfoboxProps extends ComponentProps<typeof Stack> {
  /**
   * Status used to decorate the input message.
   */
  color: "primary" | "secondary" | "error" | "success";
  /**
   * Icon to highlight the status of the input.
   */
  icon?: ReactNode;
}

export function InfoBox({ children, color, icon, ...props }: Readonly<InfoboxProps>) {
  return (
    <Stack
      sx={{
        "& p": {
          margin: 0,
          padding: 0,
        },
        "& ul": {
          margin: 0,
          padding: "0 0 0 1rem",
        },
        "& strong": {
          color: (theme) => theme.palette.text.primary,
        },
        borderWidth: `0 0 0 ${SPACINGS.SMALL}`,
        borderStyle: "solid",
        borderColor: (theme) => (theme.palette[color] as Partial<Color>)[500],
        overflow: "hidden",
        padding: `${SPACINGS.SMALL} ${SPACINGS.MEDIUM}`,
        backgroundColor: (theme) => withTransparency((theme.palette[color] as Partial<Color>)[50]!, 33),
        backdropFilter: "saturate(75%) blur(0.33rem)",
      }}
      boxShadow={(theme) => `0 0 2px ${(theme.palette[color] as Partial<Color>)[500]}`}
      position="relative"
      borderRadius="0 0.5em 0.5em 0"
      zIndex={2}
      {...props}
    >
      <Typography variant="caption" color={color}>
        {children}
      </Typography>
      {icon && (
        <Box
          position="absolute"
          top="50%"
          right={SPACINGS.SMALL}
          component="div"
          sx={{
            color: (theme) => (theme.palette[color] as Partial<Color>)[100],
            transformOrigin: "center",
            transform: "translateY(-50%)",
            opacity: 0.4,
            userSelect: "none",
            lineHeight: "4rem",
            fontSize: "4rem",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
          zIndex={-1}
        >
          {icon}
        </Box>
      )}
    </Stack>
  );
}
