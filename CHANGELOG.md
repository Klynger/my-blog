# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.2] - 2019-09-13

### Changed

- Remove `scalars` module and declaration of method returns.

## [0.3.1] - 2019-08-06

### Changed

- `User` model class name to be `UserModel`.
- Pass responsability from the repositories of throwing exceptions to the services.

### Fixed

- `PUT` verb of `/user/:id` was doing what a `PATCH` should do.

## [0.3.0] - 2019-08-06

### Added

- Global typings module.
- Relation between `Post` and `User`.

## [0.2.0] - 2019-08-03

### Added

- `/post/ (POST)` route.
- `/post/:id (GET)` route.
- `/post/:id (PUT)` route.
- `/post/:id (DELETE)` route.
- e2e initial tests to the post module.

## [0.1.0] - 2019-08-03

### Added

- `/user/ (POST)` route.
- `/user/:id (GET)` route.
- `/user/:id (PUT)` route.
- `/user/:id (DELETE)` route.
- e2e initial tests to the user module.

### Changed

- Move app files to the files folder.
