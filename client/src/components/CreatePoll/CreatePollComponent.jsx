import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';

import PollForm from './PollForm';
import PollPreview from './PollPreview';
import './CreatePoll.css';

const CreatePollComponent = ({
  errorMessages,
  isAnonymous,
  question,
  options,
  optionFields,
  handleAddOptionField,
  handleChange,
  handleOptionChange,
  handleSubmit
}) => (
    <Container className="">
      <Row className="justify-content-md-center create-poll">
        <Tab.Container id="left-tabs-example" defaultActiveKey="edit">
          <Col xs={12} md={8} lg={5} className="create-poll__card">
            <Card className="text-center cud">
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
                    <PollForm
                      errorMessages={errorMessages}
                      isAnonymous={isAnonymous}
                      options={options}
                      optionFields={optionFields}
                      handleAddOptionField={handleAddOptionField}
                      handleChange={handleChange}
                      handleOptionChange={handleOptionChange}
                      question={question}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="preview">
                    <PollPreview
                      isAnonymous={isAnonymous}
                      options={options}
                      question={question}
                    />
                  </Tab.Pane>
                </Tab.Content>
              </Card.Body>
              <Row className="d-flex flex-column">
                <Button
                  className="create-poll__submit-button"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Row>
            </Card>
          </Col>
        </Tab.Container>
      </Row>
    </Container>
  );

export default CreatePollComponent;
