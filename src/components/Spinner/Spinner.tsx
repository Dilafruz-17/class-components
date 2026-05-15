import { Component } from 'react';

class Spinner extends Component {
  render() {
    return (
      <div className="spinner-wrapper">
        <div className="pokeball">
          <div className="pokeball__top" />
          <div className="pokeball__center" />
          <div className="pokeball__bottom" />
        </div>
        <p className="spinner-text">Loading Pokémon...</p>
      </div>
    );
  }
}

export default Spinner;