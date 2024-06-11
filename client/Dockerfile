# Stage 1: Build
FROM node:16-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Run
FROM node:16-alpine
WORKDIR /app
COPY --from=build /app/build ./build
COPY package.json package-lock.json ./
RUN npm install --only=production
EXPOSE 3000
CMD ["npm", "start"]

