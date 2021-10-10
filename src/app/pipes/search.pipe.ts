import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchFilter',
    pure: false,
})
export class SearchPipe implements PipeTransform {
  /**
   * Transform
   *
   * @param {any[]} tasks
   * @param {string} searchText
   * @returns {any[]}
   */
  transform(tasks: any[], searchText: string): any[] {
    if (!tasks) {
      return [];
    }
    if (!searchText) {
      return tasks;
    }
    searchText = searchText.toLocaleLowerCase();
    
    let returnCollection = [];
    tasks.forEach(task => {
        if (
            task.label.toLocaleLowerCase().includes(searchText) || 
            task.category.toLocaleLowerCase().includes(searchText) ||
            task.description.toLocaleLowerCase().includes(searchText) ||       
            task.done.toLocaleLowerCase().includes(searchText)  
            ) {
            returnCollection.push(task);
        }        
    });
    return returnCollection;
  }
}