export interface ServiceResponse<T> {
    dados: T;
    mensagem: string;
    sucesso: boolean;
  }