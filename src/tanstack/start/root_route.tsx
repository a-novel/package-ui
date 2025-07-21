import { type RootDocumentProps, RouteDocument } from "~/tanstack/start/document";
import { DefaultErrorComponent, type ErrorComponentProps } from "~/tanstack/start/error.component";
import { DefaultNotFoundComponent, type NotFoundComponentProps } from "~/tanstack/start/notFound.component";

import arimo from "@fontsource-variable/arimo?url";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, type RootRouteOptions } from "@tanstack/react-router";

export interface RouteContext {
  queryClient: QueryClient;
}

export type RootRouteProps<
  TSearchValidator = undefined,
  TRouterContext = object,
  TRouteContextFn extends RouteContext = RouteContext,
  TBeforeLoadFn extends RouteContext = RouteContext,
  TLoaderDeps extends Record<string, any> = object,
  TLoaderFn = undefined,
> = {
  componentProps: RootDocumentProps;
  errorComponentProps: ErrorComponentProps;
  notFoundComponentProps: NotFoundComponentProps;
} & Omit<
  RootRouteOptions<TSearchValidator, TRouterContext, TRouteContextFn, TBeforeLoadFn, TLoaderDeps, TLoaderFn>,
  "componentProps"
>;

export function createAgoraRootRoute<
  TSearchValidator = undefined,
  TRouterContext = object,
  TRouteContextFn extends RouteContext = RouteContext,
  TBeforeLoadFn extends RouteContext = RouteContext,
  TLoaderDeps extends Record<string, any> = object,
  TLoaderFn = undefined,
>({
  componentProps,
  errorComponentProps,
  notFoundComponentProps,
  ...options
}: RootRouteProps<TSearchValidator, TRouterContext, TRouteContextFn, TBeforeLoadFn, TLoaderDeps, TLoaderFn>) {
  const rootRoute = createRootRouteWithContext<TRouteContextFn>();

  const mergedOptions: RootRouteOptions<
    TSearchValidator,
    TRouterContext,
    TRouteContextFn,
    TBeforeLoadFn,
    TLoaderDeps,
    TLoaderFn
  > = {
    shellComponent: RouteDocument(componentProps),
    errorComponent: DefaultErrorComponent(errorComponentProps),
    notFoundComponent: DefaultNotFoundComponent(notFoundComponentProps),
    ...options,
    head: async (...args) => {
      const baseHead = (await options.head?.(...args)) ?? {};

      return {
        ...baseHead,
        meta: [
          { charSet: "utf-8" },
          { name: "viewport", content: "width=device-width, initial-scale=1" },
          ...(baseHead?.meta ?? []),
        ],
        links: [
          { rel: "icon", href: "/icon.png" },
          { href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined", rel: "stylesheet" },
          { href: arimo, rel: "stylesheet" },
          ...(baseHead?.links ?? []),
        ],
      };
    },
  };

  return rootRoute<TSearchValidator, TRouterContext, TRouteContextFn, TBeforeLoadFn, TLoaderDeps>(mergedOptions as any);
}
