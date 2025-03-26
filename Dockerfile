# https://pages.github.com/versions/
FROM ruby:3.3.1-alpine

ENV DEBIAN_FRONTEND=noninteractive
ENV LC_ALL=en_US.UTF-8
ENV LANGUAGE=en_US.UTF-8
ENV LANG=en_US.UTF-8
ENV LC_TYPE=en_US.UTF-8

# Install and set locales ruby-dev
RUN apk -q --no-cache --update add nodejs npm make gcc g++ libc-dev \
&& npm install --global pnpm@latest \
&& apk cache clean \
&& gem install bundler

# Entrypoint
COPY docker-entrypoint.sh /

# Add additional files to install required Ruby gems and Node packages
# to make docker container startup faster
COPY Gemfile package.json _config_dev.yml /app/

WORKDIR /app
RUN cd /app

# Installing/updating required Ruby gems.
RUN bundle install
RUN bundle update

# CMD
ENTRYPOINT ["/docker-entrypoint.sh"]
