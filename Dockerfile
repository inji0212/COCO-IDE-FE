# 빌드 스테이지
FROM node:lts as build

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

# Nginx를 사용하는 런타임 스테이지
FROM nginx:stable-alpine

# 기본 Nginx 설정을 제거하고 새로운 설정을 복사
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

# 빌드 결과물을 Nginx의 웹 루트로 복사
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
