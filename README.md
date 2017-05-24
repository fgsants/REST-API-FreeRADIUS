# REST API Server for FreeRADIUS
A simple REST Server for the FreeRadius rlm_rest module based on node.js and Express.js Framework.

## Intro
This is a complete working API for the rlm_rest module that enables Freeradius to authenticate via http. In this particular case I used MongoDB as the data storage, but essencialy any DB could be used. Logic for authentication is completely executed by the API. 

## Installation

#### Basics
Basicly we need only node.js, mongoDB and FreeRadius. Install node.js, MongoDB and Git on Debian based distros with:

```
curl -sL https://deb.nodesource.com/setup_7.x | bash -
apt-get install -y nodejs  mongodb-org git
```

##### FreeRADIUS
Unfortunately it's very hard to find FreeRADIUS prebuild with the rlm_rest module, no apt-get here. But que can build it ourselfes with these steps:

Install build dependencies with:
```
apt-get install -y build-essential libssl-dev libcurl4-openssl-dev
```

Then download and build FreeRADIUS with:
```
git clone -b v3.0.x https://github.com/FreeRADIUS/freeradius-server.git
cd freeradius-server
./configure
make
make install
```

Configure FreeRADIUS to startup on boot and start it:
```
cp /usr/local/sbin/rc.radiusd /etc/init.d/radiusd
chmod 755 /etc/init.d/radiusd
/etc/init.d/radiusd start
```

#### API Install
Now install this API with:
```
git clone https://github.com/fgsants/REST-API-FreeRADIUS.git
cd REST-API-FreeRADIUS
npm install
```
And finaly, copy the FreeRADIUS config files:
```
cp resources/freeradius/nano /usr/local/etc/raddb/sites-enabled/nano
cp resources/freeradius/rest /usr/local/etc/raddb/mods-enabled/rest
cp resources/freeradius/radiusd.conf /usr/local/etc/raddb/radiusd.conf
```

#### Starting everything up

Start the API server with ```npm run start```.
The API will be available at http://localhost:4000
