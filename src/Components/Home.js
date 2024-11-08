
import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './Home.css'; 
import Accordion from 'react-bootstrap/Accordion';

const Home = () => {
    return (
        <body className='homer'>
        <div class="blog-container"
        style={{
          backgroundImage: 'url(/background.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'auto',
          width:'100%',
          height: '50vh'
        }}>
          <div class="blog-boxie">
            <h2>GLEOWO VR Game Room!</h2>
           
            <p>
            
            Step into the future of gaming and entertainment with our cutting-edge virtual reality experiences. At our VR game room, you'll embark on thrilling adventures, explore new worlds, and challenge yourself in ways you never thought possible.
            </p>
            
          
       
          
         
          </div>
        </div>
       
  
  
  
        <div className='blog-homebg'>
        <div class="blog-home">
        <h2>What is VR?</h2>
            <p>
            Virtual reality isn't just about gaming—it's a revolutionary technology with applications across various industries and fields. From healthcare to education, VR is transforming the way we learn, work, and interact with the world around us.
            </p>
            <p>Whether you're a seasoned gamer or new to the world of VR, our experienced staff will guide you through an unforgettable journey. Get ready to immerse yourself in the ultimate gaming experience!</p>
       </div></div>
       <div className='blog-bar'>
      <Accordion defaultActiveKey="1">
        <Accordion.Item eventKey="0">
          <Accordion.Header>How far away are we from opening?</Accordion.Header>
          <Accordion.Body>
          <ProgressBar animated now={95}  /> Loading... 95% 
          </Accordion.Body>
        </Accordion.Item>
        
          
        
      </Accordion>
      <div className='vrfut'>
      <p>Virtual reality isn't just a form of entertainment—it's a transformative technology with the potential to revolutionize various industries and fields. In healthcare, VR is being used for medical training, pain management, and therapy. In education, VR offers immersive learning experiences that engage students and enhance retention.</p>      <p>Psychologists are exploring the therapeutic benefits of VR for treating phobias, PTSD, and anxiety disorders. Architects and designers are using VR to create immersive virtual environments for visualization and simulation. The possibilities are endless, and we're just scratching the surface of what VR can achieve.</p>
        <p>Join us on the journey to unlock the full potential of virtual reality and discover a world of endless possibilities!</p>
  </div></div></body>
    );
};
 
export default Home;