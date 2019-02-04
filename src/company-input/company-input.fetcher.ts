import React from 'react'
import debounce from 'lodash.debounce'

interface CompanyInputFetcherProps {
  query: string
  children: (state: CompanyInputFetcherState) => React.ReactNode
}

interface CompanyInputFetcherState {
  data?: []
  loading: boolean
  error: boolean
}

export class CompanyInputFetcher extends React.Component<CompanyInputFetcherProps, CompanyInputFetcherState> {
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
    if (prevProps.query !== this.props.query) {
      this.fetchData()
    }
  }

  componentWillUnmount() {
    this.abortController.abort()
  }

  makeNetworkRequest = debounce(() => {
    const { query } = this.props

    fetch(buildURL(query),{ signal: this.abortController.signal })
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

function buildURL(query: string): string {
  const url = new URL('https://www.quandl.com/api/v3/datasets')
  url.search = new URLSearchParams({
    database_code: 'EOD',
    filter: 'sample',
    page: "1",
    per_page: "5",
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