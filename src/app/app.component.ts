import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/service/data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title: string;
  description: string;
  isNoIndex: boolean;
  category: string;
  cards = [];
  subscription: Subscription;
  constructor(private dataService: DataService) {

  }

  ngOnInit() {
    this.getData();
  }

  getData() {
   this.subscription = this.dataService.getData().subscribe
      (res => {
        res?.items.map((item) => {
          const url = item.fields.url;
          this.category = 
            url.split('/').splice(2).map((str) => {
              return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
            })
          let a = document.createElement('a');
          a.href = res.items[0].fields.url.replace('/home', '');
          const seo = item.fields.seo
        })
        res?.includes?.Entry.map((data: any) => { 
          if (data.fields.title) {
            this.title = data.fields.title
          };
          if (data.fields.description) {
            this.description = data.fields.description.substring(0, 80)
          };
          if ([true, false].includes(data.fields.isNoIndex)) {
            this.isNoIndex = data.fields.isNoIndex
          }
          this.cards.push({title: this.title, description: this.description, category:this.category})
        })
      })
  };

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}


