// src/types/checkout.ts

export interface CheckoutFormData {
  // Dados Pessoais
  fullName: string;
  email: string;
  phone: string;
  cpf: string;

  // Endereço
  zipCode: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;

  // Pagamento
  paymentMethod: 'credit' | 'debit' | 'pix' | 'boleto';
  
  // Cartão (se credit ou debit)
  cardNumber?: string;
  cardName?: string;
  cardExpiry?: string;
  cardCvv?: string;
  installments?: number;
}

export interface CheckoutStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export interface CheckoutErrors {
  [key: string]: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  description: string;
  discount?: number;
}