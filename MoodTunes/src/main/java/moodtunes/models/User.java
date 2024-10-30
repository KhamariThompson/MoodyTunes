package moodtunes.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.util.Date;
import java.util.List;

public class User {
    private String username;
    private String email;
    private List<String> favoriteMoods;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ssX")
    private Date createdAt;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ssX")
    private Date updatedAt;

    public User() {} // No-arg constructor

    public User(String username, String email, List<String> favoriteMoods, Date createdAt, Date updatedAt) {
        this.username = username;
        this.email = email;
        this.favoriteMoods = favoriteMoods;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Getters and Setters
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public List<String> getFavoriteMoods() { return favoriteMoods; }
    public void setFavoriteMoods(List<String> favoriteMoods) { this.favoriteMoods = favoriteMoods; }

    public Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }

    public Date getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Date updatedAt) { this.updatedAt = updatedAt; }
}
