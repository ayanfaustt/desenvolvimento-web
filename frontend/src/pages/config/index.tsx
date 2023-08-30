import React, { useState, ChangeEvent, useEffect } from "react";
import "./styles.css";
import Label from "../../components/label";
import { useUser } from "../../hooks/useContextUserId";
import { Form } from "react-bootstrap";
import { UserInfo } from "../../hooks/useUser";


// interface ConfigPageProps {

// }

export default function ConfigPage(/*props: ConfigPageProps*/) {
	const { username, token } = useUser();
	const [user, setUser] = useState(username ? username : "");
	const [email, setEmail] = useState("");
	// const [language, setLanguage] = useState("English");
	const [curPassword, setCurPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");


	useEffect(() => {
		const fetchUser = async () => {
			if (username && token) await UserInfo(username, token).then((res) => setEmail(res.data.email))
		}
		fetchUser();
	}, []);

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value, name } = event.target;
		if (name === "user") {
			setUser(value);
		} else if (name === "email") {
			setEmail(value);
		} else if (name === "newPassword") {
			setEmail(value);
		} else if (name === "curPassword") {
			setCurPassword(value);
		} else if (name === "newPassword") {
			setNewPassword(value);
		} else if (name === "confirmPassword") {
			setConfirmPassword(value);
		};
	};

	const handleSubmit = () => {
		console.log(user, curPassword, newPassword, confirmPassword)
	};

	return (
		<div className='config-box-inside'>
			<div className="photo-fields">
				<img src="user-profile.png" alt="user photo" width={200} />
				<div className='textFields-inputFields'>
					<div>
						<Label textName='Username' />
						<Form.Control name='user' type="text" value={user} onChange={handleInputChange} className='inputField'></Form.Control>
					</div>
					<div>
						<Label textName='Email' />
						<Form.Control name='email' type="text" value={email} onChange={handleInputChange} className='inputField'></Form.Control>
					</div>
				</div>
				{/* <div>
					<Label textName='Language' />
					<Form.Control name='language' type="text" value={language} onChange={handleInputChange} className='inputField'></Form.Control>
				</div> */}
			</div>

			<p className="p">Change password</p>
			<div className='changePassword'>
				<div className="changePassword-fields">
					<div>
						<Label textName='Currently Password' />
						<Form.Control name='curPassword' type="password" value={curPassword} onChange={handleInputChange} className='inputField'></Form.Control>
					</div>
					<div className='new-confirm'>
						<div>
							<Label textName='New Password' />
							<Form.Control name='newPassword' type="password" value={newPassword} onChange={handleInputChange} className='inputField'></Form.Control>
						</div>
						<div>
							<Label textName='Confirm Password' />
							<Form.Control name='confirmPassword' type="password" value={confirmPassword} onChange={handleInputChange} className='inputField'></Form.Control>
						</div>
					</div>
				</div>
			</div>

			<button className='save-btn' onClick={handleSubmit}>Save Settings</button>

		</div>
	);
}