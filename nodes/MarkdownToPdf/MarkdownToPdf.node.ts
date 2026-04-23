import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from "n8n-workflow";

import { marked } from "marked";
import puppeteer from "puppeteer";

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
        description: "The markdown content to convert to PDF",
        typeOptions: {
          rows: 20,
        },
      },
    ],
  };

  async execute(
    this: IExecuteFunctions
  ): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    try {
      for (let i = 0; i < items.length; i++) {
        const markdown =
          (items[i].json.markdown as string) ||
          (this.getNodeParameter("markdown", i) as string);

        if (!markdown?.trim()) {
          throw new Error("Markdown input is empty or invalid");
        }

        const html = marked.parse(markdown);

        // Reset page cleanly
        await page.goto("about:blank");

        await page.setContent(
          `
          <html>
            <head>
              <!-- KaTeX CSS -->
              <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex/dist/katex.min.css">
              
              <!-- KaTeX JS -->
              <script src="https://cdn.jsdelivr.net/npm/katex/dist/katex.min.js"></script>
              <script src="https://cdn.jsdelivr.net/npm/katex/dist/contrib/auto-render.min.js"></script>

              <style>
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
              </style>
            </head>

            <body>
              ${html}
            </body>
          </html>
          `,
          { waitUntil: "networkidle0" }
        );

        // Render math formulas
        await page.evaluate(() => {
          // @ts-ignore
          if (window.renderMathInElement) {
            // @ts-ignore
            window.renderMathInElement(document.body, {
              delimiters: [
                { left: "$$", right: "$$", display: true },
                { left: "$", right: "$", display: false },
              ],
            });
          }
        });

        const pdfBuffer = await page.pdf({
          format: "A4",
          printBackground: true,
          margin: {
            top: "20mm",
            bottom: "20mm",
            left: "15mm",
            right: "15mm",
          },
        });

        const binaryData = await this.helpers.prepareBinaryData(
          Buffer.from(pdfBuffer),
          `file-${i + 1}.pdf`,
          "application/pdf"
        );

        returnData.push({
          json: {
            fileName: `file-${i + 1}.pdf`,
            size: pdfBuffer.length,
          },
          binary: {
            data: binaryData,
          },
        });
      }
    } finally {
      await page.close().catch(() => {});
      await browser.close().catch(() => {});
    }

    return [returnData];
  }
}