import { MaterialSymbol, StatusPage } from "~/mui/components";
import { useClientTag } from "~/tanstack/start/head_tags";
import { useTolgeeNs } from "~/translations";

import { Typography } from "@mui/material";
import { T, useTolgee } from "@tolgee/react";

export interface DefaultNotFoundComponentProps {
  ns?: string;
  metadata: {
    titleKey: string;
  };
  page: {
    titleKey: string;
    contentKey: string;
  };
}

export function DefaultNotFoundComponent(preset: Readonly<DefaultNotFoundComponentProps>) {
  return function NotFoundComponent() {
    const { t } = useTolgee();

    useTolgeeNs(preset.ns);
    useClientTag(() => [{ title: t(preset.metadata.titleKey, { ns: preset.ns }) }], [t]);

    return (
      <StatusPage color="warning" icon={<MaterialSymbol icon="broken_image" />}>
        <Typography variant="h4" component="h1" color="warning" textAlign="center">
          <T keyName={preset.page.titleKey} ns={preset.ns} />
        </Typography>
        <Typography textAlign="center">
          <T keyName={preset.page.contentKey} ns={preset.ns} />
        </Typography>
      </StatusPage>
    );
  };
}
