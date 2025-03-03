import { useState, useEffect } from "react";
import Modal from "react-modal";
import { FaLocationDot } from "react-icons/fa6";
import InputCEP from "./components/InputCEP";
import AddressCard from "./components/AddressCard";
import AddressList from "./components/AddressList";
import ModalView from "./components/ModalView";
import ModalDelete from "./components/ModalDelete";
import { getAddressByCEP } from "./api/cepService";
import "./App.css";

Modal.setAppElement("#root");

export interface Address {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

function App() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [address, setAddress] = useState<Address | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<Address | null>(null);

  useEffect(() => {
    const storedAddresses = localStorage.getItem("addresses");
    if (storedAddresses) {
      setAddresses(JSON.parse(storedAddresses));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("addresses", JSON.stringify(addresses));
  }, [addresses]);

  const handleSearch = async (cep: string) => {
    try {
      const data = await getAddressByCEP(cep);
      setAddress(data);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred");
      }
    }
  };

  const handleSave = () => {
    if (address) {
      setAddresses((prevAddresses) => [...prevAddresses, address]);
      alert("Endereço salvo com sucesso!");
    }
  };

  const handleSelect = (address: Address) => {
    setSelectedAddress(address);
    setModalIsOpen(true);
  };

  const handleDelete = (address: Address) => {
    setAddressToDelete(address);
    setDeleteModalIsOpen(true);
  };

  const confirmDelete = () => {
    if (addressToDelete) {
      setAddresses((prevAddresses) =>
        prevAddresses.filter((addr) => addr.cep !== addressToDelete.cep)
      );
      setDeleteModalIsOpen(false);
    }
  };

  return (
    <div className="App">
      <aside className="sidebar">
        <h1 className="mb-10 flex items-center justify-center gap-2 underline">
          <FaLocationDot color="#fff" size={50} /> Endereços
        </h1>
        <AddressList
          addresses={addresses}
          onSelect={handleSelect}
          onDelete={handleDelete}
        />
      </aside>

      <section className="content">
        <InputCEP onSearch={handleSearch} />
        {address && <AddressCard address={address} onSave={handleSave} />}
        <section className="mobileAddress">
          <AddressList
            addresses={addresses}
            onSelect={handleSelect}
            onDelete={handleDelete}
          />
        </section>
      </section>

      <ModalView
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        address={selectedAddress}
      />
      <ModalDelete
        isOpen={deleteModalIsOpen}
        onRequestClose={() => setDeleteModalIsOpen(false)}
        address={addressToDelete}
        onDelete={confirmDelete}
      />
    </div>
  );
}

export default App;
