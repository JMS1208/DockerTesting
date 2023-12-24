FROM node:alpine as build
#라벨 설정
LABEL authors="minseok95"
#작업 디렉토리 설정
WORKDIR /app
# 의존성 파일 복사 - WORKDIR에 복사
COPY package.json .
# 의존성 파일 설치
RUN npm install
# 애플리케이션 소스 복사
COPY . .
# 리액트 애플리케이션 빌드
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
#nginx 서버가 80번 포트로 리스닝한다는 것
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
