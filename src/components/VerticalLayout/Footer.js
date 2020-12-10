import React from "react";
import { Row, Col } from "reactstrap";

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <div className="container-fluid">
          <Row>
            <Col sm={6}>{new Date().getFullYear()} © Habitat.</Col>
            <Col sm={6}>
              <div className="text-sm-right d-none d-sm-block">
                Design & Develop by Pragmatech
              </div>
            </Col>
          </Row>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
