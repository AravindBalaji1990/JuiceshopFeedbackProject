import * as math from 'mathjs'
import customerfeedbackform from "../pages/customerfeedbackform"


describe('Customer Feedback',function (){
  beforeEach(function() {
    cy.intercept('POST', 'https://juice-shop.herokuapp.com/api/Feedbacks/').as('post')
    cy.visit('/')// this will check in the config.cypress.js 
    cy.priliminarycheck()// this is form command.js file - common functinality
 })

 // it.skip -> this will skip this case and run other cases
it.only('Juice Shop opening the website with comment - 5 letters with space - Happy path', function() {
  //created a instanc eof that js file 
    const customerfeedbackformobj = new customerfeedbackform();
    customerfeedbackformobj.checkAuthor()
    customerfeedbackformobj.enterComments('abcd e')
    customerfeedbackformobj.ratingSliderRightArrow()
    customerfeedbackformobj.captchaValidation()
    cy.screenshot()
    customerfeedbackformobj.submitForm()
    // @post will go to line number 7 cy.intercept and search for the api in the application
    cy.wait('@post').then((interception) => {
      assert.isNotNull(interception.response.body, 'API call has data')
      expect(interception.response.statusCode).to.eq(201)
      expect(interception.response.body.status).to.eq('success')
      expect(interception.request.body).to.have.all.keys('captchaId', 'captcha', 'comment', 'rating');
      expect(interception.request.body).to.have.property('captchaId').match(new RegExp('[0-9]+'));
      expect(interception.request.body).to.have.property('captcha').match(new RegExp('[0-9]+'));
      expect(interception.request.body).to.have.property('comment').match(new RegExp('[a-zA-Z]+'));
      expect(interception.request.body).to.have.property('rating').match(new RegExp('[0-9]+'));
      cy.log(JSON.stringify(interception.request.body) )
      cy.log(JSON.stringify(interception.response.body ))
    })
})

// it.only -> this means it will run only this case
it('Juice Shop opening the website with comment - 158 letters with space - Happy path', () => {
  const customerfeedbackformobj = new customerfeedbackform();
  customerfeedbackformobj.checkAuthor()
  customerfeedbackformobj.enterComments('Test test test testtest  testtest testtest testtest testtest testtest testtest testtest testtest testtest testtest testtest testtest testtest testtest testtes')
  customerfeedbackformobj.ratingSliderRightArrow()
  customerfeedbackformobj.captchaValidation()
  cy.screenshot()
  customerfeedbackformobj.submitForm()
  cy.wait('@post').then((interception) => {
    assert.isNotNull(interception.response.body, 'API call has data')
    expect(interception.response.statusCode).to.eq(201)
    expect(interception.response.body.status).to.eq('success')
    expect(interception.request.body).to.have.all.keys('captchaId', 'captcha', 'comment', 'rating');
    expect(interception.request.body).to.have.property('captchaId').match(new RegExp('[0-9]+'));
    expect(interception.request.body).to.have.property('captcha').match(new RegExp('[0-9]+'));
    expect(interception.request.body).to.have.property('comment').match(new RegExp('[a-zA-Z]+'));
    expect(interception.request.body).to.have.property('rating').match(new RegExp('[0-9]+'));
    cy.log(interception.request.body )
  })
})

it('Juice Shop opening the website with comment - 160 letters with space numbers and special characters- Happy path', () => {
  const customerfeedbackformobj = new customerfeedbackform();
  customerfeedbackformobj.checkAuthor()
  customerfeedbackformobj.enterComments('1est test 1est testtest  testtes$ testtest testtest testtest testtest testtest test_est testtest testtes%%testtest testtest testtest testtest testtest testtestt')
  customerfeedbackformobj.ratingSliderRightArrow()
  customerfeedbackformobj.captchaValidation()
  customerfeedbackformobj.submitForm()
  cy.wait('@post').then((interception) => {
    assert.isNotNull(interception.response.body, 'API call has data')
    expect(interception.response.statusCode).to.eq(201)
    expect(interception.response.body.status).to.eq('success')
    expect(interception.request.body).to.have.all.keys('captchaId', 'captcha', 'comment', 'rating');
    expect(interception.request.body).to.have.property('captchaId').match(new RegExp('[0-9]+'));
    expect(interception.request.body).to.have.property('captcha').match(new RegExp('[0-9]+'));
    expect(interception.request.body).to.have.property('comment').match(new RegExp('[0-9a-zA-Z$%_]+'));
    expect(interception.request.body).to.have.property('rating').match(new RegExp('[0-9]+'));
    cy.log(interception.request.body )
  })
})

it('Juice Shop opening the website with space as comment', () => {
  const customerfeedbackformobj = new customerfeedbackform();
  customerfeedbackformobj.checkAuthor()
  customerfeedbackformobj.enterComments('abcd e')
  customerfeedbackformobj.ratingSliderRightArrow()
  customerfeedbackformobj.captchaValidation()
  customerfeedbackformobj.submitForm()
  cy.wait('@post').then((interception) => {
    assert.isNotNull(interception.response.body, 'API call has data')
    expect(interception.response.statusCode).to.eq(201)
    expect(interception.response.body.status).to.eq('success')
  })
})

it('Juice Shop opening the website with no comment - verify error', () => {
  const customerfeedbackformobj = new customerfeedbackform();
  customerfeedbackformobj.checkAuthor()
  customerfeedbackformobj.clearCommentField()
  customerfeedbackformobj.ratingSliderRightArrow()
  customerfeedbackformobj.noCommentError()
  customerfeedbackformobj.captchaValidation()
  customerfeedbackformobj.submitFormDisabled()
})

it('Juice Shop opening the website with no rating - submit button disabled', () => {
  const customerfeedbackformobj = new customerfeedbackform();
  customerfeedbackformobj.checkAuthor()
  customerfeedbackformobj.enterComments('abcd e')
  customerfeedbackformobj.captchaValidation()
  customerfeedbackformobj.submitFormDisabled()
})

it('Juice Shop opening the website with no captcha input - submit button disabled', () => {
  const customerfeedbackformobj = new customerfeedbackform();
  customerfeedbackformobj.checkAuthor()
  customerfeedbackformobj.enterComments('abcd e')
  customerfeedbackformobj.ratingSliderRightArrow()
  customerfeedbackformobj.captchaValidation()
  customerfeedbackformobj.submitFormDisabled()
})

it('Juice Shop opening the website with wrong captcha', () => {
  const customerfeedbackformobj = new customerfeedbackform();
  customerfeedbackformobj.checkAuthor()
  customerfeedbackformobj.enterComments('abcd e')
  customerfeedbackformobj.ratingSliderRightArrow()
  customerfeedbackformobj.invalidCaptcha(0)
  customerfeedbackformobj.submitForm()
  customerfeedbackformobj.wrongCaptchaValidation()
  cy.wait('@post').then((interception) => {
    assert.isNotNull(interception.response.body, 'API call has data')
    expect(interception.response.statusCode).to.eq(401)
    expect(interception.response.body).to.eq('Wrong answer to CAPTCHA. Please try again.')
    expect(interception.request.body).to.have.all.keys('captchaId', 'captcha', 'comment', 'rating');
    expect(interception.request.body).to.have.property('captchaId').match(new RegExp('[0-9]+'));
    expect(interception.request.body).to.have.property('captcha').match(new RegExp('[0-9]+'));
    expect(interception.request.body).to.have.property('comment').match(new RegExp('[a-zA-Z]+'));
    expect(interception.request.body).to.have.property('rating').match(new RegExp('[0-9]+'));
    cy.log(interception.request.body )
  })
})

it('Juice Shop opening the website with no captcha - rating slider left and right', () => {
  const customerfeedbackformobj = new customerfeedbackform();
  customerfeedbackformobj.checkAuthor()
  customerfeedbackformobj.enterComments('abcd e')
  customerfeedbackformobj.ratingSliderRightArrow()
  customerfeedbackformobj.clickCaptchaControl()
  customerfeedbackformobj.ratingSliderleftArrow()
  customerfeedbackformobj.noCaptchaError()
  customerfeedbackformobj.submitFormDisabled()
})

it('Juice Shop opening the website with only rating slider', () => {
  const customerfeedbackformobj = new customerfeedbackform();
  customerfeedbackformobj.checkAuthor()
  customerfeedbackformobj.ratingSliderRightArrow()
  customerfeedbackformobj.ratingSliderleftArrow()
  customerfeedbackformobj.submitFormDisabled()
})

it('Juice Shop opening the website with only rating slider and captcha', () => {
  const customerfeedbackformobj = new customerfeedbackform();
  customerfeedbackformobj.checkAuthor()
  customerfeedbackformobj.ratingSliderRightArrow()
  customerfeedbackformobj.captchaValidation()
  customerfeedbackformobj.submitFormDisabled()
})

})