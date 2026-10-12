"use client";

import * as React from "react";
import { gameDemos } from "@/components/game-demos";
import {
  Check, ChevronDown, Heart, Search, Bell, Settings, User,
  Star,
} from "@/components/ui/icons";
import {
  PixelAccordion, PixelAccordionItem, PixelAccordionTrigger, PixelAccordionContent,
  PixelAlert, PixelAlertTitle, PixelAlertDescription,
  PixelAspectRatio, PixelAvatar, PixelAvatarFallback, PixelAvatarImage,
  PixelBadge, PixelBreadcrumb, PixelBreadcrumbEllipsis, PixelBreadcrumbItem,
  PixelBreadcrumbLink, PixelBreadcrumbList, PixelBreadcrumbPage, PixelBreadcrumbSeparator,
  PixelButton, PixelButtonGroup,
  PixelCalendar, PixelCard, PixelCardContent, PixelCardDescription, PixelCardFooter,
  PixelCardHeader, PixelCardTitle, PixelCarousel, PixelCarouselContent, PixelCarouselItem,
  PixelCarouselNext, PixelCarouselPrevious,
  PixelCheckbox, PixelCollapsible, PixelCollapsibleContent, 
  PixelContextMenu, PixelContextMenuContent, PixelContextMenuItem, PixelContextMenuTrigger,
  PixelDataTable, PixelDatePicker, PixelDialog, PixelDialogContent, PixelDialogDescription,
  PixelDialogHeader, PixelDialogTitle, PixelDialogTrigger, PixelDirectionProvider,
  PixelDrawer, PixelDrawerContent, PixelDrawerDescription, PixelDrawerHeader, PixelDrawerTitle,
  PixelDrawerTrigger, PixelDropdownMenu, PixelDropdownMenuContent, PixelDropdownMenuItem,
  PixelDropdownMenuLabel, PixelDropdownMenuSeparator, PixelDropdownMenuTrigger,
  PixelEmpty, PixelEmptyContent, PixelEmptyDescription, PixelEmptyHeader, PixelEmptyMedia,
  PixelEmptyTitle, PixelField, PixelFieldGroup, PixelFieldLabel, 
  PixelHoverCard, PixelHoverCardContent, PixelHoverCardTrigger, PixelInput, PixelInputGroup,
  PixelInputGroupAddon, PixelInputGroupInput, PixelInputOTP, PixelInputOTPGroup,
  PixelInputOTPSlot, PixelItem, PixelItemActions, PixelItemContent, PixelItemDescription,
  PixelItemMedia, PixelItemTitle, PixelKbd, PixelKbdGroup, PixelLabel,
  PixelMenubar, PixelMenubarContent, PixelMenubarItem, PixelMenubarMenu, PixelMenubarSeparator,
  PixelMenubarTrigger, PixelNavigationMenu, PixelNavigationMenuContent, PixelNavigationMenuItem,
  PixelNavigationMenuLink, PixelNavigationMenuList, PixelNavigationMenuTrigger,
  PixelPopover, PixelPopoverContent, PixelPopoverTrigger, PixelProgress, PixelQuestionnaire,
  PixelRadioGroup, PixelRadioGroupItem, 
  PixelScrollArea, PixelSeparator, PixelSheet, PixelSheetContent,
  PixelSheetDescription, PixelSheetHeader, PixelSheetTitle, PixelSheetTrigger,
  PixelSidebar, PixelSidebarContent, PixelSidebarFooter, PixelSidebarGroup,
  PixelSidebarGroupContent, PixelSidebarGroupLabel, PixelSidebarHeader, PixelSidebarInset,
  PixelSidebarMenu, PixelSidebarMenuButton, PixelSidebarMenuItem, PixelSidebarProvider,
  PixelSidebarTrigger, PixelSkeleton, PixelSlider, PixelSpinner, PixelSwitch, PixelTable,
  PixelTableBody, PixelTableCaption, PixelTableCell, PixelTableHead, PixelTableHeader,
  PixelTableRow, PixelTabs, PixelTabsContent, PixelTabsList, PixelTabsTrigger, PixelTextarea,
  PixelToast, PixelToastProvider, PixelToastViewport, PixelToastTitle, PixelToastDescription, PixelToastAction, PixelToastClose,
  PixelAlertDialog, PixelAlertDialogAction, PixelAlertDialogCancel, PixelAlertDialogContent, PixelAlertDialogDescription, PixelAlertDialogFooter, PixelAlertDialogHeader, PixelAlertDialogTitle, PixelAlertDialogTrigger,
  PixelPagination, PixelPaginationContent, PixelPaginationEllipsis, PixelPaginationItem, PixelPaginationLink, PixelPaginationNext, PixelPaginationPrevious,
  PixelHealthBar, PixelManaBar, PixelXpBar, PixelEnemyHealthDisplay, PixelRetroModeSwitcher, PixelThemeSelector,
  PixelToggle, PixelToggleGroup, PixelToggleGroupItem, PixelTooltip, PixelTooltipContent,
  PixelTooltipProvider, PixelTooltipTrigger, PixelTypographyH1, PixelTypographyH2,
  PixelTypographyH3, PixelTypographyP, PixelTypographyBlockquote, PixelTypographyList,
  PixelTypographyInlineCode, PixelTypographyMuted,
  PixelMessage, PixelMessageContent,
  PixelMessageScroller, PixelBubble, PixelAttachment, PixelAttachmentInfo, PixelMarker,
  PixelNativeSelect, PixelNativeSelectOption,
  PixelSelect, PixelSelectContent, PixelSelectItem, PixelSelectTrigger, PixelSelectValue,
} from "@/components/ui/index";
import {
  PixelResizablePanelGroup as RPG,
  PixelResizablePanel as RP,
  PixelResizableHandle as RH,
} from "@/components/ui/resizable";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Bar, BarChart, XAxis } from "recharts";

// ─── Dados de exemplo ─────────────────────────────────────────────
const users = [
  { id: "1", name: "Alice", email: "alice@mail.com", role: "Admin" },
  { id: "2", name: "Bob", email: "bob@mail.com", role: "User" },
  { id: "3", name: "Carol", email: "carol@mail.com", role: "User" },
  { id: "4", name: "Dave", email: "dave@mail.com", role: "Editor" },
];

