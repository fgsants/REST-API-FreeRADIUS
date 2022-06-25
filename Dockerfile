FROM alpine:3.16

RUN /bin/sh -c "apk add --no-cache bash"

RUN apk add curl talloc-dev linux-headers openssl openrc git build-base libressl-dev curl-dev json-c-dev; \
    apk add nodejs npm;

RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -; \
    echo 'http://dl-cdn.alpinelinux.org/alpine/v3.9/main' >> /etc/apk/repositories; \
    echo 'http://dl-cdn.alpinelinux.org/alpine/v3.9/community' >> /etc/apk/repositories; \
    apk update; \
    apk add mongodb mongodb-tools; \
    mkdir -p /data/db/; \
    chown mongodb:mongodb /data/db; \
    rc-update add mongodb default;

RUN git clone -b v3.0.x https://github.com/FreeRADIUS/freeradius-server.git; \
    cd freeradius-server; \
    ./configure; \
    make; \
    make install;

RUN cp /usr/local/sbin/rc.radiusd /etc/init.d/radiusd; \
    chmod 755 /etc/init.d/radiusd; \
    /etc/init.d/radiusd start;

RUN git clone https://github.com/fgsants/REST-API-FreeRADIUS.git; \
    cd REST-API-FreeRADIUS; \
    npm install; \
    cp resources/freeradius/nano /usr/local/etc/raddb/sites-enabled/nano; \
    cp resources/freeradius/rest /usr/local/etc/raddb/mods-enabled/rest; \
    cp resources/freeradius/radiusd.conf /usr/local/etc/raddb/radiusd.conf;

WORKDIR REST-API-FreeRADIUS
RUN npm install mongoose web-encoding@1.1.3;
CMD mongod --bind_ip 0.0.0.0 --fork --logpath /var/log/mongod.log ; npm run start
