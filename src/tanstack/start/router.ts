import type { QueryClient } from "@tanstack/react-query";
import { type AnyRouterWithContext } from "@tanstack/react-router";
import {
  routerWithQueryClient,
  type ValidateRouter as TanstackQueryValidateRouter,
} from "@tanstack/react-router-with-query";
import type { TolgeeInstance } from "@tolgee/react";

export interface AgoraRouterOptions {
  tolgee: TolgeeInstance;
  queryClient: QueryClient;
}

export type AgoraRouterContext = {
  tolgee: TolgeeInstance;
  queryClient: QueryClient;
};

export function routerWithAgoraContext<
  TContext extends AgoraRouterContext,
  TRouter extends AnyRouterWithContext<TContext>,
>(router: TRouter, options: AgoraRouterOptions): TRouter {
  const ogOptions = router.options;

  router.options = {
    ...router.options,
    context: {
      ...ogOptions.context,
      tolgee: options.tolgee,
    },
  };

  return routerWithQueryClient(router as TanstackQueryValidateRouter<TRouter>, options.queryClient);
}
