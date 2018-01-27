Install Homebrew
Check if you have brew installled. `brew -v`

If you do not, install brew.

```/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"```

Install nvm (node version manager)
Minimum nvm 0.33.2

Install Script

```curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash```

Add the folling lines to your bash_profile. The command nano ~./bash_profile allows you to edit.

```export NVM_DIR="$HOME/.nvm"```

```[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm```

Verify install. `nvm --version`
