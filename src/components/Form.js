import React, { Component } from 'react';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { firstName, surName, position } = this.props;

    return (
      <div>
        <input
          type="text"
          placeholder="Имя"
          value={firstName}
          onChange={e => this.onChange('firstName', e.target.value)}
        />
        <input
          type="text"
          placeholder="Фамилия"
          value={surName}
          onChange={e => this.onChange('surName', e.target.value)}
        />
        <input
          type="text"
          placeholder="Должность"
          value={position}
          onChange={e => this.onChange('position', e.target.value)}
        />
      </div>
    );
  }
}

export default Form;
