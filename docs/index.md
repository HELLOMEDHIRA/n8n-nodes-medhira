# n8n-nodes-medhira

[![NPM Version](https://img.shields.io/npm/v/n8n-nodes-medhira.svg)](https://www.npmjs.com/package/n8n-nodes-medhira)
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
npm install n8n-nodes-medhira
```

### Step 3: Restart n8n

```bash
docker restart n8n
```

Done! The **Markdown To Pdf** node is now available in your n8n editor.

## Usage in 30 Seconds

1. **Add Node**: Press `Ctrl+K` → Search "Markdown To Pdf" → Add to workflow
2. **Enter Markdown**: Type or paste your Markdown content
3. **Save PDF**: Connect to **Write Binary File** node

```
[Any Node] → [Markdown To Pdf] → [Write Binary File]
```

## Features

- **Free Alternative** - No paid nodes required
- **High-Quality PDF** - Professional output with styling
- **Full Markdown** - Headers, lists, tables, code blocks
- **Math Formulas** - KaTeX support for LaTeX math
- **Code Highlighting** - Syntax highlighting for code
- **Batch Processing** - Process multiple items

## Quick Links

- [Installation Guide](./installation.md)
- [Usage Guide](./usage.md)
- [Configuration](./configuration.md)
- [GitHub](https://github.com/HELLOMEDHIRA/n8n-nodes-medhira)
- [NPM Package](https://www.npmjs.com/package/n8n-nodes-medhira)
- [MEDHIRA](https://medhira.readthedocs.io/en/latest/)
- [Contact](mailto:hello.medhira@gmail.com)

## License

Licensed under [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)

---

Made with love by [MEDHIRA](https://medhira.readthedocs.io/en/latest/)