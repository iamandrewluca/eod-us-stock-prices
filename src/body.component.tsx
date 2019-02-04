import * as React from 'react'
import { Col, Container, Row } from 'reactstrap'
import { responsiveSVG } from './responsiveSVG'

export class Body extends React.Component<any> {
  private svgRef = React.createRef<SVGSVGElement>()

  public componentDidMount(): void {
    responsiveSVG(this.svgRef.current!, 16, 9)

  }


  public render() {
    let { companyData } = this.props
    return (
      <section className="bg-dark py-3">
        <Container>
          <Row>
            <Col xl={{ size: 10, offset: 1}}>
              <div>
                <svg ref={this.svgRef} />
              </div>
            </Col>
          </Row>
          {companyData && <pre>{JSON.stringify(companyData, null, 2)}</pre>}
        </Container>
      </section>
    )
  }
}
