import { SPACINGS, withTransparency } from "~/mui/utils";

import { palette as basePalette } from "./palette";

import type { Color, CSSObject, PaletteOptions } from "@mui/material";

export type ActionPaletteColor = "primary" | "secondary" | "error" | "warning" | "info" | "success" | "grey";

export const ActionBase = (color: ActionPaletteColor, palette: PaletteOptions = basePalette): CSSObject => ({
  transformOrigin: "center",
  transform: `translateY(calc(-1/3 * 1em))`,
  transition: "linear 0.15s",
  marginTop: "calc(1/6 * 1em)",
  position: "relative",
  backdropFilter: `saturate(75%) blur(calc(1/3 * 1em))`,
  borderRadius: SPACINGS.SMALL,
  zIndex: 2, // Elevate the box on the z-plane to allow for background effects.
  outline: "none",
  border: "none",
  color: palette.text!.primary,
  borderWidth: "0 0 1px 0",
  borderStyle: "solid",
  borderColor: withTransparency((palette[color] as Color)[50], 66),
  boxShadow: `${withTransparency((palette[color] as Color)[100], 75)} 0 calc(1/3 * 1em) 0 0`,
  backgroundColor: withTransparency((palette[color] as Color)[200], 75),
  "&:hover": {
    boxShadow: `${withTransparency((palette[color] as Color)[100], 75)} 0 calc(1/3 * 1em) 0 0`,
  },
  "&.Mui-disabled": {
    backgroundColor: withTransparency((palette.grey as Color)[50], 75),
    color: (palette.grey as Color)[300],
    borderWidth: 0,
    pointerEvents: "none",
    transform: "translateY(0)",
    boxShadow: "none",
  },
});

export const ActionOutline = (color: ActionPaletteColor, palette: PaletteOptions = basePalette): CSSObject => ({
  transformOrigin: "center",
  transform: `translateY(calc(-1/3 * 1em))`,
  transition: "linear 0.15s",
  marginTop: "calc(1/6 * 1em)",
  position: "relative",
  backdropFilter: `saturate(75%) blur(calc(1/3 * 1em))`,
  borderRadius: SPACINGS.SMALL,
  zIndex: 2, // Elevate the box on the z-plane to allow for background effects.
  outline: "none",
  border: "none",
  color: (palette[color] as Color)[500],
  borderWidth: "thin",
  borderStyle: "solid",
  borderColor: "currentColor",
  backgroundColor: withTransparency(palette.grey!["50"]!, 75),
  boxShadow: `${withTransparency((palette[color] as Color)[100], 75)} 0 calc(1/3 * 1em) 0 0`,
  "&.Mui-disabled": {
    backgroundColor: withTransparency((palette.grey as Color)[50], 75),
    color: (palette.grey as Color)[300],
    borderWidth: 0,
    pointerEvents: "none",
    transform: "translateY(0)",
    boxShadow: "none",
  },
});

export const ActionGradient = (color: ActionPaletteColor, palette: PaletteOptions = basePalette): CSSObject => {
  const base = ActionBase(color, palette);

  return {
    ...base,
    backgroundColor: "transparent",
    "&::before": {
      position: "absolute",
      content: '""',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: "inherit",
      display: "block",
      backgroundImage: `linear-gradient(
        45deg, 
        ${(palette[color] as Color)[100]} 0%, 
        ${(palette[color] as Color)[200]} 25%,
        ${(palette[color] as Color)["A400"]} 100%
      )`,
      boxShadow: `${withTransparency((palette[color] as Color)["A700"], 50)} 0 0 0.2rem 0 inset`,
      zIndex: -1,
      opacity: 0.75,
    },
    "&.Mui-disabled": {
      ...(base["&.Mui-disabled"] ?? {}),
      "&:before": {
        display: "none",
      },
    },
  };
};

export const ActionGlow = (color: ActionPaletteColor, palette: PaletteOptions = basePalette): CSSObject => {
  const base = ActionBase(color, palette);
  return {
    ...base,
    boxShadow: `${withTransparency((palette[color] as Color)[500], 33)} 0 0 ${SPACINGS.BASE * 4}px 0, ${base.boxShadow}`,
    "&:hover": {
      ...(base["&:hover"] ?? {}),
      boxShadow: `${withTransparency((palette[color] as Color)[500], 50)} 0 0 ${SPACINGS.BASE * 4}px 0, ${base.boxShadow}`,
    },
  };
};

export const ActionGradientGlow = (color: ActionPaletteColor, palette: PaletteOptions = basePalette): CSSObject => {
  const base = ActionGradient(color, palette);
  return {
    ...base,
    boxShadow: `${withTransparency((palette[color] as Color)[500], 33)} 0 0 ${SPACINGS.BASE * 4}px 0, ${base.boxShadow}`,
    "&:hover": {
      ...(base["&:hover"] ?? {}),
      boxShadow: `${withTransparency((palette[color] as Color)[500], 50)} 0 0 ${SPACINGS.BASE * 4}px 0, ${base.boxShadow}`,
    },
  };
};
