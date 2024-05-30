package usj.master.bd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usj.master.bd.entity.Movie;
@Service
public class MovieService {

	 private final MovieRepository movieRepository;

	
	 
	    @Autowired
	    public MovieService(MovieRepository movieRepository) {
	        this.movieRepository = movieRepository;
	    }

	    public List<Movie> getAllMovies() {	
	        return movieRepository.findAll();
	    }
	
	
}
