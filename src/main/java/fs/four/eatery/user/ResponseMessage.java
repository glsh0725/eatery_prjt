package fs.four.eatery.user;

public class ResponseMessage {

    private String message;
    private boolean success;

    public ResponseMessage(String message, boolean success) {
        this.message = message;
        this.success = success;
    }

    // Getter and Setter
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }
}