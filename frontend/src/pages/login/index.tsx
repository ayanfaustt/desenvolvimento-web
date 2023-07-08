import React, { useState } from 'react';
import TextInput from '../../components/textInput';
import './styles.css';
import TextField from '../../components/textField';

interface LoginPageProps {

}

type eventType = {
    target: {
        checked: boolean;
    }

};

export default function LoginPage(props: LoginPageProps) {
    const [check, setCheck] = useState(false);

    const handleCheck = (e: eventType) => {
        setCheck(e.target.checked);
    };

    return (
        <main className='main-container'>

            <div className="container-inside-left-login">
                <img src="study.png" alt="study icon" width={270} />
            </div>

            <div className="container-inside-right-login">
                <form className='user-info'>
                    <TextInput name='Email:' />
                    <TextInput name='Password:' />
                </form>
                <div className='box-remember'>
                    <input
                        className='checkbox'
                        type="checkbox"
                        checked={check}
                        onChange={handleCheck}
                    />
                    <TextField name='Remember me' />
                </div>
                <div className='forgot-register'>
                    <p>Forgot your password</p>
                    <p>New? Register</p>
                </div>
                <div className="login">
                    <button className='login-btn'>Login</button>
                </div>
            </div>

        </main>
    );
}