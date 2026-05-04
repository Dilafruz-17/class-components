import React from "react"
import type { Item } from "../types/Item"

type Props = {
  item: Item
}

export class Card extends React.Component<Props> {
  render() {
    const { item } = this.props

    return (
      <div className="card">
        <h3>{item.name}</h3>
        <p>{item.description}</p>
      </div>
    )
  }
}