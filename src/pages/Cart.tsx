import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Package, Truck, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../stores/useCartStore';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCartStore();

  const total = getCartTotal();
  const shipping = total > 500 ? 0 : 29.90;
  const finalTotal = total + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 pb-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Seu carrinho está vazio
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Explore nossa seleção de produtos e adicione itens ao seu carrinho
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Explorar Produtos
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="py-8 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900">
            Carrinho de Compras
          </h1>
          <p className="text-gray-600 mt-2">
            {cart.length} {cart.length === 1 ? 'item' : 'itens'} no carrinho
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <motion.div
                key={item.product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="bg-white rounded-xl p-6 border border-gray-200"
              >
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div className="flex-shrink-0 w-32 h-32 bg-gray-50 rounded-lg overflow-hidden">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1 min-w-0 pr-4">
                        <h3 className="text-base font-semibold text-gray-900 mb-1">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {item.product.category}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                        aria-label="Remover item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                          disabled={item.quantity <= 1}
                          className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <Minus className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="text-base font-semibold text-gray-900 min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                          className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <Plus className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-sm text-gray-500 mb-1">
                          R$ {item.product.price.toFixed(2)} cada
                        </p>
                        <p className="text-xl font-bold text-gray-900">
                          R$ {(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Continue Shopping */}
            <Link
              to="/products"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium mt-6 transition-colors"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Continuar Comprando
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 sticky top-24">
              {/* Summary Header */}
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">
                  Resumo do Pedido
                </h2>
              </div>

              {/* Summary Content */}
              <div className="p-6 space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">
                    R$ {total.toFixed(2)}
                  </span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Frete</span>
                  <span className={`font-semibold ${shipping === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                    {shipping === 0 ? 'Grátis' : `R$ ${shipping.toFixed(2)}`}
                  </span>
                </div>

                {/* Free Shipping Progress */}
                {total < 500 && (
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Truck className="w-4 h-4 text-blue-600" />
                      <p className="text-sm text-gray-600">
                        Faltam <strong className="text-gray-900">R$ {(500 - total).toFixed(2)}</strong> para frete grátis
                      </p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((total / 500) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-200 flex justify-between">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-gray-900">
                    R$ {finalTotal.toFixed(2)}
                  </span>
                </div>

                <p className="text-xs text-gray-500 text-center">
                  ou 12x de R$ {(finalTotal / 12).toFixed(2)} sem juros
                </p>
              </div>

              {/* Actions */}
              <div className="p-6 border-t border-gray-200 space-y-3">
                <Link
                  to="/checkout"
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold"
                >
                  Finalizar Compra
                  <ArrowRight className="w-5 h-5" />
                </Link>

                {/* Trust Badges */}
                <div className="pt-4 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-50 rounded-full flex items-center justify-center">
                      <Shield className="w-4 h-4 text-green-600" />
                    </div>
                    <span>Compra 100% Segura</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                      <Package className="w-4 h-4 text-blue-600" />
                    </div>
                    <span>Entrega Rápida</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center">
                      <Truck className="w-4 h-4 text-purple-600" />
                    </div>
                    <span>Frete Grátis acima de R$ 500</span>
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