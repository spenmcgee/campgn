import React, { useEffect } from 'react';
import Menu from './Menu';
import './Game.css';
import Snap from 'snapsvg-cjs';
import 'snap.svg.zpd';
import Chat from './Chat';
import Join from 'common/message/Join';
//import Text from 'common/message/Text';
import { useCookies } from 'react-cookie';
//import GameState from 'common/GameState';

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

  let [cookies] = useCookies(['campgn']);
  var wsclient = props.wsclient;

  useEffect(() => { //init
    console.log("Game.init")
    wsclient.onOpen(e => {
      console.log("Game.wsclient.onOpen", e);
      var userData = { id: cookies.id, user: cookies.user, room: cookies.room };
      wsclient.send(new Join(userData));
      wsclient.send(new Text({...userData, messageText: 'joining room'}));
    })
    wsclient.connect(cookies);
  }, [cookies, wsclient]);

  useEffect(() => {
    console.log("Game.useEffect");
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
