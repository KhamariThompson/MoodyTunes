package moodtunes.services;

import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import moodtunes.models.User;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Service
public class UserService {

    public User getUser(String username) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();  // Get Firestore instance

        // Fetch the user document from the "Users" collection
        return db.collection("Users")
                .document(username)
                .get()
                .get()
                .toObject(User.class);
    }
}
