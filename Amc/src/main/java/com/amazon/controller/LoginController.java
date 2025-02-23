package com.amazon.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.amazon.entity.User;
import com.amazon.service.LoginService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("api/user")
public class LoginController {

	@Autowired
	private HttpServletRequest request;

	@Autowired
	private LoginService loginService;

	static HttpSession httpSession;

	@PostMapping("signup")
	public ResponseEntity<Void> signUp(@RequestBody User user) {
		boolean isSignedUp = loginService.signUp(user);
		if (isSignedUp) {
			return new ResponseEntity<>(HttpStatus.CREATED);
		} else {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("login/{email}/{password}")
	public ResponseEntity<Boolean> loginUser(@PathVariable String email, @PathVariable String password) {
		httpSession = request.getSession();
		boolean isAuthenticated = loginService.loginUser(email, password);
		if (isAuthenticated) {
			httpSession.setAttribute("loggedInUser", email);
			return ResponseEntity.ok(true);
		} else {
			return ResponseEntity.ok(false);
		}
	}

	@GetMapping("checkSession")
	public ResponseEntity<String> checkSession() {
		HttpSession httpSession = request.getSession(false);
		if (httpSession != null && httpSession.getAttribute("loggedInUser") != null) {
			return ResponseEntity.ok("User is logged in");
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Session expired or not logged in");
		}
	}

	@GetMapping("profile")
	public ResponseEntity<List<User>> profile() {
		if (httpSession != null && httpSession.getAttribute("loggedInUser") != null) {
			String email = (String) httpSession.getAttribute("loggedInUser");
			List<User> users = loginService.profile(email);
			if (users != null) {
				return new ResponseEntity<>(users, HttpStatus.OK);
			}
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
}
