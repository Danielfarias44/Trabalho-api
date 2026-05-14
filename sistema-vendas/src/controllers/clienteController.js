const ClienteModel = require('../models/clienteModel');

exports.listarClientes = (req, res) => {
  res.status(200).json(ClienteModel.buscarTodos());
};

exports.criarCliente = (req, res) => {
  const { nome, email, endereco } = req.body;

  if (!nome || !email || !endereco) {
    return res.status(400).json({ erro: 'Nome, email e endereço são obrigatórios.' });
  }

  const novoCliente = ClienteModel.criar({ nome, email, endereco });
  res.status(201).json(novoCliente);
};

exports.atualizarCliente = (req, res) => {
  const { id } = req.params;
  const dados = req.body;

  const clienteAtualizado = ClienteModel.atualizar(id, dados);
  if (!clienteAtualizado) {
    return res.status(404).json({ erro: 'Cliente não encontrado.' });
  }
  res.status(200).json(clienteAtualizado);
};

exports.deletarCliente = (req, res) => {
  const { id } = req.params;

  const clienteDeletado = ClienteModel.deletar(id);
  if (!clienteDeletado) {
    return res.status(404).json({ erro: 'Cliente não encontrado.' });
  }
  res.status(200).json({ mensagem: 'Cliente deletado com sucesso.', cliente: clienteDeletado });
};