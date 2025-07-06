import React from "react";
import { useCarrinho } from "../Context/Context";
import { Link } from "react-router-dom";

const CarrinhoPNCP: React.FC = () => {
  const carrinho = useCarrinho();

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <h2 className="text-3xl font-bold mb-6 text-center">Seu Carrinho</h2>

      <Link to="/" className="text-blue-600 underline hover:text-blue-800">
        Página de Pesquisa
      </Link>

      <div className="mt-6 border-t pt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h4 className="text-xl font-bold">Total:</h4>
        <span className="text-2xl font-bold text-green-600">
          R$ {carrinho.total.toFixed(2)}
        </span>
      </div>

      <div className="mt-4 border-t pt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h4 className="text-xl font-bold">Média:</h4>
        <span className="text-2xl font-bold text-green-600">
          R${" "}
          {carrinho.itens.length > 0
            ? (carrinho.total / carrinho.itens.length).toFixed(2)
            : "0.00"}
        </span>
      </div>

      {carrinho.itens.length === 0 ? (
        <p className="text-center text-gray-500 mt-6">
          Seu carrinho está vazio.
        </p>
      ) : (
        <>
          <div className="flex flex-col gap-4 mt-6">
            {carrinho.itens.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-white p-4 rounded-xl shadow hover:shadow-lg transition-shadow"
              >
                <div>
                  <h3 className="text-lg font-semibold">{item.nome}</h3>
                  <p className="text-sm text-gray-500">
                    {(item.preco * item.quantidade).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}{" "}
                    — {item.quantidade}x de R$ {item.preco.toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => carrinho.removerItem(item.id)}
                  className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition-colors"
                >
                  Remover
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={carrinho.limparCarrinho}
              className="bg-gray-800 text-white px-5 py-2 rounded-md hover:bg-gray-900 transition-colors"
            >
              Limpar Carrinho
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CarrinhoPNCP;
