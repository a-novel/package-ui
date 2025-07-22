import {
  createContext,
  type DetailedHTMLProps,
  type Dispatch,
  type MetaHTMLAttributes,
  type ReactNode,
  type SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

export type HeadTag = (DetailedHTMLProps<MetaHTMLAttributes<HTMLMetaElement>, HTMLMetaElement> | undefined)[];

/**
 * Context to dynamically override the router managed tags.
 */
export interface ClientManagedTagsContextType {
  /**
   * A list of custom tags to be appended to the head config.
   */
  tags: HeadTag[];
  /**
   * Manage the custom client tags, without touching the router tags.
   */
  setTags: Dispatch<SetStateAction<HeadTag[]>>;
}

const ClientManagedTagsContext = createContext<ClientManagedTagsContextType>({
  tags: [],
  setTags: () => console.warn("ClientManagedTagsContext.setTags called without provider"),
});

export function useClientTags() {
  return useContext(ClientManagedTagsContext);
}

export function ClientTagsProvider({ children }: { children: ReactNode }) {
  const [clientTags, setClientTags] = useState<HeadTag[]>([]);

  return (
    <ClientManagedTagsContext.Provider value={{ tags: clientTags, setTags: setClientTags }}>
      {children}
    </ClientManagedTagsContext.Provider>
  );
}

export function useClientTag(tag: any) {
  const { setTags } = useClientTags();

  useEffect(() => {
    setTags((prevTags) => [...(prevTags ?? []), tag]);
    return () => {
      setTags((prevTags) => prevTags?.filter((tag) => tag !== tag));
    };
  }, [setTags, tag]);
}
