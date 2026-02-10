import React, { Component } from 'react';
import header from './Header.module.css';
import moonDoor from '/src/img/moon-door.png';
import saturnDoor from '/src/img/saturn-door.png';
import sunDoor from '/src/img/sun-door.png';
import logo from '/src/img/logo.png';
import { LuCircle } from "react-icons/lu";

export default class Header extends Component {
    state = {
        selected: null,
    };

    componentDidMount() {
         const { autoScrol,setForm } = this.props;
        const isFormBlock = localStorage.getItem('isForms')
        const isFormData = JSON.parse(isFormBlock)

        if(isFormData === true) {
            setForm(true)
            autoScrol?.();
        }
    }

    handleClick = (elem) => {
        const { onSubmit, autoScrol, setForm } = this.props;

        this.setState({ selected: null }, () => {
            requestAnimationFrame(() => {
                this.setState({ selected: elem });
                setForm(true)
                setTimeout(() => {
                    onSubmit(elem);
                    autoScrol?.();
                    localStorage.setItem('isForms', 'true')
                }, 6000)
            });
        });
    };


    getTransitionClass() {
        const { selected } = this.state;

        switch (selected) {
            case 'moon':
                return header['fill-blue'];
            case 'sun':
                return header['fill-gold'];
            case 'saturn':
                return header['fill-blood'];
            default:
                return '';
        }
    }

    render() {
        const { isOpacity } = this.props;

        return (
            <div
                className={`
                    ${header.background}
                    ${isOpacity ? header['section-block'] : ''}
                `}
            >
                <LuCircle
                    className={`
                        ${header['transition-img']}
                        ${this.getTransitionClass()}
                    `}
                />

                <img
                    src={logo}
                    alt=""
                    className={`
                        ${header['logo']}
                        ${this.getTransitionClass()}
                    `}
                />

                <header
                    className={`
                        ${isOpacity ? header['section-block'] : ''}
                    `}
                >
                    <h1>Выбери то чего хочешь больше всего</h1>

                    <div className={header['doors-box']}>
                        <img
                            src={moonDoor}
                            alt="Moon door"
                            className={`${header.door} ${header.moon}`}
                            onClick={() => { this.handleClick('moon') }}
                        />

                        <img
                            src={saturnDoor}
                            alt="Saturn door"
                            className={`${header.door} ${header.saturn}`}
                            onClick={() => this.handleClick('saturn')}
                        />

                        <img
                            src={sunDoor}
                            alt="Sun door"
                            className={`${header.door} ${header.sun}`}
                            onClick={() => this.handleClick('sun')}
                        />
                    </div>
                </header>
            </div>
        );
    }
}
