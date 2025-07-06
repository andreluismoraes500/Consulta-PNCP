import React, { useState } from "react";
import axios from "axios";
import { type ItemPNCP } from "../Components/types";
import ComprasDetalhe from "../Components/ComprasDetalhe";
import { useCarrinho } from "../Context/Context";
import { Link } from "react-router-dom";

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
    <div className="px-4 py-10 max-w-screen-lg mx-auto font-sans">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Licitações PNCP</h1>
        <div className="text-sm text-gray-700">
          <span>Itens no carrinho: </span>
          <span className="font-bold">{quantidadeCarrinho.itens.length}</span>
          <Link
            to="/carrinho"
            className="ml-4 text-blue-600 hover:underline font-semibold"
          >
            Ver carrinho
          </Link>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          type="text"
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
          placeholder="Digite o termo para busca..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
        />
        <button
          onClick={fetchDados}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Pesquisar
        </button>
      </div>

      {loading && <p className="text-gray-600">Carregando...</p>}
      {erro && <p className="text-red-600">{erro}</p>}
      {!loading && !erro && dados.length === 0 && (
        <p className="text-gray-500">Nenhum resultado encontrado.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dados.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-6"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              {item.title}
            </h2>

            <p className="text-sm text-gray-600 mb-1">
              <strong>Descrição:</strong> {item.description}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Órgão:</strong> {item.orgao_nome} - {item.uf}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Município:</strong> {item.municipio_nome}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Unidade:</strong> {item.unidade_nome}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Modalidade:</strong> {item.modalidade_licitacao_nome}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Situação:</strong> {item.situacao_nome}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Data de Publicação:</strong>{" "}
              {new Date(item.data_publicacao_pncp).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Vigência:</strong>{" "}
              {new Date(item.data_inicio_vigencia).toLocaleDateString()} até{" "}
              {new Date(item.data_fim_vigencia).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600 mb-3">
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
              className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-semibold"
            >
              Ver detalhes
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsultaPNCP;
