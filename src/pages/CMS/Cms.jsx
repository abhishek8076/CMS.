import React, { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import NoteViewer from '../../components/Edit/Edit';
import Whats_New from '../../components/WhatsNew/WhatsNew';
import './Cms.scss';
import { Container } from 'react-bootstrap';
import Grid from '@mui/material/Grid';
// import {Item}  from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Form } from 'react-bootstrap';
import New from '../../pages/new/New'
import { Menu } from '../../components/NavMenu/menu';
import {Submenu} from '../../components/NavMenu/submenu';
// import './Cms.scss'
import { Row, Col,  Button } from 'react-bootstrap';
import { CMShomepage } from '../../components/NavMenu/Homemenu/CMShomepage';
import { Link } from 'react-router-dom';
import { MenuTable } from '../../components/NavMenu/NavMenuTable/MenuTable';
export const Cms = () => {
  const [menu, setMenu] = React.useState('');
  const [showDiv, setShowDiv] = useState(false);
  const [showDiv1, setShowDiv1] = useState(false);
  const contentType = [
    { label: 'Select' },
    { label: 'File', value: "1" }, 
    { label: 'Link', value: "2" },
    { label: 'HTML', value: "3" },
  ]
  const [activeButton, setActiveButton] = useState("button1"); // Set "button1" as the initial active button

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  const [selectedRole, setSelectedRole] = useState('')
  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value); // Update the state with the selected value
  };

  const handleChange = (event) => {
    setMenu(event.target.value);
  };
  const [formData, setFormData] = useState({
    name: '',
    url: ''

  });
  //to the div and hide div
  const handleDropdownChange = (event) => {
    const selectedValue = event.target.value;
    // if (selectedValue === 'option1') {
    //   setShowDiv(selectedValue === 'option1')
    // }
    setShowDiv(selectedValue === 'option1' || "demo")
    // setShowDiv(if);
  };
  const options = ['Select','Home', 'Menu', 'Submenu']; // Options for the dropdown
  const [selectedOption, setSelectedOption] = useState(options[0]); // Initial selected option

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    
    <div>
    <div className="home">
      <Sidebar className='nav' style={{}} />
      <div className="homeContainer">
        <div className="backgroundcontainer">
          <Navbar />
          <div >
    
            <div className="container">
          <div className="tab-box">
            <button onClick={() => handleButtonClick("button1")} className="tab1">Home</button>
            <button onClick={() => handleButtonClick("button2")} className="tab2">Menu</button>
            <button onClick={() => handleButtonClick("button3")} className="tab3">Sub Menu</button>
            {/* <button onClick={() => handleButtonClick("button4")} className="tab4">Linking</button> */}
</div>

            <div style={{ display: activeButton === "button1" ? "block" : "none" }}>
            < CMShomepage/>
          
            </div>
            <div style={{ display: activeButton === "button2" ? "block" : "none" }}>
            <MenuTable />
              
            </div>
            <div style={{ display: activeButton === "button3" ? "block" : "none" }}>
            <MenuTable />
            </div>
            {/* <div style={{ display: activeButton === "button4" ? "block" : "none" }}>
            <FooterPage />
            </div> */}
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
