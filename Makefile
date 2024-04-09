server_dev: bundle
	cd server && bundle exec rails server --port 1337

bundle:
	cd server && bundle

server:
	cd server && docker build -t jackdanger:backend .
	cd server && docker run --rm -p 1337:1337 -e RAILS_ENV=development -it jackdanger:backend


