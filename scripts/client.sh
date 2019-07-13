#!/bin/bash

set -ex

cd client
npm i
npm run test
npm run build
