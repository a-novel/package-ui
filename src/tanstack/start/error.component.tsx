import { MaterialSymbol, StatusPage } from "~/mui/components";
import { useClientTags } from "~/tanstack/start/head";
import { useTolgeeNs } from "~/translations";

import { useEffect } from "react";

import { Typography } from "@mui/material";
import { T, useTolgee } from "@tolgee/react";

export interface ErrorComponentProps {
  ns?: string;
  metadata: {
    titleKey: string;
  };
  page: {
    titleKey: string;
    contentKey: string;
  };
}

export function DefaultErrorComponent(preset: Readonly<ErrorComponentProps>) {
  return function ErrorComponent() {
    const { setTags } = useClientTags();
    const { t } = useTolgee();

    useTolgeeNs(preset.ns);

    // Override the title tag with the provided title key.
    useEffect(() => {
      setTags([{ tag: "title", children: t(preset.metadata.titleKey, { ns: preset.ns }) }]);
      return () => {
        // Cleanup: reset the title tag when the component unmounts.
        setTags([]);
      };
    }, [setTags, t]);

    return (
      <StatusPage color="error" icon={<MaterialSymbol icon="dns" />}>
        <Typography variant="h4" component="h1" color="error" textAlign="center">
          <T keyName={preset.page.titleKey} ns={preset.ns} />
        </Typography>
        <Typography textAlign="center">
          <T keyName={preset.page.contentKey} ns={preset.ns} />
        </Typography>
      </StatusPage>
    );
  };
}
