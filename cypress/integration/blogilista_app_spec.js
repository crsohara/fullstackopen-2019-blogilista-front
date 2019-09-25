describe("Blogilista ", function() {
	beforeEach(function() {
		cy.visit("http://localhost:3000")
	})

	it("etusivu aukeaa", function() {
		cy.contains("Blogilista")
		cy.contains("Blogit")
	})

	it("kirjautuminen onnistuu", function() {
		cy.contains("Kirjaudu sisään").click()
		cy.get("input[name=username]").type("admin")
		cy.get("input[name=password]").type("salasana")
		cy.get("[data-cy=login]").click()
		cy.contains("Käyttäjä admin kirjautui sisään")
		cy.contains("Tallenna uusi blogi")
	})

	it("blogin avaaminen onnistuu", function() {
		cy.contains("Mikon suosikkiblogi").click()
		cy.contains("Lisäsi admin")
	})
})
