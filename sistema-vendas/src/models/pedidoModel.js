let pedidos = [];

class PedidoModel {
  static buscarTodos() {
    return pedidos;
  }

  static criar(pedido) {
    const novoPedido = { 
      id: Date.now().toString(), 
      dataCriacao: new Date().toISOString(),
      ...pedido 
    };
    pedidos.push(novoPedido);
    return novoPedido;
  }
}
module.exports = PedidoModel;