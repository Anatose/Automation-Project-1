beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

describe('Section 1: Functional tests', () => {

    it('User can use only same both first and validation passwords', ()=>{
        cy.get('#username').type('guntis')
        cy.get('#email').type('pastorsguntis@gmail.com')
        cy.get('[data-cy="name"]').type('Guntis')
        cy.get('[data-testid="lastNameTestId"]').type('Pastors')
        cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
        cy.get('#password').type('testing')
        cy.get('#confirm').type('testing')

        cy.get('#username').click()


        cy.get('.submit_button').should('be.enabled')

        cy.get('#success_message').should('not.be.visible')

        

        // cy.get('.submit_button').should('be.disabled')
        // cy.get('#password_error_message').should('be.visible')
        // cy.get('#password_error_message').should('have.css', 'display', 'block')


        // Add test steps for filling in only mandatory fields
        // Type confirmation password which is different from first password
        // Assert that submit button is not enabled
        // Assert that successful message is not visible
        // Assert that error message is visible
    })
    
    it('User can submit form with all fields added', ()=>{
        cy.get('#username').type('guntis')
        cy.get('#email').type('pastorsguntis@gmail.com')
        cy.get('[data-cy="name"]').type('Guntis')
        cy.get('[data-testid="lastNameTestId"]').type('Pastors')
        cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
        cy.get('#password').type('testing')
        cy.get('#confirm').type('testing')

        cy.get('#phpFavLanguage').check()
        cy.get('#vehicle1').check()
        cy.get('#vehicle2').check()
        cy.get('#vehicle3').check()

        cy.get('#cars').select("opel").invoke("val").should("eq","opel")
        cy.get('#animal').select("hippo").invoke("val").should("eq","hippo")

        
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()

        cy.get('#success_message').should('be.visible')
        cy.get('#success_message').should('have.css', 'display', 'block')
        // Add test steps for filling in ALL fields
        // Assert that submit button is enabled
        // Assert that after submitting the form system show successful message
    })

    it('User can submit form with valid data and only mandatory fields added', ()=>{
        cy.get('#username').type('guntis')
        cy.get('#email').type('pastorsguntis@gmail.com')
        cy.get('[data-cy="name"]').type('Guntis')
        cy.get('[data-testid="lastNameTestId"]').type('Pastors')
        cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
        cy.get('#password').type('testing')
        cy.get('#confirm').type('testing')

        cy.get('#username').click()

        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()

        cy.get('#success_message').should('be.visible')
        cy.get('#success_message').should('have.css', 'display', 'block')

        // Add test steps for filling in ONLY mandatory fields
        // Assert that submit button is enabled
        // Assert that after submitting the form system shows successful message
    })

    it('Submit button is not enabled when some mandatory field is not present', () => {
        cy.get('#username').type('guntis')
        cy.get('#email').type('pastorsguntis@gmail.com')
        cy.get('[data-cy="name"]').type('Guntis')
        cy.get('[data-testid="lastNameTestId"]').type('Pastors')
        cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
        cy.get('#password').type('testing')
        cy.get('#confirm').type('testing')

        cy.get('#username').clear();
        cy.get('#email').click()

        cy.get('.submit_button').should('be.disabled')

        cy.get('#input_error_message').should('be.visible')
        cy.get('#input_error_message').should('have.css', 'display', 'block')
    })

    it('Input valid data to the page', () => {
        inputValidData('john.doe')
    })

    // You can add more similar tests for checking other mandatory field's absence

})

/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        // get element and check its parameter height, to be equal 178
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)
    })

    it('Check that the logo is correct and has the correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo')
        // get element and check its parameter height, to be equal 178
        cy.get('[data-cy="cypress_logo"]').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)
    })

    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        
        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        
        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_1.html')
        
        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    it('Check navigation second link', () => {
        cy.get('nav').children().should('have.length', 2)
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')

        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'https://cerebrumhub.com/').click()
    })

    it('Check that radio button list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)
        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP').and('not.be.checked')

        // Selecting one will remove selection from other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    it('Check that checkbox list is correct', () => {
        cy.get('input[type="checkbox"]').should('have.length', 3)

        cy.get('input[type="checkbox"]').next().eq(0).should('have.text','I have a bike').and('not.be.checked')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text','I have a car').and('not.be.checked')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text','I have a boat').and('not.be.checked')

        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check()

        // check the first and second checbox whether they are checked
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('be.checked')
    })

    // Create test similar to previous one

    it('Car dropdown is correct', () => {
        // Here is an example how to explicitely create screenshot from the code
        // Select second element and create screenshot for this area, and full page
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')

        // Here are given different solutions how to get the length of array of elements in Cars dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)
        
        //Check  that first element in the dropdown has text Volvo
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        
        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })


    it('Animals dropdown is correct', () => {
        cy.get('#animal').find('option').should('have.length', 6)
        
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
        
        // Advanced level how to check the content of the Cars dropdown
        cy.get('#animal').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['dog', 'cat', 'snake', 'hippo','spider','mouse'])
        })
    })

})

function inputValidData() {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type('Something')
    cy.get('#email').type('validemail@yeap.com')
    cy.get('[data-cy="name"]').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    // If element has multiple classes, then one of them can be used
    cy.get('#password').type('MyPass')
    cy.get('#confirm').type('MyPass')
    cy.get('h2').contains('Password').click()
}