package usj.master.bd.entity;

public class RatingDTO {
	 	
		private String userId;
	    private String movieId;
	    private int rating;
	
	    public RatingDTO(
	    		String userId,
	    		 String movieId, int rating) {
			super();
			this.userId = userId;
			this.movieId = movieId;
			this.rating = rating;
		}
		public RatingDTO() {
			super();
		}
		public String getUserId() {
			return userId;
		}
		public void setUserId(String userId) {
			this.userId = userId;
		}
		public String getMovieId() {
			return movieId;
		}
		public void setMovieId(String movieId) {
			this.movieId = movieId;
		}
		public int getRating() {
			return rating;
		}
		public void setRating(int rating) {
			this.rating = rating;
		}
		@Override
		public String toString() {
			return "RatingDTO [ movieId=" + movieId + ", rating=" + rating + "]";
		}
	
	    
}
