#!/bin/sh

NODE_USER=mljia pm2 start  bin/www -i 2 -o '/data/logs/mljia/web_node/web-out.log' -e '/data/logs/mljia/web_node/web-err.log'