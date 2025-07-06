// src/contexts/CarrinhoContext.tsx
import { createContext, useState, useContext, type ReactNode } from "react";

// 1. Interface para um item individual no carrinho
interface ItemCarrinho {
  id: string; // Para identificar unicamente o item
  nome: string;
  preco: number;
  quantidade: number;
}

// 2. Interface para o valor do contexto do carrinho
interface CarrinhoContextType {
  itens: ItemCarrinho[];
  total: number;
  adicionarItem: (item: Omit<ItemCarrinho, "quantidade" | "id">) => void; // Omitimos 'quantidade' e 'id' na adição inicial
  removerItem: (id: string) => void;
  limparCarrinho: () => void;
  // Poderíamos adicionar funções para aumentar/diminuir quantidade aqui também
}

// 3. Criação do contexto com um valor padrão (undefined, mas com tipo CarrinhoContextType | undefined)
const CarrinhoContext = createContext<CarrinhoContextType | undefined>(
  undefined
);

// 4. Provedor do Contexto do Carrinho
interface CarrinhoProviderProps {
  children: ReactNode;
}

export function CarrinhoProvider({ children }: CarrinhoProviderProps) {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);

  // Calcula o total sempre que os itens mudam
  const total = itens.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );

  const adicionarItem = (novoItem: Omit<ItemCarrinho, "quantidade" | "id">) => {
    setItens((prevItens) => {
      // Verifica se o item já existe no carrinho
      const itemExistente = prevItens.find(
        (item) => item.nome === novoItem.nome
      );

      if (itemExistente) {
        // Se existe, apenas aumenta a quantidade
        return prevItens.map((item) =>
          item.id === itemExistente.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      } else {
        // Se não existe, adiciona como um novo item com quantidade 1 e um ID único
        return [
          ...prevItens,
          { ...novoItem, id: crypto.randomUUID(), quantidade: 1 },
        ];
      }
    });
  };

  const removerItem = (id: string) => {
    setItens((prevItens) => prevItens.filter((item) => item.id !== id));
  };

  const limparCarrinho = () => {
    setItens([]);
  };

  const contextValue = {
    itens,
    total,
    adicionarItem,
    removerItem,
    limparCarrinho,
  };

  return (
    <CarrinhoContext.Provider value={contextValue}>
      {children}
    </CarrinhoContext.Provider>
  );
}

// 5. Hook customizado para consumir o contexto
export const useCarrinho = () => {
  const context = useContext(CarrinhoContext);
  if (context === undefined) {
    throw new Error("useCarrinho deve ser usado dentro de um CarrinhoProvider");
  }
  return context;
};
