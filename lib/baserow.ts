import axios from 'axios';

export async function saveToBaserow(payload: any) {
  try {
    const tableId = process.env.BASEROW_TABLE_ID;
    const token = process.env.BASEROW_TOKEN;

    if (!tableId || !token) {
        console.error("❌ بيانات Baserow ناقصة في ملف .env");
        return { success: false };
    }

    // Baserow API URL
    const url = `https://api.baserow.io/api/database/rows/table/${tableId}/?user_field_names=true`;

    await axios.post(
      url,
      payload, // نرسل البيانات كما هي
      {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("✅ تم الحفظ في Baserow بنجاح!");
    return { success: true };

  } catch (error: any) {
    console.error("❌ Baserow Error:", error.response?.data || error.message);
    // لا نوقف الموقع إذا فشل الحفظ، فقط نطبع الخطأ
    return { success: false };
  }
}