package com.amazon.service;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.amazon.dao.LoginDao;
import com.amazon.entity.User;

@Service
public class LoginService {

	@Autowired
	private LoginDao loginDao;

	@Autowired
	private SessionFactory sessionFactory;

	public boolean signUp(User user) {
		return loginDao.signUp(user);
	}

	public boolean loginUser(String email, String password) {
		User user = loginDao.getUserByEmail(email);
		return user != null && user.getPassword().equals(password);
	}

	public List<User> profile(String email) {
		return loginDao.profile(email);
	}
}
