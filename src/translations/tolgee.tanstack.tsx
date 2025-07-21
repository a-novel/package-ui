import { useEffect } from "react";

import { useRouter } from "@tanstack/react-router";
import { useTolgee } from "@tolgee/react";

/**
 * Make sure tanstack router reflects Tolgee's language changes.
 */
export function TolgeeRouterProvider() {
  const { invalidate } = useRouter();
  const tolgee = useTolgee();

  // Get the active language from tolgee.
  const language = tolgee.getLanguage() ?? tolgee.getPendingLanguage();

  // Force refreshes if tolgee's internal data is modified.
  const initialLoading = tolgee.isInitialLoading();
  const loading = tolgee.isLoading();

  useEffect(() => {
    if (initialLoading || loading || !language) return;
    document.documentElement.lang = language;
    invalidate().then();
  }, [initialLoading, invalidate, loading, language]);

  return null;
}
