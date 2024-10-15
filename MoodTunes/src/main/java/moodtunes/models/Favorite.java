package moodtunes.models;

public class Favorite {
    private String userId;
    private String itemId;
    private String itemType;
    private String addedAt;

    public Favorite() {} // No-arg constructor

    public Favorite(String userId, String itemId, String itemType, String addedAt) {
        this.userId = userId;
        this.itemId = itemId;
        this.itemType = itemType;
        this.addedAt = addedAt;
    }

    // Getters and Setters
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getItemId() { return itemId; }
    public void setItemId(String itemId) { this.itemId = itemId; }

    public String getItemType() { return itemType; }
    public void setItemType(String itemType) { this.itemType = itemType; }

    public String getAddedAt() { return addedAt; }
    public void setAddedAt(String addedAt) { this.addedAt = addedAt; }
}
