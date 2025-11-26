import { useState } from 'react';
import { MapPin, Loader2 } from 'lucide-react';
import type { CheckoutFormData, CheckoutErrors } from '../../types/checkout';

interface AddressFormProps {
  formData: CheckoutFormData;
  errors: CheckoutErrors;
  onChange: (field: keyof CheckoutFormData, value: string) => void;
}

const AddressForm = ({ formData, errors, onChange }: AddressFormProps) => {
  const [loadingCep, setLoadingCep] = useState(false);

  const formatZipCode = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 8) {
      return numbers.replace(/(\d{5})(\d{3})/, '$1-$2');
    }
    return value;
  };

  const searchCep = async (cep: string) => {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length !== 8) return;

    setLoadingCep(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await response.json();

      if (!data.erro) {
        onChange('street', data.logradouro || '');
        onChange('neighborhood', data.bairro || '');
        onChange('city', data.localidade || '');
        onChange('state', data.uf || '');
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    } finally {
      setLoadingCep(false);
    }
  };

  const handleZipCodeChange = (value: string) => {
    const formatted = formatZipCode(value);
    onChange('zipCode', formatted);
    
    if (formatted.replace(/\D/g, '').length === 8) {
      searchCep(formatted);
    }
  };

  const brazilianStates = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Endereço de Entrega
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* CEP */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              CEP *
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.zipCode}
                onChange={(e) => handleZipCodeChange(e.target.value)}
                className={`w-full pr-10 pl-4 py-3 border ${
                  errors.zipCode ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="00000-000"
                maxLength={9}
              />
              {loadingCep && (
                <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-600 animate-spin" />
              )}
            </div>
            {errors.zipCode && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.zipCode}</p>
            )}
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Digite o CEP para buscar automaticamente
            </p>
          </div>

          {/* Estado */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Estado *
            </label>
            <select
              value={formData.state}
              onChange={(e) => onChange('state', e.target.value)}
              className={`w-full px-4 py-3 border ${
                errors.state ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="">Selecione</option>
              {brazilianStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.state && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.state}</p>
            )}
          </div>

          {/* Rua */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Rua *
            </label>
            <input
              type="text"
              value={formData.street}
              onChange={(e) => onChange('street', e.target.value)}
              className={`w-full px-4 py-3 border ${
                errors.street ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Rua das Flores"
            />
            {errors.street && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.street}</p>
            )}
          </div>

          {/* Número */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Número *
            </label>
            <input
              type="text"
              value={formData.number}
              onChange={(e) => onChange('number', e.target.value)}
              className={`w-full px-4 py-3 border ${
                errors.number ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="123"
            />
            {errors.number && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.number}</p>
            )}
          </div>

          {/* Complemento */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Complemento
            </label>
            <input
              type="text"
              value={formData.complement || ''}
              onChange={(e) => onChange('complement', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Apto 101"
            />
          </div>

          {/* Bairro */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Bairro *
            </label>
            <input
              type="text"
              value={formData.neighborhood}
              onChange={(e) => onChange('neighborhood', e.target.value)}
              className={`w-full px-4 py-3 border ${
                errors.neighborhood ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Centro"
            />
            {errors.neighborhood && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.neighborhood}</p>
            )}
          </div>

          {/* Cidade */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Cidade *
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => onChange('city', e.target.value)}
              className={`w-full px-4 py-3 border ${
                errors.city ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="São Paulo"
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.city}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;