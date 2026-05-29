import * as fs from "fs";
import * as path from "path";

import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from "n8n-workflow";

import hljs from "highlight.js";
import { marked } from "marked";
import puppeteer from "puppeteer";
import sanitizeHtml from "sanitize-html";

type PdfFormat = "A4" | "Letter" | "Legal";

interface KaTeXWindow extends Window {
  renderMathInElement?: (
    element: HTMLElement,
    options: {
      delimiters: Array<{ left: string; right: string; display: boolean }>;
    }
  ) => void;
}

const katexRoot = path.dirname(require.resolve("katex/package.json"));
const hljsRoot = path.dirname(require.resolve("highlight.js/package.json"));

const KATEX_CSS = fs.readFileSync(
  path.join(katexRoot, "dist/katex.min.css"),
  "utf8"
);
const KATEX_JS = fs.readFileSync(
  path.join(katexRoot, "dist/katex.min.js"),
  "utf8"
);
const KATEX_AUTO_RENDER = fs.readFileSync(
  path.join(katexRoot, "dist/contrib/auto-render.min.js"),
  "utf8"
);
const HIGHLIGHT_CSS = fs.readFileSync(
  path.join(hljsRoot, "styles/github.min.css"),
  "utf8"
);

const BASE_STYLES = `
  body {
    font-family: Arial, sans-serif;
    padding: 40px;
    line-height: 1.6;
    color: #222;
    max-width: 800px;
    margin: auto;
  }

  h1, h2, h3 {
    margin-top: 30px;
    margin-bottom: 10px;
  }

  p {
    margin: 10px 0;
  }

  hr {
    margin: 20px 0;
    border: none;
    border-top: 1px solid #ccc;
  }

  code {
    background: #f4f4f4;
    padding: 4px 6px;
    border-radius: 4px;
  }

  pre {
    background: #f4f4f4;
    padding: 12px;
    border-radius: 6px;
    overflow-x: auto;
  }

  pre code {
    background: transparent;
    padding: 0;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    margin: 20px 0;
  }

  th, td {
    border: 1px solid #ccc;
    padding: 8px 12px;
    text-align: left;
  }

  th {
    background: #f0f0f0;
  }

  mark {
    background: yellow;
  }
`;

marked.use({
  gfm: true,
  breaks: false,
  renderer: {
    code({ text, lang }) {
      const language = lang && hljs.getLanguage(lang) ? lang : "plaintext";
      const highlighted = hljs.highlight(text, { language }).value;
      return `<pre><code class="hljs language-${language}">${highlighted}</code></pre>`;
    },
  },
});

function sanitizeRenderedHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      "img",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "span",
      "del",
      "ins",
      "sub",
      "sup",
    ]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      span: ["class", "style"],
      code: ["class"],
      pre: ["class"],
      img: ["src", "alt", "title", "width", "height"],
      a: ["href", "name", "target", "rel"],
    },
  });
}

function buildHtmlDocument(bodyHtml: string): string {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>${KATEX_CSS}</style>
    <style>${HIGHLIGHT_CSS}</style>
    <style>${BASE_STYLES}</style>
    <script>${KATEX_JS}</script>
    <script>${KATEX_AUTO_RENDER}</script>
  </head>
  <body>${bodyHtml}</body>
</html>`;
}

function resolveFileName(
  template: string,
  index: number,
  fallback: string
): string {
  const resolved = template
    .replace(/\{\{\s*\$index\s*\}\}/g, String(index + 1))
    .replace(/\{\{\s*\$itemIndex\s*\}\}/g, String(index))
    .trim();

  if (!resolved) {
    return fallback;
  }

  return resolved.endsWith(".pdf") ? resolved : `${resolved}.pdf`;
}

export class MarkdownToPdf implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Markdown To Pdf",
    name: "markdownToPdf",
    group: ["transform"],
    version: 1,
    icon: "file:markdownToPdf.svg",
    subtitle: "Convert Markdown → PDF",
    description: "Convert Markdown text into a PDF file",
    defaults: {
      name: "Markdown To Pdf",
    },
    inputs: ["main"],
    outputs: ["main"],
    properties: [
      {
        displayName: "Markdown",
        name: "markdown",
        type: "string",
        default: "",
        placeholder: "Enter your markdown here",
        description:
          "The markdown content to convert to PDF. Can also be supplied via input JSON field `markdown`.",
        typeOptions: {
          rows: 20,
        },
      },
      {
        displayName: "File Name",
        name: "fileName",
        type: "string",
        default: "file-{{ $index }}",
        placeholder: "file-{{ $index }}",
        description:
          "Output PDF file name. Use {{ $index }} for the 1-based item number. The .pdf extension is added automatically if missing.",
      },
      {
        displayName: "PDF Format",
        name: "pdfFormat",
        type: "options",
        default: "A4",
        options: [
          { name: "A4", value: "A4" },
          { name: "Letter", value: "Letter" },
          { name: "Legal", value: "Legal" },
        ],
        description: "Page size for the generated PDF",
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    try {
      for (let i = 0; i < items.length; i++) {
        try {
          const markdown =
            (items[i].json.markdown as string) ||
            (this.getNodeParameter("markdown", i) as string);

          if (!markdown?.trim()) {
            throw new Error("Markdown input is empty or invalid");
          }

          const fileNameTemplate = this.getNodeParameter(
            "fileName",
            i
          ) as string;
          const pdfFormat = this.getNodeParameter("pdfFormat", i) as PdfFormat;

          const parsedHtml = await marked.parse(markdown);
          const safeHtml = sanitizeRenderedHtml(String(parsedHtml));
          const documentHtml = buildHtmlDocument(safeHtml);

          await page.goto("about:blank");
          await page.setContent(documentHtml, { waitUntil: "load" });

          await page.evaluate(() => {
            const katexWindow = window as KaTeXWindow;
            if (typeof katexWindow.renderMathInElement === "function") {
              katexWindow.renderMathInElement(document.body, {
                delimiters: [
                  { left: "$$", right: "$$", display: true },
                  { left: "$", right: "$", display: false },
                ],
              });
            }
          });

          const pdfBuffer = await page.pdf({
            format: pdfFormat,
            printBackground: true,
            margin: {
              top: "20mm",
              bottom: "20mm",
              left: "15mm",
              right: "15mm",
            },
          });

          const fileName = resolveFileName(
            fileNameTemplate,
            i,
            `file-${i + 1}.pdf`
          );

          const binaryData = await this.helpers.prepareBinaryData(
            Buffer.from(pdfBuffer),
            fileName,
            "application/pdf"
          );

          returnData.push({
            json: {
              fileName,
              size: pdfBuffer.length,
            },
            binary: {
              data: binaryData,
            },
            pairedItem: { item: i },
          });
        } catch (error) {
          if (this.continueOnFail()) {
            const message =
              error instanceof Error ? error.message : "Unknown error";

            returnData.push({
              json: { error: message },
              pairedItem: { item: i },
            });
            continue;
          }

          throw error;
        }
      }
    } finally {
      await page.close().catch(() => {});
      await browser.close().catch(() => {});
    }

    return [returnData];
  }
}
