import React from "react";
import { Container, Row, Col } from "reactstrap";

const Footer = (props: { footerLeft?: JSX.Element | React.ReactNode; footerRight?: JSX.Element | React.ReactNode }) => {
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid={true}>
          <Row>
            <Col md={6}>{props.footerLeft}</Col>
            <Col md={6}>
              <div className="text-sm-end d-none d-sm-block">{props.footerLeft}</div>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
