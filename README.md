# digitraffic

## Dev dependencies
* Bundler, 1.15.1
    * `bundle --version`
* Npm, 5.3.0
    * `npm --version`
* Gulp, 3.9.1
    * `gulp --version`

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

This repository contains a [Wiki](https://github.com/finnishtransportagency/digitraffic/wiki) for [Finnish transport agency](http://www.fta.fi)'s road digitraffic service. 

This repository also has some metadata, but most of our metadata is actually available in the [Metadata repository](https://github.com/finnishtransportagency/metadata)

|file |fi |en |
|:-----|:---|:---|
|[Meta\_RWcameras.csv][Meta_RWcameras.csv] (ISO 8859-15)|LAM-pisteiden staattiset tiedot|The static information of automatic measuring devices|

[Meta_RWcameras.csv]: metadata/Meta_RWcameras.csv