#!/bin/bash

pm2 start --name "histories-service" npm -- run histories-service
pm2 start --name "bill-service" npm -- run bill-service
