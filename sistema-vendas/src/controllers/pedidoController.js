const PedidoModel = require('../models/pedidoModel');
const ClienteModel = require('../models/clienteModel');
const ProdutoModel = require('../models/produtoModel');

exports.listarPedidos = (req, res) => {
  res.status(200).json(PedidoModel.buscarTodos());
};

exports.criarPedido = (req, res) => {
  const { clienteId, produtosIds } = req.body;

  if (!clienteId || !produtosIds || !Array.isArray(produtosIds) || produtosIds.length === 0) {
    return res.status(400).json({ erro: 'clienteId e um array de produtosIds são obrigatórios.' });
  }

  const cliente = ClienteModel.buscarPorId(clienteId);
  if (!cliente) {
    return res.status(404).json({ erro: 'Cliente não encontrado.' });
  }

  let total = 0;
  const produtosComprados = [];

  for (const pid of produtosIds) {
    const produto = ProdutoModel.buscarPorId(pid);
    if (!produto) {
      return res.status(404).json({ erro: `Produto com ID ${pid} não encontrado.` });
    }
    if (produto.estoque <= 0) {
      return res.status(400).json({ erro: `Produto '${produto.nome}' está sem estoque.` });
    }
    
    produtosComprados.push(produto);
    total += produto.preco;
  }

  for (const pid of produtosIds) {
    const produto = ProdutoModel.buscarPorId(pid);
    ProdutoModel.atualizar(pid, { estoque: produto.estoque - 1 });
  }

  const novoPedido = PedidoModel.criar({ cliente, produtos: produtosComprados, valorTotal: total });
  res.status(201).json(novoPedido);
};