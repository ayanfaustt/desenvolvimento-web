import React, { useState, ChangeEvent } from "react";
import TextInput from "../../components/textInput";
import "./styles.css";
import TextField from "../../components/textField";
import { Button, Spinner } from "react-bootstrap";
import dashboard from "../../images/dashboard-slide.png";
import flashcard from "../../images/flashcard-slide.png";
import summaries from "../../images/summaries-slide.png";
import studyMaterial from "../../images/study-slide.png";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../hooks/useUser";
import { useUser } from "../../hooks/useContextUserId";

type eventType = {
	target: {
		checked: boolean;
	}
};

const sliderImgs = [dashboard, flashcard, summaries, studyMaterial];

export default function LoginPage() {
	const navigate = useNavigate();
	const [check, setCheck] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [userData, setUserData] = useState({ username: "", password: "" });
	const [userNotFoundError, setUserNotFoundError] = useState(false);
	const [currentImage, setCurrentImage] = useState(0);
	const { setUserId, setToken, setUsername } = useUser();

	const handleCheck = (e: eventType) => {
		setCheck(e.target.checked);
	};

	const handleImage = (circleNumber: number) => {
		setCurrentImage(circleNumber);
		return undefined;
	};

	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUserNotFoundError(false);
		setUserData((prevData) => ({
			...prevData,
			[name.toLowerCase()]: value
		}));
	};

	const handleSubmit = async () => {
		const { username, password } = userData;
		const data = {
			username,
			password
		};
		try {
			setIsLoading(true);
			await LoginUser(data).then((response) => {
				console.log(response)
				setUserId(response.data.userId);
				setToken(response.data.token);
				setUsername(response.data.username);
			});
			setIsLoading(false);
			
			navigate("/dashboard");
		} catch (error) {
			setIsLoading(false);
			setUserNotFoundError(true);
			console.error("Erro:", error);
		};
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
					<button className={`circle ${currentImage === 0 ? "active" : ""}`} onClick={() => handleImage(0)}></button>
					<button className={`circle ${currentImage === 1 ? "active" : ""}`} onClick={() => handleImage(1)}></button>
					<button className={`circle ${currentImage === 2 ? "active" : ""}`} onClick={() => handleImage(2)}></button>
					<button className={`circle ${currentImage === 3 ? "active" : ""}`} onClick={() => handleImage(3)}></button>
				</div>
			</div>

			<div className="container-inside-right-login">

				<form className='user-info'>
					{userNotFoundError && (
						<div className='error-box'>
							<div className='error-message'>Usuário não encontrado.</div>
						</div>
					)}
					<TextInput name='username' labelName='Username' type="text" onChange={handleInput} needValid={false} />
					<TextInput name='password' labelName='Password' type="password" onChange={handleInput} needValid={false} />
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
					<p className='plink'>Forgot your password</p>
					<Link to="/register" className='plink'>New? Register</Link>
				</div>

				<div className="login">
					{isLoading ? (
						<Button className='register-btn' disabled>
							<Spinner animation='border' size='sm' />
							Loading...
						</Button>
					) : (
						<Button className='login-btn' onClick={handleSubmit}>Login</Button>
					)}
				</div>

			</div>

		</main>
	);
}