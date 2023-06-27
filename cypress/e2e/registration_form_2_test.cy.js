const faker = require('faker');
let password; // Declare password variable outside the function

function inputValidData() {
  cy.log('Username will be filled');

  const username = faker.internet.userName();
  cy.get('input[data-testid="user"]').type(username);

  const email = faker.internet.email();
  cy.get('#email').type(email);

  const name = faker.name.firstName();
  cy.get('[data-cy="name"]').type(name);

  const lastName = faker.name.lastName();
  cy.get('#lastName').type(lastName);

  const phoneNumber = faker.phone.phoneNumberFormat();
  cy.get('[data-testid="phoneNumberTestId"]').type(phoneNumber);

  password = faker.internet.password(); // Assign value to the global password variable
  cy.get('#password').type(password);

  cy.get('#confirm').type(password);

  cy.get('h2').contains('Password').click();
}

function inputNonMandatory() {
    cy.get('#javascriptFavLanguage').check()
    cy.get('#vehicle3').check()
    cy.get('#cars').select('saab')
    cy.get('#animal').select(3)
}


beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

describe('Section 1: Functional tests', () => {

    it('User can use only same both first and validation passwords', () => {
        inputValidData();
    
        cy.get('#confirm').clear().type('password2');
        cy.get('#applicationForm').click();
        cy.get('.submit_button').should('be.disabled');
        cy.get('#success_message').should('not.be.visible');
        cy.get('#password_error_message').should('be.visible');
    
        cy.get('#confirm').clear().type(password); // Using the global password variable
        cy.get('h2').contains('Password').click();
        cy.get('.submit_button').should('be.enabled');
        cy.get('#password_error_message').should('not.be.visible');
    })
    
    it('User can submit form with all fields added', ()=>{
        inputValidData()
        inputNonMandatory()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible');
    })

    it('User can submit form with valid data and only mandatory fields added', ()=>{
        inputValidData()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible');
    })

    it('Input valid data to the page, username is missing', () => {
        inputValidData()
        inputNonMandatory()
        cy.get('input[data-testid="user"]').clear()
        cy.get('#applicationForm').click();
        cy.get('#success_message').should('be.hidden');
        cy.get('#input_error_message').should('have.css', 'display', 'block');

    })

})

/*
Assignement 5: create more visual tests
*/

    
    it('Check that logo2 is correct and has correct size', () => {
        cy.log('Will check logo2 source and size')
        cy.get('[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo')
        // get element and check its parameter height, to be equal 88
        cy.get('[data-cy="cypress_logo"]').invoke('height').should('be.lessThan', 89)
            .and('be.greaterThan', 87)
    })

 
    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'https://cerebrumhub.com/')
            .click()
        cy.url().should('contain', 'https://cerebrumhub.com/')
        cy.go('back')
        cy.log('Back again in registration form 2')
    })
    

    
    it('Check that checkbox list is correct', () => {
        cy.get('input[type="checkbox"]').should('have.length', 3)
        cy.get('input[type="checkbox"]').next().eq(0).should('have.text','I have a bike').and('not.be.checked')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text','I have a car').and('not.be.checked')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text','I have a boat').and('not.be.checked')
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')
    })

   
    it('Favourite animal dropdown is correct', () => { 
        cy.get('#animal').select(1).screenshot('Animals drop-down')
        cy.screenshot('Full page screenshot')
        cy.get('#animal').find('option').should('have.length', 6)
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
        cy.get('#animal').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['dog', 'cat', 'snake', 'hippo','spider','mouse'])
        })
        //commit

})


