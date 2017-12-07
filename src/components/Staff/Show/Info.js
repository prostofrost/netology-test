import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { FormControl, Button } from 'react-bootstrap';

import styled from 'styled-components';

const FormGroup = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;

const Label = styled.span`
  min-width: 10rem;
  font-weight: bold;
`;

const StInput = styled(FormControl)`
  max-width: 30rem;
`;

const StButton = styled(Button)`
  margin-left: 10rem;
`;

class Show extends Component {
  constructor(props) {
    super(props);

    const { employee } = this.props;

    this.state = {
      firstName: employee.name,
      surName: employee.surname,
      position: employee.position,
      description: employee.description,
      isEdit: false,
    };

    this.updateData = this.updateData.bind(this);
    this.toggleEditInfo = this.toggleEditInfo.bind(this);
  }

  onChange(key, value) {
    this.setState({
      [key]: value,
    });
  }

  updateData() {
    const { staffList, employee } = this.props;
    const {
      firstName, surName, position, description,
    } = this.state;

    const key = staffList.indexOf(employee);

    const updatedObj = {
      id: employee.id,
      name: firstName,
      surname: surName,
      position,
      description,
    };

    staffList.splice(key, 1, updatedObj);

    localStorage.setItem('staff', JSON.stringify(staffList));

    this.props.updateComponent();

    this.toggleEditInfo();
  }

  toggleEditInfo() {
    this.setState(prevState => ({
      isEdit: !prevState.isEdit,
    }));
  }

  render() {
    const { employee } = this.props;

    return (
      <Row>
        {this.state.isEdit ? (
          <Col xs={12}>
            <FormGroup>
              <Label>Имя: </Label>
              <StInput
                type="text"
                placeholder="Имя"
                value={this.state.firstName}
                onChange={e => this.onChange('firstName', e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Фамилия: </Label>
              <StInput
                type="text"
                placeholder="Фамилия"
                value={this.state.surName}
                onChange={e => this.onChange('surName', e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label>Должность: </Label>
              <StInput
                type="text"
                placeholder="Должность"
                value={this.state.position}
                onChange={e => this.onChange('position', e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Описание: </Label>
              <StInput
                type="text"
                placeholder="Описание"
                componentClass="textarea"
                value={this.state.description}
                onChange={e => this.onChange('description', e.target.value)}
              />
            </FormGroup>
            <StButton bsStyle="success" onClick={this.updateData}>
              Сохранить
            </StButton>
          </Col>
        ) : (
          <Col xs={12}>
            <FormGroup>
              <Label>Имя: </Label>
              <span>{employee.name}</span>
            </FormGroup>
            <FormGroup>
              <Label>Фамилия: </Label>
              <span>{employee.surname}</span>
            </FormGroup>

            <FormGroup>
              <Label>Должность: </Label>
              <span>{employee.position}</span>
            </FormGroup>

            <FormGroup>
              <Label>Описание: </Label>
              <span>{employee.description}</span>
            </FormGroup>
            <StButton bsStyle="primary" onClick={this.updateData}>
              Редактировать
            </StButton>
          </Col>
        )}
      </Row>
    );
  }
}

export default Show;
