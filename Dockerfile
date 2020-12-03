FROM node:12
WORKDIR /usr/src/app
EXPOSE 3000
COPY . .
RUN yarn
RUN yarn build
RUN npm install -g serve
CMD ["serve", "-s", "build"]