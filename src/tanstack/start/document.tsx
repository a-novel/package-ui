import { AgoraThemeProvider, BodyStyle } from "~/mui";
import { ClientTagsProvider, HeadContent } from "~/tanstack/start/head";
import { TolgeeRouterProvider } from "~/translations";

import type { ComponentType, ReactNode } from "react";

import { Scripts } from "@tanstack/react-router";
import { type TolgeeInstance, TolgeeProvider } from "@tolgee/react";

export interface RootDocumentProps {
  tolgee: TolgeeInstance;
  wrapper?: ComponentType<{ children: ReactNode }>;
}

function PassthroughWrapper({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function RouteDocument({ tolgee, wrapper: Wrapper = PassthroughWrapper }: Readonly<RootDocumentProps>) {
  return function Document({ children }: Readonly<{ children: ReactNode }>) {
    return (
      <html lang={tolgee.getLanguage() ?? tolgee.getPendingLanguage()}>
        <ClientTagsProvider>
          <head>
            <title>...</title>
            <HeadContent />
          </head>
          <body style={BodyStyle}>
            <TolgeeProvider tolgee={tolgee} options={{ useSuspense: true }}>
              <AgoraThemeProvider>
                <TolgeeRouterProvider />
                <Wrapper>{children}</Wrapper>
              </AgoraThemeProvider>
            </TolgeeProvider>
            <Scripts />
          </body>
        </ClientTagsProvider>
      </html>
    );
  };
}
