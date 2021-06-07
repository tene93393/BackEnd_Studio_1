import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { authorService } from 'src/app/shared/others/author.service';
import { Observable } from 'rxjs';
import { SelectionListDialogComponent } from 'src/app/shared/components/selection-list-dialog/selection-list-dialog.component';
import { authormodel, SubdistrictModel, DistrictModel, authorTypeModel, authorLevelModel } from '../../models';
import { authorservice, subdistrictservice, provinceservice, authorTypesservice, districtsservice, authorLevelsservice } from '../../services';
import { ProvinceModel } from '../../models/province.model';
import { ConfirmBottomSheetComponent } from './../../../../shared/components/confirm-bottom-sheet/confirm-bottom-sheet.component';
import { MatBottomSheet } from "@angular/material";
import { element } from 'protractor';

@Component({
  selector: 'app-author-setup-component',
  templateUrl: './author-setup-component.component.html',
  styleUrls: ['./author-setup-component.component.css'],
  providers:[authorservice,districtsservice]
})
export class MSQESetupComponentComponent implements OnInit {


  authormodel:authormodel = new authormodel()
  authorTypeModel:authorTypeModel = new authorTypeModel()
  authorLevelModel :authorLevelModel = new authorLevelModel()
  authorcode: any
  authorname: any
  SubdistrictModel:SubdistrictModel = new SubdistrictModel
  districtModel:DistrictModel = new DistrictModel
  provinceModel:ProvinceModel = new ProvinceModel
  provinces =[]
  districts =[]
  subdistricts =[]
  authorTypes = []
  authorLevels = []
  id:any = 0
  mode: string = "search"
  activeFlagMeaning:{[key:number]:string} = {
    [1]:"ใช้งาน",
    [0]:"ไม่ใช้งาน",
  }


  
  pageName = "author"
  pageIcon = "ti-save"
  searchToggle = true


 @ViewChild(MatSort, { static: true }) sort: MatSort;
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


ELEMENT_DATA:any[] =[]
dataSource
selection = new SelectionModel<any>(false, []);
/** Whether the number of selected elements matches the total number of rows. */
activeFlagValue:string

 
  constructor(

    private authorservice:authorservice,
    private authorTypesservice:authorTypesservice,
    private authorLevelsservice:authorLevelsservice,
    public dialog: MatDialog,
    public authorService: authorService,
    private subdistrictservice:subdistrictservice,
    private districtsservice:districtsservice,
    private provinceservice:provinceservice,
    public bottomSheet: MatBottomSheet,



  ) { }

  ngOnInit() {
    console.log(this.authormodel)
    this.authorservice.get().subscribe(res=>{
      console.log(res)
      this.ELEMENT_DATA = res.data
      this.ELEMENT_DATA.forEach(element => {
        element.activeFlagMeaning = this.activeFlagMeaning[element.activeFlag]
      });
      this.dataSource= new MatTableDataSource<any>(this.ELEMENT_DATA);
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator;
    })
    this.provinceservice.getList().subscribe(res=>{
      console.log(res)
      this.provinces = res.data
    })
    this.authorTypesservice.getList().subscribe(res=>{
      console.log(res)
      this.authorTypes = res.data
    })
    this.districtsservice.getList().subscribe(res=>{
      console.log(res)
      this.districts = res.data
    })
    this.subdistrictservice.getList().subscribe(res=>{
      console.log(res)
      this.subdistricts = res.data
    })

    this.getactiveFlagMeaning
  }
  
    
  getactiveFlagMeaning(key:number){
  this.activeFlagValue = this.activeFlagMeaning[key]
  }


  save(){
    console.log('authormodel',this.authormodel);
     this.authorservice.post(this.authormodel).subscribe(res=>{
       this.authormodel = res.data
         this.authorService.success()
this.mode = "search"
       this.authorservice.getList().subscribe(res=>{
         console.log(res)
         this.ELEMENT_DATA = res.data
         this.dataSource= new MatTableDataSource<any>(this.ELEMENT_DATA);
         this.dataSource.sort = this.sort
         this.dataSource.paginator = this.paginator;
       })
     }, err => {
       this.authorService.error()
     })
   }



   
  refreshTable() {
    this.authorservice.getList().subscribe(res => {
      this.ELEMENT_DATA = res.data
      this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator;
    })
  }



  edit(){
    this.authorservice.put(this.authormodel).subscribe(res=>{
      this.authormodel = res.data
        this.authorService.success()
this.mode = "search"
    }, err => {
      this.authorService.error()
    })
  }
  
