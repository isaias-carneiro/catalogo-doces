import "./App.css";
import { Phone, Heart } from "lucide-react";

export default function App() {
  const doces = [
    {
      nome: "Apliques",
      preco: "R$ 2,00",
      descricao: "Apliques comestíveis personalizados para decorar seu bolo"
    },
    {
      nome: "Frutinhas",
      preco: "R$ 2,00",
      descricao: "Frutinhas de leite para decorar sua mesa"
    },
    {
      nome: "Doces Detalhados na Base",
      preco: "R$ 2,50",
      descricao: "Detalhe e base feitas de leite"
    },
    {
      nome: "Doces Modelados 2D na Base",
      preco: "R$ 3,00",
      descricao: "Modelados em relevo com acabamento fino"
    },
    {
      nome: "Doces Modelados 3D sem Base",
      preco: "R$ 3,50",
      descricao: "Esculturas em 3D feitas à mão"
    },
    {
      nome: "Doces Versões Maiores",
      preco: "A partir de R$ 8,00",
      descricao: "Valor a negociar diretamente"
    }
  ];

  return (
    <div className="container">

      <header>
        <div className="titulo">
          <Heart size={22} />
          <h1>Catálogo de Doces</h1>
          <Heart size={22} />
        </div>

        <p>Feitos com carinho para você 💖</p>
      </header>

      <main className="cards">
        {doces.map((doce, index) => (
          <div key={index} className="card">
            <h2>{doce.nome}</h2>

            <p className="descricao">
              {doce.descricao}
            </p>

            <span className="preco">
              {doce.preco}
            </span>
          </div>
        ))}
      </main>

      <footer>
        <a
          href="https://wa.me/5581988604820"
          target="_blank"
          className="btn"
        >
          <Phone size={18} />
          Fazer Pedido no WhatsApp
        </a>
      </footer>

    </div>
  );
}
