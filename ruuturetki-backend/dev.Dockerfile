from node:23
workdir /usr/src/app
COPY . .
RUN npm install

CMD ["npm", "run", "dev", "--", "--host"]
