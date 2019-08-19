FROM ruby:2.5.3

# Installa and set locales
RUN apt-get -qq update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y locales && \
    rm -rf /var/lib/apt/lists/* && \
    localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8

ENV LC_ALL en_US.UTF-8
ENV LANGUAGE en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LC_TYPE en_US.UTF-8

# Install node and npm from deb.nodesource.com as version in stretch repo is outdated
RUN apt-get -qq update && \
    apt-get install curl software-properties-common -y
RUN gem install bundler
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN DEBIAN_FRONTEND=noninteractive apt-get install nodejs

RUN node -v
RUN npm -v

# Entrypoint
COPY docker-entrypoint.sh /

# Add additional files to install required Ruby gems and Node packages
# to make docker container startup faster
COPY Gemfile package.json package-lock.json _config_dev.yml /

RUN printf "\nInstalling required node packages. Please wait..."
RUN npm install
RUN npm update --save
RUN npm audit fix

RUN printf "\nInstalling required Ruby gems. Please wait..."
RUN bundle install

RUN apt-get clean && \
	rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

WORKDIR /app

# To buil image and run node browser-sync
#ENTRYPOINT ["bundle", "exec"]
#CMD ["jekyll", "serve", "--config", "_config_dev.yml", "--host=0.0.0.0"]

# CMD
ENTRYPOINT ["/docker-entrypoint.sh"]