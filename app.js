const express=require('express')
const path = require('path')
const app=express()


const fs=require('fs')


app.use(express.urlencoded())
app.use(express.static(path.join(__dirname,'public')))

//route for home page
app.get('',(req,resp)=>{
    resp.render('home.ejs')
})
//route for create book
app.get('/create/book',(req,resp)=>{
      resp.render("createBooks.ejs")
})
//post method to take entered details from the browser
app.post('/create/book',(req,resp)=>{
    let status=false
    const bookData=req.body
//reading data from books.json file
    const readData=JSON.parse(fs.readFileSync('books.json'))
    readData.push(bookData)
//writing data to books.json in json format 
    fs.writeFileSync('books.json',JSON.stringify(readData),(error)=>{
        if(error){
            status=true
        }
    })
    if(status!=true){
        resp.send("<h1>Book Data inserted Successfully</h1>")
    }   
})
//route to read books data
app.get('/read/books',(req,resp)=>{
  const readBooksData=JSON.parse(fs.readFileSync('books.json'))

  resp.render('readBooks.ejs',{books:readBooksData})
})
//route to read books data dynamically
app.get('/read/books/:id',(req,resp)=>{
    const enteredBookId=req.params.id

    const readBooksData=JSON.parse(fs.readFileSync('books.json'))

    readBooksData.filter((i)=>{
        if(i.bookid==enteredBookId){
            resp.render('particularBookData.ejs',{bookData:i})
        }
    })
    resp.render('error.ejs')
})

app.listen(3000)