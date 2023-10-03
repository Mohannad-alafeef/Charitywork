import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chatSearch',
})
export class ChatSearchPipe implements PipeTransform {
  transform(
    value: string[],
    chats: {
      [connectionId: string]: { name: string; role: number; email: string };
    },
    search: string
  ): string[] {
    return value.filter((v) => chats[v].name.indexOf(search)>-1);
  }
}
