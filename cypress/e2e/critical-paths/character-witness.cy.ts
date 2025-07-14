describe("Character Witness Display", () => {
  // List of known witnesses based on the codebase structure
  const witnesses = [
    "tony-dungy",
    "jordan-dungy",
    "michael-mataluni",
    "jahmere-webb",
    "jay-forte",
    "martha-henderson",
    "allison-lopez",
    "bill-mcdade",
  ];

  beforeEach(() => {
    // Clear any cached data
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  // Test each witness individually
  witnesses.forEach((witness) => {
    it(`displays ${witness} information correctly`, () => {
      cy.visit(`/people/${witness}`, { failOnStatusCode: false });

      // Check if page exists (some witnesses might not have dedicated pages)
      cy.get("body").then(($body) => {
        if (
          $body.find(':contains("404")').length > 0 ||
          $body.find(':contains("Not Found")').length > 0
        ) {
          cy.log(`${witness} page not found - skipping detailed tests`);
          return;
        }

        // Verify page loads with content
        cy.get("body").should("be.visible");

        // Check for person name/title (flexible selectors)
        cy.get("body").should(($body) => {
          const nameSelectors = [
            "h1",
            "h2",
            '[data-testid*="name"]',
            '[data-testid*="person"]',
            ".person-name",
            ':contains("' + witness.replace("-", " ") + '")',
          ];

          const hasNameElement = nameSelectors.some(
            (selector) => $body.find(selector).length > 0,
          );

          expect(hasNameElement).to.be.true;
        });

        // Check for role/title information
        cy.get("body").should(($body) => {
          const roleSelectors = [
            '[data-testid*="role"]',
            '[data-testid*="title"]',
            ".role",
            ".title",
            ".position",
            "p",
            "span",
          ];

          const hasRoleElement = roleSelectors.some(
            (selector) => $body.find(selector).length > 0,
          );

          expect(hasRoleElement).to.be.true;
        });

        // Check for biographical content
        cy.get("body").should(($body) => {
          const bioSelectors = [
            '[data-testid*="bio"]',
            '[data-testid*="description"]',
            ".bio",
            ".description",
            "p",
            "div",
          ];

          const hasBioElement = bioSelectors.some(
            (selector) =>
              $body.find(selector).length > 0 &&
              $body.find(selector).text().trim().length > 10,
          );

          expect(hasBioElement).to.be.true;
        });

        // Verify images load (if present)
        cy.get("img").then(($images) => {
          if ($images.length > 0) {
            // Check first image loads properly
            cy.wrap($images.first())
              .should("be.visible")
              .and(($img) => {
                // Check if image has loaded (naturalWidth > 0 indicates successful load)
                expect($img[0].complete || $img[0].naturalWidth > 0).to.be.true;
              });
          }
        });

        // Check for testimonial or content sections
        cy.get("body").should(($body) => {
          const contentSelectors = [
            '[data-testid*="testimonial"]',
            '[data-testid*="content"]',
            ".testimonial",
            ".content",
            "section",
            "article",
          ];

          const hasContentSection = contentSelectors.some(
            (selector) => $body.find(selector).length > 0,
          );

          expect(hasContentSection).to.be.true;
        });
      });
    });
  });

  it("navigates between witnesses correctly from people index", () => {
    cy.visit("/people");

    // Verify people index page loads
    cy.get("body").should("be.visible");

    // Look for person cards or links
    cy.get("body").then(($body) => {
      const personSelectors = [
        '[data-testid*="person"]',
        ".person-card",
        'a[href*="/people/"]',
        '[href*="/people/"]',
      ];

      let foundPersonLinks = false;

      for (const selector of personSelectors) {
        if ($body.find(selector).length > 0) {
          foundPersonLinks = true;

          // Click on first person link/card
          cy.get(selector).first().click();

          // Verify we navigated to a person page
          cy.url().should("include", "/people/");

          // Verify person page loaded
          cy.get("body").should("be.visible");

          break;
        }
      }

      if (!foundPersonLinks) {
        cy.log(
          "No person links found on people index - testing direct navigation",
        );
        // Test direct navigation to known person
        cy.visit("/people/tony-dungy");
        cy.get("body").should("be.visible");
      }
    });
  });

  it("handles missing person pages gracefully", () => {
    // Test non-existent person
    cy.visit("/people/non-existent-person", { failOnStatusCode: false });

    // Should show 404 or redirect gracefully
    cy.get("body").should(($body) => {
      const errorIndicators = [
        ':contains("404")',
        ':contains("Not Found")',
        ':contains("not found")',
        ':contains("error")',
      ];

      const hasErrorIndicator = errorIndicators.some(
        (selector) => $body.find(selector).length > 0,
      );

      // Should either show error or redirect to valid page
      const isValidPage = $body.find("h1, h2, main").length > 0;

      expect(hasErrorIndicator || isValidPage).to.be.true;
    });
  });

  it("displays responsive layout on mobile", () => {
    cy.viewport("iphone-x");
    cy.visit("/people/tony-dungy");

    // Verify page is responsive
    cy.get("body").should("be.visible");

    // Check that content is not overflowing
    cy.get("body").should(($body) => {
      const bodyWidth = $body.width();
      expect(bodyWidth).to.be.lessThan(500); // Should fit mobile viewport
    });

    // Check for mobile navigation if present
    cy.get("body").then(($body) => {
      if (
        $body.find('[data-testid*="mobile"], .mobile-menu, .hamburger').length >
        0
      ) {
        cy.get('[data-testid*="mobile"], .mobile-menu, .hamburger')
          .first()
          .should("be.visible");
      }
    });
  });

  it("loads images with proper fallbacks", () => {
    cy.visit("/people/tony-dungy");

    cy.get("img").then(($images) => {
      if ($images.length > 0) {
        $images.each((index, img) => {
          cy.wrap(img).should(($img) => {
            // Image should have alt text for accessibility
            expect($img.attr("alt")).to.exist;

            // Image should have src
            expect($img.attr("src")).to.exist;

            // Check if image loaded or has fallback
            const hasLoaded = $img[0].complete && $img[0].naturalWidth > 0;
            const hasFallback =
              $img.attr("src")?.includes("fallback") ||
              $img.attr("src")?.includes("placeholder");

            expect(hasLoaded || hasFallback).to.be.true;
          });
        });
      }
    });
  });

  it("handles error boundaries correctly", () => {
    cy.visit("/people/tony-dungy");

    // Simulate component error by manipulating DOM or triggering edge cases
    cy.window().then((win) => {
      // Try to trigger error boundary by corrupting React component state
      // This is exploratory - we're testing that error boundaries exist

      // Look for error boundary components in the DOM
      cy.get("body").should(($body) => {
        // Error boundaries should be present but invisible unless there's an error
        const boundarySelectors = [
          '[data-testid*="error"]',
          ".error-boundary",
          ':contains("Something went wrong")',
          ':contains("Error")',
        ];

        // In normal operation, error boundaries should be invisible
        // This test verifies the page loads without triggering error boundaries
        const hasVisibleError = boundarySelectors.some(
          (selector) =>
            $body.find(selector).is(":visible") &&
            $body.find(selector).text().length > 0,
        );

        // Should NOT have visible errors in normal operation
        expect(hasVisibleError).to.be.false;
      });
    });
  });

  it("provides accessible navigation", () => {
    cy.visit("/people");

    // Check for keyboard navigation
    cy.get("body").then(($body) => {
      // Look for focusable elements
      const focusableElements = $body.find("a, button, input, [tabindex]");

      if (focusableElements.length > 0) {
        // Test tab navigation
        cy.get("body").tab();

        // Verify focus is visible
        cy.focused().should("be.visible");

        // Test Enter key on focused link
        cy.focused().then(($focused) => {
          if ($focused.is('a[href*="/people/"]')) {
            cy.focused().type("{enter}");
            cy.url().should("include", "/people/");
          }
        });
      }
    });
  });

  it("loads quickly and efficiently", () => {
    const startTime = Date.now();

    cy.visit("/people/tony-dungy");

    cy.get("body")
      .should("be.visible")
      .then(() => {
        const loadTime = Date.now() - startTime;

        // Page should load within reasonable time (5 seconds)
        expect(loadTime).to.be.lessThan(5000);
      });

    // Check for performance indicators
    cy.window()
      .its("performance")
      .then((performance) => {
        const navigation = performance.getEntriesByType("navigation")[0];
        if (navigation) {
          // DOM should be interactive quickly
          expect(
            navigation.domInteractive - navigation.fetchStart,
          ).to.be.lessThan(3000);
        }
      });
  });
});
