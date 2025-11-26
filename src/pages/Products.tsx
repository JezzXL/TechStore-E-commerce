import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, X, Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import type { FilterOptions } from '../types';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  
  // Obtém os parâmetros da URL
  const urlSearch = searchParams.get('search') || '';
  const urlCategory = searchParams.get('category') || 'all';
  
  const [filters, setFilters] = useState<FilterOptions>({
    category: urlCategory,
    minPrice: 0,
    maxPrice: 10000,
    sortBy: 'name',
  });
  
  const [searchQuery, setSearchQuery] = useState(urlSearch);

  // Atualiza filtros quando a URL muda
  useEffect(() => {
    const newCategory = searchParams.get('category') || 'all';
    const newSearch = searchParams.get('search') || '';
    
    setFilters(prev => ({ ...prev, category: newCategory }));
    setSearchQuery(newSearch);
  }, [searchParams]);

  const categories = ['all', ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      // Filtro de busca
      const matchesSearch = !searchQuery || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());

      // Filtro de categoria
      const matchesCategory =
        filters.category === 'all' || product.category === filters.category;
      
      // Filtro de preço
      const matchesPrice =
        product.price >= filters.minPrice && product.price <= filters.maxPrice;

      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Ordenação
    switch (filters.sortBy) {
      case 'price-asc':
        return [...filtered].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...filtered].sort((a, b) => b.price - a.price);
      case 'rating':
        return [...filtered].sort((a, b) => b.rating - a.rating);
      case 'name':
      default:
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }
  }, [filters, searchQuery]);

  const handleClearFilters = () => {
    setFilters({ category: 'all', minPrice: 0, maxPrice: 10000, sortBy: 'name' });
    setSearchQuery('');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {searchQuery ? `Resultados para "${searchQuery}"` : 'Nossos Produtos'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Filtros
              </h2>

              {/* Search Filter */}
              {searchQuery && (
                <div className="mb-6 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Search className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm text-blue-600 dark:text-blue-400 font-medium truncate">
                        {searchQuery}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSearchParams({});
                      }}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Categoria
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => {
                    setFilters({ ...filters, category: e.target.value });
                    if (e.target.value === 'all') {
                      searchParams.delete('category');
                    } else {
                      searchParams.set('category', e.target.value);
                    }
                    setSearchParams(searchParams);
                  }}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === 'all' ? 'Todas' : cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Faixa de Preço
                </label>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-600 dark:text-gray-400">Mínimo</label>
                    <input
                      type="number"
                      value={filters.minPrice}
                      onChange={(e) => setFilters({ ...filters, minPrice: Number(e.target.value) })}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 dark:text-gray-400">Máximo</label>
                    <input
                      type="number"
                      value={filters.maxPrice}
                      onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Sort */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Ordenar por
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as FilterOptions['sortBy'] })}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="name">Nome</option>
                  <option value="price-asc">Menor Preço</option>
                  <option value="price-desc">Maior Preço</option>
                  <option value="rating">Melhor Avaliação</option>
                </select>
              </div>

              <button
                onClick={handleClearFilters}
                className="w-full py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Limpar Filtros
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden mb-4 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              <Filter className="w-5 h-5" />
              Filtros
            </button>

            {/* Mobile Filters Modal */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed inset-0 bg-black/50 z-50 lg:hidden"
                onClick={() => setShowFilters(false)}
              >
                <motion.div
                  initial={{ x: -300 }}
                  animate={{ x: 0 }}
                  className="w-80 h-full bg-white dark:bg-gray-800 p-6 overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Filtros
                    </h2>
                    <button onClick={() => setShowFilters(false)}>
                      <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Categoria
                      </label>
                      <select
                        value={filters.category}
                        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat === 'all' ? 'Todas' : cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Ordenar por
                      </label>
                      <select
                        value={filters.sortBy}
                        onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as FilterOptions['sortBy'] })}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                      >
                        <option value="name">Nome</option>
                        <option value="price-asc">Menor Preço</option>
                        <option value="price-desc">Maior Preço</option>
                        <option value="rating">Melhor Avaliação</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="w-24 h-24 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
                <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">
                  Nenhum produto encontrado
                </p>
                <p className="text-gray-500 dark:text-gray-500 text-sm mb-6">
                  Tente ajustar os filtros ou fazer uma nova busca
                </p>
                <button
                  onClick={handleClearFilters}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Limpar Filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;