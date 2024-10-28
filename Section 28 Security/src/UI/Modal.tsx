import "./Modal.css";

type ModalProps = {
	children: React.ReactNode;
};

const Modal = ({ children }: ModalProps) => {
	return (
		<>
			<div className="backdrop" />
			<div className="modal">{children}</div>
		</>
	);
};

export default Modal;
