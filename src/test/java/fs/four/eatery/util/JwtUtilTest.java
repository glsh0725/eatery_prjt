package fs.four.eatery.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import org.junit.jupiter.api.Test;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

public class JwtUtilTest {

    @Test
    public void testGenerateAndValidateToken() {
        // Given
        String mem_id = "user123";
        String mem_nickname = "nickname";
        String email = "user@example.com";
        Date created_date = new Date();
        int role = 1;

        // When
        String token = JwtUtil.generateToken(mem_id, mem_nickname, email, created_date, role);
        System.out.println("Generated Token: " + token);

        // Then
        assertNotNull(token);

        try {
            Claims claims = JwtUtil.validateToken(token);
            assertEquals(mem_id, claims.getSubject());
            assertEquals(mem_nickname, claims.get("mem_nickname"));
            assertEquals(email, claims.get("email"));
            assertEquals(created_date.getTime(), claims.get("created_date", Date.class).getTime());
            assertEquals(role, claims.get("role"));
        } catch (JwtException e) {
            fail("Token validation failed: " + e.getMessage());
        }
    }

    @Test
    public void testInvalidToken() {
        // Given
        String invalidToken = "invalidToken";

        // When & Then
        assertThrows(JwtException.class, () -> {
            JwtUtil.validateToken(invalidToken);
        });
    }
}