import { CreditCard, Smartphone, FileText, DollarSign } from 'lucide-react';
import type { CheckoutFormData, CheckoutErrors, PaymentMethod } from '../../types/checkout';

interface PaymentFormProps {
  formData: CheckoutFormData;
  errors: CheckoutErrors;
  onChange: (field: keyof CheckoutFormData, value: string) => void;
  total: number;
}

const PaymentForm = ({ formData, errors, onChange, total }: PaymentFormProps) => {
  const paymentMethods: PaymentMethod[] = [
    {
      id: 'credit',
      name: 'Cartão de Crédito',
      icon: 'credit-card',
      description: 'Parcele em até 12x sem juros',
    },
    {
      id: 'debit',
      name: 'Cartão de Débito',
      icon: 'credit-card',
      description: 'À vista com aprovação imediata',
    },
    {
      id: 'pix',
      name: 'PIX',
      icon: 'smartphone',
      description: '5% de desconto',
      discount: 5,
    },
    {
      id: 'boleto',
      name: 'Boleto Bancário',
      icon: 'file-text',
      description: '3% de desconto',
      discount: 3,
    },
  ];

  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
  };

  const formatExpiry = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length >= 2) {
      return numbers.slice(0, 2) + '/' + numbers.slice(2, 4);
    }
    return numbers;
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'credit-card':
        return CreditCard;
      case 'smartphone':
        return Smartphone;
      case 'file-text':
        return FileText;
      default:
        return DollarSign;
    }
  };

  const calculateFinalPrice = (method: string) => {
    const methodObj = paymentMethods.find(m => m.id === method);
    if (methodObj?.discount) {
      return total * (1 - methodObj.discount / 100);
    }
    return total;
  };

  const showCardFields = formData.paymentMethod === 'credit' || formData.paymentMethod === 'debit';

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Forma de Pagamento
        </h3>

        {/* Payment Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {paymentMethods.map((method) => {
            const Icon = getIcon(method.icon);
            const isSelected = formData.paymentMethod === method.id;
            const finalPrice = calculateFinalPrice(method.id);

            return (
              <button
                key={method.id}
                type="button"
                onClick={() => onChange('paymentMethod', method.id)}
                className={`relative p-4 border-2 rounded-lg text-left transition-all ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {method.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {method.description}
                    </p>
                    {method.discount && (
                      <div className="mt-2">
                        <span className="text-xs font-medium text-green-600 dark:text-green-400">
                          Economize R$ {(total - finalPrice).toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Card Fields */}
        {showCardFields && (
          <div className="space-y-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
              Dados do Cartão
            </h4>

            {/* Card Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Número do Cartão *
              </label>
              <input
                type="text"
                value={formData.cardNumber || ''}
                onChange={(e) => onChange('cardNumber', formatCardNumber(e.target.value))}
                className={`w-full px-4 py-3 border ${
                  errors.cardNumber ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="0000 0000 0000 0000"
                maxLength={19}
              />
              {errors.cardNumber && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.cardNumber}</p>
              )}
            </div>

            {/* Card Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nome no Cartão *
              </label>
              <input
                type="text"
                value={formData.cardName || ''}
                onChange={(e) => onChange('cardName', e.target.value.toUpperCase())}
                className={`w-full px-4 py-3 border ${
                  errors.cardName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="NOME COMO NO CARTÃO"
              />
              {errors.cardName && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.cardName}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Expiry */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Validade *
                </label>
                <input
                  type="text"
                  value={formData.cardExpiry || ''}
                  onChange={(e) => onChange('cardExpiry', formatExpiry(e.target.value))}
                  className={`w-full px-4 py-3 border ${
                    errors.cardExpiry ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="MM/AA"
                  maxLength={5}
                />
                {errors.cardExpiry && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.cardExpiry}</p>
                )}
              </div>

              {/* CVV */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  CVV *
                </label>
                <input
                  type="text"
                  value={formData.cardCvv || ''}
                  onChange={(e) => onChange('cardCvv', e.target.value.replace(/\D/g, ''))}
                  className={`w-full px-4 py-3 border ${
                    errors.cardCvv ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="123"
                  maxLength={4}
                />
                {errors.cardCvv && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.cardCvv}</p>
                )}
              </div>
            </div>

            {/* Installments (only for credit) */}
            {formData.paymentMethod === 'credit' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Parcelas
                </label>
                <select
                  value={formData.installments || 1}
                  onChange={(e) => onChange('installments', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>
                      {num}x de R$ {(total / num).toFixed(2)} sem juros
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}

        {/* PIX Instructions */}
        {formData.paymentMethod === 'pix' && (
          <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-start gap-3">
              <Smartphone className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                  Pagamento via PIX
                </h4>
                <p className="text-sm text-green-800 dark:text-green-200 mb-3">
                  Após confirmar o pedido, você receberá um QR Code para pagamento instantâneo.
                </p>
                <p className="text-sm font-medium text-green-900 dark:text-green-100">
                  Total com desconto: R$ {calculateFinalPrice('pix').toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Boleto Instructions */}
        {formData.paymentMethod === 'boleto' && (
          <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-3">
              <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  Pagamento via Boleto
                </h4>
                <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                  O boleto será enviado por email e terá vencimento em 3 dias úteis.
                </p>
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  Total com desconto: R$ {calculateFinalPrice('boleto').toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentForm;