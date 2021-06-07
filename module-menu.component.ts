import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthorityService } from '../service/user-authority.service';
import { ControlReportWordComponent } from 'src/app/shared/components/control-report-word/control-report-word.component';
import { element } from 'protractor';

@Component({
  selector: 'app-module-menu',
  templateUrl: './module-menu.component.html',
  styleUrls: ['./module-menu.component.css']
})
export class ModuleMenuComponent implements OnInit {
  [x: string]: any;
  id: ''
  submenuid = ''
  authmenu: any = []
  submenu: any[] = []
  listmenu: any[] = []
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userAuthorityService:UserAuthorityService
  ) { }

  async ngOnInit() {
    this._route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.authmenu = await this._userAuthorityService.getAuthority(this.id)
    this.submenu = await this._userAuthorityService.getUserAuthority(this.id,1)
    this.listmenu = await this._userAuthorityService.getUserAuthority(this.id,this.submenu[0].authority.id)
    console.log(this.submenu)
    // this._userAuthorityService.getUserProfileById(-1).then(res=>{
    //   console.log(res)
      
    // })
  }

  async getId(item){
    this.listmenu = await this._userAuthorityService.getUserAuthority(this.id,this.submenu[item.index].authority.id)
  }

  navigate(item) {
    this._router.navigate(["../../"+item], { relativeTo: this._route })
    // if (item.params) {
    //   let params: Object = item.params
    //   let objs = Object.entries(params)
    //   objs.forEach(([key, value]) => {
    //     sessionStorage.setItem(key, value)
    //   });
    // }
    // if(item.print){
    //   this._caseService.report(item.print, 'pdf', {})
    // }else{
      // this._router.navigate([item.authority.linkURL], { relativeTo: this._route })
    // }
  }
}
