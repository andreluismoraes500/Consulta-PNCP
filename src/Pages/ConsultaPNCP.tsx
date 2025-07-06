import React, { useState } from "react";
import axios from "axios";
import { type ItemPNCP } from "../Components/types";
import ComprasDetalhe from "../Components/ComprasDetalhe";
import { useCarrinho } from "../Context/Context";
import { Link } from "react-router-dom";

const styles = {
  container: {
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
    padding: "40px",
    maxWidth: "1000px",
    margin: "0 auto",
  } as React.CSSProperties,
  titulo: {
    fontSize: "2rem",
    marginBottom: "20px",
    color: "#333",
  },
  buscaContainer: {
    display: "flex",
    marginBottom: "30px",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    minWidth: "280px",
  },
  botao: {
    padding: "10px 20px",
    fontSize: "1rem",
    borderRadius: "6px",
    backgroundColor: "#0066cc",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  botaoHover: {
    backgroundColor: "#004999",
  },
  card: {
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
    padding: "20px",
    marginBottom: "20px",
  },
  tituloItem: {
    fontSize: "1.3rem",
    marginBottom: "10px",
    color: "#222",
  },
  detalhe: {
    margin: "6px 0",
    fontSize: "0.95rem",
    color: "#555",
  },
  link: {
    display: "inline-block",
    marginTop: "10px",
    textDecoration: "none",
    color: "#0066cc",
    fontWeight: "bold",
  },
};

const ConsultaPNCP: React.FC = () => {
  const [dados, setDados] = useState<ItemPNCP[]>([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [termoBusca, setTermoBusca] = useState("");

  const quantidadeCarrinho = useCarrinho();

  const fetchDados = async () => {
    setLoading(true);
    setErro(null);
    try {
      const termoEncoded = encodeURIComponent(termoBusca);
      const url = `https://pncp.gov.br/api/search/?q=${termoEncoded}&tipos_documento=edital&ordenacao=-data&pagina=1&tam_pagina=10&status=encerradas&poderes=L&ufs=SP`;
      const response = await axios.get(url);
      const items: ItemPNCP[] = response.data.items;
      setDados(items);
    } catch (err) {
      setErro("Erro ao carregar dados da PNCP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1 style={styles.titulo}>Licitações PNCP</h1>
        Quantidades no carrinho {quantidadeCarrinho.itens.length}
        <Link to={"/carrinho"}>Ver carrinho</Link>
      </div>

      <div style={styles.buscaContainer}>
        <input
          type="text"
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
          placeholder="Digite o termo para busca..."
          style={styles.input}
        />
        <button
          onClick={fetchDados}
          style={styles.botao}
          onMouseOver={(e) =>
            ((e.target as HTMLButtonElement).style.backgroundColor = "#004999")
          }
          onMouseOut={(e) =>
            ((e.target as HTMLButtonElement).style.backgroundColor = "#0066cc")
          }
        >
          Pesquisar
        </button>
      </div>
      {loading && <p>Carregando...</p>}
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      {!loading && !erro && dados.length === 0 && (
        <p>Nenhum resultado encontrado.</p>
      )}
      {dados.map((item) => (
        <div key={item.id} style={styles.card}>
          <h2 style={styles.tituloItem}>{item.title}</h2>

          <p style={styles.detalhe}>
            <strong>Descrição:</strong> {item.description}
          </p>
          <p style={styles.detalhe}>
            <strong>Órgão:</strong> {item.orgao_nome} - {item.uf}
          </p>
          <p style={styles.detalhe}>
            <strong>Município:</strong> {item.municipio_nome}
          </p>
          <p style={styles.detalhe}>
            <strong>Unidade:</strong> {item.unidade_nome}
          </p>
          <p style={styles.detalhe}>
            <strong>Modalidade:</strong> {item.modalidade_licitacao_nome}
          </p>
          <p style={styles.detalhe}>
            <strong>Situação:</strong> {item.situacao_nome}
          </p>
          <p style={styles.detalhe}>
            <strong>Data de Publicação:</strong>{" "}
            {new Date(item.data_publicacao_pncp).toLocaleString()}
          </p>
          <p style={styles.detalhe}>
            <strong>Vigência:</strong>{" "}
            {new Date(item.data_inicio_vigencia).toLocaleDateString()} até{" "}
            {new Date(item.data_fim_vigencia).toLocaleDateString()}
          </p>
          <p style={styles.detalhe}>
            <strong>Controle PNCP:</strong> {item.numero_controle_pncp}
          </p>

          <ComprasDetalhe
            url={`https://pncp.gov.br/api/consulta/v1/orgaos/${item.orgao_cnpj}/compras/${item.ano}/${item.numero_sequencial}`}
          />
          <a
            href={`https://pncp.gov.br/editais/${item.item_url.replace(
              /^\/compras\//,
              ""
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.link}
          >
            Ver detalhes
          </a>
        </div>
      ))}
    </div>
  );
};

export default ConsultaPNCP;
