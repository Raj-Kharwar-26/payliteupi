import { BankAccount, Merchant, SIMCard, TransactionRecord } from '../types';

export const ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida/AEtjO1XuyV9UvMS8DVOKdsMguV2hrUflhBCjLJCUWZpFcZEvJYr3OMgS-YIi1g1Gx-zTIPTm6jyjkSTdSAUo-tG5m5wWZf_tFR8gKnpP7-Wa0Qeb5qgjk4zfUN1ayEDGNPTgdLonYcNMFoGuCO6vC3CDTLO2MCyNZU3Qi1PMGDxNqBRtDu17vcmrFBndeIpS5m9AkaF41TULvD2yTUh5I5ARNyfbA38VqQoF3tkpceSAZU1aaT5V1O_aiPmNBw',
  profile: 'https://lh3.googleusercontent.com/aida/AEtjO1WMnw_rGBX3BDkYjRuDCvRv3iP63JRaVwcOfQb61s27PeDj9xIT_p_s16ToiYT0-pPZkaGWYRYGP3mnWJwRspTqp3wWlO1T7iwOCl0TGRdBq-3roLqMvt4V-1y_-XqHCizb8Lvwu-Z6VuVtsDLoV59USteRYooqYC5d4Zs6408kLUew9VM8gLmUgAR7MNMZvBIZjylrhmkJegKXXFgMWHgiVQojiapCDdZ8wpQoe-AN8VWI_etf14x0ScA',
  anandKirana: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIqQor1VpHrIP5Wz3hH6vU_rOqqYri_3C2EGVitl1gXdoWfIuF9uxkMNddkpgmwcyhetKYtUcOdj34VnXUFbq7yL22__1o-3VCazvlbi3S-kUW1mPtN_YdUpkflheTNAyqTTByr-Eujnc1ba6vOC2-l437_DQaa2eUZLZQjLChE4oBUHI30b2lChI-85DX7emviGYEdFi9-ijPkukIXAKEAUAj67ettA_P0BuI1S5toJnarq7hfRkN'
};

export const INITIAL_SIMS: SIMCard[] = [
  {
    slot: 1,
    carrier: 'Airtel 4G',
    number: '+91 98765-43210',
    signalStrength: 'Strong (-82 dBm)',
    band: 'Band 3 (1800 MHz)',
    bankLinked: 'State Bank of India (•••• 4219)',
    status: 'active',
    features: ['USSD (*99#) & 123PAY Ready', 'Offline Tokenizer Active']
  },
  {
    slot: 2,
    carrier: 'Jio 4G',
    number: '+91 87654-09876',
    signalStrength: 'Good (-91 dBm)',
    band: 'Band 5 (850 MHz)',
    bankLinked: 'HDFC Bank (•••• 8821)',
    status: 'standby',
    features: ['123PAY Voice Rail Supported', 'IVR DTMF Auto-failover']
  }
];

export const INITIAL_ACCOUNTS: BankAccount[] = [
  {
    id: 'sbi-primary',
    bankName: 'State Bank of India',
    shortCode: 'SBI',
    accountNumber: '•••• 4219',
    accountType: 'Savings A/C',
    balance: 14820.50,
    isPrimary: true,
    linkedSimSlot: 1,
    syncTimeText: 'Offline Sync 2m ago'
  },
  {
    id: 'hdfc-secondary',
    bankName: 'HDFC Bank',
    shortCode: 'HDFC',
    accountNumber: '•••• 8821',
    accountType: 'Savings A/C',
    balance: 6240.00,
    isPrimary: false,
    linkedSimSlot: 2,
    syncTimeText: 'Synced via 123PAY'
  }
];

