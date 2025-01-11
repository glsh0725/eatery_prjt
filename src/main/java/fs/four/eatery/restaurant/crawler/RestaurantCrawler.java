package fs.four.eatery.restaurant.crawler;

import fs.four.eatery.restaurant.dao.RestaurantDAO;
import fs.four.eatery.restaurant.vo.RestaurantVO;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.net.URL;
import java.time.Duration;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@Component
public class RestaurantCrawler {

    @Autowired
    private RestaurantDAO restaurantDAO;

    private static int photoCounter = 2701;

    public void run() {
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
            String query = "대구 식당";
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

            int maxPagesToCrawl = 30; // 최대 크롤링할 페이지 수
            int currentPage = 1;

            while (currentPage <= maxPagesToCrawl) {
                // 장소 아이템 리스트 가져오기
                List<WebElement> placeItems = wait.until(
                        ExpectedConditions.presenceOfAllElementsLocatedBy(By.cssSelector(".placelist .PlaceItem"))
                );

                System.out.println("===== 검색 결과 (페이지 " + currentPage + ") =====");
                for (WebElement place : placeItems) {
                    String name = "이름";
                    String address = "주소";
                    String oldAddress = "지번";
                    String category = "카테고리";
                    String phoneNumber = "전화번호";
                    String homepage = "홈페이지";
                    String parkingInfo = "주차";
                    String openTime = "영업시간";
                    String breakTime = "휴게시간";
                    String offDays = "휴무일";
                    String tags = "태그";
                    String photoName = "이미지명";
                    String moreViewLink = "상세보기 링크";

                    name = place.findElement(By.cssSelector(".link_name")).getText();
                    moreViewLink = place.findElement(By.cssSelector(".moreview")).getAttribute("href");

                    if (!moreViewLink.equals("상세보기 링크 없음")) {
                        ((JavascriptExecutor) driver).executeScript("window.open('" + moreViewLink + "', '_blank');");
                        List<String> tabs = List.copyOf(driver.getWindowHandles());
                        driver.switchTo().window(tabs.get(1));

                        address = wait.until(ExpectedConditions.presenceOfElementLocated(
                                By.cssSelector(".txt_address"))).getText();

                        // 지번 가져오기
                        try {
                            WebElement oldAddressElement = driver.findElement(By.cssSelector(".txt_addrnum"));
                            oldAddress = oldAddressElement.getText().replace("지번", "").trim();
                        } catch (Exception e) {
                            oldAddress = "지번 정보 없음";
                        }

                        // 카테고리 가져오기
                        try {
                            WebElement categoryElement = driver.findElement(By.cssSelector(".location_evaluation .txt_location"));
                            category = categoryElement.getText().replace("분류: ", "").trim();
                        } catch (Exception e) {
                            category = "카테고리 정보 없음";
                        }

                        // 전화번호 가져오기
                        try {
                            WebElement phoneElement = driver.findElement(By.cssSelector(".num_contact .txt_contact"));
                            phoneNumber = phoneElement.getText();
                        } catch (Exception e) {
                            phoneNumber = "전화번호 정보 없음";
                        }

                        // 홈페이지 가져오기
                        try {
                            WebElement homepageElement = driver.findElement(By.cssSelector(".location_present .link_homepage"));
                            homepage = homepageElement.getText();
                        } catch (Exception e) {
                            homepage = "홈페이지 정보 없음";
                        }

                        // 태그 가져오기
                        try {
                            List<WebElement> tagElements = driver.findElements(By.cssSelector(".tag_g .link_tag"));
                            StringBuilder tagsBuilder = new StringBuilder();
                            for (WebElement tag : tagElements) {
                                if (tagsBuilder.length() > 0) {
                                    tagsBuilder.append(", ");
                                }
                                tagsBuilder.append(tag.getText().replace("#", ""));
                            }
                            tags = tagsBuilder.length() > 0 ? tagsBuilder.toString() : "";
                        } catch (Exception e) {
                            tags = "";
                        }

                        // 주차 정보 가져오기
                        try {
                            List<WebElement> facilityElements = driver.findElements(By.cssSelector(".list_facility li"));
                            if (facilityElements.isEmpty()) {
                                parkingInfo = "주차 정보 없음";
                            } else {
                                boolean parkingAvailable = false;
                                for (WebElement facility : facilityElements) {
                                    if (facility.getText().contains("주차")) {
                                        parkingAvailable = true;
                                        break;
                                    }
                                }
                                parkingInfo = parkingAvailable ? "주차 가능" : "주차 불가";
                            }
                        } catch (Exception e) {
                            parkingInfo = "주차 정보 없음";
                        }

                        // 영업시간과 휴게시간 처리
                        List<WebElement> operationTimeElements = driver.findElements(By.cssSelector(".list_operation li"));
                        StringBuilder openTimeBuilder = new StringBuilder();
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
                                    if (openTimeBuilder.length() > 0) {
                                        openTimeBuilder.append("");
                                    }
                                    openTimeBuilder.append(timeValue);
                                }
                            }
                        }

                        openTime = openTimeBuilder.length() > 0 ? openTimeBuilder.toString() : "영업시간 정보 없음";
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
                                offDaysBuilder.append(element.getText());
                            }
                            offDays = offDaysBuilder.toString();
                        } else {
                            offDays = "휴무일 정보 없음";
                        }

                        // 사진 다운로드 추가
                        try {
                            List<WebElement> photoElements = driver.findElements(By.cssSelector(".cont_photo .link_photo"));
                            if (!photoElements.isEmpty()) {
                                WebElement firstPhoto = photoElements.get(0);
                                String photoUrl = firstPhoto.getAttribute("style").replaceAll(".*url\\(\"?(.*?)\"?\\).*", "$1");

                                // 프로토콜 추가
                                if (!photoUrl.startsWith("http")) {
                                    photoUrl = "http:" + photoUrl;
                                }

                                // 파일 이름 생성
                                photoName = "restaurant" + photoCounter + ".jpg";
                                String photoPath = "src/main/resources/static/images/restaurant/" + photoName;

                                // 파일 존재 여부 확인
                                File file = new File(photoPath);
                                if (!file.exists()) {
                                    downloadPhoto(photoUrl, photoPath);
                                }

                                photoCounter++;
                            } else {
                                photoName = "default.jpg";
                            }
                        } catch (Exception e) {
                            System.out.println("사진 다운로드 실패: " + e.getMessage());
                        }

                        // RestaurantVO 객체 생성
                        RestaurantVO restaurantVO = new RestaurantVO();
                        restaurantVO.setName(name);
                        restaurantVO.setAddress(address);
                        restaurantVO.setOldAddress(oldAddress);
                        restaurantVO.setCategory(category);
                        restaurantVO.setPhoneNumber(phoneNumber);
                        restaurantVO.setHomepage(homepage);
                        restaurantVO.setOpenTime(openTime);
                        restaurantVO.setBreakTime(breakTime);
                        restaurantVO.setOffDays(offDays);
                        restaurantVO.setTags(tags);
                        restaurantVO.setParkingInfo(parkingInfo);
                        restaurantVO.setPhotoName(photoName);
                        restaurantVO.setLikeCount(0);
                        restaurantVO.setViewCount(0);
                        restaurantVO.setReviewCount(0);

                        // 중복 체크 후 데이터베이스에 저장
                        if (!restaurantDAO.isRestaurantExist(restaurantVO.getName())) {
                            restaurantDAO.insertRestaurantData(restaurantVO);
                            System.out.println("새로운 데이터 저장: " + restaurantVO.getName());
                        } else {
                            System.out.println("중복된 데이터, 저장하지 않음: " + restaurantVO.getName());
                        }

                        driver.close();
                        driver.switchTo().window(tabs.get(0));
                    }

                    System.out.println("식당 이름: " + name);
                    System.out.println("주소: " + address);
                    System.out.println("지번: " + oldAddress);
                    System.out.println("카테고리: " + category);
                    System.out.println("전화번호: " + phoneNumber);
                    System.out.println("홈페이지: " + homepage);
                    System.out.println("영업시간: " + openTime);
                    System.out.println("휴게시간: " + breakTime);
                    System.out.println("휴무일: " + offDays);
                    System.out.println("태그: " + tags);
                    System.out.println("주차 정보: " + parkingInfo);
                    System.out.println("사진 이름: " + photoName);
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

    // 사진 다운로드 메서드
    private static void downloadPhoto(String photoUrl, String outputFilePath) {
        try {
            try (BufferedInputStream in = new BufferedInputStream(new URL(photoUrl).openStream());
                 FileOutputStream fileOutputStream = new FileOutputStream(outputFilePath)) {
                byte[] dataBuffer = new byte[1024];
                int bytesRead;
                while ((bytesRead = in.read(dataBuffer, 0, 1024)) != -1) {
                    fileOutputStream.write(dataBuffer, 0, bytesRead);
                }
            }
        } catch (Exception e) {
            System.out.println("사진 다운로드 실패: " + e.getMessage());
        }
    }
}