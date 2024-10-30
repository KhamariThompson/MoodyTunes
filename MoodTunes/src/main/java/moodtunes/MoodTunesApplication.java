package moodtunes;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
//@ComponentScan(basePackages = "moodtunes")
public class MoodTunesApplication {
	public static void main(String[] args) {
		SpringApplication.run(MoodTunesApplication.class, args);
	}
}