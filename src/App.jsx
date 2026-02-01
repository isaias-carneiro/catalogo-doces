import React, { useState } from "react";
import {
  ShoppingCart,
  Plus,
  Minus,
  Send,
  Heart,
  Info,
  X,
  Trash2,
} from "lucide-react";

const products = [
  {
    id: 1,
    name: "Apliques",
    price: 2.0,
    category: "Modelados de Leite",
    description: "Pequenos detalhes decorativos comestíveis.",
    imageUrl: "https://i.imgur.com/K1RkMAt.jpeg",
  },
  {
    id: 2,
    name: "Frutinhas",
    price: 2.0,
    category: "Modelados de Leite",
    description: "Miniaturas de frutas modeladas à mão.",
    imageUrl: "https://i.imgur.com/2s42q1s.jpeg",
  },
  {
    id: 3,
    name: "Doces Detalhados na Base",
    price: 2.5,
    category: "Modelados de Leite",
    description: "Doces com acabamento refinado sobre base.",
    imageUrl: "https://i.imgur.com/4cW296v.jpeg",
  },
  {
    id: 4,
    name: "Doces Modelados 2D na Base",
    price: 3.0,
    category: "Modelados de Leite",
    description: "Personagens ou itens em relevo plano (2D).",
    imageUrl: "https://i.imgur.com/8Qj8E7x.jpeg",
  },
  {
    id: 5,
    name: "Doces Modelados 3D sem Base",
    price: 3.5,
    category: "Modelados de Leite",
    description: "Esculturas completas em 3D (personagens/itens).",
    imageUrl: "https://i.imgur.com/W2oW643.jpeg",
  },
  {
    id: 6,
    name: "Versões Maiores",
    price: 8.0,
    category: "Especiais",
    description: "Tamanhos personalizados (Valor a partir de).",
    isStartingPrice: true,
    imageUrl: "https://i.imgur.com/z19f9Pz.jpeg",
  },
];

const WHATSAPP_NUMBER = "5583986609978";

export default function App() {
  const [cart, setCart] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);

  function addToCart(product) {
    setCart((prev) => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1,
    }));
  }

  function removeFromCart(id) {
    setCart((prev) => {
      const copy = { ...prev };

      if (copy[id] > 1) copy[id]--;
      else delete copy[id];

      return copy;
    });
  }

  function deleteFromCart(id) {
    setCart((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  }

  function getTotal() {
    return Object.entries(cart).reduce((total, [id, qtd]) => {
      const product = products.find((p) => p.id === Number(id));
      return total + (product ? product.price * qtd : 0);
    }, 0);
  }

  function getItems() {
    return Object.values(cart).reduce((s, q) => s + q, 0);
  }

  function formatMoney(v) {
    return v.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function whatsappLink() {
    let msg = "*Olá! Gostaria de fazer um pedido:*%0A%0A";

    Object.entries(cart).forEach(([id, qtd]) => {
      const p = products.find((p) => p.id === Number(id));
      if (p) {
        msg += `• ${qtd}x ${p.name} - ${formatMoney(
          p.price * qtd
        )}%0A`;
      }
    });

    msg += `%0A*Total: ${formatMoney(getTotal())}*`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
  }

  return (
    <div className="min-h-screen bg-pink-50 pb-24">
      {/* Header */}
      <header className="bg-white shadow border-b border-pink-100 text-center p-6">
        <div className="flex justify-center items-center gap-2">
          <Heart className="text-pink-600 fill-pink-600" />
          <h1 className="text-3xl font-bold text-pink-900">
            Catálogo de Preços
          </h1>
          <Heart className="text-pink-600 fill-pink-600" />
        </div>

        <p className="text-pink-600 mt-1">Modelados de Leite</p>
      </header>

      {/* Produtos */}
      <main className="max-w-3xl mx-auto p-4 space-y-4">
        {products.map((p) => {
          const qtd = cart[p.id] || 0;

          return (
            <div
              key={p.id}
              className="bg-white p-4 rounded-xl shadow flex gap-4"
            >
              <img
                src={p.imageUrl}
                alt={p.name}
                className="w-20 h-20 rounded-full object-cover"
              />

              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-bold text-pink-900">
                    {p.name}
                  </h3>

                  <span className="font-bold text-pink-700">
                    {formatMoney(p.price)}
                  </span>
                </div>

                <p className="text-sm text-gray-500">
                  {p.description}
                </p>

                {p.isStartingPrice && (
                  <p className="text-xs text-amber-600 flex gap-1 mt-1">
                    <Info size={12} /> Consultar valor
                  </p>
                )}
              </div>

              {/* Controles */}
              <div className="flex flex-col items-center gap-2">
                {qtd > 0 ? (
                  <>
                    <button
                      onClick={() => addToCart(p)}
                      className="bg-pink-500 text-white px-2 rounded"
                    >
                      <Plus size={16} />
                    </button>

                    <span>{qtd}</span>

                    <button
                      onClick={() => removeFromCart(p.id)}
                      className="bg-pink-200 px-2 rounded"
                    >
                      <Minus size={16} />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => addToCart(p)}
                    className="bg-pink-500 text-white px-3 py-2 rounded"
                  >
                    <Plus size={16} /> Add
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </main>

      {/* Carrinho */}
      {getItems() > 0 && (
        <div className="fixed bottom-0 w-full bg-white p-4 border-t flex justify-between items-center">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart />
            <span>{getItems()} itens</span>
            <strong>{formatMoney(getTotal())}</strong>
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="bg-pink-600 text-white px-4 py-2 rounded"
          >
            Ver Pedido
          </button>
        </div>
      )}

      {/* Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-end">
          <div className="bg-white w-full max-w-md rounded-t-xl p-4">
            <div className="flex justify-between mb-3">
              <h2 className="font-bold">Seu Pedido</h2>

              <button
                onClick={() => setIsCartOpen(false)}
              >
                <X />
              </button>
            </div>

            {Object.entries(cart).map(([id, qtd]) => {
              const p = products.find(
                (p) => p.id === Number(id)
              );

              return (
                <div
                  key={id}
                  className="flex justify-between mb-2"
                >
                  <span>
                    {qtd}x {p.name}
                  </span>

                  <span>
                    {formatMoney(p.price * qtd)}
                  </span>

                  <button
                    onClick={() =>
                      deleteFromCart(p.id)
                    }
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              );
            })}

            <hr className="my-3" />

            <p className="font-bold text-right mb-3">
              Total: {formatMoney(getTotal())}
            </p>

            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="block bg-green-500 text-white text-center py-3 rounded"
            >
              <Send size={18} className="inline" /> Enviar no
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
