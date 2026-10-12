import * as React from "react";
import { GripVertical } from "./icons";
import { Group, Panel, Separator } from "react-resizable-panels";
import { cn } from "@/lib/utils";

type PixelResizablePanelGroupProps = React.ComponentProps<typeof Group>;

function PixelResizablePanelGroup({
  className,
  ...props
}: PixelResizablePanelGroupProps) {
  return (
    <Group
      data-slot="resizable-panel-group"
      className={cn("flex h-full w-full flex-col data-[orientation=vertical]:flex-col", className)}
      {...props}
    />
  );
}

function PixelResizablePanel({ ...props }: React.ComponentProps<typeof Panel>) {
  return <Panel data-slot="resizable-panel" {...props} />;
}

interface PixelResizableHandleProps
  extends React.ComponentProps<typeof Separator> {
  withHandle?: boolean;
}

function PixelResizableHandle({
  withHandle,
  className,
  ...props
}: PixelResizableHandleProps) {
  return (
    <Separator
      data-slot="resizable-handle"
      className={cn(
        "relative flex w-px items-center justify-center bg-foreground",
        "data-[orientation=vertical]:h-px data-[orientation=vertical]:w-full",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
      {...props}
    >
      {withHandle && (
        <div className="z-10 flex h-4 w-3 items-center justify-center border-2 border-foreground bg-popover">
          <GripVertical className="h-2.5 w-2.5" strokeWidth={3} />
        </div>
      )}
    </Separator>
  );
}

export {
  PixelResizablePanelGroup,
  PixelResizablePanel,
  PixelResizableHandle,
};
