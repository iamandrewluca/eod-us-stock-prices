import * as React from 'react'
import {Header} from './header.component'
import {Body} from './body.component'
import {Footer} from './footer.component'

export class App extends React.Component {
  state = {
    companyData: []
  }

  render() {
    return (
      <React.Fragment>
        <Header onChange={this.onChange} />
        <Body companyData={this.state.companyData} />
        <Footer/>
      </React.Fragment>
    )
  }

  onChange = (companyData) => {
    this.setState({ companyData })
  }
}
