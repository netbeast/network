#!/bin/bash

#Netbeast 2015
#This file allows to change the ssid name and password of the Network
FILE="/etc/hostapd/hostapd.conf"
#FILE=test

if [ "$1" != "none" ]; then
		sed -i $FILE -e '3s!.*!ssid='$1'!'
fi

if [ "$2" != "none" ]; then
   	sed -i $FILE -e '10s!.*!wpa_passphrase='$2'!'
fi

if [ "$4" != "none" ]; then
   	sed -i $FILE -e '5s!.*!channel='$4'!'
fi

if [ "$1" != "none" ] || [ "$2" != "none" ] || [ "$4" != "none" ]; then
service hostapd restart
fi