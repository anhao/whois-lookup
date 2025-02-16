import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import axios from 'axios';
import { Settings, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { TokenDialog } from '@/components/TokenDialog';
import { WhoisResult } from '@/components/WhoisResult';
import { WhoisResponse, WhoisData } from '@/types/whois';
import './App.css';
import { Toaster } from '@/components/ui/toaster';
import { Footer } from './components/Footer';

const API_URL = 'https://v3.alapi.cn/api/whois';
export const TOKEN_KEY = 'whois_api_token';

function App() {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [whoisData, setWhoisData] = useState<WhoisData>();
  const [showTokenDialog, setShowTokenDialog] = useState(false);

  const handleSearch = useCallback(async (searchDomain?: string) => {
    let domainToSearch = searchDomain || domain;
    if (!domainToSearch) {
      toast({
        variant: "destructive",
        title: t('errors.required'),
      });
      return;
    }

    //验证域名是否正确，如果域名包含 http:// 或者 https:// 则去掉
     domainToSearch = domainToSearch.replace(/^https?:\/\//, '');


    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setShowTokenDialog(true);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post<WhoisResponse>(`${API_URL}`, {
        token,
        domain: domainToSearch,
      });
      
      if (response.data.code === 200) {
        setWhoisData(response.data.data);
      } else {
        toast({
          variant: "destructive",
          title: response.data.message || t('errors.networkError'),
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: t('errors.networkError'),
      });
    } finally {
      setLoading(false);
    }
  }, [domain, toast, t]);

  const handleTokenSave = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
    handleSearch();
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const whoisQA = [
    {
      q: t('qa.what'),
      a: t('qa.whatAnswer'),
      icon: '🔍'
    },
    {
      q: t('qa.why'),
      a: t('qa.whyAnswer'),
      icon: '🎯'
    },
    {
      q: t('qa.info'),
      a: t('qa.infoAnswer'),
      icon: '📋'
    }
  ];
  const domains = [
    'baidu.com',
    'google.com',
    'github.com',
    'alapi.cn',
    'example.com'
  ];

  const handleExampleClick = (item: string) => {
    setDomain(item);
    handleSearch(item);
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>{domain ? `${domain} -  ${t('title')}` : t('title')}</title>
      </Helmet>
      <div className="min-h-screen bg-background">
        <div className="fixed top-0 right-0 p-4 flex items-center space-x-4 z-50">
          <div className="flex items-center space-x-2 text-sm">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => changeLanguage('en')}
              className={`px-3 ${i18n.language === 'en' ? 'text-primary' : ''}`}
            >
              <span className="mr-2">🇺🇸</span>
              EN
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => changeLanguage('zh')}
              className={`px-3 ${i18n.language === 'zh' ? 'text-primary' : ''}`}
            >
              <span className="mr-2">🇨🇳</span>
              中文
            </Button>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowTokenDialog(true)}
            className="flex items-center space-x-2"
          >
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">{t('settings.configureToken')}</span>
          </Button>
        </div>
        <div className='container mx-auto px-4 pt-20'>
          <div className='max-w-4xl mx-auto space-y-8'>
            <h1 className='text-4xl font-bold text-center'>{t('title')}</h1>
            <p className='text-center text-muted-foreground'>
              {t('description')}
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 pt-20">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-card p-6 rounded-xl shadow-lg border border-border/50">
              <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                <div className="flex-1">
                  <Input
                    placeholder={t('form.placeholder')}
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    className="h-12 text-lg w-full"
                  />
                </div>
                <Button
                  onClick={() => handleSearch()}
                  disabled={loading}
                  size="lg"
                  className="h-12 text-base w-full md:w-[140px]"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
                      <span>{t('form.searching')}</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Search className="h-5 w-5" />
                      <span>{t('form.submit')}</span>
                    </div>
                  )}
                </Button>
              </div>
              {/*  如果是移动端，则不显示，通过 tailwind css 判断 */}
              <div className='mt-2 text-sm text-muted-foreground flex items-center hidden md:flex'>
                <span className='mr-1'>💡</span>
                {t('form.example')}：
                <div className='flex flex-wrap gap-2'>
                  {domains.map((item, index) => (
                    <a key={index} className='ml-1 text-blue-500 hover:text-blue-600 cursor-pointer' onClick={() => handleExampleClick(item)} >{item}</a>
                  ))}
                </div>
              </div>
            </div>

            <WhoisResult data={whoisData} loading={loading} />

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {whoisQA.map((item, index) => (
                <div
                  key={index}
                  className="bg-card/50 p-6 rounded-lg border border-border/50 hover:bg-card/80 transition-colors"
                >
                  <div className="text-2xl mb-3">{item.icon}</div>
                  <h3 className="font-medium mb-2 text-base">{item.q}</h3>
                  <p className="text-sm text-muted-foreground">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Footer />

        <TokenDialog
          open={showTokenDialog}
          onOpenChange={setShowTokenDialog}
          onSave={handleTokenSave}
        />

        <Toaster />

        {/* 显示 footer , 应该显示在页面最底部 */}

      </div>
    </HelmetProvider>
  );
}

export default App;