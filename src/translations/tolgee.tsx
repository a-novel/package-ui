import type { LangMetadata } from "~/translations/types";

import { type ComponentType, type JSX, useEffect } from "react";

import { FormatIcu } from "@tolgee/format-icu";
import {
  type TolgeeInstance,
  BackendFetch,
  LanguageDetector,
  LanguageStorage,
  Tolgee,
  type NsFallback,
  useTolgee,
} from "@tolgee/react";

export interface TolgeePresetDefaultProps {
  cdn: string;
}

export const TolgeeSupportedLanguages = ["en", "fr"] as const;

export const TolgeeDefaultLanguage: (typeof TolgeeSupportedLanguages)[number] = "en";

export const TolgeeLangMetadata: Record<(typeof TolgeeSupportedLanguages)[number], LangMetadata> = {
  en: {
    flag: "us",
    label: "English",
    shortLabel: "ENG",
  },
  fr: {
    flag: "fr",
    label: "Français",
    shortLabel: "FRA",
  },
};

export function getDefaultTolgeePreset({ cdn }: TolgeePresetDefaultProps): TolgeeInstance {
  return Tolgee()
    .use(BackendFetch({ prefix: cdn }))
    .use(FormatIcu())
    .use(LanguageDetector())
    .use(LanguageStorage())
    .init({
      defaultLanguage: TolgeeDefaultLanguage,
      fallbackLanguage: TolgeeDefaultLanguage,
      availableLanguages: [...TolgeeSupportedLanguages],
      defaultNs: "generic",
    });
}

export function useTolgeeNs(ns: NsFallback) {
  const { addActiveNs, removeActiveNs } = useTolgee();

  // Load / unload translations.
  useEffect(() => {
    addActiveNs(ns).then();
    return () => removeActiveNs(ns);
  }, [addActiveNs, removeActiveNs, ns]);
}

/**
 * HOC that automatically loads the Tolgee namespace for the component, and unloads it when the component unmounts.
 */
export function WithTolgeeNs<Props>(Component: ComponentType<Props>, ns: NsFallback) {
  return function TolgeeNsWrapper(props: Props & JSX.IntrinsicAttributes) {
    useTolgeeNs(ns);
    return <Component {...props} />;
  };
}
