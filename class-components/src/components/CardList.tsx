import React from "react"
import type { Item } from "../types/Item"
import { Card } from "./Card"

type Props = {
  items: Item[]
}

export class CardList extends React.Component<Props> {
  render() {
    return (
      <div>
        {this.props.items.map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </div>
    )
  }
}

