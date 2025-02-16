import { useTranslation } from 'react-i18next';

export function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="w-full py-6 border-t border-border/50 mt-auto ">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <div>
                        © {new Date().getFullYear()} WHOIS Lookup. {t('footer.rights')}
                    </div>
                    <div className="flex items-center space-x-4">
                        <a
                            href="https://www.alapi.cn"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-foreground transition-colors"
                        >
                            {t('footer.provider')}
                        </a>
                        <span>|</span>
                        <a
                            href="https://github.com/anhao/whois-lookup"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-foreground transition-colors"
                        >
                            GitHub
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
} 