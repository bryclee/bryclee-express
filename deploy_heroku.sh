#!/bin/sh

# Script to run from another branch. Builds and pushes to heroku.
git branch -D heroku
git checkout -b heroku
gulp build
git add .build/* -f
git commit -m "Heroku build commit"
git push heroku heroku:master -f
git checkout -
