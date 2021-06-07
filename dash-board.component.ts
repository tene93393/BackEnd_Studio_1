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
    id: 1,
    name: 'ระบบสำนวนคดีหลัก',
    detail: 'สร้างและบันทึกข้อมูลสำนวนคดีตามประเภทสำนวน พิมพ์ปกสำนวนและปลิวสำเนาจ่าย พิมพ์รายงานสารบบความรับฟ้องคดีประจำวัน',
    icon: 'scale',
    color: '#98518E',
    route: 'case',
  }, {
    id: 2,
    name: 'ระบบผัดฟ้องฝากขัง',
    detail: 'ตรวจสอบผู้ต้องหา บันทึกข้อมูลคำร้องขอผัดฟ้องฝากขัง พิมพ์รายงานผัดฟ้องฝากขัง พิมพ์หมายปล่อยตัวผู้ต้องหา',
    icon: 'jail',
    color: '#985CA4',
    route: 'detention',
  },
  {
    id: 3,
    name: 'ระบบหมายจับหมายค้น',
    detail: 'บันทึกรายละเอียดการออกหมายจับ/หมายค้น ออกรายงานการขอหมายจับ/หมายค้น',
    icon: 'handcuffs',
    color: '#9468BA',
    route: 'warrant',
  },
  {
    id: 4,
    name: 'ระบบศูนย์ไกล่เกลี่ย',
    detail: 'บันทึกข้อมูลคดีตั้งเป็นสำนวนไกล่เกลี่ยโดยอ้างสำนวนคดีหลัก พิมพ์รายงานสารบบฟ้องคดีไกล่เกลี่ย พิมพ์รายงานสถิติผู้ประนีประนอม',
    icon: '015-handshake',
    color: '#8B76D0',
    route: 'mediation',
  }, {
    id: 5,
    name: 'ระบบเก็บสำนวนคดี',
    detail: 'บันทึกหมายเลขคดีปลดเผาประจำปี จัดทำรายงานสำเนาปลดเผาประจำปี พิมพ์รายงานการรับ/ส่งสำนวน',
    icon: 'box',
    color: '#7A84E6',
    route: 'dms',
  },
  {
    id: 6,
    name: 'ระบบคำคู่ความ',
    detail: 'บันทึกรายการคำคู่ความ บันทึกคำสั่งของผู้พิพากษา ออกเลขทะเบียนกำกับคำคู่ความ ',
    icon: 'user-bubble',
    color: '#DB7ED8',
    route: 'statement',
    menu: []
  },
  {
    id: 7,
    name: 'ระบบพิจารณาคดี',
    detail: '',
    icon: 'court',
    color: '#FF83B2',
    route: 'proceed',
    menu: []
  },
  {
    id: 8,
    name: 'ระบบหมาย/ประกาศ',
    detail: '',
    icon: '028-newspaper',
    color: '#FF9F87',
    route: 'notice',
    menu: []
  },
  {
    id: 9,
    name: 'ระบบการเงิน',
    detail: '',
    icon: '045-money',
    color: '#FFCB69',
    route: 'finance',
    menu: []
  },
  {
    id: 10,
    name: 'ระบบสารบบคดี',
    detail: '',
    icon: 'law',
    color: '#AABD64',
    route: 'judgement',
    menu: []
  },
  {
    id: 11,
    name: 'ระบบอุทธรณ์/ฎีกา',
    detail: '',
    icon: 'courthouse',
    color: '#2A887C',
    route: 'appeal',
    menu: []
  },
  {
    id: 12,
    name: 'ระบบงานสารบรรณ',
    detail: '',
    icon: 'book',
    color: '#2F4858',
    route: 'wf',
    menu: []
  },
  {
    id: 13,
    name: 'งานเอกสารแยกเก็บ',
    detail: '',
    icon: 'folder',
    color: '#485A73',
    route: 'material',
    menu: []
  },
  // {
  //   id: 14,
  //   name: 'งานเก็บหลักประกัน',
  //   detail: 'งานเก็บหลักประกันงานเก็บหลักประกันงานเก็บหลักประกัน',
  //   icon: '027-locker-1',
  //   color: '#676A8B',
  //   route: 'guarantee-asset',
  //   menu: []
  // },
  {
    id: 15,
    name: 'งานศูนย์ถ่ายเอกสาร',
    detail: '',
    icon: '020-photocopier',
    color: '#8C7A9F',
    route: 'photo-copy',
    menu: []
  },
  {
    id: 16,
    name: 'ระบบติดตามคดี',
    detail: '',
    icon: 'bell',
    color: '#F390A0',
    route: 'follow',
    menu: []
  },
  {
    id: 17,
    name: 'ระบบประกัน',
    detail: '',
    icon: '041-success-3',
    color: '#DC8667',
    route: 'guarantee',
    menu: []
  },
  {
    id: 18,
    name: 'ระบบข้อมูลผู้บริหาร',
    detail: '',
    icon: '035-circles',
    color: '#AF863A',
    route: 'manager',
    menu: []
  },
  {
    id: 19,
    name: 'ระบบงานสถิติ',
    detail: '',
    icon: '026-bar-chart',
    color: '#7F594B',
    route: 'report',
    menu: []
  },
  {
    id: 20,
    name: 'ระบบการควบคุม',
    detail: '',
    icon: 'gear',
    color: '#6D4D5E',
    route: 'control',
    menu: []
  }, 
  {
    id: 21,
    name: 'ระบบบริการข้อมูลคดี',
    detail: '',
    icon: '008-typewriter',
    color: '#424A61',
    route: 'information',
    menu: []
  },
  {
    id: 22,
    name: 'ระบบปฏิบัติงานพิเศษ',
    detail: '',
    icon: 'sheriff',
    color: '#0099A7',
    route: 'special',
    menu: []
  },
  {
    id: 23,
    name: 'ระบบคำวินิจฉัย',
    detail: '',
    icon: 'magnifying-glass',
    color: '#23C0A2',
    route: 'ruling',
    menu: []
  },
  
  ]

  constructor(

  ) { }

  ngOnInit() {
  }
}
