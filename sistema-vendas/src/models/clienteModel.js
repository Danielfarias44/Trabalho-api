let clientes = [];

class ClienteModel {
  static buscarTodos() {
    return clientes;
  }

  static buscarPorId(id) {
    return clientes.find(c => c.id === id);
  }

  static criar(cliente) {
    const novoCliente = { id: Date.now().toString(), ...cliente };
    clientes.push(novoCliente);
    return novoCliente;
  }

  static atualizar(id, dadosAtualizados) {
    const index = clientes.findIndex(c => c.id === id);
    if (index === -1) return null;
    clientes[index] = { ...clientes[index], ...dadosAtualizados };
    return clientes[index];
  }

  static deletar(id) {
    const index = clientes.findIndex(c => c.id === id);
    if (index === -1) return null;
    return clientes.splice(index, 1)[0];
  }
}
module.exports = ClienteModel;