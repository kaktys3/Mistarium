import React, { Component } from 'react';
import header from './Header.module.css';
import moonDoor from '/src/img/moon-door.png';
import saturnDoor from '/src/img/saturn-door.png';
import sunDoor from '/src/img/sun-door.png';
import { GiMagicShield } from "react-icons/gi";

export default class Header extends Component {
    state = {
        selected: null,
        closed: false,
        backgroundClosed: false,
        hidden: false 
    };

    componentDidMount() {
        const doors = localStorage.getItem('doors');

        if (doors === 'true') {
            this.setState({ hidden: true });
        }
    }

    doorOptions = (elem) => {
        const { onSubmit } = this.props;
        onSubmit(elem);
        localStorage.setItem('doors', 'true')
    };

    transitionOptions = (elem) => {
        this.setState({ selected: elem });
    };

    getTransitionClass = () => {
        const { selected } = this.state;
        if (selected === 'moon') return header['fill-blue'];
        if (selected === 'sun') return header['fill-gold'];
        if (selected === 'saturn') return header['fill-blood'];
        return '';
    };

    getHeaderClass = () => {
        return this.state.closed ? header['clouse-header'] : '';
    };

    getBackgroundClass = () => {
        return this.state.backgroundClosed ? header['section-none'] : '';
    };

    handleClick = (elem) => {
        this.doorOptions(elem);
        this.transitionOptions(elem);

        this.setState({
            closed: true,
            backgroundClosed: true
        });

        setTimeout(() => {
            if (localStorage.getItem('doors') !== 'true') {
                localStorage.setItem('doors', 'true');
            }
        }, 6000);

        this.props.setIsOpacity(false);
    };

    render() {
        const {hidden} = this.state
        const {isOpacity} = this.props
          console.log(isOpacity)

        return (
            <div className={`${header.background} ${this.getBackgroundClass()} ${hidden === true ? header['opasity-header']: ''} ${isOpacity === true ? header['section-block'] : ''}`}>
                <GiMagicShield className={`${header['transition-img']} ${hidden === true ? header['opasity-header']: ''} ${this.getTransitionClass()}`} />

                <header className={`${this.getHeaderClass()} ${hidden === true ? header['opasity-header']: ''} ${isOpacity === true ? header['section-block'] : ''}`}>
                    <h1>
                        Выбери то чего хочешь больше всего
                    </h1>

                    <div className={header['doors-box']}>
                        <img
                            src={moonDoor}
                            alt=""
                            className={`${header.door} ${header.moon}`}
                            onClick={() => this.handleClick('moon')}
                        />

                        <img
                            src={saturnDoor}
                            alt=""
                            className={`${header.door} ${header.saturn}`}
                            onClick={() => this.handleClick('saturn')}
                        />

                        <img
                            src={sunDoor}
                            alt=""
                            className={`${header.door} ${header.sun}`}
                            onClick={() => this.handleClick('sun')}
                        />
                    </div>
                </header>
            </div>
        );
    }
}
