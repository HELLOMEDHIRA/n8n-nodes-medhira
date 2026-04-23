# n8n-nodes-medhira

[![NPM Version](https://img.shields.io/npm/v/@medhira/n8n-nodes-markdown-pdf.svg)](https://www.npmjs.com/package/@medhira/n8n-nodes-markdown-pdf)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0)
[![ MEDHIRA](https://img.shields.io/badge/Powered%20by-MEDHIRA-blue)](https://medhira.readthedocs.io/en/latest/)

**Convert Markdown to PDF inside n8n using Puppeteer - A Medhira community package**

![MEDHIRA](https://raw.githubusercontent.com/HELLOMEDHIRA/medhira/main/assets/medhira-logo.png)

## Install in 30 Seconds

### Step 1: Access n8n Terminal

```bash
docker exec -it n8n sh
```

### Step 2: Install the Node

```bash
mkdir -p ~/.n8n/nodes && cd ~/.n8n/nodes
npm install @medhira/n8n-nodes-markdown-pdf
```

### Step 3: Restart n8n

```bash
docker restart n8n
```

Done! The **MarkdownToPdf** node is now available in your n8n editor.

## Usage in 30 Seconds

1. **Add Node**: Press `Ctrl+K` → Search "MarkdownToPdf" → Add to workflow
2. **Enter Markdown**: Type or paste your Markdown content
3. **Save PDF**: Connect to **Write Binary File** node

```
[Any Node] → [MarkdownToPdf] → [Write Binary File]
```

## Features

- **Free Alternative** - No paid nodes required
- **High-Quality PDF** - Professional output with styling
- **Full Markdown** - Headers, lists, tables, code blocks
- **Math Formulas** - KaTeX support for LaTeX math
- **Code Highlighting** - Syntax highlighting for code

## Example Markdown

```markdown
# Hello World

This is **bold** and *italic* text.

## Features
- Item 1
- Item 2
- Item 3

## Code
\`\`\`javascript
console.log("Hello, PDF!");
\`\`\`
```

## Quick Links

- [Documentation](https://medhira.readthedocs.io/en/latest/n8n-nodes-medhira/)
- [GitHub](https://github.com/HELLOMEDHIRA/n8n-nodes-medhira)
- [NPM Package](https://www.npmjs.com/package/@medhira/n8n-nodes-markdown-pdf)
- [MEDHIRA](https://medhira.readthedocs.io/en/latest/)
- [Report Bug](https://github.com/HELLOMEDHIRA/n8n-nodes-medhira/issues)
- [Contact](mailto:hello.medhira@gmail.com)

## License

Licensed under [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)

---

Made with love by [MEDHIRA](https://medhira.readthedocs.io/en/latest/)