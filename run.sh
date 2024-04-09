#!/bin/bash

set -euo pipefail

(
	cd server
  docker build -t jackdanger:backend .
  docker run --rm -p 1337:1337 -e RAILS_ENV=development -it jackdanger:backend
) &

(
	brew install vite
	yarn
	yarn dev
) &


sleep 15
open http://localhost:5173/polls
