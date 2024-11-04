document.addEventListener("DOMContentLoaded", getAllUsers);
document.addEventListener("DOMContentLoaded", getAllUsersTable);
document.addEventListener("DOMContentLoaded", getAllOrgTable);

// Chamada da função createUser para associação ao evento de envio do formulário
document.getElementById("formulario_registro").addEventListener("submit", createUser);

function createUser(event) {
  // Previne o comportamento padrão do formulário, ou seja, impede que ele seja enviado e recarregue a página
  event.preventDefault();
  // Captura os valores dos campos do formulário
  const name = document.getElementById("nome").value;
  const cpf = document.getElementById("cpf").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("senha").value;

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
      // Tratamento da resposta do servidor/api
      if (response.ok) {
        // Verifica se a resposta foi bem sucedida (status 2XX)
        return response.json();
      }
      // Convertendo o erro em formato json
      return response.json().then((err) => {
        // Mensagem retornada do servidor, acessada pela chave "error"
        throw new Error(err.error);
      });
    }) // Fechamendo da then(response)
    .then((data) => {
      // Executa a resposta de sucesso - retorna ao usuário final
      // Exibe um alerta para o usuário final(front) com o nome do usuário que acabou de ser cadastrado

      alert(data.message);
      console.log(data.message);

      // Reseta os campos do formulário após o sucesso do cadastro
      document.getElementById("formulario_registro").reset();
    })
    .catch((error) => {
      // Captura qualquer erro que ocorra durante o processo de requisição / resposta

      // Exibe alerta(front) com o erro processado
      alert("Erro no cadastro: " + error.message);

      console.error("Erro: ", error.message);
    });
}

function getAllUsers(){
  fetch("http://10.89.240.3:5000/api/v1/user/", {
    method: "GET",
    headers:{
      "Content-Type": "application/json",
    }
  })
    .then((response) => {
      if(response.ok){
        return response.json();
      }
      return response.json().then((err) => {
        throw new Error(err.Error)
      })
    })
      .then((data) => {
        const userList = document.getElementById("user_list")
        userList.innerHTML = ""; //Limpa a lista existente

        data.users.forEach((user) => {
          const listItem = document.createElement("li");
          listItem.textContent = `Nome: ${user.name}, CPF: ${user.cpf}, Email: ${user.email}`
          userList.appendChild(listItem)
        })
      })

      .catch((error)=>{
        alert("Erro ao obter usuários" + error.message)
        console.error("Erro: ", error.message)
      })
}

function getAllUsersTable(){
  fetch("http://10.89.240.3:5000/api/v1/user/", {
    method: "GET",
    headers:{
      "Content-Type": "application/json",
    }
  })
    .then((response) => {
      if(response.ok){
        return response.json();
      }
      return response.json().then((err) => {
        throw new Error(err.Error)
      })
    })
    .then((data) => {
      const userList = document.getElementById("user_list_tabela")
      //Limpa a lista antes de adicionar novos items
      userList.innerHTML = "";

      //Verifica se há usuários retornados e os adiciona à tabela
      data.users.forEach((usuario) => {
        //Cria uma nova linha
        const tr = document.createElement("tr")

        //Cria células para nome, cpf e email
        const tdName = document.createElement("td")
        tdName.textContent = usuario.name;
        tr.appendChild(tdName);

        const tdCpf = document.createElement("td")
        tdCpf.textContent = usuario.cpf;
        tr.appendChild(tdCpf);

        const tdEmail = document.createElement("td")
        tdEmail.textContent = usuario.email;
        tr.appendChild(tdEmail);
        
        //adiciona linha à tabela
        userList.appendChild(tr)
      })
    })
    .catch((error) => {
      alert("Erro ao obter usuários: " + error.message)
      console.error("Erro: ", error.message)
    })
}

function getAllOrgTable(){
  fetch("http://10.89.240.3:5000/api/v1/organizador/", {
    method: "GET",
    headers:{
      "Content-Type": "application/json",
    }
  })
    .then((response) => {
      if(response.ok){
        return response.json();
      }
      return response.json().then((err) => {
        throw new Error(err.Error)
      })
    })
    .then((data) => {
      const orgList = document.getElementById("org_lista_tabela")
      //Limpa a lista antes de adicionar novos items
      orgList.innerHTML = "";

      //Verifica se há usuários retornados e os adiciona à tabela
      data.organizadores.forEach((organizador) => {
        //Cria uma nova linha
        const tr = document.createElement("tr")

        //Cria células para nome, cpf e email
        const tdName = document.createElement("td")
        tdName.textContent = organizador.nome;
        tr.appendChild(tdName);

        const tdTelefone = document.createElement("td")
        tdTelefone.textContent = organizador.telefone;
        tr.appendChild(tdTelefone);

        const tdEmail = document.createElement("td")
        tdEmail.textContent = organizador.email;
        tr.appendChild(tdEmail);
        
        //adiciona linha à tabela
        orgList.appendChild(tr)
      })
    })
    .catch((error) => {
      alert("Erro ao obter usuários: " + error.message)
      console.error("Erro: ", error.message)
    })
}