  clear(){
    this.authorservice.put(this.authormodel).subscribe(res=>{
      this.authormodel = res.data
        this.authorService.success()
this.mode = "search"
    }, err => {
      this.authorService.error()
    })
  }



  search(){
    console.log('Searachauthormodel',this.authormodel);
    this.authorservice.search(this.authormodel).subscribe(res=>{
      console.log('res.data : ',res.data)
      this.ELEMENT_DATA = res.data
      this.dataSource= new MatTableDataSource<any>(this.ELEMENT_DATA);
        this.authorService.success()
this.mode = "search"
    }, err => {
      this.authorService.error()
    })

  }
  

  delete(){
    this.authormodel = new authormodel
    this.id=0
  }

  editElementTable(element){
    console.log(element)
    this.authormodel=element
    this.id = element.id;    
    this.mode = "transaction"

  }

  
  deleteElementTable(element){
    let bts = this.bottomSheet.open(ConfirmBottomSheetComponent)
    bts.instance.content.header = "คุณต้องการลบข้อมูลนี้ใช่หรือไม่"
    bts.afterDismissed().subscribe(res => {
      if (res) {
    this.authorservice.delete(element.id).subscribe(res=>{
      this.authormodel = res.data
        this.authorService.success()
this.mode = "search"

      this.authorservice.getList().subscribe(res=>{
        console.log(res)
        this.ELEMENT_DATA = res.data
        this.dataSource= new MatTableDataSource<any>(this.ELEMENT_DATA);
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator;
      })
    }, err => {
      this.authorService.error()

    })
  }

})
}
  
  authoropen(){
    this.authorservice.get().subscribe(res => {
      this.selDialog('author', res.data, ['authorCode', 'authorNameTh'], ['รหัส', 'ชื่อauthor']).subscribe(data => {
        if (data) {
          this.authorcode=data.authorCode
          this.authorname=data.authorNameTh
          this.authormodel.authorId = data.id
        }
      })
    })
  }

  subdistrictopen(){
    this.subdistrictservice.getList().subscribe(res => {
      this.selDialog('ตำบล', res.data, ['subdistrictCode', 'subdistrictName'], ['รหัสตำบล', 'ตำบล']).subscribe(data => {
        if (data) {
           console.log(data,'asgaf')
          this.SubdistrictModel = data
          this.districtsservice.getById(this.SubdistrictModel.districtId).subscribe(res=>{
            console.log(res,'district')
          this.districtModel=res.data
          })
          this.provinceservice.getById(this.SubdistrictModel.provinceId).subscribe(res=>{
            console.log(res,'province')
            this.provinceModel=res.data
          })
        }
      })
    })
  }

  districtopen(){
    this.districtsservice.getList().subscribe(res => {
      this.selDialog('อำเภอ', res.data, ['districtCode', 'districtName'], ['รหัสอำเภอ', 'อำเภอ']).subscribe(data => {
        if (data) {
          this.districtModel = data
          this.authormodel.postcode =this.districtModel.postcode
          this.provinceservice.getById(this.districtModel.provinceId).subscribe(res=>{
            this.provinceModel=res.data
          })
        }
      })
    })
  }
  

  authorNameopen(){
    this.authorservice.get().subscribe(res => {
      this.selDialog('ชื่อauthorภาษาไทย', res.data, [ 'authorNameTh'], [ 'ชื่อauthorภาษาไทย']).subscribe(data => {
        if (data) {
          this.authormodel = data
        }
      })
    })
  }


  authorNameEnopen(){
    this.authorservice.get().subscribe(res => {
      this.selDialog('ชื่อauthorภาษาอังกฤษ', res.data, [ 'authorNameEn'], [ 'ชื่อauthorภาษาอังกฤษ']).subscribe(data => {
        if (data) {
          this.authormodel = data
        }
      })
    })
  }

  selDialog(title: string, data: any[], columns: string[], headers: string[]): Observable<any> {
    let dl = this.dialog.open(SelectionListDialogComponent, { width: '600px' })
    let instance = dl.componentInstance
    instance.title = title
    instance.elementData = data
    instance.displayedColumns = columns
    instance.displayedHeaders = headers
    return dl.afterClosed()
  }

  isAllSelected() {
    if(this.dataSource){
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
}
/** Selects all rows if they are not all selected; otherwise clear selection. */
masterToggle() {
  if(this.dataSource){
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
}
/** The label for the checkbox on the passed row */
checkboxLabel(row ?: any): string {
    if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
}

changeToTranMode() {
  this.mode = "transaction"
}

}

