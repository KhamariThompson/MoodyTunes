package moodtunes.models;

public class Mood {
    private String name;
    private String description;
    private String createdAt;

    public Mood() {} // No-arg constructor

    public Mood(String name, String description, String createdAt) {
        this.name = name;
        this.description = description;
        this.createdAt = createdAt;
    }

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }

    public void setId(String moodId) {
        
    }
}
