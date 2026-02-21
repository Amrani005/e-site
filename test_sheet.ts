const { google } = require('googleapis');
require('dotenv').config(); // تأكد أنك مثبت dotenv: npm install dotenv

async function testSheet() {
  try {
    console.log("1. جاري قراءة المفاتيح...");
    console.log("Email:", process.env.GOOGLE_CLIENT_EMAIL);
    console.log("Sheet ID:", process.env.GOOGLE_SHEET_ID);

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    console.log("2. جاري محاولة الكتابة...");
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Orders!A:A',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [["تجربة", "تجربة", "هاتف", "ولاية", "عنوان", "منتج", "1000", "توصيل"]],
      },
    });

    console.log("✅ نجح! اذهب وتفقد الملف.");
  } catch (error) {
    console.error("❌ فشل:", error.message); // سيعطيك السبب الحقيقي
  }
}

testSheet();