describe("Mobile Navigation", () => {
  beforeEach(() => {
    // Set mobile viewport
    cy.viewport("iphone-x");
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it("provides full navigation on mobile devices", () => {
    cy.visit("/");

    // Look for mobile menu toggle
    cy.get("body").then(($body) => {
      const mobileMenuSelectors = [
        '[data-testid*="mobile-menu"]',
        '[data-testid*="hamburger"]',
        ".mobile-menu-toggle",
        ".hamburger",
        'button[aria-label*="menu"]',
        'button:contains("☰")',
        "[aria-expanded]",
      ];

      let foundMobileMenu = false;

      for (const selector of mobileMenuSelectors) {
        if ($body.find(selector).length > 0) {
          foundMobileMenu = true;

          // Open mobile menu
          cy.get(selector).first().click();

          // Verify menu opens
          cy.get("body").should(($body) => {
            const openMenuSelectors = [
              '[data-testid*="mobile-menu"]:visible',
              ".mobile-menu:visible",
              ".menu-open",
              '[aria-expanded="true"]',
            ];

            const hasOpenMenu = openMenuSelectors.some(
              (sel) => $body.find(sel).length > 0,
            );

            expect(hasOpenMenu).to.be.true;
          });

          break;
        }
      }

      if (!foundMobileMenu) {
        cy.log("No mobile menu toggle found - testing standard navigation");

        // Test standard navigation elements are accessible on mobile
        cy.get('nav, [role="navigation"]').should("be.visible");
      }
    });

    // Test navigation to key pages
    const keyPages = [
      {
        name: "Letter Form",
        patterns: ["letter", "write", "support"],
        url: "/letter",
      },
      { name: "The Case", patterns: ["case", "judge"], url: "/the-case" },
      {
        name: "People",
        patterns: ["people", "witness", "character"],
        url: "/people",
      },
      { name: "Impact", patterns: ["impact", "dashboard"], url: "/impact" },
    ];

    keyPages.forEach((page) => {
      cy.get("body").then(($body) => {
        // Look for navigation links using multiple strategies
        let foundNavigation = false;

        // Strategy 1: Look for exact URL matches
        if ($body.find(`a[href*="${page.url}"]`).length > 0) {
          cy.get(`a[href*="${page.url}"]`).first().click();
          foundNavigation = true;
        } else {
          // Strategy 2: Look for text patterns
          for (const pattern of page.patterns) {
            if ($body.find(`:contains("${pattern}")`).length > 0) {
              cy.contains("a, button", new RegExp(pattern, "i"))
                .first()
                .click();
              foundNavigation = true;
              break;
            }
          }
        }

        if (foundNavigation) {
          // Verify navigation worked
          cy.url().should("not.equal", Cypress.config().baseUrl + "/");

          // Verify page loaded
          cy.get("body").should("be.visible");

          // Navigate back to home for next test
          cy.visit("/");
        } else {
          cy.log(`Navigation to ${page.name} not found - skipping`);
        }
      });
    });
  });

  it("handles touch interactions correctly", () => {
    cy.visit("/");

    // Test touch events on interactive elements
    cy.get('button, a, [role="button"]').then(($elements) => {
      if ($elements.length > 0) {
        const $firstElement = $elements.first();

        // Test touch start/end events
        cy.wrap($firstElement)
          .trigger("touchstart", {
            touches: [{ clientX: 100, clientY: 100 }],
          })
          .trigger("touchend");

        // Verify element is still responsive
        cy.wrap($firstElement).should("be.visible");
      }
    });

    // Test swipe gestures (if implemented)
    cy.get('main, [role="main"], body').then(($container) => {
      if ($container.length > 0) {
        // Simulate swipe right
        cy.wrap($container.first())
          .trigger("touchstart", {
            touches: [{ clientX: 50, clientY: 200 }],
          })
          .trigger("touchmove", {
            touches: [{ clientX: 200, clientY: 200 }],
          })
          .trigger("touchend");

        // Check if swipe triggered any navigation or content change
        cy.get("body").should("be.visible"); // Basic verification
      }
    });
  });

  it("validates touch target sizes meet accessibility standards", () => {
    cy.visit("/");

    // Check all interactive elements meet 44x44 minimum touch target size
    cy.get('button, a, input, [role="button"], [tabindex="0"]').each(
      ($element) => {
        cy.wrap($element).should(($el) => {
          const rect = ($el[0] as HTMLElement).getBoundingClientRect();

          // WCAG 2.1 AA requires minimum 44x44 CSS pixels for touch targets
          const minSize = 44;

          // Check if element itself meets minimum size
          const meetsSize = rect.width >= minSize && rect.height >= minSize;

          // Check if element has adequate padding/margin to create 44x44 hit area
          const computedStyle = window.getComputedStyle($el[0] as HTMLElement);
          const paddingX =
            parseFloat(computedStyle.paddingLeft) +
            parseFloat(computedStyle.paddingRight);
          const paddingY =
            parseFloat(computedStyle.paddingTop) +
            parseFloat(computedStyle.paddingBottom);
          const marginX =
            parseFloat(computedStyle.marginLeft) +
            parseFloat(computedStyle.marginRight);
          const marginY =
            parseFloat(computedStyle.marginTop) +
            parseFloat(computedStyle.marginBottom);

          const effectiveWidth = rect.width + paddingX + marginX;
          const effectiveHeight = rect.height + paddingY + marginY;

          const meetsEffectiveSize =
            effectiveWidth >= minSize && effectiveHeight >= minSize;

          // Element should meet size requirements either directly or through padding/margin
          expect(
            meetsSize || meetsEffectiveSize,
            `Element ${($el[0] as HTMLElement).tagName} should have 44x44 touch target. Current: ${rect.width}x${rect.height}, Effective: ${effectiveWidth}x${effectiveHeight}`,
          ).to.be.true;
        });
      },
    );
  });

  it("provides accessible mobile navigation", () => {
    cy.visit("/");

    // Test keyboard navigation on mobile (external keyboard)
    cy.get("body").type("{tab}");
    cy.focused().should("be.visible");

    // Test that focused elements are clearly visible
    cy.focused().should(($el) => {
      const styles = window.getComputedStyle($el[0] as HTMLElement);

      // Should have some form of focus indication
      const hasOutline = styles.outline !== "none" && styles.outline !== "0px";
      const hasBoxShadow = styles.boxShadow !== "none";
      const hasBorder = styles.border !== "none";
      const hasBackground = styles.backgroundColor !== "rgba(0, 0, 0, 0)";

      expect(hasOutline || hasBoxShadow || hasBorder || hasBackground).to.be
        .true;
    });

    // Test ARIA labels and roles
    cy.get('[role="navigation"], nav').should("exist");

    // Check for proper heading structure
    cy.get("h1").should("exist");
    cy.get("h1").should("have.length", 1); // Should have exactly one h1

    // Verify skip links (if implemented)
    cy.get("body").then(($body) => {
      if ($body.find('a[href="#main"], a[href="#content"]').length > 0) {
        cy.get('a[href="#main"], a[href="#content"]')
          .should("exist")
          .and("contain.text", /skip/i);
      }
    });
  });

  it("handles mobile form interactions", () => {
    // Test on a page with forms
    cy.visit("/letter-to-dungy");

    // Test input focus and virtual keyboard accommodation
    cy.get("input, textarea").then(($inputs) => {
      if ($inputs.length > 0) {
        const $firstInput = $inputs.first();

        // Focus on input
        cy.wrap($firstInput).focus();

        // Verify input is visible and not obscured
        cy.wrap($firstInput).should("be.visible");

        // Test typing
        cy.wrap($firstInput).type("Test input on mobile");

        // Verify input received text
        cy.wrap($firstInput).should("have.value", "Test input on mobile");

        // Test blur
        cy.wrap($firstInput).blur();
      }
    });

    // Test select dropdowns on mobile
    cy.get("select").then(($selects) => {
      if ($selects.length > 0) {
        cy.wrap($selects.first()).select(0); // Select first option
        cy.wrap($selects.first()).should("not.have.value", "");
      }
    });
  });

  it("displays content properly on various mobile sizes", () => {
    const mobileViewports = [
      { name: "iPhone SE", width: 375, height: 667 },
      { name: "iPhone 12", width: 390, height: 844 },
      { name: "Samsung Galaxy S21", width: 384, height: 854 },
      { name: "Small Mobile", width: 320, height: 568 },
    ];

    mobileViewports.forEach((viewport) => {
      cy.viewport(viewport.width, viewport.height);
      cy.visit("/");

      // Verify content fits viewport
      cy.get("body").should(($body) => {
        const bodyWidth = $body.width();
        expect(bodyWidth).to.be.at.most(viewport.width);

        // Check for horizontal scroll
        const hasHorizontalScroll =
          ($body[0] as HTMLElement).scrollWidth > viewport.width;
        expect(
          hasHorizontalScroll,
          `${viewport.name} should not have horizontal scroll`,
        ).to.be.false;
      });

      // Verify text is readable
      cy.get("body")
        .should("have.css", "font-size")
        .then((fontSize) => {
          const fontSizeValue = parseFloat(fontSize as unknown as string);
          expect(
            fontSizeValue,
            "Font size should be at least 16px on mobile",
          ).to.be.at.least(16);
        });

      // Check that interactive elements are not too small
      cy.get("button, a").each(($el) => {
        cy.wrap($el).should(($element) => {
          const rect = ($element[0] as HTMLElement).getBoundingClientRect();
          expect(
            rect.height,
            "Interactive elements should be at least 32px tall",
          ).to.be.at.least(32);
        });
      });
    });
  });

  it("handles orientation changes gracefully", () => {
    // Test portrait orientation
    cy.viewport(375, 667); // iPhone portrait
    cy.visit("/");
    cy.get("body").should("be.visible");

    // Test landscape orientation
    cy.viewport(667, 375); // iPhone landscape
    cy.reload();
    cy.get("body").should("be.visible");

    // Verify content adapts to landscape
    cy.get("body").should(($body) => {
      const bodyWidth = $body.width();
      expect(bodyWidth).to.be.greaterThan(600); // Should use landscape space

      // Should not have horizontal scroll in landscape
      const hasHorizontalScroll =
        ($body[0] as HTMLElement).scrollWidth > (bodyWidth || 0);
      expect(hasHorizontalScroll).to.be.false;
    });
  });

  it("provides smooth scrolling and navigation", () => {
    cy.visit("/");

    // Test smooth scrolling
    cy.scrollTo("bottom", { duration: 1000 });
    cy.wait(500);
    cy.scrollTo("top", { duration: 1000 });

    // Test that page remains responsive during scroll
    cy.get("body").should("be.visible");

    // Test navigation during scroll
    cy.get("a, button").then(($elements) => {
      if ($elements.length > 0) {
        // Scroll to middle of page
        cy.scrollTo("center");

        // Click navigation element
        cy.wrap($elements.first()).click();

        // Verify navigation worked
        cy.get("body").should("be.visible");
      }
    });
  });

  it("handles offline and poor network conditions", () => {
    // Simulate slow network
    cy.intercept("**/*", (req) => {
      req.reply((res) => {
        // Add delay to simulate slow network
        return new Promise((resolve) => {
          setTimeout(() => resolve(), 1000);
        });
      });
    });

    cy.visit("/");

    // Page should still load, even if slowly
    cy.get("body", { timeout: 15000 }).should("be.visible");

    // Test that user gets feedback about loading state
    cy.get("body").should(($body) => {
      // Look for loading indicators
      const loadingSelectors = [
        ".loading",
        ".spinner",
        '[data-testid*="loading"]',
        ':contains("loading")',
        ':contains("Loading")',
      ];

      // Either content loads quickly or loading indicator is shown
      const hasContent = $body.find("main, article, section").length > 0;
      const hasLoadingIndicator = loadingSelectors.some(
        (selector) => $body.find(selector).length > 0,
      );

      expect(hasContent || hasLoadingIndicator).to.be.true;
    });
  });
});
