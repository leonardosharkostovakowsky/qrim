const en = {
  generator: "Generator", about: "About", title: "Make Every Link Scannable.",
  lead: "Create beautiful, high-quality QR Codes from any link. Customize, download, and share — all in one simple workspace.",
  url: "Link", placeholder: "example.com/your-page", invalid: "This doesn’t look like a valid link. Try something like example.com.",
  empty: "Enter a link to see your QR Code.", fg: "Foreground", bg: "Background", size: "Size (px)", ecc: "Error correction",
  margin: "Quiet zone (modules)", reset: "Reset", png: "Download PNG", svg: "Download SVG", copy: "Copy link", copied: "Link copied",
  downloaded: "Download started", filename: "File name", contrast: "Low contrast — this QR Code may not scan reliably. Use a dark foreground on a light background.",
  privacy: "QR Codes are generated locally in your browser. Your links are never sent anywhere.",
  aboutTitle: "About QRIM", aboutText: "QRIM is a thoughtfully designed QR Code generation tool built to make sharing digital links simpler, faster, and more accessible.",
  tagline: "Simple by design. Precise by nature.", footerDesc: "A refined QR Code generator.", creator: "Created by Muhammad Ilham Ramadhan · 2026",
  ai: "Built by Muhammad Ilham Ramadhan with assistance from Claude AI.", language: "Language", preview: "Preview",
};
export type Dict = typeof en;
const zh: Dict = {
  generator: "生成器", about: "关于", title: "让每个链接都可扫描。",
  lead: "用任意链接创建精美、高质量的二维码。自定义、下载、分享——一个简洁的工作区即可完成。",
  url: "链接", placeholder: "example.com/your-page", invalid: "链接格式似乎无效，请尝试 example.com 这样的格式。",
  empty: "输入链接以查看二维码。", fg: "前景色", bg: "背景色", size: "尺寸（像素）", ecc: "纠错级别",
  margin: "静区（模块）", reset: "重置", png: "下载 PNG", svg: "下载 SVG", copy: "复制链接", copied: "链接已复制",
  downloaded: "已开始下载", filename: "文件名", contrast: "对比度过低——二维码可能无法可靠扫描。请使用浅色背景上的深色前景。",
  privacy: "二维码在您的浏览器本地生成，您的链接不会被发送到任何地方。",
  aboutTitle: "关于 QRIM", aboutText: "QRIM 是一款精心设计的二维码生成工具，让分享数字链接更简单、更快速、更便捷。",
  tagline: "设计求简，精准天成。", footerDesc: "精致的二维码生成器。", creator: "由 Muhammad Ilham Ramadhan 创作 · 2026",
  ai: "由 Muhammad Ilham Ramadhan 在 Claude AI 的协助下构建。", language: "语言", preview: "预览",
};
const ru: Dict = {
  generator: "Генератор", about: "О проекте", title: "Сделайте каждую ссылку сканируемой.",
  lead: "Создавайте красивые QR-коды высокого качества из любой ссылки. Настраивайте, скачивайте и делитесь — всё в одном простом рабочем пространстве.",
  url: "Ссылка", placeholder: "example.com/your-page", invalid: "Ссылка выглядит некорректно. Попробуйте, например, example.com.",
  empty: "Введите ссылку, чтобы увидеть QR-код.", fg: "Цвет кода", bg: "Цвет фона", size: "Размер (px)", ecc: "Коррекция ошибок",
  margin: "Тихая зона (модули)", reset: "Сбросить", png: "Скачать PNG", svg: "Скачать SVG", copy: "Копировать ссылку", copied: "Ссылка скопирована",
  downloaded: "Загрузка началась", filename: "Имя файла", contrast: "Низкий контраст — QR-код может плохо сканироваться. Используйте тёмный код на светлом фоне.",
  privacy: "QR-коды создаются локально в вашем браузере. Ваши ссылки никуда не отправляются.",
  aboutTitle: "О QRIM", aboutText: "QRIM — продуманный инструмент для создания QR-кодов, который делает обмен цифровыми ссылками проще, быстрее и доступнее.",
  tagline: "Просто по замыслу. Точно по природе.", footerDesc: "Изысканный генератор QR-кодов.", creator: "Создано Muhammad Ilham Ramadhan · 2026",
  ai: "Создано Muhammad Ilham Ramadhan при помощи Claude AI.", language: "Язык", preview: "Предпросмотр",
};
export const dictionaries = { en, zh, ru };
export type Lang = keyof typeof dictionaries;
export const langNames: Record<Lang, string> = { en: "English", zh: "简体中文", ru: "Русский" };
