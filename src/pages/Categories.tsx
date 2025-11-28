// src/pages/Categories.tsx

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Smartphone, Headphones, Monitor, Keyboard, Camera, HardDrive, Watch, Gamepad2, ArrowRight } from 'lucide-react';
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
      count: categoryCounts['Eletrônicos'] || 0,
    },
    {
      name: 'Áudio',
      slug: 'Áudio',
      icon: Headphones,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop',
      description: 'Fones, caixas de som e áudio',
      count: categoryCounts['Áudio'] || 0,
    },
    {
      name: 'Monitores',
      slug: 'Monitores',
      icon: Monitor,
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=400&fit=crop',
      description: 'Monitores 4K e profissionais',
      count: categoryCounts['Monitores'] || 0,
    },
    {
      name: 'Periféricos',
      slug: 'Periféricos',
      icon: Keyboard,
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=400&fit=crop',
      description: 'Teclados, mouses e acessórios',
      count: categoryCounts['Periféricos'] || 0,
    },
    {
      name: 'Fotografia',
      slug: 'Fotografia',
      icon: Camera,
      image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&h=400&fit=crop',
      description: 'Câmeras e equipamentos',
      count: categoryCounts['Fotografia'] || 0,
    },
    {
      name: 'Armazenamento',
      slug: 'Armazenamento',
      icon: HardDrive,
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&h=400&fit=crop',
      description: 'SSDs, HDs e pendrives',
      count: categoryCounts['Armazenamento'] || 0,
    },
    {
      name: 'Wearables',
      slug: 'Wearables',
      icon: Watch,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop',
      description: 'Smartwatches e acessórios',
      count: categoryCounts['Wearables'] || 0,
    },
    {
      name: 'Gaming',
      slug: 'Gaming',
      icon: Gamepad2,
      image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=600&h=400&fit=crop',
      description: 'Equipamentos para gamers',
      count: 0,
    },
  ];

  return (
    <div className="min-h-screen bg-white pt-20 pb-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="py-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Explore por Categoria
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Encontre exatamente o que você precisa navegando pelas nossas categorias
            </p>
          </motion.div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={`/products?category=${encodeURIComponent(category.slug)}`}
                  className="group block bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Icon Badge */}
                    <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
                      <Icon className="w-6 h-6 text-gray-900" />
                    </div>

                    {/* Product Count Badge */}
                    {category.count > 0 && (
                      <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full">
                        <span className="text-sm font-semibold text-gray-900">
                          {category.count} {category.count === 1 ? 'produto' : 'produtos'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {category.description}
                    </p>

                    {/* Arrow */}
                    <div className="flex items-center text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                      <span>Explorar</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-900 rounded-3xl p-12 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-4">
            Não encontrou o que procurava?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
            Entre em contato com nossa equipe e ajudaremos você a encontrar o produto perfeito
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Ver Todos os Produtos
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-gray-900 transition-colors font-semibold">
              Falar com Suporte
            </button>
          </div>
        </motion.div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-4">
              <Smartphone className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Produtos Originais
            </h3>
            <p className="text-gray-600">
              100% autenticidade garantida em todos os produtos
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-full mb-4">
              <HardDrive className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Entrega Rápida
            </h3>
            <p className="text-gray-600">
              Frete grátis acima de R$ 500 para todo o Brasil
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-50 rounded-full mb-4">
              <Camera className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Garantia Estendida
            </h3>
            <p className="text-gray-600">
              12 meses de garantia em todos os produtos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;