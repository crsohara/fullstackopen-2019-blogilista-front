describe("Blogilista ", function() {
	beforeEach(function() {
		cy.request("POST", "http://localhost:3000/api/tests/reset")
		const user = {
			name: "Mikko Saari",
			username: "admin",
			password: "salasana"
		}
		cy.request("POST", "http://localhost:3000/api/users/", user)
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

	it("blogin luominen onnistuu", function() {
		cy.contains("Kirjaudu sisään").click()
		cy.get("input[name=username]").type("admin")
		cy.get("input[name=password]").type("salasana")
		cy.get("[data-cy=login]").click()
		cy.contains("Tallenna uusi blogi").click()
		cy.get("input[name=title]").type("Mikon suosikkiblogi")
		cy.get("input[name=author]").type("Mikko Makkonen")
		cy.get("input[name=blogURL]").type("http://www.mikkomakkonen.fi/")
		cy.get("input[type=submit]").click()
		cy.reload()
		cy.get("#blogs")
			.contains("Mikon suosikkiblogi")
			.click()
		cy.contains("Lisäsi admin")
	})
})
