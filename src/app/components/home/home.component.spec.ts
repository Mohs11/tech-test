import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from 'src/app/pipes/search.pipe';
import { HttpClientModule } from '@angular/common/http';
import { NgFlashMessageService } from 'ng-flash-messages';
import { HomeComponent } from './home.component';
import { Router } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  class MockRouter {
    navigate = jasmine.createSpy('navigate');
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent, SearchPipe ],
      imports: [ FormsModule, HttpClientModule ],
      providers: [NgFlashMessageService,     
        {provide: Router, useClass: MockRouter}
      ]
      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();    
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
