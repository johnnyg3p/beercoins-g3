import { OperationType } from './OperationType';
interface IDeposit {
    authToken: string,
    hash: string,
    tipoOperacao: OperationType,
    valorOperacao: number
}