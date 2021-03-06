### Stage 1: build ###
FROM node:14.16.0-alpine as builder
MAINTAINER Daniel Goliszewski "taafeenn@gmail.com"

# Set working directory.
RUN mkdir /anpm-ui
WORKDIR /anpm-ui

# Copy app dependencies.
COPY package*.json /anpm-ui/

# Install app dependencies.
RUN npm install @angular-devkit/build-angular
RUN npm install

# Copy app files.
COPY . /anpm-ui

# Build app
RUN npm run build -- --output-path=./dist/out

### Stage 2: delivery ###

FROM nginx:1.15.7-alpine
MAINTAINER Daniel Goliszewski "taafeenn@gmail.com"

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy output directory from builder to nginx image.
COPY --from=builder /anpm-ui/dist/out /usr/share/nginx/html

# Copy nginx configuration file.
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
