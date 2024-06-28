import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  signup(user:User) {
    return this.http.post<void>("http://localhost:8080/api/user/signup",user); 
  }
  loginUser(email: string, password: string){
    return this.http.get<Boolean>(`http://localhost:8080/api/user/login/${email}/${password}`); 
  }
  checkSession(){
    return this.http.get<void>("http://localhost:8080/api/user/checkSession"); 

  }
  profile(){
    return this.http.get<any>("http://localhost:8080/api/user/profile");
  }
}
export class User{
    id:number;
    name:string;
	  gender:string ;
	  dob: string;
	  email: string ;
	  phoneno:string;
    password: string;
    confirmPassword: string;
   constructor( id:number,name:string,gender:string,dob:string,email:string,phoneno:string,password: string,confirmPassword: string) {
      this.id = id;  
      this.name=name;
      this.gender=gender;
      this.dob=dob;
      this.email=email;
      this.phoneno=phoneno;
      this.password = password;
      this.confirmPassword = confirmPassword;

    }
  }