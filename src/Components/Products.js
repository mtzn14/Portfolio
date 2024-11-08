import React, { useState } from "react";
import {  Row, Col, Figure, Button, Alert } from 'react-bootstrap';

function Products() {
    const [showStockAlert, setShowStockAlert] = useState(false);
    const [showCartAlert, setShowCartAlert] = useState(false);

    const handleAddToCart = () => {
        setShowStockAlert(false);
        setShowCartAlert(true);
        }

    const handleAddToCart2 = () => {
      setShowStockAlert(true);
      setShowCartAlert(false);};
    return (
        <div className="blog-containerpr">
             <div className="animated-background">
      <div className="stars"></div>
      <div className="twinkling"></div>
      <div className="clouds"></div>
    </div>
            <Row>
                {showStockAlert &&
                    <Alert variant="danger" onClose={() => setShowStockAlert(false)}>
                        <h3>Error!</h3>
                        <p>
                        We're sorry, VR Controller is not available at the moment. Please try again later.
                        </p>
                    </Alert>
                }

                {showCartAlert &&
                    <Alert variant="danger" onClose={() => setShowCartAlert(false)}>
                        <h3>Error!</h3>
                        <p>
                            We're sorry, VR Headset is not available at the moment. Please try again later.
                        </p>
                    </Alert>
                }

                <div className="hs1">
                    <Col xs={6} md={4} >
                        <Figure>
                            <Figure.Image width={480} height={480} src="3.png" fluid />
                            <Figure.Caption className="text-center">
                                VR Headset
                            </Figure.Caption>
                        </Figure>
                        <Button variant='primary' className="bhs" onClick={handleAddToCart}>Add to cart</Button>
                    </Col>
                </div>
                <div className="hs2">
                    <Col xs={6} md={4}>
                        <Figure>
                            <Figure.Image width={480} height={480} src="4.png" fluid />
                            <Figure.Caption className="text-center">
                                VR Controller
                            </Figure.Caption>
                        </Figure>
                        <Button variant='primary' className="bco" onClick={handleAddToCart2}>Add to cart</Button>
                    </Col>
                </div>
            </Row>
        </div>
    );
}

export default Products;
