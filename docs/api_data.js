define({ "api": [
  {
    "type": "get",
    "url": "/buildings/:id",
    "title": "Get specifc Building",
    "name": "GetBuilding",
    "group": "Buildings",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p><code>Building</code> id</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>API token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p><code>Building</code> id</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "code",
            "description": "<p><code>Building</code> code. (Mostly a non-sensical building &quot;code&quot; listed by Queen's on their campus map)</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "accessibility",
            "description": "<p>Whether building is accessible.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>First line of street address.</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "latitude",
            "description": "<p>Geographic coordinate</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "longitude",
            "description": "<p>Geographic coordinate</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "campus",
            "description": "<p>Campus location. {main, west, isabel}</p>"
          },
          {
            "group": "Success 200",
            "type": "Number[][]",
            "optional": false,
            "field": "polygon",
            "description": "<p>An array of polygon coordinates that draw out the shape of the building on a xy plane. (These are not geo latlon coordinates)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": \"goodwin\",\n  \"code\": \"GOO GOODWN\",\n  \"accessibility\": true,\n  \"name\": \"Goodwin Hall\",\n  \"address\": \"25 Union Street\",\n  \"latitude\": 44.227872,\n  \"longitude\": -76.492363,\n  \"campus\": \"main\",\n  \"polygon\": [[652,234], [651,239], [649,239], ...]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/buildings/index.js",
    "groupTitle": "Buildings",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "403",
            "description": "<p>Forbidden. API token invalid or missing. Sign up at <a href=\"https://manage.qmulus.io/token\">https://manage.qmulus.io/token</a></p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/buildings",
    "title": "List Buildings",
    "name": "ListBuildings",
    "group": "Buildings",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl https://api.qmulus.io/v1/buildings?limit=100&offset=200&limit=100&&token=<...>",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "building",
            "description": "<p>Array of <code>Building</code> objects. See <a href=\"#api-Buildings-GetBuilding\">object definition here</a></p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/buildings/index.js",
    "groupTitle": "Buildings",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>API token</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "size": "1-100",
            "optional": true,
            "field": "limit",
            "defaultValue": "20",
            "description": "<p>Number of items in the response</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": true,
            "field": "offset",
            "description": "<p>Used in conjuction with <code>limit</code> to fetch paginated results</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "sort",
            "description": "<p>Sorting string query (used by mongo)</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "403",
            "description": "<p>Forbidden. API token invalid or missing. Sign up at <a href=\"https://manage.qmulus.io/token\">https://manage.qmulus.io/token</a></p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/buildings/search",
    "title": "Search Buildings",
    "name": "SearchBuildings",
    "group": "Buildings",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "q",
            "description": "<p>Full text search string query</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>API token</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "size": "1-100",
            "optional": true,
            "field": "limit",
            "defaultValue": "20",
            "description": "<p>Number of items in the response</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": true,
            "field": "offset",
            "description": "<p>Used in conjuction with <code>limit</code> to fetch paginated results</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "sort",
            "description": "<p>Sorting string query (used by mongo)</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl https://api.qmulus.io/v1/buildings/search?q=goodwin&limit=100&token=<...>",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "departments",
            "description": "<p>Array of found <code>Building</code> objects. See <a href=\"#api-Buildings-GetBuilding\">object definition here</a></p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/buildings/index.js",
    "groupTitle": "Buildings",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "403",
            "description": "<p>Forbidden. API token invalid or missing. Sign up at <a href=\"https://manage.qmulus.io/token\">https://manage.qmulus.io/token</a></p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/courses/:id",
    "title": "Get specifc Course",
    "name": "GetCourse",
    "group": "Courses",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p><code>Course</code> id</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>API token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p><code>Course</code> id</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "CEAB",
            "description": "<p>Engineers Canada Accreditation Credits. https://engineerscanada.ca/accreditation/accreditation-board</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "department",
            "description": "<p><code>Department</code> code</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "course_code",
            "description": "<p>Numeric course code</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "course_name",
            "description": "<p><code>Course</code> name</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "campus",
            "description": "<p><code>Course</code> location such as Main or Bader International Study Ctr)</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "description",
            "description": "<p>Description from solus.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "grading_basis",
            "description": "<p>Grading details. (Graded, Transfer Grading Basis, No Transcript Print, Pass/Fail, Honours/Pass/Fail, Non-Graded Component)</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "course_components",
            "description": "<p>Object with required course components as 'keys'. Options below, value will be &quot;Required&quot; if component applies.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course_components.tutorial",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course_components.lecture_discussion",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course_components.lecture_laboratory",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course_components.lecture_tutorial",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course_components.lecture_demonstration",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course_components.lecture",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course_components.laboratory",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course_components.laboratory_seminar",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course_components.blended",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course_components.studio",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course_components.fieldstudies",
            "description": "<p>&quot;field studies&quot;</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course_components.individualstudy",
            "description": "<p>&quot;individual study&quot;</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course_components.correspondence",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course_components.online",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course_components.research",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course_components.reading",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course_components.project",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course_components.clinical",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course_components.seminar",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course_components.practicum",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "requirements",
            "description": "<p>Prerequisite requirements.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "add_consent",
            "description": "<p>Specific requirements for adding the course.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "drop_consent",
            "description": "<p>Specific requirements for dropping the course.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "Undergraduate",
              "Graduate",
              "Undergraduate",
              "Online",
              "Non-Credit"
            ],
            "optional": false,
            "field": "academic_level",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "academic_group",
            "description": "<p>Faculty group. Ex: Faculty of Arts and Science, Faculty of Law, School of Graduate Studies</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "academic_org",
            "description": "<p>School or Department. Ex: School of Computing, Dept of Chemical Engineering</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "units",
            "description": "<p><code>Course</code> units.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"CEAB\": {\n    \"math\": 0,\n    \"basic_sci\": 0,\n    \"comp_st\": 0,\n    \"eng_sci\": 0,\n    \"end_des\": 0\n  },\n  \"id\": \"CISC-124\",\n  \"department\": \"CISC\",\n  \"course_code\": \"124\",\n  \"course_name\": \"Introduction to Computing Science II\",\n  \"campus\": \"Main\",\n  \"description\": \"Introduction to object-oriented design, ...\",\n  \"grading_basis\": \"Graded\",\n  \"course_components\": {\n    \"laboratory\": \"Required\",\n    \"lecture\": \"Required\"\n  },\n  \"requirements\": \"Prerequisite C- in CISC121 \\nCorequisite CISC102 or \",\n  \"add_consent\": \"\",\n  \"drop_consent\": \"\",\n  \"academic_level\": \"Undergraduate Online\",\n  \"academic_group\": \"Faculty of Arts and Science\",\n  \"academic_org\": \"School of Computing\",\n  \"units\": 3\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/courses/index.js",
    "groupTitle": "Courses",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "403",
            "description": "<p>Forbidden. API token invalid or missing. Sign up at <a href=\"https://manage.qmulus.io/token\">https://manage.qmulus.io/token</a></p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/courses/",
    "title": "List Courses",
    "name": "ListCourses",
    "group": "Courses",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl https://api.qmulus.io/v1/courses/?limit=100&sort=-department&token=<...>",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "course",
            "description": "<p>Array of <code>Courses</code> objects. See <a href=\"#api-Courses-GetCourse\">object definition here</a></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"id\": \"AGHE-800\",\n    \"course_name\": \"Evaluating Aging-Related Programs and Services\",\n    ...\n  },\n  {\n    \"id\": \"AGHE-802\",\n    \"name\": \"Ethics and Bioethics of Aging\"\n    ...\n  },\n  ...\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/courses/index.js",
    "groupTitle": "Courses",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>API token</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "size": "1-100",
            "optional": true,
            "field": "limit",
            "defaultValue": "20",
            "description": "<p>Number of items in the response</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": true,
            "field": "offset",
            "description": "<p>Used in conjuction with <code>limit</code> to fetch paginated results</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "sort",
            "description": "<p>Sorting string query (used by mongo)</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "403",
            "description": "<p>Forbidden. API token invalid or missing. Sign up at <a href=\"https://manage.qmulus.io/token\">https://manage.qmulus.io/token</a></p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/courses/search",
    "title": "Search Courses",
    "name": "SearchCourses",
    "group": "Courses",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "q",
            "description": "<p>Full text search string query</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>API token</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "size": "1-100",
            "optional": true,
            "field": "limit",
            "defaultValue": "20",
            "description": "<p>Number of items in the response</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": true,
            "field": "offset",
            "description": "<p>Used in conjuction with <code>limit</code> to fetch paginated results</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "sort",
            "description": "<p>Sorting string query (used by mongo)</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl https://api.qmulus.io/v1/courses/search?q=Computing&limit=100&sort=-department&token=<...>",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "course",
            "description": "<p>Array of found <code>Courses</code> objects. See <a href=\"#api-Courses-GetCourse\">object definition here</a></p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/courses/index.js",
    "groupTitle": "Courses",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "403",
            "description": "<p>Forbidden. API token invalid or missing. Sign up at <a href=\"https://manage.qmulus.io/token\">https://manage.qmulus.io/token</a></p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/departments/:id",
    "title": "Get specifc Department",
    "name": "GetDepartment",
    "group": "Departments",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p><code>Department</code> id</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>API token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p><code>Department</code> id</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "code",
            "description": "<p><code>Department</code> code</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p><code>Department</code> name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": \"CISC\",\n  \"code\": \"CISC\",\n  \"name\": \"ComputingInformation Science\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/departments/index.js",
    "groupTitle": "Departments",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "403",
            "description": "<p>Forbidden. API token invalid or missing. Sign up at <a href=\"https://manage.qmulus.io/token\">https://manage.qmulus.io/token</a></p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/departments/",
    "title": "List Departments",
    "name": "ListDepartment",
    "group": "Departments",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl https://api.qmulus.io/v1/departments/?limit=50&sort=-name&token=<...>",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "department",
            "description": "<p>Array of <code>Department</code> objects</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "department.id",
            "description": "<p><code>Department</code> id</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "department.code",
            "description": "<p><code>Department</code> code</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "department.name",
            "description": "<p><code>Department</code> name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"id\": \"AGHE\",\n    \"code\": \"AGHE\",\n    \"name\": \"Aging and Health\"\n  },\n  {\n    \"id\": \"ANAT\",\n    \"code\": \"ANAT\",\n    \"name\": \"Anatomy and Cell Biology\"\n  },\n  ...\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/departments/index.js",
    "groupTitle": "Departments",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>API token</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "size": "1-100",
            "optional": true,
            "field": "limit",
            "defaultValue": "20",
            "description": "<p>Number of items in the response</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": true,
            "field": "offset",
            "description": "<p>Used in conjuction with <code>limit</code> to fetch paginated results</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "sort",
            "description": "<p>Sorting string query (used by mongo)</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "403",
            "description": "<p>Forbidden. API token invalid or missing. Sign up at <a href=\"https://manage.qmulus.io/token\">https://manage.qmulus.io/token</a></p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/departments/search",
    "title": "Search Departments",
    "name": "SearchDepartment",
    "group": "Departments",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "q",
            "description": "<p>Full text search string query</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>API token</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "size": "1-100",
            "optional": true,
            "field": "limit",
            "defaultValue": "20",
            "description": "<p>Number of items in the response</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": true,
            "field": "offset",
            "description": "<p>Used in conjuction with <code>limit</code> to fetch paginated results</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "sort",
            "description": "<p>Sorting string query (used by mongo)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "department",
            "description": "<p>Array of <code>Department</code> objects</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "department.id",
            "description": "<p><code>Department</code> id</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "department.code",
            "description": "<p><code>Department</code> code</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "department.name",
            "description": "<p><code>Department</code> name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"id\": \"CMPE\",\n    \"code\": \"CMPE\",\n    \"name\": \"Computing in Engineering\"\n  },\n  {\n    \"id\": \"COCA\",\n    \"code\": \"COCA\",\n    \"name\": \"Computing & the Creative Arts\"\n  },\n  ...\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/departments/index.js",
    "groupTitle": "Departments",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "403",
            "description": "<p>Forbidden. API token invalid or missing. Sign up at <a href=\"https://manage.qmulus.io/token\">https://manage.qmulus.io/token</a></p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/sections/:id",
    "title": "Get specifc Section",
    "name": "GetSection",
    "group": "Sections",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p><code>Section</code> id</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>API token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p><code>Section</code> id</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "year",
            "description": "<p>Calendar year</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "allowedValues": [
              "Fall",
              "Summer",
              "Winter"
            ],
            "optional": false,
            "field": "term",
            "description": "<p>School term</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "department",
            "description": "<p>Can be used to reference <code>Course</code>.<code>department</code> field</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course_code",
            "description": "<p>Can be used to reference <code>Course</code>.<code>course_code</code> field</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course_name",
            "description": "<p><code>Course</code> name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "units",
            "description": "<p><code>Section</code> units</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "campus",
            "description": "<p><code>Section</code> campus location</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "Undergraduate",
              "Graduate",
              "Undergraduate",
              "Online",
              "Non-Credit"
            ],
            "optional": false,
            "field": "academic_level",
            "description": "<p><code>Course</code> level</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "course_sections",
            "description": "<p>List of individual sections in course</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "course_sections.combined_with",
            "description": "<p><code>Course</code>/<code>Section</code> combinations</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "course_sections.dates",
            "description": "<p>Date/Timeslot details</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "course_sections.dates.instructors",
            "description": "<p>List of course/section instructors</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course_sections.dates.day",
            "description": "<p>Day of the week (ex &quot;Thursday&quot;)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course_sections.dates.start_time",
            "description": "<p>Start time of section in 24 hour time. (ex: &quot;13:30&quot;)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course_sections.dates.end_time",
            "description": "<p>End time of section in 24 hour time. (ex: &quot;14:30&quot;)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course_sections.dates.start_date",
            "description": "<p>Start date in YYYY-MM-DD</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course_sections.dates.end_date",
            "description": "<p>End date in YYYY-MM-DD</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course_sections.dates.location",
            "description": "<p>Building and Room</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course_sections.section_name",
            "description": "<p>ID for each <code>Section</code></p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course_sections.section_type",
            "description": "<p><code>Section</code> type (ex: &quot;Lecture&quot;)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course_sections.section_number",
            "description": "<p><code>Section</code> number</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "course_sections.class_number",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "course_sections.enrollment_capacity",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "course_sections.enrollment_total",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "course_sections.waitlist_capacity",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "course_sections.waitlist_total",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "course_sections.last_updated",
            "description": "<p>Timestamp of when this data was last updated from Queen's</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": \"2019-FA-U-M-CISC-124\",\n  \"year\": \"2019\",\n  \"term\": \"Fall\",\n  \"department\": \"CISC\",\n  \"course_code\": \"124\",\n  \"course_name\": \"Introduction to Computing Science II\",\n  \"units\": 3,\n  \"campus\": \"Main\",\n  \"academic_level\": \"Undergraduate\",\n  \"course_sections\": [\n    {\n      \"combined_with\": [],\n      \"dates\": [\n        {\n          \"instructors\": [\n            \"McLeod, Alan\"\n          ],\n          \"day\": \"Monday\",\n          \"start_time\": \"12:30\",\n          \"end_time\": \"13:30\",\n          \"start_date\": \"2019-09-05\",\n          \"end_date\": \"2019-12-02\",\n          \"location\": \"CHERNOFF AUD\"\n        },\n        {\n          \"instructors\": [\n            \"McLeod, Alan\"\n          ],\n          \"day\": \"Wednesday\",\n          \"start_time\": \"11:30\",\n          \"end_time\": \"12:30\",\n          \"start_date\": \"2019-09-05\",\n          \"end_date\": \"2019-12-02\",\n          \"location\": \"CHERNOFF AUD\"\n        },\n        {\n          \"instructors\": [\n            \"McLeod, Alan\"\n          ],\n          \"day\": \"Thursday\",\n          \"start_time\": \"13:30\",\n          \"end_time\": \"14:30\",\n          \"start_date\": \"2019-09-05\",\n          \"end_date\": \"2019-12-02\",\n          \"location\": \"CHERNOFF AUD\"\n        }\n      ],\n      \"section_name\": \"001-LEC\",\n      \"section_type\": \"Lecture\",\n      \"section_number\": \"001\",\n      \"class_number\": 2408,\n      \"enrollment_capacity\": 250,\n      \"enrollment_total\": 160,\n      \"waitlist_capacity\": 25,\n      \"waitlist_total\": 0,\n      \"last_updated\": \"2019-10-14T01:38:34.565573+00:00\"\n    },\n    {\n      \"combined_with\": [],\n      \"dates\": [\n        {\n          \"instructors\": [\n            \"McLeod, Alan\"\n          ],\n          \"day\": \"Wednesday\",\n          \"start_time\": \"15:30\",\n          \"end_time\": \"17:30\",\n          \"start_date\": \"2019-09-05\",\n          \"end_date\": \"2019-11-29\",\n          \"location\": \"JEFFERY RM155\"\n        }\n      ],\n      \"section_name\": \"002-LAB\",\n      \"section_type\": \"Laboratory\",\n      \"section_number\": \"002\",\n      \"class_number\": 2417,\n      \"enrollment_capacity\": 50,\n      \"enrollment_total\": 48,\n      \"waitlist_capacity\": 5,\n      \"waitlist_total\": 0,\n      \"last_updated\": \"2019-10-14T01:38:37.464146+00:00\"\n    },\n    {\n      \"combined_with\": [],\n      \"dates\": [\n        {\n          \"instructors\": [\n            \"McLeod, Alan\"\n          ],\n          \"day\": \"Monday\",\n          \"start_time\": \"18:30\",\n          \"end_time\": \"20:30\",\n          \"start_date\": \"2019-09-05\",\n          \"end_date\": \"2019-12-02\",\n          \"location\": \"JEFFERY RM155\"\n        }\n      ],\n      \"section_name\": \"003-LAB\",\n      \"section_type\": \"Laboratory\",\n      \"section_number\": \"003\",\n      \"class_number\": 2416,\n      \"enrollment_capacity\": 50,\n      \"enrollment_total\": 25,\n      \"waitlist_capacity\": 5,\n      \"waitlist_total\": 0,\n      \"last_updated\": \"2019-10-14T01:38:41.023160+00:00\"\n    },\n    ...\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/sections/index.js",
    "groupTitle": "Sections",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "403",
            "description": "<p>Forbidden. API token invalid or missing. Sign up at <a href=\"https://manage.qmulus.io/token\">https://manage.qmulus.io/token</a></p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/sections/",
    "title": "List Sections",
    "name": "ListSections",
    "group": "Sections",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl https://api.qmulus.io/v1/sections/?limit=100&sort=-id&token=<...>",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "course",
            "description": "<p>Array of <code>Section</code> objects. See <a href=\"#api-Sections-GetSection\">object definition here</a></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"id\": \"2020-WI-U-M-CISC-500B\",\n    \"year\": \"2020\",\n    \"term\": \"Winter\",\n    ...\n  },\n  {\n    \"id\": \"2020-WI-U-M-CISC-499\",\n    \"year\": \"2020\",\n    \"term\": \"Winter\",\n    ...\n  },\n  ...\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/sections/index.js",
    "groupTitle": "Sections",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>API token</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "size": "1-100",
            "optional": true,
            "field": "limit",
            "defaultValue": "20",
            "description": "<p>Number of items in the response</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": true,
            "field": "offset",
            "description": "<p>Used in conjuction with <code>limit</code> to fetch paginated results</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "sort",
            "description": "<p>Sorting string query (used by mongo)</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "403",
            "description": "<p>Forbidden. API token invalid or missing. Sign up at <a href=\"https://manage.qmulus.io/token\">https://manage.qmulus.io/token</a></p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/sections/search",
    "title": "Search Sections",
    "name": "SearchSections",
    "group": "Sections",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "q",
            "description": "<p>Full text search string query</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>API token</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "size": "1-100",
            "optional": true,
            "field": "limit",
            "defaultValue": "20",
            "description": "<p>Number of items in the response</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": true,
            "field": "offset",
            "description": "<p>Used in conjuction with <code>limit</code> to fetch paginated results</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "sort",
            "description": "<p>Sorting string query (used by mongo)</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl https://api.qmulus.io/v1/sections/search?q=CISC&token=<...>",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "course",
            "description": "<p>Array of found <code>Section</code> objects. See <a href=\"#api-Sections-GetSection\">object definition here</a></p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/sections/index.js",
    "groupTitle": "Sections",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "403",
            "description": "<p>Forbidden. API token invalid or missing. Sign up at <a href=\"https://manage.qmulus.io/token\">https://manage.qmulus.io/token</a></p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/textbooks/:id",
    "title": "Get specifc Textbook",
    "name": "GetTextbook",
    "group": "Textbooks",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p><code>Textbook</code> id</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>API token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p><code>Textbook</code> id</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "authors",
            "description": "<p>List of author names.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "isbn_10",
            "description": "<p>10 digit ISBN</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "isbn_13",
            "description": "<p>13 digit ISBN</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>Textbook title</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": true,
            "field": "image",
            "description": "<p>Book cover image link</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "price_new",
            "description": "<p>Cost to purchase new</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": true,
            "field": "price_old",
            "description": "<p>Cost to purchase used (if available)</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "allowedValues": [
              "REQUIRED",
              "RECOMMENDED"
            ],
            "optional": false,
            "field": "status",
            "description": "<p>Status of book for course</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "courses",
            "description": "<p>Array of courses that require/recommend this book</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course.year",
            "description": "<p>School year</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "Fall",
              "Winter"
            ],
            "optional": false,
            "field": "course.term",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course.department",
            "description": "<p>Can be used to reference <code>Course</code>.<code>department</code> field</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course.course_code",
            "description": "<p>Can be used to reference <code>Course</code>.<code>course_code</code> field</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course.url",
            "description": "<p>Queen's bookstore search url</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course.instructor",
            "description": "<p>Course instructor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"authors\": [\n    \"Dingel\"\n  ],\n  \"id\": \"88880095043\",\n  \"isbn_10\": null,\n  \"isbn_13\": \"88880095043\",\n  \"title\": \"CISC/CMPE422 Course Reader\",\n  \"image\": \"\",\n  \"price_new\": 15.25,\n  \"price_used\": null,\n  \"status\": \"REQUIRED\",\n  \"courses\": [\n    {\n      \"year\": \"2019\",\n      \"term\": \"Fall\",\n      \"department\": \"CISC\",\n      \"course_code\": \"422\",\n      \"url\": \"https://www.campusbookstore.com/textbooks/search-engine/results?Course=CISCB04242\",\n      \"instructor\": \"Juergen Dingel\"\n    },\n    {\n      \"year\": \"2019\",\n      \"term\": \"Fall\",\n      \"department\": \"CMPE\",\n      \"course_code\": \"422\",\n      \"url\": \"https://www.campusbookstore.com/textbooks/search-engine/results?Course=CMPEB04243\",\n      \"instructor\": \"Juergen Dingel\"\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/textbooks/index.js",
    "groupTitle": "Textbooks",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "403",
            "description": "<p>Forbidden. API token invalid or missing. Sign up at <a href=\"https://manage.qmulus.io/token\">https://manage.qmulus.io/token</a></p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/textbooks",
    "title": "List Textbooks",
    "name": "ListTextbooks",
    "group": "Textbooks",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "textbook",
            "description": "<p>Array of <code>Textbook</code> objects. See <a href=\"#api-Textbooks-GetTextbook\">object definition here</a></p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/textbooks/index.js",
    "groupTitle": "Textbooks",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>API token</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "size": "1-100",
            "optional": true,
            "field": "limit",
            "defaultValue": "20",
            "description": "<p>Number of items in the response</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": true,
            "field": "offset",
            "description": "<p>Used in conjuction with <code>limit</code> to fetch paginated results</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "sort",
            "description": "<p>Sorting string query (used by mongo)</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "403",
            "description": "<p>Forbidden. API token invalid or missing. Sign up at <a href=\"https://manage.qmulus.io/token\">https://manage.qmulus.io/token</a></p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/textbooks/search",
    "title": "Search Textbooks",
    "name": "SearchTextbooks",
    "group": "Textbooks",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "q",
            "description": "<p>Full text search string query</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>API token</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "size": "1-100",
            "optional": true,
            "field": "limit",
            "defaultValue": "20",
            "description": "<p>Number of items in the response</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": true,
            "field": "offset",
            "description": "<p>Used in conjuction with <code>limit</code> to fetch paginated results</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "sort",
            "description": "<p>Sorting string query (used by mongo)</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl https://api.qmulus.io/v1/textbooks/search?q=CISC&sort=-title&token=<...>",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "departments",
            "description": "<p>Array of found <code>Textbook</code> objects. See <a href=\"#api-Textbooks-GetTextbook\">object definition here</a></p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/textbooks/index.js",
    "groupTitle": "Textbooks",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "403",
            "description": "<p>Forbidden. API token invalid or missing. Sign up at <a href=\"https://manage.qmulus.io/token\">https://manage.qmulus.io/token</a></p>"
          }
        ]
      }
    }
  }
] });
