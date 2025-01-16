package fs.four.eatery.user.vo;

import fs.four.eatery.admin.vo.AdminVO;
import org.springframework.stereotype.Component;
import lombok.Data;

import java.sql.Timestamp;
import java.util.Date;

@Component("userVO")
public class UserVO extends AdminVO {

    private String mem_id;
    private String mem_pw;
    private String mem_nickname;
    private String email;
    private String email_status;
    private String img_name;
    private String img_path;
    private Timestamp created_date;
    private Timestamp agree_date;

    private int role;

    public UserVO() {

    }

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

    public String getEmail_status() {
        return email_status;
    }

    public void setEmail_status(String email_status) {
        this.email_status = email_status;
    }

    public String getImg_name() {
        return img_name;
    }

    public void setImg_name(String img_name) {
        this.img_name = img_name;
    }

    public String getImg_path() {
        return img_path;
    }

    public void setImg_path(String img_path) {
        this.img_path = img_path;
    }

    public Timestamp getCreated_date() {
        return created_date;
    }

    public void setCreated_date(Timestamp created_date) {
        this.created_date = created_date;
    }

    public Timestamp getAgree_date() {
        return agree_date;
    }

    public void setAgree_date(Timestamp agree_date) {
        this.agree_date = agree_date;
    }

    public int getRole() {
        return role;
    }

    public void setRole(int role) {
        this.role = role;
    }
}
