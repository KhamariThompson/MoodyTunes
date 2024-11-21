package moodtunes.services;

import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;
import moodtunes.models.Mood;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class MoodService {

    // Create a new mood
    public String createMood(Mood mood) {
        try {
            Firestore db = FirestoreClient.getFirestore();
            String moodId = db.collection("Moods").document().getId();  // Auto-generate ID
            mood.setId(moodId);  // Assuming Mood model has an 'id' field
            db.collection("Moods").document(moodId).set(mood).get();
            return "Mood created successfully";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error creating mood: " + e.getMessage();
        }
    }

    // Retrieve a mood by ID
    public Mood getMood(String moodId) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        return db.collection("Moods")
                .document(moodId)
                .get()
                .get()
                .toObject(Mood.class);
    }

    // Update an existing mood by ID
    public String updateMood(String moodId, Mood mood) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        db.collection("Moods").document(moodId).set(mood).get();
        return "Mood updated successfully";
    }

    // Delete a mood by ID
    public String deleteMood(String moodId) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        db.collection("Moods").document(moodId).delete().get();
        return "Mood deleted successfully";
    }

    // List all moods
    public List<Mood> getAllMoods() throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        QuerySnapshot querySnapshot = db.collection("Moods").get().get();

        List<Mood> moods = new ArrayList<>();
        for (QueryDocumentSnapshot document : querySnapshot.getDocuments()) {
            moods.add(document.toObject(Mood.class));
        }
        return moods;
    }
}
