import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCarrinho } from "../Context/Context";

interface OrgaoEntidade {
  cnpj: string;
  razaoSocial: string;
  poderId: string;
  esferaId: string;
}

interface UnidadeOrgao {
  ufNome: string;
  codigoIbge: string;
  ufSigla: string;
  municipioNome: string;
  codigoUnidade: string;
  nomeUnidade: string;
}

interface AmparoLegal {
  descricao: string;
  nome: string;
  codigo: number;
}

interface CompraDetalhe {
  valorTotalEstimado: number;
  valorTotalHomologado: number;
  orcamentoSigilosoCodigo: number;
  orcamentoSigilosoDescricao: string;
  numeroControlePNCP: string;
  linkSistemaOrigem: string | null;
  linkProcessoEletronico: string | null;
  anoCompra: number;
  sequencialCompra: number;
  numeroCompra: string;
  processo: string;
  orgaoEntidade: OrgaoEntidade;
  unidadeOrgao: UnidadeOrgao;
  orgaoSubRogado: null;
  unidadeSubRogada: null;
  modalidadeId: number;
  modalidadeNome: string;
  justificativaPresencial: string;
  modoDisputaId: number;
  modoDisputaNome: string;
  tipoInstrumentoConvocatorioCodigo: number;
  tipoInstrumentoConvocatorioNome: string;
  amparoLegal: AmparoLegal;
  objetoCompra: string;
  informacaoComplementar: string | null;
  srp: boolean;
  fontesOrcamentarias: any[];
  dataPublicacaoPncp: string;
  dataAberturaProposta: string;
  dataEncerramentoProposta: string;
  situacaoCompraId: number;
  situacaoCompraNome: string;
  existeResultado: boolean;
  dataInclusao: string;
  dataAtualizacao: string;
  dataAtualizacaoGlobal: string;
  usuarioNome: string;
}

interface ComprasDetalheProps {
  url: string;
}

const ComprasDetalhe: React.FC<ComprasDetalheProps> = ({ url }) => {
  const [dados, setDados] = useState<CompraDetalhe | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const carrinho = useCarrinho();

  const handleCarrinho = (preco: number, nome: string) => {
    carrinho.adicionarItem({ nome, preco });
  };

  const fetchDados = async () => {
    setErro(null);
    const response = await axios.get(url);
    const { data } = response;
    console.log(data);
    setDados(data);
  };

  useEffect(() => {
    fetchDados();
  }, [url]);

  if (erro) return <div>{erro}</div>;
  if (!dados) return <div>Carregando...</div>;

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
      fontSize: "0.8rem",
      borderRadius: "6px",
      backgroundColor: "#0066cc",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      marginLeft: "10px",
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

  return (
    <div>
      <div style={{ display: "flex" }}>
        <h2 style={styles.tituloItem}>
          Compra Nº {dados.numeroCompra} / {dados.anoCompra}
        </h2>
        <button
          style={styles.botao}
          onMouseOver={(e) =>
            ((e.target as HTMLButtonElement).style.backgroundColor = "#004999")
          }
          onMouseOut={(e) =>
            ((e.target as HTMLButtonElement).style.backgroundColor = "#0066cc")
          }
          onClick={() =>
            handleCarrinho(dados.valorTotalEstimado, dados.objetoCompra)
          }
        >
          Adicionar ao carrinho
        </button>
      </div>
      <p style={styles.detalhe}>
        <strong>Objeto:</strong> {dados.objetoCompra}
      </p>

      <p style={styles.detalhe}>
        <strong>Processo:</strong> {dados.processo}
      </p>
      <p style={styles.detalhe}>
        <strong>Modalidade:</strong> {dados.modalidadeNome}
      </p>
      <p style={styles.detalhe}>
        <strong>Disputa:</strong> {dados.modoDisputaNome}
      </p>
      <p style={styles.detalhe}>
        <strong>Sigilo:</strong> {dados.orcamentoSigilosoDescricao}
      </p>
      <p style={styles.detalhe}>
        <strong>Estimado:</strong>
        {dados.valorTotalEstimado.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </p>
      <p style={styles.detalhe}>
        <strong>Homologado:</strong>
        {dados.valorTotalHomologado > 0
          ? dados.valorTotalHomologado.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })
          : "R$ 0.00"}
      </p>
      <p style={styles.detalhe}>
        <strong>Justificativa:</strong> {dados.justificativaPresencial}
      </p>
      <p style={styles.detalhe}>
        <strong>Amparo legal:</strong> {dados.amparoLegal.nome} -{" "}
        {dados.amparoLegal.descricao}
      </p>
      <p style={styles.detalhe}>
        <strong>Unidade:</strong> {dados.unidadeOrgao.nomeUnidade} (
        {dados.unidadeOrgao.municipioNome} - {dados.unidadeOrgao.ufSigla})
      </p>
      <p style={styles.detalhe}>
        <strong>Data de publicação:</strong>{" "}
        {new Date(dados.dataPublicacaoPncp).toLocaleString()}
      </p>
      <p style={styles.detalhe}>
        <strong>Usuário responsável:</strong> {dados.usuarioNome}
      </p>
    </div>
  );
};

export default ComprasDetalhe;
