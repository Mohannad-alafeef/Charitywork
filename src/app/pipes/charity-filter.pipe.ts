import { Pipe, PipeTransform } from '@angular/core';
import { Const } from '../shared/Const';

@Pipe({
  name: 'charityFilter'
})
export class CharityFilterPipe implements PipeTransform {
  constant=Const;
  transform(value: any[], filterText: string,radio:string,Date1:string,Date2:string,select:string) {
    debugger
    if(value.length==0 || filterText ==''&& radio==''&& Date1=='' &&Date2==''&&select=='')
      return value;
    else if(select!='')
     {  if(radio!=''&& Date1!='' && Date2==''){
        return value.filter((charity)=>{
        const createDate = charity.createDate.split('T')[0];
         
          return charity.isAccepted.toString()==radio 
                && charity.charityName.toLowerCase().startsWith(filterText.toLowerCase())
                &&(charity.createDate>=Date1 ) &&charity.categoryId == select;
          })
      }
      else if(radio!=''&& Date1=='' && Date2!=''){
        return value.filter((charity)=>{
        const createDate = charity.createDate.split('T')[0];
         
          return charity.isAccepted.toString()==radio 
                && charity.charityName.toLowerCase().startsWith(filterText.toLowerCase())
                &&(charity.createDate<=Date2 ) &&charity.categoryId == select;
          })
      }
      else if(radio!=''&& Date1!='' && Date2!=''){
        return value.filter((charity)=>{
        const createDate = charity.createDate.split('T')[0];
         
          return charity.isAccepted.toString()==radio 
                && charity.charityName.toLowerCase().startsWith(filterText.toLowerCase())
                &&charity.createDate>=Date1 && charity.createDate <=Date2&&charity.categoryId == select ;
          })
      }
      else if(Date1!='' && Date2=='') {
    
        return value.filter((charity)=>{
          const createDate = charity.createDate.split('T')[0];
          return charity.createDate>=Date1&& charity.charityName.toLowerCase().startsWith(filterText.toLowerCase())
          &&charity.categoryId == select ;
        })
      }
      else if(Date1!='' && Date2!='') {
        
        return value.filter((charity)=>{
          const createDate = charity.createDate.split('T')[0];
          return charity.createDate>=Date1 && charity.createDate <=Date2&& charity.charityName.toLowerCase().startsWith(filterText.toLowerCase())
          &&charity.categoryId == select ;
        })
      }
      else if(Date1=='' && Date2!='') {
        
        return value.filter((charity)=>{
          const createDate = charity.createDate.split('T')[0];
          return charity.createDate<=Date2 && charity.charityName.toLowerCase().startsWith(filterText.toLowerCase()) 
          &&charity.categoryId == select ;
        })
      }
     else if(radio!='' ){
        return value.filter((charity)=>{
        const createDate = charity.createDate.split('T')[0];
         
          return charity.isAccepted.toString()==radio 
                && charity.charityName.toLowerCase().startsWith(filterText.toLowerCase())
                &&charity.categoryId == select ;
          })
      }
      else if(select!=''){
        return value.filter((charity)=>{
       
            return charity.charityName.toLowerCase().startsWith(filterText.toLowerCase())
                   && charity.categoryId == select;
            })
      }
      else {
        return value.filter((charity)=>{
        
        return charity.charityName.toLowerCase().startsWith(filterText.toLowerCase());
        })
        }
      }
      else{
        if(radio!=''&& Date1!='' && Date2==''){
          return value.filter((charity)=>{
          const createDate = charity.createDate.split('T')[0];
           
            return charity.isAccepted.toString()==radio 
                  && charity.charityName.toLowerCase().startsWith(filterText.toLowerCase())
                  &&(charity.createDate>=Date1 ) ;
            })
        }
        else if(radio!=''&& Date1=='' && Date2!=''){
          return value.filter((charity)=>{
          const createDate = charity.createDate.split('T')[0];
           
            return charity.isAccepted.toString()==radio 
                  && charity.charityName.toLowerCase().startsWith(filterText.toLowerCase())
                  &&(charity.createDate<=Date2 ) ;
            })
        }
        else if(radio!=''&& Date1!='' && Date2!=''){
          return value.filter((charity)=>{
          const createDate = charity.createDate.split('T')[0];
           
            return charity.isAccepted.toString()==radio 
                  && charity.charityName.toLowerCase().startsWith(filterText.toLowerCase())
                  &&charity.createDate>=Date1 && charity.createDate <=Date2;
            })
        }
        else if(Date1!='' && Date2=='') {
      
          return value.filter((charity)=>{
            const createDate = charity.createDate.split('T')[0];
            return charity.createDate>=Date1&& charity.charityName.toLowerCase().startsWith(filterText.toLowerCase())
           ;
          })
        }
        else if(Date1!='' && Date2!='') {
          
          return value.filter((charity)=>{
            const createDate = charity.createDate.split('T')[0];
            return charity.createDate>=Date1 && charity.createDate <=Date2&& charity.charityName.toLowerCase().startsWith(filterText.toLowerCase())
             ;
          })
        }
        else if(Date1=='' && Date2!='') {
          
          return value.filter((charity)=>{
            const createDate = charity.createDate.split('T')[0];
            return charity.createDate<=Date2 && charity.charityName.toLowerCase().startsWith(filterText.toLowerCase()) 
            ;
          })
        }
       else if(radio!='' ){
          return value.filter((charity)=>{
          const createDate = charity.createDate.split('T')[0];
           
            return charity.isAccepted.toString()==radio 
                  && charity.charityName.toLowerCase().startsWith(filterText.toLowerCase())
                  ;
            })
        }
     
        else {
          return value.filter((charity)=>{
          
          return charity.charityName.toLowerCase().startsWith(filterText.toLowerCase());
          })
          }
      }
    
  }

}
