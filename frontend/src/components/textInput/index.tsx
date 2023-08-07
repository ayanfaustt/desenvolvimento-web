import React, { ChangeEvent, useState } from "react";
import "./styles.css";
import TextField from "../textField";
import { Form } from "react-bootstrap";

interface TextInputProps {
    labelName: string,
    name: string,
    needValid: boolean,
	type: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


export default function TextInput(props: TextInputProps) {

  const { name, labelName, needValid, type, onChange } = props;
  const [isValid, setIsValid] = useState(false);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onChange(e);
    setIsValid(!value);
  };

  return (
    <Form>
      <TextField name={labelName}></TextField>
      <Form.Group >
        <Form.Control name={name}  type={type} className='inputField' onChange={handleInputChange} isInvalid={needValid ? isValid : false} />
        {!isValid ? null : (
          <Form.Control.Feedback type="invalid">
                        Campo obrigatório
          </Form.Control.Feedback>
        )}
      </Form.Group>
    </Form>
  );
}