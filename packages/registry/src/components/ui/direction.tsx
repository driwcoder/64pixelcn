"use client";

import * as React from "react";
import {
  DirectionProvider as DirectionProviderPrimitive,
  useDirection,
} from "@radix-ui/react-direction";

function PixelDirectionProvider({
  children,
  ...props
}: React.ComponentProps<typeof DirectionProviderPrimitive>) {
  return (
    <DirectionProviderPrimitive
      data-slot="direction-provider"
      {...props}
    >
      {children}
    </DirectionProviderPrimitive>
  );
}

export { PixelDirectionProvider, useDirection };
