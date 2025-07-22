import arimo from "@fontsource-variable/arimo?url";
import { createRootRouteWithContext, type RootRouteOptions, type AnyContext } from "@tanstack/react-router";

export function createAgoraRootRoute<
  TSearchValidator = undefined,
  TRouterContext = object,
  TRouteContextFn extends AnyContext = AnyContext,
  TBeforeLoadFn extends AnyContext = AnyContext,
  TLoaderDeps extends Record<string, any> = object,
  TLoaderFn = undefined,
>(options: RootRouteOptions<TSearchValidator, TRouterContext, TRouteContextFn, TBeforeLoadFn, TLoaderDeps, TLoaderFn>) {
  const rootRoute = createRootRouteWithContext<TRouteContextFn>();

  const mergedOptions: RootRouteOptions<
    TSearchValidator,
    TRouterContext,
    TRouteContextFn,
    TBeforeLoadFn,
    TLoaderDeps,
    TLoaderFn
  > = {
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
