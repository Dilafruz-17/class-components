import React from "react"

type Props = {
  onSearch: (value: string) => void
}

type State = {
  value: string
}

export class Search extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    const saved = localStorage.getItem("search")

    this.state = {
      value: saved ? saved : ""
    }
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: e.target.value })
  }

  handleSearch = () => {
    const trimmed = this.state.value.trim()

   
    if (trimmed === localStorage.getItem("search")) return

    this.props.onSearch(trimmed)
    localStorage.setItem("search", trimmed)
  }

  render() {
    return (
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          className="search-input"
          value={this.state.value}
          onChange={this.handleChange}
          placeholder="Search..."
          />

        <button onClick={this.handleSearch} className="search-button" >
          Search
        </button>
      </div>
    )
  }
}