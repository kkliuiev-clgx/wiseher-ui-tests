
describe('WiseHer UI Tests', function() {
  let email;
  let firstName;
  let lastName;
  email = 'mailuser' + Math.round((Math.random(1000)*1000)) + '@kliuiev.tk';
  firstName = 'Name' + Math.round((Math.random(1000)*1000));
  lastName = 'LastName' + Math.round((Math.random(1000)*1000));
  
  beforeEach(function () {
      cy.clearLocalStorage();
      cy.window().then((win) => {
        win.sessionStorage.clear()
      })
      cy.clearCookies();
      cy.getCookies().should('be.empty')


    })

    it('Opens Register page and registers user', function() {
    cy.visit('https://app.dev.wiseher.com/register')
    cy.get('#RegisterForm_first_name').type(firstName);
    cy.get('#RegisterForm_last_name').type(lastName);  
    cy.get('#RegisterForm_email').type(email);
    cy.get('#RegisterForm_confirmEmail').type(email);
    cy.get('#RegisterForm_password').type('qwerty123');
    cy.get('#RegisterForm_confirmPassword').type('qwerty123');
    cy.get('#RegisterForm_tos_and_privacy').click();
    cy.get(':nth-child(1) > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-btn > span').click();
    cy.wait(1000)
    cy.get('.ant-typography > .ant-image > .ant-image-img').should('exist')
    })
    
    it('Finds newly created user and makes him an expert', function() {
    cy.visit('https://app.dev.wiseher.com/login')
    cy.get('#LoginForm_email').type('jjameson@kliuiev.tk');
    cy.get('#LoginForm_password').type('qwerty1234');
    cy.get(':nth-child(1) > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-btn').click();
    cy.get('.header-actions > .ant-avatar > img').click();
    cy.get('.ant-dropdown-menu > :nth-child(1)').click();
    cy.get(':nth-child(5) > :nth-child(2) > a').click();
    cy.get('.ant-input-wrapper > .ant-input-affix-wrapper > .ant-input').click();
    cy.wait(500);
    cy.get('.ant-input-wrapper > .ant-input-affix-wrapper > .ant-input').type(email);
    cy.wait(500);
    cy.get(':nth-child(6) > .ant-space > .ant-space-item > a').click();
    cy.wait(500);
    cy.get('.ant-space > :nth-child(2) > .ant-btn').click({ multiple: true });
    cy.wait(500);
    cy.get('.ant-input-wrapper > .ant-input-affix-wrapper > .ant-input').type(email);
    cy.get(':nth-child(4) > .ant-tag').should('have.text', 'Yes')
    })

    it('Logs as an expert, checks for new menu available and completes all necessary fields', function() {
      cy.visit('https://app.dev.wiseher.com/login')
      cy.get('#LoginForm_email').type('mailuser439@kliuiev.tk');
      cy.get('#LoginForm_password').type('qwerty123');
      cy.get(':nth-child(1) > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-btn').click();
      cy.get('.ant-card-body > :nth-child(1)').should('have.text', 'Expert Profile')
      cy.get('[style="margin-right: 8px;"] > .ant-btn').click();
      cy.get('#ExpertProfileForm > .ant-alert').should('exist')
      cy.wait(1000);
      // cy.get('#ExpertProfileForm_body').should('have.css','border-color','rgb(255, 77, 79)')
      cy.get(':nth-child(9) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector').should('have.css','border-color','rgb(255, 77, 79)')
      
    })
  })
