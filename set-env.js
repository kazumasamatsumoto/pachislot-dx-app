const fs = require("fs");
const dotenv = require("dotenv");

// .envファイルから環境変数を読み込む
dotenv.config();

const environmentFile = `
export const environment = {
  production: false,
  firebase: {
    apiKey: '${process.env.FIREBASE_API_KEY || ""}',
    authDomain: '${process.env.FIREBASE_AUTH_DOMAIN || ""}',
    projectId: '${process.env.FIREBASE_PROJECT_ID || ""}',
    storageBucket: '${process.env.FIREBASE_STORAGE_BUCKET || ""}',
    messagingSenderId: '${process.env.FIREBASE_MESSAGING_SENDER_ID || ""}',
    appId: '${process.env.FIREBASE_APP_ID || ""}',
    measurementId: '${process.env.FIREBASE_MEASUREMENT_ID || ""}'
  }
};
`;

// 必要に応じてディレクトリを作成
const dir = "./src/environments";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// 環境ファイルを書き込む
fs.writeFileSync(`${dir}/environment.ts`, environmentFile);
console.log("環境変数ファイルが生成されました");
