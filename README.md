# 📌 Aplicativo de Consulta de CEP

> Aplicação em React com TypeScript e TailwindCSS para buscar e armazenar  localmente endereços via API do ViaCEP.

---

## 📸

![image](https://raw.githubusercontent.com/Jh0wjso/buscador-cep/refs/heads/main/public/print.png)

---

## ✨ Funcionalidades
- 🔍 Busca de CEP via API do [ViaCEP](https://viacep.com.br/)
- 📌 Armazena endereços localmente no `localStorage`
- 📜 Lista e exibe endereços salvos
- 🗑️ Modal para exclusão de endereços
- 📄 Modal para exibição de detalhes do endereço
- 🎨 UI responsiva e estilizada com TailwindCSS

---

## 🚀 Tecnologias Utilizadas
- **React** + **TypeScript**
- **TailwindCSS** para estilização
- **React Icons** para ícones
- **React Modal** para modais

---

## 📦 Instalação e Uso

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/buscador-cep.git
   cd buscador-cep
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Acesse no navegador:
   ```
   http://localhost:5173
   ```

---

## 🛠 Estrutura do Projeto

```
📂 src
 ├── 📂 components        # Componentes reutilizáveis
 │    ├── AddressCard.tsx
 │    ├── AddressList.tsx
 │    ├── AddressItem.tsx
 │    ├── InputCEP.tsx
 │    ├── ModalView.tsx
 │    ├── ModalDelete.tsx
 ├── 📂 context           # Context API para gerenciar endereços
 │    ├── AddressContext.tsx
 ├── 📂 hooks             # Hooks personalizados
 │    ├── useLocalStorage.ts
 ├── 📂 api               # Serviços de API
 │    ├── cepService.ts
 ├── App.tsx             # Componente principal
 ├── main.tsx            # Ponto de entrada da aplicação
 ├── index.css           # Estilos globais
 ├── tailwind.config.ts  # Configuração do TailwindCSS
```

---

## 📞 Contato
Caso tenha alguma dúvida ou sugestão, entre em contato:
- 🔗 [LinkedIn](https://www.linkedin.com/in/jhonatansilverio/)
- 📧 Email: jhonatansilverio1258@gmail.com

