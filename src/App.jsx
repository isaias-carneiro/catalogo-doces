import "./App.css";
import { Phone, Heart } from "lucide-react";
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
      preco: "R$ 2,00",
      descricao: "Apliques comestíveis personalizados",
      imagem: aplique,
    },
    {
      nome: "Frutinhas",
      preco: "R$ 2,00",
      descricao: "Frutinhas de leite artesanais",
      imagem: frutinhas,
    },
    {
      nome: "Detalhados na Base",
      preco: "R$ 2,50",
      descricao: "Detalhe e base feitas de leite",
      imagem: base,
    },
    {
      nome: "Modelados 2D",
      preco: "R$ 3,00",
      descricao: "Modelados em relevo",
      imagem: d2,
    },
    {
      nome: "Modelados 3D",
      preco: "R$ 3,50",
      descricao: "Esculturas em 3D",
      imagem: d3,
    },
    {
      nome: "Versões Maiores",
      preco: "A partir de R$ 8,00",
      descricao: "Valor a negociar",
      imagem: grandes,
    },
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

          <img
            src={doce.imagem}
            alt={doce.nome}
            className="foto"
          />
        
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
