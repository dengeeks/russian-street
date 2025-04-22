FROM node:20.9.0 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build
CMD cp -r ./dist/ /frontend_static/