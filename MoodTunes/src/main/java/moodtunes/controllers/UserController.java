package moodtunes.controllers;

import moodtunes.models.User;
import moodtunes.services.FirebaseTestService;  // Make sure this import is correct
import moodtunes.services.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.ExecutionException;

@RestController
public class UserController {

    private final UserService userService;
    private final FirebaseTestService firebaseTestService;

    // Constructor with both services injected
    public UserController(UserService userService, FirebaseTestService firebaseTestService) {
        this.userService = userService;
        this.firebaseTestService = firebaseTestService;
    }

    // Endpoint to test Firebase connection
    @GetMapping("/test")
    public String testFirebase() {
        return firebaseTestService.testFirestoreConnection();
    }

    // Endpoint to get user by username
    @GetMapping("/users/{username}")
    public User getUser(@PathVariable String username) throws ExecutionException, InterruptedException {
        return userService.getUser(username);
    }
}
