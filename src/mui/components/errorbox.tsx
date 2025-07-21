import { InfoBox, type InfoboxProps, MaterialSymbol } from "./index";

import { useMemo } from "react";

export interface ErrorBoxProps extends Omit<Partial<InfoboxProps>, "children"> {
  error?: any;
}

export function ErrorBox({ error, ...props }: Readonly<ErrorBoxProps>) {
  const printedError = useMemo(() => printError(error), [error]);

  if (printedError.length === 0) {
    return null;
  }

  if (printedError.length === 1) {
    return (
      <InfoBox icon={<MaterialSymbol icon="error" />} color="error" {...props}>
        {printedError}
      </InfoBox>
    );
  }

  return (
    <InfoBox icon={<MaterialSymbol icon="error" />} color="error" {...props}>
      <ul>
        {printedError.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
    </InfoBox>
  );
}

function printError(err: any): string[] {
  if (!err) return [];

  // Error is already a string, youhou.
  if (typeof err === "string") {
    return [err];
  }

  // Recursive call on all errors.
  if (Array.isArray(err)) {
    return err.flatMap((e) => printError(e));
  }

  // Best attempt to extract the message from the error.
  return [err?.message ?? err?.toString() ?? JSON.stringify(err)];
}
