import React, { useState } from 'react';
import {
  ShoppingCart,
  Plus,
  Minus,
  Send,
  Heart,
  Info,
  X,
  Trash2
} from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Apliques',
    price: 2.0,
    description: 'Pequenos detalhes decorativos comestíveis.',
    imageUrl: 'https://i.imgur.com/K1RkMAt.jpeg'
  },
  {
    id: 2,
    name: 'Frutinhas',
    price: 2.0,
    description: 'Miniaturas de frutas modeladas à mão.',
    imageUrl: 'https://i.imgur.com/2s42q1s.jpeg'
  },
  {
    id: 3,
    name: 'Doces Detalhados',
    price: 2.5,
    description: 'Doces com acabamento refinado.',
    imageUrl: 'https://i.imgur.com/4cW296v.jpeg'
  },
  {
    id: 4,
    name: 'Modelados 2D',
    price: 3.0,
    description: 'Personagens em relevo.',
    imageUrl: 'https://i.imgur.com/8Qj8E7x.jpeg'
  },
  {
    id: 5,
    name: 'Modelados 3D',
    price: 3.5,
    description: 'Esculturas completas.',
    imageUrl: 'https://i.imgur.com/W2oW643.jpeg'
  },
  {
    id: 6,
    name: 'Versões Maiores',
    price: 8.0,
    description: 'Tamanhos personalizados.',
    imageUrl: 'https://i.imgur.com/z19f9Pz.jpeg',
    isStartingPrice: true
  }
];

const WHATSAPP = '5583986609978';

export default function App() {
  const [cart, setCart] = useState({});
  const [open, setOpen] = useState(false);

  function add(p) {
    setCart(prev => ({
      ...prev,
      [p.id]: (prev[p.id] || 0) + 1
    }));
  }

  function remove(id) {
    setCart(prev => {
      const n = { ...prev };
      if (n[id] > 1) n[id]--;
      else delete n[id];
      return n;
    });
  }

  function del(id) {
    setCart(prev => {
      const n = { ...prev };
      delete n[id];
      return n;
    });
  }

  function total() {
    return Object.entries(cart).reduce((s, [id, q]) => {
      const p = products.find(x => x.id == id);
      return s + (p ? p.price * q : 0);
    }, 0);
  }

  function items() {
    return Object.values(cart).reduce((a, b) => a + b, 0);
  }

  function format(v) {
    return v.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  function whatsapp() {
    let msg = '*Pedido do Catálogo*\n\n';

    Object.entries(cart).forEach(([id, q]) => {
      const p = products.find(x => x.id == id);
      if (p) {
        msg += `• ${q}x ${p.name} - ${format(p.price * q)}\n`;
      }
    });

    msg += `\nTotal: *${format(total())}*`;

    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-100 via-pink-100 to-amber-50 pb-28">

      {/* HEADER */}
      <header className="bg-[#7a1f3d] text-white shadow-lg">
        <div className="max-w-3xl mx-auto py-6 text-center">

          <div className="flex justify-center items-center gap-2">
            <Heart className="fill-yellow-400 text-yellow-400" />
            <h1 className="text-3xl font-bold">
              Catálogo de Doces
            </h1>
            <Heart className="fill-yellow-400 text-yellow-400" />
          </div>

          <p className="text-amber-300 mt-1">
            Modelados Artesanais
          </p>

        </div>
      </header>

      {/* PRODUTOS */}
      <main className="max-w-3xl mx-auto p-4 space-y-4">

        {products.map(p => {
          const q = cart[p.id] || 0;

          return (
            <div
              key={p.id}
              className="bg-white rounded-2xl shadow border border-rose-200 p-4 flex gap-4"
            >

              <img
                src={p.imageUrl}
                className="w-20 h-20 rounded-full border-4 border-amber-300"
              />

              <div className="flex-1">

                <div className="flex justify-between">

                  <h3 className="font-bold text-[#7a1f3d]">
                    {p.name}
                  </h3>

                  <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-lg font-bold text-sm">

                    {p.isStartingPrice && (
                      <span className="text-xs mr-1">
                        A partir
                      </span>
                    )}

                    {format(p.price)}
                  </span>

                </div>

                <p className="text-gray-500 text-sm mt-1">
                  {p.description}
                </p>

                {p.isStartingPrice && (
                  <p className="text-xs text-amber-600 flex gap-1 mt-1">
                    <Info size={12} /> Consulte valor final
                  </p>
                )}

              </div>

              {/* BOTÕES */}
              <div className="flex flex-col items-center gap-1">

                {q > 0 ? (
                  <>
                    <button
                      onClick={() => add(p)}
                      className="bg-pink-200 p-1 rounded"
                    >
                      <Plus size={16} />
                    </button>

                    <span className="font-bold">
                      {q}
                    </span>

                    <button
                      onClick={() => remove(p.id)}
                      className="bg-pink-100 p-1 rounded"
                    >
                      <Minus size={16} />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => add(p)}
                    className="bg-[#7a1f3d] text-white px-3 py-2 rounded-lg text-sm"
                  >
                    Adicionar
                  </button>
                )}

              </div>

            </div>
          );
        })}

      </main>

      {/* BARRA INFERIOR */}
      {items() > 0 && (

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow p-4">

          <div className="max-w-3xl mx-auto flex justify-between items-center">

            <div
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <ShoppingCart />

              <span className="font-bold text-[#7a1f3d]">
                {format(total())}
              </span>

            </div>

            <button
              onClick={() => setOpen(true)}
              className="bg-[#7a1f3d] text-white px-5 py-2 rounded-xl"
            >
              Ver Pedido
            </button>

          </div>

        </div>
      )}

      {/* MODAL */}
      {open && (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-end sm:items-center">

          <div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl h-[80vh] flex flex-col">

            <div className="p-4 bg-[#7a1f3d] text-white flex justify-between">

              <h2 className="font-bold">
                Seu Pedido
              </h2>

              <button onClick={() => setOpen(false)}>
                <X />
              </button>

            </div>

            <div className="flex-1 overflow-auto p-4 space-y-3">

              {Object.entries(cart).map(([id, q]) => {
                const p = products.find(x => x.id == id);

                return (
                  <div
                    key={id}
                    className="flex justify-between items-center border p-2 rounded"
                  >

                    <div>
                      <p className="font-bold">
                        {p.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        {format(p.price)}
                      </p>
                    </div>

                    <div className="flex gap-2 items-center">

                      <span>{q}x</span>

                      <span>
                        {format(p.price * q)}
                      </span>

                      <button
                        onClick={() => del(p.id)}
                        className="text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>

                    </div>

                  </div>
                );
              })}

            </div>

            <div className="p-4 border-t">

              <div className="flex justify-between font-bold mb-3">

                <span>Total</span>
                <span>{format(total())}</span>

              </div>

              <a
                href={whatsapp()}
                target="_blank"
                className="block bg-green-500 text-white text-center py-3 rounded-xl font-bold"
              >
                <Send size={18} className="inline mr-1" />
                Enviar no WhatsApp
              </a>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
