import { SPACINGS } from "~/mui/utils";
import type { LangMetadata } from "~/translations";

import { MenuItem, Select, type SelectProps, Stack } from "@mui/material";

export interface LangSelectorProps<Langs extends readonly string[] = readonly string[]>
  extends Omit<SelectProps, "value" | "renderValue" | "children" | "onChange"> {
  langs: Record<Langs[number], LangMetadata>;
  selectedLang: Langs[number] | undefined;
  onChange: (lang: Langs[number]) => void;
}

export function LangSelector<Langs extends readonly string[] = readonly string[]>({
  langs,
  selectedLang,
  onChange,
  fullWidth,
  ...props
}: Readonly<LangSelectorProps<Langs>>) {
  if (!selectedLang) {
    return null;
  }

  const currentLang = langs[selectedLang];

  return (
    <Select
      fullWidth={fullWidth}
      value={selectedLang}
      onChange={(e) => onChange(e.target.value as Langs[number])}
      renderValue={() => (
        <Stack direction="row" alignItems="center" gap={SPACINGS.MEDIUM} fontSize="1rem">
          <img
            loading="lazy"
            width="20"
            srcSet={`https://flagcdn.com/w40/${currentLang.flag}.png 2x`}
            src={`https://flagcdn.com/w40/${currentLang.flag}.png`}
            alt={currentLang.label}
          />
          {fullWidth ? currentLang?.label : currentLang?.shortLabel}
        </Stack>
      )}
      {...props}
      inputProps={{ IconComponent: () => null, ...props.inputProps }}
    >
      {Object.keys(langs).map((lang: Langs[number]) => (
        <MenuItem key={lang} value={lang} sx={{ "& > img": { flexShrink: 0 } }}>
          <img
            loading="lazy"
            width="20"
            srcSet={`https://flagcdn.com/w40/${langs[lang].flag}.png 2x`}
            src={`https://flagcdn.com/w40/${langs[lang].flag}.png`}
            alt={langs[lang].label}
          />
          {langs[lang].label}
        </MenuItem>
      ))}
    </Select>
  );
}
