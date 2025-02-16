import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      title: 'Domain Whois Search',
      description: 'Enter a domain to query WHOIS information',
      form: {
        submit: 'Search',
        placeholder: 'Enter domain...',
        tokenRequired: 'API Token Required',
        tokenPlaceholder: 'Enter your ALAPI token',
        save: 'Save Token',
        searching: 'Searching...',
        tokenDescription: 'Get your ALAPI token from',
        example: 'Example',
      },  
      result: {
        registrar: 'Registrar',
        expired: 'Expiration Time',
        created: 'Creation Date',
        status: 'Domain Status',
        nameservers: 'Nameservers',
        registered: 'Registered',
        available: 'Available',
        email: 'Registrant Email',
        phone: 'Registrant Phone',
        title: 'Domain Information',
        domain: 'Domain',
        suffix: 'Domain Suffix',
        whoisServer: 'Whois Server',
        domainStatus: 'Domain Status',
        dnssec: 'DNSSEC',
      },
      errors: {
        invalidDomain: 'Invalid domain format',
        required: 'Please enter a valid domain',
        networkError: 'Network error occurred',
        tokenMissing: 'API token is required',
      },
      settings: {
        configureToken: 'Configure Token',
      },
      qa: {
        what: 'What is WHOIS?',
        whatAnswer: 'WHOIS is a query tool for obtaining domain registration and ownership information, including registrant, registrar, and expiration date.', 
        why: 'Why do I need to query WHOIS?',
        whyAnswer: 'WHOIS information is helpful for verifying domain ownership, contacting domain owners, checking domain availability, and conducting domain transactions.',
        info: 'What information can I query?',
        infoAnswer: 'You can query the registration status, creation time, expiration time, domain servers, registrar information, and contact information of the registrant.',
      },
      footer: {
        rights: 'All rights reserved',
        provider: 'ALAPI Provider',
      },
    },
  },
  zh: {
    translation: {
      title: '域名 Whois 查询',
      description: '输入域名即可查询WHOIS信息',
      form: {
        submit: '查询',
        placeholder: '请输入域名...',
        tokenRequired: '需要API令牌',
        tokenPlaceholder: '请输入ALAPI令牌',
        save: '保存令牌',
        searching: '查询中...',
        tokenDescription: '获取ALAPI令牌',
        example: '示例',
      },
      result: {
        registrar: '注册商',
        expired: '到期时间',
        created: '创建时间',
        status: '域名状态',
        nameservers: '域名服务器',
        registered: '已注册',
        available: '可注册',
        email: '注册人邮箱',
        phone: '注册人电话',
        title: '域名信息',
        domain: '域名',
        suffix: '域名后缀',
        whoisServer: 'Whois 服务器',
        domainStatus: '域名状态',
        dnssec: 'DNSSEC',
      },
      errors: {
        invalidDomain: '域名格式无效',
        required: '请输入有效域名',
        networkError: '网络错误',
        tokenMissing: 'API令牌不能为空',
      },
  
      settings: {
        configureToken: '配置令牌',
      },
      qa: {
        what: '什么是 WHOIS？',
        whatAnswer: 'WHOIS 是一个查询工具，用于获取域名的注册和所有权信息，包括注册人、注册商和到期日期等详细信息。',
        why: '为什么需要查询 WHOIS？',
        whyAnswer: 'WHOIS 信息对于验证域名所有权、联系域名持有人、检查域名可用性以及进行域名交易都很有帮助。',
        info: '可以查询哪些信息？',
        infoAnswer: '可以查询域名的注册状态、创建时间、到期时间、域名服务器、注册商信息以及注册人的联系方式等。',
      },
      footer: {
        rights: 'ALAPI版权所有',
        provider: 'ALAPI 提供',
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['cookie', 'localStorage', 'navigator'],
      caches: ['cookie'],
    },
  });

export default i18n;