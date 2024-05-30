package usj.master.bd.service;
import org.apache.kafka.clients.consumer.ConsumerRecord; 
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import usj.master.bd.entity.RatingDTO;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Random;

@Service
public class FileWriterService {
	private static final String FILE_PATH = "C:\\Users\\Omar\\Desktop\\omar\\ratings.csv";
	  
	//private static final String FILE_PATH = "ratings.csv";  
	
    @KafkaListener(topics = "ratings_topic", groupId = "rating_group")
    public void consume(ConsumerRecord<String, RatingDTO> record) {
        RatingDTO rating = record.value();
        writeRatingToFile(rating);
    }

    private synchronized void writeRatingToFile(RatingDTO rating) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(FILE_PATH, true))) {
        	        
        	 File file = new File(FILE_PATH);
             if (file.length() == 0) {
                 writer.write("userId,movieId,rating\n");
             }
        	
            String line = String.format("%s,%s,%d\n",rating.getUserId(), rating.getMovieId(), rating.getRating());
           
            writer.write(line);
          
        } catch (IOException e) {
        	
            e.printStackTrace();
        }
    }
}
