import * as React from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Container, Input, Form, Button,
} from 'reactstrap'
import {CompanyInputComponent} from './company-input/company-input.component'

export class Header extends React.Component<any, any> {
  state = {
    isOpen: false,
  }

  toggle = () => this.setState({
    isOpen: !this.state.isOpen,
  })

  render() {
    return (
      <Navbar color="light" light expand="md">
        <Container>
          <NavbarBrand href="/">EOD US Stock</NavbarBrand>
          <NavbarToggler onClick={this.toggle}/>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Form inline className="ml-auto my-2 my-lg-0">
              <CompanyInputComponent />
              <Input className="mb-2 mr-sm-2" type="date" aria-label="Start Date" />
              <Input className="mb-2 mr-sm-2" type="date" aria-label="End Date" />
              <Button outline color="success" className="mb-2" type="submit">Search</Button>
            </Form>
          </Collapse>
        </Container>
      </Navbar>
    )
  }
}
