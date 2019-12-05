# React Native Clean Project

[![npm version](https://badge.fury.io/js/react-native-clean-project.svg)](https://badge.fury.io/js/react-native-clean-project) ![https://img.shields.io/github/license/pmadruga/react-native-clean-project.svg](https://img.shields.io/github/license/pmadruga/react-native-clean-project.svg)
[![GitHub issues](https://img.shields.io/github/issues/pmadruga/react-native-clean-project.svg)](https://github.com/pmadruga/react-native-clean-project/issues)
[![Build Status](https://travis-ci.org/pmadruga/react-native-clean-project.svg?branch=master)](https://travis-ci.org/pmadruga/react-native-clean-project)

Cleans your React Native project by purging caches and modules, and reinstalling them again.

## Installing

`yarn add -D react-native-clean-project`

## Running

### React-Native CLI plugin

This module is automatically detected as a plugin by the standard `react-native` command, adding new sub-commands:

* `react-native clean-project-auto` - fully automated project state clean: like a freshly-cloned, never-started repo
* `react-native clean-project` - interactive project state clean: choose types of react-native state to clean

### Direct execution

For complete control (including using command-line arguments to non-interactively fine-tune what state is cleaned):

`./node_modules/.bin/react-native-clean-project`

Or add it as a script to your `package.json`

```json
"scripts": {
  "clean": "react-native-clean-project"
}
```