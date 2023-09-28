import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'testimonialFilter'
})
export class TestimonialFilterPipe implements PipeTransform {

  transform(value: any[],  radio: string)  {
    if(value.length==0 ||radio=='')
    return value;
  
    else {
      return value.filter((testimonial)=>{
     
          return testimonial.isAccepted.toString()==radio 
                
          })
  }
  }

}
