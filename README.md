Developer Application CLI
===========

A command line interface for sending a developer resume to a job opening API.

**Version 0.0.1** only supports FRESH resume format

## Table of Contents

  1. [Installation](#installation)
  2. [Examples](#examples)
  3. [Arguments](#arguments)

### Installation
<a name="installation"></a>

clone repository to local machine

`git clone https://github.com/kenelliottmc/fresh-resume-submitter && cd fresh-resume-submitter`

install dependencies

`npm install`

install package

`npm link`

### Examples
<a name="examples"></a>

###### Get Version

`fresh-resume-submitter -v`

###### Send Application

`fresh-resume-submitter -u https://api.teamwork.com/resumes`

###### Override Configuration Path

`fresh-resume-submitter -p ./path/to/file -u https://api.teamwork.com/resumes`

### Arguments
<a name="arguments"></a>

**-v, --version**
> get current version

**-p, --path**
> override current path

**-u, --url**
> json api url