import React from "react"
import { Search } from "./components/Search"
import { CardList } from "./components/CardList"
import { Loader } from "./components/Loader"
import { ErrorMessage } from "./components/ErrorMessage"
import { ErrorTestButton } from "./components/ErrorTestButton"
import { fetchItems } from "./api/api"
import type { Item } from "./types/Item"

type State = {
  items: Item[]
  loading: boolean
  error: string
  search: string
}

export class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props)

    this.state = {
      items: [],
      loading: false,
      error: "",
      search: localStorage.getItem("search") || ""
    }
  }

  componentDidMount() {
    this.loadData(this.state.search)
  }

  loadData = async (search: string) => {
    this.setState({ loading: true, error: "" })

    try {
    
      await new Promise(res => setTimeout(res, 300))

      const data = await fetchItems(search)

      this.setState({ items: data, loading: false })
    } catch {
      this.setState({ error: "Failed to load data", loading: false })
    }
  }

  handleSearch = (value: string) => {
     
    if (value === this.state.search) return

    this.setState({ search: value })
    this.loadData(value)
  }

  render() {
    const { items, loading, error } = this.state

    return (
      <div className="container">
        <div className="search-section">
          <Search onSearch={this.handleSearch} />
        </div>

        <div className="results-section">
          {loading && <Loader />}

          {error && <ErrorMessage message={error} />}

          {!loading && items.length === 0 && !error && (
            <p>No results found</p>
          )}

          <CardList items={items} />
        </div>

        <div >
          <ErrorTestButton />
        </div>
      </div>
    )
  }
}


export default App;
