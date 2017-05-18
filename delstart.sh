#!/bin/sh

NODE_USER=mljia pm2 delete battle
NODE_USER=mljia pm2 start bin/battle -i 2 -o '/data/logs/mljia/web_node/web-out.log' -e '/data/logs/mljia/web_node/web-err.log'
