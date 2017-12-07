import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-flexbox-grid';

import styled from 'styled-components';

import Info from './Info';

const StLink = styled(Link)`
  display: block;
  margin: 2rem 0 1rem;
`;

const queryString = require('query-string');

class Show extends Component {
  constructor(props) {
    super(props);

    this.updateComponent = this.updateComponent.bind(this);
  }

  onChange(key, value) {
    this.setState({
      [key]: value,
    });
  }

  updateComponent() {
    this.forceUpdate();
  }

  render() {
    const staffList = JSON.parse(localStorage.getItem('staff'));
    const parsed = queryString.parse(this.props.location.search);
    const { id } = parsed;
    const employee = staffList.find(x => Number(x.id) === Number(id)) || {};

    return (
      <Row>
        <Col xs={12}>
          <StLink to="/">К списку</StLink>

          <h1>Информация о сотруднике</h1>
          <hr />
          {Object.keys(employee).length !== 0 ? (
            <Info
              staffList={staffList}
              employee={employee}
              updateComponent={this.updateComponent}
            />
          ) : (
            <p>
              Сотрудник не найден<br /> <StLink to="/">Вернуться к списку сотрудников</StLink>
            </p>
          )}
        </Col>
      </Row>
    );
  }
}

export default Show;
