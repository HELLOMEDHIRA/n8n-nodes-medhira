# Configuration

## Node Properties

### Display Name
`Markdown To Pdf`

### Name
`markdownToPdf`

### Group
`transform`

### Version
`1`

### Description
Convert Markdown text into a PDF file

## Input Configuration

### Markdown Input

| Property | Value |
|----------|-------|
| Display Name | Markdown |
| Name | markdown |
| Type | String |
| Required | Yes |
| Default | (empty) |
| Placeholder | Enter your markdown here |

### Type Options

- **Rows**: 20 (allows multiline input)

## PDF Output Settings

The PDF generation uses the following default settings:

### Page Format
- **Format**: A4
- **Orientation**: Portrait

### Margins
- **Top**: 20mm
- **Bottom**: 20mm
- **Left**: 15mm
- **Right**: 15mm

### Styling Options

#### Font
- **Family**: Arial, sans-serif
- **Size**: Standard web font size
- **Color**: #222 (dark gray)

#### Headings
- Top margin: 30px
- Bottom margin: 10px

#### Code Blocks
- Background: #f4f4f4 (light gray)
- Padding: 12px
- Border radius: 6px
- Overflow: horizontal scroll

#### Tables
- Border collapse: collapsed
- Width: 100%
- Margin: 20px 0

#### Table Cells
- Border: 1px solid #ccc
- Padding: 8px 12px
- Text alignment: left
- Header background: #f0f0f0

#### Highlight (Mark)
- Background: yellow

## Custom CSS Styling

To add custom CSS, you can modify the node source code. The HTML template is located in `MarkdownToPdf.node.ts`.

### Example Custom Styles

```css
body {
  font-family: 'Georgia', serif;
  padding: 40px;
  line-height: 1.8;
  color: #333;
  max-width: 800px;
  margin: auto;
}

h1, h2, h3 {
  color: #1a73e8;
  margin-top: 30px;
  margin-bottom: 10px;
}

pre {
  background: #282c34;
  color: #abb2bf;
  padding: 12px;
  border-radius: 6px;
  overflow-x: auto;
}
```

## Puppeteer Configuration

The node launches Puppeteer with the following flags:

```javascript
{
  args: [
    "--no-sandbox",
    "--disable-setuid-sandbox"
  ]
}
```

### Customizing Puppeteer

To use a custom Puppeteer configuration (e.g., headless mode, custom browser path), modify the node source code:

```javascript
const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
  executablePath: "/path/to/chromium"
});
```

## Performance Considerations

1. **Browser Reuse**: The node launches a single browser instance and reuses it for multiple items
2. **Resource Cleanup**: Browser and page are properly closed in a finally block
3. **Memory Management**: Large Markdown inputs may require more memory

## Error Handling

The node throws errors in the following cases:

- Empty or invalid Markdown input
- Puppeteer initialization failure
- PDF generation errors
- Network errors (when loading external resources like KaTeX)

## Input from Previous Nodes

The node can receive Markdown input from previous nodes via:

1. **Node Parameter**: Entered directly in the node configuration
2. **Input Data**: Received from connected nodes

### Accessing Input Data

```typescript
const markdown = 
  (items[i].json.markdown as string) ||
  (this.getNodeParameter("markdown", i) as string);
```

This allows the node to use either:
- Data from the previous node's JSON output (key: `markdown`)
- Directly entered text in the node configuration