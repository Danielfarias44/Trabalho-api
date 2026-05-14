const ProdutoModel = require('../models/produtoModel');

exports.listarProdutos = (req, res) => {
  try {
    const produtos = ProdutoModel.buscarTodos();
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar produtos.' });
  }
};

exports.criarProduto = (req, res) => {
  const { nome, descricao, preco, estoque } = req.body;

  if (!nome || preco === undefined || estoque === undefined) {
    return res.status(400).json({ erro: 'Nome, preço e estoque são obrigatórios.' });
  }

  try {
    const novoProduto = ProdutoModel.criar({ nome, descricao, preco, estoque });
    res.status(201).json(novoProduto);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar o produto.' });
  }
};

exports.atualizarProduto = (req, res) => {
  const { id } = req.params;
  const dados = req.body;

  const produtoAtualizado = ProdutoModel.atualizar(id, dados);
  if (!produtoAtualizado) {
    return res.status(404).json({ erro: 'Produto não encontrado.' });
  }

  res.status(200).json(produtoAtualizado);
};

exports.deletarProduto = (req, res) => {
  const { id } = req.params;

  const produtoDeletado = ProdutoModel.deletar(id);
  if (!produtoDeletado) {
    return res.status(404).json({ erro: 'Produto não encontrado.' });
  }

  res.status(200).json({ mensagem: 'Produto deletado com sucesso.', produto: produtoDeletado });
};