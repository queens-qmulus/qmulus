define({ "api": [
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
            "optional": false,
            "field": "academic_level",
            "description": "<p>Options: &quot;Undergraduate&quot;, &quot;Graduate&quot;, &quot;Undergraduate Online&quot;, &quot;Non-Credit&quot;</p>"
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
            "field": "403TokenError",
            "description": "<p>API token invalid or missing. Sign up at <a href=\"https://manage.qmulus.io/token\">https://manage.qmulus.io/token</a></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"status\": 403,\n  \"message\": \"API Token Invalid. ...\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/departments/",
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
            "field": "departments",
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
            "field": "403TokenError",
            "description": "<p>API token invalid or missing. Sign up at <a href=\"https://manage.qmulus.io/token\">https://manage.qmulus.io/token</a></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"status\": 403,\n  \"message\": \"API Token Invalid. ...\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/departments/",
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
            "field": "departments",
            "description": "<p>Array of found <code>Courses</code> objects. See <a href=\"#api-Courses-GetCourse\">object definition below</a></p>"
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
            "field": "403TokenError",
            "description": "<p>API token invalid or missing. Sign up at <a href=\"https://manage.qmulus.io/token\">https://manage.qmulus.io/token</a></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"status\": 403,\n  \"message\": \"API Token Invalid. ...\"\n}",
          "type": "json"
        }
      ]
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
            "field": "403TokenError",
            "description": "<p>API token invalid or missing. Sign up at <a href=\"https://manage.qmulus.io/token\">https://manage.qmulus.io/token</a></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"status\": 403,\n  \"message\": \"API Token Invalid. ...\"\n}",
          "type": "json"
        }
      ]
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
            "field": "departments",
            "description": "<p>Array of <code>Department</code> objects</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "departments.id",
            "description": "<p><code>Department</code> id</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "departments.code",
            "description": "<p><code>Department</code> code</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "departments.name",
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
            "field": "403TokenError",
            "description": "<p>API token invalid or missing. Sign up at <a href=\"https://manage.qmulus.io/token\">https://manage.qmulus.io/token</a></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"status\": 403,\n  \"message\": \"API Token Invalid. ...\"\n}",
          "type": "json"
        }
      ]
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
            "field": "departments",
            "description": "<p>Array of <code>Department</code> objects</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "departments.id",
            "description": "<p><code>Department</code> id</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "departments.code",
            "description": "<p><code>Department</code> code</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "departments.name",
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
            "field": "403TokenError",
            "description": "<p>API token invalid or missing. Sign up at <a href=\"https://manage.qmulus.io/token\">https://manage.qmulus.io/token</a></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"status\": 403,\n  \"message\": \"API Token Invalid. ...\"\n}",
          "type": "json"
        }
      ]
    }
  }
] });
