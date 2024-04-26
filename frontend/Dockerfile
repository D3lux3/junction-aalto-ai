FROM node:21.7-alpine

COPY ./medicine-availability-front ./frontend
WORKDIR /frontend

RUN npm i

EXPOSE 3006

ENTRYPOINT ["npm", "run"]