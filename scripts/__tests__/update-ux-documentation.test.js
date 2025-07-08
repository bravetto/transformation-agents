const { jest } = require("@jest/globals");
const path = require("path");
const fs = require("fs").promises;
const UXDocumentationUpdater = require("../update-ux-documentation");

describe("UXDocumentationUpdater", () => {
  let updater;
  let mockFs;

  beforeEach(() => {
    updater = new UXDocumentationUpdater();
    mockFs = {
      readFile: jest.fn(),
      writeFile: jest.fn(),
      access: jest.fn(),
    };
    updater.fs = mockFs;
  });

  describe("Page Analysis", () => {
    test("correctly identifies page components", async () => {
      const mockContent = `
        export default function HomePage() {
          return (
            <div>
              <h1>Welcome</h1>
              <Button href="/contact">Contact</Button>
            </div>
          )
        }
      `;
      mockFs.readFile.mockResolvedValue(mockContent);

      const result = await updater.analyzePage("src/app/page.tsx");
      expect(result.components).toContain("Button");
      expect(result.links).toContain("/contact");
    });

    test("detects user interaction points", async () => {
      const mockContent = `
        export default function ContactPage() {
          const handleSubmit = () => {};
          return (
            <form onSubmit={handleSubmit}>
              <input type="text" onChange={handleChange} />
              <button onClick={handleClick}>Submit</button>
            </form>
          )
        }
      `;
      mockFs.readFile.mockResolvedValue(mockContent);

      const result = await updater.analyzePage("src/app/contact/page.tsx");
      expect(result.interactionPoints).toContain("form-submit");
      expect(result.interactionPoints).toContain("input-change");
      expect(result.interactionPoints).toContain("button-click");
    });
  });

  describe("Link Analysis", () => {
    test("validates internal links", async () => {
      const mockPages = new Map([
        ["/contact", true],
        ["/about", true],
      ]);
      updater.pageRegistry = mockPages;

      const result = await updater.validateLink("/contact");
      expect(result.valid).toBe(true);
    });

    test("detects broken internal links", async () => {
      const mockPages = new Map([
        ["/contact", true],
        ["/about", true],
      ]);
      updater.pageRegistry = mockPages;

      const result = await updater.validateLink("/nonexistent");
      expect(result.valid).toBe(false);
      expect(result.error).toBe("Page not found");
    });
  });

  describe("Documentation Generation", () => {
    test("generates valid markdown", async () => {
      const mockState = {
        pages: new Map([
          ["/", { title: "Home", components: ["Button"], links: ["/contact"] }],
        ]),
        components: new Map([["Button", { usage: 1, locations: ["/"] }]]),
      };
      updater.state = mockState;

      const doc = await updater.generateDocumentation();
      expect(doc).toContain("# Website UX/UI State");
      expect(doc).toContain("## Pages");
      expect(doc).toContain("Home");
    });
  });
});
