# Configuration

The **Markdown To Pdf** node comes with sensible defaults that work great out of the box.

## Node Properties

| Property | Value |
|-----------|-------|
| Display Name | Markdown To Pdf |
| Name | markdownToPdf |
| Group | transform |
| Version | 1 |

## Input

| Field | Type | Required |
|-------|------|----------|
| Markdown | String | Yes |

## Output

| Property | Description |
|----------|-------------|
| `fileName` | PDF file name (e.g., `file-1.pdf`) |
| `size` | File size in bytes |
| `binary.data` | PDF binary content |

## Default PDF Settings

- **Format**: A4
- **Orientation**: Portrait
- **Margins**: 20mm (top/bottom), 15mm (left/right)
- **Background**: Printed

That's it! No configuration needed.