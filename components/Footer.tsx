// ./components/Footer.tsx
import React from 'react';
// import Link from 'next/link'; // تم إزالته لإصلاح خطأ العرض. سنستخدم <a> العادي
// import { footerLinks, socialLinks, paymentMethods } from '../lib/footerData'; // تم إزالته، سندمج البيانات أدناه

// --- تم نقل البيانات هنا لحل مشكلة الاستيراد ---

// تعريف نوع الرابط
export interface LinkItem {
  name: string;
  href: string;
}

// تعريف نوع العمود
export interface FooterColumn {
  title: string;
  links: LinkItem[];
}

// بيانات أعمدة الفوتر باللغة العربية
export const footerLinks: FooterColumn[] = [
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

// ---------------------------------------------


// أيقونات SVG مبسطة للتوضيح
// في مشروع حقيقي، قد تستخدم مكتبة مثل react-icons

const SocialIcon = ({ icon }: { icon: string }) => {
  // هذا مثال بسيط جداً، يمكنك استخدام SVGs كاملة هنا
  if (icon === 'twitter') return <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>;
  if (icon === 'facebook') return <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>;
  if (icon === 'instagram') return <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427A4.902 4.902 0 013.45 4.69a4.902 4.902 0 011.772-1.153c.636-.247 1.363.416 2.427.465C9.53 2.013 9.884 2 12.315 2zM12 7c-2.761 0-5 2.239-5 5s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5zm0 8c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zm6.406-11.845a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z" clipRule="evenodd" /></svg>;
  if (icon === 'github') return <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.49.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.379.202 2.398.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12C22 6.477 17.523 2 12 2z" clipRule="evenodd" /></svg>;
  return null;
}

// أيقونات دفع كنصوص بسيطة (يمكن استبدالها بـ SVGs أو صور)
// const PaymentIcon = ({ name }: { name: string }) => {
//   return (
//     <div className="bg-white px-2 py-1 rounded-md shadow border border-gray-200">
//       <span className="text-xs font-bold text-gray-700">{name}</span>
//     </div>
//   )
// }

const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent text-gray-700 py-12 px-4 sm:px-6
     lg:px-8 translate-x-3 lg:translate-x-0  " dir="rtl">
        
      <div className="max-w-7xl mx-auto items-center">
        <div className="grid  grid-cols-2
        -translate-x-20 lg:translate-x-0 md:grid-cols-6 gap-8">
          
          {/* القسم الأيمن: الشعار والوصف */}
          <div className="md:col-span-2">
            
           <h1 className='text-4xl text-purple-700 cursor-pointer duration-300
           ease-in-out font-mono hover:scale-[1.1] '>
             iSite
           </h1>
            <h2 className="text-3xl font-extrabold text-gray-900 h-9 mb-4">
              {/* SHOP.CO */}
              {/* تم ترك هذا المكان فارغاً كما طلبت */}
            </h2>
            
            <p className="text-gray-500 max-w-xs leading-relaxed">
              لدينا ملابس تناسب ذوقك وتفخر بارتدائها. تشكيلات مميزة للرجال والنساء.
            </p>
            <div className="flex space-x-4 space-x-reverse mt-6">
              {socialLinks.map((social) => (
                <a 
                  key={social.name} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={social.name}
                >
                  <SocialIcon icon={social.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* الأقسام الأخرى: روابط المساعدة (يتم جلبها بالـ map) */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-gray-900 
              uppercase tracking-wider mb-4 ">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    {/* تم التعديل: استخدام <a> بدلاً من <Link> */}
                    <a href={link.href} className="text-gray-500 hover:text-gray-900 transition-colors cursor-pointer">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* القسم السفلي: الحقوق وأيقونات الدفع */}
        <div className="border-t border-gray-200 mt-12 pt-8 flex 
        flex-col md:flex-row justify-between items-center
        -translate-x-13 lg:translate-x-0">
          <p className="text-gray-500 text-sm">
            Shop.co &copy; 2000-{new Date().getFullYear()}، جميع الحقوق محفوظة.
          </p>
          <div className="flex space-x-2 space-x-reverse mt-4 md:mt-0">
            {/* هنا يمكنك استخدام أيقونات الدفع الحقيقية (SVGs أو صور) */}
            {/* هذا مثال باستخدام نصوص بسيطة */}
             <img src="https://placehold.co/50x30/ffffff/000000?text=Visa" alt="Visa" className="h-6 object-contain rounded"/>
             <img src="https://placehold.co/50x30/ffffff/000000?text=Mastercard" alt="Mastercard" className="h-6 object-contain rounded"/>
             <img src="https://placehold.co/50x30/ffffff/000000?text=PayPal" alt="PayPal" className="h-6 object-contain rounded"/>
             <img src="https://placehold.co/50x30/ffffff/000000?text=Apple+Pay" alt="Apple Pay" className="h-6 object-contain rounded"/>
             <img src="https://placehold.co/50x30/ffffff/000000?text=G+Pay" alt="Google Pay" className="h-6 object-contain rounded"/>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;