import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function SimpleModal(props) {
/*
Usage:
    import SimpleModal from '../../components/modals/simpleModal/SimpleModal';

    (...)
    const [modalShow, setModalShow] = useState(false);

    (...)
        <SimpleModal
            show={modalShow}
            title="### Message"
            body="### Message body"
            buttons={[
                {
                    id: "NO",
                    text: "### NO",
                    variant: "secondary",
                },
                {
                    id: "YES",
                    text: "### YES",
                    variant: "primary",
                }
            ]}
            callback={(buttonId, params) => {alert(`Answer: ${buttonId}`); setModalShow(false);}}
        />

*/

    function handleEvents(buttonId, params) {
        props.callback(buttonId, params)
    }

    function handleClose() {
        alert('setShow(false)');
    }

    return (
        <>
            <Modal show={props.show} onHide={handleEvents}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.body}</Modal.Body>
                <Modal.Footer>
                    {
                        props.buttons.map(btn => (
                            <Button
                                key={`MODALBUTTON-${btn.id}`}
                                variant={btn.variant || "secondary"}
                                onClick={() => handleEvents(btn.id, props.params)}
                            >
                                {btn.text}
                            </Button>
                        ))
                    }
                </Modal.Footer>
            </Modal>
        </>
    );
}
