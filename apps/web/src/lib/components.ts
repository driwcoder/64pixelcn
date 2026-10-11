export interface ComponentMeta {
  name: string;
  title: string;
  description: string;
  category: "Forms" | "Layout" | "Navigation" | "Feedback" | "Data Display" | "Overlays" | "Typography";
}

export const componentsMeta: ComponentMeta[] = [
  // Forms
  { name: "button", title: "Button", description: "Pixel art button with retro gaming aesthetics", category: "Forms" },
  { name: "input", title: "Input", description: "Pixel art input with retro styling", category: "Forms" },
  { name: "textarea", title: "Textarea", description: "Pixel art textarea", category: "Forms" },
  { name: "checkbox", title: "Checkbox", description: "Pixel art checkbox with stepped check mark", category: "Forms" },
  { name: "radio-group", title: "Radio Group", description: "Pixel art radio group", category: "Forms" },
  { name: "switch", title: "Switch", description: "Pixel art switch toggle", category: "Forms" },
  { name: "select", title: "Select", description: "Pixel art select", category: "Forms" },
  { name: "native-select", title: "Native Select", description: "Pixel art native select", category: "Forms" },
  { name: "label", title: "Label", description: "Pixel art label", category: "Forms" },
  { name: "field", title: "Field", description: "Pixel art field wrapper", category: "Forms" },
  { name: "input-group", title: "Input Group", description: "Pixel art input group", category: "Forms" },
  { name: "input-otp", title: "Input OTP", description: "Pixel art input OTP", category: "Forms" },
  { name: "slider", title: "Slider", description: "Pixel art slider", category: "Forms" },
  { name: "toggle", title: "Toggle", description: "Pixel art toggle", category: "Forms" },
  { name: "toggle-group", title: "Toggle Group", description: "Pixel art toggle group", category: "Forms" },
  { name: "calendar", title: "Calendar", description: "Pixel art calendar", category: "Forms" },
  { name: "date-picker", title: "Date Picker", description: "Pixel art date picker", category: "Forms" },
  { name: "questionnaire", title: "Questionnaire", description: "Pixel art questionnaire flow", category: "Forms" },

  // Layout
  { name: "card", title: "Card", description: "Pixel art card with stepped borders and shadows", category: "Layout" },
  { name: "accordion", title: "Accordion", description: "Pixel art accordion", category: "Layout" },
  { name: "collapsible", title: "Collapsible", description: "Pixel art collapsible", category: "Layout" },
  { name: "resizable", title: "Resizable", description: "Pixel art resizable panels", category: "Layout" },
  { name: "separator", title: "Separator", description: "Pixel art separator", category: "Layout" },
  { name: "scroll-area", title: "Scroll Area", description: "Pixel art scroll area", category: "Layout" },
  { name: "aspect-ratio", title: "Aspect Ratio", description: "Pixel art aspect ratio", category: "Layout" },
  { name: "sidebar", title: "Sidebar", description: "Pixel art sidebar", category: "Layout" },

  // Navigation
  { name: "breadcrumb", title: "Breadcrumb", description: "Pixel art breadcrumb", category: "Navigation" },
  { name: "navigation-menu", title: "Navigation Menu", description: "Pixel art navigation menu", category: "Navigation" },
  { name: "menubar", title: "Menubar", description: "Pixel art menubar", category: "Navigation" },
  { name: "pagination", title: "Pagination", description: "Pixel art pagination", category: "Navigation" },
  { name: "tabs", title: "Tabs", description: "Pixel art tabs with stepped indicators", category: "Navigation" },
  { name: "button-group", title: "Button Group", description: "Pixel art button group", category: "Navigation" },

  // Feedback
  { name: "alert", title: "Alert", description: "Pixel art alert component", category: "Feedback" },
  { name: "toast", title: "Toast", description: "Pixel art toast", category: "Feedback" },
  { name: "progress", title: "Progress", description: "Pixel art progress bar with block segments", category: "Feedback" },
  { name: "skeleton", title: "Skeleton", description: "Pixel art skeleton", category: "Feedback" },
  { name: "spinner", title: "Spinner", description: "Pixel art spinner", category: "Feedback" },
  { name: "empty", title: "Empty", description: "Pixel art empty state", category: "Feedback" },

  // Data Display
  { name: "badge", title: "Badge", description: "Pixel art badge for status and labels", category: "Data Display" },
  { name: "avatar", title: "Avatar", description: "Pixel art avatar", category: "Data Display" },
  { name: "table", title: "Table", description: "Pixel art table", category: "Data Display" },
  { name: "data-table", title: "Data Table", description: "Pixel art data table", category: "Data Display" },
  { name: "chart", title: "Chart", description: "Pixel art chart", category: "Data Display" },
  { name: "item", title: "Item", description: "Pixel art item", category: "Data Display" },
  { name: "kbd", title: "Kbd", description: "Pixel art keyboard key", category: "Data Display" },
  { name: "typography", title: "Typography", description: "Pixel art typography", category: "Data Display" },
  { name: "marker", title: "Marker", description: "Pixel art text marker", category: "Data Display" },
  { name: "bubble", title: "Bubble", description: "Pixel art chat bubble", category: "Data Display" },
  { name: "message", title: "Message", description: "Pixel art message", category: "Data Display" },
  { name: "message-scroller", title: "Message Scroller", description: "Pixel art message scroller", category: "Data Display" },
  { name: "attachment", title: "Attachment", description: "Pixel art attachment", category: "Data Display" },

  // Overlays
  { name: "dialog", title: "Dialog", description: "Pixel art modal dialog", category: "Overlays" },
  { name: "sheet", title: "Sheet", description: "Pixel art sheet", category: "Overlays" },
  { name: "drawer", title: "Drawer", description: "Pixel art drawer", category: "Overlays" },
  { name: "popover", title: "Popover", description: "Pixel art popover", category: "Overlays" },
  { name: "hover-card", title: "Hover Card", description: "Pixel art hover card", category: "Overlays" },
  { name: "tooltip", title: "Tooltip", description: "Pixel art tooltip", category: "Overlays" },
  { name: "dropdown-menu", title: "Dropdown Menu", description: "Pixel art dropdown menu", category: "Overlays" },
  { name: "context-menu", title: "Context Menu", description: "Pixel art context menu", category: "Overlays" },
  { name: "command", title: "Command", description: "Pixel art command palette", category: "Overlays" },
  { name: "combobox", title: "Combobox", description: "Pixel art combobox", category: "Overlays" },

  // Misc
  { name: "carousel", title: "Carousel", description: "Pixel art carousel", category: "Layout" },
  { name: "direction", title: "Direction", description: "Pixel art direction provider", category: "Layout" },
];

export function getComponentMeta(name: string): ComponentMeta | undefined {
  return componentsMeta.find((c) => c.name === name);
}

export const categories = [
  "Forms",
  "Layout",
  "Navigation",
  "Feedback",
  "Data Display",
  "Overlays",
  "Typography",
] as const;
