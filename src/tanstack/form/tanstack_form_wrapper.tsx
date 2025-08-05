import { ErrorBox } from "~/mui/components";
import { SPACINGS } from "~/mui/utils";

import type { ReactNode } from "react";

import { Button, type ButtonProps, Stack, type StackProps } from "@mui/material";
import { type ReactFormExtendedApi, useStore } from "@tanstack/react-form";

export interface TanstackFormWrapperProps extends Partial<StackProps> {
  form: ReactFormExtendedApi<any, any, any, any, any, any, any, any, any, any, any, any>;
  submitButton: ReactNode | ((submitting: boolean) => ReactNode);
  submitButtonProps?: Partial<ButtonProps>;
  footer?: ReactNode;
}

export const TanstackFormWrapper = ({
  form,
  children,
  footer,
  submitButton,
  submitButtonProps,
  ...props
}: TanstackFormWrapperProps) => {
  const submitError = useStore(form.store, (state) => state.errorMap.onSubmit);
  const isSubmitting = useStore(form.store, (state) => state.isSubmitting);
  const submitButtonSX = submitButtonProps?.sx ?? {};

  return (
    <Stack direction="column" alignItems="stretch" boxSizing="border-box" spacing={SPACINGS.LARGE} {...props}>
      <Stack
        component="form"
        direction="column"
        alignItems="stretch"
        boxSizing="border-box"
        spacing={SPACINGS.MEDIUM}
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit().catch(console.error);
        }}
      >
        {children}

        <div style={{ height: SPACINGS.MEDIUM }} />

        <Button
          color="primary"
          type="submit"
          {...submitButtonProps}
          sx={[{ padding: SPACINGS.MEDIUM }, ...(Array.isArray(submitButtonSX) ? submitButtonSX : [submitButtonSX])]}
          disabled={submitButtonProps?.disabled ?? isSubmitting}
        >
          {typeof submitButton === "function" ? submitButton(isSubmitting) : submitButton}
        </Button>
      </Stack>

      {footer}

      <ErrorBox error={submitError} />
    </Stack>
  );
};
