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

export interface AgoraRouterProps<
  TRouteTree extends AnyRoute,
  TTrailingSlashOption extends TrailingSlashOption,
  TDefaultStructuralSharingOption extends boolean,
  TRouterHistory extends RouterHistory,
  TDehydrated extends Record<string, any>,
> {
  routeTree: TRouteTree;
  queryClient: QueryClient;
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
    context: { queryClient: params.queryClient },
    scrollRestoration: true,
    defaultPreload: "intent",
    ...params.router,
  };

  return routerWithQueryClient(createTanStackRouter(routerOptions) as ValidateRouter<TRouter>, params.queryClient);
}
