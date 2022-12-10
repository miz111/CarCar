# **CarCar**

A Python/Django-based web app with a JS/React-integrated front-end that provides a solution to tracking inventory, sales, and service for a car dealership.

---
Team:

* **Person 1:** Martey (Service)
* **Person 2:** Jess (Sales)

# Table of Contents

[**CarCar**](#CarCar)
  - [Design](#design)
  - [Setup Guide](#setup-guide)
  - [Need to reset your PostgreSQL database?](#need-to-reset-your-postgresql-database)
  - [Sales Microservice](#sales-microservice)
    - [RESTful Shoes API](#restful-shoes-api)
    - [Get a list of all shoes or filter by bin](#get-a-list-of-all-shoes-or-filter-by-bin)
    - [Get the details of a shoe](#get-the-details-of-a-shoe)
    - [Create a shoe](#create-a-shoe)
    - [Create a shoe without an existing bin](#create-a-shoe-without-an-existing-bin)
    - [Delete a shoe](#delete-a-shoe)
    - [Delete a deleted shoe](#delete-a-deleted-shoe)
  - [Hats microservice](#hats-microservice)
    - [RESTful Hats API](#restful-hats-api)
    - [Get a list of all hats or filter by location](#get-a-list-of-all-hats-or-filter-by-location)
    - [Get the details of a hat](#get-the-details-of-a-hat)
    - [Create a hat](#create-a-hat)
    - [Create a hat without an existing location](#create-a-hat-without-an-existing-location)
    - [Delete a hat](#delete-a-hat)
    - [Delete a deleted hat](#delete-a-deleted-hat)
## Setup Guide
---
### 1. Get Docker [here](https://docs.docker.com/get-docker/) or using your terminal:

- **MacOS**

        brew install --cask docker

-  **Windows**

        winget install Docker.DockerDesktop

### 2. Run the Docker Application

### 3. **Fork** [this](https://gitlab.com/Jeffery-Hebert/microservice-two-shot) repository and then **clone** into a local directory

### 4. Create a Docker volume for your PostgreSQL database

```
docker volume create pgdata
```

### 5. Build your Docker images

```
docker-compose build
```

### 6. Spin up your Docker containers

```
docker-compose up
```

### 7. Congratulations, your CarCar web app is ready and accessible by visiting http://localhost:3000/

## Need to reset your PostgreSQL database?
---

### 1. Stop all services

### 2. Prune your Docker containers

    docker container prune -f

### 3 Delete your existing PostgreSQL database

    docker volume rm pgdata

### 4. Create a new PostgreSQL database

    docker volume create pgdata

### 5. Restart your Docker containers

    docker-compose up

## Design
---
![wardrobify-simple-diagram](./img/wardrobify-simple-diagram.jpg)
- front-end: http://localhost:3000/

- inventory-api: http://localhost:8100/

- service-api: http://localhost:8080/

- sales-api: http://localhost:8090/
## Sales Microservice
---
The sales microservice keeps track of the company's sales persons' information, customer database, as well as sales records, with some help from the inventory microservice. Polling has been implemented to grab vehicles from the inventory microservice, (specifically unsold vehicles), so that sales records can only be generated for an unsold vehicle. Because a sales record should be permanent, the project has been set up such that it is not possible to delete a customer, a vehicle, or a sales person that is associated with a sales record.

In addition to a list view of sales persons, customers, and sales records, users can also filter sales records based on a sales person.

### RESTful Sales API
---
The REST API for the sales microservice is detailed below.
#### Sales Persons:
| Method | URL                   | What it does                      |
| ------ | :-------------------- | :-------------------------------- |
| GET    | /api/salesperson/     | Get a list of all sales persons   |
| GET    | /api/salesperson/:id/ | Get the details of a sales person |
| POST   | /api/salesperson/     | Create a sales person             |
| PUT    | /api/salesperson/:id/ | Edit a sales person               |
| DELETE | /api/salesperson/:id/ | Deletes a sales person            |
#### Customers:
| Method | URL                | What it does                  |
| ------ | :----------------- | :---------------------------- |
| GET    | /api/customer/     | Get a list of all customers   |
| GET    | /api/customer/:id/ | Get the details of a customer |
| POST   | /api/customer/     | Create a customer             |
| PUT    | /api/customer/:id/ | Edit a customer               |
| DELETE | /api/customer/:id/ | Deletes a sales person        |
#### Sales Record
| Method | URL                               | What it does                                            |
| ------ | :-------------------------------- | :------------------------------------------------------ |
| GET    | /api/salesrecord/                 | Get a list of all sales records                         |
| GET    | /api/salesperson/:id/salesrecord/ | Get a list of sales records completed by a sales person |
| GET    | /api/salesrecord/:id/             | Get the details of a sales record                       |
| POST   | /api/salesrecord/                 | Create a sales record                                   |
| PUT    | /api/salesrecord/:id/             | Edit a sales record                                     |
##### Note that a request to delete sales records does not exist. From an business standpoint, sales records should be permanent, so a delete request method was not implemented.

### Get a list of all sales persons
---
#### **Request**

`GET /api/salesperson/`

    http://localhost:8090/api/salesperson/

#### **Response**

```yaml
< HTTP/1.1 200 OK
< Date: Fri, 09 Dec 2022 08:34:04 GMT
< Server: WSGIServer/0.2 CPython/3.10.8
< Content-Type: application/json
< X-Frame-Options: DENY
< Content-Length: 223
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Cross-Origin-Opener-Policy: same-origin
< Vary: Origin
```
#### **Sample Output**
```json
{
	"sales_persons": [
		{
			"name": "Belle",
			"employee_number": 234,
			"id": 1
		},
		{
			"name": "Rosie",
			"employee_number": 111,
			"id": 2
		},
		{
			"name": "Yuki",
			"employee_number": 789,
			"id": 3
		},
		{
			"name": "Chow",
			"employee_number": 7,
			"id": 4
		}
	]
}
```

##### If no sales person exists in the database, the output will be:
```json
{
    "sales_persons": []
}
```

### Get details on a sales person
---
#### **Request**

`GET /api/salesperson/:id/`

    http://localhost:8090/api/salesperson/:id/
##### The sales person id can be obtained by viewing the list of all employees.
#### **Response**

```yaml
< HTTP/1.1 200 OK
< Date: Fri, 09 Dec 2022 08:59:26 GMT
< Server: WSGIServer/0.2 CPython/3.10.8
< Content-Type: application/json
< X-Frame-Options: DENY
< Content-Length: 47
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Cross-Origin-Opener-Policy: same-origin
< Vary: Origin
```
#### **Sample Output**
```json
{
	"name": "Chow",
	"employee_number": 7,
	"id": 4
}
```
### Create a sales person
---
#### **Request**

`POST /api/salesperson/`

    http://localhost:8090/api/salesperson/

#### **Response**

```yaml
< HTTP/1.1 200 OK
< Date: Fri, 09 Dec 2022 09:16:46 GMT
< Server: WSGIServer/0.2 CPython/3.10.8
< Content-Type: application/json
< X-Frame-Options: DENY
< Content-Length: 52
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Cross-Origin-Opener-Policy: same-origin
< Vary: Origin
```
#### **Sample Input**
```json
{
	"name": "Jason",
	"employee_number": "123"
}
```
#### **Sample Output**
```json
{
	"name": "Jason",
	"employee_number": "123",
    "id": 5
}
```
### Edit a sales person
---
#### **Request**

`PUT /api/salesperson/:id/`

    http://localhost:8090/api/salesperson/:id/
##### The sales person id can be obtained by viewing the list of all employees.
#### **Response**

```yaml
< HTTP/1.1 200 OK
< Date: Fri, 09 Dec 2022 09:22:45 GMT
< Server: WSGIServer/0.2 CPython/3.10.8
< Content-Type: application/json
< X-Frame-Options: DENY
< Content-Length: 55
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Cross-Origin-Opener-Policy: same-origin
< Vary: Origin
```
#### **Sample Input**
```json
{
	"name": "Jacky Chen",
}
```
##### Continued with previous example. Note how only the name has changed.
#### **Sample Output**
```json
{
	"name": "Jacky Chen",
	"employee_number": "123",
    "id": 5
}
```
### Delete a sales person
---
#### **Request**
`DELETE /api/salesperson/:id/`

    http://localhost:8090/api/salesperson/:id/
##### The sales person id can be obtained by viewing the list of all employees. Please note that an employee who is on any sales records is protected and cannot be deleted. You may view the sales history of each employee by visiting http:localhost:8090/api/salesperson/:id/salesrecord.
#### **Response**

```yaml
< HTTP/1.1 200 OK
< Date: Fri, 09 Dec 2022 09:34:16 GMT
< Server: WSGIServer/0.2 CPython/3.10.8
< Content-Type: application/json
< X-Frame-Options: DENY
< Content-Length: 17
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Cross-Origin-Opener-Policy: same-origin
< Vary: Origin
```
#### **Output from Successful Deletion**
```json
{
	"deleted": true
}
```

### Get a list of all customers
---
#### **Request**

`GET /api/customer/`

    http://localhost:8090/api/customer/

#### **Response**

```yaml
< HTTP/1.1 200 OK
< Date: Fri, 09 Dec 2022 09:47:24 GMT
< Server: WSGIServer/0.2 CPython/3.10.8
< Content-Type: application/json
< X-Frame-Options: DENY
< Content-Length: 440
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Cross-Origin-Opener-Policy: same-origin
< Vary: Origin
```
#### **Sample Output**
```json
{
	"customers": [
		{
			"name": "Chow",
			"address": "124 Meow Ave., San Diego, CA 91945",
			"phone_number": "1231231232",
			"id": 1
		},
		{
			"name": "Ame",
			"address": "125 Meow Ave., San Diego, CA 91945",
			"phone_number": "1231234232",
			"id": 2
		},
		{
			"name": "Jess",
			"address": "123 Woof Drive, San Diego, CA 92122",
			"phone_number": "5101234569",
			"id": 3
		},
		{
			"name": "Yuki",
			"address": "101 Woof Drive, San Diego, CA 91945",
			"phone_number": "5102351452",
			"id": 4
		}
	]
}
```

##### If no customers exists in the database, the output will be:
```json
{
    "customers": []
}
```

### Get details on a Customer
---
#### **Request**

`GET /api/customer/:id/`

    http://localhost:8090/api/customer/:id/
##### The customer id can be obtained by viewing the list of all customers.
#### **Response**

```yaml
< HTTP/1.1 200 OK
< Date: Fri, 09 Dec 2022 09:49:23 GMT
< Server: WSGIServer/0.2 CPython/3.10.8
< Content-Type: application/json
< X-Frame-Options: DENY
< Content-Length: 104
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Cross-Origin-Opener-Policy: same-origin
< Vary: Origin
```
#### **Sample Output**
```json
{
	"name": "Chow",
	"address": "124 Meow Ave., San Diego, CA 91945",
	"phone_number": "1231231232",
	"id": 1
}
```

### Create a customer
---
#### **Request**

`POST /api/customer/`

    http://localhost:8090/api/customer/

#### **Response**

```yaml
< HTTP/1.1 200 OK
< Date: Fri, 09 Dec 2022 09:51:01 GMT
< Server: WSGIServer/0.2 CPython/3.10.8
< Content-Type: application/json
< X-Frame-Options: DENY
< Content-Length: 106
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Cross-Origin-Opener-Policy: same-origin
< Vary: Origin
```
#### **Sample Input**
```json
{
	"name": "Martey",
	"address": "126 Meow Ave., San Diego, CA 91945",
	"phone_number": "1231234231"
}
```
#### **Sample Output**
```json
{
	"name": "Martey",
	"address": "126 Meow Ave., San Diego, CA 91945",
	"phone_number": "1231234231",
	"id": 5
}
```
### Edit a customer
---
#### **Request**

`PUT /api/customer/:id/`

    http://localhost:8090/api/customer/:id/
##### The customer id can be obtained by viewing the list of all customers.
#### **Response**

```yaml
< HTTP/1.1 200 OK
< Date: Fri, 09 Dec 2022 09:53:11 GMT
< Server: WSGIServer/0.2 CPython/3.10.8
< Content-Type: application/json
< X-Frame-Options: DENY
< Content-Length: 105
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Cross-Origin-Opener-Policy: same-origin
< Vary: Origin
```
#### **Sample Input**
```json
{
	"name": "Pepsi"
}
```
##### Continued with previous example. Note how only the name has changed.
#### **Sample Output**
```json
{
	"name": "Pepsi",
	"address": "126 Meow Ave., San Diego, CA 91945",
	"phone_number": "1231234231",
	"id": 5
}
```
### Delete a customer
---
#### **Request**
`DELETE /api/customer/:id/`

    http://localhost:8090/api/customer/:id/
##### The customer id can be obtained by viewing the list of all customers. Please note that a customer who is on any sales records is protected and cannot be deleted.
#### **Response**

```yaml
< HTTP/1.1 200 OK
< Date: Fri, 09 Dec 2022 09:55:25 GMT
< Server: WSGIServer/0.2 CPython/3.10.8
< Content-Type: application/json
< X-Frame-Options: DENY
< Content-Length: 17
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Cross-Origin-Opener-Policy: same-origin
< Vary: Origin
```
#### **Output from Successful Deletion**
```json
{
	"deleted": true
}
```

### Get a list of all sales records
---
#### **Request**

`GET /api/salesrecord/`

    http://localhost:8090/api/salesrecord/

#### **Response**

```yaml
< HTTP/1.1 301 Moved Permanently
< Date: Fri, 09 Dec 2022 10:03:37 GMT
< Server: WSGIServer/0.2 CPython/3.10.8
< Content-Type: text/html; charset=utf-8
< Location: /api/salesrecord/
< Content-Length: 0
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Cross-Origin-Opener-Policy: same-origin
< Vary: Origin
```
#### **Sample Output**
```json
{
	"sales_records": [
		{
			"price": 55555.0,
			"automobile": {
				"import_href": "/api/automobiles/1C3CC5FB2AN120160/",
				"id": 2,
				"color": "white",
				"year": 2020,
				"vin": "1C3CC5FB2AN120160",
				"model_name": "Sebring",
				"is_sold": true
			},
			"sales_person": {
				"name": "Yuki",
				"employee_number": 789,
				"id": 3
			},
			"customer": {
				"name": "Ame",
				"address": "125 Meow Ave., San Diego, CA 91945",
				"phone_number": "1231234232",
				"id": 2
			},
			"id": 10
		},
		{
			"price": 30000.0,
			"automobile": {
				"import_href": "/api/automobiles/1C3CC5FB2AN120160/",
				"id": 2,
				"color": "white",
				"year": 2020,
				"vin": "1C3CC5FB2AN120161",
				"model_name": "Sebring",
				"is_sold": true
			},
			"sales_person": {
				"name": "Rosie",
				"employee_number": 111,
				"id": 2
			},
			"customer": {
				"name": "Chow",
				"address": "124 Meow Ave., San Diego, CA 91945",
				"phone_number": "1231231232",
				"id": 1
			},
			"id": 11
		}
	]
}
```

##### If no sales records exists in the database, the output will be:
```json
{
    "sales_records": []
}
```
### Get sales records filtered by sales person
---
#### **Request**

`GET /api/salesperson/:id/salesrecord/`

    http://localhost:8090/api/salesperson/:id/salesrecord/

#### **Response**

```yaml
< HTTP/1.1 301 Moved Permanently
< Date: Fri, 09 Dec 2022 10:07:31 GMT
< Server: WSGIServer/0.2 CPython/3.10.8
< Content-Type: text/html; charset=utf-8
< Location: /api/salesperson/4/salesrecord/
< Content-Length: 0
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Cross-Origin-Opener-Policy: same-origin
< Vary: Origin
```
#### **Sample Output (sales person only made 1 sale)**
```json
{
	"sales_records": [
		{
			"price": 52000.0,
			"automobile": {
				"import_href": "/api/automobiles/1C3CC5FB2AN120160/",
				"id": 2,
				"color": "white",
				"year": 2020,
				"vin": "1C3CC5FB2AN120160",
				"model_name": "Sebring",
				"is_sold": true
			},
			"sales_person": {
				"name": "Chow",
				"employee_number": 7,
				"id": 4
			},
			"customer": {
				"name": "Ame",
				"address": "125 Meow Ave., San Diego, CA 91945",
				"phone_number": "1231234232",
				"id": 2
			},
			"id": 5
		}
	]
}
```

##### If sales person has made no sales:
```json
{
    "sales_records": []
}
```

### Get details on a Sales Record
---
#### **Request**

`GET /api/salesrecord/:id/`

    http://localhost:8090/api/salesrecord/:id/
##### The sales record id can be obtained by viewing the list of all sales records.
#### **Response**

```yaml
< HTTP/1.1 200 OK
< Date: Fri, 09 Dec 2022 10:12:29 GMT
< Server: WSGIServer/0.2 CPython/3.10.8
< Content-Type: application/json
< X-Frame-Options: DENY
< Content-Length: 393
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Cross-Origin-Opener-Policy: same-origin
< Vary: Origin
```
#### **Sample Output**
```json
{
	"price": 51000.0,
	"automobile": {
		"import_href": "/api/automobiles/1C3CC5FB2AN120160/",
		"id": 2,
		"color": "white",
		"year": 2020,
		"vin": "1C3CC5FB2AN120160",
		"model_name": "Sebring",
		"is_sold": true
	},
	"sales_person": {
		"name": "Rosie",
		"employee_number": 111,
		"id": 2
	},
	"customer": {
		"name": "Ame",
		"address": "125 Meow Ave., San Diego, CA 91945",
		"phone_number": "1231234232",
		"id": 2
	},
	"id": 2
}
```

### Create a sales record
---
#### **Request**

`POST /api/salesrecord/`

    http://localhost:8090/api/salesrecord/

#### **Response**

```yaml
< HTTP/1.1 200 OK
< Date: Thu, 08 Dec 2022 02:26:33 GMT
< Server: WSGIServer/0.2 CPython/3.10.8
< Content-Type: application/json
< X-Frame-Options: DENY
< Content-Length: 391
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Cross-Origin-Opener-Policy: same-origin
< Vary: Origin
```
#### **Sample Input**
```json
{
	"price": "52000",
	"sales_person": 7,
	"customer": 2,
	"vin": "1C3CC5FB2AN120160"
}
```
#### **Sample Output**
```json
{
	"price": "52000",
	"automobile": {
		"import_href": "/api/automobiles/1C3CC5FB2AN120160/",
		"id": 2,
		"color": "white",
		"year": 2020,
		"vin": "1C3CC5FB2AN120160",
		"model_name": "Sebring",
		"is_sold": false
	},
	"sales_person": {
		"name": "Chow",
		"employee_number": 7,
		"id": 4
	},
	"customer": {
		"name": "Ame",
		"address": "125 Meow Ave., San Diego, CA 91945",
		"phone_number": "1231234232",
		"id": 2
	},
	"id": 5
}
```
### Edit a sales record
---
#### **Request**

`PUT /api/salesrecord/:id/`

    http://localhost:8090/api/salesrecord/:id/
##### The customer id can be obtained by viewing the list of all customers.
#### **Response**

```yaml
< HTTP/1.1 200 OK
< Date: Wed, 07 Dec 2022 19:35:33 GMT
< Server: WSGIServer/0.2 CPython/3.10.8
< Content-Type: application/json
< X-Frame-Options: DENY
< Content-Length: 393
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Cross-Origin-Opener-Policy: same-origin
```
#### **Initial sales record detail**
```json
{
	"price": 44000.0,
	"automobile": {
		"import_href": "/api/automobiles/1C3CC5FB2AN120174/",
		"id": 1,
		"color": "red",
		"year": 2012,
		"vin": "1C3CC5FB2AN120174",
		"model_name": "Sebring",
		"is_sold": false
	},
	"sales_person": {
		"name": "Belle",
		"employee_number": 234,
		"id": 1
	},
	"customer": {
		"name": "Chow",
		"address": "124 Meow Ave., San Diego, CA 91945",
		"phone_number": "1231231232",
		"id": 1
	},
	"id": 1
}
```
#### **Sample Input**
```json
{
	"price": "41000"
}
```
##### Note how only the price has changed.
#### **Sample Output**
```json
{
	"price": 41000.0,
	"automobile": {
		"import_href": "/api/automobiles/1C3CC5FB2AN120174/",
		"id": 1,
		"color": "red",
		"year": 2012,
		"vin": "1C3CC5FB2AN120174",
		"model_name": "Sebring",
		"is_sold": false
	},
	"sales_person": {
		"name": "Belle",
		"employee_number": 234,
		"id": 1
	},
	"customer": {
		"name": "Chow",
		"address": "124 Meow Ave., San Diego, CA 91945",
		"phone_number": "1231231232",
		"id": 1
	},
	"id": 1
}
```
## Models
 **AutomobileVO**
#### The AutomobileVO object is based off of the Automobile model from the inventory microservice.
| Attribute   |  Type   |           Options           |
| ----------- | :-----: | :-------------------------: |
| color       | string  |        max. 50 chars        |
| year        | integer |                             |
| vin         | string  | max. 17 chars, unique=True  |
| import_href | string  | max. 200 chars, unique=True |
| model_name  | string  |       max. 100 chars        |
| is_sold     | boolean |        default=False        |

 **Sales Person**

| Attribute       |  Type   |    Options     |
| --------------- | :-----: | :------------: |
| name            | string  | max. 200 chars |
| employee_number | integer |  unique=True   |

 **Customer**

| Attribute    |  Type  |          Options           |
| ------------ | :----: | :------------------------: |
| name         | string |       max. 200 chars       |
| address      | string |       max. 200 chars       |
| phone_number | string | max. 20 chars, unique=True |

 **Sales Record**

| Attribute    |    Type     |             Options              |
| ------------ | :---------: | :------------------------------: |
| price        |   decimal   | max. 10 chars, max 2 dec. places |
| automobile   | foreign key |        on_delete=PROTECT         |
| sales_person | foreign key |        on_delete=PROTECT         |
| customer     | foreign key |        on_delete=PROTECT         |

#### The attributes in each model are used to describe or identify an object. The options are the limitations for the value of the objects. For instance, it is not possible to input a string for the year of an automobile because it has been specified to be an integer field. Foreign keys have significance as they describe the dependancy between the model object and the attribute. Specifically for sales records, any automobile, sales_person, or customer that has a sales record will be protected because it is not possible to delete a sales record.

**Value Objects**
#### Customers, sales persons, and sales records are their own entities, while the attributes that describe them are value objects. They are intrinsic for describing an entity, so they are implemented as an attribute. Note that in the model for sales record, each automobile, sales_person, and customer is acting as a value obejct that describes the sales record.

## Inventory Microservice
---
The inventory microservice keeps track of automobiles that are either currently in stock or has been sold to a customer. The vehicle type and manufacturer of those automobiles are also tracked in this microservice. Both the sales and service microservices have a AutomobileVO model that polls data from this microservice. Because the polling creates a copy of the automobiles, it is okay to make changes to the automobiles, vehicle, and manufacturer, including deletion. Upon deletion of a manufacturer, all associated vehicles will be deleted because of the foreign key association. Similarly, when a vehicle model is deleted, any automobiles associated with that vehicle model will also be removed. Again, these changes would not effect the database of the sales or service microservices because polling by the AutomobileVO objects creates an immutable copy of the automobiles.

### RESTful Inventory API
---
The REST API for the inventory microservice is detailed below.
#### Manufacturer:
| Method | URL                     | What it does                      |
| ------ | :---------------------- | :-------------------------------- |
| GET    | /api/manufacturers/     | Get a list of all manufacturers   |
| GET    | /api/manufacturers/:id/ | Get the details of a manufacturer |
| POST   | /api/manufacturers/     | Create a manufacturer             |
| PUT    | /api/manufacturers/:id/ | Edit a manufacturer               |
| DELETE | /api/manufacturers/:id/ | Deletes a manufacturer            |
#### Vehicle:
| Method | URL              | What it does                       |
| ------ | :--------------- | :--------------------------------- |
| GET    | /api/models/     | Get a list of all vehicle models   |
| GET    | /api/models/:id/ | Get the details of a vehicle model |
| POST   | /api/models/     | Create a vehicle model             |
| PUT    | /api/models/:id/ | Edit a vehicle model               |
| DELETE | /api/models/:id/ | Deletes a vehicle model            |
#### Automobile
| Method | URL                    | What it does                     |
| ------ | :--------------------- | :------------------------------- |
| GET    | /api/automobiles/      | Get a list of all automobiles    |
| GET    | /api/automobiles/:vin/ | Get the details of an automobile |
| POST   | /api/automobiles/      | Create an automobile             |
| PUT    | /api/automobiles/:vin/ | Edit an automobile               |
| DELETE | /api/automobiles/:vin/ | Delete an automobile             |
### Get a list of all manufacturers
---
#### **Request**

`GET /api/manufacturers/`

    http://localhost:8100/api/manufacturers/

#### **Response**

```yaml
< HTTP/1.1 200 OK
< Date: Fri, 09 Dec 2022 17:23:29 GMT
< Server: WSGIServer/0.2 CPython/3.10.8
< Content-Type: application/json
< X-Frame-Options: DENY
< Content-Length: 266
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Cross-Origin-Opener-Policy: same-origin
< Vary: Origin
```
#### **Sample Output**
```json
{
	"manufacturers": [
		{
			"href": "/api/manufacturers/1/",
			"id": 1,
			"name": "Lexus"
		},
		{
			"href": "/api/manufacturers/2/",
			"id": 2,
			"name": "Toyota"
		},
		{
			"href": "/api/manufacturers/3/",
			"id": 3,
			"name": "Hyundai"
		},
		{
			"href": "/api/manufacturers/4/",
			"id": 4,
			"name": "Honda"
		}
	]
}
```

##### If no manufacturer exists in the database, the output will be:
```json
{
    "manufacturers": []
}
```
### Get details on a manufacturer
---
#### **Request**

`GET /api/manufacturers/:id/`

    http://localhost:8100/api/manufacturers/:id/
##### The manufacturer id can be obtained by viewing the list of all manufacturers.
#### **Response**

```yaml
< HTTP/1.1 200 OK
< Date: Fri, 09 Dec 2022 17:25:54 GMT
< Server: WSGIServer/0.2 CPython/3.10.8
< Content-Type: application/json
< X-Frame-Options: DENY
< Content-Length: 61
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Cross-Origin-Opener-Policy: same-origin
< Vary: Origin
```
#### **Sample Output**
```json
{
	"href": "/api/manufacturers/3/",
	"id": 3,
	"name": "Hyundai"
}
```
### Create a Manufacturer
---
#### **Request**

`POST /api/manufacturers/`

    http://localhost:8100/api/manufacturers/

#### **Response**

```yaml
< HTTP/1.1 200 OK
< Date: Wed, 07 Dec 2022 07:32:36 GMT
< Server: WSGIServer/0.2 CPython/3.10.8
< Content-Type: application/json
< X-Frame-Options: DENY
< Content-Length: 59
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Cross-Origin-Opener-Policy: same-origin
< Vary: Origin
```
#### **Sample Input**
```json
{
  "name": "Lexus"
}
```
#### **Sample Output**
```json
{
	"href": "/api/manufacturers/1/",
	"id": 1,
	"name": "Lexus"
}
```
### Edit a manufacturer
---
#### **Request**

`PUT /api/manufacturers/:id/`

    http://localhost:8100/api/manufacturers/:id/
##### The manufacturer id can be obtained by viewing the list of all manufacturers.
#### **Response**

```yaml
< HTTP/1.1 200 OK
< Date: Fri, 09 Dec 2022 20:33:22 GMT
< Server: WSGIServer/0.2 CPython/3.10.8
< Content-Type: application/json
< X-Frame-Options: DENY
< Content-Length: 60
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Cross-Origin-Opener-Policy: same-origin
< Vary: Origin
```
#### **Sample Input**
```json
{
	"name": "Lexxus"
}
```
##### Continued with previous example. Note how only the name has changed.
#### **Sample Output**
```json
{
	"href": "/api/manufacturers/1/",
	"id": 1,
	"name": "Lexxus"
}
```
### Delete a manufacturer
---
#### **Request**
`DELETE /api/manufacturers/:id/`

    http://localhost:8100/api/manufacturers/:id/
##### The manufacturer id can be obtained by viewing the list of all manufacturers.
#### **Response**
```yaml
< HTTP/1.1 200 OK
< Date: Fri, 09 Dec 2022 20:35:40 GMT
< Server: WSGIServer/0.2 CPython/3.10.8
< Content-Type: application/json
< X-Frame-Options: DENY
< Content-Length: 29
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Cross-Origin-Opener-Policy: same-origin
< Vary: Origin
```
#### **Output from Successful Deletion**
```json
{
	"id": null,
	"name": "Honda"
}
```
### Get a list of all vehicle models
---
#### **Request**

`GET /api/models/`

    http://localhost:8100/api/models/

#### **Response**

```yaml
< HTTP/1.1 200 OK
< Date: Fri, 09 Dec 2022 20:37:52 GMT
< Server: WSGIServer/0.2 CPython/3.10.8
< Content-Type: application/json
< X-Frame-Options: DENY
< Content-Length: 795
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Cross-Origin-Opener-Policy: same-origin
< Vary: Origin
```
#### **Sample Output**
```json
{
	"models": [
		{
			"href": "/api/models/1/",
			"id": 1,
			"name": "Sebring",
			"picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
			"manufacturer": {
				"href": "/api/manufacturers/1/",
				"id": 1,
				"name": "Lexxus"
			}
		},
		{
			"href": "/api/models/3/",
			"id": 3,
			"name": "GX",
			"picture_url": "https://www.gtopcars.com/wp-content/uploads/2022/06/2023-Lexus-GX-460.jpg",
			"manufacturer": {
				"href": "/api/manufacturers/1/",
				"id": 1,
				"name": "Lexxus"
			}
		}
	]
}
```

##### If no vehicle model exists in the database, the output will be:
```json
{
    "models": []
}
```
### Get details on a vehicle model
---
#### **Request**

`GET /api/models/:id/`

    http://localhost:8100/api/models/:id/
##### The vehicle model id can be obtained by viewing the list of all vehicle models.
#### **Response**

```yaml
< HTTP/1.1 200 OK
< Date: Fri, 09 Dec 2022 20:43:18 GMT
< Server: WSGIServer/0.2 CPython/3.10.8
< Content-Type: application/json
< X-Frame-Options: DENY
< Content-Length: 286
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Cross-Origin-Opener-Policy: same-origin
< Vary: Origin
```
#### **Sample Output**
```json
{
	"href": "/api/models/1/",
	"id": 1,
	"name": "Sebring",
	"picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
	"manufacturer": {
		"href": "/api/manufacturers/1/",
		"id": 1,
		"name": "Lexxus"
	}
}
```
### Create a Vehicle Model
---
#### **Request**

`POST /api/models/`

    http://localhost:8100/api/models/

#### **Response**

```yaml
< HTTP/1.1 200 OK
< Date: Thu, 08 Dec 2022 08:29:46 GMT
< Server: WSGIServer/0.2 CPython/3.10.8
< Content-Type: application/json
< X-Frame-Options: DENY
< Content-Length: 218
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Cross-Origin-Opener-Policy: same-origin
< Vary: Origin
```
#### **Sample Input**
```json
{
  "name": "GX",
  "picture_url": "https://www.gtopcars.com/wp-content/uploads/2022/06/2023-Lexus-GX-460.jpg",
  "manufacturer_id": 1
}
```
#### **Sample Output**
```json
{
	"href": "/api/models/3/",
	"id": 3,
	"name": "GX",
	"picture_url": "https://www.gtopcars.com/wp-content/uploads/2022/06/2023-Lexus-GX-460.jpg",
	"manufacturer": {
		"href": "/api/manufacturers/1/",
		"id": 1,
		"name": "Lexus"
	}
}
```
### Edit a vehicle model
---
#### **Request**

`PUT /api/models/:id/`

    http://localhost:8100/api/models/:id/
##### The vehicle model id can be obtained by viewing the list of all vehicle models.
#### **Response**

```yaml
< HTTP/1.1 200 OK
< Date: Fri, 09 Dec 2022 20:59:59 GMT
< Server: WSGIServer/0.2 CPython/3.10.8
< Content-Type: application/json
< X-Frame-Options: DENY
< Content-Length: 287
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Cross-Origin-Opener-Policy: same-origin
< Vary: Origin
```
#### **Initial Vehicle Model Detail**
```json
{
	"href": "/api/models/1/",
	"id": 1,
	"name": "Lexus",
	"picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
	"manufacturer": {
		"href": "/api/manufacturers/1/",
		"id": 1,
		"name": "Lexxus"
	}
}
```
#### **Sample Input**
```json
{
	"name": "Sebbring"
}
```
##### Note how only the name has changed.
#### **Sample Output**
```json
{
	"href": "/api/models/1/",
	"id": 1,
	"name": "Sebbring",
	"picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
	"manufacturer": {
		"href": "/api/manufacturers/1/",
		"id": 1,
		"name": "Lexxus"
	}
}
```
### Delete a vehicle model
---
#### **Request**
`DELETE /api/models/:id/`

    http://localhost:8100/api/models/:id/
##### The vehicle model id can be obtained by viewing the list of all vehicle models.
#### **Response**
```yaml
< HTTP/1.1 200 OK
< Date: Fri, 09 Dec 2022 21:05:30 GMT
< Server: WSGIServer/0.2 CPython/3.10.8
< Content-Type: application/json
< X-Frame-Options: DENY
< Content-Length: 264
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Cross-Origin-Opener-Policy: same-origin
< Vary: Origin
```
#### **Output from Successful Deletion**
```json
{
	"id": null,
	"name": "Sebbring",
	"picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
	"manufacturer": {
		"href": "/api/manufacturers/1/",
		"id": 1,
		"name": "Lexxus"
	}
}
```
### Get a list of all automobiles
---
#### **Request**

`GET /api/automobiles/`

    http://localhost:8100/api/automobiles/

#### **Response**

```yaml
< HTTP/1.1 200 OK
< Date: Fri, 09 Dec 2022 21:19:52 GMT
< Server: WSGIServer/0.2 CPython/3.10.8
< Content-Type: application/json
< X-Frame-Options: DENY
< Content-Length: 377
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Cross-Origin-Opener-Policy: same-origin
< Vary: Origin
```
#### **Sample Output**
```json
{
	"autos": [
		{
			"href": "/api/automobiles/1C3CC5FB2AN120111/",
			"id": 3,
			"color": "Silver",
			"year": 2022,
			"vin": "1C3CC5FB2AN120111",
			"model": {
				"href": "/api/models/3/",
				"id": 3,
				"name": "GX",
				"picture_url": "https://www.gtopcars.com/wp-content/uploads/2022/06/2023-Lexus-GX-460.jpg",
				"manufacturer": {
					"href": "/api/manufacturers/1/",
					"id": 1,
					"name": "Lexxus"
				}
			},
			"is_sold": true
		}
	]
}
```

##### If no vehicle model exists in the database, the output will be:
```json
{
    "autos": []
}
```
### Get details on an automobile
---
#### **Request**

`GET /api/automobiles/:vin/`

    http://localhost:8100/api/automobiles/:vin/
##### The automobile VIN can be obtained by viewing the list of all automobiles.
#### **Response**

```yaml
< HTTP/1.1 200 OK
< Date: Fri, 09 Dec 2022 21:24:59 GMT
< Server: WSGIServer/0.2 CPython/3.10.8
< Content-Type: application/json
< X-Frame-Options: DENY
< Content-Length: 377
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Cross-Origin-Opener-Policy: same-origin
< Vary: Origin
```
#### **Sample Output**
```json
{
	"autos": [
		{
			"href": "/api/automobiles/1C3CC5FB2AN120111/",
			"id": 3,
			"color": "Silver",
			"year": 2022,
			"vin": "1C3CC5FB2AN120111",
			"model": {
				"href": "/api/models/3/",
				"id": 3,
				"name": "GX",
				"picture_url": "https://www.gtopcars.com/wp-content/uploads/2022/06/2023-Lexus-GX-460.jpg",
				"manufacturer": {
					"href": "/api/manufacturers/1/",
					"id": 1,
					"name": "Lexxus"
				}
			},
			"is_sold": true
		}
	]
}
```
### Create an automobile
---
#### **Request**

`POST /api/automobiles/`

    http://localhost:8100/api/automobiles/

#### **Response**

```yaml
< HTTP/1.1 200 OK
< Date: Fri, 09 Dec 2022 21:26:25 GMT
< Server: WSGIServer/0.2 CPython/3.10.8
< Content-Type: application/json
< X-Frame-Options: DENY
< Content-Length: 419
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Cross-Origin-Opener-Policy: same-origin
< Vary: Origin
```
#### **Sample Input**
```json
{
	"color": "white",
	"year": "2022",
	"vin": "1C3CC5FB2AN120AAA",
	"model_id": 2
}
```
#### **Sample Output**
```json
{
	"href": "/api/automobiles/1C3CC5FB2AN120AAA/",
	"id": 5,
	"color": "white",
	"year": "2022",
	"vin": "1C3CC5FB2AN120AAA",
	"model": {
		"href": "/api/models/2/",
		"id": 2,
		"name": "suv",
		"picture_url": "https://toyotaassets.scene7.com/is/image/toyota/Lexus-RX-specialedition-hero-mobile-750x500-LEX-RXG-MY22-0006?wid=750&hei=500",
		"manufacturer": {
			"href": "/api/manufacturers/1/",
			"id": 1,
			"name": "Lexxus"
		}
	},
	"is_sold": false
}
```
### Edit an automobile
---
#### **Request**

`PUT /api/automobiles/:vin/`

    http://localhost:8100/api/automobiles/:vin/
##### The automobile VIN can be obtained by viewing the list of all automobiles.
#### **Response**

```yaml
< HTTP/1.1 200 OK
< Date: Fri, 09 Dec 2022 21:29:48 GMT
< Server: WSGIServer/0.2 CPython/3.10.8
< Content-Type: application/json
< X-Frame-Options: DENY
< Content-Length: 415
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Cross-Origin-Opener-Policy: same-origin
< Vary: Origin
```
#### **Initial Vehicle Model Detail**
```json
{
	"href": "/api/automobiles/1C3CC5FB2AN120AAA/",
	"id": 5,
	"color": "white",
	"year": 2022,
	"vin": "1C3CC5FB2AN120AAA",
	"model": {
		"href": "/api/models/2/",
		"id": 2,
		"name": "suv",
		"picture_url": "https://toyotaassets.scene7.com/is/image/toyota/Lexus-RX-specialedition-hero-mobile-750x500-LEX-RXG-MY22-0006?wid=750&hei=500",
		"manufacturer": {
			"href": "/api/manufacturers/1/",
			"id": 1,
			"name": "Lexxus"
		}
	},
	"is_sold": false
}
```
#### **Sample Input**
```json
{
  "color": "red"
}
```
##### Note how only the color has changed.
#### **Sample Output**
```json
{
	"href": "/api/automobiles/1C3CC5FB2AN120AAA/",
	"id": 5,
	"color": "red",
	"year": 2022,
	"vin": "1C3CC5FB2AN120AAA",
	"model": {
		"href": "/api/models/2/",
		"id": 2,
		"name": "suv",
		"picture_url": "https://toyotaassets.scene7.com/is/image/toyota/Lexus-RX-specialedition-hero-mobile-750x500-LEX-RXG-MY22-0006?wid=750&hei=500",
		"manufacturer": {
			"href": "/api/manufacturers/1/",
			"id": 1,
			"name": "Lexxus"
		}
	},
	"is_sold": false
}
```
### Delete an automobile
---
#### **Request**
`DELETE /api/automobiles/:vin/`

    http://localhost:8100/api/automobiles/:vin/
##### The automobile id can be obtained by viewing the list of all automobiles.
#### **Response**
```yaml
< HTTP/1.1 200 OK
< Date: Fri, 09 Dec 2022 21:33:00 GMT
< Server: WSGIServer/0.2 CPython/3.10.8
< Content-Type: application/json
< X-Frame-Options: DENY
< Content-Length: 418
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Cross-Origin-Opener-Policy: same-origin
< Vary: Origin
```
#### **Output from Successful Deletion**
```json
{
	"href": "/api/automobiles/1C3CC5FB2AN120AAA/",
	"id": null,
	"color": "red",
	"year": 2022,
	"vin": "1C3CC5FB2AN120AAA",
	"model": {
		"href": "/api/models/2/",
		"id": 2,
		"name": "suv",
		"picture_url": "https://toyotaassets.scene7.com/is/image/toyota/Lexus-RX-specialedition-hero-mobile-750x500-LEX-RXG-MY22-0006?wid=750&hei=500",
		"manufacturer": {
			"href": "/api/manufacturers/1/",
			"id": 1,
			"name": "Lexxus"
		}
	},
	"is_sold": false
}
```
## Models
 **Manufacturer**
| Attribute |  Type  |           Options           |
| --------- | :----: | :-------------------------: |
| name      | string | max. 100 chars, unique=True |


 **VehicleModel**
| Attribute    |    Type     |      Options      |
| ------------ | :---------: | :---------------: |
| name         |   string    |  max. 100 chars   |
| picture_url  |             |                   |
| manufacturer | foreign key | on_delete=CASCADE |


 **Automobile**
| Attribute |    Type     |          Options           |
| --------- | :---------: | :------------------------: |
| color     |   string    |       max. 50 chars        |
| year      |   integer   |                            |
| vin       |   string    | max. 17 chars, unique=True |
| is_sold   |   boolean   |       default=False        |
| model     | foreign key |     on_delete=CASCADE      |

#### The attributes in each model are used to describe or identify an object. The options are the limitations for the value of the objects. For instance, each VIN must be unique and can be used as an automobile identifier. This makes sense because when you register an automobile (with, for example, DMV), no two autombiles will be assigned the same VIN. Foreign keys have significance as they describe the dependancy between the model object and the attribute. Manufacturer serves as a foriegn key value object to vehicle models, and vehicle models serve as the foreign key for automobiles. When a manufacturer is deleted, all vehicle models made by that manufacturer will also be deleted. And when a vehicle model is deleted, all automobiles affiliated with that vehicle model will be removed from the database as well. Please note that these changes do not affect the sales and service microservices database. Through polling, each microservice creates a duplicate copy of automobiles for their own database, so making changes in the inventory microservices database will not create any changes for the sales or service microservice.
