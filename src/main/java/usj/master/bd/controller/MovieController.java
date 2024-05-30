package usj.master.bd.controller;

import java.io.IOException;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import usj.master.bd.entity.Movie;
import usj.master.bd.service.MovieRepository;
import usj.master.bd.service.RatingService;


@Controller
public class MovieController {

	@Autowired
	private RedisTemplate<String, String> redisTemplate;
	@Autowired  	
	private MovieRepository movieRepository;
    @Autowired
    private RatingService ratingService;
	   
	    public MovieController( MovieRepository movieRepository) {
	        this.movieRepository = movieRepository;
	    }

	    @GetMapping("/movies")
	    public String getMovies(Model model) {
	        List<Movie> movies = movieRepository.findAll();
	        model.addAttribute("movies", movies);
	        return "movies";
	    }

	    @PostMapping("/movies/rate")
	    public String rateMovie(@RequestParam("movieId") String movieId, @RequestParam("rating") int rating) {
	    	
	    	Random random = new Random();
            int randomNumber = random.nextInt(10) + 1; // Generates a number between 1 and 10
        	
	    	ratingService.sendRating(String.valueOf(randomNumber) , movieId, rating);
	    	try {
				getRecommendations();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	    	
	    	return "redirect:/movies";
	    }

	    @GetMapping("/movies/recommendations")
	    @ResponseBody
	    public String getRecommendations() throws IOException {
	    	// Check if recommendations exist in Redis cache
	    	
	    	System.out.println("start with redis ");
	        String recommendations = redisTemplate.opsForValue().get("recommendations");
	        System.out.println("redis...");
	        if (recommendations != null) {
	            System.out.println("Fetching recommendations from Redis cache... : "+ recommendations);
	            return recommendations;
	        }

	        // If recommendations not found in Redis cache, compute recommendations
	        System.out.println("Generating recommendations...");
	        
	    	System.out.println("Calling python...");
	        String url = "http://127.0.0.1:8000/recommendations";
	        RestTemplate restTemplate = new RestTemplate();
	        String response = restTemplate.getForObject(url, String.class);
	        
	        System.out.println("response: "+response);
	        
	        // Store recommendations in Redis cache
	        redisTemplate.opsForValue().set("recommendations", response);
	        
	        return response;
	    }
	    
	/*    @GetMapping("/movies/recommendations")
	    @ResponseBody
	    public String getRecommendations() throws IOException {
	       
	    	System.out.println("going to python");
	    	
	        String pythonExecutable = "C:\\Users\\Omar\\AppData\\Local\\Programs\\Python\\Python312\\python.exe";
	        String pythonScriptPath = "C:\\Users\\Omar\\Desktop\\omar\\main.py";
	        ProcessBuilder processBuilder = new ProcessBuilder(pythonExecutable, pythonScriptPath);
	       
	        Process process = processBuilder.start();
	       
	        BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
	        StringBuilder jsonBuilder = new StringBuilder();
	        String line;
	        while ((line = reader.readLine()) != null) {
	            	if (line.startsWith("[")) {
	                jsonBuilder.append(line);
	            }
	        }

	        // Parse the JSON string returned by Python
	        String recommendationsJson = jsonBuilder.toString();
	       
	        JSONArray jsonArray = new JSONArray(recommendationsJson);

	        // Process the JSON array
	        List<JSONObject> recommendations = new ArrayList<>();
	        for (int i = 0; i < jsonArray.length(); i++) {
	            recommendations.add(jsonArray.getJSONObject(i));
	        }

	        // You can process recommendations further here
	        System.out.println("Recommendations received from Python: " + recommendations);
	        
	        return "null";
	    } */
}
