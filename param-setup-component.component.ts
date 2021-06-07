import { Component, OnInit, ViewChild } from '@angular/core';
import { ParamModel } from '../../models';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog, MatBottomSheet } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { courtservice } from '../../services';
import { CojService } from 'src/app/shared/others/coj.service';
import { ConfirmBottomSheetComponent, SelectionListDialogComponent } from 'src/app/shared/components';
import { Observable } from 'rxjs';
import { paramsservice } from '../../services/params.service';
import { element } from 'protractor';


@Component({
  selector: 'app-param-setup-component',
  templateUrl: './param-setup-component.component.html',
  styleUrls: ['./param-setup-component.component.css'],
  providers: [paramsservice, courtservice]
})
export class ParamSetupComponentComponent implements OnInit {

 


  ParamModel: ParamModel = new ParamModel()
  courtcode: any
  courtname: any
  params = []
  idk: any = 0
  mode: string = "search"
  activeFlagMeaning:{[key:number]:string} = {
    [1]:"ใช้งาน",
    [0]:"ไม่ใช้งาน",
  }





  pageName = "การตั้งค่าระบบ"
  pageIcon = "ti-save"
  searchToggle = true




  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = [ 'Checkbox' , 'value', 'name',   'selectCode',  'star'];
  ELEMENT_DATA: any[] = []
  dataSource: MatTableDataSource<any>
  selection = new SelectionModel<any>(false, []);
  id: any;
   activeFlagValue:string
  /** Whether the number of selected elements matches the total number of rows. */





  constructor(
    private paramsservice: paramsservice,
    private courtservice: courtservice,
    public dialog: MatDialog,
    public cojService: CojService,
    public bottomSheet: MatBottomSheet,



  ) { }

  ngOnInit() {
    
    console.log(this.ParamModel)
    this.paramsservice.getList().subscribe(res => {
      console.log(res)
      this.ELEMENT_DATA = res.data
      this.ELEMENT_DATA.forEach(element => {
        element.activeFlagMeaning = this.activeFlagMeaning[element.activeFlag]
      });
      this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator;
    })

    this.getactiveFlagMeaning
  }
  
  
    
  getactiveFlagMeaning(key:number){
  this.activeFlagValue = this.activeFlagMeaning[key]


  }
  

  


  save(){
    console.log('ParamModel',this.ParamModel);
     this.paramsservice.post(this.ParamModel).subscribe(res=>{
       this.ParamModel = res.data
         this.cojService.success()
      this.mode = "search"
       this.paramsservice.getList().subscribe(res=>{
         console.log(res)
         this.ELEMENT_DATA = res.data
         this.dataSource= new MatTableDataSource<any>(this.ELEMENT_DATA);
         this.dataSource.sort = this.sort
         this.dataSource.paginator = this.paginator;
       })
     }, err => {
       this.cojService.error()
     })
   }

 

  refreshTable() {
    this.paramsservice.getList().subscribe(res => {
      this.ELEMENT_DATA = res.data
      this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator;
    })
  }




  edit(){
    this.paramsservice.put(this.ParamModel).subscribe(res=>{
      this.ParamModel = res.data
        this.cojService.success()
        this.mode = "search"
    }, err => {
      this.cojService.error()
    })
  }
  



  clear() {
    this.paramsservice.put(this.ParamModel).subscribe(res => {
      this.ParamModel = res.data
        this.cojService.success()
    }, err => {
      this.cojService.error()
    })
  }




  search() {
    console.log('SearachParamModel', this.ParamModel);
    this.paramsservice.search(this.ParamModel).subscribe(res => {
      console.log('res.data : ', res.data)
      this.ELEMENT_DATA = res.data
      this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
        this.cojService.success()
this.mode = "search"
    }, err => {
      this.cojService.error()
    })

  }



  delete() {
    this.ParamModel = new ParamModel
    this.id=0
  }

  editElementTable(element){
    console.log(element)
    this.ParamModel=element
    this.id = element.id;    
    this.mode = "transaction"

  }

  
  deleteElementTable(element) {
    let bts = this.bottomSheet.open(ConfirmBottomSheetComponent)
    bts.instance.content.header = "คุณต้องการลบข้อมูลนี้ใช่หรือไม่"
    bts.afterDismissed().subscribe(res => {
      if (res) {
        this.paramsservice.delete(element.id).subscribe(res => {
          this.ParamModel = res.data
            this.cojService.success()


          this.paramsservice.getList().subscribe(res => {
            console.log(res)
            this.ELEMENT_DATA = res.data
            this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
            this.dataSource.sort = this.sort
            this.dataSource.paginator = this.paginator;
          })
        }, err => {
          this.cojService.error()

        })
      }

    })

  }


  courtopen() {
    this.courtservice.get().subscribe(res => {
      this.selDialog('ศาล', res.data, ['courtCode', 'courtNameTh'], ['รหัส', 'ชื่อศาล']).subscribe(data => {
        if (data) {
          this.courtcode = data.courtCode
          this.courtname = data.courtNameTh
          this.ParamModel.courtId = data.id
        }
      })
    })
  }



  Paramopen() {
    this.paramsservice.getList().subscribe(res => {
      this.selDialog('parameter ของระบบ', res.data, ['value', 'name'], ['ค่า parameter ของระบบ', 'ชื่อ parameter ของระบบ']).subscribe(data => {
        if (data) {
          this.ParamModel = data
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
    if (this.dataSource) {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.dataSource) {
      this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
    }
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  changeToTranMode() {
    this.mode = "transaction"
  }
  
  
  }
  
  
