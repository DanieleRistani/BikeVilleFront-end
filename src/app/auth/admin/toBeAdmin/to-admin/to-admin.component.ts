import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../../../service/admin/admin.service';

@Component({
  selector: 'app-to-admin',
  standalone: true,
  imports: [],
  templateUrl: './to-admin.component.html',
  styleUrl: './to-admin.component.css'
})
export class ToAdminComponent implements OnInit {
  
  
  constructor(private route : ActivatedRoute,private adminService : AdminService) { }
  ngOnInit(): void {
    this.adminService.toBeAdmin(this.route.snapshot.params['email'])
    window.location.replace('/');
  }

}
