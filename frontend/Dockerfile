FROM node:14.17-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

RUN npm run build

#ENV REACT_APP_API_BASE_URL=http://10.36.0.22:5000
#EXPOSE 3000
ENV REACT_APP_API_BASE_URL=http://10.36.0.22:6500
EXPOSE 6300

CMD ["npx", "serve", "-s", "build"]
