# Installation

This guide helps you install the **Markdown To Pdf** node for n8n in just 3 simple steps.

## Prerequisites

| Requirement | Version | Notes |
|-------------|---------|-------|
| [Node.js](https://nodejs.org/) | 18+ | LTS recommended |
| [n8n](https://n8n.io/) | Self-hosted | Required (not supported on n8n Cloud) |

## Quick Install (Recommended)

### Step 1: Access Your n8n Terminal

Depending on how you run n8n:

```bash
# Docker
docker exec -it n8n sh

# Or local n8n (terminal)
# Just open your terminal - no docker exec needed
```

### Step 2: Create Nodes Directory

```bash
mkdir -p ~/.n8n/nodes
cd ~/.n8n/nodes
```

### Step 3: Install the Node

```bash
npm install n8n-nodes-medhira
```

### Step 4: Restart n8n

```bash
# Docker
docker restart n8n

# npx n8n
# Stop (Ctrl+C) and run: npx n8n

# Global installation
# Stop and run: n8n
```

That's it! The node is now installed.

## Install Without Docker

If you're running n8n via npx or global install:

```bash
# Create nodes directory
mkdir -p ~/.n8n/nodes
cd ~/.n8n/nodes

# Install the node
npm install n8n-nodes-medhira

# Restart n8n
# Stop current n8n (Ctrl+C) and start again
npx n8n
# or
n8n
```

## Alternative: In-App Installation

For verified community nodes, you can install directly from n8n:

1. Open n8n in your browser
2. Go to **Settings** → **Community Nodes**
3. Enter the package name: `n8n-nodes-medhira`
4. Click **Install**

## Verify Installation

1. Open n8n
2. Press `Ctrl+K` (or `Cmd+K` on Mac) to open node search
3. Type `Markdown To Pdf`
4. You should see the node in results

## Usage in 30 Seconds

1. **Add Node**: Search for "Markdown To Pdf" and add it to your workflow
2. **Enter Markdown**: Type or paste your Markdown in the text field
3. **Connect Output**: Connect to **Write Binary File** to save the PDF

Example workflow:

```
[Webhook/Any Input] → [Markdown To Pdf] → [Write Binary File]
```

## Upgrade

```bash
cd ~/.n8n/nodes
npm update n8n-nodes-medhira
```

## Uninstall

```bash
cd ~/.n8n/nodes
npm uninstall n8n-nodes-medhira
```

## Troubleshooting

### "Community nodes not loading"

- Ensure you're using **self-hosted n8n** (not n8n Cloud)
- Restart n8n after installation
- Check logs: `docker logs n8n`

### Puppeteer Errors

If you see Chrome/Puppeteer errors:

```bash
# Install required system libraries (Ubuntu/Debian)
apt-get update && apt-get install -y \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libasound2
```

### Permission Denied

If you get permission errors:

```bash
# Fix ownership
sudo chown -R $(whoami) ~/.n8n
```

## Next Steps

- See **[Usage Guide](./usage.md)** for detailed examples
- See **[Configuration](./configuration.md)** for PDF settings