
FROM node:latest

WORKDIR /server
ADD . /server

RUN npm i
RUN npm rebuild
RUN npm run build

ENV PATH "/server/google-cloud-sdk/bin:$PATH"

ENV DOCKER TRUE

EXPOSE 8080

CMD ["sh", "gcloud-setup.sh"]
CMD ["node", "dist/index.js"]
