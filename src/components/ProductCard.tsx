import { motion } from 'framer-motion';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { useCartStore } from '../stores/useCartStore';
import { useFavoritesStore } from '../stores/useFavoritesStore';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const { addToCart } = useCartStore();
  const { toggleFavorite, isFavorite } = useFavoritesStore();

  const isFav = isFavorite(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 2000);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(product.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="relative"
    >
      <Link to={`/product/${product.id}`}>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
          {/* Image */}
          <div className="relative h-64 overflow-hidden group">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            
            {/* Favorite Button */}
            <button
              onClick={handleToggleFavorite}
              className="absolute top-3 right-3 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:scale-110 transition-transform"
            >
              <Heart
                className={`w-5 h-5 ${
                  isFav
                    ? 'fill-red-500 text-red-500'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              />
            </button>

            {/* Stock Badge */}
            {product.stock < 10 && (
              <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                Últimas {product.stock} unidades!
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Category */}
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
              {product.category}
            </span>

            {/* Name */}
            <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 min-h-[3.5rem]">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="mt-2 flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {product.rating} ({product.reviews})
              </span>
            </div>

            {/* Description */}
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {product.description}
            </p>

            {/* Price and Actions */}
            <div className="mt-4 flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  R$ {product.price.toFixed(2)}
                </span>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  Em até 12x sem juros
                </p>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-lg hover:shadow-xl"
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
            </div>

            {/* Added to Cart Message */}
            {showAddedMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-3 p-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm text-center rounded-lg font-medium"
              >
                ✓ Adicionado ao carrinho!
              </motion.div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;