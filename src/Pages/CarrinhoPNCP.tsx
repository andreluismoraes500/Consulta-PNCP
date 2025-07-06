import React from "react";
import { useCarrinho } from "../Context/Context";
import { Link } from "react-router-dom";

const CarrinhoPNCP: React.FC = () => {
  const carrinho = useCarrinho();

  return (
    <div
      style={{
        maxWidth: "64rem",
        margin: "0 auto",
        padding: "1.5rem",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "1.5rem",
          textAlign: "center",
        }}
      >
        Seu Carrinho
      </h2>

      <Link to={"/"} style={{ color: "#2563eb", textDecoration: "underline" }}>
        Página de Pesquisa
      </Link>

      <div
        style={{
          marginTop: "1.5rem",
          borderTop: "1px solid #e5e7eb",
          paddingTop: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h4 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>Total:</h4>
        <span
          style={{ fontSize: "1.5rem", color: "#16a34a", fontWeight: "bold" }}
        >
          R$ {carrinho.total.toFixed(2)}
        </span>
      </div>

      <div
        style={{
          marginTop: "1.5rem",
          borderTop: "1px solid #e5e7eb",
          paddingTop: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h4 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>Media:</h4>
        <span
          style={{ fontSize: "1.5rem", color: "#16a34a", fontWeight: "bold" }}
        >
          R${" "}
          {carrinho.itens.length > 0
            ? (carrinho.total / carrinho.itens.length).toFixed(2)
            : "0.00"}
        </span>
      </div>

      {carrinho.itens.length === 0 ? (
        <p style={{ textAlign: "center", color: "#6b7280" }}>
          Seu carrinho está vazio.
        </p>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              marginTop: "1rem",
            }}
          >
            {carrinho.itens.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "white",
                  padding: "1rem",
                  borderRadius: "0.75rem",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                  transition: "box-shadow 0.3s ease-in-out",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0, 0, 0, 0.15)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 2px 6px rgba(0, 0, 0, 0.1)")
                }
              >
                <div>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: "600" }}>
                    {item.nome}
                  </h3>
                  <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                    {(item.preco * item.quantidade).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}{" "}
                    — {item.quantidade}x de R$ {item.preco.toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => carrinho.removerItem(item.id)}
                  style={{
                    backgroundColor: "#ef4444",
                    color: "white",
                    padding: "0.5rem 0.75rem",
                    borderRadius: "0.5rem",
                    border: "none",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease-in-out",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#dc2626")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#ef4444")
                  }
                >
                  Remover
                </button>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: "1.5rem",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button
              onClick={carrinho.limparCarrinho}
              style={{
                backgroundColor: "#1f2937",
                color: "white",
                padding: "0.5rem 1.25rem",
                borderRadius: "0.5rem",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.3s ease-in-out",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#111827")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#1f2937")
              }
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
