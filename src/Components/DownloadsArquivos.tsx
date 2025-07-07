import React, { useEffect, useState } from "react";
import axios from "axios";

interface DownloadArquivo {
  uri: string;
  titulo: string;
}

interface DownloadsProps {
  url: string;
}

const DownloadsArquivos: React.FC<DownloadsProps> = ({ url }) => {
  const [dados, setDados] = useState<DownloadArquivo[] | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  const fetchDados = async () => {
    try {
      setErro(null);
      const response = await axios.get(url);
      setDados(response.data);
    } catch (err) {
      setErro("Erro ao carregar arquivos.");
    }
  };

  useEffect(() => {
    fetchDados();
  }, [url]);

  if (erro) return <div className="text-center text-red-600">{erro}</div>;
  if (!dados)
    return <div className="text-center text-gray-500">Carregando...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-gray-800">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
        Arquivos para Download
      </h2>

      <div className="space-y-4">
        {dados.map((arquivo, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center justify-between bg-white shadow-md rounded-xl p-4 border border-gray-200 hover:shadow-lg transition"
          >
            <div className="text-lg font-medium text-gray-800">
              {arquivo.titulo}
            </div>
            <a
              href={arquivo.uri}
              download
              className="mt-2 md:mt-0 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
            >
              Baixar
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DownloadsArquivos;
