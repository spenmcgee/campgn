import React, { useEffect } from 'react';
import Menu from './Menu';
import './Game.css';
import Snap from 'snapsvg-cjs';
import 'snap.svg.zpd';
import { WebsocketClient } from './ws/WebsocketClient';
import Chat from './Chat';

async function loadSvg(url) {
  return new Promise(r => Snap.load(url, data => r(data)));
}

async function draw(paper, boardSvgUrl) {
  var svgData = await loadSvg(boardSvgUrl);
  paper.append(svgData);
  paper.zpd({drag:false});
  //var zpdGroup = Snap.select('#snapsvg-zpd-'+this.paper.id);
}

function Game(props) {

  var wsclient = new WebsocketClient();
  //setupTextEvent(wsclient, chat);

  useEffect(() => {
    var paper = Snap('#board');
    if (props.name)
      draw(paper, `/asset/${props.name}/board.svg`);
  });

  return (
    <div className="Game">
      <Menu className="Menu Menu-floating" />
      <Chat wsclient={wsclient} />
      <svg id="board"></svg>
    </div>
  );
}

export default Game;
