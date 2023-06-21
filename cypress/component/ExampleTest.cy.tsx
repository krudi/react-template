import { ExampleTest } from '../../components/ExampleTest'

describe('Component: ExampleTest', () => {
  it('checks the functionality of the props', () => {
    const props = 'Lorem Ipsum'

    cy.mount(<ExampleTest msg={props} />)

    cy.get('h1').should('have.text', props)
  })
})
