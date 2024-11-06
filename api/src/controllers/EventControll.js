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
    const { nome, descricao, data_hora, local, fk_id_organizador, id_evento } = req.body;

    // Validação genérica de todos os atributos
    if (!nome || !descricao || !data_hora || !local || !fk_id_organizador || !id_evento) {
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
};
