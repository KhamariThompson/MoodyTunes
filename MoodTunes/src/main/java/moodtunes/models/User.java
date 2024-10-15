package moodtunes.models;

import java.util.List;

public class User {
    private String username;
    private String email;
    private List<String> favoriteMoods;
    private String createdAt;
    private String updatedAt;

    public User() {} // No-arg constructor

    public User(String username, String email, List<String> favoriteMoods, String createdAt, String updatedAt) {
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

    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }

    public String getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(String updatedAt) { this.updatedAt = updatedAt; }
}
