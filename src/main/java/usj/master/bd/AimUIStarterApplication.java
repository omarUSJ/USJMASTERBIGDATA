package usj.master.bd;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Controller;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
@EnableAsync
@Controller
public class AimUIStarterApplication extends SpringBootServletInitializer{

	public static void main(String[] args) {
		SpringApplication.run(AimUIStarterApplication.class, args);
	}
	@Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
       return builder.sources(AimUIStarterApplication.class);
    }
}

