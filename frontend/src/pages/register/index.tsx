import React, { useState } from 'react';
import TextInput from '../../components/textInput';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


interface RegisterPageProps {

}

export default function RegisterPage(props: RegisterPageProps) {
    return (
        <main className='main-container'>

            <div className="container-inside-left-register">
                <img src="study.png" alt="study icon" width={350} />
            </div>

            <div className="container-inside-right-register">

                <form className='user-info'>
                    <TextInput name='Username:' />
                    <TextInput name='Email:' />
                    <TextInput name='Password:' />
                    <TextInput name='Repeat Password:' />
                </form>

                <div className='login-page'>
                    <p className='p'>Already have an account? Sign in</p>
                </div>

                <Link to="/" className="register">
                    <Button className='register-btn'>Sign up </Button>
                </Link>

            </div>

        </main>
    );
}