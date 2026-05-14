import React from "react"

export class ErrorTestButton extends React.Component {
  handleClick = () => {
    throw new Error("Test error")
  }

  render() {
    return <button className="error-button" onClick={this.handleClick}>Trigger Error</button>
  }
}