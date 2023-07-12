import React, { useState } from 'react';
import TextInput from '../../components/textInput';
import './styles.css';
import TextField from '../../components/textField';
import { motion } from 'framer-motion'
import { Button } from 'react-bootstrap';
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

            <motion.div className="container-inside-left-login">
                <motion.div className='slider'>
                    <img src="dashboard-slide.png" alt="study icon" width={270} className='itemslider' />
                    <img src="flashcard-slide.png" alt="study icon" width={270} className='itemslider' />
                    <img src="summaries-slide.png" alt="study icon" width={270} className='itemslider' />
                    <img src="study-slide.png" alt="study icon" width={270} className='itemslider' />
                </motion.div>
            </motion.div>

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
                    <p className='p'>Forgot your password</p>
                    <p className='p'>New? Register</p>
                </div>
                <div className="login">
                    <Button className='login-btn'>Login</Button>
                </div>

            </div>

        </main>
    );
}