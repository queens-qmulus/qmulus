define({ "api": [
  {
    "type": "get",
    "url": "/departments/:id",
    "title": "Get specifc department",
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
            "description": "<p>Department id</p>"
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
            "description": "<p>id</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "code",
            "description": "<p>Department code</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>Department name</p>"
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
        "content": "curl https://api.qmulus.io/v1/departments/?limit=50&sort=name&token=<...>",
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
            "description": "<p>Array of Department objects</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "departments.id",
            "description": "<p>id</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "departments.code",
            "description": "<p>Department code</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "departments.name",
            "description": "<p>Department name</p>"
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
            "description": "<p>Object key to sort the results by</p>"
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
            "description": "<p>Object key to sort the results by</p>"
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
            "description": "<p>Array of Department objects</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "departments.id",
            "description": "<p>id</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "departments.code",
            "description": "<p>Department code</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "departments.name",
            "description": "<p>Department name</p>"
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
