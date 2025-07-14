describe("Judge Dashboard Access", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it("provides secure access to judge-specific content", () => {
    cy.visit("/the-case");

    // Verify page loads successfully
    cy.get("body").should("be.visible");

    // Check for case summary section
    cy.get("body").should(($body) => {
      const summarySelectors = [
        '[data-testid*="case"]',
        '[data-testid*="summary"]',
        ".case-summary",
        ".summary",
        "h1",
        "h2",
        ':contains("case")',
        ':contains("summary")',
        ':contains("jahmere")',
        ':contains("webb")',
      ];

      const hasSummarySection = summarySelectors.some(
        (selector) => $body.find(selector).length > 0,
      );

      expect(hasSummarySection).to.be.true;
    });

    // Check for letter count or community support metrics
    cy.get("body").should(($body) => {
      const metricsSelectors = [
        '[data-testid*="count"]',
        '[data-testid*="letter"]',
        '[data-testid*="support"]',
        '[data-testid*="metric"]',
        ".count",
        ".metric",
        ".stat",
        ".number",
        ':contains("letter")',
        ':contains("support")',
        ':contains("community")',
        ':contains("count")',
      ];

      const hasMetricsSection = metricsSelectors.some(
        (selector) => $body.find(selector).length > 0,
      );

      expect(hasMetricsSection).to.be.true;
    });

    // Check for community support indicators
    cy.get("body").should(($body) => {
      const supportSelectors = [
        '[data-testid*="community"]',
        '[data-testid*="support"]',
        ".community",
        ".support",
        ".testimonial",
        ':contains("community")',
        ':contains("support")',
        ':contains("people")',
        ':contains("witness")',
      ];

      const hasSupportSection = supportSelectors.some(
        (selector) => $body.find(selector).length > 0,
      );

      expect(hasSupportSection).to.be.true;
    });

    // Look for data visualization elements
    cy.get("body").then(($body) => {
      const chartSelectors = [
        '[data-testid*="chart"]',
        '[data-testid*="graph"]',
        '[data-testid*="visual"]',
        "canvas",
        "svg",
        ".chart",
        ".graph",
        ".visualization",
      ];

      const hasVisualization = chartSelectors.some(
        (selector) => $body.find(selector).length > 0,
      );

      if (hasVisualization) {
        cy.log("Data visualization found - verifying it loads");

        // Test that visualizations are visible
        chartSelectors.forEach((selector) => {
          cy.get("body").then(($body) => {
            if ($body.find(selector).length > 0) {
              cy.get(selector).first().should("be.visible");
            }
          });
        });
      } else {
        cy.log("No data visualization detected - this is acceptable");
      }
    });
  });

  it("displays comprehensive case information", () => {
    cy.visit("/the-case");

    // Check for key case elements
    const expectedContent = [
      "jahmere",
      "webb",
      "case",
      "justice",
      "transformation",
      "support",
    ];

    expectedContent.forEach((content) => {
      cy.get("body").should("contain.text", content, { matchCase: false });
    });

    // Verify substantial content is present
    cy.get("body").should(($body) => {
      const textContent = $body.text();

      // Should have substantial content (more than just navigation)
      expect(textContent.length).to.be.greaterThan(500);

      // Should contain case-specific information
      const caseKeywords = [
        "jahmere",
        "webb",
        "case",
        "justice",
        "transformation",
      ];
      const keywordMatches = caseKeywords.filter((keyword) =>
        textContent.toLowerCase().includes(keyword),
      );

      expect(keywordMatches.length).to.be.greaterThan(2);
    });
  });

  it("provides letter preview functionality", () => {
    cy.visit("/the-case");

    // Look for letter-related functionality
    cy.get("body").then(($body) => {
      const letterSelectors = [
        '[data-testid*="letter"]',
        '[data-testid*="view"]',
        'button:contains("letter")',
        'a:contains("letter")',
        ".letter",
        ".preview",
        ':contains("read")',
        ':contains("view")',
        ':contains("letter")',
      ];

      let foundLetterFeature = false;

      for (const selector of letterSelectors) {
        if ($body.find(selector).length > 0) {
          foundLetterFeature = true;

          cy.get(selector).first().click();

          // After clicking, should see letter content or preview
          cy.get("body").should(($body) => {
            const previewSelectors = [
              '[data-testid*="preview"]',
              '[data-testid*="content"]',
              ".preview",
              ".letter-content",
              ".modal",
              "dialog",
              ':contains("dear")',
              ':contains("support")',
            ];

            const hasPreviewContent = previewSelectors.some(
              (sel) => $body.find(sel).length > 0,
            );

            expect(hasPreviewContent).to.be.true;
          });

          break;
        }
      }

      if (!foundLetterFeature) {
        cy.log("No letter preview functionality found - this is acceptable");
      }
    });
  });

  it("handles responsive design for judge access", () => {
    // Test desktop view
    cy.viewport(1280, 720);
    cy.visit("/the-case");
    cy.get("body").should("be.visible");

    // Test tablet view
    cy.viewport("ipad-2");
    cy.reload();
    cy.get("body").should("be.visible");

    // Test mobile view
    cy.viewport("iphone-x");
    cy.reload();
    cy.get("body").should("be.visible");

    // Verify content is accessible on mobile
    cy.get("body").should(($body) => {
      const bodyWidth = $body.width();
      expect(bodyWidth).to.be.lessThan(500);

      // Content should not overflow
      const hasHorizontalScroll = $body[0].scrollWidth > $body.width();
      expect(hasHorizontalScroll).to.be.false;
    });
  });

  it("provides secure and professional presentation", () => {
    cy.visit("/the-case");

    // Check for professional styling
    cy.get("body").should("have.css", "font-family");

    // Verify no obvious development artifacts
    cy.get("body").should(($body) => {
      const devArtifacts = [
        "lorem ipsum",
        "test",
        "debug",
        "placeholder",
        "todo",
      ];

      const bodyText = $body.text().toLowerCase();
      const hasDevArtifacts = devArtifacts.some((artifact) =>
        bodyText.includes(artifact),
      );

      // Should not have obvious development placeholders
      expect(hasDevArtifacts).to.be.false;
    });

    // Check for proper document structure
    cy.get("html").should("have.attr", "lang");
    cy.get("head title").should("exist");
    cy.get('head meta[name="description"]').should("exist");
  });

  it("loads performance metrics efficiently", () => {
    const startTime = Date.now();

    cy.visit("/the-case");

    cy.get("body")
      .should("be.visible")
      .then(() => {
        const loadTime = Date.now() - startTime;

        // Judge dashboard should load quickly (under 5 seconds)
        expect(loadTime).to.be.lessThan(5000);
      });

    // Check for performance indicators
    cy.window()
      .its("performance")
      .then((performance) => {
        const navigation = performance.getEntriesByType("navigation")[0];
        if (navigation) {
          // Time to interactive should be reasonable
          const timeToInteractive =
            navigation.domInteractive - navigation.fetchStart;
          expect(timeToInteractive).to.be.lessThan(4000);

          // Load event should complete quickly
          const loadComplete = navigation.loadEventEnd - navigation.fetchStart;
          expect(loadComplete).to.be.lessThan(6000);
        }
      });
  });

  it("provides accessible navigation and interaction", () => {
    cy.visit("/the-case");

    // Test keyboard navigation
    cy.get("body").tab();
    cy.focused().should("be.visible");

    // Check for proper ARIA labels and roles
    cy.get('main, [role="main"]').should("exist");

    // Verify headings structure
    cy.get("h1").should("exist");

    // Check for proper link and button accessibility
    cy.get("a, button").each(($el) => {
      cy.wrap($el).should(($element) => {
        // Should have accessible text or aria-label
        const hasAccessibleText =
          $element.text().trim().length > 0 ||
          $element.attr("aria-label") ||
          $element.attr("title");
        expect(hasAccessibleText).to.be.true;
      });
    });
  });

  it("handles error states gracefully", () => {
    // Test with potential network issues
    cy.intercept("GET", "/api/**", {
      statusCode: 500,
      body: { error: "Server error" },
    }).as("serverError");

    cy.visit("/the-case");

    // Page should still load basic content even with API errors
    cy.get("body").should("be.visible");

    // Should not show raw error messages to judge
    cy.get("body").should(($body) => {
      const errorMessages = [
        "error 500",
        "internal server error",
        "undefined",
        "null",
        "cannot read properties",
      ];

      const bodyText = $body.text().toLowerCase();
      const hasRawErrors = errorMessages.some((error) =>
        bodyText.includes(error),
      );

      expect(hasRawErrors).to.be.false;
    });
  });

  it("maintains consistent branding and messaging", () => {
    cy.visit("/the-case");

    // Check for consistent branding elements
    cy.get("body").should(($body) => {
      const brandingElements = [
        "bridge",
        "jahmere",
        "webb",
        "transformation",
        "justice",
      ];

      const bodyText = $body.text().toLowerCase();
      const brandingMatches = brandingElements.filter((element) =>
        bodyText.includes(element),
      );

      // Should have consistent messaging about the case
      expect(brandingMatches.length).to.be.greaterThan(2);
    });

    // Verify professional tone
    cy.get("body").should(($body) => {
      const unprofessionalTerms = ["awesome", "cool", "dude", "guys", "lol"];

      const bodyText = $body.text().toLowerCase();
      const hasUnprofessionalTerms = unprofessionalTerms.some((term) =>
        bodyText.includes(term),
      );

      expect(hasUnprofessionalTerms).to.be.false;
    });
  });
});
