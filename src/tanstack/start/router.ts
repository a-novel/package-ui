import type { QueryClient } from "@tanstack/react-query";
import {
  createRouter as createTanStackRouter,
  type AnyRoute,
  type AnyRouter,
  type RouterConstructorOptions,
  type TrailingSlashOption,
  type RouterHistory,
} from "@tanstack/react-router";
import { routerWithQueryClient, type ValidateRouter } from "@tanstack/react-router-with-query";
import type { TolgeeInstance } from "@tolgee/react";

export interface AgoraRouterContext {
  tolgee: TolgeeInstance;
  queryClient: QueryClient;
}

export interface AgoraRouterProps<
  TRouteTree extends AnyRoute,
  TTrailingSlashOption extends TrailingSlashOption,
  TDefaultStructuralSharingOption extends boolean,
  TRouterHistory extends RouterHistory,
  TDehydrated extends Record<string, any>,
> {
  routeTree: TRouteTree;
  queryClient: QueryClient;
  tolgee: TolgeeInstance;
  router?: Partial<
    RouterConstructorOptions<
      TRouteTree,
      TTrailingSlashOption,
      TDefaultStructuralSharingOption,
      TRouterHistory,
      TDehydrated
    >
  >;
}

export function createAgoraRouter<
  TRouter extends AnyRouter,
  TRouteTree extends AnyRoute,
  TTrailingSlashOption extends TrailingSlashOption,
  TDefaultStructuralSharingOption extends boolean,
  TRouterHistory extends RouterHistory,
  TDehydrated extends Record<string, any>,
>(
  params: AgoraRouterProps<
    TRouteTree,
    TTrailingSlashOption,
    TDefaultStructuralSharingOption,
    TRouterHistory,
    TDehydrated
  >
) {
  const routerOptions: RouterConstructorOptions<
    TRouteTree,
    TTrailingSlashOption,
    TDefaultStructuralSharingOption,
    TRouterHistory,
    TDehydrated
  > = {
    routeTree: params.routeTree,
    context: { queryClient: params.queryClient, tolgee: params.tolgee },
    scrollRestoration: true,
    defaultPreload: "intent",
    ...params.router,
  };

  return routerWithQueryClient(createTanStackRouter(routerOptions) as ValidateRouter<TRouter>, params.queryClient);
}
