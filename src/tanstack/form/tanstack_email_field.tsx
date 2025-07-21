import { ReactComponent as GearLoader } from "~/assets/icons/spinners/gear.svg";

import { MaterialSymbol } from "~/mui/components";

import { TanstackTextField, type TantstackTextFieldProps } from "./tanstack_text_field";

import { IconButton, type TextFieldVariants } from "@mui/material";
import { useStore } from "@tanstack/react-form";

export const EmailInput = <Variant extends TextFieldVariants = TextFieldVariants>({
  label,
  field,
  slotProps,
  ...props
}: TantstackTextFieldProps<Variant>) => {
  const isValidating = useStore(field.store, (state) => state.meta.isValidating);

  return (
    <TanstackTextField
      field={field}
      type="email"
      slotProps={{
        input: {
          endAdornment: isValidating ? (
            <IconButton sx={{ pointerEvents: "none" }}>
              <GearLoader />
            </IconButton>
          ) : undefined,
        },
        ...slotProps,
      }}
      label={
        label ? (
          <>
            <MaterialSymbol icon="mail" />
            {label}
          </>
        ) : null
      }
      {...props}
    />
  );
};
