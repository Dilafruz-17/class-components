import React from "react"

type Props = {
  message: string
}

export class ErrorMessage extends React.Component<Props> {
  render() {
    return <p className="error">{this.props.message}</p>
  }
}