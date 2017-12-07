import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import styled from 'styled-components';

const StTable = styled.table`
  border: 1px solid #c1c3d1;
  padding: 0;
`;

const Tr = styled.tr`
  border-top: 1px solid #c1c3d1;
  border-bottom: 1px solid #c1c3d1;
  color: #333;
  font-size: 1.6rem;
  position: relative;
`;

const Th = styled.th`
  color: #fff;
  font-size: 1.8rem;
  font-weight: normal;
  padding: 1.5rem 7rem;
  text-align: center;
  vertical-align: middle;
`;

const Td = styled.td`
  background: #ffffff;
  padding: 0.8rem;
  text-align: center;
  vertical-align: middle;
  font-size: 1.6rem;
  border-right: 1px solid #c1c3d1;

  &:last-child {
    border-right: none;
  }
`;

const Thead = styled.thead`
  background: #337ab7;
  border-bottom: 2px solid #9ea7af;
  border-right: 1px solid #343a45;
`;

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.removeEmployee = this.removeEmployee.bind(this);
  }

  removeEmployee(id) {
    const { staffList } = this.props;

    const employee = staffList.find(x => Number(x.id) === Number(id)) || {};
    const updatedStaffList = staffList.filter(i => i !== employee);

    localStorage.removeItem('staff');
    localStorage.setItem('staff', JSON.stringify(updatedStaffList));

    this.props.updateComponent();
  }

  render() {
    const { staffList } = this.props;

    return (
      <StTable>
        <Thead>
          <Tr>
            <Th>Имя</Th>
            <Th>Фамилия</Th>
            <Th>Должность</Th>
            <Th />
          </Tr>
        </Thead>
        <tbody>
          {staffList &&
            staffList.map(employee => (
              <Tr>
                <Td>
                  <Link to={`/show?id=${employee.id}`}>{employee.name}</Link>
                </Td>
                <Td>{employee.surname}</Td>
                <Td>{employee.position}</Td>
                <Td>
                  <Button onClick={() => this.removeEmployee(employee.id)}>Удалить</Button>
                </Td>
              </Tr>
            ))}
        </tbody>
      </StTable>
    );
  }
}

export default Table;
