import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Container, FormText } from 'reactstrap';

class ItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: null,
        description: null,
        sourceType: 'fabelio',
        monitorFrequency: 1,
        url: null
      },
      isSuccess: null,
      nextId: null,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.save = this.save.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = (name === 'monitorFrequency') ? parseInt(target.value, 10) : target.value;

    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        [name]: value,
      }
    });
  }

  async save(event) {
    event.preventDefault();

    const response = await fetch('http://localhost:4000/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.data)
    });

    const result = await response.json();

    if (result.status === 'OK') {
      this.setState({
        ...this.state,
        isSuccess: true,
        nextId: result.data,
      });
    }

    this.setState({
      ...this.state,
      isSuccess: false,
    });
  }

  render() {
    if (this.state.isSuccess) {
      const nextUrl = `/items/?id=${this.state.nextId}`;

      return <Redirect to={nextUrl} />;
    }

    return (
      <Container>
        <Form onSubmit={this.save}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input type="text" name="name" id="itemName" placeholder="Name of item, must be unique" onChange={this.handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input type="textarea" name="description" id="itemDescription" onChange={this.handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label for="sourceType">Source</Label>
            <Input type="select" name="sourceType" id="itemSourceType" onChange={this.handleInputChange}>
              <option>Fabelio</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="monitorFrequency">Price check interval</Label>
            <Input type="select" name="monitorFrequency" id="itemMonitor" onChange={this.handleInputChange}>
              <option>1</option>
              <option>6</option>
              <option>12</option>
              <option>24</option>
            </Input>
            <FormText color="muted">
              1 = once a day, 24 = every hour
            </FormText>
          </FormGroup>
          <FormGroup>
            <Label for="url">URL</Label>
            <Input type="text" name="url" id="itemUrl" placeholder="ex: http://www.google.com" onChange={this.handleInputChange} />
          </FormGroup>
          <Button color="primary">Start Monitor</Button>
        </Form>
      </Container>
    )
  }
}

export default ItemForm;
