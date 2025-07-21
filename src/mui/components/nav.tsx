import { ZIndexes, SPACINGS, withTransparency } from "~/mui/utils";

import { LangSelector, type LangSelectorProps } from "./lang_selector";
import { MaterialSymbol } from "./material_symbol";

import { type ElementType, type ReactNode, useLayoutEffect, useRef, useState } from "react";

import {
  AppBar,
  type AppBarProps,
  Box,
  Button,
  type ButtonProps,
  Divider,
  IconButton,
  Stack,
  type ButtonTypeMap,
} from "@mui/material";

export interface NavProps {
  active?: boolean;
  color?: "primary" | "secondary" | "error" | "success" | "info" | "warning";
  key: string;
  children: ReactNode;
}

export type NavBarProps<
  Langs extends readonly string[] = readonly string[],
  HomeButtonComponent extends ElementType = ButtonTypeMap["defaultComponent"],
> = Omit<AppBarProps, "children" | "lang"> & {
  homeButton: Omit<ButtonProps<HomeButtonComponent>, "children" | "variant"> & {
    icon: string;
  };
  lang: Pick<LangSelectorProps<Langs>, "langs" | "selectedLang" | "onChange">;
  nav?: NavProps[];
  desktopActions?: ReactNode;
  mobileActions?: ReactNode;
};

export function NavBar<Langs extends readonly string[] = readonly string[]>({
  homeButton: { icon, ...homeButtonProps },
  lang,
  nav,
  desktopActions,
  mobileActions,
  ...props
}: Readonly<NavBarProps<Langs>>) {
  const appBarRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const appBarWidth = appBarRef.current?.getBoundingClientRect().width ?? 0;
  const appBarHeight = appBarRef.current?.getBoundingClientRect().height ?? 0;

  const [showBurger, setShowBurger] = useState(false);
  const [burgerOpened, setBurgerOpened] = useState(false);

  // Automatically show the burger menu when the main menu overlaps the screen width.
  useLayoutEffect(() => {
    // Reset display to take measurements.
    if (navRef.current) {
      navRef.current.style.display = "";
    }
    if (actionsRef.current) {
      actionsRef.current.style.display = "";
    }

    // Get the rightmost edge of the nav and actions elements.
    const fartherRight = (actionsRef.current ?? navRef.current)?.getBoundingClientRect().right ?? 0;

    // If the rightmost edge is farther than the app bar width, then we need to show the burger menu,
    // and hide the nav and actions elements.
    if (fartherRight > appBarWidth) {
      setShowBurger(true);

      if (navRef.current) {
        navRef.current.style.display = "none";
      }
      if (actionsRef.current) {
        actionsRef.current.style.display = "none";
      }
    } else {
      setShowBurger(false);
      setBurgerOpened(false);
    }
  }, [appBarWidth]);

  // Disable scroll when the burger menu is opened.
  useLayoutEffect(() => {
    if (burgerOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [burgerOpened]);

  return (
    <>
      <AppBar ref={appBarRef} {...props}>
        <Stack component="nav" direction="row" alignItems="center" padding={0} gap={SPACINGS.LARGE}>
          <Button
            color="info"
            variant="outlined"
            {...homeButtonProps}
            sx={{ padding: SPACINGS.SMALL, ...homeButtonProps.sx }}
          >
            <img style={{ height: "3rem" }} src={icon} alt="application logo" />
          </Button>

          <Stack ref={navRef} direction="row" alignItems="center" padding={0} gap={SPACINGS.MEDIUM}>
            {nav?.map(({ key, active, color, ...props }) => (
              <Button
                variant="list-item"
                aria-selected={active}
                key={key}
                color={color}
                sx={{
                  paddingX: SPACINGS.LARGE,
                  paddingY: SPACINGS.MEDIUM,
                  fontSize: "1rem",
                }}
                {...props}
              />
            ))}
          </Stack>
        </Stack>

        <Stack
          ref={actionsRef}
          component="div"
          flexDirection="row"
          alignItems="center"
          padding={0}
          gap={SPACINGS.LARGE}
        >
          {desktopActions}
          <LangSelector
            MenuProps={{
              anchorOrigin: { vertical: "bottom", horizontal: "right" },
              transformOrigin: { vertical: "top", horizontal: "right" },
              marginThreshold: 0,
            }}
            {...lang}
          />
        </Stack>

        <IconButton sx={{ display: showBurger ? undefined : "none" }} onClick={() => setBurgerOpened((prev) => !prev)}>
          <MaterialSymbol icon={burgerOpened ? "close" : "menu"} />
        </IconButton>
      </AppBar>
      <Stack
        direction="column"
        alignItems="center"
        padding={SPACINGS.MEDIUM}
        gap={SPACINGS.LARGE}
        display={showBurger && burgerOpened ? undefined : "none"}
        position="fixed"
        top={`${appBarHeight}px`}
        right={0}
        bottom={0}
        zIndex={ZIndexes.POPOVER}
        overflow="auto"
        sx={{
          backgroundColor: (theme) => withTransparency(theme.palette.background.default, 66),
          backdropFilter: "blur(0.33rem)",
          "@media (max-width: 28rem)": {
            left: 0,
          },
          "@media (min-width: 28rem)": {
            width: "24rem",
          },
        }}
      >
        <LangSelector
          MenuProps={{
            anchorOrigin: { vertical: "bottom", horizontal: "center" },
            transformOrigin: { vertical: "top", horizontal: "center" },
            marginThreshold: 0,
          }}
          fullWidth
          {...lang}
        />
        {nav?.length ? (
          <>
            <Divider sx={(theme) => ({ borderColor: theme.palette.grey![100], width: "100%" })} />
            <Stack
              direction="column"
              alignItems="stretch"
              alignSelf="stretch"
              padding={0}
              gap={SPACINGS.MEDIUM}
              flexGrow={1}
            >
              {nav?.map(({ key, active, color, ...props }) => (
                <Button
                  variant="list-item"
                  aria-selected={active ?? false}
                  key={key}
                  color={color ?? "primary"}
                  sx={{
                    paddingX: SPACINGS.LARGE,
                    paddingY: SPACINGS.MEDIUM,
                    fontSize: "1rem",
                  }}
                  {...props}
                />
              ))}
            </Stack>
          </>
        ) : (
          <Box flexGrow={1} />
        )}
        {mobileActions && (
          <Stack
            direction="column"
            alignItems="stretch"
            alignSelf="stretch"
            padding={0}
            gap={SPACINGS.LARGE}
            paddingBottom={SPACINGS.MEDIUM}
            position="sticky"
            bottom={0}
            zIndex={99}
            sx={{
              "&:before": {
                position: "absolute",
                content: '""',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: "inherit",
                display: "block",
                backgroundColor: (theme) => withTransparency(theme.palette.background.default, 33),
                backdropFilter: "saturate(75%) blur(0.33rem)",
                zIndex: -1,
              },
            }}
          >
            <Divider sx={(theme) => ({ borderColor: theme.palette.grey![100], width: "100%" })} />
            {mobileActions}
          </Stack>
        )}
      </Stack>
    </>
  );
}
