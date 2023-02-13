describe('Testing Application', () => {
    it('Check content in the page', () => {
        cy.visit('http://localhost:3004/')
        cy.get('#title').should(($p) =>{
            expect($p.first()).to.contain('Hello World')
        }).log()
    })
})