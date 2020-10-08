import React, { useEffect } from 'react';
import Menu from './Menu';
import './Board.css';
import Snap from 'snapsvg-cjs';
import { GameSingleton } from './domain/GameSingleton';
import 'snap.svg.zpd';

async function loadSvg(url) {
  return new Promise(r => Snap.load(url, data => r(data)));
}

async function draw(paper, boardSvgUrl) {
  var svgData = await loadSvg(boardSvgUrl);
  paper.append(svgData);
  paper.zpd({drag:false});
  //var zpdGroup = Snap.select('#snapsvg-zpd-'+this.paper.id);
}

function Board() {

  useEffect(() => {
    var game = GameSingleton.getInstance();
    var paper = Snap('#board');
    console.log("here we are", Snap, paper)
    draw(paper, `/asset/${game.name}/board.svg`);
  });

  return (
    <div className="Board">
      <Menu className="Menu Menu-floating" />
      <svg id="board"></svg>
    </div>
  );
}

export default Board;
