package usj.master.bd.service;

import org.springframework.data.mongodb.repository.MongoRepository;

import usj.master.bd.entity.Movie;

public interface MovieRepository extends MongoRepository<Movie, String>{


	
}
