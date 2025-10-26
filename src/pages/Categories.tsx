import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Smartphone, Headphones, Monitor, Keyboard, Camera, HardDrive, Gamepad2, Watch } from 'lucide-react';
import { products } from '../data/products';

const Categories = () => {
  // Conta produtos por categoria
  const categoryCounts = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categories = [
    {
      name: 'Eletrônicos',
      slug: 'Eletrônicos',
      icon: Smartphone,
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=400&fit=crop',
      description: 'Smartphones, tablets e mais',
      color: 'from-blue-500 to-blue-700',
      count: categoryCounts['Eletrônicos'] || 0,
    },
    {
      name: 'Áudio',
      slug: 'Áudio',
      icon: Headphones,
      image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=400&fit=crop',
      description: 'Fones, caixas de som e áudio',
      color: 'from-purple-500 to-purple-700',
      count: categoryCounts['Áudio'] || 0,
    },
    {
      name: 'Monitores',
      slug: 'Monitores',
      icon: Monitor,
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=400&fit=crop',
      description: 'Monitores 4K, gamers e profissionais',
      color: 'from-green-500 to-green-700',
      count: categoryCounts['Monitores'] || 0,
    },
    {
      name: 'Periféricos',
      slug: 'Periféricos',
      icon: Keyboard,
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=400&fit=crop',
      description: 'Teclados, mouses e acessórios',
      color: 'from-red-500 to-red-700',
      count: categoryCounts['Periféricos'] || 0,
    },
    {
      name: 'Fotografia',
      slug: 'Fotografia',
      icon: Camera,
      image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&h=400&fit=crop',
      description: 'Câmeras e equipamentos fotográficos',
      color: 'from-yellow-500 to-yellow-700',
      count: categoryCounts['Fotografia'] || 0,
    },
    {
      name: 'Armazenamento',
      slug: 'Armazenamento',
      icon: HardDrive,
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&h=400&fit=crop',
      description: 'SSDs, HDs e pendrives',
      color: 'from-indigo-500 to-indigo-700',
      count: categoryCounts['Armazenamento'] || 0,
    },
    {
      name: 'Wearables',
      slug: 'Wearables',
      icon: Watch,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop',
      description: 'Smartwatches e acessórios',
      color: 'from-pink-500 to-pink-700',
      count: categoryCounts['Wearables'] || 0,
    },
    {
      name: 'Gaming',
      slug: 'Gaming',
      icon: Gamepad2,
      image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=600&h=400&fit=crop',
      description: 'Equipamentos para gamers',
      color: 'from-orange-500 to-orange-700',
      count: 0,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Explore por Categoria
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Encontre exatamente o que você precisa navegando pelas nossas categorias
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Link
                  to={`/products?category=${encodeURIComponent(category.slug)}`}
                  className="block group"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
                    {/* Image with Gradient Overlay */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60`}></div>
                      
                      {/* Icon */}
                      <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Icon className="w-6 h-6 text-gray-900 dark:text-white" />
                      </div>

                      {/* Product Count Badge */}
                      {category.count > 0 && (
                        <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-full">
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {category.count} {category.count === 1 ? 'produto' : 'produtos'}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {category.description}
                      </p>

                      {/* Arrow */}
                      <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:translate-x-2 transition-transform">
                        Ver produtos
                        <svg
                          className="w-4 h-4 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 p-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-center"
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            Não encontrou o que procurava?
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Entre em contato com nossa equipe e ajudaremos você a encontrar o produto perfeito!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold shadow-lg"
            >
              Ver Todos os Produtos
            </Link>
            <button className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold">
              Fale Conosco
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Categories;