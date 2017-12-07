import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Button } from 'react-bootstrap';

import styled from 'styled-components';

import Table from './Table';
import AddStaffModal from './AddStaffModal';

const Overlay = styled.div`
  opacity: 0;
  ${p =>
    p.isModalOpen &&
    `
      content: '';
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 998;
      background: rgba(0, 0, 0, .6);
      opacity: 1;
      transition: opacity .35s linear;
  `};
`;

const AddBtn = styled(Button)`
  margin: 3rem 0 2rem;
`;

class List extends Component {
  constructor(props) {
    super(props);
    this.state = { isModalOpen: false };

    this.localstorageRemove = this.localstorageRemove.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.updateComponent = this.updateComponent.bind(this);
  }

  localstorageRemove() {
    localStorage.removeItem('staff');

    this.forceUpdate();
  }

  toggleModal() {
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen,
    }));
  }

  updateComponent() {
    this.forceUpdate();
  }

  render() {
    const staffList = JSON.parse(localStorage.getItem('staff')) || [];
    const { isModalOpen } = this.state;

    return (
      <Row>
        <Overlay isModalOpen={isModalOpen} onClick={this.toggleModal} />
        <Col xs={12}>
          <h1>Список струдников</h1>
          <hr />
          <AddBtn bsStyle="primary" onClick={this.toggleModal}>
            Добавить сотрудника
          </AddBtn>

          {/* <button onClick={this.localstorageRemove}>очистить</button> */}
          <Row>
            <Col xs={12}>
              <Table staffList={staffList} updateComponent={this.updateComponent} />
            </Col>
          </Row>
          <br />
          <AddStaffModal
            staffList={staffList}
            isModalOpen={isModalOpen}
            toggleModal={this.toggleModal}
          />
        </Col>
      </Row>
    );
  }
}

export default List;
