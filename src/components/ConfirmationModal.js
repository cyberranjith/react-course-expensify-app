import React from 'react';
import Modal from 'react-modal';

const ConfirmationModal = (props) => (
    <Modal
        isOpen={props.showModal}
        onRequestClose={props.closeConfirmation}
        contentLabel={props.confirmationText}
        closeTimeoutMS={200}
        ariaHideApp={false}
        className="modal"
    >
        <h3 className="modal__title">{props.confirmationText}</h3>
        <button onClick={props.performConfirmedAction} className="modal__button">Yes</button>
        <button onClick={props.closeConfirmation} className="modal__button">No</button>
    </Modal>
);

export default ConfirmationModal;