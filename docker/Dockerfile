FROM node: macOS Mojave v10.14

ENV NODE_ENV production

RUN mkdir /maxmilhas

WORKDIR /maxmilhas

COPY . /maxmilhas

RUN npm install

RUN npm start

EXPOSE 3000

ENTRYPOINT ["node", "app"]
