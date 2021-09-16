import { Component, OnInit } from '@angular/core';
import { Dev } from 'src/app/models/devs';
import { DevsService } from '../../services/dev.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  readonly emptyDev = {
    info: { name: '' },
    category: '',
    id: 0,
  };

  devs: Dev[] = [];
  currentDev: Dev = this.emptyDev;
  categories: string[] = [];
  devByCategories: { [key: string]: any } = {};
  currentTab!: string;

  constructor(private devsService: DevsService) {}

  ngOnInit() {
    this.reloadDevs();
  }

  reloadDevs() {
    this.devsService.findAllDevs().subscribe((response: Dev[]) => {
      this.devs = response;
      this.getCategories();
    });
  }

  getCategories() {
    this.devs.forEach((dev) => {
      if (!this.categories.includes(dev?.category)) {
        this.categories.push(dev?.category);
      }
    });
    this.currentTab = this.categories[0];
    this.sortDevsByCategory();
  }

  sortDevsByCategory() {
    this.devByCategories = this.categories.reduce(
      (categories: { [key: string]: any }, category: string) => {
        categories[category] = this.filterByCategory(category);
        return categories;
      },
      {}
    );
  }

  filterByCategory(category: string): Dev[] {
    return this.devs
      .filter((dev) => dev.category === category)
      .sort((c1: Dev, c2: Dev) => c1?.id - c2?.id);
  }

  setCurrentTab(tab: string) {
    this.currentTab = tab;
  }

  showDetails(dev: Dev) {
    this.currentDev = dev;
  }
}
