export default interface Message {
  id: number;
  remetente: string;
  assunto: string;
  mensagem?: string;
  created_at: string;
}
