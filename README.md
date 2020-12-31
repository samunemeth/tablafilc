# Version Alpha 1.0.0

## Table of contents

1. [Change log](#changelog)

<a name="changelog"/>

## Change log

This is the first version!

## Goal

The goal of this version, is to implemet basic API connectivity.

## usage

It's just a **command line** api!
There is no visual interface, but you can login, get evaluations and the timetable.

### Login

You can login with the `getToken(username, password, institute, [callback]);` function.
For this the server will return a formatted **token** (sometimes called **bearer**), and it will be saved to the `token` varible.


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

### Callback functions

They are **optional**, the function will save the response regardless.
They will recive the server response as a parameter.
If the server returns an error, the callback function won't be called!

### Errors

Error handeling is on the **minimal** side for now.
In case of an error, the server will return an error message, with a code indicating the source off the error.
Incorrect password or username counts as an error too!

## Running localy

Feel free to download, and modify the code!
Before running it, make sure that all packages are installed, by running `npm intall` in the root directory.
You can run the application with `node index.js`, or with the shorter `node .` command.
The application will run on port `3919` by default, but you can change that in the *index.js* file, with the `PORT` varible.

### Runnning in 2 steps:

1. `npm install`
2. `node .`

## Conclusin

This is just a small part of a bigger project!

- [X] API connection
- [ ] User interface
- [ ] Calculations
- [ ] Project planner (Maybe?)

## Sources

[API documentation](https://github.com/bczsalba/ekreta-docs-v3) (Copyright (c) 2020 bczsalba)
