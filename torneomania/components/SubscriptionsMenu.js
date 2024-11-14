import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";

const SubscriptionsMenu = ({ show }) => {
    const [showModal, setShowModal] = useState(show);
  
    useEffect(() => {
      setShowModal(show);
    }, [show]);
  
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
  
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Estás usando <b>TorneoMania</b> free</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

export default SubscriptionsMenu;