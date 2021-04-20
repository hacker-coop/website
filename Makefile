LEKTOR_SERVER_FLAGS=-h 127.0.0.1
# minify javascript assets, compile scss assets
LEKTOR_PLUGIN_FLAGS=-f scss
LEKTOR_DEPLOY_FLAGS=

all:
	set -e
	sudo make install
	make build
	make server

.ONESHELL:
install:
	echo -e "\nYou have to run make install with sudo\n"
	set -e
	if hash nix 2>/dev/null; then
	  nix-shell --comand 'Done!'
	else
	  if hash apt-get 2>/dev/null; then
	    apt-get update -qq >/dev/null && apt-get install -qq apt-utils imagemagick python3-pip python3-setuptools gcc git-lfs
	  elif hash pacman 2>/dev/null; then
	    pacman -Sy imagemagick python-pip glibc lib32-glibc gcc git-lfs dos2unix --noconfirm
	  elif hash dnf 2>/dev/null; then
	    dnf install -y ImageMagick python3-pip gcc git-lfs
	  else
	    echo -e "Please install Imagemagick, python3-pip git-lfs and gcc dos2unix"
	  fi
	  pip3 install wheel  --upgrade
	  pip3 install lektor --upgrade
	  pip3 install lektor-scss --upgrade
	fi

build:
	set -e
	if hash nix 2>/dev/null; then
	  # sadly lektor has its own not configurable package installer
	  # remove all referenced plugins and load them manually in shell.nix
	  sed -n '/packages/q;p' vebit.lektorproject > vebit.lektorproject.tmp
	  mv vebit.lektorproject.tmp vebit.lektorproject
	  nix-shell --command 'lektor build'
	elif python3 -m lektor --version 2>/dev/null; then
	  python3 -m lektor build $(LEKTOR_PLUGIN_FLAGS)
	else
	  lektor build $(LEKTOR_PLUGIN_FLAGS)
	fi
	if hash unix2dos 2>/dev/null; then
	  unix2dos temp/builds/vebit.xyz/termine/*.ics
	fi

server:
	set -e
	if hash nix 2>/dev/null; then
	  # sadly lektor has its own not configurable package installer
	  # remove all referenced plugins and load them manually in shell.nix
	  sed -n '/packages/q;p' vebit.lektorproject > vebit.lektorproject.tmp
	  mv vebit.lektorproject.tmp vebit.lektorproject
	  nix-shell --command 'lektor server'
	elif python3 -m lektor --version 2>/dev/null; then
	  python3 -m lektor server $(LEKTOR_SERVER_FLAGS) $(LEKTOR_PLUGIN_FLAGS)
	else
	  lektor server $(LEKTOR_SERVER_FLAGS) $(LEKTOR_PLUGIN_FLAGS)
	fi

deploy:
	set -e
	lektor build $(LEKTOR_PLUGIN_FLAGS) $(LEKTOR_DEPLOY_FLAGS)
	if hash unix2dos 2>/dev/null; then
	  unix2dos temp/builds/vebit.xyz/termine/*.ics
	fi
	lektor deploy $(LEKTOR_PLUGIN_FLAGS) $(LEKTOR_DEPLOY_FLAGS) --key-file ~/.ssh/ssh_ed25519
