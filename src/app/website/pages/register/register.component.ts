import { Component } from '@angular/core';
import { OnExit } from 'src/app/guards/exit.guard';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnExit{

  constructor(

  ) { }


  onExit(){
    const ans = confirm('Note: the logical condition was implemented from this component\n\n\tAre you sure you want to exit of this page? All the form data will be lost')
    return ans
  }

}
