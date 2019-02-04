import React from 'react'
import debounce from 'lodash.debounce'

const baseEndpoint = 'https://www.quandl.com/api/v3/datasets'

function buildURL(query) {
  const url = new URL(baseEndpoint)
  url.search = new URLSearchParams({
    database_code: 'EOD',
    filter: 'sample',
    page: 1,
    per_page: 5,
    query
  }).toString()
  return url.toString()
}

function quandlMap(data) {
  return data.datasets.map(set => ({
    id: set.id,
    code: set.dataset_code,
    name: set.name
  }))
}

class CompanyInputFetcher extends React.Component {
  state = {
    data: undefined,
    loading: false,
    error: false,
  }

  abortController = new AbortController()

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.params.q !== this.props.params.q) {
      this.fetchData()
    }
  }

  componentWillUnmount() {
    this.abortController.abort()
  }

  makeNetworkRequest = debounce(() => {
    const { q } = this.props.params

    fetch(buildURL(q),{ signal: this.abortController.signal })
      .then(res => res.json())
      .then(quandlMap)
      .then(data => {
        this.setState({
          data,
          loading: false,
          error: false,
        })
      })
      .catch(e => {
        this.setState({data: undefined, error: e.message, loading: false})
        console.error(e)
      })
  }, 500)

  fetchData = () => {
    this.abortController.abort()
    this.abortController = new AbortController()
    this.setState({error: false, loading: true})
    this.makeNetworkRequest()
  }

  render() {
    return this.props.children(this.state)
  }
}

export default CompanyInputFetcher