const chartData = [
  { month: "Jan", desktop: 186 },
  { month: "Feb", desktop: 305 },
  { month: "Mar", desktop: 237 },
  { month: "Apr", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "Jun", desktop: 214 },
];

const chartConfig = { desktop: { label: "Desktop", color: "var(--primary)" } };

interface DemoColumn {
  accessorKey: string;
  header: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cell?: (row: any) => React.ReactNode;
}

const columns: DemoColumn[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role" },
];

const questions = [
  {
    id: "q1",
    title: "What is your favorite color?",
    description: "Pick the one that resonates most.",
    options: [
      { value: "red", label: "Red" },
      { value: "blue", label: "Blue" },
      { value: "green", label: "Green" },
    ],
  },
  {
    id: "q2",
    title: "How often do you game?",
    options: [
      { value: "daily", label: "Daily" },
      { value: "weekly", label: "Weekly" },
      { value: "rarely", label: "Rarely" },
    ],
  },
];

// ─── Demos map ────────────────────────────────────────────────────
export const componentDemos: Record<string, () => React.ReactNode> = {
  accordion: () => (
    <PixelAccordion type="single" collapsible className="w-full">
      <PixelAccordionItem value="item-1">
        <PixelAccordionTrigger>Is it accessible?</PixelAccordionTrigger>
        <PixelAccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</PixelAccordionContent>
      </PixelAccordionItem>
      <PixelAccordionItem value="item-2">
        <PixelAccordionTrigger>Is it styled?</PixelAccordionTrigger>
        <PixelAccordionContent>Yes. It comes with pixel-art styles out of the box.</PixelAccordionContent>
      </PixelAccordionItem>
    </PixelAccordion>
  ),

  alert: () => (
    <div className="space-y-3">
      <PixelAlert>
        <PixelAlertTitle>Heads up!</PixelAlertTitle>
        <PixelAlertDescription>This is a default pixel alert.</PixelAlertDescription>
      </PixelAlert>
      <PixelAlert variant="destructive">
        <PixelAlertTitle>Error</PixelAlertTitle>
        <PixelAlertDescription>Something went wrong.</PixelAlertDescription>
      </PixelAlert>
      <PixelAlert variant="success">
        <PixelAlertTitle>Success</PixelAlertTitle>
        <PixelAlertDescription>Operation completed.</PixelAlertDescription>
      </PixelAlert>
    </div>
  ),

  "aspect-ratio": () => (
    <PixelAspectRatio ratio={16 / 9} className="w-full max-w-md bg-muted border-[length:var(--pixel-line,2px)] border-foreground flex items-center justify-center">
      <span className="text-xs uppercase tracking-widest">16 / 9</span>
    </PixelAspectRatio>
  ),

  attachment: () => (
    <div className="space-y-2">
      <PixelAttachment>
        <PixelAttachmentInfo onRemove={() => {}}>report-final.pdf</PixelAttachmentInfo>
      </PixelAttachment>
      <PixelAttachment>
        <PixelAttachmentInfo onRemove={() => {}}>sprite-sheet.png</PixelAttachmentInfo>
      </PixelAttachment>
    </div>
  ),

  avatar: () => (
    <div className="flex gap-3">
      <PixelAvatar>
        <PixelAvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <PixelAvatarFallback>CN</PixelAvatarFallback>
      </PixelAvatar>
      <PixelAvatar>
        <PixelAvatarFallback>AB</PixelAvatarFallback>
      </PixelAvatar>
      <PixelAvatar>
        <PixelAvatarFallback>CD</PixelAvatarFallback>
      </PixelAvatar>
    </div>
  ),

  badge: () => (
    <div className="flex flex-wrap gap-2">
      <PixelBadge>Default</PixelBadge>
      <PixelBadge variant="secondary">Secondary</PixelBadge>
      <PixelBadge variant="destructive">Destructive</PixelBadge>
      <PixelBadge variant="outline">Outline</PixelBadge>
      <PixelBadge variant="muted">Muted</PixelBadge>
    </div>
  ),

  breadcrumb: () => (
    <PixelBreadcrumb>
      <PixelBreadcrumbList>
        <PixelBreadcrumbItem>
          <PixelBreadcrumbLink href="#">Home</PixelBreadcrumbLink>
        </PixelBreadcrumbItem>
        <PixelBreadcrumbSeparator />
        <PixelBreadcrumbItem>
          <PixelBreadcrumbEllipsis />
        </PixelBreadcrumbItem>
        <PixelBreadcrumbSeparator />
        <PixelBreadcrumbItem>
          <PixelBreadcrumbLink href="#">Components</PixelBreadcrumbLink>
        </PixelBreadcrumbItem>
        <PixelBreadcrumbSeparator />
        <PixelBreadcrumbItem>
          <PixelBreadcrumbPage>Breadcrumb</PixelBreadcrumbPage>
        </PixelBreadcrumbItem>
      </PixelBreadcrumbList>
    </PixelBreadcrumb>
  ),

  bubble: () => (
    <div className="space-y-2">
      <PixelBubble side="left">Hey! How are you?</PixelBubble>
      <PixelBubble side="right" variant="default">I am great, thanks!</PixelBubble>
      <PixelBubble side="left" variant="secondary">Wanna build something?</PixelBubble>
    </div>
  ),

  button: () => (
    <div className="flex flex-wrap gap-3">
      <PixelButton>Default</PixelButton>
      <PixelButton variant="secondary">Secondary</PixelButton>
      <PixelButton variant="destructive">Destructive</PixelButton>
      <PixelButton variant="outline">Outline</PixelButton>
      <PixelButton variant="ghost">Ghost</PixelButton>
      <PixelButton variant="link">Link</PixelButton>
      <PixelButton size="sm">Small</PixelButton>
      <PixelButton size="lg">Large</PixelButton>
      <PixelButton size="icon"><Star className="h-4 w-4" /></PixelButton>
    </div>
  ),

  "button-group": () => (
    <PixelButtonGroup>
      <PixelButton variant="outline">Left</PixelButton>
      <PixelButton variant="outline">Middle</PixelButton>
      <PixelButton variant="outline">Right</PixelButton>
    </PixelButtonGroup>
  ),

  calendar: () => (
    <div className="border-[length:var(--pixel-line,2px)] border-foreground p-2 inline-block">
      <PixelCalendar mode="single" />
    </div>
  ),

  card: () => (
    <PixelCard className="w-full max-w-sm">
      <PixelCardHeader>
        <PixelCardTitle>Create project</PixelCardTitle>
        <PixelCardDescription>Deploy your new project in one-click.</PixelCardDescription>
      </PixelCardHeader>
      <PixelCardContent>
        <PixelInput placeholder="Project name" />
      </PixelCardContent>
      <PixelCardFooter className="flex justify-between">
        <PixelButton variant="ghost" size="sm">Cancel</PixelButton>
        <PixelButton size="sm">Deploy</PixelButton>
      </PixelCardFooter>
    </PixelCard>
  ),

  carousel: () => (
    <PixelCarousel className="w-full max-w-xs">
      <PixelCarouselContent>
        {[1, 2, 3].map((n) => (
          <PixelCarouselItem key={n}>
            <div className="flex aspect-video items-center justify-center border-[length:var(--pixel-line,2px)] border-foreground bg-muted">
              <span className="text-xs uppercase tracking-widest">Slide {n}</span>
            </div>
          </PixelCarouselItem>
        ))}
      </PixelCarouselContent>
      <PixelCarouselPrevious />
      <PixelCarouselNext />
    </PixelCarousel>
  ),

  chart: () => (
    <ChartContainer config={chartConfig} className="min-h-[200px]">
      <BarChart data={chartData}>
        <XAxis dataKey="month" />
        <Bar dataKey="desktop" fill="var(--primary)" />
        <ChartTooltip />
      </BarChart>
    </ChartContainer>
  ),

  checkbox: () => (
    <CheckboxDemo />
  ),

  collapsible: () => (
    <CollapsibleDemo />
  ),

  combobox: () => (
    <ComboboxDemo />
  ),

  command: () => (
    <div className="w-full max-w-sm border-[length:var(--pixel-line,2px)] border-foreground bg-popover p-2">
      <div className="flex items-center border-b-[length:var(--pixel-line,2px)] border-foreground px-2 pb-2">
        <Search className="mr-2 h-4 w-4 opacity-50" strokeWidth={3} />
        <input placeholder="Type a command..." className="h-8 w-full bg-transparent text-xs outline-none" />
      </div>
      <div className="pt-2 text-xs">
        <div className="px-2 py-1.5 hover:bg-accent cursor-pointer">Calendar</div>
        <div className="px-2 py-1.5 hover:bg-accent cursor-pointer">Search Emoji</div>
        <div className="px-2 py-1.5 hover:bg-accent cursor-pointer">Calculator</div>
      </div>
    </div>
  ),

  "context-menu": () => (
    <PixelContextMenu>
      <PixelContextMenuTrigger className="flex h-[100px] w-full max-w-xs items-center justify-center border-[length:var(--pixel-line,2px)] border-dashed border-foreground text-xs uppercase tracking-widest">
        Right click here
      </PixelContextMenuTrigger>
      <PixelContextMenuContent>
        <PixelContextMenuItem>Back</PixelContextMenuItem>
        <PixelContextMenuItem>Forward</PixelContextMenuItem>
        <PixelContextMenuItem>Reload</PixelContextMenuItem>
      </PixelContextMenuContent>
    </PixelContextMenu>
  ),

  "data-table": () => <DataTableDemo />,

  "date-picker": () => (
    <DatePickerDemo />
  ),

  dialog: () => (
    <PixelDialog>
      <PixelDialogTrigger asChild>
        <PixelButton variant="outline">Open Dialog</PixelButton>
      </PixelDialogTrigger>
      <PixelDialogContent>
        <PixelDialogHeader>
          <PixelDialogTitle>Edit profile</PixelDialogTitle>
          <PixelDialogDescription>Make changes to your profile here.</PixelDialogDescription>
        </PixelDialogHeader>
        <div className="grid gap-4 py-4">
          <PixelInput placeholder="Name" />
          <PixelInput placeholder="Username" />
        </div>
        <div className="flex justify-end">
          <PixelButton size="sm">Save changes</PixelButton>
        </div>
      </PixelDialogContent>
    </PixelDialog>
  ),

  direction: () => (
    <PixelDirectionProvider dir="ltr">
      <div className="text-xs">Direction: LTR (provider active)</div>
    </PixelDirectionProvider>
  ),

  drawer: () => (
    <PixelDrawer>
      <PixelDrawerTrigger asChild>
        <PixelButton variant="outline">Open Drawer</PixelButton>
      </PixelDrawerTrigger>
      <PixelDrawerContent>
        <PixelDrawerHeader>
          <PixelDrawerTitle>Move Goal</PixelDrawerTitle>
          <PixelDrawerDescription>Set your daily activity goal.</PixelDrawerDescription>
        </PixelDrawerHeader>
        <div className="p-4"><PixelSlider defaultValue={[50]} max={100} step={1} /></div>
      </PixelDrawerContent>
    </PixelDrawer>
  ),

  "dropdown-menu": () => (
    <PixelDropdownMenu>
      <PixelDropdownMenuTrigger asChild>
        <PixelButton variant="outline">Open Menu</PixelButton>
      </PixelDropdownMenuTrigger>
      <PixelDropdownMenuContent>
        <PixelDropdownMenuLabel>My Account</PixelDropdownMenuLabel>
        <PixelDropdownMenuSeparator />
        <PixelDropdownMenuItem>Profile</PixelDropdownMenuItem>
        <PixelDropdownMenuItem>Billing</PixelDropdownMenuItem>
        <PixelDropdownMenuItem>Settings</PixelDropdownMenuItem>
      </PixelDropdownMenuContent>
    </PixelDropdownMenu>
  ),

  empty: () => (
    <PixelEmpty className="w-full max-w-sm">
      <PixelEmptyHeader>
        <PixelEmptyMedia variant="icon"><Bell /></PixelEmptyMedia>
        <PixelEmptyTitle>No notifications</PixelEmptyTitle>
        <PixelEmptyDescription>You are all caught up. Check back later.</PixelEmptyDescription>
      </PixelEmptyHeader>
      <PixelEmptyContent>
        <PixelButton size="sm">Enable notifications</PixelButton>
      </PixelEmptyContent>
    </PixelEmpty>
  ),

  field: () => (
    <PixelFieldGroup className="w-full max-w-sm">
      <PixelField>
        <PixelFieldLabel>Username</PixelFieldLabel>
        <PixelInput placeholder="shadcn" />
      </PixelField>
      <PixelField>
        <PixelFieldLabel>Email</PixelFieldLabel>
        <PixelInput type="email" placeholder="you@example.com" />
      </PixelField>
    </PixelFieldGroup>
  ),

  "hover-card": () => (
    <PixelHoverCard>
      <PixelHoverCardTrigger asChild>
        <PixelButton variant="link">@pixelcn</PixelButton>
      </PixelHoverCardTrigger>
      <PixelHoverCardContent>
        <div className="text-xs">The pixel art component library. Built with React + Tailwind.</div>
      </PixelHoverCardContent>
    </PixelHoverCard>
  ),

  input: () => (
    <div className="space-y-3 w-full max-w-sm">
      <PixelInput placeholder="Email" />
      <PixelInput placeholder="Disabled" disabled />
      <PixelInput placeholder="With icon" />
    </div>
  ),

  "input-group": () => (
    <PixelInputGroup className="max-w-sm">
      <PixelInputGroupAddon>https://</PixelInputGroupAddon>
      <PixelInputGroupInput placeholder="example.com" />
    </PixelInputGroup>
  ),

  "input-otp": () => (
    <PixelInputOTP maxLength={6}>
      <PixelInputOTPGroup>
        <PixelInputOTPSlot index={0} />
        <PixelInputOTPSlot index={1} />
        <PixelInputOTPSlot index={2} />
      </PixelInputOTPGroup>
      <PixelInputOTPGroup>
        <PixelInputOTPSlot index={3} />
        <PixelInputOTPSlot index={4} />
        <PixelInputOTPSlot index={5} />
      </PixelInputOTPGroup>
    </PixelInputOTP>
  ),

  item: () => (
    <PixelItem variant="outline" className="w-full max-w-sm">
      <PixelItemMedia variant="icon"><Bell /></PixelItemMedia>
      <PixelItemContent>
        <PixelItemTitle>Notification</PixelItemTitle>
        <PixelItemDescription>You have a new message.</PixelItemDescription>
      </PixelItemContent>
      <PixelItemActions>
        <PixelButton size="sm" variant="outline">View</PixelButton>
      </PixelItemActions>
    </PixelItem>
  ),

  kbd: () => (
    <div className="flex flex-wrap gap-2">
      <PixelKbdGroup>
        <PixelKbd>Ctrl</PixelKbd>
        <PixelKbd>B</PixelKbd>
      </PixelKbdGroup>
      <PixelKbdGroup>
        <PixelKbd>Ctrl</PixelKbd>
        <PixelKbd>K</PixelKbd>
      </PixelKbdGroup>
    </div>
  ),

  label: () => (
    <div className="grid gap-2 w-full max-w-sm">
      <PixelLabel htmlFor="demo-input">Email</PixelLabel>
      <PixelInput id="demo-input" placeholder="Email" />
    </div>
  ),

  marker: () => (
    <div className="space-y-2 text-sm">
      <div>This is <PixelMarker>highlighted</PixelMarker> text.</div>
      <div>This is <PixelMarker variant="underline">underlined</PixelMarker> text.</div>
      <div>This is <PixelMarker variant="strike">struck through</PixelMarker> text.</div>
    </div>
  ),

  menubar: () => (
    <PixelMenubar className="w-full max-w-xs">
      <PixelMenubarMenu>
        <PixelMenubarTrigger>File</PixelMenubarTrigger>
        <PixelMenubarContent>
          <PixelMenubarItem>New Tab</PixelMenubarItem>
          <PixelMenubarItem>New Window</PixelMenubarItem>
          <PixelMenubarSeparator />
          <PixelMenubarItem>Share</PixelMenubarItem>
        </PixelMenubarContent>
      </PixelMenubarMenu>
      <PixelMenubarMenu>
        <PixelMenubarTrigger>Edit</PixelMenubarTrigger>
        <PixelMenubarContent>
          <PixelMenubarItem>Undo</PixelMenubarItem>
          <PixelMenubarItem>Redo</PixelMenubarItem>
        </PixelMenubarContent>
      </PixelMenubarMenu>
    </PixelMenubar>
  ),

  message: () => (
    <div className="space-y-3 w-full">
      <PixelMessage>
        <PixelMessageContent>
          <div className="text-xs font-bold">shadcn</div>
          <div className="text-xs text-muted-foreground">How is the pixel library coming along?</div>
        </PixelMessageContent>
      </PixelMessage>
      <PixelMessage align="end">
        <PixelMessageContent>
          <div className="text-xs font-bold text-right">You</div>
          <div className="text-xs text-muted-foreground">Almost done! 62 components.</div>
        </PixelMessageContent>
      </PixelMessage>
    </div>
  ),

  "message-scroller": () => (
    <PixelMessageScroller className="h-[150px] w-full max-w-sm border-[length:var(--pixel-line,2px)] border-foreground p-3">
      {Array.from({ length: 10 }).map((_, i) => (
        <PixelMessage key={i} variant="flat">
          <PixelMessageContent>
            <div className="text-xs">Message {i + 1} — scroll to see the button appear.</div>
          </PixelMessageContent>
        </PixelMessage>
      ))}
    </PixelMessageScroller>
  ),

  "native-select": () => (
    <PixelNativeSelect className="max-w-sm">
      <PixelNativeSelectOption value="">Select a fruit</PixelNativeSelectOption>
      <PixelNativeSelectOption value="apple">Apple</PixelNativeSelectOption>
      <PixelNativeSelectOption value="banana">Banana</PixelNativeSelectOption>
      <PixelNativeSelectOption value="blueberry">Blueberry</PixelNativeSelectOption>
    </PixelNativeSelect>
  ),

  "navigation-menu": () => (
    <NavigationMenuDemo />
  ),

  popover: () => (
    <PixelPopover>
      <PixelPopoverTrigger asChild>
        <PixelButton variant="outline">Open popover</PixelButton>
      </PixelPopoverTrigger>
      <PixelPopoverContent>
        <div className="text-xs">Place content for the popover here.</div>
      </PixelPopoverContent>
    </PixelPopover>
  ),

  progress: () => (
    <div className="space-y-3 w-full max-w-sm">
      <PixelProgress value={33} />
      <PixelProgress value={66} />
      <PixelProgress value={100} />
    </div>
  ),

  questionnaire: () => (
    <PixelQuestionnaire questions={questions} onSubmit={(a) => console.log(a)} />
  ),

  "radio-group": () => (
    <RadioGroupDemo />
  ),

  resizable: () => (
    <RPG className="min-h-[150px] w-full max-w-sm border-[length:var(--pixel-line,2px)] border-foreground">
      <RP defaultSize={50}>
        <div className="flex h-full items-center justify-center p-3 text-xs">One</div>
      </RP>
      <RH withHandle />
      <RP defaultSize={50}>
        <div className="flex h-full items-center justify-center p-3 text-xs">Two</div>
      </RP>
    </RPG>
  ),

  "scroll-area": () => (
    <PixelScrollArea className="h-40 w-full max-w-sm border-[length:var(--pixel-line,2px)] border-foreground p-3">
      <div className="space-y-2">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="text-xs">Scroll item {i + 1}</div>
        ))}
      </div>
    </PixelScrollArea>
  ),

  select: () => (
    <SelectDemo />
  ),

  separator: () => (
    <div className="w-full max-w-sm space-y-3">
      <div className="text-xs">Above</div>
      <PixelSeparator />
      <div className="text-xs">Below</div>
    </div>
  ),

  sheet: () => (
    <PixelSheet>
      <PixelSheetTrigger asChild>
        <PixelButton variant="outline">Open sheet</PixelButton>
      </PixelSheetTrigger>
      <PixelSheetContent>
        <PixelSheetHeader>
          <PixelSheetTitle>Edit profile</PixelSheetTitle>
          <PixelSheetDescription>Make changes and save.</PixelSheetDescription>
        </PixelSheetHeader>
        <div className="grid gap-4 py-4">
          <PixelInput placeholder="Name" />
          <PixelInput placeholder="Username" />
        </div>
      </PixelSheetContent>
    </PixelSheet>
  ),

  sidebar: () => (
    <PixelSidebarProvider>
      <PixelSidebar className="border-r-0">
        <PixelSidebarHeader>
          <div className="text-xs uppercase tracking-widest">64pixelcn</div>
        </PixelSidebarHeader>
        <PixelSidebarContent>
          <PixelSidebarGroup>
            <PixelSidebarGroupLabel>Navigation</PixelSidebarGroupLabel>
            <PixelSidebarGroupContent>
              <PixelSidebarMenu>
                <PixelSidebarMenuItem>
                  <PixelSidebarMenuButton isActive><Settings className="h-4 w-4" /> Settings</PixelSidebarMenuButton>
                </PixelSidebarMenuItem>
                <PixelSidebarMenuItem>
                  <PixelSidebarMenuButton><User className="h-4 w-4" /> Profile</PixelSidebarMenuButton>
                </PixelSidebarMenuItem>
              </PixelSidebarMenu>
            </PixelSidebarGroupContent>
          </PixelSidebarGroup>
        </PixelSidebarContent>
        <PixelSidebarFooter className="text-[0.7rem] text-muted-foreground">v0.1.0</PixelSidebarFooter>
      </PixelSidebar>
      <PixelSidebarInset className="border-0">
        <div className="p-4">
          <PixelSidebarTrigger />
        </div>
      </PixelSidebarInset>
    </PixelSidebarProvider>
  ),

  skeleton: () => (
    <div className="flex items-center gap-4 w-full max-w-sm">
      <PixelSkeleton className="h-12 w-12" />
      <div className="space-y-2 flex-1">
        <PixelSkeleton className="h-4 w-full" />
        <PixelSkeleton className="h-4 w-2/3" />
      </div>
    </div>
  ),

  slider: () => (
    <div className="w-full max-w-sm">
      <PixelSlider defaultValue={[50]} max={100} step={1} />
    </div>
  ),

  spinner: () => (
    <PixelSpinner className="h-8 w-8" />
  ),

  switch: () => (
    <SwitchDemo />
  ),

  table: () => (
    <PixelTable className="max-w-sm">
      <PixelTableCaption>A list of recent invoices.</PixelTableCaption>
      <PixelTableHeader>
        <PixelTableRow>
          <PixelTableHead>Invoice</PixelTableHead>
          <PixelTableHead>Status</PixelTableHead>
          <PixelTableHead className="text-right">Amount</PixelTableHead>
        </PixelTableRow>
      </PixelTableHeader>
      <PixelTableBody>
        <PixelTableRow>
          <PixelTableCell>INV001</PixelTableCell>
          <PixelTableCell>Paid</PixelTableCell>
          <PixelTableCell className="text-right">$250.00</PixelTableCell>
        </PixelTableRow>
        <PixelTableRow>
          <PixelTableCell>INV002</PixelTableCell>
          <PixelTableCell>Pending</PixelTableCell>
          <PixelTableCell className="text-right">$150.00</PixelTableCell>
        </PixelTableRow>
      </PixelTableBody>
    </PixelTable>
  ),

  tabs: () => (
    <PixelTabs defaultValue="account" className="w-full max-w-sm">
      <PixelTabsList>
        <PixelTabsTrigger value="account">Account</PixelTabsTrigger>
        <PixelTabsTrigger value="password">Password</PixelTabsTrigger>
      </PixelTabsList>
      <PixelTabsContent value="account" className="text-xs">Account settings.</PixelTabsContent>
      <PixelTabsContent value="password" className="text-xs">Change your password.</PixelTabsContent>
    </PixelTabs>
  ),

  textarea: () => (
    <PixelTextarea placeholder="Type your message here." className="max-w-sm" />
  ),

  toggle: () => (
    <div className="flex gap-3">
      <PixelToggle aria-label="Toggle bold"><Star className="h-4 w-4" /></PixelToggle>
      <PixelToggle aria-label="Toggle italic" variant="outline"><Heart className="h-4 w-4" /></PixelToggle>
    </div>
  ),

  "toggle-group": () => (
    <PixelToggleGroup type="single">
      <PixelToggleGroupItem value="left">Left</PixelToggleGroupItem>
      <PixelToggleGroupItem value="center">Center</PixelToggleGroupItem>
      <PixelToggleGroupItem value="right">Right</PixelToggleGroupItem>
    </PixelToggleGroup>
  ),

  tooltip: () => (
    <PixelTooltipProvider>
      <PixelTooltip>
        <PixelTooltipTrigger asChild>
          <PixelButton variant="outline">Hover me</PixelButton>
        </PixelTooltipTrigger>
        <PixelTooltipContent>Add to library</PixelTooltipContent>
      </PixelTooltip>
    </PixelTooltipProvider>
  ),

  toast: () => (
    <ToastDemo />
  ),

  typography: () => (
    <div className="space-y-2 w-full">
      <PixelTypographyH1>Taxing Laughter</PixelTypographyH1>
      <PixelTypographyH2>The quick brown fox</PixelTypographyH2>
      <PixelTypographyH3>Subtitle here</PixelTypographyH3>
      <PixelTypographyP>Paragraph text in pixel font. <PixelTypographyInlineCode>npm install</PixelTypographyInlineCode></PixelTypographyP>
      <PixelTypographyBlockquote>&ldquo;Pixel perfect or nothing.&rdquo;</PixelTypographyBlockquote>
      <PixelTypographyList>
        <li>First item</li>
        <li>Second item</li>
      </PixelTypographyList>
      <PixelTypographyMuted>Muted description text.</PixelTypographyMuted>
    </div>
  ),
  "alert-dialog": () => (
    <PixelAlertDialog>
      <PixelAlertDialogTrigger asChild>
        <PixelButton variant="outline">Delete Account</PixelButton>
      </PixelAlertDialogTrigger>
      <PixelAlertDialogContent>
        <PixelAlertDialogHeader>
          <PixelAlertDialogTitle>Are you absolutely sure?</PixelAlertDialogTitle>
          <PixelAlertDialogDescription>
            This action cannot be undone. This will permanently delete your account.
          </PixelAlertDialogDescription>
        </PixelAlertDialogHeader>
        <PixelAlertDialogFooter>
          <PixelAlertDialogCancel>Cancel</PixelAlertDialogCancel>
          <PixelAlertDialogAction>Continue</PixelAlertDialogAction>
        </PixelAlertDialogFooter>
      </PixelAlertDialogContent>
    </PixelAlertDialog>
  ),

  pagination: () => (
    <PixelPagination>
      <PixelPaginationContent>
        <PixelPaginationItem><PixelPaginationPrevious href="#" /></PixelPaginationItem>
        <PixelPaginationItem><PixelPaginationLink href="#">1</PixelPaginationLink></PixelPaginationItem>
        <PixelPaginationItem><PixelPaginationLink href="#" isActive>2</PixelPaginationLink></PixelPaginationItem>
        <PixelPaginationItem><PixelPaginationLink href="#">3</PixelPaginationLink></PixelPaginationItem>
        <PixelPaginationItem><PixelPaginationEllipsis /></PixelPaginationItem>
        <PixelPaginationItem><PixelPaginationNext href="#" /></PixelPaginationItem>
      </PixelPaginationContent>
    </PixelPagination>
  ),

  "health-bar": () => <HealthBarDemo />,
  "mana-bar": () => <ManaBarDemo />,
  "xp-bar": () => <XpBarDemo />,
  "enemy-health-display": () => <EnemyHealthDemo />,
  "retro-mode-switcher": () => <RetroModeDemo />,
  "theme-selector": () => <ThemeSelectorDemo />,

  ...gameDemos,
};

