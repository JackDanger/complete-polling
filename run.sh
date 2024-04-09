#!/bin/bash

set -x
set -euo pipefail

function cleanup {
  wait
  docker ps | grep [j]ackdanger | awk '{print $1}' | xargs docker kill
}

(
	cd server
  docker build -t jackdanger:backend .
  docker run -p 1337:1337 -e RAILS_ENV=development jackdanger:backend
) &

(
  sleep 15
  open http://localhost:5173/polls
) &

brew install vite
yarn
yarn dev

trap cleanup EXIT
exit
