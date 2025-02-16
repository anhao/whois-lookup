import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TokenDialogProps } from '@/types/whois';
import { TOKEN_KEY } from '@/App';
export function TokenDialog({ open, onOpenChange, onSave }: TokenDialogProps) {
  const { t } = useTranslation();
  const [token, setToken] = useState('');

  const handleSave = () => {
    onSave(token);
    onOpenChange(false);
  };
  useEffect(() => {
    setToken(localStorage.getItem(TOKEN_KEY) || '');
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('form.tokenRequired')}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            placeholder={t('form.tokenPlaceholder')}
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <Button onClick={handleSave} disabled={!token}>
            {t('form.save')}
          </Button>
        </div>
        <div>
            <p>
              {t('form.tokenDescription')} : <a href="https://www.alapi.cn/" target="_blank" rel="noopener noreferrer">https://www.alapi.cn/</a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}