// ─── Demos interativos ───────────────────────────────────────────
function CheckboxDemo() {
  const [checked, setChecked] = React.useState(true);
  return (
    <div className="flex items-center gap-2">
      <PixelCheckbox id="terms" checked={checked} onCheckedChange={(v) => setChecked(v === true)} />
      <PixelLabel htmlFor="terms">Accept terms and conditions</PixelLabel>
    </div>
  );
}

function SwitchDemo() {
  const [enabled, setEnabled] = React.useState(false);
  return (
    <div className="flex items-center gap-3">
      <PixelSwitch id="airplane" checked={enabled} onCheckedChange={setEnabled} />
      <PixelLabel htmlFor="airplane">Airplane Mode</PixelLabel>
    </div>
  );
}

function RadioGroupDemo() {
  const [value, setValue] = React.useState("comfortable");
  return (
    <PixelRadioGroup value={value} onValueChange={setValue} className="w-full max-w-sm">
      <div className="flex items-center gap-2">
        <PixelRadioGroupItem value="default" id="r1" />
        <PixelLabel htmlFor="r1">Default</PixelLabel>
      </div>
      <div className="flex items-center gap-2">
        <PixelRadioGroupItem value="comfortable" id="r2" />
        <PixelLabel htmlFor="r2">Comfortable</PixelLabel>
      </div>
      <div className="flex items-center gap-2">
        <PixelRadioGroupItem value="compact" id="r3" />
        <PixelLabel htmlFor="r3">Compact</PixelLabel>
      </div>
    </PixelRadioGroup>
  );
}

function CollapsibleDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <PixelCollapsible open={open} onOpenChange={setOpen} className="w-full max-w-sm">
      <div className="flex items-center justify-between border-[length:var(--pixel-line,2px)] border-foreground px-3 py-2">
        <span className="text-xs">@peduarte starred 3 repositories</span>
        <PixelButton variant="ghost" size="sm" onClick={() => setOpen(!open)}>
          <ChevronDown className={"h-4 w-4 transition-transform " + (open ? "rotate-180" : "")} />
        </PixelButton>
      </div>
      <PixelCollapsibleContent className="space-y-2 pt-2">
        <div className="border-[length:var(--pixel-line,2px)] border-foreground px-3 py-2 text-xs">@radix-ui/primitives</div>
        <div className="border-[length:var(--pixel-line,2px)] border-foreground px-3 py-2 text-xs">@radix-ui/colors</div>
        <div className="border-[length:var(--pixel-line,2px)] border-foreground px-3 py-2 text-xs">@stitches/react</div>
      </PixelCollapsibleContent>
    </PixelCollapsible>
  );
}

function ComboboxDemo() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const frameworks = [
    { value: "next", label: "Next.js" },
    { value: "svelte", label: "SvelteKit" },
    { value: "nuxt", label: "Nuxt.js" },
    { value: "remix", label: "Remix" },
    { value: "astro", label: "Astro" },
  ];
  const [selected, setSelected] = React.useState("");

  return (
    <PixelPopover open={open} onOpenChange={setOpen}>
      <PixelPopoverTrigger asChild>
        <PixelButton variant="outline" role="combobox" aria-expanded={open} className="w-full min-w-0 max-w-sm justify-between">
          <span className="truncate">{selected ? frameworks.find((f) => f.value === selected)?.label : "Select framework..."}</span>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" strokeWidth={3} />
        </PixelButton>
      </PixelPopoverTrigger>
      <PixelPopoverContent className="w-full max-w-sm p-0">
        <div className="flex items-center border-b-[length:var(--pixel-line,2px)] border-foreground px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" strokeWidth={3} />
          <input
            placeholder="Search framework..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="h-10 w-full bg-transparent text-xs outline-none"
          />
        </div>
        <div className="max-h-[200px] overflow-y-auto p-1">
          {frameworks
            .filter((f) => f.label.toLowerCase().includes(value.toLowerCase()))
            .map((f) => (
              <div
                key={f.value}
                onClick={() => { setSelected(f.value); setOpen(false); setValue(""); }}
                className="flex cursor-pointer items-center gap-2 px-2 py-1.5 text-xs hover:bg-accent"
              >
                <Check className={"h-4 w-4 " + (selected === f.value ? "opacity-100" : "opacity-0")} strokeWidth={3} />
                {f.label}
              </div>
            ))}
        </div>
      </PixelPopoverContent>
    </PixelPopover>
  );
}

