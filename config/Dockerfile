# minimal debian
FROM alpine:3.7

# nodejs v10+ (shipping npm and yarn too)
FROM mhart/alpine-node:10.1

# build-arg NODE_ENV => env NODE_ENV
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

# install essential packages
RUN apk add --no-cache --update openssh bash vim jq curl tzdata

# install PM2 (process manager)
RUN npm install -g pm2

# install dependencies for sharp and img-loader
RUN apk add --no-cache --update --update-cache --repository https://dl-3.alpinelinux.org/alpine/edge/testing/ vips-dev fftw-dev
RUN apk add --no-cache --update gifsicle pngquant libpng-dev zlib-dev g++ make

# set timezone for server
RUN cp /usr/share/zoneinfo/Europe/Rome /etc/localtime

# copy project folder into /var: this command has no effect on development because we're going to link host /var/project as volume to watch filesystem changes and build incrementally
COPY ./ /var/project

# cd into project folder
WORKDIR /var/project

# install JS dependencies: always make NODE_ENV=development explicit to install devDependencies as well (needed to build)
RUN yarn install --production=false --ignore-engines

# production build must be processed before pushing the image, development watch filesystem changes and build incrementally
RUN yarn build:prod

# expose ports
EXPOSE 80
EXPOSE 443

CMD ["yarn", "serve:prod"]