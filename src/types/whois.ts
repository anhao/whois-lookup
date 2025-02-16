export interface WhoisResponse {
  request_id: string;
  success: boolean;
  message: string;
  code: number;
  data: WhoisData;
  time: number;
  usage: number;
}

export interface WhoisData {
  domain: string;
  is_reg: boolean;
  suffix: string;
  name_server: string[];
  creation_date: string;
  expiration_date: string;
  registrar: string;
  registrant_phone: string;
  registrant_email: string;
  domain_status: string[];
  dnssec: string;
  whois_server: string[];
}

export interface TokenDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (token: string) => void;
}