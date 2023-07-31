#!/bin/bash

set -xe

sudo apt-get update --assume-yes && sudo apt-get install --assume-yes tmux


sudo apt-get install -y apt-transport-https ca-certificates gnupg curl sudo

install_terraform() {
  git clone \
    --depth=1 \
    https://github.com/tfutils/tfenv.git \
    ~/.tfenv

  echo 'export PATH="$HOME/.tfenv/bin:$PATH"' >> ~/.bash_profile

  mkdir -p ~/.local/bin/

  . ~/.profile

  ln -s ~/.tfenv/bin/* ~/.local/bin

  tfenv install
}

install_gcloud() {
  echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list

  curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | \
    sudo apt-key --keyring /usr/share/keyrings/cloud.google.gpg add -

  sudo apt-get update && sudo apt-get install google-cloud-cli

  sudo apt-get install google-cloud-sdk-gke-gcloud-auth-plugin
}

install_gcloud
install_terraform