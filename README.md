<a name="version" />

# Version Alpha 1.1.0

This is the first release with GUI!
You can find the files for the open source Táblafilc e-kreta API here!

<a name="changelog"/>

## Change log

- Added login screen
- Now hosted permanetly (here)[http://tablafilc.samunemeth.hu]

<a name="goal"/>

## Goal

The goal of this version, is to add a basic GUI.

<a name="usage"/>

## usage

There is some visual interface, but you cann't get evaluations and the timetable from it.

### Login

#### Code

You can login with the `getToken(username, password, institute, [callback]);` function.
For this the server will return a formatted **token** (sometimes called **bearer**), and it will be saved to the `token` varible.

#### GUI

Enter you username and you password to your e-kreta profile, then select your institute and press login (Bejelentkezés);


### Evaluatins

You can request for the evaluatins with the `getEvaluation(token, [callback]);` function.
The token parameter expects a json formatted token object, that we got from the `getToken` function.
The server will return the raw fetched json, and the function will save it to the `evaluations varible`.

#### Marks class

This is a client side class for **organising** the returned raw data.
You can use it by passing it the raw data, like this: `let marks = new Marks(evaluations)`.
You can get the organized evaluations from the `.marks` list.

### Timetable

I'm not planning on useing this data yet, so it is just for fun!
The request function is **not completed yet**!

### Institutes

You can send a request for all insitutes in the system with the `getInstitutes([callback]);` function.
This will return a list of institute objects.

### Callback functions

They are **optional**, the function will save the response regardless.
They will recive the server response as a parameter.
If the server returns an error, the callback function won't be called!

### Errors

Error handeling is on the **minimal** side for now.
In case of an error, the server will return an error message, with a code indicating the source off the error.
Incorrect password or username counts as an error too!

<a name="runninglocaly" />

## Running localy

Feel free to download, and modify the code!
Before running it, make sure that all packages are installed, by running `npm intall` in the root directory.
You can run the application with `node index.js`, or with the shorter `node .` command.
The application will run on port `3919` by default, but you can change that in the *index.js* file, with the `PORT` varible.

### Runnning in 2 steps:

1. `npm install`
2. `node .`

<a name="conclusion" />

## Conclusin

This is just a small part of a bigger project!

- [X] API connection
- [X] Login screen
- [ ] Interface
- [ ] Calculations
- [ ] Project planner (Maybe?)

<a name="sources" />

## Sources

[API documentation](https://github.com/bczsalba/ekreta-docs-v3) (Copyright (c) 2020 bczsalba)