function SelectDemo() {
  const [value, setValue] = React.useState("");
  return (
    <PixelSelect value={value} onValueChange={setValue}>
      <PixelSelectTrigger className="max-w-sm">
        <PixelSelectValue placeholder="Select a fruit" />
      </PixelSelectTrigger>
      <PixelSelectContent>
        <PixelSelectItem value="apple">Apple</PixelSelectItem>
        <PixelSelectItem value="banana">Banana</PixelSelectItem>
        <PixelSelectItem value="blueberry">Blueberry</PixelSelectItem>
        <PixelSelectItem value="grapes">Grapes</PixelSelectItem>
        <PixelSelectItem value="pineapple">Pineapple</PixelSelectItem>
      </PixelSelectContent>
    </PixelSelect>
  );
}

function DatePickerDemo() {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  return (
    <PixelDatePicker
      date={date}
      onDateChange={setDate}
      placeholder="Pick a date"
      className="max-w-sm"
    />
  );
}

function DataTableDemo() {
  // Simplified static demo - avoids tanstack v9 API complexity
  const fakeTable = {
    getHeaderGroups: () => [{
      id: "h1",
      headers: columns.map((col, i) => ({
        id: `h${i}`,
        isPlaceholder: false,
        column: { columnDef: { header: col.header } },
        getContext: () => ({}),
      })),
    }],
    getRowModel: () => ({
      rows: users.map((user) => ({
        id: user.id,
        getIsSelected: () => false,
        getVisibleCells: () => columns.map((col, i) => ({
          id: `c${i}`,
          column: { columnDef: { cell: () => (user as Record<string, string>)[col.accessorKey ?? ""] } },
          getContext: () => ({}),
        })),
      })),
    }),
    getFilteredSelectedRowModel: () => ({ rows: [] }),
    getFilteredRowModel: () => ({ rows: users }),
    getState: () => ({ pagination: { pageIndex: 0, pageSize: 10 } }),
    getPageCount: () => 1,
    setPageSize: () => {},
    previousPage: () => {},
    nextPage: () => {},
    getCanPreviousPage: () => false,
    getCanNextPage: () => false,
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <PixelDataTable table={fakeTable as any} columns={columns} />;
}

// ─── Gaming demos ───────────────────────────────────────────────
function HealthBarDemo() {
  const [hp, setHp] = React.useState(72);
  return (
    <div className="w-full max-w-xs space-y-3">
      <PixelHealthBar value={hp} showIcon />
      <div className="flex gap-2">
        <PixelButton size="sm" variant="destructive" onClick={() => setHp(Math.max(0, hp - 25))}>-25</PixelButton>
        <PixelButton size="sm" onClick={() => setHp(Math.min(100, hp + 25))}>+25</PixelButton>
      </div>
    </div>
  );
}

function ManaBarDemo() {
  const [mp, setMp] = React.useState(45);
  return (
    <div className="w-full max-w-xs space-y-3">
      <PixelManaBar value={mp} showIcon />
      <div className="flex gap-2">
        <PixelButton size="sm" variant="outline" onClick={() => setMp(Math.max(0, mp - 20))}>Cast</PixelButton>
        <PixelButton size="sm" onClick={() => setMp(Math.min(100, mp + 20))}>Restore</PixelButton>
      </div>
    </div>
  );
}

function XpBarDemo() {
  return <PixelXpBar value={65} level={7} showIcon className="max-w-xs" />;
}

function EnemyHealthDemo() {
  return <PixelEnemyHealthDisplay name="Dark Lord" level={42} value={8} max={100} segments={12} className="max-w-xs" />;
}

function RetroModeDemo() {
  const [on, setOn] = React.useState(true);
  return <PixelRetroModeSwitcher checked={on} onCheckedChange={setOn} />;
}

function ThemeSelectorDemo() {
  const [theme, setTheme] = React.useState("nintendo");
  return <PixelThemeSelector value={theme} onValueChange={setTheme} className="max-w-sm" />;
}

// ─── Navigation menu demo ─────────────────────────────────────
function NavigationMenuDemo() {
  return (
    <PixelNavigationMenu className="w-full">
      <PixelNavigationMenuList>
        <PixelNavigationMenuItem>
          <PixelNavigationMenuTrigger>Getting started</PixelNavigationMenuTrigger>
          <PixelNavigationMenuContent>
            <ul className="grid w-[min(400px,calc(100vw-3rem))] gap-1 p-2">
              <li>
                <PixelNavigationMenuLink asChild>
                  <a
                    href="#"
                    className="block select-none border-[length:var(--pixel-line,2px)] border-transparent p-2 leading-none no-underline outline-none transition-colors hover:border-foreground hover:bg-accent"
                  >
                    <div className="text-xs uppercase tracking-widest">Introduction</div>
                    <p className="text-[0.7rem] leading-snug text-muted-foreground">Re-usable pixel components.</p>
                  </a>
                </PixelNavigationMenuLink>
              </li>
              <li>
                <PixelNavigationMenuLink asChild>
                  <a
                    href="#"
                    className="block select-none border-[length:var(--pixel-line,2px)] border-transparent p-2 leading-none no-underline outline-none transition-colors hover:border-foreground hover:bg-accent"
                  >
                    <div className="text-xs uppercase tracking-widest">Installation</div>
                    <p className="text-[0.7rem] leading-snug text-muted-foreground">How to install via the CLI.</p>
                  </a>
                </PixelNavigationMenuLink>
              </li>
              <li>
                <PixelNavigationMenuLink asChild>
                  <a
                    href="#"
                    className="block select-none border-[length:var(--pixel-line,2px)] border-transparent p-2 leading-none no-underline outline-none transition-colors hover:border-foreground hover:bg-accent"
                  >
                    <div className="text-xs uppercase tracking-widest">Typography</div>
                    <p className="text-[0.7rem] leading-snug text-muted-foreground">Styles for headings and text.</p>
                  </a>
                </PixelNavigationMenuLink>
              </li>
            </ul>
          </PixelNavigationMenuContent>
        </PixelNavigationMenuItem>

        <PixelNavigationMenuItem>
          <PixelNavigationMenuTrigger>Components</PixelNavigationMenuTrigger>
          <PixelNavigationMenuContent>
            <ul className="grid w-[min(500px,calc(100vw-3rem))] grid-cols-1 sm:grid-cols-2 gap-1 p-2">
              {[
                { title: "Alert Dialog", desc: "Modal confirmation dialogs" },
                { title: "Hover Card", desc: "Preview cards on hover" },
                { title: "Progress", desc: "Progress indicators" },
                { title: "Scroll Area", desc: "Custom scrollable regions" },
                { title: "Tabs", desc: "Tabbed content sections" },
                { title: "Tooltip", desc: "Hover information popups" },
              ].map((c) => (
                <li key={c.title}>
                  <PixelNavigationMenuLink asChild>
                    <a
                      href="#"
                      className="block select-none border-[length:var(--pixel-line,2px)] border-transparent p-2 leading-none no-underline outline-none transition-colors hover:border-foreground hover:bg-accent"
                    >
                      <div className="text-xs uppercase tracking-widest">{c.title}</div>
                      <p className="text-[0.7rem] leading-snug text-muted-foreground">{c.desc}</p>
                    </a>
                  </PixelNavigationMenuLink>
                </li>
              ))}
            </ul>
          </PixelNavigationMenuContent>
        </PixelNavigationMenuItem>

        <PixelNavigationMenuItem>
          <PixelNavigationMenuLink href="#" className="group inline-flex h-10 items-center justify-center px-4 py-2 text-xs uppercase tracking-widest transition-colors hover:bg-accent">
            Blocks
          </PixelNavigationMenuLink>
        </PixelNavigationMenuItem>

        <PixelNavigationMenuItem>
          <PixelNavigationMenuLink href="#" className="group inline-flex h-10 items-center justify-center px-4 py-2 text-xs uppercase tracking-widest transition-colors hover:bg-accent">
            Docs
          </PixelNavigationMenuLink>
        </PixelNavigationMenuItem>
      </PixelNavigationMenuList>
    </PixelNavigationMenu>
  );
}

// ─── Toast demo ───────────────────────────────────────────────
function ToastDemo() {
  const [openDefault, setOpenDefault] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);

  return (
    <PixelToastProvider swipeDirection="right">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <PixelButton variant="outline" size="sm" onClick={() => setOpenDefault(true)}>
          Show Toast
        </PixelButton>
        <PixelButton variant="outline" size="sm" onClick={() => setOpenSuccess(true)}>
          Success
        </PixelButton>
        <PixelButton variant="destructive" size="sm" onClick={() => setOpenError(true)}>
          Error
        </PixelButton>
      </div>

      <PixelToast open={openDefault} onOpenChange={setOpenDefault}>
        <div className="grid gap-1">
          <PixelToastTitle>Scheduled: Catch up</PixelToastTitle>
          <PixelToastDescription>Friday, February 10, 2024 at 5:57 PM</PixelToastDescription>
        </div>
        <PixelToastAction altText="Try again">Try again</PixelToastAction>
      </PixelToast>

      <PixelToast variant="success" open={openSuccess} onOpenChange={setOpenSuccess}>
        <div className="grid gap-1">
          <PixelToastTitle>Success</PixelToastTitle>
          <PixelToastDescription>Your changes have been saved.</PixelToastDescription>
        </div>
        <PixelToastClose />
      </PixelToast>

      <PixelToast variant="destructive" open={openError} onOpenChange={setOpenError}>
        <div className="grid gap-1">
          <PixelToastTitle>Error</PixelToastTitle>
          <PixelToastDescription>Something went wrong. Please retry.</PixelToastDescription>
        </div>
        <PixelToastAction altText="Try again">Try again</PixelToastAction>
      </PixelToast>

      <PixelToastViewport />
    </PixelToastProvider>
  );
}
