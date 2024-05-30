package com.quantech.aimui.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quantech.aimui.entity.Movie;
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
