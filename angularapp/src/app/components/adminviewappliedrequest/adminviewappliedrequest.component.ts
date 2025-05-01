import { Component, OnInit } from '@angular/core';
import { CookingClass } from 'src/app/models/cooking-class.model';
import { CookingClassRequest } from 'src/app/models/cooking-class-request.model';
import { CookingClassService } from 'src/app/services/cooking-class.service';

@Component({
  selector: 'app-adminviewappliedrequest',
  templateUrl: './adminviewappliedrequest.component.html',
  styleUrls: ['./adminviewappliedrequest.component.css']
})
export class AdminviewappliedrequestComponent implements OnInit {
  cookingClasses: CookingClass[] = []; // List of cooking classes fetched from the service
  requests: CookingClassRequest[] = []; // List of cooking class requests fetched from the service
  filteredRequests: CookingClassRequest[] = []; // Filtered requests based on search and status filters

  searchClassName: string = ''; // Search term for filtering by class name
  statusFilter: string = ''; // Status filter for requests (e.g., Pending, Approved, Rejected)

  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private cookingClassService: CookingClassService) {}

  ngOnInit(): void {
    this.loadCookingClasses();
    this.loadRequests();
  }

  // Load cooking classes from the service
  loadCookingClasses(): void {
    this.cookingClassService.getAllCookingClasses().subscribe(data => {
      this.cookingClasses = data;
      
    });
  }

  // Load cooking class requests from the service
  loadRequests(): void {
    this.cookingClassService.getAllCookingClassRequests().subscribe(data => {
      this.requests = data;
      this.filteredRequests = data; // Initialize filtered requests
      console.log("Fetched Requests:", data);
    });
  }

  // Get the class name by CookingClassId
  getClassName(cookingClassId: number): string {
    const cookingClass = this.cookingClasses.find(classItem => classItem.cookingClassId === cookingClassId);
    return cookingClass ? cookingClass.className : 'Unknown Class';
  }

  // Filter requests based on search term and status
  filterRequests(): void {
    this.filteredRequests = this.requests.filter(request => {
      const className = this.getClassName(request.CookingClassId).toLowerCase();
      const matchesSearch = className.includes(this.searchClassName.toLowerCase());
      const matchesStatus = this.statusFilter === '' || request.Status === this.statusFilter;

      return matchesSearch && matchesStatus;
    });
  }

  // Pagination logic
  get paginatedRequests(): CookingClassRequest[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredRequests.slice(startIndex, startIndex + this.itemsPerPage);
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  get totalPages(): number {
    return Math.ceil(this.filteredRequests.length / this.itemsPerPage);
  }

  // Approve a request
  approveRequest(request: CookingClassRequest): void {
    console.log("Approving Request:", request.status);
    if (request.status === 'Pending') {
      request.status = 'Approved';
      this.cookingClassService.updateCookingClassRequest(request.cookingClassRequestId.toString(), request).subscribe(() => {
        alert(`Request for Class "${this.getClassName(request.cookingClassId)}" has been approved.`);
        this.filterRequests(); // Refresh the filtered list
      });
    }
  }

  // Reject a request
  rejectRequest(request: CookingClassRequest): void {
    if (request.status === 'Pending') {
      request.status = 'Rejected';
      this.cookingClassService.updateCookingClassRequest(request.cookingClassRequestId.toString(), request).subscribe(() => {
        alert(`Request for Class "${this.getClassName(request.cookingClassId)}" has been rejected.`);
        this.filterRequests(); // Refresh the filtered list
      });
    }
  }
}
