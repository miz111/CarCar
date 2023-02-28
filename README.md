# **CarCar**

A Python/Django-based web app utilizing a REST framework with a JS/React-integrated front-end and PostgreSQL database that provides a solution to tracking vehicle and automobile inventory, sales, and services for a car dealership.

---
Team:

* **Person 1:** Martey (Service)
* **Person 2:** Jess (Sales)

<br>

# Table of Contents

- [**CarCar**](#carcar)
  - [Setup Guide](#setup-guide)
  - [Need to reset your PostgreSQL database?](#need-to-reset-your-postgresql-database)
  - [Design](#design)
  - [Service microservice](#service-microservice)
    - [Service API Models](#service-api-models)
    - [RESTful Service API](#restful-service-api)
      - [Get a list of technicians](#get-a-list-of-technicians)
      - [Create a technician](#create-a-technician)
      - [Create a technician with invalid input](#create-a-technician-with-invalid-input)
      - [Get the details of a technician](#get-the-details-of-a-technician)
      - [Get the details of a technician that does not exist](#get-the-details-of-a-technician-that-does-not-exist)
      - [Modify the details of a technician](#modify-the-details-of-a-technician)
      - [Modify the details of a technician that does not exist, or with invalid input](#modify-the-details-of-a-technician-that-does-not-exist-or-with-invalid-input)
      - [Delete a technician](#delete-a-technician)
      - [Delete a deleted technician, or a technician that does not exist](#delete-a-deleted-technician-or-a-technician-that-does-not-exist)
      - [Delete a technician associated to an appointment](#delete-a-technician-associated-to-an-appointment)
      -  ---
	   - [Get a list of appointments](#get-a-list-of-appointments)
      - [Create an appointment](#create-an-appointment)
      - [Create an appointment with invalid input](#create-an-appointment-with-invalid-input)
      - [Get the details of an appointment](#get-the-details-of-an-appointment)
      - [Get the details of an appointment that does not exist](#get-the-details-of-an-appointment-that-does-not-exist)
      - [Modify the details of an appointment](#modify-the-details-of-an-appointment)
      - [Modify the details of an appointment that does not exist, or with invalid input](#modify-the-details-of-an-appointment-that-does-not-exist-or-with-invalid-input)
      - [Delete an appointment](#delete-an-appointment)
      - [Delete a deleted appointment, or an appointment that does not exist](#delete-a-deleted-appointment-or-an-appointment-that-does-not-exist)
      - [Mark an appointment as finished](#mark-an-appointment-as-finished)
      - [Mark an appointment as finished for an appointment that does not exist](#mark-an-appointment-as-finished-for-an-appointment-that-does-not-exist)
  - [Sales Microservice](#sales-microservice)
    - [Sales API Models](#sales--api-models)
    - [RESTful Sales API](#restful-sales-api)
      - [Get a list of all sales persons](#get-a-list-of-all-sales-persons)
      - [Get details on a sales person](#get-details-on-a-sales-person)
      - [Create a sales person](#create-a-sales-person)
      - [Edit a sales person](#edit-a-sales-person)
      - [Delete a sales person](#delete-a-sales-person)
      - [Get a list of all customers](#get-a-list-of-all-customers)
      - [Get details on a Customer](#get-details-on-a-customer)
      - [Edit a customer](#edit-a-customer)
      - [Delete a customer](#delete-a-customer)
      - [Get a list of all sales records](#get-a-list-of-all-sales-records)
      - [Get sales records filtered by sales person](#get-sales-records-filtered-by-sales-person)
      - [Get details on a Sales Record](#get-details-on-a-sales-record)
      - [Create a sales record](#create-a-sales-record)
      - [Edit a sales record](#edit-a-sales-record)
  - [Inventory Microservice](#inventory-microservice)
    - [Inventory API Models](#inventory-api-models)
    - [RESTful Inventory API](#restful-inventory-api)
      - [Get a list of all manufacturers](#get-a-list-of-all-manufacturers)
      - [Get details on a manufacturer](#get-details-on-a-manufacturer)
      - [Create a Manufacturer](#create-a-manufacturer)
      - [Edit a manufacturer](#edit-a-manufacturer)
      - [Delete a manufacturer](#delete-a-manufacturer)
      - [Get a list of all vehicle models](#get-a-list-of-all-vehicle-models)
      - [Get details on a vehicle model](#get-details-on-a-vehicle-model)
      - [Create a Vehicle Model](#create-a-vehicle-model)
      - [Edit a vehicle model](#edit-a-vehicle-model)
      - [Delete a vehicle model](#delete-a-vehicle-model)
      - [Get a list of all automobiles](#get-a-list-of-all-automobiles)
      - [Get details on an automobile](#get-details-on-an-automobile)
      - [Create an automobile](#create-an-automobile)
      - [Edit an automobile](#edit-an-automobile)
      - [Delete an automobile](#delete-an-automobile)


<br>
<br>

## Setup Guide
---
### 1. Get Docker [here](https://docs.docker.com/get-docker/) or using your terminal:

- **MacOS**

        brew install --cask docker

-  **Windows**

        winget install Docker.DockerDesktop

### 2. Run the Docker Application

### 3. **Fork** [this](https://gitlab.com/martey.haw/project-beta) repository, then **clone** into a \<local directory> and navigate into the \<local directory>.
```
cd <projects folder>
md <local directory>
git clone https://gitlab.com/martey.haw/project-beta.git
cd <local directory>
```

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

<br>
<br>

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

<br>
<br>

## Design
---

![carcar-simple-diagram](/img/carcar-simple-diagram.png)

- front-end: http://localhost:3000/

- inventory-api: http://localhost:8100/

- service-api: http://localhost:8080/

- sales-api: http://localhost:8090/

<br>
<br>

## Service microservice
---
The `service-api` is a `RESTful` microservice which manages automobile service appointments as well as hired technician employees who are assigned to handle each service appointment.

In this design, automobiles from other dealerships are very welcome to have their automobiles serviced in this dealership; however, automobiles that were once in the inventory of this dealership receive a special VIP treatment.

This microservice utilizes its integration with the `inventory-api` in order for the `service-api` to determine whether the automobile scheduled for the appointment was once in this dealership's inventory. To accomplish this feature, an immutable copy of all automobiles from the `inventory-api` are created/updated and stored as **`automobile value objects`** (`AutomobileVO`) through the use of periodic **`polling`**. Whenever an appointment is created, the `service-api` checks whether the VIN number provided by the customer matches any VIN number that is in the system (i.e. `AutomobileVO` with a matching VIN property), and if it does find a match, then the appointment will be flagged for VIP servicing (i.e. `vip_treatment: True`).

Given that `vin` and `import_href` properties are unique for each `Automobile` in the `inventory-api`, the `AutomobileVO` model uses these properties to establish a link between the `AutomobileVO` and the `Automobile` model in the `inventory-api`. Although other properties such as `year`, `color`, and the associated vehicle model's name (`model_name`) are not currently utilized, they are populated into the `AutomobileVO` database for potential future use.

Because each service appointment requires a designated technician, and each technician can be assigned to many appointments, the `ServiceAppointment` model establishes a many-to-one relationship with the `Technician` model via a Foreign Key. Since it is desirable to keep a record of all service appointments that transpire, the Foreign Key utilizes the on_delete PROTECT option, which prevents any associated service appointments from being deleted when a technician instance gets deleted.

A breakdown of features that this microservice carries includes:
- Adding a technician
- Modifying existing technicians
- Deleting technicians (that have not been associated with any appointments)
- Creating a service appointment
- Deleting/Canceling a service appointment
- Marking a service appointment as finished

<br>

The models are described below.

<br>

## Service API Models
---
**Technician**

| Attribute       |  Type  |    Options     | Description                       |
| --------------- | :----: | :------------: | --------------------------------- |
| name            | string | max. 200 chars | The technician's name             |
| employee_number |  int   |     unique     | A unique assigned employee number |

<br>

**ServiceAppointment**

| Attribute     |       Type        |      Options      | Description                                     |
| ------------- | :---------------: | :---------------: | ----------------------------------------------- |
| vin           |      string       |  max. 200 chars   | The VIN number of the automobile to be serviced |
| customer_name |      string       |  max. 200 chars   | The customer's name                             |
| date_time     |     datetime      |                   | The date and time of the service appointment    |
| technician    | ForeignKey object | on_delete=PROTECT | The assigned technician                         |
| reason        |      string       |  max. 200 chars   | The reason for having the automobile serviced   |
| vip_treatment |      boolean      |   default=False   | Whether the appointment exercises VIP treatment |
| is_finished   |      boolean      |   default=False   | Whether the appointment has transpired or not   |

<br>

**AutomobileVO**

| Attribute   |       Type        |        Options        | Description                                                                 |
| ----------- | :---------------: | :-------------------: | --------------------------------------------------------------------------- |
| import_href |      string       |    max. 200 chars     | Href pointing towards the associated Automobile object in the inventory-api |
| color       |      string       |     max. 50 chars     | The color of the automobile                                                 |
| year        |        int        |       smallint        | The year of the automobile's model                                          |
| vin         | ForeignKey object | max. 17 chars, unique | The automobile's VIN number                                                 |
| model_name  |      string       |    max. 100 chars     | The automobile's model name                                                 |

<br>
<br>

### RESTful Service API
---
The REST API for the `service-api` microservice is detailed below.

<br>

#### **Technicians**

| Method | URL                   | What it does                       |
| ------ | :-------------------- | :--------------------------------- |
| GET    | /api/technicians/     | Get a list of technicians          |
| POST   | /api/technicians/     | Create a technician                |
| GET    | /api/technicians/:id/ | Get the details of a technician    |
| PUT    | /api/technicians/:id/ | Modify the details of a technician |
| DELETE | /api/technicians/:id/ | Delete a technician                |

<br>

#### **Service appointments**

| Method | URL                           | What it does                         |
| ------ | :---------------------------- | :----------------------------------- |
| GET    | /api/appointments/            | Get a list of appointments           |
| POST   | /api/appointments/            | Create an appointment                |
| GET    | /api/appointments/:id/        | Get the details of an appointment    |
| PUT    | /api/appointments/:id/        | Modify the details of an appointment |
| DELETE | /api/appointments/:id/        | Delete an appointment                |
| PUT    | /api/appointments/:id/finish/ | Mark an appointment as finished      |

<br>

### Get a list of technicians
---
#### **Request**

`GET /api/technicians/`

    http://localhost:8080/api/technicians/

#### **Response**

```yaml
< HTTP/1.1 200 OK
< Date: Mon, 12 Dec 2022 09:31:12 GMT
< Server: WSGIServer/0.2 CPython/3.10.9
< Content-Type: application/json
< X-Frame-Options: DENY
< Content-Length: 288
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Cross-Origin-Opener-Policy: same-origin
< Vary: Origin
```
```json
{
	"technicians": [
		{
			"href": "/api/technicians/1/",
			"id": 1,
			"name": "Balor Rayhana",
			"employee_number": 1
		},
		{
			"href": "/api/technicians/3/",
			"id": 3,
			"name": "Cameron Jensen",
			"employee_number": 3
		},
		{
			"href": "/api/technicians/2/",
			"id": 2,
			"name": "Miracle Mechanic",
			"employee_number": 2
		}
	]
}
```

##### Without any technicians
```json
{
    "technicians": []
}
```

<br>

### Create a technician
---
#### **Request**

`POST /api/technicians/`

    http://localhost:8080/api/technicians/

```json
{
	"name": "Cameron Jensen",
	"employee_number": 3
}
```

<br>

#### **Response**
```yaml
< HTTP/1.1 200 OK
< Date: Mon, 12 Dec 2022 09:31:10 GMT
< Server: WSGIServer/0.2 CPython/3.10.9
< Content-Type: application/json
< X-Frame-Options: DENY
< Content-Length: 88
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Cross-Origin-Opener-Policy: same-origin
< Vary: Origin
```

```json
{
	"href": "/api/technicians/3/",
	"id": 3,
	"name": "Cameron Jensen",
	"employee_number": 3
}
```

<br>

### Create a technician with invalid input
---
#### **Request**

`POST /api/technicians/`

    http://localhost:8080/api/technicians/

```json
{
	"name": "200 char limit",
	"employee_number": "must not be an existing employee number"
}
```

<br>

#### **Response**
```yaml
< HTTP/1.1 400 Bad Request
< Date: Mon, 12 Dec 2022 09:37:10 GMT
< Server: WSGIServer/0.2 CPython/3.10.9
< Content-Type: application/json
< X-Frame-Options: DENY
< Content-Length: 48
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Cross-Origin-Opener-Policy: same-origin
< Vary: Origin
```

```json
{
	"message": "Could not register the technician"
}
```

<br>

### Get the details of a technician
---
#### **Request**

`GET /api/technicians/:id/`

    http://localhost:8080/api/technicians/1/

#### **Response**

```yaml
< HTTP/1.1 200 OK
< Date: Mon, 12 Dec 2022 09:38:09 GMT
< Server: WSGIServer/0.2 CPython/3.10.9
< Content-Type: application/json
< X-Frame-Options: DENY
< Content-Length: 87
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Cross-Origin-Opener-Policy: same-origin
< Vary: Origin
```
```json
{
	"href": "/api/technicians/1/",
	"id": 1,
	"name": "Balor Rayhana",
	"employee_number": 1
}
```

<br>

### Get the details of a technician that does not exist
---
#### **Request**

`GET /api/technicians/:id/`

    http://localhost:8080/api/technicians/999/

#### **Response**

```yaml
< HTTP/1.1 400 Bad Request
< Date: Mon, 12 Dec 2022 09:38:32 GMT
< Server: WSGIServer/0.2 CPython/3.10.9
< Content-Type: application/json
< X-Frame-Options: DENY
< Content-Length: 55
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Cross-Origin-Opener-Policy: same-origin
< Vary: Origin
```
```json
{
	"message": "Invalid technician employee ID provided."
}
```

<br>

### Modify the details of a technician
---
#### **Request**

`PUT /api/technicians/:id/`

    http://localhost:8080/api/technicians/1/

```json
{
	"name": "Lénárd Eide",
	"employee_number": 11
}
```
#### **Response**
```yaml
< HTTP/1.1 200 OK
< Date: Mon, 12 Dec 2022 09:39:16 GMT
< Server: WSGIServer/0.2 CPython/3.10.9
< Content-Type: application/json
< X-Frame-Options: DENY
< Content-Length: 96
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Cross-Origin-Opener-Policy: same-origin
< Vary: Origin
```

```json
{
	"href": "/api/technicians/1/",
	"id": 1,
	"name": "Lénárd Eide",
	"employee_number": 11
}
```

<br>

### Modify the details of a technician that does not exist, or with invalid input
---
#### **Request**

`PUT /api/technicians/:id/`

    http://localhost:8080/api/technicians/1/

```json
{
	"name": "200 char limit",
	"employee_number": "must not be an existing employee number"
}
```
#### **Response**
```yaml
< HTTP/1.1 400 Bad Request
< Date: Mon, 12 Dec 2022 09:40:11 GMT
< Server: WSGIServer/0.2 CPython/3.10.9
< Content-Type: application/json
< X-Frame-Options: DENY
< Content-Length: 71
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Cross-Origin-Opener-Policy: same-origin
< Vary: Origin
```

```json
{
	"message": "That Technician could not be found. "
}
```
```json
{
	"message": "There is a technician with that employee number already."
}
```
```json
{
	"message": "A value was specified that was longer than the allocated limit."
}
```

<br>

### Delete a technician
---
#### **Request**

`DELETE /api/technicians/:id/`

    http://localhost:8080/api/technicians/3/

#### **Response**

```yaml
< HTTP/1.1 200 OK
< Date: Mon, 12 Dec 2022 09:44:42 GMT
< Server: WSGIServer/0.2 CPython/3.10.9
< Content-Type: application/json
< X-Frame-Options: DENY
< Content-Length: 17
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Cross-Origin-Opener-Policy: same-origin
< Vary: Origin
```

```json
{
	"deleted": true
}
```

<br>

### Delete a deleted technician, or a technician that does not exist
---
#### **Request**

`DELETE /api/technicians/:id/`

    http://localhost:8080/api/technicians/999/

#### **Response**

```yaml
< HTTP/1.1 200 OK
< Date: Mon, 12 Dec 2022 09:45:07 GMT
< Server: WSGIServer/0.2 CPython/3.10.9
< Content-Type: application/json
< X-Frame-Options: DENY
< Content-Length: 18
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Cross-Origin-Opener-Policy: same-origin
< Vary: Origin
```

```json
{
	"deleted": false
}
```

<br>

### Delete a technician associated to an appointment
---
#### **Request**

`DELETE /api/technicians/:id/`

    http://localhost:8080/api/technicians/1/

#### **Response**

```yaml
< HTTP/1.1 400 Bad Request
< Date: Mon, 12 Dec 2022 09:46:01 GMT
< Server: WSGIServer/0.2 CPython/3.10.9
< Content-Type: application/json
< X-Frame-Options: DENY
< Content-Length: 49
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Cross-Origin-Opener-Policy: same-origin
< Vary: Origin
```

```json
{
	"message": "That technician cannot be deleted."
}
```

<br>

### Get a list of appointments
---
#### **Request**

`GET /api/appointments/`

    http://localhost:8080/api/appointments/

#### **Response**

```yaml
< HTTP/1.1 200 OK
< Date: Mon, 12 Dec 2022 08:47:22 GMT
< Server: WSGIServer/0.2 CPython/3.10.9
< Content-Type: application/json
< X-Frame-Options: DENY
< Content-Length: 1329
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Cross-Origin-Opener-Policy: same-origin
< Vary: Origin
```
```json
{
	"service_appointments": [
		{
			"href": "/api/appointments/1/",
			"id": 1,
			"vin": "5NPE34AFXFH053565",
			"customer_name": "Branislava Kieran",
			"date_time": "2022-12-10T07:00:00+00:00",
			"technician": {
				"href": "/api/technicians/1/",
				"id": 1,
				"name": "Balor Rayhana",
				"employee_number": 1
			},
			"reason": "Oil change",
			"vip_treatment": true,
			"is_finished": true
		},
		{
			"href": "/api/appointments/2/",
			"id": 2,
			"vin": "3FADP4EJ9EM237120",
			"customer_name": "Sitaram Godelieve",
			"date_time": "2022-12-11T07:00:00+00:00",
			"technician": {
				"href": "/api/technicians/1/",
				"id": 1,
				"name": "Balor Rayhana",
				"employee_number": 1
			},
			"reason": "Tire rotation",
			"vip_treatment": false,
			"is_finished": true
		},
		{
			"href": "/api/appointments/3/",
			"id": 3,
			"vin": "SAJAV1345GC463918",
			"customer_name": "Law Ghufran",
			"date_time": "2022-12-13T09:45:00+00:00",
			"technician": {
				"href": "/api/technicians/1/",
				"id": 1,
				"name": "Balor Rayhana",
				"employee_number": 1
			},
			"reason": "Tire rotation",
			"vip_treatment": false,
			"is_finished": false
		},
		{
			"href": "/api/appointments/4/",
			"id": 4,
			"vin": "JM1BL1VF6B1466144",
			"customer_name": "Derrick Stanley",
			"date_time": "2022-12-23T16:00:00+00:00",
			"technician": {
				"href": "/api/technicians/1/",
				"id": 1,
				"name": "Balor Rayhana",
				"employee_number": 1
			},
			"reason": "Car battery replacement",
			"vip_treatment": false,
			"is_finished": true
		}
	]
}
```

##### Without any appointments
```json
{
    "service_appointments": []
}
```

<br>

### Create an appointment
---
#### **Request**

`POST /api/appointments/`

    http://localhost:8080/api/appointments/

```json
{
	"vin": "1C3CC5FB2AN120175",
	"customer_name": "John Doe",
	"date_time": "2022-12-06 09:00",
	"technician": 1,
	"reason": "A reason"
}
```
##### *employee number is specified for the technician property

<br>

#### **Response**
```yaml
< HTTP/1.1 200 OK
< Date: Thu, 08 Dec 2022 09:17:31 GMT
< Server: WSGIServer/0.2 CPython/3.10.8
< Content-Type: application/json
< X-Frame-Options: DENY
< Content-Length: 299
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Cross-Origin-Opener-Policy: same-origin
< Vary: Origin
```

```json
{
	"href": "/api/appointments/10/",
	"id": 10,
	"vin": "1C3CC5FB2AN120175",
	"customer_name": "John Doe",
	"date_time": "2022-12-06 09:00",
	"technician": {
		"href": "/api/technicians/1/",
		"id": 1,
		"name": "John Doe",
		"employee_number": 1
	},
	"reason": "A reason",
	"vip_treatment": false,
	"is_finished": false
}
```

<br>

### Create an appointment with invalid input
---
#### **Request**

`POST /api/appointments/`

    http://localhost:8080/api/appointments/

```json
{
	"vin": "17 char limit",
	"customer_name": "200 char limit",
	"date_time": "non-datetime format",
	"technician": "invalid employee_number",
	"reason": "200 char limit"
}
```
##### *employee number is specified for the technician property

<br>

#### **Response**
```yaml
< HTTP/1.1 400 Bad Request
< Date: Mon, 12 Dec 2022 09:07:20 GMT
< Server: WSGIServer/0.2 CPython/3.10.9
< Content-Type: application/json
< X-Frame-Options: DENY
< Content-Length: 78
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Cross-Origin-Opener-Policy: same-origin
< Vary: Origin
```

```json
{
	"message": "A value was specified that was longer than the allocated limit."
}
```

```json
{
	"message": "Invalid Technician employee number provided."
}
```

```json
{
	"message": "A value was specified with an invalid format."
}
```

<br>

### Get the details of an appointment
---
#### **Request**

`GET /api/appointments/:id/`

    http://localhost:8080/api/appointments/1/

#### **Response**

```yaml
< HTTP/1.1 200 OK
< Date: Mon, 12 Dec 2022 08:46:17 GMT
< Server: WSGIServer/0.2 CPython/3.10.9
< Content-Type: application/json
< X-Frame-Options: DENY
< Content-Length: 320
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Cross-Origin-Opener-Policy: same-origin
< Vary: Origin
```
```json
{
	"href": "/api/appointments/1/",
	"id": 1,
	"vin": "5NPE34AFXFH053565",
	"customer_name": "Branislava Kieran",
	"date_time": "2022-12-10T07:00:00+00:00",
	"technician": {
		"href": "/api/technicians/1/",
		"id": 1,
		"name": "Balor Rayhana",
		"employee_number": 1
	},
	"reason": "Oil change",
	"vip_treatment": true,
	"is_finished": true
}
```

<br>

### Get the details of an appointment that does not exist
---
#### **Request**

`GET /api/appointments/:id/`

    http://localhost:8080/api/appointments/999/

#### **Response**

```yaml
< HTTP/1.1 400 Bad Request
< Date: Mon, 12 Dec 2022 08:50:10 GMT
< Server: WSGIServer/0.2 CPython/3.10.9
< Content-Type: application/json
< X-Frame-Options: DENY
< Content-Length: 55
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Cross-Origin-Opener-Policy: same-origin
< Vary: Origin
```
```json
{
	"message": "Invalid service appointment ID provided."
}
```

<br>

### Modify the details of an appointment
---
#### **Request**

`PUT /api/appointments/:id/`

    http://localhost:8080/api/appointments/1/

```json
{
	"customer_name": "John Doe",
	"date": "2022-12-06",
	"time": "09:00",
	"technician": 3,
	"reason": "A reason"
}
```
#### **Response**
```yaml
< HTTP/1.1 200 OK
< Date: Wed, 07 Dec 2022 06:35:06 GMT
< Server: WSGIServer/0.2 CPython/3.10.8
< Content-Type: application/json
< X-Frame-Options: DENY
< Content-Length: 307
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Cross-Origin-Opener-Policy: same-origin
```

```json
{
	"href": "/api/appointments/1/",
	"id": 1,
	"vin": "1C3CC5FB2AN120175",
	"customer_name": "John Doe",
	"date_time": "2022-12-06T09:00:00+00:00",
	"technician": {
		"href": "/api/technicians/3/",
		"id": 3,
		"name": "John Doer",
		"employee_number": 3
	},
	"reason": "A reason",
	"vip_treatment": false,
	"is_finished": false
}
```

<br>

### Modify the details of an appointment that does not exist, or with invalid input
---
#### **Request**

`PUT /api/appointments/:id/`

    http://localhost:8080/api/appointments/999/

```json
{
	"vin": "1C3CC5FB2AN120175",
	"customer_name": "John Doe",
	"date_time": "2022-12-06 09:00",
	"technician": 1,
	"reason": "A reason"
}
```
#### **Response**
```yaml
< HTTP/1.1 404 Not Found
< Date: Mon, 12 Dec 2022 09:12:21 GMT
< Server: WSGIServer/0.2 CPython/3.10.9
< Content-Type: application/json
< X-Frame-Options: DENY
< Content-Length: 49
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Cross-Origin-Opener-Policy: same-origin
< Vary: Origin
```

```json
{
	"message": "Service appointment does not exist"
}
```
```json
{
	"message": "A value was specified that was longer than the allocated limit."
}
```

```json
{
	"message": "Invalid Technician employee number provided."
}
```

```json
{
	"message": "A value was specified with an invalid format."
}
```
<br>

### Delete an appointment
---
#### **Request**

`DELETE /api/appointments/:id/`

    http://localhost:8080/api/appointments/5/

#### **Response**

```yaml
< HTTP/1.1 200 OK
< Date: Mon, 12 Dec 2022 08:47:19 GMT
< Server: WSGIServer/0.2 CPython/3.10.9
< Content-Type: application/json
< X-Frame-Options: DENY
< Content-Length: 17
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Cross-Origin-Opener-Policy: same-origin
< Vary: Origin
```

```json
{
	"deleted": true
}
```

<br>

### Delete a deleted appointment, or an appointment that does not exist
---
#### **Request**

`DELETE /api/appointments/:id/`

    http://localhost:8080/api/appointments/999/

#### **Response**

```yaml
< HTTP/1.1 200 OK
< Date: Mon, 12 Dec 2022 09:25:24 GMT
< Server: WSGIServer/0.2 CPython/3.10.9
< Content-Type: application/json
< X-Frame-Options: DENY
< Content-Length: 18
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Cross-Origin-Opener-Policy: same-origin
< Vary: Origin
```

```json
{
	"deleted": false
}
```

<br>

### Mark an appointment as finished
---
#### **Request**

`PUT /api/appointments/:id/finish/`

    http://localhost:8080/api/appointments/5/finish/

#### **Response**

```yaml
< HTTP/1.1 200 OK
< Date: Wed, 07 Dec 2022 20:54:54 GMT
< Server: WSGIServer/0.2 CPython/3.10.8
< Content-Type: application/json
< X-Frame-Options: DENY
< Content-Length: 305
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Cross-Origin-Opener-Policy: same-origin
< Vary: Origin
```

```json
{
	"href": "/api/appointments/5/",
	"id": 5,
	"vin": "1C3CC5FB2AN120174",
	"customer_name": "John Doe",
	"date_time": "2022-12-06T09:00:00+00:00",
	"technician": {
		"href": "/api/technicians/1/",
		"id": 1,
		"name": "John Doe",
		"employee_number": 1
	},
	"reason": "A reason",
	"vip_treatment": true,
	"is_finished": false
}
```

<br>

### Mark an appointment as finished for an appointment that does not exist
---
#### **Request**

`PUT /api/appointments/:id/finish/`

    http://localhost:8080/api/appointments/5/finish/

#### **Response**

```yaml
< HTTP/1.1 404 Not Found
< Date: Mon, 12 Dec 2022 09:26:46 GMT
< Server: WSGIServer/0.2 CPython/3.10.9
< Content-Type: application/json
< X-Frame-Options: DENY
< Content-Length: 49
< X-Content-Type-Options: nosniff
< Referrer-Policy: same-origin
< Cross-Origin-Opener-Policy: same-origin
< Vary: Origin
```

```json
{
	"message": "Service appointment does not exist"
}
```

<br>
<br>

## Sales Microservice
---
The sales microservice keeps track of the company's sales persons' information, customer database, as well as sales records, with some help from the inventory microservice. Polling has been implemented to grab vehicles from the inventory microservice, (specifically unsold vehicles), so that sales records can only be generated for an unsold vehicle. Because a sales record should be permanent, the project has been set up such that it is not possible to delete a customer, a vehicle, or a sales person that is associated with a sales record.

In addition to a list view of sales persons, customers, and sales records, users can also filter sales records based on a sales person.

<br>

### Sales API Models
---
 **AutomobileVO**
#### The AutomobileVO object is based off of the Automobile model from the inventory microservice.
| Attribute   |  Type   |           Options           |                 Description                 |
| ----------- | :-----: | :-------------------------: | :-----------------------------------------: |
| color       | string  |        max. 50 chars        |         the color of the automobile         |
| year        | integer |                             |    the year aumotobile was manufactured     |
| vin         | string  | max. 17 chars, unique=True  |            unique automobile vin            |
| import_href | string  | max. 200 chars, unique=True |     unique identifier used for polling      |
| model_name  | string  |       max. 100 chars        |      the name of the automobile model       |
| is_sold     | boolean |        default=False        | whether the automobile has been sold or not |

 **Sales Person**

| Attribute       |  Type   |    Options     |                Description                |
| --------------- | :-----: | :------------: | :---------------------------------------: |
| name            | string  | max. 200 chars |       the name of the sales person        |
| employee_number | integer |  unique=True   | the sales person's unique employee number |

 **Customer**

| Attribute    |  Type  |          Options           |           Description            |
| ------------ | :----: | :------------------------: | :------------------------------: |
| name         | string |       max. 200 chars       |     the name of the customer     |
| address      | string |       max. 200 chars       |   the address of the customer    |
| phone_number | string | max. 20 chars, unique=True | the phone number of the customer |

The attributes in each model are used to describe or identify an object. The options are the limitations for the value of the objects. For instance, it is not possible to input a string for the year of an automobile because it has been specified to be an integer field. Foreign keys have significance as they describe the dependancy between the model object and the attribute. Specifically for sales records, any automobile, sales_person, or customer that has a sales record will be protected because it is not possible to delete a sales record.

**Value Objects**

Customers, sales persons, and sales records are their own entities, while the attributes that describe them are value objects. They are intrinsic for describing an entity, so they are implemented as an attribute. Note that in the model for sales record, each automobile, sales_person, and customer is acting as a value obejct that describes the sales record.

<br>

### RESTful Sales API
---
The REST API for the `sales-api` microservice is detailed below.

<br>

#### Sales Persons:
| Method | URL                   | What it does                      |
| ------ | :-------------------- | :-------------------------------- |
| GET    | /api/salesperson/     | Get a list of all sales persons   |
| GET    | /api/salesperson/:id/ | Get the details of a sales person |
| POST   | /api/salesperson/     | Create a sales person             |
| PUT    | /api/salesperson/:id/ | Edit a sales person               |
| DELETE | /api/salesperson/:id/ | Deletes a sales person            |

<br>

#### Customers:
| Method | URL                | What it does                  |
| ------ | :----------------- | :---------------------------- |
| GET    | /api/customer/     | Get a list of all customers   |
| GET    | /api/customer/:id/ | Get the details of a customer |
| POST   | /api/customer/     | Create a customer             |
| PUT    | /api/customer/:id/ | Edit a customer               |
| DELETE | /api/customer/:id/ | Deletes a sales person        |

<br>

#### Sales Record
| Method | URL                               | What it does                                            |
| ------ | :-------------------------------- | :------------------------------------------------------ |
| GET    | /api/salesrecord/                 | Get a list of all sales records                         |
| GET    | /api/salesperson/:id/salesrecord/ | Get a list of sales records completed by a sales person |
| GET    | /api/salesrecord/:id/             | Get the details of a sales record                       |
| POST   | /api/salesrecord/                 | Create a sales record                                   |
| PUT    | /api/salesrecord/:id/             | Edit a sales record                                     |
##### Note that a request to delete sales records does not exist. From an industrial standpoint, sales records should be permanent, so a delete request method was not implemented.

<br>

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

<br>

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

<br>

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

<br>

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

<br>

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

<br>

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

<br>

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

<br>

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

<br>

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

<br>

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

<br>

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

<br>

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

<br>

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

<br>

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

<br>

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

<br>
<br>

## Inventory Microservice
---
The inventory microservice ultimately keeps track of automobiles (with their corresponding manufacturer and vehicle model) that are either currently in stock, or have been sold to a customer. The `Automobile` model relies on the `Vehicle` model in a many-to-one relationship via a Foreign Key, and analogously for the `Vehicle` model to the `Manufacturer` model.

Changes made to the `Automobile` model (such as whether the automobile was sold) are updated on associated microservices (`sales-api` and `service-api`) via **polling**.

Deletion of any instances of `Manufacturer` causes a cascade deletion of related `Vehicle` instances, which subsequently causes another cascade deletion of related `Automobile` instances. Value objects already generated on associated microservices will remain unaffected by deletions performed on the `inventory-api`.

<br>

## Inventory API Models

<br>

 **Manufacturer**
| Attribute |  Type  |           Options           | Description                  |
| --------- | :----: | :-------------------------: | ---------------------------- |
| name      | string | max. 100 chars, unique=True | The name of the manufacturer |

<br>


 **VehicleModel**
| Attribute    |       Type        |      Options      | Description                             |
| ------------ | :---------------: | :---------------: | --------------------------------------- |
| name         |      string       |  max. 100 chars   | The name of the vehicle model           |
| picture_url  |      string       |        url        | URL for a picture for the vehicle model |
| manufacturer | ForeignKey object | on_delete=CASCADE | The manufacturer of the vehicle model   |

<br>

 **Automobile**
| Attribute |       Type        |          Options           | Description                                  |
| --------- | :---------------: | :------------------------: | -------------------------------------------- |
| color     |      string       |       max. 50 chars        | The color of the automobile                  |
| year      |        int        |     positive smallint      | The year of the vehicle model                |
| vin       |      string       | max. 17 chars, unique=True | The VIN number registered for the automobile |
| is_sold   |      boolean      |       default=False        | Whether the automobile has been sold or not  |
| model     | ForeignKey object |     on_delete=CASCADE      | The vehicle model of the automobile          |

<br>

The attributes in each model are used to describe or identify an object. The options are the limitations for the value of the objects. For instance, each VIN must be unique and can be used as an automobile identifier. This makes sense because when you register an automobile (with, for example, DMV), no two autombiles will be assigned the same VIN. Foreign keys have significance as they describe the dependancy between the model object and the attribute. Manufacturer serves as a foriegn key value object to vehicle models, and vehicle models serve as the foreign key for automobiles. When a manufacturer is deleted, all vehicle models made by that manufacturer will also be deleted. And when a vehicle model is deleted, all automobiles affiliated with that vehicle model will be removed from the database as well. Please note that these changes do not affect the sales and service microservices database. Through polling, each microservice creates a duplicate copy of automobiles for their own database, so making changes in the inventory microservices database will not create any changes for the sales or service microservice.

<br>

### RESTful Inventory API
---
The REST API for the `inventory-api` microservice is detailed below.
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

<br>

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

<br>

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

<br>

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

<br>

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

<br>

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

<br>

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

<br>

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

<br>

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

<br>

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

<br>

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

<br>

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

<br>

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

<br>

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

<br>

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

<br>

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

### Repo Transfer
```
Repo transferred from GitLab to GitHub on 2/27/2023.
```
