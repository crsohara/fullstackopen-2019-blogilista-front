describe("Blogilista ", function() {
	beforeEach(function() {
		cy.request("POST", "http://localhost:3000/api/tests/reset")
		const user = {
			name: "Mikko Saari",
			username: "admin",
			password: "salasana"
		}
		cy.request("POST", "http://localhost:3000/api/users/", user)

		const blogi = {
			title: "Testiblogi",
			author: "Teppo Testi",
			url: "http://www.testi.fi/",
			likes: 3,
			username: "admin"
		}
		cy.request("POST", "http://localhost:3000/api/tests/blog", blogi)
		cy.visit("http://localhost:3000")
	})

	it("etusivu aukeaa", function() {
		cy.contains("Blogilista")
		cy.contains("Blogit")
	})

	describe("kirjautumista", function() {
		beforeEach(function() {
			cy.contains("Kirjaudu sisään").click()
			cy.get("input[name=username]").type("admin")
			cy.get("input[name=password]").type("salasana")
			cy.get("[data-cy=login]").click()
			cy.contains("Käyttäjä admin kirjautui sisään")
		})

		it("kirjautuminen onnistuu", function() {
			cy.contains("Tallenna uusi blogi")
		})

		it("uloskirjautuminen onnistuu", function() {
			cy.contains("Kirjaudu ulos").click()
			cy.contains("Käyttäjä admin kirjautui ulos")
		})

		it("blogin luominen onnistuu", function() {
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

		it("kommentoiminen onnistuu", function() {
			cy.get("#blogs")
				.contains("Testiblogi")
				.click()
			cy.get("[data-cy=commentText]").type("Testikommentti")
			cy.get("[data-cy=submitComment]").click()
			cy.contains('Lisättiin kommentti "Testikommentti"')
			cy.get("#comments").contains("Testikommentti")
		})

		it("tykkääminen onnistuu", function() {
			cy.get("#blogs")
				.contains("Testiblogi")
				.click()
			cy.contains("3 tykkäystä")
			cy.get("[data-cy=likeButton]").click()
			cy.contains("4 tykkäystä")
		})

		it("blogit järjestyvät tykkäysten mukaan", function() {
			cy.contains("Tallenna uusi blogi").click()
			cy.get("input[name=title]").type("Kakkosblogi")
			cy.get("input[name=author]").type("Testi")
			cy.get("input[name=blogURL]").type("http://www.2.fi/")
			cy.get("input[type=submit]").click()
			cy.reload()
			cy.get("#blogs")
				.first()
				.contains("Testiblogi")
			cy.get("#blogs")
				.contains("Kakkosblogi")
				.click()
			cy.get("[data-cy=likeButton]").click()
			cy.get("[data-cy=likeButton]").click()
			cy.get("[data-cy=likeButton]").click()
			cy.get("[data-cy=likeButton]").click()
			cy.get("[data-cy=likeButton]").click()
			cy.get("header")
				.contains("Blogit")
				.click()
			cy.get("#blogs")
				.first()
				.contains("Kakkosblogi")
		})
	})

	it("käyttäjän sivun katsominen onnistuu", function() {
		cy.contains("Käyttäjät").click()
		cy.contains("Mikko Saari").click()
		cy.get("a")
			.contains("Testiblogi")
			.click()
		cy.contains("Lisäsi admin")
	})
})
