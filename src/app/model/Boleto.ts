export interface Boleto {
    id?: number | null;
    descricao: string,
    vencimento: Date,
    valor: string,
    status: string
}