import React from "react";

type Cleanup = () => void;
// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop: Cleanup = () => {};

type RefCallbackWithoutCleanup<RefElement extends HTMLElement> = (
  element: RefElement | null
) => void;
export type RefCallbackWithCleanup<RefElement extends HTMLElement> = (
  element: RefElement
) => () => void;

/*
 * The idea of this hook is to generalize cleanup for RefCallback.
 * By default React.RefCallback doesn't support cleanup.
 * */
export function useRefCallbackWithCleanup<RefElement extends HTMLElement>(
  callback: RefCallbackWithCleanup<RefElement>
): RefCallbackWithoutCleanup<RefElement> {
  const cleanUpRef = React.useRef<Cleanup>(noop);
  return React.useCallback(
    (element: RefElement | null) => {
      cleanUpRef.current();
      // So that every cleanup is called only once
      cleanUpRef.current = noop;

      if (element) {
        cleanUpRef.current = callback(element);
      }
    },
    [callback]
  );
}
