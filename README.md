# 概要
このリポジトリはnode環境での開発を学習するために作成するアンケートアプリのサーバーサイドリポジトリです。

# セットアップ
- clone
```
git clone git@github.com:totani-norihiro-arsaga/question-app-backend.git
cd question-app-backend
```
- install
```
npm install
```
- run server
```
docker compose up --build
```
- generate table
```
docker compose exec app npm run typeorm:run-migrations 
```

# api ドキュメント
以下にアクセスして下さい。

```http://localhost:3000/api```