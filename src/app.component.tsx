import * as React from 'react'
import {Header} from './header.component'
import {Body} from './body.component'
import {Footer} from './footer.component'

export class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header/>
        <Body/>
        <Footer/>
      </React.Fragment>
    )
  }
}
