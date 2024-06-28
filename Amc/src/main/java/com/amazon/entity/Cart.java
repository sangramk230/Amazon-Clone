package com.amazon.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Cart {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long productid;
	private String useremail;
	private Long availableid;
	private String name;
	private String brand;
	private Double price;
	private String category;
	private String image;

	public Cart() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getProductid() {
		return this.productid;
	}

	public void setProductid(Long productid) {
		this.productid = productid;
	}

	public String getUseremail() {
		return this.useremail;
	}

	public void setUseremail(String useremail) {
		this.useremail = useremail;
	}

	public Long getAvailableid() {
		return this.availableid;
	}

	public void setAvailableid(Long availableid) {
		this.availableid = availableid;
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

	public String getImage() {
		return this.image;
	}

	public void setImage(String image) {
		this.image = image;
	}

}
