import React, { Component } from 'react';
import fm from './FamilyForm.module.css';


export default class FamilyForm extends Component {
  state = {
    formData: {
      name: '',
      motherName: '',
      birthday: ''
    }
  };

  componentDidMount() {
    const saved = localStorage.getItem('userFm');
    if (saved) {
      this.setState({ formData: JSON.parse(saved) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.formData !== this.state.formData) {
      localStorage.setItem('userFm', JSON.stringify(this.state.formData));
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value
      }
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { onNext, onSubmit } = this.props;

    if (onSubmit) onSubmit(this.state.formData);
    if (onNext) onNext();
  };

  render() {
    const { name, motherName, birthday } = this.state.formData;

    return (
      <section className={fm['family-form']}>
        <form className={fm.form} onSubmit={this.handleSubmit}>
          <label>
            Твое имя — это твой Успех. Впиши его
            <input
              type="text"
              className={fm['name-input']}
              name="name"
              value={name}
              onChange={this.handleChange}
              placeholder="твое имя"
            />
          </label>

          <label>
            Имя той, кто дала тебе жизнь - твоя мама
            <input
              type="text"
              className={fm['mother-input']}
              name="motherName"
              value={motherName}
              onChange={this.handleChange}
              placeholder="имя твоей мамы"
            />
          </label>

          <label>
            Число судьбы, которое открывает твои врата
            <input
              type="date"
              name="birthday"
              className={fm['name-birthday']}
              value={birthday}
              onChange={this.handleChange}
            />
          </label>

          <button className={fm['next-form']} disabled={name.length < 1 || motherName.length < 1 || birthday.length < 10} type="submit">
            Земля, давшая тебе силу
          </button>
        </form>

      </section>
    );
  }
}
