const connect = require("../db/connect");

module.exports = class EventControll {
  // Criação de evento
  static async createEvents(req, res) {
    const { nome, descricao, data_hora, local, fk_id_organizador } = req.body;

    // Validação genérica de todos os atributos
    if (!nome || !descricao || !data_hora || !local || !fk_id_organizador) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem estar preenchidos!!" });
    }

    const query = `insert into evento(nome, descricao, data_hora, local, fk_id_organizador)
        values(?,?,?,?,?)`;
    const values = [nome, descricao, data_hora, local, fk_id_organizador];

    try {
      connect.query(query, values, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Erro ao criar o evento" });
        }
        return res.status(201).json({ message: "Sucesso ao criar evento" });
      });
    } catch (error) {
      console.log("Erro ao executar consulta", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  // Buscar todos os eventos
  static async GetAllEvents(req, res) {
    const query = `select * from evento`;
    try {
      connect.query(query, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Erro ao buscar eventos" });
        }
        return res
          .status(200)
          .json({ message: "Eventos listados com sucesso!", events: results });
      });
    } catch (error) {
      console.log("Erro ao executar a query: ", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  // Atualização de evento
  static async updateEvents(req, res) {
    const { nome, descricao, data_hora, local, fk_id_organizador, id_evento } =
      req.body;

    // Validação genérica de todos os atributos
    if (
      !nome ||
      !descricao ||
      !data_hora ||
      !local ||
      !fk_id_organizador ||
      !id_evento
    ) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem estar preenchidos!!" });
    }

    const query = `update evento 
                   set nome=?, descricao=?, data_hora=?, local=?, fk_id_organizador=?
                   where id_evento=?`;

    const values = [
      nome,
      descricao,
      data_hora,
      local,
      fk_id_organizador,
      id_evento,
    ];

    try {
      connect.query(query, values, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Erro ao atualizar o evento" });
        }

        if (results.affectedRows === 0) {
          return res.status(404).json({ message: "Evento não encontrado" });
        }

        return res
          .status(200)
          .json({ message: "Evento atualizado com sucesso!" });
      });
    } catch (error) {
      console.log("Erro ao executar consulta", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
  static async deleteEvents(req, res) {
    const eventoId = req.params.id;

    const query = `DELETE FROM evento WHERE id_evento = ?`;
    try {
      connect.query(query, eventoId, function (err, results) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro Interno do Servidor" });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Evento não encontrado." });
        }
        return res
          .status(200)
          .json({ message: "Evento excluído com sucesso." });
      });
    } catch (error) {
      console.error("Erro ao executar a consulta:", error);
      return res.status(500).json({ error: "Erro Interno de Servidor" });
    }
  }

  static async GetEventsPorData(req, res) {
    const query = `SELECT * FROM evento `;

    try {
      connect.query(query, (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro ao buscar eventos" });
        }
        // const dataEvento = new Date(results[0].data_hora);
        // const dia = dataEvento.getDate();
        // const mes = dataEvento.getMonth() + 1;
        // const ano = dataEvento.getFullYear();
        // console.log(dia + "/" + mes + "/" + ano);

        // const dataEvento2 = new Date(results[1].data_hora);
        // const dia2 = dataEvento2.getDate();
        // const mes2 = dataEvento2.getMonth() + 1;
        // const ano2 = dataEvento2.getFullYear();
        // console.log(dia2 + "/" + mes2 + "/" + ano2);

        // const dataEvento3 = new Date(results[2].data_hora);
        // const dia3 = dataEvento3.getDate();
        // const mes3 = dataEvento3.getMonth() + 1;
        // const ano3 = dataEvento3.getFullYear();
        // console.log(dia3 + "/" + mes3 + "/" + ano3);

        const now = new Date();
        const eventosPassados = results.filter(
          (evento) => new Date(evento.data_hora) < now
        );
        const eventosFuturos = results.filter(
          (evento) => new Date(evento.data_hora) >= now
        );

        const diferencaMs =
          eventosFuturos[0].data_hora.getTime() - now.getTime();
        const dias = Math.floor(diferencaMs / (1000 * 60 * 60 * 24));
        const horas = Math.floor(
          (diferencaMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        console.log(diferencaMs, "são " + dias + " dias e " + horas + " horas");

        const dataFiltro = new Date("2024-12-15").toISOString().split("T");
        const eventoDia = results.filter(
          (evento) =>
            new Date(evento.data_hora).toISOString().split("T")[0] ===
            dataFiltro[0]
        );

        console.log("data dia: ", eventoDia);

        return res
          .status(200)
          .json({ message: "OK", eventosPassados, eventosFuturos });
      });
    } catch (error) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao buscar eventos" });
    }
  }
  static async GetNext7DaysEvents(req, res) {
    // Data inicial: 17 de novembro de 2024
    const inputDate = new Date('2024-11-17'); // Definindo diretamente o dia 17/11/2024
    console.log('Data inicial (17/11/2024):', inputDate); // Mostra a data inicial no terminal
  
    // Data de 7 dias após o dia 17
    const startDate = inputDate.toISOString().split('T')[0]; // "2024-11-17"
    console.log('Data de início do intervalo (startDate):', startDate); // Mostra a data de início
  
    const endDate = new Date(inputDate);
    endDate.setDate(inputDate.getDate() + 7); // Adiciona 7 dias ao dia 17
    const endDateString = endDate.toISOString().split('T')[0]; // "2024-11-24"
    console.log('Data final do intervalo (endDate):', endDateString); // Mostra a data final (7 dias depois)
  
    const query = `SELECT * FROM evento WHERE data_hora BETWEEN ? AND ?`;
    console.log('Query SQL:', query); // Mostra a consulta SQL no terminal
  
    try {
      // Executa a consulta passando as datas de startDate e endDate
      connect.query(query, [startDate, endDateString], (err, results) => {
        if (err) {
          console.error('Erro ao executar a consulta:', err); // Mostra o erro no terminal, se houver
          return res.status(500).json({ error: "Erro ao buscar eventos" });
        }
  
        console.log('Resultados da consulta:', results); // Mostra os resultados da consulta no terminal
  
        // Retorna os eventos encontrados no intervalo de 7 dias
        return res.status(200).json({
          message: "Eventos encontrados com sucesso!",
          events: results, // Retorna os eventos encontrados
        });
      });
    } catch (error) {
      console.error('Erro ao buscar eventos:', error); // Mostra qualquer erro que ocorrer no bloco try
      return res.status(500).json({ error: "Erro ao buscar eventos" });
    }
  }
  
  } ;
