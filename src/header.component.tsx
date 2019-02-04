import * as React from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Container, Input, Form, Button,
} from 'reactstrap'
import { addYears } from 'date-fns'
import {CompanyInputComponent} from './company-input/company-input.component'
import { FormEvent } from 'react'

export class Header extends React.Component<any, any> {
  state = {
    isOpen: false,
    company: undefined,
    startDate: getYear(-1),
    endDate: getYear(),
  }

  render() {
    const { startDate, endDate } = this.state
    return (
      <Navbar color="light" light expand="md">
        <Container>
          <NavbarBrand href="/">EOD US Stock</NavbarBrand>
          <NavbarToggler onClick={this.toggle}/>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Form inline className="ml-auto my-2 my-lg-0" onSubmit={this.onSubmit}>
              <CompanyInputComponent onChange={this.onCompanyChange} />
              <Input
                className="mb-2 mr-sm-2" type="date" aria-label="Start Date"
                onChange={this.onStartDateChange}
                value={startDate}
              />
              <Input
                className="mb-2 mr-sm-2" type="date" aria-label="End Date"
                onChange={this.onEndDateChange}
                value={endDate}
              />
              <Button outline color="success" className="mb-2" type="submit">Search</Button>
            </Form>
          </Collapse>
        </Container>
      </Navbar>
    )
  }

  toggle = () => this.setState({
    isOpen: !this.state.isOpen,
  })

  onStartDateChange = (e) => this.setState({ startDate: e.target.value })
  onEndDateChange = (e) => this.setState({ endDate: e.target.value })
  onCompanyChange = (company) => this.setState({ company })

  onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const { company, startDate, endDate } = this.state
    fetch(buildURLQuandlEOD(company, startDate, endDate))
      .then(res => res.json())
      .then(eodDataMap)
      .then(data => this.props.onChange(data))
  }
}

function getYear(n: number = 0): string {
  return addYears(new Date(), n).toISOString().split('T')[0]
}

function buildURLQuandlEOD(company = 'AAPL', start_date, end_date) {
  const url = new URL(`https://www.quandl.com/api/v3/datasets/EOD/${company}`)
  url.search = new URLSearchParams({
    start_date,
    end_date,
    api_key: process.env.REACT_APP_QUANDL_API_KEY!,
  }).toString()
  return url.toString()
}

function eodDataMap(resData) {
  return resData.dataset.data.map(dataEntry => ({
    date: dataEntry[0],
    value: dataEntry[4],
  }))
}