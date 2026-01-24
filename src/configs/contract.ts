export const DUMMY_LOAN_CONTRACT_ADDRESS = '0x000000000000000000000000000000000000dEaD'

export const DUMMY_LOAN_CONTRACT_ABI = [
  {
    inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
    name: 'applyLoan',
    outputs: [{ internalType: 'uint256', name: 'loanId', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'loanId', type: 'uint256' }],
    name: 'repayLoan',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'loanId', type: 'uint256' }],
    name: 'getLoan',
    outputs: [
      {
        components: [
          { internalType: 'address', name: 'borrower', type: 'address' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
          { internalType: 'uint256', name: 'repaid', type: 'uint256' },
          { internalType: 'bool', name: 'active', type: 'bool' },
        ],
        internalType: 'struct Loan',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'borrower', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'loanId', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'LoanApplied',
    type: 'event',
  },
]

export type Loan = {
  borrower: string
  amount: string
  repaid: string
  active: boolean
}

export const CONTRACT_ADDRESSES: Record<number, string> = {
  // Example chain mappings — replace with deployed addresses per chainId
  1: DUMMY_LOAN_CONTRACT_ADDRESS, // mainnet
  5: DUMMY_LOAN_CONTRACT_ADDRESS, // goerli / sepolia
  31337: DUMMY_LOAN_CONTRACT_ADDRESS, // local
}

export const getDummyContractConfig = (chainId?: number) => {
  const address = chainId ? CONTRACT_ADDRESSES[chainId] ?? DUMMY_LOAN_CONTRACT_ADDRESS : DUMMY_LOAN_CONTRACT_ADDRESS
  return {
    address,
    abi: DUMMY_LOAN_CONTRACT_ABI,
  }
}

export default {
  address: DUMMY_LOAN_CONTRACT_ADDRESS,
  abi: DUMMY_LOAN_CONTRACT_ABI,
}
