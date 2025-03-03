import { FaRegSave } from "react-icons/fa";
import { Address } from "../App";

interface AddressCardProps {
  address: Address;
  onSave: () => void;
}

const AddressCard: React.FC<AddressCardProps> = ({ address, onSave }) => {
  return (
    <div className="address-card">
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
      <button className="flex gap-2" onClick={onSave}>
        Salvar <FaRegSave color="#fff" size={20} />
      </button>
    </div>
  );
};

export default AddressCard;
