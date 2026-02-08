import social from './SocialNetworks.module.css'
import { FaArrowLeft } from "react-icons/fa";
import React, { Component } from 'react';

export default class SocialNetworks extends Component {
    state = {
        whatsApp: '',
        telegram: '',
        email: '',
    };

    componentDidMount() {
        const saved = localStorage.getItem('userSocialNetworks');
        if (saved) {
            this.setState(JSON.parse(saved));
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
            localStorage.setItem(
                'userSocialNetworks',
                JSON.stringify(this.state)
            );
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });

        localStorage.setItem(
            'userSocialNetworks',
            JSON.stringify(this.state)
        );
    };

    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({
            whatsApp: '',
            telegram: '',
            email: ''
        })
    };

    clearAllInputs = () => {
        const clear = {
            name: '',
            motherName: '',
            birthday: ''
        }

        const inputs = document.querySelectorAll("input, textarea");
        localStorage.setItem("userFm", JSON.stringify(clear));

        inputs.forEach(el => {
            el.value = "";
        });
    };

    render() {
        const { whatsApp, telegram, email } = this.state
        const { onSubmit } = this.props
        const { onBack } = this.props;

        return (
            <section className={social.familyForm}>
                <form className={social.form} onSubmit={this.handleSubmit}>
                    <FaArrowLeft onClick={onBack} className={social['back-img']} />
                    <label>
                        WhatsApp
                        <input
                            className={social.input}
                            type="tel"
                            name="whatsApp"
                            placeholder="+380 67 123 45 67"
                            autoComplete="tel"
                            onInput={(e) => {
                                e.target.value = e.target.value.replace(/[^0-9+\s\-()]/g, '');
                            }}
                            pattern="^\d{9,15}$"
                            value={whatsApp}
                            onChange={this.handleChange}
                        />
                    </label>

                    <label>
                        E-mail
                        <input
                            className={social.input}
                            type="email"
                            name="email"
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                            placeholder="name@example.com"
                            autoComplete="email"
                            value={email}
                            onChange={this.handleChange}
                        />
                    </label>

                    <label>
                        Telegram
                        <input
                            className={social.input}
                            type="tel"
                            name="telegram"
                            placeholder="+380 67 123 45 67"
                            autoComplete="tel"
                            pattern="^^\d{9,15}$"
                            onInput={(e) => {
                                e.target.value = e.target.value.replace(/[^0-9+\s\-()]/g, '');
                            }}
                            value={telegram}
                            onChange={this.handleChange}
                        />
                    </label>


                    <button className={social.button} disabled={whatsApp.length < 9 || telegram.length < 9 || email.length < 6} onClick={() => { onSubmit(this.state); this.clearAllInputs() }} type="submit">
                        АКТИВИРОВАТЬ
                    </button>
                </form>
            </section>
        );
    }
}
