package fs.four.eatery.user.vo;

import lombok.Data;
import org.springframework.stereotype.Component;

@Data
public class UserVO {
    private String mem_id;
    private String mem_pw;
    private String mem_nickname;
    private String email;

    public String getMem_id() {
        return mem_id;
    }

    public void setMem_id(String mem_id) {
        this.mem_id = mem_id;
    }

    public String getMem_pw() {
        return mem_pw;
    }

    public void setMem_pw(String mem_pw) {
        this.mem_pw = mem_pw;
    }

    public String getMem_nickname() {
        return mem_nickname;
    }

    public void setMem_nickname(String mem_nickname) {
        this.mem_nickname = mem_nickname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
