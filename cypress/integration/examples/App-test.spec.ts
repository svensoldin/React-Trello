it('authenticates the user with the right credentials', () => {
  cy.visit('/');
  cy.get('input[name=email]').type('john@gmail.com');
  cy.contains('john@gmail.com');
  cy.get('[type=password]').type('12345678{enter}');
  cy.contains('My boards');
});

it('does not authenticate on wrong credentials and shows error message', () => {
  cy.visit('/');
  cy.get('[type=email]').type('jon@gmail.com');
  cy.get('[type=password]').type('12345678{enter}');
  cy.contains('Wrong credentials');
});
