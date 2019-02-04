import * as React from 'react'
import { Col, Container, Row } from 'reactstrap'
import { responsiveSVG } from './responsiveSVG'
import * as d3 from 'd3'

export class Body extends React.Component<any> {
  private svgRef = React.createRef<SVGSVGElement>()

  public componentDidMount(): void {
    responsiveSVG(this.svgRef.current!, 690, 388)
  }

  public componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<{}>, snapshot?: any): void {
    drawChart(this.props.companyData, this.svgRef.current!)
  }


  public render() {
    return (
      <section className="py-3">
        <Container>
          <Row>
            <Col xl={{ size: 10, offset: 1 }}>
              <div>
                <svg ref={this.svgRef}/>
              </div>
            </Col>
          </Row>
          {/*{companyData && <pre className="bg-light p-3">{JSON.stringify(companyData, null, 2)}</pre>}*/}
        </Container>
      </section>
    )
  }
}

function drawChart(data, node: SVGSVGElement) {
  const svgWidth = node.clientWidth
  const svgHeight = node.clientHeight
  const margin = { top: 20, right: 20, bottom: 30, left: 50 }
  const width = svgWidth - margin.left - margin.right
  const height = svgHeight - margin.top - margin.bottom

  const svg = d3.select(node)
    .attr('width', svgWidth)
    .attr('height', svgHeight)

  const g = svg.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  const x = d3.scaleTime()
    .rangeRound([0, width])
    // @ts-ignore
    .domain(d3.extent(data, function (d) {
      // @ts-ignore
      return d.date
    }))

  const y = d3.scaleLinear()
    .rangeRound([height, 0])
    // @ts-ignore
    .domain(d3.extent(data, function (d) {
      // @ts-ignore
      return d.value
    }))

  const line = d3.line()
    .x(function (d) {
      // @ts-ignore
      return x(d.date)
    })
    .y(function (d) {
      // @ts-ignore
      return y(d.value)
    })

  g.append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(x))
    // .select('.domain')
    // .remove()

  g.append('g')
    .call(d3.axisLeft(y))

  g.append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', 'steelblue')
    .attr('stroke-linejoin', 'round')
    .attr('stroke-linecap', 'round')
    .attr('stroke-width', 1.5)
    // @ts-ignore
    .attr('d', line)
}