// config/index.ts
import { Monitor, Megaphone, Palette, Code } from 'lucide-react';

export const navLinks = [
    { 
        href: "#home",
        label: "الرئيسية" 
    },
    { 
        href: "#portfolio",
        label: " قائمة المنتجات" 
    },
    { 
        href: "#faq", 
        label: "الأسئلة الشائعة" 
    },
];
export const serviceSection= [
    {
        icon: Monitor, // We use a string key for the icon
        title: "إنشاء المتاجر",
        description: "إنشاء متاجر إلكترونية احترافية متكاملة مع نظام إدارة مدوّن.",
      },
      {
        icon: Megaphone,
        title: "خدمات التسويق",
        description: "نقدم خدمات تسويقية متكاملة لتعزيز حضور علامتك ووصولك إلى جمهورك.",
      },
      {
        icon: Palette,
        title: "خدمات التصميم",
        description: "نقدم تصاميم إبداعية تعكس هوية علامتك التجارية.",
      },
      {
        icon: Code,
        title: "تطوير المواقع",
        description: "تصميم وتطوير مواقع احترافية متجاوبة.",
      },
];
export const portfolioSection = [
  {
    image: "/images/portfolio-1.jpg", // يجب أن تضع صورك في /public/images
    title: "هوية بصرية لشركة تقنية",
    description: "تصميم هوية بصرية كاملة تشمل الشعار والألوان والخطوط.",
    tags: ["Photoshop", "Illustrator", "Adobe XD"],
  },
  {
    image: "/images/portfolio-2.jpg",
    title: "متجر إلكتروني متكامل",
    description: "متجر إلكتروني مع لوحة تحكم لإدارة المنتجات والطلبات.",
    tags: ["PHP", "WordPress", "WooCommerce"],
  },
  {
    image: "/images/portfolio-3.jpg",
    title: "إضافة ووردبريس للمدفوعات",
    description: "تطوير إضافة مخصصة لدمج بوابات الدفع المحلية.",
    tags: ["MySQL", "PHP", "WordPress"],
  },
];
export const projectsSection = [
  {
    image: "/clothe1.jpg", // يجب أن تضع صورك في /public/images
    title: "Oversized Half-Zip Sweater",
    description: "حل متكامل لإدارة طلبات العملاء في متجرك، وتتبع معلومات العملاء.",
    tags: ["PHP", "WordPress"],
    price:' 12600.00',
    link: "/projects/pexlat-form", // رابط المشروع
  },
  {
    image: "/cloteh3 (2).jpg",
    title: " Black Full Tracksuit",
    description: "حل متكامل لإدارة طلبات العملاء في متجرك، وتتبع معلومات العملاء.",
    tags: ["HTML", "CSS", "js"],
    price:' 5600.00',
    link: "/projects/no-reels",
  },
  {
    image: "/cloteh3 (3).jpg",
    title: "  Camel Wool-Blend Coat",
    description: "حل متكامل لإدارة طلبات العملاء في متجرك، وتتبع معلومات العملاء.",
    tags: ["tailwind", "react"],
    price:' 8600.00',
    link: "/projects/trip-manager",
  },
  {
    image: "/cloteh3 (1).jpg",
    title: "Navy Ribbed Pullover",
    description: "حل متكامل لإدارة طلبات العملاء في متجرك، وتتبع معلومات العملاء.",
    tags: ["Python", "react"], // "paython" -> "Python"
    link: "/projects/no-music",
    price:' 35800.00',
  },
];
export const faqSection = [
  {
    question: "كيف يمكنني البدء بمشروعي؟",
    answer: "البداية سهلة جداً! كل ما عليك هو التواصل معنا عبر صفحة 'تواصل معنا' وتزويدنا بتفاصيل مشروعك. سنقوم بالرد عليك خلال 24 ساعة لتحديد موعد اجتماع ومناقشة كل التفاصيل.",
  },
  {
    question: "ما هي تكلفة المشروع؟",
    answer: "تعتمد التكلفة على حجم المشروع ومتطلباته. نحن نقدم عروض أسعار مخصصة بناءً على تحليل دقيق لاحتياجاتك. تواصل معنا للحصول على عرض سعر مجاني.",
  },
  {
    question: "كم المدة المتوقعة لتنفيذ المشروع؟",
    answer: "تختلف المدة الزمنية باختلاف المشروع. مشروع بسيط مثل صفحة هبوط قد يستغرق أسبوعاً، بينما قد يستغرق متجر إلكتروني متكامل عدة أسابيع. سنزودك بجدول زمني واضح بعد مناقشة التفاصيل.",
  },
];
export const footerLinks = [
  {
    title: "الشركة",
    links: [
      { name: "عنا", href: "/about" },
      { name: "الميزات", href: "/features" },
      { name: "أعمالنا", href: "/works" },
      { name: "وظائف", href: "/careers" },
    ],
  },
  {
    title: "مساعدة",
    links: [
      { name: "دعم العملاء", href: "/support" },
      { name: "تفاصيل التوصيل", href: "/delivery" },
      { name: "الشروط والأحكام", href: "/terms" },
      { name: "سياسة الخصوصية", href: "/privacy" },
    ],
  },
  {
    title: "أسئلة شائعة",
    links: [
      { name: "الحساب", href: "/account" },
      { name: "إدارة التوصيلات", href: "/manage-deliveries" },
      { name: "الطلبات", href: "/orders" },
      { name: "المدفوعات", href: "/payments" },
    ],
  },
  {
    title: "مصادر",
    links: [
      { name: "كتب إلكترونية مجانية", href: "/ebooks" },
      { name: "دروس برمجية", href: "/tutorials" },
      { name: "مدونة 'كيف'", href: "/blog" },
      { name: "قائمة تشغيل يوتيوب", href: "/youtube" },
    ],
  },
];

// بيانات روابط التواصل الاجتماعي
export const socialLinks = [
  { name: "Twitter", href: "https://twitter.com", icon: "twitter" },
  { name: "Facebook", href: "https://facebook.com", icon: "facebook" },
  { name: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { name: "Github", href: "https://github.com", icon: "github" },
];

// بيانات أيقونات الدفع
export const paymentMethods = [
  { name: "Visa", icon: "visa" },
  { name: "Mastercard", icon: "mastercard" },
  { name: "PayPal", icon: "paypal" },
  { name: "Apple Pay", icon: "apple-pay" },
  { name: "Google Pay", icon: "google-pay" },
];


 
