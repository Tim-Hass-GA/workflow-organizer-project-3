import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import github from './images/GitHub.png';
import linkedin from './images/linkedin.png';
import daniel from './images/Daniel.jpg';
import tim from './images/Tim_Hass.jpg';
import zakir from './images/Zakir_Butte.jpg';

class Footer extends Component {
  render() {
    return (
      <div className='footer'>
        <h2>Our Team</h2>
        <Row around="xs" middle="xs">

          <Col xs={4}>
            <Row>
              <Col xs={12}>
                <img src={zakir} className='teamMemberImage' />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <h3>Zakir Butte</h3>
                <p></p>
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <a href='https://github.com/zakirb'><img src={github} /></a>
              </Col>
              <Col xs={6}>
                <a href='https://www.linkedin.com/in/zakir-butte/'><img  src={linkedin} /></a>
              </Col>
            </Row>
          </Col>


          <Col xs={4}>
            <Row>
              <Col xs={12}>
                <img src={daniel} className='teamMemberImage' />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <h3>Daniel Vancura</h3>
                <p></p>
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <a href='https://github.com/danielrvancura'><img src= {github}/></a>
              </Col>
              <Col xs={6}>
                 <a href='https://www.linkedin.com/in/daniel-vancura/'> <img src= {linkedin} /></a>
              </Col>
            </Row>
          </Col>


          <Col xs={4}>
            <Row>
              <Col xs={12}>
                <img src={tim} className='teamMemberImage' />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <h3>Tim Hass</h3>
                <p></p>
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <a href='https://github.com/Tim-Hass-GA'><img src= {github}/></a>
              </Col>
              <Col xs={6}>
              <a href='https://www.linkedin.com/in/tim-h-hass/'>  <img src= {linkedin} /></a>
              </Col>
            </Row>
          </Col>



        </Row>
      </div>
        );
    }
}

export default Footer;
