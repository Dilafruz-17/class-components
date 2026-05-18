import { Component } from 'react';
import { ThrowErrorState } from '../../types';

class ThrowError extends Component<object, ThrowErrorState> {
  constructor(props: object) {
    super(props);
    this.state = { shouldThrow: false };
  }

  handleClick = () => {
    this.setState({ shouldThrow: true });
  };

  render() {
    if (this.state.shouldThrow) {
      throw new Error('Test error triggered by user!');
    }

    return (
      <button className="throw-error-btn" onClick={this.handleClick}>
        💣 Simulate Error
      </button>
    );
  }
}

export default ThrowError;