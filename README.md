# EMPOWERWEALTH TEST - NOSQL TO SQL DATABASE MIGRATION

## Structure Instruction

1. Q1-CreateTable-Statement.sql
   Answer of the first question to write a set of CREATE TABLE statement(s).

2. Q2-Insert.ts
   Answer of the second question to write a implementation of insert(object) using TypeScript.

3. Q2-Update.ts
   Answer of the second question to write a implementation of update(\_id, path, newValue) using TypeScript.

## Overview

Within a document/object database, modifications are performed on a document by utilizing following operations:

1. insert(object) – stores a new object within the document database
2. update(\_id, path, newValue) – given \_id and path, for the object in the database where object.\_id == \_id, set the value of the object at the specified path to newValue.
3. unset(\_id, path) – given \_id and path, for the object in the database where object.\_id == \_id, remove (unset) the value in the object specified at path.
4. truncate(\_id, path, newLength) – given \_id and path, for the object in the database where object.\_id == \_id, where the path which references a nested array, truncate the length of the array to newLength For each of the operations above, the path is a dot concatenated string that represents a location within an object, for example, the path: “address.1.street” is equivalent to retrieving the value from object["address"][1]["street"].
   Upon instantiating an object for the above schema in the document database, an insert operation would be called, similar to the following, that would save the object into the document database:

```
// Insert Client
insert({
  _id: "642b9acd622874d7eb28fb48",
  name: "Joe Bloggs",
  dateOfBirth: new Date("1986-01-20"),
  businessDetails: {
    _id: "642b9adc30d1fac1035a3260",
    name: "Acme Inc",
    abn: "44 555 666 777",
    address: [
      {
        _id: "642b9ae48cb168197e4be1df",
        formattedAddress: "1 Smith St, Suburbia, NSW 2123",
        streetNumber: 1,
        street: "Smith St",
        suburb: "Suburbia",
        postcode: "2123",
        isCurrent: true,
      },
      {
        _id: "642b9aedd19873874376fdea",
        formattedAddress: "24 Park St, Smithfield, NSW 2223",
        streetNumber: 24,
        street: "Park St",
        suburb: "Smithfield",
        postCode: "2223",
        isCurrent: false,
        associates: [
          {
            _id: "642b9af4aa7bed6c401f57f7",
            name: "Mary Bloggs",
            dateOfBirth: new Date("1988-02-20"),
            businessDetails: {
              _id: "642b9afbe8034c5ccec5a429",
              name: "Mary Corp",
              abn: "44 555 666 888",
            },
            associates: [],
          },
        ],
      },
    ],
  },
})
```

Once this object had been loaded into the database, update calls could then be made to modify the data.
These update operations may be as simple as replacing a single value within a document:

```
// Update client name
update("642b9acd622874d7eb28fb48", "name", "John H Bloggs");
```

To replacing an entire branch of the tree, along with all its children:

```
// Replace associate's associate with address
update("642b9acd622874d7eb28fb48", "associates.0.associates", [
  {
    _id: "642b9b89bdec5c3f92283f08",
    name: "Dan Donaldson",
    dateOfBirth: new Date("1986-03-22"),
    address: [
      {
        _id: "642b9b9d5dcf2bb9d2ba1818",
        formattedAddress: "22 Green St, Suburbia, NSW 2123",
        streetNumber: 22,
        street: "Green St",
        suburb: "Suburbia",
        postCode: "2123",
        isCurrent: true,
      },
    ],
  },
]);
```

Or even removing an entire branch of a document:

```
update("642b9acd622874d7eb28fb48", "associates", []);
```

## Problem

An application is currently using an object database to store a collection of clients, where each client has a
unique \_id and can be represented via the following ClientSchema:

```
export type AddressSchema = {
  _id: string;
  formattedAddress?: string;
  streetNumber?: number;
  street?: string;
  suburb?: string;
  state?: string;
  postCode?: string;
  isCurrent?: boolean;
};

export type BusinessDetails = {
  _id: string;
  name?: string;
  abn?: string;
};

export type ClientSchema = {
  _id: string;
  name?: string;
  dateOfBirth?: Date;
  businessDetails?: BusinessDetails;
  address?: AddressSchema[];
  associates?: ClientSchema[];
};
```

The client objects using this schema are currently stored within a document database, which is currently implementing the insert and update functions as follows:

```
const insert = async (client: ClientSchema): Promise<void> => {
  await db.collection("clients").insertone(client);
};

const update = async (
  _id: string,
  path: string,
  newValue: any
): Promise<void> => {
  await db.collection("clients").updateOne(
    { _id: _id },
    {
      $set: { [path]: newValue },
    }
  );
};
```

Keeping the same interfaces for insert and update, we would like to replace the implementation of the insert and update to store and update a ClientSchema object an SQL database (see attached SampleOperations.ts).

- Q1. Write a set of CREATE TABLE statement(s) capable of storing the ClientSchema listed above within an SQL database.
- Q2. Using typescript, write an implementation for insert(object) that takes an insert operation on an object representable by ClientSchema and store it in an SQL database within the table you defined in Q1.
- Q3. Using typescript, write an implementation for update(\_id, path, newValue) that translates the update operation into a set of SQL operations and applies them to the your representation of an object of type ClientSchema that has been stored in an SQL database using the tables you defined in Q1.

### Additional Note

Consider how well your solution will scale, given that in a relational database and the storage
space in a table is not immediately reclaimed when a row is deleted. Additionally consider the cost of each SQL
operation and how you can minimize the number of operations required to perform an update.
