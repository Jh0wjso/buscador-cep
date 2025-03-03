import { FaRegTrashAlt } from "react-icons/fa";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { Address } from "../App";

interface AddressItemProps {
  address: Address;
  onSelect: (address: Address) => void;
  onDelete: (address: Address) => void;
}

const AddressItem: React.FC<AddressItemProps> = ({ address, onSelect, onDelete }) => {
  return (
    <li>
      <button className="cep-button" onClick={() => onSelect(address)}>
        <p className="flex items-center gap-4">
          <FaLocationCrosshairs /> {address.cep}
        </p>
        <button className="delete-button" onClick={() => onDelete(address)}>
          <FaRegTrashAlt size={20} />
        </button>
      </button>
    </li>
  );
};

export default AddressItem;
