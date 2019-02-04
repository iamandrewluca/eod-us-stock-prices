import { select } from 'd3-selection'

export function responsiveSVG(svgElement: SVGSVGElement, widthAspect, heightAspect) {
  select(svgElement).call(makeResponsive, widthAspect, heightAspect)
}

function makeResponsive(svg, widthAspect, heightAspect) {
  svg
    .attr('width', widthAspect)
    .attr('height', heightAspect)

  // get container + svg aspect ratio
  const container = select(svg.node().parentNode)
  const width = parseInt(svg.style('width'))
  const height = parseInt(svg.style('height'))
  const aspect = width / height

  // add viewBox and preserveAspectRatio properties,
  // and call resize so that svg resizes on inital page load
  svg.attr('viewBox', '0 0 ' + width + ' ' + height)
    .attr('perserveAspectRatio', 'xMinYMid')
    .call(resize)

  select(window).on('resize', resize)

  // get width of container and resize svg to fit it
  function resize() {
    const targetWidth = parseInt(container.style('width'))
    svg.attr('width', targetWidth)
    svg.attr('height', Math.round(targetWidth / aspect))
  }
}