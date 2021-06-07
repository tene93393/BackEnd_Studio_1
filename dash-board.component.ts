import { Component, OnInit } from '@angular/core';
import { AlertSetupService } from '../../follow/Service/AlertSetupService.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css'],
  providers: [AlertSetupService]
})
export class DashBoardComponent implements OnInit {

  modules: any = [{
    [
    {
        "id": 1,
        "name": "Jason Bourne",
        "role": "Registered user",
        "place": "New York",
        "avatar_url": "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
        "id": 2,
        "name": "Michael De Santa",
        "role": "Moderator",
        "place": "Los Santos",
        "avatar_url": "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
        "id": 3,
        "name": "Peter Parker",
        "role": "Moderator",
        "place": "New York",
        "avatar_url": "https://randomuser.me/api/portraits/men/3.jpg"
    },
    {
        "id": 4,
        "name": "Harry Potter",
        "role": "Admin",
        "place": "Hogwarts",
        "avatar_url": "https://randomuser.me/api/portraits/men/4.jpg"
    },
    {
        "id": 5,
        "name": "Boromir",
        "role": "Registered user",
        "place": "Gondor",
        "avatar_url": "https://randomuser.me/api/portraits/men/5.jpg"
    },
    {
        "id": 6,
        "name": "Bruce Wayne",
        "role": "Sponsor",
        "place": "Gotham City",
        "avatar_url": "https://randomuser.me/api/portraits/men/6.jpg"
    }
]
  
  constructor(

  ) { }

  ngOnInit() {
  }
}
