dev: bundle migrate
	cd server && bundle exec rails server --port 1337

bundle:
	cd server && bundle
 
migrate:
	cd server && rails db:migrate

