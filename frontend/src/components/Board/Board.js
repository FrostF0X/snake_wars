import React, { Component } from 'react';

import apple from '../../images/apple.svg';
import head from '../../images/head.svg';
import brick from '../../images/brick.svg';

class Board extends Component {

  constructor(props) {
      super(props);
      this.tileSize = window.innerHeight / this.width || 20;
      this.players = [];
  }

  get width() {
      return this.props.boardData[0].length * this.tileSize;
  }

  get height() {
      return this.props.boardData.length * this.tileSize;
  }


  componentDidMount() {
      this.updateCanvas();
  }

  componentDidUpdate() {
      this.updateCanvas();
  }

  componentWillReceiveProps(props) {
    this.updateCanvas();
  }
  
  drawImage(context, src, coordinates) {
    const offset = 3;
    let image = new Image();
    image.onload = () => {
      context.drawImage(image, coordinates[0] + offset, coordinates[1] + offset , this.tileSize - offset*2, this.tileSize - offset*2);
    };
    image.src = src;
  }
  
  drawTile(context, coordinates, type) {
    const colors = {
      'empty': '#fff',
      'players': [
        '#E91E63',
        '#3F51B5',
        '#009688',
        '#795548',
        '#607D8B',
        '#000000']
    };

    if(typeof type === 'object' && null !== type) {
      if(type.dead) {
          context.beginPath();
          this.drawImage(context, brick, coordinates);
          context.closePath();
      } else if(type.head) {
          context.beginPath();
          this.drawImage(context, head, coordinates);
          context.closePath();
      } else if(type.player >= 0) {
        const offset = 5;
        context.beginPath();
        context.fillStyle = colors.players[type.player];
        context.fillRect(coordinates[0] + offset, coordinates[1] + offset , this.tileSize - offset*2, this.tileSize - offset*2);
        context.closePath();
      }
    } else {
      switch(type) {
        case '🍎':
          context.beginPath();
          this.drawImage(context, apple, coordinates);
          context.closePath();
          break;
        default:
          context.beginPath();
          context.fillStyle = colors.empty;
          context.fillRect(...coordinates, this.tileSize, this.tileSize);
          context.closePath();
          break;
      }
    }
  }

  updateCanvas() {
    const ctx = this.refs.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.width, this.height);
    
    for(let i = 0; i<this.props.boardData.length; i++) {
      for(let j = 0; j<this.props.boardData[i].length; j++) {
        this.drawTile(ctx, [j*this.tileSize, i*this.tileSize], this.props.boardData[i][j]);
      }
    }
    
    ctx.beginPath();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 3;
    ctx.rect(0, 0, this.width, this.height);
    ctx.stroke();
    ctx.closePath();
  }
  render() {
    return (
      <canvas ref="canvas" width={this.width} height={this.height}/>
    );
  }
  
}

export default Board;
