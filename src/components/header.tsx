// src/components/header.tsx

import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, User, Heart } from 'lucide-react';
import { useCartStore } from '../stores/useCartStore';
import { useFavoritesStore } from '../stores/useFavoritesStore';
import { products } from '../data/products';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  const { getCartItemsCount, user } = useCartStore();
  const { favorites } = useFavoritesStore();

  const cartItemsCount = getCartItemsCount();
  const favoritesCount = favorites.length;

  // Detecta scroll para adicionar sombra
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filtra produtos baseado na busca
  const searchResults = searchQuery.trim()
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setShowSearchResults(false);
      setSearchQuery('');
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowSearchResults(e.target.value.trim().length > 0);
  };

  const handleProductClick = () => {
    setShowSearchResults(false);
    setSearchQuery('');
  };

  return (
    <header 
      className={`fixed top-0 w-full bg-white z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <ShoppingCart className="w-7 h-7 text-gray-900 group-hover:text-blue-600 transition-colors" />
            <span className="text-xl font-semibold text-gray-900 tracking-tight">
              TechStore
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8" ref={searchRef}>
            <form onSubmit={handleSearch} className="relative w-full">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar produtos, categorias..."
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  onFocus={() => searchQuery.trim() && setShowSearchResults(true)}
                  className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-gray-900 text-sm focus:outline-none focus:bg-white focus:border-gray-300 transition-all"
                />
              </div>

              {/* Search Results Dropdown */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-xl border border-gray-100 max-h-96 overflow-y-auto z-50">
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      to={`/products?search=${encodeURIComponent(product.name)}`}
                      onClick={handleProductClick}
                      className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-14 h-14 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {product.category}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        R$ {product.price.toFixed(2)}
                      </span>
                    </Link>
                  ))}
                  <button
                    onClick={handleSearch}
                    className="w-full p-3 text-center text-sm text-blue-600 hover:bg-blue-50 font-medium transition-colors"
                  >
                    Ver todos os resultados
                  </button>
                </div>
              )}

              {/* No Results */}
              {showSearchResults && searchQuery.trim() && searchResults.length === 0 && (
                <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-6 text-center">
                  <p className="text-gray-500 text-sm">
                    Nenhum produto encontrado para "<strong>{searchQuery}</strong>"
                  </p>
                </div>
              )}
            </form>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/products"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Produtos
            </Link>
            <Link
              to="/categories"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Categorias
            </Link>

            <div className="w-px h-6 bg-gray-200 mx-2"></div>

            {/* User */}
            <Link
              to={user ? '/profile' : '/login'}
              className="p-2.5 rounded-lg hover:bg-gray-50 transition-colors group relative"
              title={user ? 'Perfil' : 'Entrar'}
            >
              <User className="w-5 h-5 text-gray-700 group-hover:text-gray-900" />
            </Link>

            {/* Favorites */}
            <Link 
              to="/favorites" 
              className="relative p-2.5 rounded-lg hover:bg-gray-50 transition-colors group"
              title="Favoritos"
            >
              <Heart className="w-5 h-5 text-gray-700 group-hover:text-gray-900" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link 
              to="/cart" 
              className="relative p-2.5 rounded-lg hover:bg-gray-50 transition-colors group"
              title="Carrinho"
            >
              <ShoppingCart className="w-5 h-5 text-gray-700 group-hover:text-gray-900" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-50"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-4 space-y-3">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={handleSearchInputChange}
                className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-gray-900 text-sm"
              />
            </form>

            <Link
              to="/products"
              onClick={() => setIsMenuOpen(false)}
              className="block py-2 text-gray-700 hover:text-gray-900 font-medium"
            >
              Produtos
            </Link>
            <Link
              to="/categories"
              onClick={() => setIsMenuOpen(false)}
              className="block py-2 text-gray-700 hover:text-gray-900 font-medium"
            >
              Categorias
            </Link>
            <Link
              to="/favorites"
              onClick={() => setIsMenuOpen(false)}
              className="block py-2 text-gray-700 hover:text-gray-900 font-medium"
            >
              Favoritos ({favoritesCount})
            </Link>
            <Link
              to="/cart"
              onClick={() => setIsMenuOpen(false)}
              className="block py-2 text-gray-700 hover:text-gray-900 font-medium"
            >
              Carrinho ({cartItemsCount})
            </Link>
            <Link
              to={user ? '/profile' : '/login'}
              onClick={() => setIsMenuOpen(false)}
              className="block py-2 text-gray-700 hover:text-gray-900 font-medium"
            >
              {user ? 'Meu Perfil' : 'Entrar'}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;