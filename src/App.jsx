import "./App.css";
import { Phone, Plus, Minus, X } from "lucide-react";
import { useState } from "react";

import aplique from "./assets/Doces_Aplique.jpeg";
import frutinhas from "./assets/Doces_Frutinhas.jpeg";
import base from "./assets/Doces_detalhe_Base.jpeg";
import d2 from "./assets/Doces_Modelado_2D_Base.jpeg";
import d3 from "./assets/Doces_Modelado_3D_Base.jpeg";
import grandes from "./assets/Doces_Grandes.jpeg";

export default function App() {

  const doces = [
    { nome: "Apliques", preco: 2, imagem: aplique },
    { nome: "Frutinhas", preco: 2, imagem: frutinhas },
    { nome: "Detalhados", preco: 2.5, imagem: base },
    { nome: "Modelados 2D", preco: 3, imagem: d2 },
    { nome: "Modelados 3D", preco: 3.5, imagem: d3 },
    { nome: "Grandes", preco: 8, imagem: grandes },
  ];

  const [carrinho, setCarrinho] = useState({});
  const [zoom, setZoom] = useState(null);

  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    endereco: "",
    bairro: "",
    cep: "",
    pagamento: "",
    data: "",
  }); 

  const API_URL = "https://script.google.com/macros/s/AKfycbzkZyFCv2TfVxYhSDoTckQFQmt48lgKOD9YgGWdv3XNvnFQ0waKbjUV4JbtDLUvMMRy/exec";

  function gerarID() {
    return "JD-" + Date.now().toString().slice(-6);
  }

  function adicionar(i) {
    setCarrinho(p => ({ ...p, [i]: (p[i] || 0) + 1 }));
  }

  function remover(i) {
    setCarrinho(p => {
      const n = { ...p };
      if (n[i] > 1) n[i]--;
      else delete n[i];
      return n;
    });
  }

  function total() {
    return Object.keys(carrinho)
      .reduce((t, i) => t + doces[i].preco * carrinho[i], 0);
  }

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validar() {

    for (let k in form) {
      if (!form[k]) {
        alert("Preencha todos os dados.");
        return false;
      }
    }

    if (Object.keys(carrinho).length === 0) {
      alert("Escolha um produto.");
      return false;
    }

    return true;
  }
  function formatarDataBR(data) {
    const d = new Date(data + "T00:00:00");
    return d.toLocaleDateString("pt-BR");
  }

  async function enviarZap() {

    if (!validar()) return;
  
    const id = gerarID();
  
    const pedido = {
      id,
      nome: form.nome,
      telefone: form.telefone,
      endereco: form.endereco,
      bairro: form.bairro,
      cep: form.cep,
      pagamento: form.pagamento,
      data: formatarDataBR(form.data),
      itens: Object.keys(carrinho).map(i => ({
        produto: doces[i].nome,
        qtd: carrinho[i],
        preco: doces[i].preco
      })),
      total: total().toFixed(2)
    };
  
    // Envia para Google Sheets
    await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(pedido),
      headers: {
        "Content-Type": "application/json"
      }
    });
  
    // Mensagem WhatsApp
    let msg = `📦 *Pedido #${id}*\n\n`;
  
    msg += `👤 Nome: ${form.nome}\n`;
    msg += `📞 Tel: ${form.telefone}\n`;
    msg += `🏠 Endereço: ${form.endereco}\n`;
    msg += `📍 CEP: ${form.cep}\n`;
    msg += `🏘️ Bairro: ${form.bairro}\n`;
    msg += `💳 Pagamento: ${form.pagamento}\n`;
    msg += `📅 Entrega: ${formatarDataBR(form.data)}\n\n`;
  
    msg += `🍬 *Itens:*\n`;
  
    Object.keys(carrinho).forEach(i => {
      const d = doces[i];
      const q = carrinho[i];
      const s = (d.preco * q).toFixed(2);
  
      msg += `• ${d.nome} - ${q}x → R$ ${s}\n`;
    });
  
    msg += `\n💰 *Total: R$ ${total().toFixed(2)}*`;
  
    const url =
      "https://wa.me/5581988604820?text=" +
      encodeURIComponent(msg);
  
    window.open(url, "_blank");
  } 

  return (
    <div className="container">

      <h1>🍬 Jack Doces</h1>

      <main className="cards">

        {doces.map((d, i) => (

          <div key={i} className="card">

            <div className="imagem-box">
              <img
                src={d.imagem}
                className="foto"
                onClick={() => setZoom(d.imagem)}
              />
            </div>

            <h2>{d.nome}</h2>

            <span>R$ {d.preco.toFixed(2)}</span>

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

      {Object.keys(carrinho).length > 0 && (

        <section className="form">

          <h3>📋 Dados do Cliente</h3>

            <input name="nome" placeholder="Nome completo" onChange={handleForm} />

            <input name="telefone" placeholder="Telefone / WhatsApp" onChange={handleForm} />

            <input name="cep" placeholder="CEP" onChange={handleForm} />

            <input name="bairro" placeholder="Bairro" onChange={handleForm} />

            <input name="endereco" placeholder="Rua e Número" onChange={handleForm} />

            <input name="pagamento" placeholder="Forma de Pagamento (Pix, Cartão, Dinheiro)" onChange={handleForm} />

            <input
              type="date"
              name="data"
              min={new Date().toISOString().split("T")[0]}
              onChange={handleForm}
            />

        </section>

      )}

      {Object.keys(carrinho).length > 0 && (

        <footer>

          <p>Total: R$ {total().toFixed(2)}</p>

          <button className="btn" onClick={enviarZap}>
            <Phone size={18} /> Finalizar Pedido
          </button>

        </footer>

      )}

      {zoom && (

        <div className="zoom">

          <button onClick={() => setZoom(null)}>
            <X size={28} />
          </button>

          <img src={zoom} />

        </div>

      )}

    </div>
  );
}
