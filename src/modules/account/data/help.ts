import type { Href } from 'expo-router';
import { DocumentText, Global, Lock, MessageQuestion, Shield, Sms, type Icon } from 'iconsax-react-native';

/** `lightTitle`: the design sets a few menu titles in Medium instead of SemiBold. */
export type MenuEntry = { id: string; title: string; subtitle: string; icon: Icon; href: Href; lightTitle?: boolean };

export const helpMenu: MenuEntry[] = [
  { id: 'faqs', title: 'FAQs', subtitle: 'Common Question and Answer', icon: MessageQuestion, href: '/account/help/faqs' },
  { id: 'contact', title: 'Contact Support', subtitle: 'Get Help From Our Team', icon: Sms, href: '/account/help/contact' },
  { id: 'report', title: 'Report Issues', subtitle: 'Report Issues or Abuse', icon: Shield, href: '/account/report' },
];

export const legalMenu: MenuEntry[] = [
  {
    id: 'terms',
    title: 'Terms of Service',
    subtitle: 'Terms and Condtion',
    icon: DocumentText,
    href: { pathname: '/account/privacy', params: { doc: 'terms' } },
  },
  {
    id: 'privacy',
    title: 'Privacy policy',
    subtitle: 'How We Protect Your Information',
    icon: Lock,
    href: '/account/privacy',
    lightTitle: true,
  },
  {
    id: 'about',
    title: 'About App',
    subtitle: 'Our Vision & Mission',
    icon: Global,
    href: { pathname: '/account/privacy', params: { doc: 'about' } },
    lightTitle: true,
  },
];

export type FaqCategory = 'general' | 'marketplace' | 'diagnosis' | 'weather';

export const faqCategories: { value: FaqCategory; label: string }[] = [
  { value: 'general', label: 'General' },
  { value: 'marketplace', label: 'Marketplace' },
  { value: 'diagnosis', label: 'Photo Diagnosis' },
  { value: 'weather', label: 'Weather' },
];

export type Faq = { id: string; category: FaqCategory; question: string; answer: string };

export const faqs: Faq[] = [
  {
    id: 'g1',
    category: 'general',
    question: 'What is the Smart Farming App?',
    answer:
      'The Smart Farming App helps farmers manage daily agricultural activities such as crop planning, weather tracking, pest alerts, marketplace trading, and equipment sharing—all in one place.',
  },
  {
    id: 'g2',
    category: 'general',
    question: 'How accurate is the weather forecast?',
    answer: 'Forecasts are refreshed every hour for your field location and cover the next 7 days.',
  },
  {
    id: 'g3',
    category: 'general',
    question: 'How can I add my farm or field details?',
    answer: 'Open the Fields tab, tap Add Field, then enter the field name, area, soil type and crops.',
  },
  {
    id: 'g4',
    category: 'general',
    question: 'Can I share my equipment with others?',
    answer: 'Yes. List your equipment from Celebrative Farming and nearby farmers can send you a request.',
  },
  {
    id: 'm1',
    category: 'marketplace',
    question: 'How do I track my order?',
    answer: 'Open Marketplace, go to your orders and select the order to see its delivery status.',
  },
  {
    id: 'd1',
    category: 'diagnosis',
    question: 'How do I scan a crop leaf?',
    answer: 'Tap the scan button in the tab bar, keep the leaf inside the frame and take a clear photo.',
  },
  {
    id: 'w1',
    category: 'weather',
    question: 'Can I get rain alerts?',
    answer: 'Turn on Weather in Notification Preferences to receive rain, heat and wind updates.',
  },
];

export const contactChannels = {
  email: { label: 'Email', value: 'support@bondly.com' },
  phone: { label: 'Customer Service', value: '+91 123456789', dial: '+91123456789' },
};

export const issueTypes = ['App Not Working', 'Payment Issue', 'Wrong Information', 'Abuse or Spam', 'Other'];
