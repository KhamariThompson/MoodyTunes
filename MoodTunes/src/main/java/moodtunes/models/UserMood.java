package moodtunes.models;

public class UserMood {
    private String userId;
    private String moodId;
    private String selectedAt;

    public UserMood() {} // No-arg constructor

    public UserMood(String userId, String moodId, String selectedAt) {
        this.userId = userId;
        this.moodId = moodId;
        this.selectedAt = selectedAt;
    }

    // Getters and Setters
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getMoodId() { return moodId; }
    public void setMoodId(String moodId) { this.moodId = moodId; }

    public String getSelectedAt() { return selectedAt; }
    public void setSelectedAt(String selectedAt) { this.selectedAt = selectedAt; }
}
