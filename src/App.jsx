import "./App.css";
import { Phone, Plus, Minus } from "lucide-react";
import { useState } from "react";

import aplique from "./assets/Doces_Aplique.jpeg";
import frutinhas from "./assets/Doces_Frutinhas.jpeg";
import base from "./assets/Doces_detalhe_Base.jpeg";
import d2 from "./assets/Doces_Modelado_2D_Base.jpeg";
import d3 from "./assets/Doces_Modelado_3D_Base.jpeg";
import grandes from "./assets/Doces_Grandes.jpeg";

export default function App() {

  const doces = [
    {
      nome: "Apliques",
      preco: 2.0,
      imagem: aplique,
    },
    {
      nome: "Frutinhas",
      preco: 2.0,
      imagem: frutinhas,
    },
    {
      nome: "Detalhados na Base",
      preco: 2.5,
      imagem: base,
    },
    {
      nome: "Modelados 2D",
      preco: 3.0,
      imagem: d2,
    },
    {
      nome: "Modelados 3D",
      preco: 3.5,
      imagem: d3,
    },
    {
      nome: "Versões Maiores",
      preco: 8.0,
      imagem: grandes,
    },
  ];

  // Carrinho
  const [carrinho, setCarrinho] = useState({});

  // Adicionar
  function adicionar(i) {
    setCarrinho(prev => ({
      ...prev,
      [i]: (prev[i] || 0) + 1
    }));
  }

  // Remover
  function remover(i) {
    setCarrinho(prev => {
      const novo = { ...prev };

      if (novo[i] > 1) {
        novo[i]--;
      } else {
        delete novo[i];
      }

      return novo;
    });
  }

  // Total
  function calcularTotal() {
    let total = 0;

    Object.keys(carrinho).forEach(i => {
      total += doces[i].preco * carrinho[i];
    });

    return total;
  }

  // Gerar mensagem
  function gerarZap() {

    let msg = "🍬 *Pedido - Jack Doces*\n\n";

    Object.keys(carrinho).forEach(i => {

      const d = doces[i];
      const qtd = carrinho[i];
      const sub = (d.preco * qtd).toFixed(2);

      msg += `• ${d.nome} - ${qtd}x → R$ ${sub}\n`;
    });

    msg += `\n💰 *Total: R$ ${calcularTotal().toFixed(2)}*`;
    msg += "\n\nAguardo confirmação. Obrigado! 💖";

    const url = `https://wa.me/5583986609978?text=${encodeURIComponent(msg)}`;

    window.open(url, "_blank");
  }

  return (
    <div className="container">

      <h1>🍬 Catálogo Jack Doces</h1>

      <main className="cards">

        {doces.map((doce, i) => (

          <div key={i} className="card">
            <img
            src={doce.imagem}
            alt={doce.nome}
            className="foto"/>
            
            <h2>{doce.nome}</h2>

            <span className="preco">
              R$ {doce.preco.toFixed(2)}
            </span>

            {/* Controles */}
            <div className="controle">

              <button onClick={() => remover(i)}>
                <Minus size={16} />
              </button>

              <span>{carrinho[i] || 0}</span>

              <button onClick={() => adicionar(i)}>
                <Plus size={16} />
              </button>

            </div>

          </div>

        ))}

      </main>

      {/* Rodapé */}
      {Object.keys(carrinho).length > 0 && (

        <footer>

          <p>
            Total: <strong>R$ {calcularTotal().toFixed(2)}</strong>
          </p>

          <button className="btn" onClick={gerarZap}>
            <Phone size={18} />
            Finalizar no WhatsApp
          </button>

        </footer>

      )}

    </div>
  );
}
