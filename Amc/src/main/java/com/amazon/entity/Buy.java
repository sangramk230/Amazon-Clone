package com.amazon.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Buy {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long productid;
	private Long availableid;
	private Long cartid;
	private String useremail;

	private String email;
	private String name;
	private String brand;
	private Double price;
	private String category;
	private String address;
	private Long contact;
	private Integer quantity;
	private String image;

	public Buy() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getProductid() {
		return this.productid;
	}

	public void setProductid(Long productid) {
		this.productid = productid;
	}

	public Long getAvailableid() {
		return this.availableid;
	}

	public void setAvailableid(Long availableid) {
		this.availableid = availableid;
	}

	public Long getCartid() {
		return this.cartid;
	}

	public void setCartid(Long cartid) {
		this.cartid = cartid;
	}

	public String getUseremail() {
		return this.useremail;
	}

	public void setUseremail(String useremail) {
		this.useremail = useremail;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getBrand() {
		return this.brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public Double getPrice() {
		return this.price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public String getCategory() {
		return this.category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getAddress() {
		return this.address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Long getContact() {
		return this.contact;
	}

	public void setContact(Long contact) {
		this.contact = contact;
	}

	public Integer getQuantity() {
		return this.quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public String getImage() {
		return this.image;
	}

	public void setImage(String image) {
		this.image = image;
	}

}
