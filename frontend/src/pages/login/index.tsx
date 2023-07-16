import React, { useState, useRef, useEffect } from 'react';
import TextInput from '../../components/textInput';
import './styles.css';
import TextField from '../../components/textField';
import { motion } from 'framer-motion'
import { Button } from 'react-bootstrap';
import dashboard from './dashboard-slide.png'
import flashcard from './flashcard-slide.png'
import summaries from './summaries-slide.png'
import studyMaterial from './study-slide.png'
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

    const carousel = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? sliderImgs.length - 1 : prevIndex - 1));
    };

    const handleNextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === sliderImgs.length - 1 ? 0 : prevIndex + 1));
    };

    useEffect(() => {
        const currentWidth = carousel.current ? carousel.current.scrollWidth : 0;
        const currenOffset = carousel.current ? carousel.current.offsetWidth : 0;
        console.log(currentWidth - currenOffset)
        console.log(currenOffset)
        console.log(currentWidth)
        setWidth(currentWidth - currenOffset);
    }, []);

    return (
        <main className='main-container'>
            <div className='slider-width'>
                    <motion.div className='slider'>
                        {sliderImgs.map((image, index) => (
                            <motion.div className='images' hidden={index === currentIndex ? false : true}>
                                <img src={image} alt="slide page" />
                            </motion.div>
                        ))}

                </motion.div>
            </div>
                <button onClick={handlePrevSlide}>p ca</button>
                <button onClick={handleNextSlide}>p la</button>

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