import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CojService } from "src/app/shared/others/coj.service";




@Injectable({
    providedIn: 'root'
})
export class UserAuthorityService {
    _apiUrlCojUser: string;
    _headers: HttpHeaders
    _options: any = {}

    constructor(private http: HttpClient, public cojService: CojService) {
        this._apiUrlCojUser = environment.apiCojUserServer + environment.apiCojUser;
        this._headers = new HttpHeaders()
            .set("Content-Type", "application/json; charset=UTF-8")
        this._options.headers = this._headers
    }

    getUserAuthority(id , authorityParentId , parameters: any = {}): Promise<any> {
        return new Promise((resolve, reject) => {
          let params = new HttpParams().set('version', '1')
          Object.entries(parameters).forEach(([key, value]) => { params = params.append(key.toString(), value.toString()) })
          this._options.params = params
          this.http.get(`${this._apiUrlCojUser}/v1/users/${id}/authority/${authorityParentId}`, this._options).toPromise().then(res => { resolve(this.cojService.verifyRes(res)) }).catch(err => { reject(err); this.cojService.error(500, err.message) })
        })
      }

    getUserProfileById(id , parameters: any = {}): Promise<any> {
      return new Promise((resolve, reject) => {
        let params = new HttpParams().set('version', '1')
        Object.entries(parameters).forEach(([key, value]) => { params = params.append(key.toString(), value.toString()) })
        this._options.params = params
        this.http.get(`${this._apiUrlCojUser}/v1/userProfiles/${id}`, this._options).toPromise().then(res => { resolve(this.cojService.verifyRes(res)) }).catch(err => { reject(err); this.cojService.error(500, err.message) })
      })
    }
    getAuthority(id , parameters: any = {}): Promise<any> {
      return new Promise((resolve, reject) => {
        let params = new HttpParams().set('version', '1')
        Object.entries(parameters).forEach(([key, value]) => { params = params.append(key.toString(), value.toString()) })
        this._options.params = params
        this.http.get(`${this._apiUrlCojUser}/v1/authoritys/${id}`, this._options).toPromise().then(res => { resolve(this.cojService.verifyRes(res)) }).catch(err => { reject(err); this.cojService.error(500, err.message) })
      })
    }
}
