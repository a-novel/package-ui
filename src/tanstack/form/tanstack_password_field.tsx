import { MaterialSymbol } from "~/mui/components";

import { TanstackTextField, type TantstackTextFieldProps } from "./tanstack_text_field";

import { useState } from "react";

import { IconButton, type TextFieldVariants } from "@mui/material";

export const PasswordInput = <Variant extends TextFieldVariants = TextFieldVariants>({
  label,
  field,
  slotProps,
  ...props
}: Omit<TantstackTextFieldProps<Variant>, "type">) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TanstackTextField
      field={field}
      type={showPassword ? "text" : "password"}
      slotProps={{
        input: {
          endAdornment: (
            <IconButton onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? <MaterialSymbol icon="visibility_off" /> : <MaterialSymbol icon="visibility" />}
            </IconButton>
          ),
        },
        ...slotProps,
      }}
      label={
        label ? (
          <>
            <MaterialSymbol icon="password" />
            {label}
          </>
        ) : null
      }
      {...props}
    />
  );
};
