import React, { Component } from 'react';
import { FormControl, Button } from 'react-bootstrap';

import styled from 'styled-components';

import close from '../../../assets/images/close.svg';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: ${p => (p.isModalOpen ? 'inline-block' : 'none')};
`;

const Modal = styled.div`
  max-width: 40rem;
  top: 6rem;
  border-radius: 0.5rem;
  padding: 5rem 4rem 3rem;
  margin: 0 auto;
  max-height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  background: #fff;
  position: relative;
  z-index: 999;
  text-align: center;
`;

const StInput = styled(FormControl)`
  margin-bottom: 2rem;
`;

const CloseBtn = styled.button`
  content: '';
  border: none;
  background: none;
  outline: none;
  position: absolute;
  padding: 0;
  top: 0.4rem;
  right: 1rem;
  color: #ccc;
  font-size: 2rem;
  cursor: pointer;
`;

const CloseIcon = styled.img`
  width: 2rem;
  height: 2rem;
  transition: 0.3s;
  &:hover {
    transform: rotate(90deg);
  }
`;

class AddStaffModal extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.close = this.close.bind(this);
    this.localstorageAdd = this.localstorageAdd.bind(this);

    this.state = { isOpened: false };
  }

  onChange(key, value) {
    this.setState({
      [key]: value,
    });
  }

  localstorageAdd(e) {
    e.preventDefault();

    const { firstName, surName, position } = this.state;
    const { staffList } = this.props;

    const newId = staffList.length === 0 ? 1 : staffList[staffList.length - 1].id + 1;

    const newObj = {
      id: newId,
      name: firstName,
      surname: surName,
      position,
      description: '',
    };

    const updatedList = [...staffList, newObj];

    localStorage.setItem('staff', JSON.stringify(updatedList));

    this.props.toggleModal();

    this.setState({
      firstName: '',
      surName: '',
      position: '',
    });
  }

  toggle() {
    this.setState({
      isOpened: !this.state.isOpened,
    });
  }

  close() {
    this.setState({
      isOpened: false,
    });
  }

  render() {
    const { isModalOpen } = this.props;

    return (
      <Wrapper isModalOpen={isModalOpen}>
        <Modal>
          <CloseBtn onClick={this.props.toggleModal}>
            <CloseIcon src={close} alt="close button" />
          </CloseBtn>
          <form onSubmit={this.localstorageAdd}>
            <StInput
              type="text"
              placeholder="Имя"
              value={this.state.firstName}
              onChange={e => this.onChange('firstName', e.target.value)}
            />
            <StInput
              type="text"
              placeholder="Фамилия"
              value={this.state.surName}
              onChange={e => this.onChange('surName', e.target.value)}
            />
            <StInput
              type="text"
              placeholder="Должность"
              value={this.state.position}
              onChange={e => this.onChange('position', e.target.value)}
            />
            <Button onClick={this.localstorageAdd} bsStyle="success">
              Отправить
            </Button>
          </form>
        </Modal>
      </Wrapper>
    );
  }
}

export default AddStaffModal;
