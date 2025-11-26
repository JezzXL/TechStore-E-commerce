import { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Home, ShoppingBag } from 'lucide-react';

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderNumber, total } = location.state || {};

  useEffect(() => {
    if (!orderNumber) {
      navigate('/');
    }
  }, [orderNumber, navigate]);

  if (!orderNumber) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-14 h-14 text-green-600 dark:text-green-400" />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Pedido Realizado com Sucesso!
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-600 dark:text-gray-400 mb-8"
          >
            Obrigado pela sua compra! Seu pedido foi confirmado e está sendo processado.
          </motion.p>

          {/* Order Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Número do Pedido
                </p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  #{orderNumber}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Valor Total
                </p>
                <p className="text-xl font-bold text-green-600 dark:text-green-400">
                  R$ {total?.toFixed(2)}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Info Boxes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          >
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <Package className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                Email Enviado
              </p>
              <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                Confirmação no seu email
              </p>
            </div>

            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <Package className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-purple-900 dark:text-purple-100">
                Em Preparação
              </p>
              <p className="text-xs text-purple-700 dark:text-purple-300 mt-1">
                Separando seu pedido
              </p>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <Package className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-green-900 dark:text-green-100">
                Entrega Rápida
              </p>
              <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                Até 5 dias úteis
              </p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-lg hover:shadow-xl"
            >
              <Home className="w-5 h-5" />
              Voltar ao Início
            </Link>

            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-semibold"
            >
              <ShoppingBag className="w-5 h-5" />
              Continuar Comprando
            </Link>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Você receberá atualizações sobre seu pedido por email e SMS.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Dúvidas? Entre em contato conosco pelo WhatsApp: (11) 99999-9999
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderSuccess;