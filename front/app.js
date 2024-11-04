// Chamada da função "createUser" para associação ao evento de envio do formulário
document.getElementById("formulario_registro").addEventListener("submit", createUser);

document.addEventListener("DOMContentLoaded", getAllUsers);

document.addEventListener("DOMContentLoaded", getAllUsersTable);

function createUser(event) {
  // Previne o comportamento padrão do formulário, ou seja, impede que ele seja enviado e recarregue a página
  event.preventDefault();

  // Captura os valores dos campos do formulário
  const name = document.getElementById("name").value;
  const cpf = document.getElementById("cpf").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Requisição HTTP para o endpoint de cadastro de usuário
  fetch("http://10.89.240.3:5000/api/v1/user/", {
    // Realiza uma chamada HTTP para o servidor (a rota definida)
    method: "POST",
    headers: {
      // A requisição será em formato JSON
      "Content-Type": "application/json",
    },
    // Transforma os dados do formulário em uma string JSON para serem enviados no corpo da requisição
    body: JSON.stringify({ name, cpf, password, email }),
  })
    .then((response) => {
      // Tratamento da resposta do servidor / API
      if (response.ok) {
        // Verifica se a resposta foi bem sucedida (status 2xx)
        return response.json();
      }
      // Convertendo o erro em formato JSON
      return response.json().then((err) => {
        // Mensagem retornada ao servidor, acessada pela chave "error"
        throw new Error(err.error);
      });
    }) // Fechamento da then(response)
    .then((data) => {
      // Executa a resposta de sucesso retorna ao usuario final

      // Exibe um alerta para o usuário final (front) com o nome do usuario que acabou de ser cadastrado
      alert("Usuário cadastrado com sucesso! " + data.user.name);
      alert(data.message);

      // Exibe o log no terminal
      console.log("Usuário criado: ", data.user);

      // Reseta os campos do formulário após o sucesso do cadastro
      document.getElementById("formulario_registro").reset();
    })
    .catch((error) => {
      // Captura qualquer erro que ocorra durante o processo de requisição / resposta

      // Exibe alerta(front) com o erro processado
      alert("Erro no cadastro: " + error.message);

      console.error("Erro:", error.message);
    });
}

function getAllUsers() {
  fetch("http://10.89.240.3:5000/api/v1/user/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }else{
      return response.json().then((err) => {
        throw new Error(err.error);
      });
    }
    })
    .then((data) => {
      const userList = document.getElementById("user-list");
      userList.innerHTML = ""; // Limpa a lista existente

      data.users.forEach((user) => {
        const listItem = document.createElement("ul");
        listItem.textContent = `Name: ${user.name}, CPF: ${user.cpf}, Email: ${user.email}`;
        userList.appendChild(listItem);
      });
    })
    .catch((error) => {
      alert("Erro ao obter usuários" + error.message);
      console.error("Erro: ", error.message);
    });
}

function getAllUsersTable() {
  fetch("http://10.89.240.3:5000/api/v1/user/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }else{
      return response.json().then((err) => {
        throw new Error(err.error);
      });
    }
    })
    .then((data) => {
      const userList = document.getElementById("user-list-tabela");
      // limpa a lista antes de adicionar novos itens
      userList.innerHTML = "";
      // VERIFICA SE HÁ USUARIOS RETORNADOS E OS ADICIONA A TABELA
      data.users.forEach((user) => {
        // CRIA UMA NOVA LINHA E POVOA-LA
        const tr = document.createElement("tr");

        //cria celulas para nome, cpf, email
        const tdCPF = document.createElement("td");
        tdCPF.textContent = user.cpf;
        tr.appendChild(tdCPF);
        
                const tdName = document.createElement("td");
        tdName.textContent = user.name;
        tr.appendChild(tdName);

        const tdEmail = document.createElement("td");
        tdEmail.textContent = user.email;
        tr.appendChild(tdEmail);

        userList.appendChild(tr);
      });
    })
    .catch((error) => {
      alert("Erro ao obter usuarios: " + error.message);
      console.error("Erro:", error.message);
    });
}
