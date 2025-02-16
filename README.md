<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>


# Loan Track

## Project Description
The Purpose of the porejct is to create a system help the user to track their loan records.

The user can Add Peoples and track the loan/return records for each person.

## Tech Stacks

I've used laravel framework with Inertia+React.

For the database, for the sake of simple setup, I've used Sqlite as I'm trying to utilize the Eloquent ORM.

I've use Laravel sail as a development setup to share the codebase effectively.

## Database Structure
### Table Structures

- **User**
    - id

- **People**
    - id
    - name
    - phone
    - picture
    - address
    - user_id

- **Transactions**
    - id
    - user_id
    - person_id
    - amount
    - datetime


## Route Bindings

Registered *PeopleController* and *TransactionController* as resource controllers.
Used all actions on the *PeopleController* but only the **Index & show** for the transaction controllers.

Used Nested Resource / Nested Routing for the Transactions as I want  to utilize the Laravel's implicit binding on the request instead of manually passing the Person_id on the request form.


## UI
