#!/bin/bash

#Netbeast 2015
#This file allows to change bind name related with DNS name server

if [ "$1" != "none" ]; then
    #named.conf.default-zones file
    #sed -i /etc/bind/named.conf.default-zones -e '10s!.*!zone '$1' {''!'
    echo "zone $1 {" >> /etc/bind/named.conf.default-zones
    echo "    type master;"  >> /etc/bind/named.conf.default-zones
    echo "    file \"/etc/bind/db.local\";"  >> /etc/bind/named.conf.default-zones
	echo "};"  >> /etc/bind/named.conf.default-zones
    #db.local file
    #sed -i /etc/bind/db.local -e '18s!.*!home.'$1'.      IN      A       192.168.0.1''!'
    echo "\$TTL    604800" >> /etc/bind/db.local
	echo "home.$1.      IN      A       192.168.0.1" >> /etc/bind/db.local

    service bind9 restart
fi
