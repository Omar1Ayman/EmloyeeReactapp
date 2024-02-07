import "./modal.css";

const Modal = ({ children, setShowModal, title = "title modal" }) => {
  return (
    <div className="modal">
      <div className="wrapper">
        <div className="header">
          <div className="title">{title}</div>
          <div onClick={() => setShowModal(false)} className="close">
            X
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
