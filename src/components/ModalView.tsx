import Modal from "react-modal";
import { Address } from "../App";

interface ModalViewProps {
  isOpen: boolean;
  onRequestClose: () => void;
  address: Address | null;
}

const ModalView: React.FC<ModalViewProps> = ({ isOpen, onRequestClose, address }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Detalhes"
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
          maxWidth: "90vw",
          width: "100%",
          maxHeight: "60vh",
          height: "100%",
        },
      }}
    >
      {address && (
        <div
          style={{
            textAlign: "center",
            color: "#000",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="modalContent" style={{ marginBottom: "8%" }}>
            <h1 className="mb-4">Detalhes</h1>
            <p>
              <strong>CEP:</strong> {address.cep}
            </p>
            <p>
              <strong>Logradouro:</strong> {address.logradouro}
            </p>
            <p>
              <strong>Bairro:</strong> {address.bairro}
            </p>
            <p>
              <strong>Cidade:</strong> {address.localidade} - {address.uf}
            </p>
          </div>
          <button className="" onClick={onRequestClose}>
            Fechar
          </button>
        </div>
      )}
    </Modal>
  );
};

export default ModalView;
