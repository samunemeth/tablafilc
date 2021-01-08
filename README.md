<a name="version" />

# Version Alpha 2.0.0

A lot of things changed in this update, but the most important thig is the **grade calculator**!

<a name="changelog"/>

## Change log

- Added the grade calculator screen, and possibility for othere screens too
- Switched from chosen to [select2](#select2)
- Added username and school storing to local storage

<a name="goal"/>

## Goal

The goal of this version, is to implement the basic grade calculator, and experiment with the design of it.

<a name="usage"/>

## Usage

### Login

Enter you e-kreta password and username to the input boxes, select your school from the dropdown and press login.

### Calculating grades

Select your desired class, then enter a grade that is better than your avrage now, then press calculate!
You might get an error message, that your goal has alredy bean reached!

<a name="runninglocaly" />

## Running localy

Feel free to download, and modify the code!
Before running it, make sure that all packages are installed, by running `npm intall` in the root directory.
You can run the application with `node index.js`, or with the shorter `node .` command.
The application will run on port `3919` by default, but you can change that in the *index.js* file, with the `PORT` varible.

### in 2 steps:

1. `npm install`
2. `node .`

<a name="conclusion" />

## Conclusin

We are getting there!

- [X] API connection
- [X] Login screen
- [x] Interface
- [x] Calculations
- [ ] Project planner (Maybe?)

<a name="sources" />

## Sources

[API documentation](https://github.com/bczsalba/ekreta-docs-v3) (Copyright (c) 2020 bczsalba)

<a name="select2" />

[select2](https://github.com/select2/select2) (Copyright (c) 2012-2017 Kevin Brown, Igor Vaynberg, and Select2 contributors)
