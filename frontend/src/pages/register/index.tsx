import React, { ChangeEvent, useState, useEffect } from "react";
import TextInput from "../../components/textInput";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { Button, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { CreateUser } from "../../hooks/useUser";
import * as Yup from "yup";
import { Form } from "react-bootstrap";

interface FormValues {
    username: string;
    email: string;
    password: string;
    repeatpassword: string;
}

// interface RegisterPageProps {

// }

export default function RegisterPage(/*props: RegisterPageProps*/) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<FormValues>({ username: "", email: "", password: "", repeatpassword: "" });
  const [errors, setErrors] = useState<FormValues>({ username: "", email: "", password: "", repeatpassword: "" });


  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name.toLowerCase()]: value
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name.toLowerCase()]: "",
    }));
  };

  const handleSubmit = async () => {
    const { email, password } = userData;
    const data = {
      email,
      password
    };

    try {
      const validationSchema = Yup.object().shape({
        username: Yup.string().required("Campo obrigatório"),
        email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
        password: Yup.string().required("Campo obrigatório").min(6, "A senha deve ter no mínimo 6 caracteres"),
        repeatpassword: Yup.string()
          .oneOf([Yup.ref("password"), ""], "As senhas não coincidem")
          .required("Campo obrigatório"),
      });

      await validationSchema.validate(userData, { abortEarly: false });
      setIsLoading(true);
      await CreateUser(userData.username, data);
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const newErrors: FormValues = {
          username: "",
          email: "",
          password: "",
          repeatpassword: "",
        };

        error.inner.forEach((err) => {
          newErrors[err.path as keyof FormValues] = err.message;
        });

        setErrors(newErrors);
      } else {
        console.error("Erro:", error);
      }
    }
  };
  useEffect(() => { console.log(userData); }, [userData]);

  return (
    <main className='main-container'>

      <div className="container-inside-left-register">
        <img src="study.png" alt="study icon" width={350} />
      </div>

      <div className="container-inside-right-register">

        <Form className='user-info'>
          <TextInput name="username" type="text" labelName='Username' onChange={handleInput} needValid={true} />
          {errors.username && <div className='error-message'>{errors.username}</div>}
          <TextInput name="email" type="text" labelName='Email' onChange={handleInput} needValid={true} />
          {errors.email && <div className='error-message'>{errors.email}</div>}
          <TextInput name="password" type="password" labelName='Password' onChange={handleInput} needValid={true} />
          {errors.password && <div className='error-message'>{errors.password}</div>}
          <TextInput name="repeatpassword" type="password" labelName='Repeat Password' onChange={handleInput} needValid={true} />
          {errors.repeatpassword && <div className='error-message'>{errors.repeatpassword}</div>}
        </Form>


        <div className="register">
          {isLoading ? (
            <Button className='register-btn' disabled>
              <Spinner animation='border' size='sm' />
                            Loading...
            </Button>
          ) : (
            <Button className='register-btn' onClick={handleSubmit}>
                            Sign up
            </Button>
          )}

        </div>

        <Link to="/" className='login-page'>
          <p className='p'>Already have an account? <b>Sign in</b></p>
        </Link>
      </div>
    </main>
  );
}