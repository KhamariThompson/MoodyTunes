package moodtunes.services;

import org.springframework.stereotype.Service;

@Service
public class FirebaseTestService {

    public String testFirestoreConnection() {
        // Example Firebase connection logic
        return "Connected to Firestore: true";
    }
}
