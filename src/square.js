import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
}

Square.propTypes = {
    value: PropTypes.string
};

export default Square