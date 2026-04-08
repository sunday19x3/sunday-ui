"use client";

import * as React from "react";

export function useId(providedId?: string): string {
  const reactId = React.useId();
  return providedId ?? reactId;
}
