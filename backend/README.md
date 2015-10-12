# Server API

## API specification
**GET** `/contacts`

Retrieve a list of all *Contacts*. This endpoint also supports
filtering on all *Contact* properties except `id`. Any item matching
all - if any - filters will be returned.
`/contacts?<contact_property>=<filter_value>`.

**POST** `/contacts`

Create a new *Contact* object. All *Contact* properties are required.

**GET** `/contacts/<string:id>`

Returns a contact - if any - with the given `id`.

**PUT** `/contacts/<string:id>`

Updates a contact - if any - with the given `id`. All properties are
required except `id`.

#### Contact Object
All properties are of type String:

`id` - Unique identifier

`first_name` First name

`last_name` Last name

`title` Role title

`color` Arbitrary HTML color code without # prefix

`image` URL to avatar

`location` Location as timezone https://en.wikipedia.org/wiki/Tz_database

`team` Function level team


## Getting started
Install dependencies:

Install virtualenv if necessary:
```
pip install virtualenv
```

Setup work environment
```
virtualenv env
source env/bin/activate
pip install -r requirements.txt
```

Run the API server:

```
python runserver.py
```

Fetch the list of contacts to verify that things are working:

```
curl http://127.0.0.1:5000/contacts
```
