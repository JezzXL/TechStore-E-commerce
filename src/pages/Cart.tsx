import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../stores/useCartStore';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCartStore();

  const total = getCartTotal();
  const shipping = total > 500 ? 0 : 29.90;
  const finalTotal = total + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <ShoppingBag className="w-24 h-24 mx-auto text-gray-400 dark:text-gray-600 mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Seu carrinho está vazio
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Adicione produtos para começar suas compras!
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Ver Produtos
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Carrinho de Compras
          </h1>
          <button
            onClick={clearCart}
            className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
          >
            Limpar Carrinho
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <motion.div
                key={item.product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex gap-6">
                  {/* Product Image */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-32 h-32 object-cover rounded-lg"
                  />

                  {/* Product Info */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {item.product.category}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                      {item.product.description}
                    </p>

                    <div className="flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-semibold text-gray-900 dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                          className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          R$ {(item.product.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">
                          R$ {item.product.price.toFixed(2)} cada
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-24 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Resumo do Pedido
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal ({cart.reduce((acc, item) => acc + item.quantity, 0)} itens)</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Frete</span>
                  <span>{shipping === 0 ? 'Grátis' : `R$ ${shipping.toFixed(2)}`}</span>
                </div>
                {shipping === 0 && (
                  <p className="text-sm text-green-600 dark:text-green-400">
                    ✓ Frete grátis em compras acima de R$ 500
                  </p>
                )}
                {total < 500 && total > 0 && (
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    Faltam R$ {(500 - total).toFixed(2)} para frete grátis!
                  </p>
                )}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                    <span>Total</span>
                    <span>R$ {finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Link
                to="/checkout"
                className="block w-full py-3 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-lg hover:shadow-xl"
              >
                Finalizar Compra
              </Link>

              <Link
                to="/products"
                className="block w-full py-3 mt-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-center rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
              >
                Continuar Comprando
              </Link>

              {/* Security Badges */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-3">
                  Compra 100% segura
                </p>
                <div className="flex justify-center gap-3 opacity-60">
                  <div className="w-12 h-8 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center text-xs font-bold">
                    VISA
                  </div>
                  <div className="w-12 h-8 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center text-xs font-bold">
                    MC
                  </div>
                  <div className="w-12 h-8 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center text-xs font-bold">
                    PIX
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;