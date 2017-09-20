import React from 'react';
import ReactDOM from 'react-dom';
import request from 'request';

let mazetable = [];

let url =  'http://52.88.26.79:7000/?type=json&w=10&h=10';

let oldx;
let oldy;
let newx;
let newy;

request(url, function (error, response, body) {
    const mJson = (JSON.parse(body));

    for (let i = 0; i < mJson.length; i++) {
        for (let j = 0; j < mJson[i].length; j++) {
            if(mJson[i][j] == 'p'){
                oldx = i;
                oldy = j;
            }
        }
    }

    ReactDOM.render(<Player body={mJson} oldx={oldx} oldy={oldy}/>, document.getElementById('maze'));

});


class Player extends React.Component{

    constructor(props){
        super(props);
        this.state = {change: 0};
        this.handleKeyPress = this.handleKeyPress.bind(this);

    }

    componentWillMount() {
        window.addEventListener('keypress', this.handleKeyPress);
    }

    componentWillUnmount() {
        window.removeEventListener('keypress', this.handleKeyPress);
    }

    drawMaze(move) {
        let changes = 0;
        if (!oldx) {
            let oldx = this.props.oldx;
            let oldy = this.props.oldy;

        }

        let mJson = this.props.body;

        if ((move == 'up' && mJson[oldx - 1][oldy] == " ") || (move == 'up' && mJson[oldx - 1][oldy] == "g")) {

            newx = oldx - 1;
            newy = oldy;

            document.getElementById('item_' + newx + newy).innerHTML = "p";
            document.getElementById('item_' + oldx + oldy).innerHTML = " ";
            oldx = newx;
            oldy = newy;

            changes++;
            this.setState({change: changes});
            if(mJson[oldx][oldy + 1] == "g"){
                alert('ganaste');
            }
        }
        else if ((move == 'down' && mJson[oldx + 1][oldy] == " ") || (move == 'down' && mJson[oldx + 1][oldy] == "g")) {

            newx = oldx + 1;
            newy = oldy;

            document.getElementById('item_' + newx + newy).innerHTML = "p";
            document.getElementById('item_' + oldx + oldy).innerHTML = " ";

            oldx = newx;
            oldy = newy;

            changes++;
            this.setState({change: changes});
            if(mJson[oldx][oldy + 1] == "g"){
                alert('ganaste');
            }
        }
        else if ((move == 'left' && mJson[oldx][oldy - 1] == " ") || (move == 'left' && mJson[oldx][oldy - 1] == "g")) {
            newx = oldx;
            newy = oldy - 1;

            document.getElementById('item_' + newx + newy).innerHTML = "p";
            document.getElementById('item_' + oldx + oldy).innerHTML = " ";

            oldx = newx;
            oldy = newy;

            changes++;
            this.setState({change: changes});
            if(mJson[oldx][oldy + 1] == "g"){
                alert('ganaste');
            }
        }
        else if ((move == 'right' && mJson[oldx][oldy + 1] == " ") || (move == 'right' && mJson[oldx][oldy + 1] == "g")) {

            newx = oldx;
            newy = oldy + 1;

            document.getElementById('item_' + newx + newy).innerHTML = "p";
            document.getElementById('item_' + oldx + oldy).innerHTML = " ";

            oldx = newx;
            oldy = newy;

            changes++;
            this.setState({change: changes});
            if(mJson[oldx][oldy + 1] == "g"){
                alert('ganaste');
            }
        }
        else if(move == null) {
            //this.setState({change: false});

            for (let i = 0; i < mJson.length; i++) {
                let mazeRow = [];
                for (let j = 0; j < mJson[i].length; j++) {

                    mazeRow.push(
                        <td key={'item_' + i + j} id={'item_' + i + j}>
                            {mJson[i][j]}
                        </td>
                    );
                }

                mazetable.push(
                    <tr key={'row_' + i}>
                        {mazeRow}
                    </tr>
                )
            }
         }

        return mazetable;
    }



    handleKeyPress(event){
        if(event.key == 'a' || event.key == 'A' || event.key == 'ArrowLeft'){
            this.drawMaze("left");
        }
        if(event.key == 'w' || event.key == 'W' || event.key == 'ArrowUp'){
            this.drawMaze("up");
        }
        if(event.key == 's' || event.key == 'S' || event.key == 'ArrowDown'){
            this.drawMaze("down");
        }
        if(event.key == 'd' || event.key == 'D' || event.key == 'ArrowRight'){
            this.drawMaze("right");
        }
    }

    render() {
        if (this.state.change == 0) {
            return (<table tabIndex="0" onKeyPress={this.handleKeyPress}>
                <tbody>{this.drawMaze()}</tbody>
            </table>)
        }
        else {
            return (<table tabIndex="0" onKeyPress={this.handleKeyPress}>
                <tbody>{mazetable}</tbody>
            </table>)
        }
    }
}