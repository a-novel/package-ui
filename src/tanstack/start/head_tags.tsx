import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { type RouterManagedTag } from "@tanstack/react-router";

/**
 * Context to dynamically override the router managed tags.
 */
export interface ClientManagedTagsContextType {
  /**
   * A list of custom tags to be appended to the head config.
   */
  tags: RouterManagedTag[];
  /**
   * Manage the custom client tags, without touching the router tags.
   */
  setTags: Dispatch<SetStateAction<RouterManagedTag[]>>;
}

const ClientManagedTagsContext = createContext<ClientManagedTagsContextType>({
  tags: [],
  setTags: () => console.warn("ClientManagedTagsContext.setTags called without provider"),
});

export function useClientTags() {
  return useContext(ClientManagedTagsContext);
}

export function ClientTagsProvider({ children }: { children: ReactNode }) {
  const [clientTags, setClientTags] = useState<RouterManagedTag[]>([]);

  return (
    <ClientManagedTagsContext.Provider value={{ tags: clientTags, setTags: setClientTags }}>
      {children}
    </ClientManagedTagsContext.Provider>
  );
}

/**
 * Manage a tag in the client tags list. This helper is safe to use against other helpers.
 */
export function useTagManager({ tag, attrs, children }: RouterManagedTag, show: boolean = true) {
  const { setTags } = useClientTags();

  // Keep a constant reference to the tag definition, so we can track it in the tags list.
  const tagRef = useRef<RouterManagedTag>({ tag, attrs, children } as RouterManagedTag);

  useEffect(() => {
    // Update the ref values when the tag definition changes.
    const hasChanged =
      tagRef.current.tag !== tag || tagRef.current.attrs !== attrs || tagRef.current.children !== children;

    if (hasChanged) {
      tagRef.current.tag = tag;
      tagRef.current.attrs = attrs;
      tagRef.current.children = children;
    }

    setTags((prevTags) => {
      // Remove the local tag from tags list if `show` is false.
      if (!show) {
        // Filter our local tag out. This is why we keep a constant reference to the tag definition.
        if (prevTags.includes(tagRef.current)) {
          return prevTags.filter((tag) => tag !== tagRef.current);
        }

        // Nothing to do, don't trigger a re-render.
        return prevTags;
      }

      // If the reference to our tag is not already there, add it to the list.
      if (!prevTags.includes(tagRef.current)) {
        // Add our local tag to the tags list.
        return [...prevTags, tagRef.current];
      }

      // If the reference to our tag is already there, just trigger a re-render.
      if (hasChanged) {
        return [...prevTags];
      }

      // Nothing to do, don't trigger a re-render.
      return prevTags;
    });
  }, [show, tag, attrs, children, setTags]);

  // Make sure to remove the tag when the component unmounts.
  useEffect(() => {
    const currentTag = tagRef.current;
    return () => {
      setTags((prevTags) => {
        // Filter our local tag out. This is why we keep a constant reference to the tag definition.
        if (prevTags.includes(currentTag)) {
          return prevTags.filter((tag) => tag !== currentTag);
        }

        // Nothing to do, don't trigger a re-render.
        return prevTags;
      });
    };
  }, [setTags]);
}
