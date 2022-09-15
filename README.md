# Horizons: Companion App: 
A companion app for the in-development Horizons TRPG system, with features to facilitate character creation and character sheet storage.

* Ruby version: 2.7.3

* Before initial start up, please run "bundle install" in your console, followed by "bundle exec rake db:create" and "bundle exec rake db: migrate". Once database is set up, please run "bundle exec rake db:seed" to populate the game elements.

* Makes use of the AWS-fog gem and AWS S3 storage. Please see .env.example for the proper setup of this API.
