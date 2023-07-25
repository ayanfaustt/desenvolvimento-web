import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import TextInput from '../../components/textInput';
import './styles.css';
import TextField from '../../components/textField';
import { Button } from 'react-bootstrap';
import dashboard from '../../images/dashboard-slide.png'
import flashcard from '../../images/flashcard-slide.png'
import summaries from '../../images/summaries-slide.png'
import studyMaterial from '../../images/study-slide.png'
import { Link } from 'react-router-dom';
interface LoginPageProps {

}

type eventType = {
    target: {
        checked: boolean;
    }
};

const sliderImgs = [dashboard, flashcard, summaries, studyMaterial]

export default function LoginPage(props: LoginPageProps) {
    const [check, setCheck] = useState(false);

    const handleCheck = (e: eventType) => {
        setCheck(e.target.checked);
    };

    const [currentImage, setCurrentImage] = useState(0);


    const handleImage = (circleNumber: number) => {
        setCurrentImage(circleNumber);
        return undefined;
    };

    const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value 
        console.log(input)
    };

    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value 
        console.log(input)
    };

    return (
        <main className='main-container'>
            <div className='slider-width'>
                <div className='slider'>
                    {sliderImgs.map((image, index) => (
                        <div className='images' hidden={index === currentImage ? false : true}>
                            <img src={image} alt="slide page" />
                        </div>
                    ))}
                </div>
                <div className='circles'>
                    <button className={`circle ${currentImage === 0 ? 'active' : ''}`} onClick={() => handleImage(0)}></button>
                    <button className={`circle ${currentImage === 1 ? 'active' : ''}`} onClick={() => handleImage(1)}></button>
                    <button className={`circle ${currentImage === 2 ? 'active' : ''}`} onClick={() => handleImage(2)}></button>
                    <button className={`circle ${currentImage === 3 ? 'active' : ''}`} onClick={() => handleImage(3)}></button>
                </div>
            </div>

            <div className="container-inside-right-login">

                <form className='user-info'>
                    {/* <TextInput name='Email:' /> */}
                    {/* <TextInput name='Password:' /> */}
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
                
                <Link to="/" className="login">
                    <Button className='login-btn'>Login</Button>
                </Link>

            </div>

        </main>
    );
}