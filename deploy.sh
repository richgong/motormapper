#!/usr/bin/env bash

if [ -n "$(git status --porcelain)" ]; then 
  echo "There are local changes. Please commit your changes first!"
else 
  git push --force heroku master
fi
