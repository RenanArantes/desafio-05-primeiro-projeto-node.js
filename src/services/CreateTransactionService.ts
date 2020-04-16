import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    const validBalance = this.transactionsRepository.getBalance();

    if (validBalance.outcome >= validBalance.total) {
      throw Error(
        'Invalid balance, yours outcome can`t be greater than your income',
      );
    }

    return transaction;
  }
}

export default CreateTransactionService;
