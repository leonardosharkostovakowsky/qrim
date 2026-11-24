import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.tsx", "./components/**/*.tsx"],
  theme: { extend: {
    colors: { ivory: "#F7F3E8", forest: "#173D30", charcoal: "#252722", olive: "#858A70", champagne: "#B49A69" },
    fontFamily: {
      serif: ["var(--font-serif)", "Songti SC", "serif"],
      sans: ["var(--font-sans)", "PingFang SC", "Noto Sans SC", "Microsoft YaHei", "sans-serif"],
    } } },
} satisfies Config;
