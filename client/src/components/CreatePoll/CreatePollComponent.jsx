import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';

import './CreatePoll.css';

const pollForm = (
  <div className="create-poll__form">
    <Form.Group>
      <Form.Label>Question</Form.Label>
      <Form.Control
        name="question"
        // onChange={this.handleChange}
        placeholder="eg: what is my best color"
        type="text"
      // value={email}
      // isInvalid={!!emailError}
      />
      <Form.Control.Feedback type="invalid">
        {/* {emailError} */}
      </Form.Control.Feedback>
    </Form.Group>
    <Form.Group>
      <Form.Label>Option 1</Form.Label>
      <Form.Control
        name="option1"
        // onChange={this.handleChange}
        placeholder="Options should be at least 2"
        type="text"
      // value={username}
      // isInvalid={!!userNameError}
      />
      {/* <Form.Control.Feedback type="invalid">
        {userNameError}
      </Form.Control.Feedback> */}
    </Form.Group>
    <Form.Group>
      <Form.Label>Option 2</Form.Label>
      <Form.Control
        name="option2"
        // onChange={this.handleChange}
        placeholder="Options should be at least 2"
        type="text"
      // value={username}
      // isInvalid={!!userNameError}
      />
      {/* <Form.Control.Feedback type="invalid">
        {userNameError}
      </Form.Control.Feedback> */}
    </Form.Group>
    <Form.Group>
      <Form.Label>Option 2</Form.Label>
      <Form.Control
        name="option2"
        // onChange={this.handleChange}
        placeholder="Options can not be more than 5"
        type="text"
      // value={username}
      // isInvalid={!!userNameError}
      />
      {/* <Form.Control.Feedback type="invalid">
        {userNameError}
      </Form.Control.Feedback> */}
    </Form.Group>
    <Form.Group>
      <Form.Label>Option 2</Form.Label>
      <Form.Control
        name="option2"
        // onChange={this.handleChange}
        placeholder="Options can not be more than 5"
        type="text"
      // value={username}
      // isInvalid={!!userNameError}
      />
      {/* <Form.Control.Feedback type="invalid">
        {userNameError}
      </Form.Control.Feedback> */}
    </Form.Group>
    <Form.Group>
      <Form.Label>Option 2</Form.Label>
      <Form.Control
        name="option2"
        // onChange={this.handleChange}
        placeholder="Options can not be more than 5"
        type="text"
      // value={username}
      // isInvalid={!!userNameError}
      />
      {/* <Form.Control.Feedback type="invalid">
        {userNameError}
      </Form.Control.Feedback> */}
    </Form.Group>
    <Form.Control.Feedback type="invalid">
      {/* {this.props.errorMessage} */}
    </Form.Control.Feedback>
    <a href="#1" className="add-link">Add more options</a>
  </div>
);

const pollPreview = (
  <div>
    <h5
      className="create-poll__question"
    >
      What is your best color?
    </h5>
    <ListGroup variant="flush">
      <ListGroup.Item>orange</ListGroup.Item>
      <ListGroup.Item>green</ListGroup.Item>
      <ListGroup.Item>Voilet</ListGroup.Item>
    </ListGroup>
  </div>
);

const CreatePollComponent = () => (
  <Container className="create-poll">
    <Row className="justify-content-md-center">
      <Tab.Container id="left-tabs-example" defaultActiveKey="edit">
        <Card className="text-center" style={{ width: '24rem' }}>
          <Card.Header>
            <h4>Create a new poll</h4>
            <Nav
              variant="tabs"
              className="justify-content-md-center create-poll__nav-link"
            >
              <Nav.Item>
                <Nav.Link eventKey="edit">Edit</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="preview">Preview</Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Card.Body className="tab-content" id="nav-tabContent">
            <Tab.Content className="create-poll__tab">
              <Tab.Pane eventKey="edit">
                {pollForm}
              </Tab.Pane>
              <Tab.Pane eventKey="preview">
                {pollPreview}
              </Tab.Pane>
            </Tab.Content>
            <Row className="d-flex flex-column">
              <Button className="create-poll__submit-button">Submit</Button>
            </Row>
          </Card.Body>
        </Card>
      </Tab.Container>
    </Row>
  </Container>
);

export default CreatePollComponent;
