package com.quantech.aimui.service;

import org.springframework.data.mongodb.repository.MongoRepository;


import com.quantech.aimui.entity.Movie;

public interface MovieRepository extends MongoRepository<Movie, String>{


	
}
