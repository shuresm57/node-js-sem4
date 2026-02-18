require('dotenv').config();

const express = require('express');
const app = express();
const { encryptId, decryptId } = require('./encryption');

app.use(express.json());


const movies = [
  { id: 1, title: 'Garlic is as good as ten mothers', description: 'In a world, where garlic is a good as ten mothers' },
  { id: 2, title: 'Microsocopic Subway to Oblivion', description: 'In a world, where microscopic subway to oblivion'}
];

app.get('/movies', (req, res) => {
  console.log('Fetching all movie ressources');

  // we do not use res.json, ever
  const encryptedMovies = movies.map(movie => ({
    ...movie,
    id: encryptId(movie.id)
  }));

  res.send({ data: encryptedMovies});
});

app.get('/movies/:id', (req, res) => {
  const providedMovieId = Number(decryptId(req.params.id));
  const foundMovie = movies.find((movie) => movie.id === providedMovieId);

  if (!foundMovie) {
    return res.status(404).send({ errorMessage: `No movie found with id ${req.params.id}` });
  } 
  
  res.send({ data: { ...foundMovie, id: encryptId(foundMovie.id) }
  });
});

app.post('/movies', (req, res) => {
  if (!req.body.title){
    return res.status(400).send({ errorMessage: 'ID, name and description is required for movie resources' });
  }
  // if movies are 0 entries, return 1, else map through and find the highest id + 1
  const newId = movies.length > 0 ? Math.max(...movies.map(movie => movie.id)) + 1 : 1;
  const movie = { id: newId, title: req.body.title, description: req.body.description };
  movies.push(movie);

  res.status(201).send({ data: {...movie, id: encryptId(movie.id)} });
});

app.patch('/movies/:id', (req, res) => {
  const movie = movies.find((movie) => movie.id === Number(decryptId(req.params.id)));
  
  if (!movie) {
    return res.status(404).send({ errorMessage: `No movie found with id ${req.params.id}` });
  } 

  if (req.body.title) movie.title = req.body.title;
  if (req.body.description) movie.description = req.body.description;
  
  res.send({ data: {...movie, id: encryptId(movie.id)} });
});


app.put('/movies/:id', (req, res) => {  
  const movieIndex = movies.findIndex((movie) => movie.id === Number(decryptId(req.params.id)));
  
  if (movieIndex === -1) {
    return res.status(404).send({ errorMessage: `No movie found with id ${req.params.id}` });
  }
  if (!req.body.title) {
    return res.status(400).send({ errorMessage: 'ID and title are required' });
  } 

  movies[movieIndex] = { id: Number(decryptId(req.params.id)), title: req.body.title, description: req.body.description };
  res.send({ data: {...movies[movieIndex], id: encryptId(movies[movieIndex].id)} });
});

app.delete('/movies/:id', (req,res) => {
  const providedMovieId = Number(decryptId(req.params.id));
  const movieIndex = movies.findIndex((movie) => movie.id === providedMovieId);

  if (movieIndex === -1) {
    return res.status(404).send({ errorMessage: `No movie found with id ${req.params.id}` });
  }

  const deletedMovie = movies.splice(movieIndex, 1)[0];
  res.send(`"${deletedMovie.title}" has been deleted`);
});

app.listen(8080);
