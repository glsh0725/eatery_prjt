package fs.four.eatery.restaurant.crawler;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

public class RestaurantCrawler {

    public static void main(String[] args) {
        Logger seleniumLogger = Logger.getLogger("org.openqa.selenium");
        seleniumLogger.setLevel(Level.OFF);

        // ChromeDriver 경로 설정
        System.setProperty("webdriver.chrome.driver", "drivers/chromedriver.exe");

        // Chrome 옵션 설정
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");
        options.addArguments("--disable-gpu");
        options.setExperimentalOption("excludeSwitches", List.of("enable-logging"));

        // WebDriver 초기화
        WebDriver driver = new ChromeDriver(options);

        try {
            String query = "식당";
            String kakaoMapUrl = "https://map.kakao.com/?q=" + query;

            // 카카오맵 열기
            driver.get(kakaoMapUrl);

            // 요소 로드 대기
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));

            // "장소 더보기" 버튼을 클릭
            WebElement moreButton = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("#info\\.search\\.place\\.more")));
            ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", moreButton);
            Thread.sleep(1000);
            ((JavascriptExecutor) driver).executeScript("arguments[0].click();", moreButton);
            System.out.println("장소 더보기 버튼을 클릭했습니다.");
            Thread.sleep(2000);

            int maxPagesToCrawl = 1; // 최대 크롤링할 페이지 수
            int currentPage = 1;

            while (currentPage <= maxPagesToCrawl) {
                // 장소 아이템 리스트 가져오기
                List<WebElement> placeItems = wait.until(
                        ExpectedConditions.presenceOfAllElementsLocatedBy(By.cssSelector(".placelist .PlaceItem"))
                );

                System.out.println("===== 검색 결과 (페이지 " + currentPage + ") =====");
                for (WebElement place : placeItems) {
                    String name = "이름 없음";
                    String address = "주소 없음";
                    String openingHours = "운영시간 정보 없음";
                    String breakTime = "휴게시간 정보 없음";
                    String offDays = "휴무일 정보 없음";
                    String moreViewLink = "상세보기 링크 없음";

                    name = place.findElement(By.cssSelector(".link_name")).getText();
                    moreViewLink = place.findElement(By.cssSelector(".moreview")).getAttribute("href");

                    if (!moreViewLink.equals("상세보기 링크 없음")) {
                        ((JavascriptExecutor) driver).executeScript("window.open('" + moreViewLink + "', '_blank');");
                        List<String> tabs = List.copyOf(driver.getWindowHandles());
                        driver.switchTo().window(tabs.get(1));

                        address = wait.until(ExpectedConditions.presenceOfElementLocated(
                                By.cssSelector(".txt_address"))).getText();

                        // 운영시간과 휴게시간 처리
                        List<WebElement> operationTimeElements = driver.findElements(By.cssSelector(".list_operation li"));
                        StringBuilder openingHoursBuilder = new StringBuilder();
                        StringBuilder breakTimeBuilder = new StringBuilder();

                        for (WebElement element : operationTimeElements) {
                            String parentText = element.getText();
                            List<WebElement> timeElements = element.findElements(By.cssSelector(".time_operation"));

                            if (!timeElements.isEmpty()) {
                                String timeValue = timeElements.get(0).getText();

                                if (parentText.contains("휴게시간")) {
                                    if (breakTimeBuilder.length() > 0) {
                                        breakTimeBuilder.append("");
                                    }
                                    breakTimeBuilder.append(timeValue);
                                } else {
                                    if (openingHoursBuilder.length() > 0) {
                                        openingHoursBuilder.append("");
                                    }
                                    openingHoursBuilder.append(timeValue);
                                }
                            }
                        }

                        openingHours = openingHoursBuilder.length() > 0 ? openingHoursBuilder.toString() : "운영시간 정보 없음";
                        breakTime = breakTimeBuilder.length() > 0 ? breakTimeBuilder.toString() : "휴게시간 정보 없음";

                        // 휴무일 데이터 파싱
                        List<WebElement> moreButtonForOffDaysList = driver.findElements(By.cssSelector(".list_operation .btn_more"));

                        // 더보기 버튼이 존재하고 표시되는 경우에만 클릭
                        if (!moreButtonForOffDaysList.isEmpty() && moreButtonForOffDaysList.get(0).isDisplayed()) {
                            WebElement moreButtonForOffDays = moreButtonForOffDaysList.get(0);
                            ((JavascriptExecutor) driver).executeScript("arguments[0].click();", moreButtonForOffDays);
                        }

                        // 휴무일 데이터를 가져오기
                        List<WebElement> offDayElements = driver.findElements(By.cssSelector(".displayOffdayList .list_operation li"));
                        if (!offDayElements.isEmpty()) {
                            StringBuilder offDaysBuilder = new StringBuilder();
                            for (WebElement element : offDayElements) {
                                if (offDaysBuilder.length() > 0) {
                                    offDaysBuilder.append(", ");
                                }
                                offDaysBuilder.append(element.getText());
                            }
                            offDays = offDaysBuilder.toString();
                        } else {
                            offDays = "휴무일 정보 없음";
                        }

                        driver.close();
                        driver.switchTo().window(tabs.get(0));
                    }

                    System.out.println("식당 이름: " + name);
                    System.out.println("주소: " + address);
                    System.out.println("운영시간: " + openingHours);
                    System.out.println("휴게시간: " + breakTime);
                    System.out.println("휴무일: " + offDays);
                    System.out.println("---------------------------");
                }

                if (currentPage < maxPagesToCrawl) {
                    // dimmedLayer 제거 처리
                    List<WebElement> dimmedLayers = driver.findElements(By.cssSelector("#dimmedLayer"));
                    if (!dimmedLayers.isEmpty() && dimmedLayers.get(0).isDisplayed()) {
                        ((JavascriptExecutor) driver).executeScript("arguments[0].style.display='none';", dimmedLayers.get(0));
                    }

                    // 페이지 전환 처리
                    if (currentPage % 5 == 0) {
                        WebElement nextButton = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("#info\\.search\\.page\\.next")));
                        ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", nextButton);
                        nextButton.click();
                        Thread.sleep(2000);
                    } else {
                        String pageSelector = "#info\\.search\\.page\\.no" + ((currentPage % 5) + 1);
                        WebElement pageButton = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector(pageSelector)));
                        ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", pageButton);
                        pageButton.click();
                        Thread.sleep(2000);
                    }
                }

                currentPage++;
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}