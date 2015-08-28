alias missing_os='echo "Missing for OS: $OSTYPE"'
if [[ "$OSTYPE" == "darwin"* ]]; then
  _mac=1
elif [[ "$OSTYPE" == "msys" ]]; then
  _win=1
elif [[ "$OSTYPE" == "linux-gnu" ]]; then
  _nix=1
else missing_os; fi


if [[ -n "$_win" ]]; then
  # Windows
  VENV=".venv/Scripts/activate"
else
  VENV=".venv/bin/activate"
fi

if [[ -f "$VENV" ]]; then
  source $VENV
fi

export PYTHONPATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )" # python path is the same as dir of this file
