// src/components/Home.js
import React from 'react';
import "./Home.css"
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';

function Services() {
  return (
    <div style={{ backgroundImage: 'url(/background3.jpg)', backgroundRepeat: 'no-repeat', backgroundSize: 'auto', height: 'auto' }}>
    <div class="blog-containerservices">
    <div class="blog-services">
    <h2 >Rental services</h2>
    <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
      <Row>
        <Col sm={4}>
          <ListGroup>
            <ListGroup.Item action href="#link1">
              10 minutes of playtime
            </ListGroup.Item>
            <ListGroup.Item action href="#link2">
              30 minutes of playtime
            </ListGroup.Item>
            <ListGroup.Item action href="#link3">
              1 hour of playtime
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col sm={8}>
          <Tab.Content>
            
            <Tab.Pane eventKey="#link1">
            <h4 className='h4s1'>5 €</h4> Experience the adrenaline rush of virtual reality with our 10-minute rental service. Dive into action-packed games, explore immersive environments, and challenge your friends to thrilling adventures—all in just 10 minutes! Perfect for a quick gaming fix or a brief escape from reality.</Tab.Pane>
            <Tab.Pane eventKey="#link2">
            <h4 className='h4s'>10 €</h4>Extend your virtual reality experience with our 30-minute rental service. Immerse yourself in captivating worlds, mastermind daring strategies, and conquer virtual challenges during this half-hour adventure. With more time to explore, you can fully immerse yourself in the excitement of VR gaming.</Tab.Pane>
            <Tab.Pane eventKey="#link3">
            <h4 className='h4s'>18 €</h4>Embark on an epic virtual journey with our one-hour rental service. Lose yourself in immersive landscapes, unleash your creativity in virtual realms, and enjoy extended gameplay with friends and family. Whether you're a seasoned gamer or new to virtual reality, our hour-long rental service offers ample time for unforgettable experiences.</Tab.Pane>

         </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
        
    
  
    
  
       
       
      
    
  </div>
  </div>
  <div className='blog-boxieroom'>
  <div className="image-background">
    <h2 className='hservices'>VR Headsets and Controllers</h2>
    <hr />
    <p className='services'>Looking to dive deeper into the world of virtual reality? Explore our selection of VR headsets and controllers available for purchase. Whether you're a gaming enthusiast, content creator, or professional user, we offer a range of high-quality VR gear to suit your needs.
    From standalone headsets to advanced controllers, our VR products are designed to deliver immersive and realistic experiences. Discover the latest innovations in VR technology and take your gaming and entertainment to the next level.</p>
  </div>
</div>
  
  
  </div>
  
  




  );
}

export default Services;
