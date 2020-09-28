const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();

// //connect with the database using string URL and create a collection mytasks and return
async function loadTasksCollection() {
  const client = await mongodb.MongoClient.connect(
    'mongodb+srv://vathana:1234@cluster0.11cjz.mongodb.net/my_tasklist?retryWrites=true&w=majority',
    { useUnifiedTopology: true },
    {
      useNewUrlParser: true
    }
  );
    return client.db('my_tasklist').collection('mytasks');
}

//read the mytasks collection
router.get('/', async (req, res) => {
    const posts = await loadTasksCollection();
    res.send(await posts.find({}).toArray());
  });


// //inserts a new task to the mytasks collection
router.post('/', async (req, res) => {
  const posts = await loadTasksCollection();
  await posts.insertOne({
      text: req.body.text,
      createdAt: new Date()
  });
  res.status(201).send();
});
//delete an existing task from the mytasks collection
router.delete('/:id', async (req, res) => {
    const mytasks = await loadTasksCollection();
    await mytasks.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
    res.status(200).send({});
  });

module.exports = router;