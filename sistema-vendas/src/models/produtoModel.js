let produtos = [];

class ProdutoModel {
  static buscarTodos() {
    return produtos;
  }

  static buscarPorId(id) {
    return produtos.find(p => p.id === id);
  }

  static criar(produto) {
    const novoProduto = { 
      id: Date.now().toString(),
      ...produto 
    };
    produtos.push(novoProduto);
    return novoProduto;
  }

  static atualizar(id, dadosAtualizados) {
    const index = produtos.findIndex(p => p.id === id);
    if (index === -1) return null;
    produtos[index] = { ...produtos[index], ...dadosAtualizados };
    return produtos[index];
  }

  static deletar(id) {
    const index = produtos.findIndex(p => p.id === id);
    if (index === -1) return null;
    return produtos.splice(index, 1)[0];
  }
}

module.exports = ProdutoModel;