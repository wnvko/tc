import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CustomersType } from '../../models/northwind/customers-type';
import { OrdersType } from '../../models/northwind/orders-type';
import { EmployeesType } from '../../models/northwind/employees-type';
import { SuppliersType } from '../../models/northwind/suppliers-type';
import { NorthwindService } from '../../services/northwind.service';

@Component({
  selector: 'app-backlog',
  standalone: false,
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public filtersVisible: boolean = false;
  public northwindOrders: OrdersType[] = [];
  public northwindCustomers: CustomersType[] = [];
  public northwindEmployees: EmployeesType[] = [];
  public northwindSuppliers: SuppliersType[] = [];

  constructor(
    private northwindService: NorthwindService,
  ) {}


  ngOnInit() {
    this.northwindService.getOrders().pipe(takeUntil(this.destroy$)).subscribe(
      data => this.northwindOrders = data
    );
    this.northwindService.getCustomers().pipe(takeUntil(this.destroy$)).subscribe(
      data => this.northwindCustomers = data
    );
    this.northwindService.getEmployees().pipe(takeUntil(this.destroy$)).subscribe(
      data => this.northwindEmployees = data
    );
    this.northwindService.getSuppliers().pipe(takeUntil(this.destroy$)).subscribe(
      data => this.northwindSuppliers = data
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
