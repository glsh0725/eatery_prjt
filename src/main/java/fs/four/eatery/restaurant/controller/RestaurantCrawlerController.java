package fs.four.eatery.restaurant.controller;

import fs.four.eatery.restaurant.crawler.RestaurantCrawler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RestaurantCrawlerController {

    @Autowired
    private RestaurantCrawler restaurantCrawler;

    @GetMapping("/run-crawler")
    public String runCrawler() {
        try {
            restaurantCrawler.run();
            return "크롤러 실행 완료!";
        } catch (Exception e) {
            e.printStackTrace();
            return "크롤러 실행 중 오류 발생: " + e.getMessage();
        }
    }
}