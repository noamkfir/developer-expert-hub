import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2'
import { Router } from '@angular/router';

@Component({
  selector: 'root-app',
  templateUrl: 'app.component.html'
})
export class AppComponent { 
  constructor(private af: AngularFire, private router: Router) {
    const user = this.af.auth.subscribe(
      auth => this.getUser(auth)
    );
  }

  getUser(auth){
    const queryObservable = this.af.database.list('/Profile', {
    query: {
      orderByChild: 'uid',
      equalTo: auth.uid 
    }
   });

   queryObservable.subscribe(queriedItems => {
      console.log(queriedItems);  
   });

  }

  logout() {
    this.af.auth.logout();
    this.router.navigate(['/'])
  }
}


@Component({
  templateUrl: 'page.not.found.html'
})

export class PageNotFoundComponent {}