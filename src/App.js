import React, {Component} from 'react';
import './App.css';

class App extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        accept: false,
        message: '',

        errors: {
            username: false,
            email: false,
            password: false,
            accept: false,
        }
    }

    messages = {
        username_incorrect: 'Min 10 letters',
        email_incorrect: '@ needed',
        password_incorrect: 'Min 8 letters',
        accept_incorrect: 'Accept'
    }

    handleChange = (event) => {

        const name = event.target.name;
        const type = event.target.type;

        if (type === 'text' || type === 'password' || type === 'email') {
            const value = event.target.value;
            // const checked = event.target.checked;
            this.setState({
                [name]: value,
            })
        } else if (type === 'checkbox') {
            const checked = event.target.checked;
            this.setState({
                [name]: checked,
            })
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()

        const validation = this.formValidation()

        if (validation.correct) {
            this.setState({
                username: '',
                email: '',
                password: '',
                accept: false,
                message: 'Form are send',

                errors: {
                    username: false,
                    email: false,
                    password: false,
                    accept: false,
                }
            })
        } else {
            this.setState({
                ...this.state,
                errors: {
                    username: !validation.username,
                    email: !validation.email,
                    password: !validation.password,
                    accept: !validation.accept,
                }
            })
        }
    }

    formValidation = () => {
        let username = false;
        let email = false;
        let password = false;
        let accept = false;
        let correct = false;

        if (this.state.username.length > 10 && this.state.username.indexOf(' ') === -1) {
            username = true;
        }
        if (this.state.email.indexOf('@') !== -1) {
            email = true;
        }
        if (this.state.password.length >= 8) {
            password = true;
        }
        if (this.state.accept) {
            accept = true;
        }
        if (username && email && password && accept) {
            correct = true;
        }

        return({
            username,
            email,
            password,
            accept,
            correct,
        })
    }

    componentDidUpdate() {
        if (this.state.message !== '') {
            setTimeout(() =>
                this.setState({
                    message: ''
                }), 3000)
        }
    }

    render() {
        return (
            <div className="App">
                <form onSubmit={this.handleSubmit} noValidate>
                    <label htmlFor="user">Name:
                        <input type="text"
                               id="user"
                               name="username"
                               value={this.state.username}
                               onChange={this.handleChange}/>
                        {this.state.errors.username && <span>
                                   {this.messages.username_incorrect}</span>}
                    </label>
                    <label htmlFor="email">E-mail:
                        <input type="email"
                               id="email"
                               name="email"
                               value={this.state.email}
                               onChange={this.handleChange}/>
                        {this.state.errors.email && <span>
                                   {this.messages.email_incorrect}</span>}
                    </label>
                    <label htmlFor="password">Password:
                        <input type="password"
                               id="password"
                               name="password"
                               value={this.state.password}
                               onChange={this.handleChange}/>
                        {this.state.errors.password && <span>
                                   {this.messages.password_incorrect}</span>}
                    </label>
                    <label htmlFor="accept">
                        <input type="checkbox"
                               id="accept"
                               name="accept"
                               checked={this.state.accept}
                               onChange={this.handleChange}/> Agree!
                    </label>
                    {this.state.errors.accept && <span>
                        {this.messages.accept_incorrect}</span>}
                    <button>Sign up</button>
                </form>
                {this.state.message && <h3>{this.state.message}</h3>}
            </div>
        )
    }


}

export default App;
