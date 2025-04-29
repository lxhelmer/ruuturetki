FROM node:23

WORKDIR /usr/src/app

ARG VITE_BACKEND_URI

ENV VITE_BACKEND_URI=$VITE_BACKEND_URI

COPY . . 
RUN npm ci
RUN npm run build
RUN npm install -g serve

CMD ["serve", "dist"]
