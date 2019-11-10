# Qmulus: Queen's University Open Data API

[![Actions Status](https://github.com/queens-qmulus/qmulus/workflows/Node%20CI/badge.svg)](https://github.com/queens-qmulus/qmulus/actions)
[![Gitter](https://img.shields.io/gitter/room/queens-qmulus/community)](https://gitter.im/queens-qmulus/community)

## About
Qmulus is a publically accessible, open API that provides access to datasets related to Queen's University. It is free to use for anyone to build apps based on the 6 current datasets. The data is collected from various university sources and is provided as-is.

## Using the API
The REST API can be accessed using `GET` calls to the following base endpoint url: `https://api.qmulus.io/v1/`

Here's a quick example:
```
$ curl "https://api.qmulus.io/v1/courses/CISC-124?token=..."
{
  "id": "CISC-124",
  "department": "CISC",
  "course_code": "124",
  "course_name": "Introduction to Computing Science II",
  "campus": "Main",
  "description": "Introduction to object-oriented design...",
  "grading_basis": "Graded",
  "course_components": {
    "laboratory": "Required",
    "lecture": "Required"
  },
  "requirements": "Prerequisite C- in CISC121 or ...",
  "academic_level": "Undergraduate Online",
  "academic_group": "Faculty of Arts and Science",
  "academic_org": "School of Computing",
  "units": 3,
  ...
}
```
Take a look at our docs at: [https://docs.qmulus.io](https://docs.qmulus.io)

## Documentation
Please see the documentation with details for all endpoints here: [https://docs.qmulus.io](https://docs.qmulus.io)

Additional technical documentaion can be found in the [contributions guide](CONTRIBUTING.md).

## Contributing
We welcome contributions! Please feel free to file bugs and questions as well as feature and data set requests in [this repo's issue tracker](https://github.com/queens-qmulus/qmulus/issues). 
If you're looking to contribute to Qmulus directly, please see the [code contributions guide](CONTRIBUTING.md).

