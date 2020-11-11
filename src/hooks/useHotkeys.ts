import React from "react";
import {
  RefCallbackWithCleanup,
  useRefCallbackWithCleanup,
} from "./useRefCallbackWithCleanup";

export type EventListener = {
  keys: string[];
  eventListener: (event: KeyboardEvent) => void;
};
type Handler = (event: KeyboardEvent) => void;
type Props = {
  autoFocus: boolean;
  eventListeners: EventListener[];
};
export const useHotkeys = <RefElement extends HTMLElement>(
  props: Props
): React.RefCallback<RefElement> => {
  const { autoFocus, eventListeners } = props;
  const refCallback: RefCallbackWithCleanup<RefElement> = React.useCallback(
    (element) => {
      const handlers: Handler[] = [];
      eventListeners.forEach(({ keys, eventListener }) => {
        const eventHandler = (event: KeyboardEvent) => {
          if (keys.includes(event.key)) {
            eventListener(event);
          }
        };
        handlers.push(eventHandler);
        element?.addEventListener("keydown", eventHandler);
      });

      if (autoFocus) {
        element?.focus();
      }

      return () => {
        console.log("Cleanup time!");
        handlers.forEach((handler) => {
          element?.removeEventListener("keydown", handler);
        });
      };
    },
    [autoFocus, eventListeners]
  );
  return useRefCallbackWithCleanup<RefElement>(refCallback);
};
