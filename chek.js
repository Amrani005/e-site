const { google } = require('googleapis');

// 1. بياناتك (لقد وضعتها لك جاهزة)
const CLIENT_EMAIL = "likolinekitaboh@likoline-kitaboh.iam.gserviceaccount.com";
const SHEET_ID = "1GQnci45vpyq3eWBjT5RObcMDifMC2lvknkvwmflouGM";

// 2. المفتاح السري (ضعه هنا كما هو تماماً بين العلامتين)
// ملاحظة: لقد نسخته من رسالتك السابقة، فقط تأكد أنه يبدو هكذا
const PRIVATE_KEY = `-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC+ns4m6qUbKXTV
l0pJMYDQmFRLQ4nLAOFs99CQ8iXDSKOi3gwzCQTrBlOb877O6oMWdqFYHJnqqdRJ
H4g4Zv3592EEAJ1xxUfbayL/LkpAx/8KEVSfBk4muKTbkaN7/4JLNP0wzrtHfrWn
4NZVoMMJqdIuZBCf2zDEcCVqc0zPveX5UIPTJieQc0imHgW/vyW9AKeBC/ZHJZfG
tubm1jdwIbQZFVIObN5PTwefHKoXl8TTJUjr4TzWCmBoJD0dFlWb1LyN4JimKeeU
Gi+040Q6goqt3knvu5n8pmOZ/v8/zDKz9WgBHvdhYbq0puHl/Kuvh6o4jBSSQCEJ
686Tap0RAgMBAAECggEAAK9aZ0plkHzsJg5Wnn+2iklZ2DFkb93PcZBMaBDusM50
hBPPMGnCYkPSDhfooh62nOCNQN9NcEnu8NpTp3w7QmgwqY6FAlEmqnOumwMkEiqF
0JfyWWXw5vO35/AUidAHvFRy6nd7tcyPQ4yryH/8426ASllis+haOwJ6J/FFH+P5
tToUmshzsRBSj3Kdzv+OkDZDjUMcoGip+nW8/vF6IN40HbQngdteR2pctEeS4CG0
KqpuZih/CHWoLbPTmCklYKl3xrmnOrbxKaLmfM76jMGhRHXYI4QvIKnUQOKYEI86
yE1ZFREwnq13aagCc4jZWhUjl2/QkD81QS/2Q+4rFwKBgQDwMzn4GAzolXvZZVvB
3f3TJCYcQGF6Yg7K6YxT4PT+fWtKaGDcEsV703N8UgI1DQj8RExgAsuHEeq2t5AK
3xT9dYPVmK2/4SCxgFg/eQ4/8voTOjJie3bZHYnzaLB7x72Cb3uUGfoSA63LM/8i
gC8HJ6G5n+cV8khU+l8kCo2oOwKBgQDLKLItTlUPrTonNsiCQzE4wllxIpggBEww
Mbh7dD6heSVPKIepmwqztDsTBzrmaiHBFypeNuwxvNnxC1eK2bxGbA4dpNVo8oF2
q+A9uw2yfsbyMLJRl8pNz2VcZJBVpWS8u+jVFQw77i/CzNVJZ6ah4zhdwyQt2DMK
IuGB4ykHIwKBgFfFoE00HKNw3EzYaOsyv2nEL9jq/bPG2Tj0lr6f2WaVVfteoOZK
Rbe10OGA5iWUmc/09SOwYcb9mRMjiJMwaW8k3gPTQsp27YdvKtAm4DomA5O7FGZA
T3GPBbXYb4ULvAhJzJKV23dxuLQkT/q/dG/c35ABCmROoHfM9a8p3BG5AoGALXdn
IOKWANMo35vQFe8JtgUw1TQDza6IioSmH+LtHWAqbGPKsLeFFqCwU9rbYLPB6B/S
GJG8HImCUQLTzbxa+Xu3UQURydH0DWX74nTZZOggiBVD4yTQXseajKno73H7cI2x
VvbF7SeqQrNqzGnJDhP3CmzgzO3ExnD1/QakqPcCgYAdB+b2Tph/QHwrkd4qfLUg
ddB+PJGTcP0YKPI2EIDqW8DDEXfJwQPoA3roWJb8G5C/hwKvd18bZJuiQK3XphIs
STclnoslZYJDOJjKMi4c0br1ySBuCfAvk8W9KGb89+A3J8ruBN5p23PdY5XkZx76
Iy1/108lso0k+F9mbPayAA==
-----END PRIVATE KEY-----`;

async function runTest() {
  console.log("🚀 جاري الاتصال المباشر بجوجل...");
  
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: CLIENT_EMAIL,
        private_key: PRIVATE_KEY,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // محاولة الكتابة
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: 'Orders!A:A', // تأكد أن اسم الصفحة Orders
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[ "تجربة", "هل يعمل؟", "نعم!" ]],
      },
    });

    console.log("✅✅✅ نجح!! اذهب لملف الإكسل الآن ستجد سطراً جديداً.");
  } catch (error) {
    console.log("❌❌❌ فشل! إليك السبب الحقيقي:");
    console.log(error.message); // اقرأ هذا السطر جيداً
  }
}

runTest();