package moodtunes.controllers;

import moodtunes.models.User;
import moodtunes.models.Mood;
import moodtunes.services.UserService;
import moodtunes.services.MoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final MoodService moodService;

    @Autowired
    public UserController(UserService userService, MoodService moodService) {
        this.userService = userService;
        this.moodService = moodService;
    }

    // CREATE: POST endpoint to create a new user
    @PostMapping
    public ResponseEntity<String> createUser(@RequestBody User user) {
        try {
            String message = userService.createUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(message);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating user");
        }
    }

    // READ: GET endpoint to retrieve a user by username
    @GetMapping("/{username}")
    public ResponseEntity<User> getUser(@PathVariable String username) {
        try {
            User user = userService.getUser(username);
            if (user != null) {
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // UPDATE: PUT endpoint to update an existing user by username
    @PutMapping("/{username}")
    public ResponseEntity<String> updateUser(@PathVariable String username, @RequestBody User user) {
        try {
            String message = userService.updateUser(username, user);
            return ResponseEntity.ok(message);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating user");
        }
    }

    // DELETE: DELETE endpoint to delete a user by username
    @DeleteMapping("/{username}")
    public ResponseEntity<String> deleteUser(@PathVariable String username) {
        try {
            String message = userService.deleteUser(username);
            return ResponseEntity.ok(message);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting user");
        }
    }

    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("UserController is active");
    }

    // SEARCH: GET endpoint to retrieve a user by email
    @GetMapping("/email/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        try {
            User user = userService.getUserByEmail(email);
            if (user != null) {
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // LIST ALL: GET endpoint to retrieve a list of all users
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        try {
            List<User> users = userService.getAllUsers();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // BATCH DELETE: DELETE endpoint to delete multiple users by a list of usernames
    @DeleteMapping
    public ResponseEntity<String> deleteUsers(@RequestBody List<String> usernames) {
        try {
            userService.deleteUsers(usernames);
            return ResponseEntity.ok("Users deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting users");
        }
    }

    // PARTIAL UPDATE: PATCH endpoint to update specific attributes of a user by username
    @PatchMapping("/{username}")
    public ResponseEntity<String> updateUserAttributes(@PathVariable String username, @RequestBody Map<String, Object> updates) {
        try {
            String message = userService.updateUserAttributes(username, updates);
            return ResponseEntity.ok(message);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating user attributes");
        }
    }

    // ------------------------ Moods Endpoints ------------------------

    // CREATE: POST endpoint to create a new mood
    @PostMapping("/moods")
    public ResponseEntity<String> createMood(@RequestBody Mood mood) {
        try {
            String message = moodService.createMood(mood);
            return ResponseEntity.status(HttpStatus.CREATED).body(message);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating mood");
        }
    }

    // READ: GET endpoint to retrieve a mood by ID
    @GetMapping("/moods/{moodId}")
    public ResponseEntity<Mood> getMood(@PathVariable String moodId) {
        try {
            Mood mood = moodService.getMood(moodId);
            if (mood != null) {
                return ResponseEntity.ok(mood);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // UPDATE: PUT endpoint to update an existing mood by ID
    @PutMapping("/moods/{moodId}")
    public ResponseEntity<String> updateMood(@PathVariable String moodId, @RequestBody Mood mood) {
        try {
            String message = moodService.updateMood(moodId, mood);
            return ResponseEntity.ok(message);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating mood");
        }
    }

    // DELETE: DELETE endpoint to delete a mood by ID
    @DeleteMapping("/moods/{moodId}")
    public ResponseEntity<String> deleteMood(@PathVariable String moodId) {
        try {
            String message = moodService.deleteMood(moodId);
            return ResponseEntity.ok(message);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting mood");
        }
    }
}
