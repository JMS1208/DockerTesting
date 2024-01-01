FROM --platform=linux/amd64 nginx

#root에 app 디렉토리 생성
RUN mkdir /app

#work dir 고정
WORKDIR /app

#work dir에 build 디렉토리 생성 /app/build
RUN mkdir ./build

#host pc의 현재경로의 build 디렉토리를 workdir의 build 디렉토리로 복사
ADD ./build ./build

#nginx의 default.conf 를 삭제
RUN rm /etc/nginx/conf.d/default.conf

#host pc(이미지를 빌드하는 곳)의 nginx.conf 를 아래 경로에 복사, 우측이 컨테이너 경로
COPY ./nginx.conf /etc/nginx/conf.d

#80 포트를 오픈
EXPOSE 80 443

#container 실행 시 자동으로 실행할 command. nginx를 시작함
CMD ["nginx", "-g", "daemon off;"]