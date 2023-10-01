import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any[],search:string, searchable: string[]): any[]{
    
    let ret = value.filter((obj)=>{
      let r:boolean = false;
      
      searchable.forEach(element => {
        console.log('index : '+obj[element].indexOf(search));
        
        if(obj[element].indexOf(search)>-1){
          console.log('true : '+obj[element]);
          r = true;
        }
      });
      return r;
    });
    
    
    
    return ret;
  }

}
