<!-- echo "# react-firebaee-trello-clone" >> README.md
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/abdrr97/react-firebaee-trello-clone.git
git push -u origin main -->

<!-- …or push an existing repository from the command line -->

<!-- git remote add origin https://github.com/abdrr97/react-githubuser-fav-project.git
git branch -M main
git push -u origin main -->

```js
// Add data - C
firestore.collection('CollectionName').add({
  key: value,
  key: value,
})

// Getting data - R
firestore.collection('CollectionName').onSnapshot((snapshot) => {
  snapshot.docs.map((doc) => {
    console.log(doc)
  })
})

// If you require a search query
firestore.collection('CollectionName').where('key', '==', 'value').get()

// Update data - U
firestore.collection('CollectionName').doc(ID).update({
  key: newValue,
})

// Deleting data - D
firestore.collection('CollectionName').doc(ID).delete()
// get a single doc from a collection

let docRef = db.collection('cities').doc('SF')

docRef
  .get()
  .then(function (doc) {
    if (doc.exists) {
      console.log('Document data:', doc.data())
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!')
    }
  })
  .catch(function (error) {
    console.log('Error getting document:', error)
  })
```
