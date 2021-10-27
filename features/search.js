const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

//-------------------BOOK QUERIES----------------------
const getBooks = (req, res) => {
    if (req.params.page > 1)
    {
        var offsetVar = (req.params.page - 1) * req.params.perPage;
    }
    else
    {
        var offsetVar = 0;
    }
    pool.query(`SELECT * FROM book LIMIT ${req.params.perPage} OFFSET offsetVar`, (err, result) => 
    {
      if(!err)
      {
        res.status(200).json(result.rows[0]);
  
        res.end;
      }
    });
    pool.end;
  } 

const getBooksByGenre = (req, res) => {
  pool.query(`SELECT * FROM book WHERE genre=${req.params.genre}`, (err, result) => 
  {
    if(!err)
    {
      res.status(200).json(result.rows[0]);

      res.end;
    }
  });
  pool.end;
} 

const getBooksTopSellers = (req, res) => {
    pool.query(`SELECT * FROM book ORDER BY copies_sold LIMIT ${req.params.limit}`, (err, result) => 
    {
      if(!err)
      {
        res.status(200).json(result.rows[0]);
  
        res.end;
      }
    });
    pool.end;
} 

const getBooksAboveRating = (req, res) => {
    pool.query(`SELECT DISTINCT book.book_id, title, genre, author_name, price, ROUND(AVG(star_rating), 1) as rating
                FROM book, author, book_author, reviews                                            
                WHERE book.book_id = book_author.book_id AND author.author_id = book_author.author_id AND reviews.book_id = book.book_id
                GROUP BY book.book_id, author_name, star_rating, review_id
                HAVING AVG(star_rating) > ${req.params.rating}
                ORDER BY rating DESC`, (err, result) => 
    {
      if(!err)
      {
        res.status(200).json(result.rows[0]);
  
        res.end;
      }
    });
    pool.end;
} 

module.exports = {
    getBooks,
    getBooksByGenre,
    getBooksTopSellers,
    getBooksAboveRating,
  } 