FROM alpine:3.4

RUN apk add --update \
    bash \
    build-base \
    curl \
    git \
    imagemagick-dev \
    libffi-dev \
    libffi-dev \
    linux-headers \
    nodejs \
    openssl-dev \
    readline-dev \
    tar \
    vim \
    wget \
    zlib-dev \
  && rm -rf /var/cache/apk/*

# rbenv
ENV PATH /usr/local/rbenv/shims:/usr/local/rbenv/bin:$PATH
ENV RBENV_ROOT /usr/local/rbenv
ENV RUBY_VERSION 2.4.1
ENV CONFIGURE_OPTS --disable-install-doc

RUN git clone --depth 1 git://github.com/sstephenson/rbenv.git ${RBENV_ROOT} \
  &&  git clone --depth 1 https://github.com/sstephenson/ruby-build.git ${RBENV_ROOT}/plugins/ruby-build \
  &&  git clone --depth 1 git://github.com/jf/rbenv-gemset.git ${RBENV_ROOT}/plugins/rbenv-gemset \
  && ${RBENV_ROOT}/plugins/ruby-build/install.sh

RUN echo 'eval "$(rbenv init -)"' >> /etc/profile.d/rbenv.sh 

RUN rbenv install $RUBY_VERSION \
  && rbenv global $RUBY_VERSION

RUN gem install bundler

COPY docker-entrypoint.sh /

ENTRYPOINT ["bash", "-c", "/docker-entrypoint.sh"]