package usj.master.bd.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import usj.master.bd.entity.RatingDTO;

@Service
public class RatingService {
	 	private static final String TOPIC = "ratings_topic";

	    @Autowired
	    private KafkaTemplate<String, RatingDTO> kafkaTemplate;


	    
	    public void sendRating(String userId, String movieId, int rating) {
	        RatingDTO ratingDTO = new RatingDTO(userId, movieId, rating);
	        kafkaTemplate.send(TOPIC, ratingDTO);
	    }
	    
	 
}
