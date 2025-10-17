import { motion } from 'framer-motion';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useFavoritesStore } from '../stores/useFavoritesStore';

const Favorites = () => {
  const { getFavoriteProducts } = useFavoritesStore();
  const favoriteProducts = getFavoriteProducts();

  if (favoriteProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Heart className="w-24 h-24 mx-auto text-gray-400 dark:text-gray-600 mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Nenhum favorito ainda
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Comece a adicionar produtos aos seus favoritos clicando no ❤️
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-10 h-10 text-red-500 fill-red-500" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Meus Favoritos
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            {favoriteProducts.length} {favoriteProducts.length === 1 ? 'produto' : 'produtos'} salvos
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 p-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl text-center"
        >
          <ShoppingBag className="w-16 h-16 mx-auto text-white mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">
            Pronto para comprar?
          </h3>
          <p className="text-blue-100 mb-6">
            Adicione seus produtos favoritos ao carrinho e finalize sua compra!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
            >
              Continuar Comprando
            </Link>
            <Link
              to="/cart"
              className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold"
            >
              Ver Carrinho
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Favorites;