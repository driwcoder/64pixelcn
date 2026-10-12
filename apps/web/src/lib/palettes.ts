// Pixel-art palettes from Lospec (https://lospec.com/palette-list), the
// colors exactly as in each palette's .hex file. Each one becomes a theme
// through lib/palette-theme.ts.

export const LOSPEC_PALETTES = {
  waldgeist: { label: "Waldgeist", url: "https://lospec.com/palette-list/waldgeist", colors: ["a6884a", "906c30", "825337", "83473d", "66352e", "562923", "612638", "46332c", "323230", "3e4055", "382d35", "323b42", "1f2d36", "141f25", "0b1016", "245273", "4e7499", "5e7e8b", "798a92", "879ea3", "e3ddd1", "bdbbae", "af9e94", "907c75", "a29f7e", "969372", "78735d", "696353", "4f493b", "212528", "595c55", "4b4e4f", "57562a", "675f30", "727234", "73804b", "5f7b53", "3b6d62", "32534a"] },
  grim32: { label: "Grim32", url: "https://lospec.com/palette-list/grim32", colors: ["081611", "0f1e1d", "162627", "213434", "2c413c", "3e4e47", "515f4f", "616854", "505641", "474932", "3d3b26", "34311f", "231f13", "342d20", "453a2d", "56473a", "6c584d", "867069", "6c5e61", "5f4c53", "52414a", "382b34", "231921", "2e2430", "362f3d", "403c49", "4a4856", "525363", "666875", "4e5763", "3e4852", "222b34"] },
  darkseed16: { label: "Darkseed 16", url: "https://lospec.com/palette-list/darkseed-16", colors: ["000000", "001418", "002024", "002c38", "143444", "443444", "583c48", "6c4c44", "806058", "6c706c", "888078", "a49484", "c4ac9c", "d8b0a8", "ecd4d0", "fcfcfc"] },
  vinik24: { label: "Vinik24", url: "https://lospec.com/palette-list/vinik24", colors: ["000000", "6f6776", "9a9a97", "c5ccb8", "8b5580", "c38890", "a593a5", "666092", "9a4f50", "c28d75", "7ca1c0", "416aa3", "8d6268", "be955c", "68aca9", "387080", "6e6962", "93a167", "6eaa78", "557064", "9d9f7f", "7e9e99", "5d6872", "433455"] },
  lostcentury: { label: "Lost Century", url: "https://lospec.com/palette-list/lost-century", colors: ["d1b187", "c77b58", "ae5d40", "79444a", "4b3d44", "ba9158", "927441", "4d4539", "77743b", "b3a555", "d2c9a5", "8caba1", "4b726e", "574852", "847875", "ab9b8e"] },
  lux2k: { label: "Lux2K", url: "https://lospec.com/palette-list/lux2k", colors: ["25131a", "3d253b", "523b40", "1f3736", "2a5a39", "427f3b", "80a53f", "bbc44e", "96c641", "ccf61f", "8a961f", "5c6b53", "895a45", "d1851e", "ffd569", "bf704d", "e1a171", "e6deca", "9b4c51", "802954", "d01946", "e84444", "40369f", "7144ff", "af69bf", "eaa5ff", "5880cc", "62abd4", "9bf0fd", "cae6f5", "ffffff", "a7acba", "606060", "56587b", "9a8571", "dfbbb3"] },
  mushroom: { label: "Mushroom", url: "https://lospec.com/palette-list/mushroom", colors: ["2e222f", "45293f", "7a3045", "993d41", "cd683d", "fbb954", "f2ec8b", "b0a987", "997f73", "665964", "443846", "576069", "788a87", "a9b2a2"] },
  justparchment8: { label: "JustParchment8", url: "https://lospec.com/palette-list/justparchment8", colors: ["292418", "524839", "73654a", "8b7d62", "a48d6a", "bda583", "cdba94", "e6ceac"] },
  fading16: { label: "Fading 16", url: "https://lospec.com/palette-list/fading-16", colors: ["ddcf99", "cca87b", "b97a60", "9c524e", "774251", "4b3d44", "4e5463", "5b7d73", "8e9f7d", "645355", "8c7c79", "a99c8d", "7d7b62", "aaa25d", "846d59", "a88a5e"] },
} as const;
export type LospecPalette = keyof typeof LOSPEC_PALETTES;
