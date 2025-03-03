export async function getAddressByCEP(cep: string) {
  if (!/^\d{8}$/.test(cep)) {
    throw new Error("CEP inválido! Insira apenas 8 dígitos numéricos.");
  }

  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const data = await response.json();

  if (data.erro) {
    throw new Error("CEP não encontrado!");
  }

  return data;
}
