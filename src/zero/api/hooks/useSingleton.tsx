import React, { useRef } from "react";

export function useSingleton(callback: Function) {
  const called = useRef(false);

  if (called.current) return;

  callback();

  called.current = true;
}
