import React, { Component } from 'react';
import header from './Header.module.css';
import moonDoor from '/src/img/moon-door.png';
import saturnDoor from '/src/img/saturn-door.png';
import sunDoor from '/src/img/sun-door.png';
import logo from '/src/img/logo.png'
import { LuCircle } from "react-icons/lu";

export default class Header extends Component {
    state = {
        selected: null,
        closed: false,
        backgroundClosed: false,
        hidden: false,
    };

    componentDidMount() {
        if (localStorage.getItem('doors') === 'true') {
            this.setState({ hidden: true });
        }
    }

    handleClick = (elem) => {
        const { onSubmit, setIsOpacity } = this.props;

        onSubmit(elem);
        localStorage.setItem('doors', 'true');

        this.setState({
            selected: elem,
            closed: true,
            backgroundClosed: true,
        });

        setIsOpacity(false);
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
        console.log(localStorage.getItem('doors'))
        const { hidden, closed, backgroundClosed } = this.state;
        const { isOpacity } = this.props;

        return (
            <div
                className={`
                    ${header.background}
                    ${backgroundClosed ? header['section-none'] : ''}
                    ${hidden ? header['opasity-header'] : ''}
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
                        ${closed ? header['clouse-header'] : ''}
                        ${hidden ? header['opasity-header'] : ''}
                        ${isOpacity ? header['section-block'] : ''}
                    `}
                >
                    <h1>Выбери то чего хочешь больше всего</h1>

                    <div className={header['doors-box']}>
                        <img
                            src={moonDoor}
                            alt="Moon door"
                            className={`${header.door} ${header.moon}`}
                            onClick={() => this.handleClick('moon')}
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
