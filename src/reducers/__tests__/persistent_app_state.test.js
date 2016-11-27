import reduce from '../persistent_app_state'
import {
  START_MEDITATION_SESSION,
  END_MEDITATION_SESSION,
  HRV
} from 'src/constants'

describe ('START_MEDITATION_SESSION', () => {
  it ('should add Object to state.history', () => {
    const action = {
      type: START_MEDITATION_SESSION,
      payload: {
        timestamp: 1
      }
    }

    const initialState = {
      history: []
    }
    const result = reduce(initialState, action)

    expect(result).toEqual({
      history: [{
        started: 1,
        values: []
      }]
    })

    expect(result.history === initialState.history).toBe(false)
  })
})

describe ('HRV', () => {
  it ('should add data object to values', () => {
    const action = {
      type: HRV,
      payload: {
        data: {
          foo: 'bar'
        },
        timestamp: 1
      }
    }

    const initialState = {
      history: [{
        started: 1,
        values: []
      }]
    }

    const result = reduce(initialState, action)

    expect(result.history.length).toBe(1)
    expect(result.history[0].values.length).toBe(1)
    expect(result.history[0].values[0].timestamp).toBe(1)
    expect(result.history[0].values[0].foo).toBe('bar')

  })
})

describe ('END_MEDITATION_SESSION', () => {
  it ('should add ended param', () => {
    const action = {
      type: END_MEDITATION_SESSION,
      payload: {
        timestamp: 1
      }
    }

    const initialState = {
      history: [{
        started: 1,
        values: [{}, {}]
      }]
    }


    const result = reduce(initialState, action)

    expect(result.history.length).toBe(1)
    expect(result.history[0].values.length).toBe(2)
    expect(result.history[0].ended).toBe(1)

  })

  it ('should remove entry if empty', () => {

    const action = {
      type: END_MEDITATION_SESSION,
      payload: {
        timestamp: 1
      }
    }

    const initialState = {
      history: [{
        started: 1,
        values: []
      }]
    }


    const result = reduce(initialState, action)

    expect(result).toEqual({
      history: []
    })
  })
})


