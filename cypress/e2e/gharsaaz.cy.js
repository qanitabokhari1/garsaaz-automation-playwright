describe("Ghar Saaz - New Arrivals", () => {
  // Set default timeout for all commands in this test
  beforeEach(() => {
    cy.config('defaultCommandTimeout', 10000);
    cy.config('requestTimeout', 15000);
    cy.config('responseTimeout', 15000);
  });

  it("visits home, scrolls to New Arrivals, opens a product, and adds to cart", () => {
    cy.visit("/");
    
    // Wait for page to fully load
    cy.get('body').should('be.visible');
    cy.wait(1000); // Allow for any initial animations/loading

    cy.xpath(
      '//*[@id="halo-product-block-template--24267976802580__163247026462da6862"]/div/div[1]/h3/span'
    )
      .should("exist")
      .scrollIntoView({ duration: 800 })
      .should("be.visible")
      .and("contain.text", "New Arrivals");

    // Wait for scroll animation to complete
    cy.wait(1000);

    const productCardXpath =
      '//*[@id="halo-product-block-template--24267976802580__163247026462da6862"]/div/div[2]/div/div/div/div[7]';
    cy.xpath(productCardXpath)
      .should("exist")
      .scrollIntoView({ duration: 800 })
      .should("be.visible")
      .within(() => {
        cy.get('a[href*="/products/"]')
          .should("be.visible")
          .first()
          .invoke("removeAttr", "target")
          .click();
      });

    cy.location("pathname").should("include", "/products/");
    cy.get("h1").should("be.visible");
    cy.wait(1500); // Allow product page to fully render

    cy.intercept("POST", "**/cart/add*").as("addToCart");
    cy.intercept("GET", "**/cart.js").as("cartJson");

    cy.xpath('//*[@id="product-add-to-cart"]')
      .should("exist")
      .scrollIntoView({ duration: 500 })
      .should("be.visible")
      .and("not.be.disabled")
      .wait(500) // Small delay before clicking
      .click();

    cy.wait("@addToCart", { timeout: 15000 })
      .its("response.statusCode")
      .should("be.oneOf", [200, 302]);
    cy.wait("@cartJson", { timeout: 15000 }).its("response.statusCode").should("eq", 200);

    cy.get("#halo-cart-sidebar").should("be.visible");
    cy.wait(1000); // Allow cart sidebar to stabilize
    
    cy.xpath(
      '//*[@id="halo-cart-sidebar"]/div[2]/cart-coupon-discount/div/div[3]/div/div/a'
    )
      .should("be.visible")
      .wait(500) // Small delay before clicking
      .click();

    cy.location("pathname").should("include", "/cart");
    cy.wait(2000); // Allow cart page to fully load

    cy.xpath('//*[@id="cart-coupon-code"]')
      .should("be.visible")
      .wait(500) // Delay before interaction
      .clear()
      .wait(300) // Small delay between clear and type
      .type("Gharsaaz", { delay: 100 }) // Type with character delays
      .should("have.value", "Gharsaaz");

    cy.xpath('//*[@id="cart-checkout"]')
      .should("be.visible")
      .wait(1000) // Delay before checkout
      .click();

    cy.url().should("include", "checkout");
    cy.wait(3000); // Allow checkout page to fully render

    cy.get("form").should("exist");
    cy.wait(1000); // Wait for form to be fully interactive

    cy.get("#email")
      .should("be.visible")
      .and("not.be.disabled")
      .wait(500) // Delay before interaction
      .clear()
      .wait(300) // Small delay between clear and type
      .type("test+gharsaaz@example.com", { delay: 100 });

    cy.get("#marketing_opt_in").then(($cb) => {
      if (!$cb.is(":checked")) {
        cy.wrap($cb).wait(300).click();
      }
    });

    cy.get("select").first().wait(500).select("Pakistan");

    cy.get('input[name="firstName"], input[placeholder*="First"]')
      .first()
      .should("be.visible")
      .wait(500) // Delay before interaction
      .clear()
      .wait(300) // Small delay between clear and type
      .type("TestFirst", { delay: 100 });

    cy.get('input[name="lastName"], input[placeholder*="Last"]')
      .first()
      .should("be.visible")
      .clear()
      .type("TestLast");

    cy.get('input[name="address1"], input[placeholder*="Address"]')
      .first()
      .should("be.visible")
      .clear()
      .type("123 Test Street");

    cy.get('input[name="city"], input[placeholder*="City"]')
      .first()
      .should("be.visible")
      .clear()
      .type("Karachi");

    cy.get('input[name="postalCode"], input[placeholder*="Postal"]')
      .first()
      .should("be.visible")
      .clear()
      .type("74000");

    cy.get('input[name="phone"], input[type="tel"]')
      .first()
      .should("be.visible")
      .clear()
      .type("03001234567");

    cy.get("#save_shipping_information").then(($cb) => {
      if (!$cb.is(":checked")) {
        cy.wrap($cb).click();
      }
    });
  });
});
