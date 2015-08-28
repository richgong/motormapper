#!/usr/bin/env bash

virtualenv .venv

source _include.sh

if [[ "$OSTYPE" == "darwin"* ]]; then # Mac
  echo "Mac install"
  # for guppy: http://stackoverflow.com/questions/22313407/clang-error-unknown-argument-mno-fused-madd-python-package-installation-fa
  export CFLAGS=-Qunused-arguments
  export CPPFLAGS=-Qunused-arguments
  #export ARCHFLAGS="-Wno-error=unused-command-line-argument-hard-error-in-future"
fi

echo "=== Pip install..."
# install python modules in virtualenv
pip install -r requirements.txt