export const RECENT_MERCHANTS: Merchant[] = [
  {
    id: 'm1',
    name: 'Sharma General Store',
    initials: 'SK',
    upiId: 'sharma.kirana@okhdfcbank',
    verified: true,
    category: 'Grocery & Staples',
    lastPaidText: 'Last paid ₹80 yesterday • Grocery',
    suggestedAmount: 120
  },
  {
    id: 'm2',
    name: 'Pooja Milk Dairy',
    initials: 'PM',
    upiId: 'pooja.dairy@sbi',
    verified: true,
    category: 'Dairy & Provisions',
    lastPaidText: 'Last paid ₹60 2d ago',
    suggestedAmount: 60
  },
  {
    id: 'm3',
    name: 'Raju Auto Services',
    initials: 'RA',
    upiId: '9820011223@upi',
    verified: true,
    category: 'Transport & Auto',
    lastPaidText: 'Last paid ₹40 yesterday',
    suggestedAmount: 50
  },
  {
    id: 'm4',
    name: 'Amit Verma',
    initials: 'AV',
    upiId: 'amit@icici',
    verified: true,
    category: 'Friend / P2P',
    lastPaidText: 'Split dinner ₹350 last week',
    suggestedAmount: 200
  },
  {
    id: 'm5',
    name: 'Kavita Medical Store',
    initials: 'KM',
    upiId: '9443210987@paytm',
    verified: true,
    category: 'Pharmacy',
    lastPaidText: 'Medicines ₹145 on Monday',
    suggestedAmount: 145
  },
  {
    id: 'm6',
    name: 'Ramesh Kirana Store',
    initials: 'RK',
    upiId: 'ramesh.kirana@okaxis',
    verified: true,
    category: 'Daily Counter',
    lastPaidText: 'Last paid ₹120 2h ago',
    suggestedAmount: 120
  },
  {
    id: 'm7',
    name: 'Metro Recharge',
    initials: 'MR',
    upiId: 'delhimetro@dmrc',
    verified: true,
    category: 'Transit',
    lastPaidText: 'Card recharge ₹200 3d ago',
    suggestedAmount: 100
  }
];

export const INITIAL_TRANSACTIONS: TransactionRecord[] = [
  {
    id: 'TXN-98421',
    referenceId: 'NPCI-99-84729',
    merchantName: 'Ramesh Kirana Store',
    upiId: 'ramesh.kirana@okaxis',
    amount: 120.00,
    timestamp: 'Today, 10:42 AM IST',
    status: 'SUCCESS',
    channel: 'USSD *99#',
    ecdsaSignature: '0x7b2f91a0c8d4e51928374a56b7cd8e9f0123456789abcdef',
    bankAccount: 'SBI (•••• 4219)',
    note: 'Daily Groceries'
  },
  {
    id: 'TXN-98402',
    referenceId: 'NPCI-99-84611',
    merchantName: 'Sharma General Store',
    upiId: 'sharma.kirana@okhdfcbank',
    amount: 80.00,
    timestamp: 'Yesterday, 07:15 PM IST',
    status: 'SUCCESS',
    channel: 'DEVICE_LEDGER_OFFLINE',
    ecdsaSignature: '0x99a2c3d4e5f60718293a4b5c6d7e8f901a2b3c4d5e6f7a8b',
    bankAccount: 'On-Device Reserve',
    note: 'Snacks & Tea'
  },
  {
    id: 'TXN-98380',
    referenceId: 'NPCI-99-84490',
    merchantName: 'Pooja Milk Dairy',
    upiId: 'pooja.dairy@sbi',
    amount: 60.00,
    timestamp: '2 Oct 2026, 08:30 AM IST',
    status: 'SUCCESS',
    channel: 'USSD *99#',
    ecdsaSignature: '0x3c2a1b4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f90123456789a',
    bankAccount: 'SBI (•••• 4219)',
    note: 'Cow Milk 1L'
  },
  {
    id: 'TXN-98319',
    referenceId: 'NPCI-99-84201',
    merchantName: 'Metro Recharge',
    upiId: 'delhimetro@dmrc',
    amount: 200.00,
    timestamp: '30 Sep 2026, 06:12 PM IST',
    status: 'SUCCESS',
    channel: '123PAY IVR',
    ecdsaSignature: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f90123456789b',
    bankAccount: 'HDFC Bank (•••• 8821)',
    note: 'Smart Card Balance'
  }
];
