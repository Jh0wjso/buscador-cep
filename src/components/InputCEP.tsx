import { useState } from "react";
import { FaSearch } from "react-icons/fa";

interface InputCEPProps {
  onSearch: (cep: string) => void;
}

const InputCEP: React.FC<InputCEPProps> = ({ onSearch }) => {
  const [cep, setCep] = useState<string>("");

  return (
    <div className="input-container">
      <input
        type="text"
        placeholder="Digite seu CEP"
        className="inputCEP"
        maxLength={8}
        value={cep}
        onChange={(e) => setCep(e.target.value.replace(/\D/g, ""))}
      />
      <button onClick={() => onSearch(cep)} className="search-button">
        <FaSearch color="#fff" size={20} />
      </button>
    </div>
  );
};

export default InputCEP;
