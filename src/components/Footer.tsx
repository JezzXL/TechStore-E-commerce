// src/components/Footer.tsx

import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: 'Todos os Produtos', path: '/products' },
      { name: 'Categorias', path: '/categories' },
      { name: 'Ofertas', path: '/products' },
      { name: 'Lançamentos', path: '/products' },
    ],
    support: [
      { name: 'Central de Ajuda', path: '#' },
      { name: 'Rastreamento', path: '#' },
      { name: 'Trocas e Devoluções', path: '#' },
      { name: 'Garantia', path: '#' },
    ],
    company: [
      { name: 'Sobre Nós', path: '#' },
      { name: 'Trabalhe Conosco', path: '#' },
      { name: 'Sustentabilidade', path: '#' },
      { name: 'Imprensa', path: '#' },
    ],
    legal: [
      { name: 'Termos de Uso', path: '#' },
      { name: 'Política de Privacidade', path: '#' },
      { name: 'Cookies', path: '#' },
      { name: 'Acessibilidade', path: '#' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, label: 'Facebook', href: '#' },
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' },
    { icon: Youtube, label: 'YouTube', href: '#' },
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      {/* Newsletter Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Fique por dentro das novidades
              </h3>
              <p className="text-sm text-gray-600">
                Receba ofertas exclusivas e lançamentos direto no seu email
              </p>
            </div>
            <form className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="Seu email"
                className="flex-1 md:w-80 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-gray-300"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap"
              >
                Inscrever
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          {/* Logo & Description */}
          <div className="col-span-2">
            <Link to="/" className="inline-block mb-4">
              <span className="text-xl font-semibold text-gray-900">TechStore</span>
            </Link>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Sua loja de tecnologia de confiança. Produtos de qualidade com os melhores preços e atendimento excepcional.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>(11) 99999-9999</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span>contato@techstore.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>São Paulo, Brasil</span>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Comprar</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Suporte</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.path}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.path}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.path}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-sm text-gray-600">
              © {currentYear} TechStore. Todos os direitos reservados.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500">Formas de pagamento:</span>
              <div className="flex gap-2">
                <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-[8px] font-bold text-gray-600">VISA</span>
                </div>
                <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-[8px] font-bold text-gray-600">MC</span>
                </div>
                <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-[8px] font-bold text-gray-600">PIX</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;