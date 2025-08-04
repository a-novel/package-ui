import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Asset,
  useRouterState,
  HeadContent as OriginalStupidHeadContent,
  type AnyRouteMatch,
  type RouterManagedTag,
} from "@tanstack/react-router";

export function HeadContent() {
  const matches = useRouterState({ select: (s) => s.matches });
  const reversedMatches = useMemo(() => [...matches].reverse(), [matches]);

  const title = useContextValue<string>(reversedMatches, "title", "");
  const titleTemplate = useContextValue<(title: string) => string>(reversedMatches, "titleTemplate", (title) => title);
  const description = useContextValue<string>(reversedMatches, "description", "");

  const { title: overrideTitle, description: overrideDescription } = useOverrideRouteMeta();

  const actualTitle: RouterManagedTag = { tag: "title", children: titleTemplate(overrideTitle || title) };

  const actualDescription: RouterManagedTag = {
    tag: "meta",
    attrs: { name: "description", content: overrideDescription || description },
  };

  return (
    <>
      <OriginalStupidHeadContent />
      <Asset {...actualTitle} key={`tsr-meta-${JSON.stringify(actualTitle)}`} />
      <Asset {...actualDescription} key={`tsr-meta-${JSON.stringify(actualDescription)}`} />
    </>
  );
}

function useContextValue<T>(matches: AnyRouteMatch[], key: string): T | undefined;
function useContextValue<T>(matches: AnyRouteMatch[], key: string, defaultValue: T): T;

function useContextValue<T>(matches: AnyRouteMatch[], key: string, defaultValue?: T): T | undefined {
  return matches.find((match) => match.context[key])?.context[key] ?? defaultValue;
}

export interface OverrideRouteMetaContext {
  title?: string;
  setTitle: Dispatch<SetStateAction<string | undefined>>;
  description?: string;
  setDescription: Dispatch<SetStateAction<string | undefined>>;
}

export const overrideRouteMetaContext = createContext<OverrideRouteMetaContext>({
  title: undefined,
  setTitle: () => console.warn("Trying to call OverrideRouteMetaContext.setTitle without a provider!"),
  description: undefined,
  setDescription: () => console.warn("Trying to call OverrideRouteMetaContext.setDescription without a provider!"),
});

export function OverrideRouteMetaProvider({ children }: { children: ReactNode }) {
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();

  return (
    <overrideRouteMetaContext.Provider value={{ title, setTitle, description, setDescription }}>
      {children}
    </overrideRouteMetaContext.Provider>
  );
}

export function useOverrideRouteMeta() {
  return useContext(overrideRouteMetaContext);
}

export const useOverrideRouteMetaTitle = (title: string | undefined) => {
  const { setTitle } = useOverrideRouteMeta();

  useEffect(() => {
    setTitle(title);
    return () => {
      setTitle(undefined);
    };
  }, [setTitle, title]);
};

export const useOverrideRouteMetaDescription = (description: string | undefined) => {
  const { setDescription } = useOverrideRouteMeta();

  useEffect(() => {
    setDescription(description);
    return () => {
      setDescription(undefined);
    };
  }, [setDescription, description]);
};
