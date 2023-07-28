import React, { useState, ChangeEvent, useEffect } from 'react';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faFilter } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, Modal, Button, Row, Col, FormLabel, Alert, Form } from 'react-bootstrap';
import { CreateSummaries } from '../../hooks/useSummaries';

interface PageNameAndButtonsProps {
    name: string;
}

export default function PageNameAndButtons(props: PageNameAndButtonsProps) {
    const [summariesVisible, setSummariesVisible] = useState(false);
    const [cardsVisible, setCardsVisible] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [resumeData, setResumeData] = useState({ summarie_title: "", summarie_tag: "", summarie_content: "" });

    const handleVisible = (cards: boolean, summaries: boolean) => {
        if (cards) {
            setCardsVisible(true);
        };
        if (summaries) {
            setSummariesVisible(true);
        };
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setResumeData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            await CreateSummaries(1, resumeData).then(() => {
                setShowAlert(true);
                setResumeData({ summarie_title: "", summarie_tag: "", summarie_content: "" });
                setTimeout(() => {
                    setShowAlert(false);
                }, 2000);
            });
        } catch (error) {
            console.error('Erro:', error)
        }
    };

    return (
        <div className='deckName'>
            <Modal show={summariesVisible} onHide={() => setSummariesVisible(false)} size='lg' centered>
                <Modal.Header style={{ backgroundColor: '#DAE9F1', height: '50px' }} closeButton />
                <Modal.Body style={{ backgroundColor: '#DAE9F1', paddingTop: '10px', paddingBottom: '30px', paddingRight: '150px', paddingLeft: '150px' }}>
                    <Row className='mb-2'>
                        <Col>
                            <h1 className="text-center">Create summarie</h1>
                        </Col>
                    </Row>
                    <Row className="justify-content-center align-items-center">
                        <Row>
                            <Col >
                                <FormLabel>Resume name</FormLabel>
                                <Form.Control name='summarie_title' type="text" value={resumeData.summarie_title} onChange={handleInputChange} className='inputField'></Form.Control>
                            </Col>
                        </Row>
                        <Row>
                            <Col >
                                <FormLabel>Tags</FormLabel>
                                <Form.Control name='summarie_tag' type="text" value={resumeData.summarie_tag} onChange={handleInputChange} className='inputField'></Form.Control>
                            </Col>
                        </Row>
                        <Row className='mb-4'>
                            <Col >
                                <FormLabel>Resume</FormLabel>
                                <Form.Control as="textarea" rows={4} name='summarie_content' type="text" value={resumeData.summarie_content} onChange={handleInputChange} className='inputField resume-text' ></Form.Control>
                            </Col>
                        </Row>
                        <Row >
                            <Col className="text-center" >
                                <Button onClick={handleSubmit}>
                                    Criar
                                </Button>
                                {showAlert && (
                                    <Alert variant="success" className="mt-3" onClose={() => setShowAlert(false)} dismissible>
                                        Created successfully!
                                    </Alert>
                                )}
                            </Col>
                        </Row>
                    </Row>
                </Modal.Body>
            </Modal>
            <Modal show={cardsVisible} onHide={() => setCardsVisible(false)}>
                card
            </Modal>
            <h1>{props.name}</h1>
            <div className="icons2">
                <button onClick={() => handleVisible(false, true)} hidden={false} className='add-button'>
                    <FontAwesomeIcon icon={faCirclePlus} />
                </button>
                <button className='filter-button' >
                    <FontAwesomeIcon icon={faFilter} />
                </button>
                <Dropdown hidden={true}>
                    <Dropdown.Toggle as={Button} variant="primary" id="dropdown-basic">
                        <FontAwesomeIcon icon={faCirclePlus} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#action1">Adicionar deck</Dropdown.Item>
                        <Dropdown.Item href="#action2">Adicionar card</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    )
}