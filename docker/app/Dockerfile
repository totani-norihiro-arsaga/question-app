# ベースイメージとして最新の安定版Node.jsを指定
FROM node:18-alpine

# 作業ディレクトリを設定
WORKDIR /app

# Nest CLIをグローバルにインストール
RUN npm install -g @nestjs/cli

# アプリケーションのポートを指定
EXPOSE 3000

# アプリケーションを起動
CMD ["npm", "run", "start:dev"]
