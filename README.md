# digitraffic

## Dev dependencies
* Ruby, 2.4.1
  * `ruby --version`
* RubyGems, 2.6.12
  * `gem --version`
* Bundler, 1.15.1
	* `bundle --version`
* Node.js, 8.0.0
  * `node --version`
* Npm, 5.3.0
    * `npm --version`
* Gulp, 3.9.1
    * `gulp --version`
    
### Install used Ruby version with nbenv
`rbenv global 2.4.1`

* Check that system uses Ruby version 2.4.1
`ruby --version`

### Install Gulp
`npm install --global gulp-cli`

* Check that Gulp is installed
`gulp --version`

## Install
1. `git clone https://github.com/finnishtransportagency/digitraffic.git` -> Clones the project from GitHub
2. `cd digitraffic` -> Move into directory
3. `bundle install` -> Install `Gemfile` dependencies
4. `npm install` -> Install `package.json` dependencies

## Start a local dev server
1. `git pull` -> Pull latest changes from GitHub
2. `npm run dev` -> Site opens at `localhost:3000`
3. Changes to the source are automatically refreshed in the preview

## Build the site and push to GitHub
1. `git pull` -> Pull latest changes from GitHub
2. `npm run build` -> Build the site for GitHub Pages
3. `git add .` -> Stages changes
4. `git commit -m “<message>”` -> Commits changes with given message
5. `git push -u origin master` -> Push changes to GitHub

## In addition

Additionally this repository contains a [Wiki](https://github.com/finnishtransportagency/digitraffic/wiki) for [Finnish transport agency](http://www.fta.fi)'s road digitraffic service. 

The wiki source can be cloned with:
 ````bash
 git clone https://github.com/finnishtransportagency/digitraffic.wiki.git
 ````
