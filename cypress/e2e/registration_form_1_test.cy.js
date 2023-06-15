// Before each test (it...) load .html page
beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_1.html')
})
 describe('This is first test suite, Anatoli Sergejev', () => {
    it('User can submit data only when valid mandatory values are added', () => {
        //June 14, 2023
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('#firstName').type('Egor')
        cy.get('#lastName').type('Letov')
        cy.get('input[name="password"]').type('Tra-Ta-Ta!)')
        cy.get('[name="confirm"]').type('Tra-Ta-Ta!)')
        cy.get('#username').type('Something')

        //in order to activate submit button, user has to click somewhere outside the input field
        cy.get('h2').contains('Password').click()

        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()

        // Assert that both input and password error messages are not shown
        cy.get('#input_error_message').should('not.be.visible')

        // Assert that success message is visible
        cy.get('#success_message').should('be.visible')
    });

    it('User can use only same both first and validation passwords', () => {
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('#firstName').type('Egor')
        cy.get('#lastName').type('Letov')
        cy.get('input[name="password"]').type('Tra-Ta-Ta!)')
        cy.get('[name="confirm"]').type('Da-Da-Da!)')
        // type('{enter}') is clicking native button e.g to click backspace use '{backspace}'
        cy.get('[name="confirm"]').type('{enter}')
        cy.get('#username').type('Losername')

        // Scroll to bottom of the page
        cy.window().scrollTo('bottom')

        // Scroll back to password confirm input field
        cy.get('[name="confirm"]').scrollIntoView()
        cy.get('[name="confirm"]').clear().type('  ')
        cy.get('h2').contains('Password').click()

       // Scroll back to password confirm input field
       cy.get('[name="confirm"]').scrollIntoView()
       cy.get('[name="confirm"]').clear().type('  ')
       cy.get('h2').contains('Password').click()

       // Asserting that Submit button is disabled
       cy.get('.submit_button').should('be.disabled')
        // Assert that password confirmation input fields has attribute 'title' with text stating 'Both passwords should match'
        cy.get('input[name="confirm"]').should('have.attr', 'title', 'Both passwords should match')
    })

    it('User cannot submit data when username is absent', () => {
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('#firstName').type('Egor')
        cy.get('#lastName').type('Letov')
        cy.get('input[name="password"]').type('Tra-Ta-Ta!)')
        cy.get('[name="confirm"]').type('Tra-Ta-Ta!)')

        // Scroll back to username input field
        cy.get('#username').scrollIntoView()
        cy.get('#username').clear().type('  ')
        cy.get('h2').contains('Password').click()

        // Asserting that Submit button is disabled
        cy.get('.submit_button').should('be.disabled')

        // Assert that success message is not visible
        cy.get('#success_message').should('not.be.visible')

        // Assert that correct error message is visible and contain Mandatory input field...
        cy.get('#input_error_message').should('be.visible').should('contain', 'Mandatory input field is not valid or empty!')

        // Assert that username has tooltip with error message
        cy.get('input[name="username"]').should('have.attr', 'title').should('contain', 'Input field')

       
        cy.get('#input_error_message').should('be.visible')
    })


    it('User cannot submit data when phone number is absent', () => {
        cy.get('#firstName').type('Egor')
        cy.get('#lastName').type('Letov')
        cy.get('input[name="password"]').type('Tra-Ta-Ta!)')
        cy.get('[name="confirm"]').type('Tra-Ta-Ta!)')
        cy.get('#username').type('Losername')

        // Scroll back to phone number input field
        cy.get('[data-testid="phoneNumberTestId"]').scrollIntoView()
        cy.get('[data-testid="phoneNumberTestId"]').clear().type('  ')

        // Asserting that Submit button is disabled
        cy.get('.submit_button').should('be.disabled')

        // Assert that success message is not visible
        cy.get('#success_message').should('not.be.visible')
    })

    it('User cannot submit data when password and/or confirmation password is absent', () => {
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('#firstName').type('Egor')
        cy.get('#lastName').type('Letov')
        cy.get('input[name="password"]').type('Tra-Ta-Ta!)')
        //cy.get('[name="confirm"]').type('Tra-Ta-Ta!)')
        cy.get('#username').type('Losername')

        // Scroll back to password confirm input field
        cy.get('[name="confirm"]').scrollIntoView()
        cy.get('[name="confirm"]').clear().type('  ')
        cy.get('h2').contains('Password').click()

        // Asserting that Submit button is disabled
        cy.get('.submit_button').should('be.disabled')

        // Assert that success message is not visible
        cy.get('#success_message').should('not.be.visible')
    })

    it('User cannot add letters to phone number', () => {
        cy.get('[data-testid="phoneNumberTestId"]').should('have.attr', 'type', 'number')
        cy.get('[data-testid="phoneNumberTestId"]').type('abc')
        cy.get('#firstName').type('Egor')
        cy.get('#lastName').type('Letov')
        cy.get('input[name="password"]').type('Tra-Ta-Ta!)')
        cy.get('[name="confirm"]').type('Tra-Ta-Ta!)')
        cy.get('#username').type('Losername')

        // Scroll back to phone number input field
        cy.get('[data-testid="phoneNumberTestId"]').scrollIntoView()

        // Asserting that Submit button is disabled
        cy.get('.submit_button').should('be.disabled')

        // Assert that success message is not visible
        cy.get('#success_message').should('not.be.visible')
    })
})