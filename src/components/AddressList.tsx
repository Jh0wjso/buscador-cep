import { Address } from "../App";
import AddressItem from "./AddressItem";

interface AddressListProps {
  addresses: Address[];
  onSelect: (address: Address) => void;
  onDelete: (address: Address) => void;
}

const AddressList: React.FC<AddressListProps> = ({ addresses, onSelect, onDelete }) => {
  return (
    <ul className="address-list">
      {addresses.length === 0 ? (
        <p className="empty-message">Nenhum endereço salvo ainda</p>
      ) : (
        addresses.map((addr, index) => (
          <AddressItem key={index} address={addr} onSelect={onSelect} onDelete={onDelete} />
        ))
      )}
    </ul>
  );
};

export default AddressList;
