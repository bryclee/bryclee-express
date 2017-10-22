#!/bin/sh

# Verify that heroku branch exists
git remote | grep ^heroku$
exit_status=$?
if [ ! $exit_status -eq 0 ]
then
    echo "heroku remote needs to be configured first"
    echo "try running heroku git:remote -a <app name>"
    exit 1
fi

# Script to run from another branch. Builds and pushes to heroku.
git branch -D heroku
git checkout -b heroku
git add .build/* -f
git commit -m "*** build commit for heroku ***"
git push heroku heroku:master -f
git checkout -
