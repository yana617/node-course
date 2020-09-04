# mongodb

If you're not using Mongoose library - you can use mongodb queries

## Install

```bash
npm i mongodb
```

## Connection

```javascript
const { MongoClient } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, (error, client) => {
  if (error) {
    return console.log('[ERROR] Unable to connect to database');
  }

  console.log('[INFO DB] Connected to database');
  const db = client.db(databaseName);
});
```

&nbsp;

### Create

- **.insertOne()**
- **.insertMany()**

#### Example

```javascript
db.collection('users')
  .insertOne({
    name: 'Yana',
    age: 21,
  })
  .then((result) => {
    console.log(result.insertedCount);
  })
  .catch((error) => {
    console.log('error!', error)
  });
```

&nbsp;

### Read

- **.findOne()**
- **.find()**

#### Example for read

```javascript
db.collection('users')
  .find()
  .toArray() // cursor -> js array
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log('error!', error)
  });
```

&nbsp;

### Update

- **.updateOne()**
- **.updateMany()**

#### Example for update

```javascript
db.collection('users')
  .updateOne({
    name: 'Yana',
  }, {
    $set: { // !
      name: 'Not Yana',
    }
  })
  .then((result) => {
    console.log(result.modifiedCount);
  })
  .catch((error) => {
    console.log('error!', error)
  });
```

&nbsp;

### Delete

- **.deleteOne()**
- **.deleteMany()**

#### Example for delete

```javascript
db.collection('users')
  .deleteMany({
    age: 21,
  })
  .then((result) => {
    console.log(result.deletedCount);
  })
  .catch((error) => {
    console.log('error!', error)
  });
```
