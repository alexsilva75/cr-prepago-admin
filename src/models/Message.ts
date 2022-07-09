export default interface Message {
  id?: number;
  remetente: string;
  senderName: "Suporte";
  destinatario?: string;
  assunto: string;
  mensagem?: string;
  created_at?: string;
}
