package com.quantech.aimui.entity;


import org.springframework.data.annotation.Id;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "moviedb")
public class Movie {

    @Id
    private String id;
    private int movieId;
    private String title;
    private String genre;


    public Movie() {
		super();
	}

	public Movie(int movieId, String title, String genre) {
		super();
		this.movieId = movieId;
		this.title = title;
		this.genre = genre;
	}


	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getGenre() {
		return genre;
	}

	public void setGenre(String genre) {
		this.genre = genre;
	}

	public int getMovieId() {
		return movieId;
	}

	public void setMovieId(int movieId) {
		this.movieId = movieId;
	}

	@Override
	public String toString() {
		return "Movie [movieId=" + movieId + ", title=" + title + ", genre=" + genre + "]";
	}    
}
