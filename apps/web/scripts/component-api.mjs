// Extracts each component's API (exports, own props, cva variants) and
// accessibility notes from its source, for the "API" and "Accessibility"
// sections of the docs pages. Generated (not hand-written) so the docs can't
// drift from the code; build-registry.mjs writes the result and CI checks it.
import { readFileSync } from "node:fs";
import { join } from "node:path";

/** What the underlying primitive provides, by package. */
const PRIMITIVE_A11Y = {
  "@radix-ui/react-accordion": "Radix Accordion: triggers are buttons with aria-expanded/aria-controls; Up/Down/Home/End move between triggers.",
  "@radix-ui/react-alert-dialog": "Radix Alert Dialog: role=alertdialog, focus is trapped and starts on Cancel, Esc closes, focus returns to the trigger. Clicking outside does not dismiss.",
  "@radix-ui/react-aspect-ratio": "Layout only; give images inside meaningful alt text.",
  "@radix-ui/react-avatar": "Radix Avatar: the fallback renders while the image loads or if it fails; pass alt to the image.",
  "@radix-ui/react-checkbox": "Radix Checkbox: role=checkbox with aria-checked (including mixed), toggled with Space. Pair with a Label.",
  "@radix-ui/react-collapsible": "Radix Collapsible: the trigger exposes aria-expanded and aria-controls.",
  "@radix-ui/react-context-menu": "Radix Context Menu: opens on right click or long press, arrow keys and typeahead navigate, Esc closes.",
  "@radix-ui/react-dialog": "Radix Dialog: role=dialog with aria-modal, focus is trapped, Esc and outside click close, focus returns to the trigger. Title and Description are wired with aria-labelledby/-describedby.",
  "@radix-ui/react-direction": "Sets the reading direction (ltr/rtl) that Radix primitives use for keyboard navigation.",
  "@radix-ui/react-dropdown-menu": "Radix Dropdown Menu: role=menu, arrow keys and typeahead navigate, Esc closes and returns focus to the trigger.",
  "@radix-ui/react-hover-card": "Radix Hover Card: opens on hover and keyboard focus; for sighted pointer users only, so don't put essential content in it.",
  "@radix-ui/react-label": "Radix Label: native <label>; clicking it focuses the associated control (htmlFor).",
  "@radix-ui/react-menubar": "Radix Menubar: role=menubar, Left/Right move between menus, Up/Down within a menu.",
  "@radix-ui/react-navigation-menu": "Radix Navigation Menu: nav landmark, triggers expose aria-expanded, arrow keys move between items.",
  "@radix-ui/react-popover": "Radix Popover: the trigger exposes aria-expanded, focus moves into the content, Esc and outside click close.",
  "@radix-ui/react-progress": "Radix Progress: role=progressbar with aria-valuenow/min/max.",
  "@radix-ui/react-radio-group": "Radix Radio Group: role=radiogroup, arrow keys move and select, one tab stop for the group.",
  "@radix-ui/react-scroll-area": "Radix Scroll Area: native scrolling (keyboard, wheel, touch) with custom scrollbars.",
  "@radix-ui/react-select": "Radix Select: role=combobox trigger with a listbox, arrow keys and typeahead pick options, Esc closes.",
  "@radix-ui/react-separator": "Radix Separator: role=separator, or role=none when decorative.",
  "@radix-ui/react-slider": "Radix Slider: role=slider thumbs with aria-valuenow, arrow keys step, PageUp/PageDown jump, Home/End go to the ends.",
  "@radix-ui/react-switch": "Radix Switch: role=switch with aria-checked, toggled with Space/Enter. Pair with a Label.",
  "@radix-ui/react-tabs": "Radix Tabs: role=tablist/tab/tabpanel, arrow keys move between tabs, one tab stop.",
  "@radix-ui/react-toast": "Radix Toast: announced through a live region, swipe or Esc dismisses, F8 focuses the viewport. Timers pause on hover/focus.",
  "@radix-ui/react-toggle": "Radix Toggle: a button with aria-pressed.",
  "@radix-ui/react-toggle-group": "Radix Toggle Group: arrow keys move between items, one tab stop; items expose aria-pressed (or radio semantics when type=single).",
  "@radix-ui/react-tooltip": "Radix Tooltip: shown on hover and focus, linked with aria-describedby, Esc hides. Keep it supplementary.",
  cmdk: "cmdk: combobox input with a listbox; arrow keys move the active item, Enter selects.",
  vaul: "Vaul (Radix Dialog underneath): focus trap, Esc closes, drag or swipe to dismiss.",
  "input-otp": "input-otp: one real input behind the slots, so paste, autofill (autocomplete=one-time-code) and screen readers work.",
  "embla-carousel-react": "Embla: region with aria-roledescription=carousel; Previous/Next buttons and Left/Right arrow keys move slides.",
  "react-day-picker": "React DayPicker: grid of day buttons, arrow keys move by day/week, PageUp/PageDown by month.",
  recharts: "Recharts renders SVG; summarize the data in text or a table for screen reader users.",
  "react-resizable-panels": "Resize handles are focusable separators; arrow keys resize.",
};

