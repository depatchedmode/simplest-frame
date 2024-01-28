# Changelog

## [Unreleased]

## [0.2.1] - [#16](https://github.com/noeldelgado/parse-css-color/pull/16) - 2022-04-07
### Fixed
- index.d.ts [#15](https://github.com/noeldelgado/parse-css-color/pull/15)

### Added
- README: badges(librariesio, lgtm) [f36810e](https://github.com/noeldelgado/parse-css-color/commit/f36810ec81da9352e078a2ebe5dcdee4635e8735)

## [0.2.0] - [#12](https://github.com/noeldelgado/parse-css-color/pull/12) - 2022-03-16
### Added
- Type definitions [c0ec124](https://github.com/noeldelgado/parse-css-color/commit/c0ec124f398036f4a03d8ede41fd2d83e3e142c7)

## [0.1.2] - [#2](https://github.com/noeldelgado/parse-css-color/pull/2) - 2020-05-19
### Added
- unpkg CDN [bc542b9](https://github.com/noeldelgado/parse-css-color/commit/bc542b962c0eb04127c6d48fde5a2daec9f31589)
- jsDelivr CDN [5fb8022](https://github.com/noeldelgado/parse-css-color/commit/5fb8022aa323bc86298a32bd9fbb85c403885804)
-  more input tests:
  - empty, undefined, null [57e4b08](https://github.com/noeldelgado/parse-css-color/commit/57e4b088c8eaa2a7c59911ab599211f7e958e1c8)
  - false, true, 0, 1 [f4b1032](https://github.com/noeldelgado/parse-css-color/commit/f4b103227c741b80ba7e1d9338f8ec422ce8d8f5)

### Fixed
- return null if input is not string [8c203de](https://github.com/noeldelgado/parse-css-color/commit/8c203ded32e1e287a2c8ba84b926f18722887ca7)

## [0.1.1] - [#1](https://github.com/noeldelgado/parse-css-color/pull/1) - 2020-05-19
### Added
- add related projects [9d229e6](https://github.com/noeldelgado/parse-css-color/commit/9d229e6dcd7b20801a522b30c7b419e4d3619352) [c81fe20](https://github.com/noeldelgado/parse-css-color/commit/c81fe2060bb2da0bb13a6091a5d7ec24d984184c)
- add CHANGELOG [29d92b4](https://github.com/noeldelgado/parse-css-color/commit/29d92b4ef93e6fd3a337afb20058eae24b5c7712)
- add currentColor and inherit fail tests [fd85e7b](https://github.com/noeldelgado/parse-css-color/commit/fd85e7b70ca425f06d364fe3350cfc418fa5874e)

### Changed
- move distributed files to dist folder instead of lib (for npm) [1af0a5d](https://github.com/noeldelgado/parse-css-color/commit/1af0a5d7b3c86620c6e3bd52df0b560099d23392)
- rename digit/number [5f75605](https://github.com/noeldelgado/parse-css-color/commit/5f75605c9c8135a8855e234dd1b28f052ce86f7c)

### Removed
- remove lib files from source code [d6591d3](https://github.com/noeldelgado/parse-css-color/commit/d6591d38824e68d0f3768cc61f8b4ba79384f35c)

## [0.1.0] - 2020-05-18
### Added
- support for:
  - #RGB|A, #RRGGBB|AA
  - RGB|A module level 3 and 4
  - HSL|A module level 3 and 4
  - color keywords
  - transparent

[Unreleased]: https://github.com/noeldelgado/parse-css-color/compare/v0.2.1...HEAD
[0.2.1]: https://github.com/noeldelgado/parse-css-color/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/noeldelgado/parse-css-color/compare/v0.1.2...v0.2.0
[0.1.2]: https://github.com/noeldelgado/parse-css-color/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/noeldelgado/parse-css-color/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/noeldelgado/parse-css-color/releases/tag/v0.1.0
