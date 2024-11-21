package moodtunes.services;

import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;
import moodtunes.models.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
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
        Firestore db = FirestoreClient.getFirestore();
        return db.collection("Users")
                .document(username)
                .get()
                .get()
                .toObject(User.class);
    }

    // Update an existing user by username
    public String updateUser(String username, User user) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        db.collection("Users").document(username).set(user).get();
        return "User updated successfully";
    }

    // Delete a user by username
    public String deleteUser(String username) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        db.collection("Users").document(username).delete().get();
        return "User deleted successfully";
    }

    // Retrieve a user by email
    public User getUserByEmail(String email) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        QuerySnapshot querySnapshot = db.collection("Users")
                .whereEqualTo("email", email)
                .get()
                .get();

        if (!querySnapshot.isEmpty()) {
            return querySnapshot.getDocuments().get(0).toObject(User.class);
        }
        return null;
    }

    // Retrieve a list of all users
    public List<User> getAllUsers() throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        QuerySnapshot querySnapshot = db.collection("Users").get().get();

        List<User> users = new ArrayList<>();
        for (QueryDocumentSnapshot document : querySnapshot.getDocuments()) {
            users.add(document.toObject(User.class));
        }
        return users;
    }

    // Batch delete users by usernames
    public void deleteUsers(List<String> usernames) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        for (String username : usernames) {
            db.collection("Users").document(username).delete().get();
        }
    }

    // Partially update specific attributes of a user by username
    public String updateUserAttributes(String username, Map<String, Object> updates) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        db.collection("Users").document(username).update(updates).get();
        return "User attributes updated successfully";
    }
}
