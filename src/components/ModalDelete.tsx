import Modal from "react-modal";
import { Address } from "../App";

interface ModalDeleteProps {
  isOpen: boolean;
  onRequestClose: () => void;
  address: Address | null;
  onDelete: () => void;
}

const ModalDelete: React.FC<ModalDeleteProps> = ({ isOpen, onRequestClose, address, onDelete }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirmar Exclusão"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#fff",
          borderRadius: "8px",
          padding: "20px",
          maxWidth: "400px",
          width: "100%",
        },
      }}
    >
      <div style={{ textAlign: "center", color: "#000" }}>
        <h2 className="modal-title">Tem certeza?</h2>
        <p>
          Você realmente deseja excluir o endereço {address?.cep}?
        </p>
        <button className="" onClick={onRequestClose}>
          Cancelar
        </button>
        <button className="modal-delete" onClick={onDelete}>
          Excluir
        </button>
      </div>
    </Modal>
  );
};

export default ModalDelete;
