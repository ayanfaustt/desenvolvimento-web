import React from "react";
import "./styles.css";
import TextWithInputField from "../../components/textWithInputField";


// interface ConfigPageProps {

// }

export default function ConfigPage(/*props: ConfigPageProps*/) {
  return (
    <div className='config-box-inside'>
      <div className="photo-fields">
        <img src="user-profile.png" alt="user photo" width={200} />
        <div className='textFields-inputFields'>
          <TextWithInputField textName='Username' inputPlaceHolder='' inputType='text' />
          <TextWithInputField textName='Language' inputPlaceHolder='English' inputType='text' />
        </div>
      </div>

      <p className="p">Change password</p>
      <div className='changePassword'>
        <div className="changePassword-fields">
          <TextWithInputField textName='Currently Password' inputPlaceHolder='' inputType='password' />
          <div className='new-confirm'>
            <TextWithInputField textName='New Password' inputPlaceHolder='' inputType='password' />
            <TextWithInputField textName='Confirm Password' inputPlaceHolder='' inputType='password' />
          </div>
        </div>
      </div>

      <button className='save-btn'>Save Settings</button>

    </div>
  );
}