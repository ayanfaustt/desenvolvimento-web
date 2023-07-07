import React, { useState } from 'react';
import TextInput from '../../components/textInput';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Button } from 'react-bootstrap';


interface RegisterPageProps {

}

export default function RegisterPage(props: RegisterPageProps) {
    return (
        <main className='content'>

            <div className="content-left">
                <img src="study.png" alt="study icon" width={270} />
            </div>

            <div className="content-right">
                <form className='user-info'>
                    <TextInput name='Username:' />
                    <TextInput name='Email:' />
                    <TextInput name='Password:' />
                    <TextInput name='Repeat Password:' />
                </form>
                <div className='login-page'>
                    <p>Already have an account? Sign in</p>
                </div>
                <div className="register">
                    <Button className='register-btn'>Sign up </Button>
                </div>
            </div>

        </main>
    );
}