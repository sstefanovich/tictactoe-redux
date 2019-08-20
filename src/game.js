import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { addMove, rewind } from './actions';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import Board from './board'
import { NEW_MOVE, REWIND } from "./actionTypes"
import { defaultCoreCipherList } from 'constants';

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            history: [{ squares: Array(9).fill(null) }],
            xIsNext: true,
            stepNumber: 0,
        }
    }

    calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    handleClick(i) {
        const history = this.props.history.slice(0, this.props.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }

        this.props.addMove(i);
    }

     render() {
        const history = this.props.history;
        const winner = null; //= this.calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.props.rewind(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.props.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={this.props.history[this.props.stepNumber].squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        history: state.history,
        xIsNext: state.xIsNext,
        stepNumber: state.stepNumber,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addMove: (value) => dispatch({ type: NEW_MOVE, value: value, }),
        rewind: (value) => dispatch({ type: REWIND, value: value, }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)