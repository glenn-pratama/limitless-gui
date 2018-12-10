import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';

class ItemIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:4000/items');
    const result = await response.json();

    if (result.status === 'OK') {
      this.setState({ data: result.data });
    }
  }

  render() {
    const data = this.state.data;

    return (
      <Table striped bordered responsive size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Active</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.is_active.toString()}</td>
                  <td><Button color="primary">View Price</Button></td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    );
  }
}

export default ItemIndex;
