import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, ShoppingBag, AlertCircle } from 'lucide-react';
import { useCartStore } from '../stores/useCartStore';
import PersonalInfoForm from '../components/checkout/PersonalInfoForm';
import AddressForm from '../components/checkout/AddressForm';
import PaymentForm from '../components/checkout/PaymentForm';
import type { CheckoutFormData, CheckoutErrors } from '../types/checkout';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCartStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: '',
    email: '',
    phone: '',
    cpf: '',
    zipCode: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    paymentMethod: 'credit',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: '',
    installments: 1,
  });

  const [errors, setErrors] = useState<CheckoutErrors>({});

  const total = getCartTotal();
  const shipping = total > 500 ? 0 : 29.90;
  const finalTotal = total + shipping;

  // Se carrinho vazio, redireciona
  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: CheckoutErrors = {};

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Nome é obrigatório';
      if (!formData.email.trim()) newErrors.email = 'Email é obrigatório';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido';
      if (!formData.phone.trim()) newErrors.phone = 'Telefone é obrigatório';
      if (!formData.cpf.trim()) newErrors.cpf = 'CPF é obrigatório';
      else if (formData.cpf.replace(/\D/g, '').length !== 11) newErrors.cpf = 'CPF inválido';
    }

    if (step === 2) {
      if (!formData.zipCode.trim()) newErrors.zipCode = 'CEP é obrigatório';
      if (!formData.street.trim()) newErrors.street = 'Rua é obrigatória';
      if (!formData.number.trim()) newErrors.number = 'Número é obrigatório';
      if (!formData.neighborhood.trim()) newErrors.neighborhood = 'Bairro é obrigatório';
      if (!formData.city.trim()) newErrors.city = 'Cidade é obrigatória';
      if (!formData.state.trim()) newErrors.state = 'Estado é obrigatório';
    }

    if (step === 3) {
      if (formData.paymentMethod === 'credit' || formData.paymentMethod === 'debit') {
        if (!formData.cardNumber) newErrors.cardNumber = 'Número do cartão é obrigatório';
        else if (formData.cardNumber.replace(/\D/g, '').length < 16) newErrors.cardNumber = 'Número inválido';
        if (!formData.cardName) newErrors.cardName = 'Nome no cartão é obrigatório';
        if (!formData.cardExpiry) newErrors.cardExpiry = 'Validade é obrigatória';
        if (!formData.cardCvv) newErrors.cardCvv = 'CVV é obrigatório';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setIsProcessing(true);
    
    // Simula processamento do pedido
    await new Promise(resolve => setTimeout(resolve, 2000));

    clearCart();
    navigate('/order-success', { 
      state: { 
        orderNumber: Math.floor(Math.random() * 1000000),
        total: finalTotal 
      } 
    });
  };

  const steps = [
    { id: 1, title: 'Dados Pessoais', completed: currentStep > 1 },
    { id: 2, title: 'Endereço', completed: currentStep > 2 },
    { id: 3, title: 'Pagamento', completed: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/cart')}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar ao Carrinho
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Finalizar Compra
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Preencha os dados para concluir seu pedido
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                      currentStep === step.id
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : step.completed
                        ? 'border-green-600 bg-green-600 text-white'
                        : 'border-gray-300 dark:border-gray-600 text-gray-400'
                    }`}
                  >
                    {step.completed ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <span>{step.id}</span>
                    )}
                  </div>
                  <span
                    className={`mt-2 text-sm font-medium ${
                      currentStep === step.id
                        ? 'text-blue-600 dark:text-blue-400'
                        : step.completed
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-gray-400 dark:text-gray-600'
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 mx-4 ${
                      step.completed
                        ? 'bg-green-600'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Forms */}
          <div className="lg:col-span-2">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8"
            >
              {currentStep === 1 && (
                <PersonalInfoForm
                  formData={formData}
                  errors={errors}
                  onChange={handleChange}
                />
              )}

              {currentStep === 2 && (
                <AddressForm
                  formData={formData}
                  errors={errors}
                  onChange={handleChange}
                />
              )}

              {currentStep === 3 && (
                <PaymentForm
                  formData={formData}
                  errors={errors}
                  onChange={handleChange}
                  total={finalTotal}
                />
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8">
                {currentStep > 1 && (
                  <button
                    onClick={handlePreviousStep}
                    className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-semibold"
                  >
                    Voltar
                  </button>
                )}

                {currentStep < 3 ? (
                  <button
                    onClick={handleNextStep}
                    className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  >
                    Continuar
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isProcessing}
                    className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processando...
                      </>
                    ) : (
                      <>
                        <Check className="w-5 h-5" />
                        Finalizar Pedido
                      </>
                    )}
                  </button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Resumo do Pedido
              </h3>

              {/* Products */}
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {item.product.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {item.quantity}x R$ {item.product.price.toFixed(2)}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      R$ {(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Frete</span>
                  <span>{shipping === 0 ? 'Grátis' : `R$ ${shipping.toFixed(2)}`}</span>
                </div>
                {formData.paymentMethod === 'pix' && (
                  <div className="flex justify-between text-green-600 dark:text-green-400">
                    <span>Desconto PIX (5%)</span>
                    <span>- R$ {(finalTotal * 0.05).toFixed(2)}</span>
                  </div>
                )}
                {formData.paymentMethod === 'boleto' && (
                  <div className="flex justify-between text-green-600 dark:text-green-400">
                    <span>Desconto Boleto (3%)</span>
                    <span>- R$ {(finalTotal * 0.03).toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>
                    R$ {
                      formData.paymentMethod === 'pix'
                        ? (finalTotal * 0.95).toFixed(2)
                        : formData.paymentMethod === 'boleto'
                        ? (finalTotal * 0.97).toFixed(2)
                        : finalTotal.toFixed(2)
                    }
                  </span>
                </div>
              </div>

              {/* Security Badge */}
              <div className="mt-6 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-900 dark:text-green-100">
                      Compra 100% Segura
                    </p>
                    <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                      Seus dados estão protegidos
                    </p>
                  </div>
                </div>
              </div>

              {/* Warning */}
              {Object.keys(errors).length > 0 && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700 dark:text-red-300">
                      Corrija os erros no formulário
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;