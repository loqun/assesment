# Assesment Project

## Prerequisite
Laravel Herd for best dev experience
https://herd.laravel.com/windows

setup the database as in this i setup mariadb hence need mariadb or your own and need to configure db

## Overview

This is an assessment project for **HendShake**. It includes various tasks, exercises, and tools to demonstrate core functionalities. It is a Todo List app

## Features

- **Feature 1:** CRUD on the todo list.
- **Feature 2:** Show the total list.
- **Feature 3:** Persistence data using localStorage.

## Installation

To get started with the project, clone the repository:

```bash
git clone https://github.com/loqun/assesment.git

```
Install dependencies using Composer and NPM:

```bash
composer install
npm install
```

Generate appkey and migration
```bash
php artisan generate:key
php artisan migrate
```

Run the project locally with:
if you are using herd (make sure to link this app using herd link) 
```bash
herd open 
```


If you want to build just run 
```bash
npm run build
```


