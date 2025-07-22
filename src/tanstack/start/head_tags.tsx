import {
  createContext,
  type DependencyList,
  type DetailedHTMLProps,
  type Dispatch,
  type MetaHTMLAttributes,
  type ReactNode,
  type SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type HeadTag = DetailedHTMLProps<MetaHTMLAttributes<HTMLMetaElement>, HTMLMetaElement> | undefined;

/**
 * Context to dynamically override the router managed tags.
 */
export interface ClientManagedTagsContextType {
  /**
   * A list of custom tags to be appended to the head config.
   */
  tags: HeadTag[][];
  /**
   * Manage the custom client tags, without touching the router tags.
   */
  setTags: Dispatch<SetStateAction<HeadTag[][]>>;
}

const ClientManagedTagsContext = createContext<ClientManagedTagsContextType>({
  tags: [],
  setTags: () => console.warn("ClientManagedTagsContext.setTags called without provider"),
});

export function useClientTags() {
  return useContext(ClientManagedTagsContext);
}

export function ClientTagsProvider({ children }: { children: ReactNode }) {
  const [clientTags, setClientTags] = useState<HeadTag[][]>([]);

  return (
    <ClientManagedTagsContext.Provider value={{ tags: clientTags, setTags: setClientTags }}>
      {children}
    </ClientManagedTagsContext.Provider>
  );
}

export function useClientTag(create: () => HeadTag[], deps: DependencyList) {
  const { setTags } = useClientTags();
  //eslint-disable-next-line react-hooks/exhaustive-deps
  const doCreate = useCallback(create, deps);

  useEffect(() => {
    const tags = doCreate();
    if (tags.length === 0) {
      return;
    }

    setTags((prev) => [...prev, tags]);

    // Cleanup function to remove the tags when the component unmounts,
    // or when the dependencies change.
    return () => {
      setTags((prev) => prev.filter((t) => t !== tags));
    };
  }, [setTags, doCreate]);
}
