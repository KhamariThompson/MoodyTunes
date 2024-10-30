package moodtunes.services;

import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.FirestoreException;
import com.google.firebase.cloud.FirestoreClient;
import moodtunes.models.User;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Service
public class UserService {

    // Create a new user
    public String createUser(User user) {
        try {
            Firestore db = FirestoreClient.getFirestore();
            db.collection("Users").document(user.getUsername()).set(user).get();
            return "User created successfully";
        } catch (Exception e) {
            e.printStackTrace();  // Logs the full stack trace of the error
            return "Error creating user: " + e.getMessage();
        }
    }



    // Read (retrieve) a user by username
    public User getUser(String username) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();  // Get Firestore instance

        // Fetch the user document from the "Users" collection
        return db.collection("Users")
                .document(username)
                .get()
                .get()
                .toObject(User.class);
    }

    // Update an existing user by username
    public String updateUser(String username, User user) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();  // Get Firestore instance

        // Set the document with the new user data, which will overwrite the existing document
        db.collection("Users").document(username).set(user).get();

        return "User updated successfully";
    }

    // Delete a user by username
    public String deleteUser(String username) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();  // Get Firestore instance

        // Delete the document in the "Users" collection with the given username
        db.collection("Users").document(username).delete().get();

        return "User deleted successfully";
    }
}
