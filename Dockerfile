# https://pages.github.com/versions/
FROM ruby:3.2.2

# Install and set locales
RUN apt-get -qq update \
 && DEBIAN_FRONTEND=noninteractive apt-get install -y locales \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/* \
 && localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8

ENV LC_ALL en_US.UTF-8
ENV LANGUAGE en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LC_TYPE en_US.UTF-8
ENV APT_KEY_DONT_WARN_ON_DANGEROUS_USAGE=dontWarn

# Install node and npm from deb.nodesource.com as version in stretch repo is outdated
RUN apt-get -qq update \
 && apt-get install curl software-properties-common -y \
 && curl -sL https://deb.nodesource.com/setup_18.x | bash - \
 && DEBIAN_FRONTEND=noninteractive apt-get install nodejs \
 && npm install -g npm@latest \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

# Entrypoint
COPY docker-entrypoint.sh /

# Add additional files to install required Ruby gems and Node packages
# to make docker container startup faster
COPY Gemfile package.json package-lock.json _config_dev.yml /app/

RUN printf "\nInstalling required node packages." \
 && cd /app \
 && npm install \
 && npm update --save \
# The command '/bin/sh -c npm audit' returned a non-zero code: 1
 && npm audit fix | true \
 && printf "\nInstalling required Ruby gems." \
 && bundle install

# To buil image and run node browser-sync
#ENTRYPOINT ["bundle", "exec"]
#CMD ["jekyll", "serve", "--config", "_config_dev.yml", "--host=0.0.0.0"]

WORKDIR /app

# CMD
ENTRYPOINT ["/docker-entrypoint.sh"]
