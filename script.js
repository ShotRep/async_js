//The issue. Func getPosts finishes before func createPost can.
// const posts = [
//   {title: 'Post one', body: 'This is the first post' },
//   {title: 'Post two', body: 'This is the second post'}
// ]

// function getPosts() {
//   //using setTimeout to mimic the server delay time 
//   setTimeout(() => {
//     let output = ''
//     posts.forEach((post,index) => {
//      output += `<li>${post.title}</li>` 
//     })
//     document.body.innerHTML = output
//   },1500)
// }

// function createPost(post){
//   setTimeout(() => {
//     posts.push(post)
//   },2000)
// }

// getPosts()
// createPost({title: 'Post three', body: 'This is the third post'})

////////////////////////lets make above work with callbacks\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// const posts = [
//   {title: "Post one", body: "This is the first post"},
//   {title: "Post two", body: "This is the second post"},
// ]

// function getPosts() {
//   //using setTimeout to mimic the server delay time
//   setTimeout(() => {
//     let output = ""
//     posts.forEach((post, index) => {
//       output += `<li>${post.title}</li>`
//     })
//     document.body.innerHTML = output
//   }, 1500)
// }

// function createPost(post, callback) {
//   setTimeout(() => {
//     posts.push(post)
//     callback()
//   }, 2000)
// }

// // getPosts()
// createPost({ title: "Post three", body: "This is the third post" }, getPosts)

/////////////////////////////////////////PROMISES\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
/////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//BT notes that most libraries create the promises for you, we need to resolve them.
const posts = [
  {title: "Post one", body: "This is the first post"},
  {title: "Post two", body: "This is the second post"},
]

function getPosts() {
  //using setTimeout to mimic the server delay time
  setTimeout(() => {
    let output = ""
    posts.forEach((post, index) => {
      output += `<li>${post.title}</li>`
    })
    document.body.innerHTML = output
  }, 1500)
}

function createPost(post) {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
        posts.push(post)
        const error = false  //error checking - true or false
        if (!error) {
          resolve()
        } else {
          reject('Error occurred')
        }
      }, 2000)
  })
}

createPost({title: 'Post three', body:'This is the third post'})
  .then(getPosts)
  .catch(err => console.log(err))

///////////////////////////////////////ASYNC/AWAIT\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
///////////////////////An elegant way to handle responses\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
async function init() {
  await createPost({ title: 'Post Async/Await', body: 'This is a post' })
  getPosts()
}
init()

////////////////////////////////////Async / Await / Fetch\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
async function fetchUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users")
  const data = await res.json()
  console.log(data)
}
fetchUsers()

//////////////////////////////////////ALL\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  ///////////Since we mostly need to resolve we can just use the ALL 
const promise1 = Promise.resolve('Hello World')
const promise2 = 10
const promise3 = new Promise((resolve, reject) =>
  setTimeout(resolve, 2000, 'Goodbye'))
const promise4 = fetch("https://jsonplaceholder.typicode.com/users").then(res => res.json())
Promise.all([promise1, promise2, promise3, promise4]).then(values => console.log(values))
  
//https://jsonplaceholder.typicode.com/users

