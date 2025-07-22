import type { QueryClient } from "@tanstack/react-query";
import { type AnyRouter } from "@tanstack/react-router";
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

export type ValidateRouter<TRouter extends AnyRouter> =
  NonNullable<TRouter["options"]["context"]> extends AgoraRouterContext ? TRouter : never;

export function routerWithAgoraContext<TRouter extends AnyRouter>(
  router: ValidateRouter<TRouter>,
  options: AgoraRouterOptions
): TRouter {
  const ogOptions = router.options;

  router.options = {
    ...router.options,
    context: {
      ...ogOptions.context,
      tolgee: options.tolgee,
    },
  };

  return routerWithQueryClient(router as unknown as TanstackQueryValidateRouter<TRouter>, options.queryClient);
}