/** Hand-written notes for components without a primitive (or with extra behavior). */
const EXTRA_A11Y = {
  button: "Native <button>: Enter/Space activate. With asChild it renders its child (e.g. a link) instead. Icon-only buttons need aria-label.",
  input: "Native <input>: pair with a Label (htmlFor) and use aria-invalid for errors.",
  textarea: "Native <textarea>: pair with a Label (htmlFor).",
  "native-select": "Native <select>: full keyboard and screen reader support from the browser.",
  badge: "Plain text in a box; don't rely on its color alone to convey meaning.",
  alert: "role=alert: the content is announced when it appears.",
  kbd: "Renders <kbd>, read as keyboard input.",
  "health-bar": "role=progressbar with aria-valuenow/min/max; add aria-label when showLabel is off.",
  "mana-bar": "Same semantics as Health Bar.",
  "xp-bar": "Same semantics as Health Bar.",
  spinner: "role=status with aria-label=\"Loading\" (override it to describe what is loading).",
  table: "Native <table>, <th> and <caption> semantics.",
  field: "Field groups a control with its label, description and error: the set renders a <fieldset> (role=group) and errors use role=alert.",
  "input-group": "Native <input> with addons; give icon-only addons an aria-label and keep the input labelled.",
  "date-picker": "Popover + Calendar: see both for keyboard behavior; the trigger shows the selected date as text.",
  questionnaire: "Steps are plain content; give each question a heading or label so the step is announced.",
  card: "Plain <div> container. CardTitle renders a <div>: put a heading inside it (<PixelCardTitle><h2>...</h2></PixelCardTitle>) when the card belongs in the page outline.",
  sidebar: "List-based navigation (<ul>); the trigger button is labelled \"Toggle Sidebar\". Wrap it in a <nav> with aria-label when it holds site navigation.",
  breadcrumb: "<nav aria-label=\"breadcrumb\"> with an ordered list; the current page has aria-current=page and separators are hidden from screen readers.",
  pagination: "<nav aria-label=\"pagination\">; the active page has aria-current=page and Previous/Next are labelled.",
  "button-group": "Visual grouping only; add role=group and aria-label when the buttons form one control.",
  skeleton: "Decorative placeholder; mark the loading region with aria-busy=true.",
  empty: "Plain content; the title should say what is empty and the action what to do next.",
  "data-table": "Native <table> semantics (via Table); sort buttons in headers are real buttons.",
  item: "Plain list content; use ItemGroup inside a list or pass asChild to render a link or button.",
  typography: "Semantic elements (<h1>-<h4>, <p>, <blockquote>, <ul>, <code>), so headings form the document outline.",
  marker: "Decorative highlight; the text inside stays readable as normal text.",
  bubble: "Plain text container; for conversations prefer Message, which has author context.",
  message: "Plain container; include the author name in text so each message is attributable.",
  "message-scroller": "Native scrolling; the Scroll to bottom button is labelled.",
  attachment: "The remove button is labelled \"Remove attachment\".",
  "enemy-health-display": "role=progressbar with aria-valuenow/min/max for the enemy's HP.",
  "retro-mode-switcher": "role=switch buttons with aria-checked.",
  "theme-selector": "Native buttons; the selected theme should also be shown by its label, not only its color.",
  "dialogue-box": "role=region labelled by the speaker; the typewriter text is also exposed in full to screen readers (aria-live=polite announces new lines). Click, Enter or Space skips or advances. The animation is skipped under prefers-reduced-motion.",
  inventory: "role=grid with one tab stop: arrow keys move between slots, Enter/Space select. Each slot is labelled with its item name and count.",
  scoreboard: "Native <table> with a caption; the highlighted row has aria-current.",
  "coin-counter": "role=status: changes are announced politely. The count-up animation is skipped under prefers-reduced-motion.",
  "continue-screen": "role=alertdialog with the countdown announced; focus starts on Continue, Esc or Quit picks Quit.",
  achievement: "role=status so the unlock is announced without stealing focus.",
};

