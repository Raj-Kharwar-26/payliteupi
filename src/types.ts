export type ScreenType =
  | 'welcome'
  | 'sim-binding'
  | 'services'
  | 'scan'
  | 'payment-auth'
  | 'ussd-rail'
  | 'payment-outcome'
  | 'receipt'
  | 'wallet';

export type BottomTabType = 'home' | 'scan' | 'services' | 'passbook';

export interface BankAccount {
  id: string;
  bankName: string;
  shortCode: string;
  accountNumber: string;
  accountType: string;
  balance: number;
  isPrimary: boolean;
  linkedSimSlot: number;
  syncTimeText: string;
}

export interface SIMCard {
  slot: number;
  carrier: string;
  number: string;
  signalStrength: string;
  band: string;
  bankLinked: string;
  status: 'active' | 'standby';
  features: string[];
}

export interface Merchant {
  id: string;
  name: string;
  initials: string;
  upiId: string;
  verified: boolean;
  category: string;
  lastPaidText?: string;
  avatarUrl?: string;
  suggestedAmount?: number;
}

export interface TransactionRecord {
  id: string;
  referenceId: string;
  merchantName: string;
  upiId: string;
  amount: number;
  timestamp: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  channel: 'USSD *99#' | '123PAY IVR' | 'DEVICE_LEDGER_OFFLINE';
  ecdsaSignature: string;
  bankAccount: string;
  note?: string;
}
