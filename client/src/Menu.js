import React from 'react';
import { FaChessBoard } from 'react-icons/fa';
import { FaCrop } from 'react-icons/fa';
import { FaUserNinja } from 'react-icons/fa';
import { FaCog } from 'react-icons/fa';
import './Menu.css';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default function Menu() {

  let history = useHistory();

  function navBoard() {
    history.replace('/board');
  }
  
  function navSettings() {
    history.replace('/settings');
  }

  return (
    <div className="Menu">
      <ButtonGroup size="lg" aria-label="main nav">
        <Button variant="" onClick={navBoard}><FaChessBoard /></Button>
        <Button variant=""><FaUserNinja /></Button>
        <Button variant=""><FaCrop /></Button>
        <Button variant="" onClick={navSettings}><FaCog /></Button>
      </ButtonGroup>
    </div>
  )

}
