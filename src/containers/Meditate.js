import React, { Component } from 'react'

import MeditateComponent from 'src/components/Meditate'

class Meditate extends Component {
  constructor(props) {
    super(props)

    this.state = {
      meditationOngoing: false,
      timer: null,
      durationLeftInSec: 0,
      totalDurationInSec: 0
    }
  }

  componentWillUnmount() {
    if (this.state.timer) {
      clearInterval(this.state.timer)
    }
  }

  start(duration) {
    const durationInSec = duration * 60
    this.setState({
      meditationOngoing: true,
      durationLeftInSec: durationInSec,
      totalDurationInSec: durationInSec,
      timer: setInterval(() => {
        const nextVal = (this.state.durationLeftInSec - 1)
        this.setState({
          durationLeftInSec: nextVal
        })
        if (nextVal <= 0) {
          return this.finish()
        }
      }, 1000)
    })
  }

  finish() {
    clearInterval(this.state.timer)
    this.setState({
      meditationOngoing: false,
      timer: null,
      durationLeftInSec: 0
    })
  }

  render() {
    const progress = this.state.meditationOngoing ? (this.state.durationLeftInSec / this.state.totalDurationInSec) : 0
    return (
      <MeditateComponent
        progress={progress}
        onStart={duration => this.start(duration)}
        onFinish={() => this.finish()}
        onPause={() => {}}
        meditationOngoing={this.state.meditationOngoing}
        stats={this.props.stats}
      />
    )
  }
}

export default Meditate