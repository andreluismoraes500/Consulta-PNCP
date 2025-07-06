import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCarrinho } from "../Context/Context";
import { toast } from "react-toastify";

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
    toast("Adicionado ao carrinho", { type: "info", autoClose: 1500 });
    carrinho.adicionarItem({ nome, preco });
  };

  const fetchDados = async () => {
    setErro(null);
    const response = await axios.get(url);
    setDados(response.data);
  };

  useEffect(() => {
    fetchDados();
  }, [url]);

  if (erro) return <div className="text-red-500">{erro}</div>;
  if (!dados)
    return <div className="text-center text-gray-600">Carregando...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 text-gray-800">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold text-gray-900">
          Compra Nº {dados.numeroCompra} / {dados.anoCompra}
        </h2>
        <button
          onClick={() =>
            handleCarrinho(dados.valorTotalEstimado, dados.objetoCompra)
          }
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition"
        >
          Adicionar ao carrinho
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6 space-y-3">
        <p>
          <strong>Objeto:</strong> {dados.objetoCompra}
        </p>
        <p>
          <strong>Processo:</strong> {dados.processo}
        </p>
        <p>
          <strong>Modalidade:</strong> {dados.modalidadeNome}
        </p>
        <p>
          <strong>Disputa:</strong> {dados.modoDisputaNome}
        </p>
        <p>
          <strong>Sigilo:</strong> {dados.orcamentoSigilosoDescricao}
        </p>
        <p>
          <strong>Valor estimado:</strong>{" "}
          {dados.valorTotalEstimado.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
        <p>
          <strong>Homologado:</strong>{" "}
          {dados.valorTotalHomologado > 0
            ? dados.valorTotalHomologado.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })
            : "R$ 0,00"}
        </p>
        <p>
          <strong>Justificativa:</strong> {dados.justificativaPresencial}
        </p>
        <p>
          <strong>Amparo legal:</strong> {dados.amparoLegal.nome} –{" "}
          {dados.amparoLegal.descricao}
        </p>
        <p>
          <strong>Unidade:</strong> {dados.unidadeOrgao.nomeUnidade} (
          {dados.unidadeOrgao.municipioNome} – {dados.unidadeOrgao.ufSigla})
        </p>
        <p>
          <strong>Data de publicação:</strong>{" "}
          {new Date(dados.dataPublicacaoPncp).toLocaleString("pt-BR")}
        </p>
        <p>
          <strong>Usuário responsável:</strong> {dados.usuarioNome}
        </p>
      </div>
    </div>
  );
};

export default ComprasDetalhe;
