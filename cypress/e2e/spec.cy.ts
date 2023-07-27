describe("template spec", () => {
  beforeEach(() => {
    cy.visit("localhost:3000");
    cy.wait(1000);
  });

  it("passes", () => {});

  it("creates a route", () => {
    cy.get("#open-route-selection").click();
    cy.get("#choose-destination").type("Gara de nord");
    cy.get("#submit-destination").click();
    cy.get("#search-0").click();
    cy.get("#info-dialog").click();

    cy.wait(2500).then(() => {
      cy.get("#info-content").should("contain.text", "Route information");

      cy.get("#info-content").should("contain.text", "3h");
    });
  });

  it("display cameras", () => {
    cy.visit("localhost:3000/bucharest");

    cy.get(
      "body > div > div.bg-secondary.h-full.pb-14.-z-10 > div > div.leaflet-pane.leaflet-map-pane > div.leaflet-pane.leaflet-marker-pane > img:nth-child(3)"
    ).click();

    cy.get(
      "body > div > div.bg-secondary.h-full.pb-14.-z-10 > div > div.leaflet-pane.leaflet-map-pane > div.leaflet-pane.leaflet-popup-pane > div > div.leaflet-popup-content-wrapper > div > button > button"
    )
      .should("contain.text", "Bucharest")
      .should("contain.html", "img")
      .click();

    cy.get("#camera-dialog").should("contain.text", "cars");
  });
});
