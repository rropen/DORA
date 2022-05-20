FROM node:16

# Create app directory
WORKDIR /src

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 4000
CMD [ "yarn", "prod" ]