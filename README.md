# REST API Server for FreeRADIUS
A simple REST Server for the FreeRadius rlm_rest module based on node.js and Express.js Framework.

## Intro
This is a complete working API for the rlm_rest module that enables Freeradius to authenticate via http. In this particular case I used MongoDB as the data storage, but essencialy any DB could be used. Logic for authentication is completely executed by the API. 

## Installation

#### Basics
Basicly we only need node.js, mongoDB and FreeRadius. Install node.js, MongoDB and Git on Debian based distros with:

```
curl -sL https://deb.nodesource.com/setup_7.x | bash -
apt-get install -y nodejs  mongodb-org git
```

##### FreeRADIUS
Unfortunately it's very hard to find FreeRADIUS prebuild with the rlm_rest module, no apt-get here. But we can build it ourselves with these steps:

Install build dependencies with:
```
apt-get install -y build-essential libssl-dev libcurl4-openssl-dev libjson-c-dev libtalloc-dev
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

## The API in depth
All details, addicional info, endpoints an how the API works are described below.

### What can I do with it and how it works?
This API enables you to create and manipulate users and access profiles that can be authenticated with FreeRADIUS. It verifies information provided by the NAS to the radius server to decide if the user is authorized to authenticate and, if it's the case, passes attributes to the server (like max download speed, etc...).

This API comes ready to be used in a simple ISP scenario where you can add users, upload and download speed policies. But can be expanded to cover much more by simply expanding the DB schema and authentication logic.

It can also receive FreeRADIUS accounting logs and save it to MongoDB for later use and analysis.


### Endpoint
The API has two main categories as enpoints:

* Radius - *Used to communicate with the FreeRADIUS server.*
* DB Manipulation - *Used to create, edit and remove entries in the database.*

##### Radius endpoints

```/check``` (GET) | Checks if the user exists in the DB, if true, 'Authorize' in FreeRADIUS succeeds and sets Auth-Type to REST.

```/auth``` (GET) | Checks if password is correcct and executes login logic. If ok, send attributes to FreeRadius and authenticates the user.

```/accounting``` (POST) | Receives accounting info from FreeRADIUS and logs it to DB.


##### DB endpoints

```/users``` (GET, POST) | GET: Lists all users in the DB | POST: Creates user

```/users/:userID``` (PUT, DELETE) | Updates or removes user.
	
```/profiles``` (GET, POST) | GET: Lists all profiles in the DB | POST: Creates profile
	
```/profiles/:profileID``` (PUT, DELETE) | Updates or removes profile.

### Securing your setup
This API dosn't have any security built in. If you'll use it somewhere please modify it to include some sort of authentication. The rlm_rest module also supports http auth enpoints, but for simplification reasons I did't configured it. PLease read the [rest module config](https://github.com/FreeRADIUS/freeradius-server/blob/v3.0.x/raddb/mods-available/rest) on how to implement it. Also, please read the [MongoDB guidelines](https://docs.mongodb.com/manual/security) on how to secure it too.
