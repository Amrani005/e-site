'use client';

import React, { useState } from 'react';
import { MapPin } from 'lucide-react'; // لإضافة أيقونة

// 1. قائمة 58 ولاية جزائرية
const algerianWilayas = [
  "1. أدرار", "2. الشلف", "3. الأغواط", "4. أم البواقي", "5. باتنة", "6. بجاية", 
  "7. بسكرة", "8. بشار", "9. البليدة", "10. البويرة", "11. تمنراست", "12. تبسة",
  "13. تلمسان", "14. تيارت", "15. تيزي وزو", "16. الجزائر", "17. الجلفة", 
  "18. جيجل", "19. سطيف", "20. سعيدة", "21. سكيكدة", "22. سيدي بلعباس", 
  "23. عنابة", "24. قالمة", "25. قسنطينة", "26. المدية", "27. مستغانم", 
  "28. المسيلة", "29. معسكر", "30. ورقلة", "31. وهران", "32. البيض", "33. إليزي",
  "34. برج بوعريريج", "35. بومرداس", "36. الطارف", "37. تندوف", "38. تيسمسيلت",
  "39. الوادي", "40. خنشلة", "41. سوق أهراس", "42. تيبازة", "43. ميلة", 
  "44. عين الدفلى", "45. النعامة", "46. عين تموشنت", "47. غرداية", "48. غليزان",
  "49. تيميمون", "50. برج باجي مختار", "51. أولاد جلال", "52. بني عباس", 
  "53. عين صالح", "54. عين قزام", "55. تقرت", "56. جانت", "57. المغير", 
  "58. المنيعة"
];

const WilayaSelector = () => {
  // 2. نستخدم 'useState' لتتبع الولاية المختارة
  const [selectedWilaya, setSelectedWilaya] = useState<string>(""); // القيمة الافتراضية

  const handleWilayaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWilaya(event.target.value);
  };

  return (
    // 3. تصميم المكون ليتناسب مع تصميمك (داكن وأرجواني)
    <div className="p-8 bg-gray-900  flex flex-col items-center
     text-white">
      <div className="w-full max-w-md text-right">
        
        <h2 className="text-3xl font-bold text-purple-400 mb-6 text-center">
          اختر ولايتك
        </h2>
        
        {/* 4. العنصر <select> لاختيار الولاية */}
        <div className="mb-4">
          <label 
            htmlFor="wilaya-select" 
            className="block text-lg font-medium text-gray-300 mb-3"
          >
            الولاية:
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              id="wilaya-select"
              value={selectedWilaya}
              onChange={handleWilayaChange}
              // 5. تصميم القائمة المنسدلة
              className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 
                         rounded-lg shadow-lg text-white text-right
                         focus:outline-none focus:ring-2 focus:ring-purple-500
                         appearance-none" // لإخفاء السهم الافتراضي (للتصميم)
            >
              {/* الخيار الافتراضي */}
              <option value="" disabled>
                -- اختر ولاية --
              </option>

              {/* 6. نستخدم .map() لإنشاء <option> لكل ولاية */}
              {algerianWilayas.map((wilaya) => (
                <option 
                  key={wilaya} 
                  value={wilaya}
                  className="bg-gray-800 text-white"
                >
                  {wilaya}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 7. عرض النتيجة (اختياري) */}
        {selectedWilaya && (
          <div className="mt-6 p-4 bg-gray-800 rounded-lg text-center">
            <p className="text-lg">
              الولاية المختارة: <span className="font-bold text-purple-400">{selectedWilaya}</span>
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default WilayaSelector;