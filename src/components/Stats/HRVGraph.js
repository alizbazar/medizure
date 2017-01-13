import React, { PureComponent } from 'react'
import * as scale from 'd3-scale'
import * as shape from 'd3-shape'
import * as d3Array from 'd3-array'
import { View, ART } from 'react-native'

const {
  Group,
  Shape,
  Surface,
} = ART;

const d3 = {
  scale,
  shape,
}

export default class HRVGraph extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.state.data !== newProps.data)
      this.setState({ data: newProps.data })
  }

  createScaleX(start, end, width) {
    return d3.scale.scaleLinear()
      .domain([start, end])
      .range([0, width])
  }

  createScaleY(minY, maxY, height) {
    return d3.scale.scaleLinear()
      .domain([minY, maxY]).nice()
      .range([height, 0])
  }

  createLineGraph(data, width, height) {

    // Create our x-scale.
    const scaleX = this.createScaleX(
      data[0].time,
      data[data.length-1].time,
      width
    )

    // Collect all y values.
    const allYValues = data.reduce((all, item) => {
      all.push(item.hrv)
      return all
    }, [])

    // Create our y-scale.
    const scaleY = this.createScaleY(0, Math.max(...allYValues), height)

    // Use the d3-shape line generator to create the `d={}` attribute value.
    const lineShape = d3.shape.line()
      .x((item) => scaleX(item.time))
      .y((item) => scaleY(item.hrv))

    return lineShape(data)
  }

  render() {

    // TODO: dynamic height and width
    return (
      <View>
        <Surface width={320} height={250}>
          <Group x={0} y={0}>
            <Shape
              d={this.createLineGraph(this.state.data, 320, 250)}
              stroke="#000"
              strokeWidth={2} />
          </Group>
        </Surface>
      </View>
    )
  }
}