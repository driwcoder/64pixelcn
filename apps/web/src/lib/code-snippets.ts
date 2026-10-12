/**
 * Code snippets for each component — shown in the "Code" tab.
 * Mirrors shadcn/ui and 8bitcn usage examples.
 */

export const codeSnippets: Record<string, string> = {
  "button": `import { PixelButton } from "@/components/ui/button"

export function ButtonDemo() {
  return <PixelButton>Button</PixelButton>
}`,

  "card": `import {
  PixelCard,
  PixelCardContent,
  PixelCardDescription,
  PixelCardFooter,
  PixelCardHeader,
  PixelCardTitle,
} from "@/components/ui/card"

export function CardDemo() {
  return (
    <PixelCard>
      <PixelCardHeader>
        <PixelCardTitle>Card Title</PixelCardTitle>
        <PixelCardDescription>Card Description</PixelCardDescription>
      </PixelCardHeader>
      <PixelCardContent>
        <p>Card Content</p>
      </PixelCardContent>
      <PixelCardFooter>
        <p>Card Footer</p>
      </PixelCardFooter>
    </PixelCard>
  )
}`,

  "input": `import { PixelInput } from "@/components/ui/input"

export function InputDemo() {
  return <PixelInput type="email" placeholder="Email" />
}`,

  "textarea": `import { PixelTextarea } from "@/components/ui/textarea"

export function TextareaDemo() {
  return <PixelTextarea placeholder="Type your message here." />
}`,

  "checkbox": `import { PixelCheckbox } from "@/components/ui/checkbox"
import { PixelLabel } from "@/components/ui/label"

export function CheckboxDemo() {
  return (
    <div className="flex items-center gap-3">
      <PixelCheckbox id="terms" />
      <PixelLabel htmlFor="terms">Accept terms and conditions</PixelLabel>
    </div>
  )
}`,

  "switch": `import { PixelSwitch } from "@/components/ui/switch"
import { PixelLabel } from "@/components/ui/label"

export function SwitchDemo() {
  return (
    <div className="flex items-center gap-3">
      <PixelSwitch id="airplane-mode" />
      <PixelLabel htmlFor="airplane-mode">Airplane Mode</PixelLabel>
    </div>
  )
}`,

  "radio-group": `import { PixelLabel } from "@/components/ui/label"
import { PixelRadioGroup, PixelRadioGroupItem } from "@/components/ui/radio-group"

export function RadioGroupDemo() {
  return (
    <PixelRadioGroup defaultValue="comfortable">
      <div className="flex items-center gap-3">
        <PixelRadioGroupItem value="default" id="r1" />
        <PixelLabel htmlFor="r1">Default</PixelLabel>
      </div>
      <div className="flex items-center gap-3">
        <PixelRadioGroupItem value="comfortable" id="r2" />
        <PixelLabel htmlFor="r2">Comfortable</PixelLabel>
      </div>
      <div className="flex items-center gap-3">
        <PixelRadioGroupItem value="compact" id="r3" />
        <PixelLabel htmlFor="r3">Compact</PixelLabel>
      </div>
    </PixelRadioGroup>
  )
}`,

  "select": `import {
  PixelSelect,
  PixelSelectContent,
  PixelSelectItem,
  PixelSelectTrigger,
  PixelSelectValue,
} from "@/components/ui/select"

export function SelectDemo() {
  return (
    <PixelSelect>
      <PixelSelectTrigger className="w-[180px]">
        <PixelSelectValue placeholder="Theme" />
      </PixelSelectTrigger>
      <PixelSelectContent>
        <PixelSelectItem value="light">Light</PixelSelectItem>
        <PixelSelectItem value="dark">Dark</PixelSelectItem>
        <PixelSelectItem value="system">System</PixelSelectItem>
      </PixelSelectContent>
    </PixelSelect>
  )
}`,

  "native-select": `import {
  PixelNativeSelect,
  PixelNativeSelectOption,
} from "@/components/ui/native-select"

export function NativeSelectDemo() {
  return (
    <PixelNativeSelect>
      <PixelNativeSelectOption value="">Select a fruit</PixelNativeSelectOption>
      <PixelNativeSelectOption value="apple">Apple</PixelNativeSelectOption>
      <PixelNativeSelectOption value="banana">Banana</PixelNativeSelectOption>
    </PixelNativeSelect>
  )
}`,

  "label": `import { PixelInput } from "@/components/ui/input"
import { PixelLabel } from "@/components/ui/label"

export function LabelDemo() {
  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <PixelLabel htmlFor="picture">Picture</PixelLabel>
      <PixelInput id="picture" type="file" />
    </div>
  )
}`,

  "field": `import { PixelInput } from "@/components/ui/input"
import {
  PixelField,
  PixelFieldGroup,
  PixelFieldLabel,
} from "@/components/ui/field"

export function FieldDemo() {
  return (
    <PixelFieldGroup>
      <PixelField>
        <PixelFieldLabel htmlFor="username">Username</PixelFieldLabel>
        <PixelInput id="username" placeholder="Max Leiter" />
      </PixelField>
    </PixelFieldGroup>
  )
}`,

  "input-group": `import { Search } from "@/components/ui/icons"
import {
  PixelInputGroup,
  PixelInputGroupAddon,
  PixelInputGroupInput,
} from "@/components/ui/input-group"

export function InputGroupDemo() {
  return (
    <PixelInputGroup>
      <PixelInputGroupAddon>
        <Search className="h-4 w-4" />
      </PixelInputGroupAddon>
      <PixelInputGroupInput placeholder="Search..." />
    </PixelInputGroup>
  )
}`,

  "input-otp": `import {
  PixelInputOTP,
  PixelInputOTPGroup,
  PixelInputOTPSlot,
} from "@/components/ui/input-otp"

export function InputOTPDemo() {
  return (
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
  )
}`,

  "slider": `import { PixelSlider } from "@/components/ui/slider"

export function SliderDemo() {
  return <PixelSlider defaultValue={[50]} max={100} step={1} />
}`,

  "toggle": `import { Bold } from "@/components/ui/icons"
import { PixelToggle } from "@/components/ui/toggle"

export function ToggleDemo() {
  return (
    <PixelToggle aria-label="Toggle bold">
      <Bold className="h-4 w-4" />
    </PixelToggle>
  )
}`,

  "toggle-group": `import {
  PixelToggleGroup,
  PixelToggleGroupItem,
} from "@/components/ui/toggle-group"

export function ToggleGroupDemo() {
  return (
    <PixelToggleGroup type="single">
      <PixelToggleGroupItem value="left">Left</PixelToggleGroupItem>
      <PixelToggleGroupItem value="center">Center</PixelToggleGroupItem>
      <PixelToggleGroupItem value="right">Right</PixelToggleGroupItem>
    </PixelToggleGroup>
  )
}`,

  "calendar": `import { PixelCalendar } from "@/components/ui/calendar"

export function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(undefined)

  return (
    <PixelCalendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="border-2 border-foreground"
    />
  )
}`,

  "date-picker": `import { PixelDatePicker } from "@/components/ui/date-picker"

export function DatePickerDemo() {
  const [date, setDate] = React.useState<Date | undefined>(undefined)

  return <PixelDatePicker date={date} onDateChange={setDate} />
}`,

  "questionnaire": `import { PixelQuestionnaire, type Question } from "@/components/ui/questionnaire"

const questions: Question[] = [
  {
    id: "q1",
    title: "What is your favorite color?",
    description: "Pick the one that resonates most.",
    options: [
      { value: "red", label: "Red" },
      { value: "blue", label: "Blue" },
    ],
  },
]

export function QuestionnaireDemo() {
  return <PixelQuestionnaire questions={questions} onSubmit={(a) => console.log(a)} />
}`,

  "accordion": `import {
  PixelAccordion,
  PixelAccordionContent,
  PixelAccordionItem,
  PixelAccordionTrigger,
} from "@/components/ui/accordion"

export function AccordionDemo() {
  return (
    <PixelAccordion type="single" collapsible className="w-full">
      <PixelAccordionItem value="item-1">
        <PixelAccordionTrigger>Is it accessible?</PixelAccordionTrigger>
        <PixelAccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </PixelAccordionContent>
      </PixelAccordionItem>
    </PixelAccordion>
  )
}`,

  "collapsible": `import {
  PixelCollapsible,
  PixelCollapsibleContent,
  PixelCollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from "@/components/ui/icons"

export function CollapsibleDemo() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <PixelCollapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full max-w-sm"
    >
      <div className="flex items-center justify-between border-2 border-foreground px-3 py-2">
        <span className="text-xs">@peduarte starred 3 repositories</span>
        <PixelCollapsibleTrigger asChild>
          <button className="p-1">
            <ChevronsUpDown className="h-4 w-4" />
          </button>
        </PixelCollapsibleTrigger>
      </div>
      <PixelCollapsibleContent className="space-y-2 pt-2">
        <div className="border-2 border-foreground px-3 py-2 text-xs">@radix-ui/primitives</div>
      </PixelCollapsibleContent>
    </PixelCollapsible>
  )
}`,

  "resizable": `import {
  PixelResizableHandle,
  PixelResizablePanel,
  PixelResizablePanelGroup,
} from "@/components/ui/resizable"

export function ResizableDemo() {
  return (
    <PixelResizablePanelGroup direction="horizontal" className="min-h-[200px] border-2 border-foreground">
      <PixelResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-3 text-xs">One</div>
      </PixelResizablePanel>
      <PixelResizableHandle withHandle />
      <PixelResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-3 text-xs">Two</div>
      </PixelResizablePanel>
    </PixelResizablePanelGroup>
  )
}`,

  "separator": `import { PixelSeparator } from "@/components/ui/separator"

export function SeparatorDemo() {
  return (
    <div>
      <div className="text-xs">Above</div>
      <PixelSeparator className="my-2" />
      <div className="text-xs">Below</div>
    </div>
  )
}`,

  "scroll-area": `import { PixelScrollArea } from "@/components/ui/scroll-area"

export function ScrollAreaDemo() {
  return (
    <PixelScrollArea className="h-40 w-full border-2 border-foreground">
      <div className="p-3">
        <div className="text-xs">Scrollable content...</div>
      </div>
    </PixelScrollArea>
  )
}`,

  "aspect-ratio": `import { PixelAspectRatio } from "@/components/ui/aspect-ratio"

export function AspectRatioDemo() {
  return (
    <PixelAspectRatio ratio={16 / 9} className="bg-muted">
      <img src="..." alt="Image" className="h-full w-full object-cover" />
    </PixelAspectRatio>
  )
}`,

  "sidebar": `import {
  PixelSidebar,
  PixelSidebarContent,
  PixelSidebarGroup,
  PixelSidebarGroupContent,
  PixelSidebarGroupLabel,
  PixelSidebarMenu,
  PixelSidebarMenuButton,
  PixelSidebarMenuItem,
  PixelSidebarProvider,
} from "@/components/ui/sidebar"

export function SidebarDemo() {
  return (
    <PixelSidebarProvider>
      <PixelSidebar>
        <PixelSidebarContent>
          <PixelSidebarGroup>
            <PixelSidebarGroupLabel>Application</PixelSidebarGroupLabel>
            <PixelSidebarGroupContent>
              <PixelSidebarMenu>
                <PixelSidebarMenuItem>
                  <PixelSidebarMenuButton>Home</PixelSidebarMenuButton>
                </PixelSidebarMenuItem>
              </PixelSidebarMenu>
            </PixelSidebarGroupContent>
          </PixelSidebarGroup>
        </PixelSidebarContent>
      </PixelSidebar>
    </PixelSidebarProvider>
  )
}`,

  "breadcrumb": `import {
  PixelBreadcrumb,
  PixelBreadcrumbItem,
  PixelBreadcrumbLink,
  PixelBreadcrumbList,
  PixelBreadcrumbPage,
  PixelBreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function BreadcrumbDemo() {
  return (
    <PixelBreadcrumb>
      <PixelBreadcrumbList>
        <PixelBreadcrumbItem>
          <PixelBreadcrumbLink href="/">Home</PixelBreadcrumbLink>
        </PixelBreadcrumbItem>
        <PixelBreadcrumbSeparator />
        <PixelBreadcrumbItem>
          <PixelBreadcrumbPage>Components</PixelBreadcrumbPage>
        </PixelBreadcrumbItem>
      </PixelBreadcrumbList>
    </PixelBreadcrumb>
  )
}`,

  "navigation-menu": `import {
  PixelNavigationMenu,
  PixelNavigationMenuList,
  PixelNavigationMenuItem,
  PixelNavigationMenuLink,
  PixelNavigationMenuTrigger,
  PixelNavigationMenuContent,
} from "@/components/ui/navigation-menu"

export function NavigationMenuDemo() {
  return (
    <PixelNavigationMenu>
      <PixelNavigationMenuList>
        <PixelNavigationMenuItem>
          <PixelNavigationMenuTrigger>Getting Started</PixelNavigationMenuTrigger>
          <PixelNavigationMenuContent>
            <div className="p-2 text-xs">Introduction docs here.</div>
          </PixelNavigationMenuContent>
        </PixelNavigationMenuItem>
        <PixelNavigationMenuItem>
          <PixelNavigationMenuLink href="#">Documentation</PixelNavigationMenuLink>
        </PixelNavigationMenuItem>
      </PixelNavigationMenuList>
    </PixelNavigationMenu>
  )
}`,

  "menubar": `import {
  PixelMenubar,
  PixelMenubarContent,
  PixelMenubarItem,
  PixelMenubarMenu,
  PixelMenubarSeparator,
  PixelMenubarTrigger,
} from "@/components/ui/menubar"

export function MenubarDemo() {
  return (
    <PixelMenubar>
      <PixelMenubarMenu>
        <PixelMenubarTrigger>File</PixelMenubarTrigger>
        <PixelMenubarContent>
          <PixelMenubarItem>New Tab</PixelMenubarItem>
          <PixelMenubarSeparator />
          <PixelMenubarItem>Share</PixelMenubarItem>
        </PixelMenubarContent>
      </PixelMenubarMenu>
    </PixelMenubar>
  )
}`,

  "pagination": `import {
  PixelPagination,
  PixelPaginationContent,
  PixelPaginationLink,
  PixelPaginationNext,
  PixelPaginationPrevious,
} from "@/components/ui/pagination"

export function PaginationDemo() {
  return (
    <PixelPagination>
      <PixelPaginationContent>
        <PixelPaginationPrevious href="#" />
        <PixelPaginationLink href="#">1</PixelPaginationLink>
        <PixelPaginationLink href="#" isActive>2</PixelPaginationLink>
        <PixelPaginationNext href="#" />
      </PixelPaginationContent>
    </PixelPagination>
  )
}`,

  "tabs": `import {
  PixelTabs,
  PixelTabsContent,
  PixelTabsList,
  PixelTabsTrigger,
} from "@/components/ui/tabs"

export function TabsDemo() {
  return (
    <PixelTabs defaultValue="account" className="w-full max-w-sm">
      <PixelTabsList>
        <PixelTabsTrigger value="account">Account</PixelTabsTrigger>
        <PixelTabsTrigger value="password">Password</PixelTabsTrigger>
      </PixelTabsList>
      <PixelTabsContent value="account">Account settings.</PixelTabsContent>
      <PixelTabsContent value="password">Change your password.</PixelTabsContent>
    </PixelTabs>
  )
}`,

  "button-group": `import {
  PixelButton,
  PixelButtonGroup,
} from "@/components/ui/button-group"

export function ButtonGroupDemo() {
  return (
    <PixelButtonGroup>
      <PixelButton variant="outline">Left</PixelButton>
      <PixelButton variant="outline">Middle</PixelButton>
      <PixelButton variant="outline">Right</PixelButton>
    </PixelButtonGroup>
  )
}`,

  "alert": `import {
  PixelAlert,
  PixelAlertDescription,
  PixelAlertTitle,
} from "@/components/ui/alert"

export function AlertDemo() {
  return (
    <PixelAlert>
      <PixelAlertTitle>Heads up!</PixelAlertTitle>
      <PixelAlertDescription>This is a default pixel alert.</PixelAlertDescription>
    </PixelAlert>
  )
}`,

  "toast": `import { PixelToast, PixelToastAction, PixelToastTitle } from "@/components/ui/toast"

export function ToastDemo() {
  return (
    <PixelToast>
      <PixelToastTitle>Scheduled: Catch up</PixelToastTitle>
      <PixelToastAction altText="Try again">Try again</PixelToastAction>
    </PixelToast>
  )
}`,

  "progress": `import { PixelProgress } from "@/components/ui/progress"

export function ProgressDemo() {
  const [progress, setProgress] = React.useState(13)

  return <PixelProgress value={progress} />
}`,

  "skeleton": `import { PixelSkeleton } from "@/components/ui/skeleton"

export function SkeletonDemo() {
  return (
    <div className="flex items-center gap-4">
      <PixelSkeleton className="h-12 w-12" />
      <div className="space-y-2">
        <PixelSkeleton className="h-4 w-[250px]" />
        <PixelSkeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}`,

  "spinner": `import { PixelSpinner } from "@/components/ui/spinner"

export function SpinnerDemo() {
  return <PixelSpinner className="h-8 w-8" />
}`,

  "empty": `import { Bell } from "@/components/ui/icons"
import { PixelButton } from "@/components/ui/button"
import {
  PixelEmpty,
  PixelEmptyContent,
  PixelEmptyDescription,
  PixelEmptyHeader,
  PixelEmptyMedia,
  PixelEmptyTitle,
} from "@/components/ui/empty"

export function EmptyDemo() {
  return (
    <PixelEmpty>
      <PixelEmptyHeader>
        <PixelEmptyMedia variant="icon"><Bell /></PixelEmptyMedia>
        <PixelEmptyTitle>No notifications</PixelEmptyTitle>
        <PixelEmptyDescription>You are all caught up.</PixelEmptyDescription>
      </PixelEmptyHeader>
      <PixelEmptyContent>
        <PixelButton size="sm">Enable notifications</PixelButton>
      </PixelEmptyContent>
    </PixelEmpty>
  )
}`,

  "badge": `import { PixelBadge } from "@/components/ui/badge"

export function BadgeDemo() {
  return <PixelBadge>Badge</PixelBadge>
}`,

  "avatar": `import {
  PixelAvatar,
  PixelAvatarFallback,
  PixelAvatarImage,
} from "@/components/ui/avatar"

export function AvatarDemo() {
  return (
    <PixelAvatar>
      <PixelAvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <PixelAvatarFallback>CN</PixelAvatarFallback>
    </PixelAvatar>
  )
}`,

  "table": `import {
  PixelTable,
  PixelTableBody,
  PixelTableCaption,
  PixelTableCell,
  PixelTableHead,
  PixelTableHeader,
  PixelTableRow,
} from "@/components/ui/table"

export function TableDemo() {
  return (
    <PixelTable>
      <PixelTableCaption>A list of invoices.</PixelTableCaption>
      <PixelTableHeader>
        <PixelTableRow>
          <PixelTableHead>Invoice</PixelTableHead>
          <PixelTableHead>Status</PixelTableHead>
        </PixelTableRow>
      </PixelTableHeader>
      <PixelTableBody>
        <PixelTableRow>
          <PixelTableCell>INV001</PixelTableCell>
          <PixelTableCell>Paid</PixelTableCell>
        </PixelTableRow>
      </PixelTableBody>
    </PixelTable>
  )
}`,

  "data-table": `import {
  type ColumnDef,
  createTableHook,
  createCoreRowModel,
} from "@tanstack/react-table"
import { PixelDataTable } from "@/components/ui/data-table"

type Payment = { id: string; amount: number; status: string }

const columns: ColumnDef<Payment>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "amount", header: "Amount" },
  { accessorKey: "status", header: "Status" },
]

const data: Payment[] = [
  { id: "1", amount: 316, status: "Success" },
]

const useTable = createTableHook({ _features: {} })

export function DataTableDemo() {
  const table = useTable(
    { data, columns, getCoreRowModel: createCoreRowModel() },
    // @ts-expect-error generic
  )
  return <PixelDataTable table={table} columns={columns} />
}`,

  "chart": `import { Bar, BarChart, XAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
]

const chartConfig = {
  desktop: { label: "Desktop", color: "var(--primary)" },
} satisfies ChartConfig

export function ChartDemo() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px]">
      <BarChart data={chartData}>
        <XAxis dataKey="month" />
        <Bar dataKey="desktop" fill="var(--primary)" />
        <ChartTooltip />
      </BarChart>
    </ChartContainer>
  )
}`,

  "item": `import { Bell } from "@/components/ui/icons"
import { PixelButton } from "@/components/ui/button"
import {
  PixelItem,
  PixelItemActions,
  PixelItemContent,
  PixelItemDescription,
  PixelItemMedia,
  PixelItemTitle,
} from "@/components/ui/item"

export function ItemDemo() {
  return (
    <PixelItem variant="outline">
      <PixelItemMedia variant="icon"><Bell /></PixelItemMedia>
      <PixelItemContent>
        <PixelItemTitle>Notification</PixelItemTitle>
        <PixelItemDescription>You have a new message.</PixelItemDescription>
      </PixelItemContent>
      <PixelItemActions>
        <PixelButton size="sm" variant="outline">View</PixelButton>
      </PixelItemActions>
    </PixelItem>
  )
}`,

  "kbd": `import { PixelKbd, PixelKbdGroup } from "@/components/ui/kbd"

export function KbdDemo() {
  return (
    <PixelKbdGroup>
      <PixelKbd>Ctrl</PixelKbd>
      <PixelKbd>B</PixelKbd>
    </PixelKbdGroup>
  )
}`,

  "typography": `import {
  PixelTypographyH1,
  PixelTypographyP,
  PixelTypographyInlineCode,
} from "@/components/ui/typography"

export function TypographyDemo() {
  return (
    <div className="space-y-2">
      <PixelTypographyH1>Taxing Laughter</PixelTypographyH1>
      <PixelTypographyP>
        Use <PixelTypographyInlineCode>npm install</PixelTypographyInlineCode> to start.
      </PixelTypographyP>
    </div>
  )
}`,

  "marker": `import { PixelMarker } from "@/components/ui/marker"

export function MarkerDemo() {
  return <p className="text-sm">This is <PixelMarker>highlighted</PixelMarker> text.</p>
}`,

  "bubble": `import { PixelBubble } from "@/components/ui/bubble"

export function BubbleDemo() {
  return (
    <div className="space-y-2">
      <PixelBubble side="left">Hey! How are you?</PixelBubble>
      <PixelBubble side="right">I am great, thanks!</PixelBubble>
    </div>
  )
}`,

  "message": `import {
  PixelMessage,
  PixelMessageContent,
} from "@/components/ui/message"

export function MessageDemo() {
  return (
    <PixelMessage>
      <PixelMessageContent>
        <div className="text-xs font-bold">shadcn</div>
        <div className="text-xs text-muted-foreground">How is it going?</div>
      </PixelMessageContent>
    </PixelMessage>
  )
}`,

  "message-scroller": `import {
  PixelMessage,
  PixelMessageContent,
  PixelMessageScroller,
} from "@/components/ui/message-scroller"

export function MessageScrollerDemo() {
  return (
    <PixelMessageScroller className="h-[200px] border-2 border-foreground p-3">
      {messages.map((m) => (
        <PixelMessage key={m.id} variant="flat">
          <PixelMessageContent>
            <div className="text-xs">{m.text}</div>
          </PixelMessageContent>
        </PixelMessage>
      ))}
    </PixelMessageScroller>
  )
}`,

  "attachment": `import {
  PixelAttachment,
  PixelAttachmentInfo,
} from "@/components/ui/attachment"

export function AttachmentDemo() {
  return (
    <PixelAttachment>
      <PixelAttachmentInfo onRemove={() => {}}>report-final.pdf</PixelAttachmentInfo>
    </PixelAttachment>
  )
}`,

  "dialog": `import { PixelButton } from "@/components/ui/button"
import {
  PixelDialog,
  PixelDialogContent,
  PixelDialogDescription,
  PixelDialogHeader,
  PixelDialogTitle,
  PixelDialogTrigger,
} from "@/components/ui/dialog"

export function DialogDemo() {
  return (
    <PixelDialog>
      <PixelDialogTrigger asChild>
        <PixelButton variant="outline">Open Dialog</PixelButton>
      </PixelDialogTrigger>
      <PixelDialogContent>
        <PixelDialogHeader>
          <PixelDialogTitle>Edit profile</PixelDialogTitle>
          <PixelDialogDescription>Make changes here.</PixelDialogDescription>
        </PixelDialogHeader>
      </PixelDialogContent>
    </PixelDialog>
  )
}`,

  "alert-dialog": `import { PixelButton } from "@/components/ui/button"
import {
  PixelAlertDialog,
  PixelAlertDialogAction,
  PixelAlertDialogCancel,
  PixelAlertDialogContent,
  PixelAlertDialogDescription,
  PixelAlertDialogFooter,
  PixelAlertDialogHeader,
  PixelAlertDialogTitle,
  PixelAlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function AlertDialogDemo() {
  return (
    <PixelAlertDialog>
      <PixelAlertDialogTrigger asChild>
        <PixelButton variant="outline">Delete Account</PixelButton>
      </PixelAlertDialogTrigger>
      <PixelAlertDialogContent>
        <PixelAlertDialogHeader>
          <PixelAlertDialogTitle>Are you absolutely sure?</PixelAlertDialogTitle>
          <PixelAlertDialogDescription>This cannot be undone.</PixelAlertDialogDescription>
        </PixelAlertDialogHeader>
        <PixelAlertDialogFooter>
          <PixelAlertDialogCancel>Cancel</PixelAlertDialogCancel>
          <PixelAlertDialogAction>Continue</PixelAlertDialogAction>
        </PixelAlertDialogFooter>
      </PixelAlertDialogContent>
    </PixelAlertDialog>
  )
}`,

  "sheet": `import { PixelButton } from "@/components/ui/button"
import {
  PixelSheet,
  PixelSheetContent,
  PixelSheetDescription,
  PixelSheetHeader,
  PixelSheetTitle,
  PixelSheetTrigger,
} from "@/components/ui/sheet"

export function SheetDemo() {
  return (
    <PixelSheet>
      <PixelSheetTrigger asChild>
        <PixelButton variant="outline">Open</PixelButton>
      </PixelSheetTrigger>
      <PixelSheetContent>
        <PixelSheetHeader>
          <PixelSheetTitle>Edit profile</PixelSheetTitle>
          <PixelSheetDescription>Make changes and save.</PixelSheetDescription>
        </PixelSheetHeader>
      </PixelSheetContent>
    </PixelSheet>
  )
}`,

  "drawer": `import { PixelButton } from "@/components/ui/button"
import {
  PixelDrawer,
  PixelDrawerContent,
  PixelDrawerDescription,
  PixelDrawerHeader,
  PixelDrawerTitle,
  PixelDrawerTrigger,
} from "@/components/ui/drawer"

export function DrawerDemo() {
  return (
    <PixelDrawer>
      <PixelDrawerTrigger asChild>
        <PixelButton variant="outline">Open Drawer</PixelButton>
      </PixelDrawerTrigger>
      <PixelDrawerContent>
        <PixelDrawerHeader>
          <PixelDrawerTitle>Move Goal</PixelDrawerTitle>
          <PixelDrawerDescription>Set your daily goal.</PixelDrawerDescription>
        </PixelDrawerHeader>
      </PixelDrawerContent>
    </PixelDrawer>
  )
}`,

  "popover": `import { PixelButton } from "@/components/ui/button"
import {
  PixelPopover,
  PixelPopoverContent,
  PixelPopoverTrigger,
} from "@/components/ui/popover"

export function PopoverDemo() {
  return (
    <PixelPopover>
      <PixelPopoverTrigger asChild>
        <PixelButton variant="outline">Open popover</PixelButton>
      </PixelPopoverTrigger>
      <PixelPopoverContent>Place content here.</PixelPopoverContent>
    </PixelPopover>
  )
}`,

  "hover-card": `import { PixelButton } from "@/components/ui/button"
import {
  PixelHoverCard,
  PixelHoverCardContent,
  PixelHoverCardTrigger,
} from "@/components/ui/hover-card"

export function HoverCardDemo() {
  return (
    <PixelHoverCard>
      <PixelHoverCardTrigger asChild>
        <PixelButton variant="link">@pixelcn</PixelButton>
      </PixelHoverCardTrigger>
      <PixelHoverCardContent>Pixel art component library.</PixelHoverCardContent>
    </PixelHoverCard>
  )
}`,

  "tooltip": `import { PixelButton } from "@/components/ui/button"
import {
  PixelTooltip,
  PixelTooltipContent,
  PixelTooltipProvider,
  PixelTooltipTrigger,
} from "@/components/ui/tooltip"

export function TooltipDemo() {
  return (
    <PixelTooltipProvider>
      <PixelTooltip>
        <PixelTooltipTrigger asChild>
          <PixelButton variant="outline">Hover</PixelButton>
        </PixelTooltipTrigger>
        <PixelTooltipContent>Add to library</PixelTooltipContent>
      </PixelTooltip>
    </PixelTooltipProvider>
  )
}`,

  "dropdown-menu": `import { PixelButton } from "@/components/ui/button"
import {
  PixelDropdownMenu,
  PixelDropdownMenuContent,
  PixelDropdownMenuItem,
  PixelDropdownMenuLabel,
  PixelDropdownMenuSeparator,
  PixelDropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DropdownMenuDemo() {
  return (
    <PixelDropdownMenu>
      <PixelDropdownMenuTrigger asChild>
        <PixelButton variant="outline">Open</PixelButton>
      </PixelDropdownMenuTrigger>
      <PixelDropdownMenuContent>
        <PixelDropdownMenuLabel>My Account</PixelDropdownMenuLabel>
        <PixelDropdownMenuSeparator />
        <PixelDropdownMenuItem>Profile</PixelDropdownMenuItem>
        <PixelDropdownMenuItem>Billing</PixelDropdownMenuItem>
      </PixelDropdownMenuContent>
    </PixelDropdownMenu>
  )
}`,

  "context-menu": `import {
  PixelContextMenu,
  PixelContextMenuContent,
  PixelContextMenuItem,
  PixelContextMenuTrigger,
} from "@/components/ui/context-menu"

export function ContextMenuDemo() {
  return (
    <PixelContextMenu>
      <PixelContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center border-2 border-dashed border-foreground text-xs">
        Right click here
      </PixelContextMenuTrigger>
      <PixelContextMenuContent>
        <PixelContextMenuItem>Back</PixelContextMenuItem>
        <PixelContextMenuItem>Forward</PixelContextMenuItem>
      </PixelContextMenuContent>
    </PixelContextMenu>
  )
}`,

  "command": `import {
  PixelCommand,
  PixelCommandEmpty,
  PixelCommandGroup,
  PixelCommandInput,
  PixelCommandItem,
  PixelCommandList,
} from "@/components/ui/command"

export function CommandDemo() {
  return (
    <PixelCommand className="border-2 border-foreground">
      <PixelCommandInput placeholder="Type a command..." />
      <PixelCommandList>
        <PixelCommandEmpty>No results found.</PixelCommandEmpty>
        <PixelCommandGroup heading="Suggestions">
          <PixelCommandItem>Calendar</PixelCommandItem>
        </PixelCommandGroup>
      </PixelCommandList>
    </PixelCommand>
  )
}`,

  "combobox": `import {
  PixelCombobox,
  PixelComboboxButton,
  PixelComboboxContent,
  PixelComboboxInput,
  PixelComboboxItem,
  PixelComboboxList,
} from "@/components/ui/combobox"

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <PixelCombobox open={open} onOpenChange={setOpen}>
      <PixelComboboxButton className="w-[200px]">
        {value || "Select framework..."}
      </PixelComboboxButton>
      <PixelComboboxContent>
        <PixelComboboxInput placeholder="Search..." />
        <PixelComboboxList>
          <PixelComboboxItem value="next">Next.js</PixelComboboxItem>
          <PixelComboboxItem value="vite">Vite</PixelComboboxItem>
        </PixelComboboxList>
      </PixelComboboxContent>
    </PixelCombobox>
  )
}`,

  "carousel": `import {
  PixelCarousel,
  PixelCarouselContent,
  PixelCarouselItem,
  PixelCarouselNext,
  PixelCarouselPrevious,
} from "@/components/ui/carousel"

export function CarouselDemo() {
  return (
    <PixelCarousel className="w-full max-w-xs">
      <PixelCarouselContent>
        <PixelCarouselItem>
          <div className="flex aspect-video items-center justify-center border-2 border-foreground">1</div>
        </PixelCarouselItem>
      </PixelCarouselContent>
      <PixelCarouselPrevious />
      <PixelCarouselNext />
    </PixelCarousel>
  )
}`,

  "direction": `import { PixelDirectionProvider } from "@/components/ui/direction"

export function DirectionDemo() {
  return (
    <PixelDirectionProvider dir="rtl">
      <div>This content is right-to-left.</div>
    </PixelDirectionProvider>
  )
}`,

  "health-bar": `import { PixelHealthBar } from "@/components/ui/health-bar"

export function HealthBarDemo() {
  const [hp, setHp] = React.useState(75)

  return <PixelHealthBar value={hp} max={100} showIcon />
}`,

  "mana-bar": `import { PixelManaBar } from "@/components/ui/mana-bar"

export function ManaBarDemo() {
  const [mp, setMp] = React.useState(45)

  return <PixelManaBar value={mp} max={100} showIcon />
}`,

  "xp-bar": `import { PixelXpBar } from "@/components/ui/xp-bar"

export function XpBarDemo() {
  return <PixelXpBar value={65} max={100} level={7} showIcon />
}`,

  "enemy-health-display": `import { PixelEnemyHealthDisplay } from "@/components/ui/enemy-health-display"

export function EnemyHealthDisplayDemo() {
  return (
    <PixelEnemyHealthDisplay
      name="Dark Lord"
      level={42}
      value={8}
      max={100}
      segments={12}
    />
  )
}`,

  "retro-mode-switcher": `import { PixelRetroModeSwitcher } from "@/components/ui/retro-mode-switcher"

export function RetroModeSwitcherDemo() {
  const [checked, setChecked] = React.useState(true)

  return <PixelRetroModeSwitcher checked={checked} onCheckedChange={setChecked} />
}`,

  "theme-selector": `import { PixelThemeSelector } from "@/components/ui/theme-selector"

export function ThemeSelectorDemo() {
  const [theme, setTheme] = React.useState("nintendo")

  return <PixelThemeSelector value={theme} onValueChange={setTheme} />
}`,

};

export function getCodeSnippet(name: string): string {
  return codeSnippets[name] ?? `// Import the ${name} component from @/components/ui/${name}`;
}