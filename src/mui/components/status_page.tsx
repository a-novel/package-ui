import { SPACINGS } from "~/mui/utils";

import type { ReactNode } from "react";

import { Stack, Typography, type TypographyProps } from "@mui/material";

export interface StatusPageProps {
  icon?: ReactNode;
  color: TypographyProps["color"];
  children: ReactNode;
  footer?: ReactNode;
}

export function StatusPage({ icon, children, footer, color }: Readonly<StatusPageProps>) {
  return (
    <Stack direction="column" alignItems="center" justifyContent="center" flexGrow={1} padding={0} gap={0}>
      <Stack
        component="main"
        direction="column"
        alignItems="center"
        justifyContent="center"
        padding={SPACINGS.LARGE}
        gap={SPACINGS.MEDIUM}
        flexGrow={1}
        position="relative"
        zIndex={2}
        textAlign="center"
        color={(theme) => theme.palette.text.primary}
      >
        {icon && (
          <Typography
            variant="h1"
            component="div"
            zIndex={-1}
            color={color}
            height="1em"
            lineHeight="1em"
            sx={{
              "& > .MuiSvgIcon-root": {
                fontSize: "inherit",
                height: "1em",
                width: "auto",
              },
            }}
          >
            {icon}
          </Typography>
        )}
        {children}
      </Stack>
      {footer && (
        <Stack
          direction="row"
          padding={SPACINGS.MEDIUM}
          gap={SPACINGS.MEDIUM}
          alignSelf="flex-start"
          width="100%"
          maxWidth="120ch"
        >
          {footer}
        </Stack>
      )}
    </Stack>
  );
}
