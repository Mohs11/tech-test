import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgFlashMessagesModule } from 'ng-flash-messages';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NgFlashMessagesModule
      ],
      declarations: [
        AppComponent,
        NavbarComponent        
      ],
      providers: []
    }).compileComponents();
  }));

  it(`should have as title 'tech-test'`, () => { 
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('tech-test');
  });
});
