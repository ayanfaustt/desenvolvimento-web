import React, { ChangeEvent, useState, useEffect } from 'react';
import TextInput from '../../components/textInput';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { CreateUser } from '../../hooks/userRegister';


interface RegisterPageProps {

}

export default function RegisterPage(props: RegisterPageProps) {
    const navigate = useNavigate();

    const [userData, setUserData] = useState({ username: "", email: "", password: "" });

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name.toLowerCase()]: value
        }))
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            email: userData.email,
            password: userData.password
        };
        CreateUser(userData.username, data)
            .then(response => {
                navigate("/dashboard")
                console.log(response.data);
            })
            .catch(error => {
                console.error('Erro:', error);
            });
    }

    return (
        <main className='main-container'>

            <div className="container-inside-left-register">
                <img src="study.png" alt="study icon" width={350} />
            </div>

            <div className="container-inside-right-register">

                <form className='user-info'>
                    <TextInput name='Username' onChange={handleInput} />
                    <TextInput name='Email' onChange={handleInput} />
                    <TextInput name='Password' onChange={handleInput} />
                    <TextInput name='Repeat Password' onChange={handleInput} />
                </form>

                <Link to="/" className='login-page'>
                    <p className='p'>Already have an account? Sign in</p>
                </Link>

                <div className="register">
                    <Button className='register-btn' onClick={handleSubmit} >Sign up </Button>
                </div>

            </div>

        </main>
    );
}