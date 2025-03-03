import React, { createContext, useReducer, useContext, ReactNode, useEffect } from "react";

interface Address {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

type AddressAction =
  | { type: "ADD_ADDRESS"; payload: Address }
  | { type: "REMOVE_ADDRESS"; payload: string }
  | { type: "SET_ADDRESSES"; payload: Address[] };

interface AddressState {
  addresses: Address[];
}

const initialState: AddressState = {
  addresses: [],
};

const AddressContext = createContext<{
  state: AddressState;
  dispatch: React.Dispatch<AddressAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const addressReducer = (state: AddressState, action: AddressAction): AddressState => {
  switch (action.type) {
    case "ADD_ADDRESS":
      return { ...state, addresses: [...state.addresses, action.payload] };
    case "REMOVE_ADDRESS":
      return { ...state, addresses: state.addresses.filter((addr) => addr.cep !== action.payload) };
    case "SET_ADDRESSES":
      return { ...state, addresses: action.payload };
    default:
      return state;
  }
};

export const AddressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(addressReducer, initialState);

  useEffect(() => {
    const storedAddresses = localStorage.getItem("addresses");
    if (storedAddresses) {
      dispatch({ type: "SET_ADDRESSES", payload: JSON.parse(storedAddresses) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("addresses", JSON.stringify(state.addresses));
  }, [state.addresses]);

  return (
    <AddressContext.Provider value={{ state, dispatch }}>
      {children}
    </AddressContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAddressContext = () => useContext(AddressContext);
