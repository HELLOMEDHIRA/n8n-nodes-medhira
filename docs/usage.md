# Usage

This guide shows you how to use the **Markdown To Pdf** node in n8n.

## Add the Node

1. Press `Ctrl+K` (or `Cmd+K` on Mac) to open node search
2. Type `Markdown To Pdf`
3. Select the node from results

## Configure

Enter your Markdown content in the **Markdown** field:

```markdown
# Document Title

This is a paragraph with **bold** and *italic* text.

## Features
- Feature 1
- Feature 2
- Feature 3
```

## Connect Output

Connect the node to save the PDF:

```
Markdown To Pdf → Write Binary File
```

In **Write Binary File**:
- **File Name**: `{{ $json.fileName }}` (or any name)
- **Data**: `{{ $binary.data }}`

## Complete Example

```
[Webhook] → [Markdown To Pdf] → [Write Binary File]
```

Set webhook to receive Markdown input, convert to PDF, and save to disk.

## Advanced

### Mathematical Formulas

The node supports KaTeX for math:

Inline: `$E = mc^2$`

Block:
```
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
```

### Tables

```markdown
| Header 1 | Header 2 |
|----------|---------|
| Cell 1   | Cell 2   |
```

### Code Blocks

````markdown
```javascript
function hello() {
  return "Hello, World!";
}
```
````

## Output Data

The node outputs:

| Property | Description |
|----------|-------------|
| `fileName` | PDF file name (e.g., `file-1.pdf`) |
| `size` | File size in bytes |
| `binary.data` | The PDF file content |

## Troubleshooting

### "No PDF generated"

- Ensure Markdown field is not empty
- Check input data from previous node contains `markdown` key

### "PDF is blank"

- Verify Markdown syntax is valid
- Check PDF margins in configuration