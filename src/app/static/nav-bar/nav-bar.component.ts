import { Component,  OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{
  
  
  isShow(){
    if(this.show==true){
      this.show=false
    }
  }


  show !:boolean;
  isNight: boolean = window.localStorage.getItem('isNight') == 'true' ? true : false
 
  
  ngOnInit(): void {
    this.show=false
    if( window.localStorage.getItem('isNight')){
      
    }else{
      window.localStorage.setItem('isNight', 'false')
    }

    if(window.localStorage.getItem('isNight') == 'true'){
      document.body.classList.add('night-mode');
      document.body.classList.remove('light-mode');
    }else{
      document.body.classList.remove('night-mode');
      document.body.classList.add('light-mode');
    }
   
  }
 
  turnOnNightMode() {
    if (this.isNight == false) {
      window.localStorage.setItem('isNight', 'true')
      document.body.classList.add('night-mode');
      document.body.classList.remove('light-mode');
    }
    else {
      window.localStorage.setItem('isNight', 'false')
      document.body.classList.remove('night-mode');
      document.body.classList.add('light-mode');
    }
  }

 


}
