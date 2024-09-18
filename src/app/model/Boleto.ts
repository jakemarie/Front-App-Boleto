export interface Boleto {
    id?: number;
    descricao: string,
    vencimento: Date,
    valor: string,
    status: string
}