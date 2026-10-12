"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { PixelButton } from "./button";
import { PixelInput } from "./input";
import { PixelSeparator } from "./separator";
import { PixelSheet, PixelSheetContent, PixelSheetDescription, PixelSheetHeader, PixelSheetTitle } from "./sheet";
import { PixelSkeleton } from "./skeleton";
import { PixelTooltip, PixelTooltipContent, PixelTooltipTrigger } from "./tooltip";

const SIDEBAR_COOKIE_NAME = "pixelcn_sidebar_state";
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

type SidebarContext = { state: "expanded" | "collapsed"; open: boolean; setOpen: (open: boolean) => void; openMobile: boolean; setOpenMobile: (open: boolean) => void; isMobile: boolean; toggleSidebar: () => void; };
const SidebarContext = React.createContext<SidebarContext | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used within a SidebarProvider.");
  return context;
}

const MOBILE_QUERY = "(max-width: 767px)";
const subscribeMobile = (onChange: () => void) => {
  const mql = window.matchMedia(MOBILE_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
};

// Server snapshot is `false` so SSR and hydration agree; the client value is
// applied right after and updates live on resize.
function useIsMobile() {
  return React.useSyncExternalStore(subscribeMobile, () => window.matchMedia(MOBILE_QUERY).matches, () => false);
}

const PixelSidebarProvider = React.forwardRef<HTMLDivElement, React.ComponentProps<"div"> & { defaultOpen?: boolean; open?: boolean; onOpenChange?: (open: boolean) => void }>(
  ({ defaultOpen = true, open: openProp, onOpenChange: setOpenProp, className, style, children, ...props }, ref) => {
    const isMobile = useIsMobile();
    const [openMobile, setOpenMobile] = React.useState(false);
    const [_open, _setOpen] = React.useState(defaultOpen);
    const open = openProp ?? _open;
    const setOpen = React.useCallback((value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) setOpenProp(openState); else _setOpen(openState);
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=604800`;
    }, [setOpenProp, open]);

    const toggleSidebar = React.useCallback(() => isMobile ? setOpenMobile((o) => !o) : setOpen((o) => !o), [isMobile, setOpen, setOpenMobile]);

    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) { event.preventDefault(); toggleSidebar(); }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleSidebar]);

    const state = open ? "expanded" : "collapsed";
    const contextValue = React.useMemo<SidebarContext>(() => ({ state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar }), [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]);

    return (
      <SidebarContext.Provider value={contextValue}>
        <div style={{ "--sidebar-width": SIDEBAR_WIDTH, "--sidebar-width-icon": SIDEBAR_WIDTH_ICON, ...style } as React.CSSProperties} className={cn("group/sidebar-wrapper flex min-h-svh w-full", className)} ref={ref} {...props}>
          {children}
        </div>
      </SidebarContext.Provider>
    );
  }
);
PixelSidebarProvider.displayName = "PixelSidebarProvider";

const PixelSidebar = React.forwardRef<HTMLDivElement, React.ComponentProps<"div"> & { side?: "left" | "right"; variant?: "sidebar" | "floating" | "inset"; collapsible?: "offcanvas" | "icon" | "none" }>(
  ({ side = "left", variant = "sidebar", collapsible = "offcanvas", className, children, ...props }, ref) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
    if (collapsible === "none") {
      return <div className={cn("flex h-full w-(--sidebar-width) flex-col bg-card border-r-[length:var(--pixel-line,2px)] border-foreground", className)} ref={ref} {...props}>{children}</div>;
    }
    if (isMobile) {
      return <PixelSheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <PixelSheetContent data-sidebar="sidebar" data-mobile="true" className="w-(--sidebar-width) bg-card p-0 [&>button]:hidden" style={{ "--sidebar-width": SIDEBAR_WIDTH_MOBILE } as React.CSSProperties} side={side}>
          <PixelSheetHeader className="sr-only"><PixelSheetTitle>Sidebar</PixelSheetTitle><PixelSheetDescription>Displays the mobile sidebar.</PixelSheetDescription></PixelSheetHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </PixelSheetContent>
      </PixelSheet>;
    }
    return (
      <div ref={ref} className="group peer hidden text-card-foreground md:block" data-state={state} data-collapsible={state === "collapsed" ? collapsible : ""} data-variant={variant} data-side={side}>
        <div className={cn("relative h-svh w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear", "group-data-[collapsible=offcanvas]:w-0", "group-data-[side=right]:rotate-180", variant === "floating" || variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)")} />
        <div className={cn("fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex", side === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]", variant === "floating" ? "p-2" : variant === "inset" ? "p-2 md:p-2" : "group-data-[side=left]:border-r-[length:var(--pixel-line,2px)] group-data-[side=left]:border-foreground group-data-[side=right]:border-l-[length:var(--pixel-line,2px)] group-data-[side=right]:border-foreground", className)} {...props}>
          <div data-sidebar="sidebar" className="flex h-full w-full flex-col bg-card group-data-[variant=floating]:border-[length:var(--pixel-line,2px)] group-data-[variant=floating]:border-foreground group-data-[variant=floating]:pixel-shadow">{children}</div>
        </div>
      </div>
    );
  }
);
PixelSidebar.displayName = "PixelSidebar";

const PixelSidebarTrigger = React.forwardRef<React.ElementRef<typeof PixelButton>, React.ComponentProps<typeof PixelButton>>(
  ({ className, onClick, ...props }, ref) => {
    const { toggleSidebar } = useSidebar();
    return <PixelButton ref={ref} data-sidebar="trigger" variant="outline" size="icon" className={cn("h-7 w-7", className)} onClick={(event) => { onClick?.(event); toggleSidebar(); }} {...props}><span className="text-xs">▤</span><span className="sr-only">Toggle Sidebar</span></PixelButton>;
  }
);
PixelSidebarTrigger.displayName = "PixelSidebarTrigger";

const PixelSidebarRail = React.forwardRef<HTMLButtonElement, React.ComponentProps<"button">>(({ className, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();
  return <button ref={ref} data-sidebar="rail" aria-label="Toggle Sidebar" tabIndex={-1} onClick={toggleSidebar} title="Toggle Sidebar" className={cn("absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-border sm:flex group-data-[side=left]:-right-4 group-data-[side=right]:left-0", className)} {...props} />;
});
PixelSidebarRail.displayName = "PixelSidebarRail";

const PixelSidebarInset = React.forwardRef<HTMLDivElement, React.ComponentProps<"main">>(({ className, ...props }, ref) => (
  <main ref={ref} className={cn("relative flex w-full flex-1 flex-col bg-background", "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-none md:peer-data-[variant=inset]:pixel-shadow md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2", className)} {...props} />
));
PixelSidebarInset.displayName = "PixelSidebarInset";

const PixelSidebarInput = React.forwardRef<React.ElementRef<typeof PixelInput>, React.ComponentProps<typeof PixelInput>>(({ className, ...props }, ref) => <PixelInput ref={ref} data-sidebar="input" className={cn("h-8 w-full shadow-none", className)} {...props} />);
PixelSidebarInput.displayName = "PixelSidebarInput";

const PixelSidebarHeader = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => <div ref={ref} data-sidebar="header" className={cn("flex flex-col gap-2 p-2", className)} {...props} />);
PixelSidebarHeader.displayName = "PixelSidebarHeader";

const PixelSidebarFooter = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => <div ref={ref} data-sidebar="footer" className={cn("flex flex-col gap-2 p-2", className)} {...props} />);
PixelSidebarFooter.displayName = "PixelSidebarFooter";

const PixelSidebarSeparator = React.forwardRef<React.ElementRef<typeof PixelSeparator>, React.ComponentProps<typeof PixelSeparator>>(({ className, ...props }, ref) => <PixelSeparator ref={ref} data-sidebar="separator" className={cn("mx-2 w-auto bg-foreground", className)} {...props} />);
PixelSidebarSeparator.displayName = "PixelSidebarSeparator";

const PixelSidebarContent = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => <div ref={ref} data-sidebar="content" className={cn("flex min-h-0 flex-1 flex-col gap-2 overflow-auto", className)} {...props} />);
PixelSidebarContent.displayName = "PixelSidebarContent";

const PixelSidebarGroup = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => <div ref={ref} data-sidebar="group" className={cn("relative flex w-full min-w-0 flex-col p-2", className)} {...props} />);
PixelSidebarGroup.displayName = "PixelSidebarGroup";

const PixelSidebarGroupLabel = React.forwardRef<HTMLDivElement, React.ComponentProps<"div"> & { asChild?: boolean }>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div";
  return <Comp ref={ref} data-sidebar="group-label" className={cn("flex h-8 shrink-0 items-center px-2 text-[0.7rem] uppercase tracking-widest text-muted-foreground", "peer-data-[collapsible=icon]:pointer-events-none peer-data-[collapsible=icon]:-mt-8 peer-data-[collapsible=icon]:opacity-0", className)} {...props} />;
});
PixelSidebarGroupLabel.displayName = "PixelSidebarGroupLabel";

const PixelSidebarGroupAction = React.forwardRef<HTMLButtonElement, React.ComponentProps<"button"> & { asChild?: boolean }>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp ref={ref} data-sidebar="group-action" className={cn("absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center p-0 text-muted-foreground outline-none transition-transform hover:text-foreground peer-data-[collapsible=icon]:hidden", className)} {...props} />;
});
PixelSidebarGroupAction.displayName = "PixelSidebarGroupAction";

const PixelSidebarGroupContent = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => <div ref={ref} data-sidebar="group-content" className={cn("w-full text-xs", className)} {...props} />);
PixelSidebarGroupContent.displayName = "PixelSidebarGroupContent";

const PixelSidebarMenu = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(({ className, ...props }, ref) => <ul ref={ref} data-sidebar="menu" className={cn("flex w-full min-w-0 flex-col gap-1", className)} {...props} />);
PixelSidebarMenu.displayName = "PixelSidebarMenu";

const PixelSidebarMenuItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(({ className, ...props }, ref) => <li ref={ref} data-sidebar="menu-item" className={cn("group/menu-item relative", className)} {...props} />);
PixelSidebarMenuItem.displayName = "PixelSidebarMenuItem";

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden p-2 text-left text-xs uppercase tracking-widest outline-none transition-[width,height,padding] hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=true]:border-[length:var(--pixel-line,2px)] data-[active=true]:border-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: { default: "hover:bg-accent hover:text-accent-foreground", outline: "bg-transparent border-[length:var(--pixel-line,2px)] border-foreground pixel-shadow hover:bg-accent hover:text-accent-foreground" },
      size: { default: "h-8 text-xs", sm: "h-7 text-[0.7rem]", lg: "h-12 text-sm" },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

const PixelSidebarMenuButton = React.forwardRef<HTMLButtonElement, React.ComponentProps<"button"> & { asChild?: boolean; isActive?: boolean; tooltip?: string | React.ComponentProps<typeof PixelTooltipContent> } & VariantProps<typeof sidebarMenuButtonVariants>>(
  ({ asChild = false, isActive = false, variant = "default", size = "default", tooltip, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const { isMobile, state } = useSidebar();
    const button = <Comp ref={ref} data-sidebar="menu-button" data-size={size} data-active={isActive} className={cn(sidebarMenuButtonVariants({ variant, size }), className)} {...props} />;
    if (!tooltip) return button;
    if (typeof tooltip === "string") tooltip = { children: tooltip };
    return <PixelTooltip><PixelTooltipTrigger asChild>{button}</PixelTooltipTrigger><PixelTooltipContent side="right" align="center" hidden={state !== "collapsed" || isMobile} {...tooltip} /></PixelTooltip>;
  }
);
PixelSidebarMenuButton.displayName = "PixelSidebarMenuButton";

const PixelSidebarMenuAction = React.forwardRef<HTMLButtonElement, React.ComponentProps<"button"> & { asChild?: boolean; showOnHover?: boolean }>(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp ref={ref} data-sidebar="menu-action" className={cn("absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center p-0 text-muted-foreground outline-none transition-transform hover:text-foreground peer-hover/menu-button:text-foreground [&>svg]:size-4 [&>svg]:shrink-0", showOnHover && "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-foreground md:opacity-0", className)} {...props} />;
});
PixelSidebarMenuAction.displayName = "PixelSidebarMenuAction";

const PixelSidebarMenuBadge = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => <div ref={ref} data-sidebar="menu-badge" className={cn("pointer-events-none absolute right-1 flex min-w-5 items-center justify-center border-[length:var(--pixel-line,2px)] border-foreground bg-primary px-1 text-[0.6rem] text-primary-foreground tabular-nums", "peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2", className)} {...props} />);
PixelSidebarMenuBadge.displayName = "PixelSidebarMenuBadge";

const PixelSidebarMenuSkeleton = React.forwardRef<HTMLDivElement, React.ComponentProps<"div"> & { showIcon?: boolean }>(({ className, showIcon = false, ...props }, ref) => {
  // Deterministic "random" width (50-89%) so server and client render the same.
  const id = React.useId();
  const width = `${50 + ([...id].reduce((h, c) => (h * 31 + c.charCodeAt(0)) | 0, 0) >>> 0) % 40}%`;
  return <div ref={ref} data-sidebar="menu-skeleton" className={cn("flex h-8 items-center gap-2 px-2", className)} {...props}>{showIcon && <PixelSkeleton className="size-4" data-sidebar="menu-skeleton-icon" />}<PixelSkeleton className="h-4 max-w-(--skeleton-width) flex-1" data-sidebar="menu-skeleton-text" style={{ "--skeleton-width": width } as React.CSSProperties} /></div>;
});
PixelSidebarMenuSkeleton.displayName = "PixelSidebarMenuSkeleton";

const PixelSidebarMenuSub = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(({ className, ...props }, ref) => <ul ref={ref} data-sidebar="menu-sub" className={cn("mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l-[length:var(--pixel-line,2px)] border-foreground px-2.5 py-0.5", "group-data-[collapsible=icon]:hidden", className)} {...props} />);
PixelSidebarMenuSub.displayName = "PixelSidebarMenuSub";

const PixelSidebarMenuSubItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(({ ...props }, ref) => <li ref={ref} {...props} />);
PixelSidebarMenuSubItem.displayName = "PixelSidebarMenuSubItem";

const PixelSidebarMenuSubButton = React.forwardRef<HTMLAnchorElement, React.ComponentProps<"a"> & { asChild?: boolean; size?: "sm" | "md"; isActive?: boolean }>(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";
  return <Comp ref={ref} data-sidebar="menu-sub-button" data-size={size} data-active={isActive} className={cn("flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0", size === "sm" && "text-[0.7rem]", size === "md" && "text-xs", "data-[active=true]:text-foreground", className)} {...props} />;
});
PixelSidebarMenuSubButton.displayName = "PixelSidebarMenuSubButton";

export {
  PixelSidebar, PixelSidebarContent, PixelSidebarFooter, PixelSidebarGroup, PixelSidebarGroupAction,
  PixelSidebarGroupContent, PixelSidebarGroupLabel, PixelSidebarHeader, PixelSidebarInput,
  PixelSidebarInset, PixelSidebarMenu, PixelSidebarMenuAction, PixelSidebarMenuBadge, PixelSidebarMenuButton,
  PixelSidebarMenuItem, PixelSidebarMenuSkeleton, PixelSidebarMenuSub, PixelSidebarMenuSubButton,
  PixelSidebarMenuSubItem, PixelSidebarProvider, PixelSidebarRail, PixelSidebarSeparator,
  PixelSidebarTrigger, useSidebar,
};
