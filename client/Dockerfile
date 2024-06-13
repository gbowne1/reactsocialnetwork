FROM node:20-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

RUN npm install --only=production
EXPOSE 3000
CMD ["npm", "start"]