function braceBlock(src, openIndex) {
  let depth = 0;
  for (let i = openIndex; i < src.length; i++) {
    if (src[i] === "{") depth++;
    else if (src[i] === "}" && --depth === 0) return src.slice(openIndex + 1, i);
  }
  return "";
}

/** Top-level `key:` names of an object literal body. */
function topLevelKeys(body) {
  const keys = [];
  let depth = 0;
  let inStr = null;
  let token = "";
  for (let i = 0; i < body.length; i++) {
    const ch = body[i];
    if (!inStr && ch === "/" && body[i + 1] === "/") {
      i = body.indexOf("\n", i);
      if (i < 0) break;
      continue;
    }
    if (!inStr && ch === "/" && body[i + 1] === "*") {
      i = body.indexOf("*/", i) + 1;
      if (i <= 0) break;
      continue;
    }
    if (inStr) {
      if (ch === inStr && body[i - 1] !== "\\") inStr = null;
      if (depth === 0) token += ch;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      inStr = ch;
      if (depth === 0) token += ch;
      continue;
    }
    if (ch === "{" || ch === "[" || ch === "(") depth++;
    else if (ch === "}" || ch === "]" || ch === ")") depth--;
    else if (depth === 0 && ch === ":") {
      const m = token.match(/([\w-]+|"[^"]+")\s*$/);
      if (m) keys.push({ key: m[1].replace(/"/g, ""), at: i + 1 });
      token = "";
      continue;
    } else if (depth === 0 && ch === ",") token = "";
    if (depth === 0) token += ch;
  }
  return keys;
}

function parseVariants(src) {
  const out = [];
  for (const m of src.matchAll(/variants:\s*\{/g)) {
    const body = braceBlock(src, m.index + m[0].length - 1);
    const defaults = {};
    const after = src.slice(m.index + m[0].length - 1 + body.length + 2, m.index + m[0].length + body.length + 400);
    const d = after.match(/defaultVariants:\s*\{([^}]*)\}/);
    if (d) for (const [, k, v] of d[1].matchAll(/([\w-]+):\s*"?([\w-]+)"?/g)) defaults[k] = v;
    for (const { key, at } of topLevelKeys(body)) {
      const open = body.indexOf("{", at);
      if (open < 0 || body.slice(at, open).trim() !== "") continue;
      out.push({ name: key, options: topLevelKeys(braceBlock(body, open)).map((o) => o.key), default: defaults[key] ?? null });
    }
  }
  return out;
}

function parseProps(src) {
  const props = [];
  for (const m of src.matchAll(/export interface (\w+Props)\b[^{]*\{/g)) {
    const body = braceBlock(src, m.index + m[0].length - 1);
    let comment = "";
    for (const line of body.split("\n")) {
      const t = line.trim();
      const c = t.match(/^\/\*\*?\s*(.*?)\s*\*\/$/) || t.match(/^\/\/\s*(.*)$/);
      if (c) {
        comment = c[1];
        continue;
      }
      const p = t.match(/^(\w+)(\?)?:\s*(.+?);?$/);
      if (p) {
        const def = src.match(new RegExp(`[{,]\\s*${p[1]}\\s*=\\s*([^,}\\n]+)`));
        props.push({ owner: m[1], name: p[1], type: p[3].replace(/;$/, ""), required: !p[2], default: def ? def[1].trim() : null, description: comment });
      }
      comment = "";
    }
  }
  return props;
}

function parseExports(src) {
  const names = new Set();
  for (const m of src.matchAll(/export\s*\{([^}]*)\}/g)) {
    for (const n of m[1].split(",")) {
      const name = n.trim().split(/\s+as\s+/).pop().replace(/^type\s+/, "");
      if (name && /^[A-Z]/.test(name)) names.add(name);
    }
  }
  for (const m of src.matchAll(/export (?:const|function) ([A-Z]\w*)/g)) names.add(m[1]);
  return [...names];
}

export function buildComponentApi(uiDir, names) {
  const api = {};
  for (const name of names) {
    let src;
    try {
      src = readFileSync(join(uiDir, `${name}.tsx`), "utf-8").replace(/\r\n/g, "\n");
    } catch {
      continue;
    }
    const imports = [...src.matchAll(/from\s+"([^"]+)"/g)].map((m) => m[1]);
    const accessibility = [EXTRA_A11Y[name], ...imports.map((i) => PRIMITIVE_A11Y[i])].filter(Boolean);
    api[name] = {
      exports: parseExports(src),
      props: parseProps(src),
      variants: parseVariants(src),
      slots: [...new Set([...src.matchAll(/data-slot="([\w-]+)"/g)].map((m) => m[1]))],
      accessibility: [...new Set(accessibility)],
    };
  }
  return api;
}
