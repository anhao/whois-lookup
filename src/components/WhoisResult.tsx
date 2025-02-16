import { WhoisData } from '@/types/whois';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface WhoisResultProps {
  data?: WhoisData;
  loading?: boolean;
}

export function WhoisResult({ data, loading }: WhoisResultProps) {
  const { t } = useTranslation();

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6 space-y-4">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[300px]" />
          <Skeleton className="h-4 w-[250px]" />
        </CardContent>
      </Card>
    );
  }

  if (!data) return null;

  const resultItems = [
    {
      label: t('result.domain'),
      value: data.domain,
    },
    {
      label: t('result.status'),
      value: data.is_reg ? t('result.registered') : t('result.available'),
      className: data.is_reg ? 'text-destructive' : 'text-primary',
    },
    {
      label: t('result.suffix'),
      value: data.suffix,
    },
    {
      label: t('result.registrar'),
      value: data.registrar,
    },
    {
      label: t('result.created'),
      value: data.creation_date,
    },
    {
      label: t('result.expired'),
      value: data.expiration_date,
    },
    {
      label: t('result.email'),
      value: data.registrant_email,
    },
    {
      label: t('result.phone'),
      value: data.registrant_phone,
    },
    {
      label: t('result.whoisServer'),
      value: data.whois_server,
    },
    {
      label: t('result.nameservers'),
      value: Array.isArray(data.name_server) 
        ? data.name_server.join('\n') 
        : data.name_server,
    },
    {
      label: t('result.domainStatus'),
      value: Array.isArray(data.domain_status) 
        ? data.domain_status.join('\n') 
        : data.domain_status,
    },
    {
      label: t('result.dnssec'),
      value: data.dnssec,
    },
  ];

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">
          {t('result.title')}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {resultItems.map((item, index) => (
            item.value && (
              <div 
                key={index} 
                className="border-b border-border/50 last:border-0 pb-4 last:pb-0"
              >
                <div className="text-sm text-muted-foreground mb-2">
                  {item.label}
                </div>
                <div className={`text-base whitespace-pre-line break-words ${item.className || ''}`}>
                  {item.value}
                </div>
              </div>
            )
          ))}
        </div>
      </CardContent>
    </Card>
  );
}