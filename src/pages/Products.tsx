import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X, Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import type { FilterOptions } from '../types';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  
  const urlSearch = searchParams.get('search') || '';
  const urlCategory = searchParams.get('category') || 'all';
  
  const [filters, setFilters] = useState<FilterOptions>({
    category: urlCategory,
    minPrice: 0,
    maxPrice: 10000,
    sortBy: 'name',
  });
  
  const [searchQuery, setSearchQuery] = useState(urlSearch);

  useEffect(() => {
    const newCategory = searchParams.get('category') || 'all';
    const newSearch = searchParams.get('search') || '';
    
    setFilters(prev => ({ ...prev, category: newCategory }));
    setSearchQuery(newSearch);
  }, [searchParams]);

  const categories = ['all', ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch = !searchQuery || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        filters.category === 'all' || product.category === filters.category;
      
      const matchesPrice =
        product.price >= filters.minPrice && product.price <= filters.maxPrice;

      return matchesSearch && matchesCategory && matchesPrice;
    });

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
    <div className="min-h-screen bg-white pt-20 pb-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="py-8 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              {searchQuery ? (
                <>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Resultados para "{searchQuery}"
                  </h1>
                  <p className="text-gray-600 mt-2">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
                  </p>
                </>
              ) : (
                <>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Todos os Produtos
                  </h1>
                  <p className="text-gray-600 mt-2">
                    {filteredProducts.length} produtos disponíveis
                  </p>
                </>
              )}
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filtros
            </button>
          </div>
        </div>

        <div className="flex gap-8 mt-8">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Active Search Filter */}
              {searchQuery && (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Search className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">Busca ativa</span>
                    </div>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSearchParams({});
                      }}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-blue-700 truncate">"{searchQuery}"</p>
                </div>
              )}

              {/* Sort */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Ordenar por
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as FilterOptions['sortBy'] })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:bg-white focus:border-gray-300"
                >
                  <option value="name">Nome</option>
                  <option value="price-asc">Menor Preço</option>
                  <option value="price-desc">Maior Preço</option>
                  <option value="rating">Melhor Avaliação</option>
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Categoria
                </label>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setFilters({ ...filters, category: cat });
                        if (cat === 'all') {
                          searchParams.delete('category');
                        } else {
                          searchParams.set('category', cat);
                        }
                        setSearchParams(searchParams);
                      }}
                      className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        filters.category === cat
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {cat === 'all' ? 'Todas as Categorias' : cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Faixa de Preço
                </label>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Mínimo</label>
                    <input
                      type="number"
                      value={filters.minPrice}
                      onChange={(e) => setFilters({ ...filters, minPrice: Number(e.target.value) })}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:bg-white focus:border-gray-300"
                      placeholder="R$ 0"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Máximo</label>
                    <input
                      type="number"
                      value={filters.maxPrice}
                      onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:bg-white focus:border-gray-300"
                      placeholder="R$ 10000"
                    />
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={handleClearFilters}
                className="w-full py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                Limpar Filtros
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filters Modal */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed inset-0 bg-black/50 z-50 lg:hidden"
                onClick={() => setShowFilters(false)}
              >
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  className="absolute right-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold text-gray-900">Filtros</h2>
                    <button onClick={() => setShowFilters(false)}>
                      <X className="w-6 h-6 text-gray-600" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Mobile Sort */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3">
                        Ordenar por
                      </label>
                      <select
                        value={filters.sortBy}
                        onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as FilterOptions['sortBy'] })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                      >
                        <option value="name">Nome</option>
                        <option value="price-asc">Menor Preço</option>
                        <option value="price-desc">Maior Preço</option>
                        <option value="rating">Melhor Avaliação</option>
                      </select>
                    </div>

                    {/* Mobile Categories */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3">
                        Categoria
                      </label>
                      <div className="space-y-2">
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setFilters({ ...filters, category: cat })}
                            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
                              filters.category === cat
                                ? 'bg-gray-900 text-white'
                                : 'bg-gray-50 text-gray-700'
                            }`}
                          >
                            {cat === 'all' ? 'Todas' : cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={handleClearFilters}
                      className="w-full py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium"
                    >
                      Limpar Filtros
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Search className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Nenhum produto encontrado
                </h3>
                <p className="text-gray-600 mb-6">
                  Tente ajustar os filtros ou fazer uma nova busca
                </p>
                <button
                  onClick={handleClearFilters}
                  className="px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
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