import React, { ChangeEvent, useState } from 'react';
import './styles.css';
import TextField from '../textField';
import { Form, FormControl, InputGroup } from 'react-bootstrap';

interface TextInputProps {
    labelName: string,
    name: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


export default function TextInput(props: TextInputProps) {

    const { name, labelName, onChange } = props;
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
                <Form.Control name={name}  type="text" className='inputField' onChange={handleInputChange} isInvalid={isValid} />
                {!isValid ? null : (
                    <Form.Control.Feedback type="invalid">
                        Campo obrigatório
                    </Form.Control.Feedback>
                )}

            </Form.Group>
        </Form>
    );
}