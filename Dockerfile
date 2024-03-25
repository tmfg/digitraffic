# https://pages.github.com/versions/
FROM ruby:3.3.0-alpine

ENV DEBIAN_FRONTEND noninteractive
ENV LC_ALL en_US.UTF-8
ENV LANGUAGE en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LC_TYPE en_US.UTF-8

# Install and set locales ruby-dev
RUN apk -q --no-cache --update add nodejs npm make gcc g++ libc-dev\
 && apk cache clean \
 && gem install bundler \
 && npm install -g npm@latest

# Entrypoint
COPY docker-entrypoint.sh /

# Add additional files to install required Ruby gems and Node packages
# to make docker container startup faster
COPY Gemfile package.json package-lock.json _config_dev.yml /app/

WORKDIR /app
RUN cd /app

# Installing/updating required Ruby gems.
#RUN gem update --system
RUN bundle install
RUN bundle update

# Installing/updating required node packages
RUN npm install
RUN npm update --save
RUN npm audit fix | true



# To buil image and run node browser-sync
#ENTRYPOINT ["bundle", "exec"]
#CMD ["jekyll", "serve", "--config", "_config_dev.yml", "--host=0.0.0.0"]

# CMD
ENTRYPOINT ["/docker-entrypoint.sh"]
