import { AgoraThemeProvider, BodyStyle } from "~/mui";
import { HeadContent, OverrideRouteMetaProvider } from "~/tanstack/start/head";
import { TolgeeRouterProvider } from "~/translations";

import type { ComponentType, ReactNode } from "react";

import { Scripts, useRouterState } from "@tanstack/react-router";
import { TolgeeProvider } from "@tolgee/react";

export interface DefaultRootComponentProps {
  wrapper?: ComponentType<{ children: ReactNode }>;
}

function PassthroughWrapper({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function DefaultRootComponent({ wrapper: Wrapper = PassthroughWrapper }: Readonly<DefaultRootComponentProps>) {
  return function Document({ children }: Readonly<{ children: ReactNode }>) {
    const matches = useRouterState({ select: (s) => s.matches });

    const tolgeeInstance = [...matches].reverse().find((match) => match.context?.tolgee)?.context?.tolgee;

    return (
      <html lang={tolgeeInstance.getLanguage() ?? tolgeeInstance.getPendingLanguage()}>
        <OverrideRouteMetaProvider>
          <head>
            <HeadContent />
          </head>
          <body style={BodyStyle}>
            <TolgeeProvider tolgee={tolgeeInstance} options={{ useSuspense: true }}>
              <AgoraThemeProvider>
                <TolgeeRouterProvider />
                <Wrapper>{children}</Wrapper>
              </AgoraThemeProvider>
            </TolgeeProvider>
            <Scripts />
          </body>
        </OverrideRouteMetaProvider>
      </html>
    );
  };
}
