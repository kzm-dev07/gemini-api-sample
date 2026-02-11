## これは何か
Gemini APIのお試し用プロジェクト

## 使い方

1. インストール
```sh
npm i
# もしくは
pnpm i
```

2. APIキーを発行する
https://aistudio.google.com/app/api-keys?hl=ja


3. envファイルを作成し、APIキーを設定する

```sh
cp .env.sample .env

sed -i '' 's/{GEMINI_API_KEY}/your_api_key/' .env
```

2. 実行する
```sh
node ./src/index.js
```
