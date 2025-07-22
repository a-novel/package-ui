import { useClientTags } from "~/tanstack/start/head_tags";

import * as React from "react";

import { Asset, type RouterManagedTag, useRouter, useRouterState } from "@tanstack/react-router";

/**
 * Custom head manager that allows the router head config to be overridden through the client components.
 */
export function HeadContent() {
  const routeMeta = useRouterState({
    select: (state: any) => {
      return state.matches.map((match: any) => match.meta!).filter(Boolean);
    },
  });

  const { tags: clientTags } = useClientTags();

  // The original router tags are left untouched. The custom client tags are appended to the original config.
  const combinedTags = useTags([...routeMeta.matches, ...clientTags]);

  return combinedTags.map((tag) => <Asset {...tag} key={`tsr-meta-${JSON.stringify(tag)}`} />);
}

// TODO: https://github.com/TanStack/router/discussions/4728
//  use exposed methods if they ever become available. Otherwise, follow the original implementation to make sure we
//  don't miss any feature.
function useTags(routeMeta: any[]) {
  const router = useRouter();

  const meta: Array<RouterManagedTag> = React.useMemo(() => {
    const resultMeta: Array<RouterManagedTag> = [];
    const metaByAttribute: Record<string, true> = {};
    let title: RouterManagedTag | undefined;
    [...routeMeta].reverse().forEach((metas) => {
      [...metas].reverse().forEach((m) => {
        if (!m) return;

        if (m.title) {
          if (!title) {
            title = {
              tag: "title",
              children: m.title,
            };
          }
        } else {
          const attribute = m.name ?? m.property;
          if (attribute) {
            if (metaByAttribute[attribute]) {
              return;
            } else {
              metaByAttribute[attribute] = true;
            }
          }

          resultMeta.push({
            tag: "meta",
            attrs: {
              ...m,
            },
          });
        }
      });
    });

    if (title) {
      resultMeta.push(title);
    }

    resultMeta.reverse();

    return resultMeta;
  }, [routeMeta]);

  const links = useRouterState({
    select: (state) => {
      const constructed = state.matches
        .map((match) => match.links!)
        .filter(Boolean)
        .flat(1)
        .map((link) => ({
          tag: "link",
          attrs: {
            ...link,
          },
        })) satisfies Array<RouterManagedTag>;

      const manifest = router.ssr?.manifest;

      // These are the assets extracted from the ViteManifest
      // using the `startManifestPlugin`
      const assets = state.matches
        .map((match) => manifest?.routes[match.routeId]?.assets ?? [])
        .filter(Boolean)
        .flat(1)
        .filter((asset) => asset.tag === "link")
        .map(
          (asset) =>
            ({
              tag: "link",
              attrs: {
                ...asset.attrs,
                suppressHydrationWarning: true,
              },
            }) satisfies RouterManagedTag
        );

      return [...constructed, ...assets];
    },
    structuralSharing: true as any,
  });

  const preloadMeta = useRouterState({
    select: (state) => {
      const preloadMeta: Array<RouterManagedTag> = [];

      state.matches
        .map((match) => router.looseRoutesById[match.routeId]!)
        .forEach((route) =>
          router.ssr?.manifest?.routes[route.id]?.preloads?.filter(Boolean).forEach((preload) => {
            preloadMeta.push({
              tag: "link",
              attrs: {
                rel: "modulepreload",
                href: preload,
              },
            });
          })
        );

      return preloadMeta;
    },
    structuralSharing: true as any,
  });

  const styles = useRouterState({
    select: (state) =>
      (
        state.matches
          .map((match) => match.styles!)
          .flat(1)
          .filter(Boolean) as Array<RouterManagedTag>
      ).map(({ children, ...attrs }) => ({
        tag: "style",
        attrs,
        children,
      })),
    structuralSharing: true as any,
  });

  const headScripts = useRouterState({
    select: (state) =>
      (
        state.matches
          .map((match) => match.headScripts!)
          .flat(1)
          .filter(Boolean) as Array<RouterManagedTag>
      ).map(({ children, ...script }) => ({
        tag: "script",
        attrs: {
          ...script,
        },
        children,
      })),
    structuralSharing: true as any,
  });

  return uniqBy([...meta, ...preloadMeta, ...links, ...styles, ...headScripts] as Array<RouterManagedTag>, (d) => {
    return JSON.stringify(d);
  });
}

function uniqBy<T>(arr: Array<T>, fn: (item: T) => string) {
  const seen = new Set<string>();
  return arr.filter((item) => {
    const key = fn(item);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}
