export default interface QuotaProduct {
  id: number;
  label: string;
  price: number;
  byte_quota: number;
  expiration: string;
  description: string;
}
