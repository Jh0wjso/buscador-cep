import { useState, useEffect } from "react";
import Modal from "react-modal";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegSave } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaLocationCrosshairs } from "react-icons/fa6";
import "./App.css";

Modal.setAppElement("#root");

interface Address {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

function App() {
  const [cep, setCep] = useState<string>("");
  const [address, setAddress] = useState<Address | null>(null);
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<Address | null>(null);

  useEffect(() => {
    const storedAddresses = localStorage.getItem("addresses");
    if (storedAddresses) {
      setSavedAddresses(JSON.parse(storedAddresses));
    }
  }, []);

  const getAddressByCEP = async (cep: string) => {
    if (!/^\d{8}$/.test(cep)) {
      alert("Por favor, insira um CEP válido (somente números, 8 dígitos).");
      return;
    }

    const cachedAddress = savedAddresses.find((addr) => addr.cep === cep);
    if (cachedAddress) {
      setAddress(cachedAddress);
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        alert("CEP não encontrado!");
        return;
      }

      setAddress(data);
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      alert("Erro ao buscar o CEP. Tente novamente.");
    }
  };

  const saveAddress = () => {
    if (!address) return;

    const updatedAddresses = [...savedAddresses, address];
    setSavedAddresses(updatedAddresses);
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));

    alert("Endereço salvo com sucesso!");
  };

  const openModal = (address: Address) => {
    setSelectedAddress(address);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openDeleteModal = (address: Address) => {
    setAddressToDelete(address);
    setDeleteModalIsOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalIsOpen(false);
  };

  const deleteAddress = () => {
    if (!addressToDelete) return;

    const updatedAddresses = savedAddresses.filter(
      (addr) => addr.cep !== addressToDelete.cep
    );
    setSavedAddresses(updatedAddresses);
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
    closeDeleteModal();
  };

  return (
    <div className="App">
      <aside className="sidebar">
        <h1 className="mb-10 flex items-center justify-center gap-2 underline">
          <FaLocationDot color="#fff" size={50} /> Endereços
        </h1>
        <ul className="address-list">
          {savedAddresses.length === 0 ? (
            <p className="empty-message">Nenhum endereço salvo ainda</p>
          ) : (
            savedAddresses.map((addr, index) => (
              <li key={index}>
                <button className="cep-button" onClick={() => openModal(addr)}>
                  <p className="flex items-center gap-4">
                    <FaLocationCrosshairs /> {addr.cep}
                  </p>
                  <button
                    className="delete-button"
                    onClick={() => openDeleteModal(addr)}
                  >
                    <FaRegTrashAlt size={20} />
                  </button>
                </button>
              </li>
            ))
          )}
        </ul>
      </aside>

      <section className="content">
        <div className="input-container">
          <input
            type="text"
            placeholder="Digite seu CEP"
            className="inputCEP"
            maxLength={8}
            value={cep}
            onChange={(e) => setCep(e.target.value.replace(/\D/g, ""))}
          />
          <button
            onClick={() => getAddressByCEP(cep)}
            className="search-button"
          >
            <FaSearch color="#fff" size={20} />
          </button>
        </div>

        {address && (
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
            <button className="flex gap-2" onClick={saveAddress}>
              Salvar <FaRegSave color="#fff" size={20} />
            </button>
          </div>
        )}

        <section className="mobileAddress">
          <ul className="address-list">
            {savedAddresses.length === 0 ? (
              <p className="empty-message">Nenhum endereço salvo ainda</p>
            ) : (
              savedAddresses.map((addr, index) => (
                <li key={index}>
                  <button
                    className="cep-button"
                    onClick={() => openModal(addr)}
                  >
                    <p className="flex items-center gap-4">
                      <FaLocationCrosshairs /> {addr.cep}
                    </p>
                    <button
                      className="delete-button"
                      onClick={() => openDeleteModal(addr)}
                    >
                      <FaRegTrashAlt size={20} />
                    </button>
                  </button>
                </li>
              ))
            )}
          </ul>
        </section>
      </section>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
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
            maxWidth: "60vw",
            width: "100%",
            maxHeight: "50vh",
            height: "100%",
          },
        }}
      >
        {selectedAddress && (
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
                <strong>CEP:</strong> {selectedAddress.cep}
              </p>
              <p>
                <strong>Logradouro:</strong> {selectedAddress.logradouro}
              </p>
              <p>
                <strong>Bairro:</strong> {selectedAddress.bairro}
              </p>
              <p>
                <strong>Cidade:</strong> {selectedAddress.localidade} -{" "}
                {selectedAddress.uf}
              </p>
            </div>
            <button className="modal-close" onClick={closeModal}>
              Fechar
            </button>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={deleteModalIsOpen}
        onRequestClose={closeDeleteModal}
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
            Você realmente deseja excluir o endereço {addressToDelete?.cep}?
          </p>
          <button className="" onClick={closeDeleteModal}>
            Cancelar
          </button>
          <button className="modal-delete" onClick={deleteAddress}>
            Excluir
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default App;
