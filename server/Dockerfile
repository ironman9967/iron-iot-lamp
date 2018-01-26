
FROM node:latest

WORKDIR /server
ADD . /server

RUN npm i
RUN npm rebuild
RUN npm run build

ENV PATH "/server/google-cloud-sdk/bin:$PATH"
ENV PORT 8080
ENV DOCKER TRUE

EXPOSE 8080

CMD ["npm", "run", "start"]
